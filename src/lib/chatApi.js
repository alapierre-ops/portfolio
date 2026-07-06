const API_BASE = (import.meta.env.VITE_CHAT_API_BASE || '').replace(/\/$/, '')

export function chatApiUrl(path) {
  return `${API_BASE}${path}`
}

/**
 * Stream chat response via SSE.
 * @param {{ messages: { role: string, content: string }[], language: string }} payload
 * @param {{ onToken: (text: string) => void, onDone: () => void, onError: (msg: string) => void }} handlers
 * @returns {Promise<void>}
 */
export async function streamChat(payload, { onToken, onDone, onError }) {
  const res = await fetch(chatApiUrl('/api/chat'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const data = await res.json()
      if (data.error) message = data.error
    } catch {
      // keep default
    }
    onError(message)
    return
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let finished = false

  const finish = () => {
    if (finished) return
    finished = true
    onDone()
  }

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const parts = buffer.split('\n\n')
    buffer = parts.pop() || ''

    for (const part of parts) {
      if (!part.trim()) continue

      let event = 'message'
      let dataStr = ''

      for (const line of part.split('\n')) {
        if (line.startsWith('event: ')) event = line.slice(7).trim()
        else if (line.startsWith('data: ')) dataStr = line.slice(6)
      }

      if (!dataStr) continue

      try {
        const data = JSON.parse(dataStr)
        if (event === 'token' && data.content) onToken(data.content)
        else if (event === 'done') finish()
        else if (event === 'error') {
          onError(data.message || 'Unknown error')
          finished = true
        }
      } catch {
        // ignore
      }
    }
  }

  finish()
}
