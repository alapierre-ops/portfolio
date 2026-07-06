import { executeTool, toolDefinitions } from './tools.js'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'
const MAX_TOOL_ROUNDS = 5

function buildSystemPrompt(language) {
  const lang = language === 'fr' ? 'French' : 'English'
  return `You are Axel Lapierre's portfolio assistant in job-interview mode.

Context: Axel is a full-stack developer finishing a 3-year work-study Master's at Majoli (a web agency), where he became the technical lead on B2B prospection. He specializes in backend, infrastructure and data pipelines, and is looking for a full-time role (CDI) from September 2026.

Rules:
- Answer ONLY using data from your tools (get_profile, list_projects, get_project, list_skills).
- For factual questions about Axel, his projects, skills, or experience, you MUST call the relevant tool(s) before answering.
- If the data does not contain the answer, say honestly that you don't have that information — do not invent details (in particular, never invent numbers, costs, or client names).
- Stay on topic: Axel's portfolio, projects, skills, background, and career. Politely redirect off-topic questions.
- Respond in ${lang}.
- Be conversational and interview-friendly: concise but thorough, highlight relevant strengths when appropriate.
- Project slugs and names: domainradar (DomainRadar), prospectscope (ProspectScope), inh (INH), larche (L'Arche Centre d'Affaires), iazur (iAzur Solutions), eisenhower (Eisenhower Matrix), invoicing-app (ProPulse), twitter-clone (YNot), restaurant-culinarium (Culinarium).`
}

async function groqRequest(body, apiKey) {
  const res = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Groq API error ${res.status}: ${text}`)
  }

  return res
}

function sseWrite(res, event, data) {
  res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
}

async function streamGroqToSse(groqRes, res) {
  const reader = groqRes.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      const payload = line.slice(6).trim()
      if (payload === '[DONE]') continue

      try {
        const parsed = JSON.parse(payload)
        const delta = parsed.choices?.[0]?.delta?.content
        if (delta) sseWrite(res, 'token', { content: delta })
      } catch {
        // ignore malformed chunks
      }
    }
  }
}

export async function handleChat(req, res, { apiKey, language, messages }) {
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const chatMessages = [
    { role: 'system', content: buildSystemPrompt(language) },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ]

  try {
    let pendingMessages = [...chatMessages]

    for (let round = 0; round < MAX_TOOL_ROUNDS; round += 1) {
      const groqRes = await groqRequest(
        {
          model: MODEL,
          messages: pendingMessages,
          tools: toolDefinitions,
          tool_choice: 'auto',
          temperature: 0.4,
          max_tokens: 1024,
        },
        apiKey,
      )

      const completion = await groqRes.json()
      const choice = completion.choices?.[0]
      if (!choice) {
        sseWrite(res, 'error', { message: 'No response from model' })
        res.end()
        return
      }

      const msg = choice.message

      if (msg.tool_calls?.length) {
        pendingMessages.push({
          role: 'assistant',
          content: msg.content || null,
          tool_calls: msg.tool_calls,
        })

        for (const tc of msg.tool_calls) {
          const fnName = tc.function.name
          let fnArgs = {}
          try {
            fnArgs = JSON.parse(tc.function.arguments || '{}')
          } catch {
            fnArgs = {}
          }

          const result = executeTool(fnName, fnArgs)
          pendingMessages.push({
            role: 'tool',
            tool_call_id: tc.id,
            content: JSON.stringify(result),
          })
        }
        continue
      }

      if (msg.content) {
        sseWrite(res, 'token', { content: msg.content })
        sseWrite(res, 'done', {})
        res.end()
        return
      }
    }

    const streamRes = await groqRequest(
      {
        model: MODEL,
        messages: pendingMessages,
        temperature: 0.4,
        max_tokens: 1024,
        stream: true,
      },
      apiKey,
    )

    await streamGroqToSse(streamRes, res)
    sseWrite(res, 'done', {})
    res.end()
  } catch (err) {
    sseWrite(res, 'error', { message: err.message || 'Chat failed' })
    res.end()
  }
}
