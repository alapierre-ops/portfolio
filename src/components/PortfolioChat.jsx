import { useCallback, useEffect, useRef, useState } from 'react'
import { FaPaperPlane, FaRobot } from 'react-icons/fa'
import { streamChat } from '../lib/chatApi'
import { trackEvent } from '../lib/analytics'

const MAX_TURNS = 10

const COPY = {
  fr: {
    title: 'Posez-moi vos questions',
    subtitle:
      "Mode entretien — posez n'importe quelle question sur mon parcours, mes compétences ou mes projets. L'assistant répond à partir de mes données portfolio.",
    placeholder: 'Ex. : Comment fonctionne DomainRadar ?',
    send: 'Envoyer',
    thinking: 'Réflexion…',
    errorRetry: 'Réessayer',
    suggestions: [
      'Comment fonctionne DomainRadar ?',
      'Parle-moi de ton rôle chez Majoli.',
      'Quelles sont tes compétences en infra et data ?',
      'Que recherches-tu actuellement ?',
    ],
  },
  en: {
    title: 'Ask me anything',
    subtitle:
      'Job interview mode — ask anything about my background, skills, or projects. The assistant answers from my portfolio data.',
    placeholder: 'E.g. How does DomainRadar work?',
    send: 'Send',
    thinking: 'Thinking…',
    errorRetry: 'Retry',
    suggestions: [
      'How does DomainRadar work?',
      'Tell me about your role at Majoli.',
      'What are your infra and data skills?',
      'What are you looking for right now?',
    ],
  },
}

function MessageBubble({ role, content }) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-sky-500 text-white rounded-br-md'
            : 'bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-md'
        }`}
      >
        {!isUser && (
          <span className="flex items-center gap-1.5 text-xs text-sky-400 mb-1.5 font-medium">
            <FaRobot aria-hidden />
            AI
          </span>
        )}
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  )
}

export default function PortfolioChat({ language }) {
  const copy = COPY[language] || COPY.en
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [streamBuffer, setStreamBuffer] = useState('')
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamBuffer, streaming])

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim()
      if (!trimmed || streaming) return

      trackEvent('Chat Message', { first: messages.length === 0 })
      setError(null)
      const userMsg = { role: 'user', content: trimmed }
      const nextMessages = [...messages, userMsg].slice(-MAX_TURNS * 2)
      setMessages(nextMessages)
      setInput('')
      setStreaming(true)
      setStreamBuffer('')

      let accumulated = ''

      await streamChat(
        { messages: nextMessages, language },
        {
          onToken: (chunk) => {
            accumulated += chunk
            setStreamBuffer(accumulated)
          },
          onDone: () => {
            if (accumulated) {
              setMessages((prev) => [...prev, { role: 'assistant', content: accumulated }])
            }
            setStreamBuffer('')
            setStreaming(false)
          },
          onError: (msg) => {
            setError(msg)
            setStreamBuffer('')
            setStreaming(false)
          },
        },
      )
    },
    [messages, streaming, language],
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="flex flex-col h-full min-h-[420px] rounded-2xl border border-gray-700 bg-gray-950 shadow-2xl shadow-sky-900/20 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4" aria-live="polite">
        {messages.length === 0 && !streaming && (
          <div className="text-center py-6">
            <p className="text-gray-400 text-sm mb-4">{copy.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {copy.suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => sendMessage(s)}
                  className="text-xs md:text-sm px-3 py-2 rounded-full border border-gray-600 text-gray-300 hover:border-sky-500 hover:text-sky-300 hover:bg-sky-500/10 transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} />
        ))}

        {streaming && streamBuffer && (
          <MessageBubble role="assistant" content={streamBuffer} />
        )}

        {streaming && !streamBuffer && (
          <p className="text-gray-500 text-sm animate-pulse">{copy.thinking}</p>
        )}

        {error && (
          <p className="text-rose-400 text-sm text-center" role="alert">
            {error}
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-700 p-3 md:p-4 flex gap-2 bg-gray-900/80"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={copy.placeholder}
          disabled={streaming}
          className="flex-1 rounded-lg bg-gray-800 border border-gray-600 px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:opacity-50"
          aria-label={copy.placeholder}
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          className="flex items-center gap-2 bg-sky-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <FaPaperPlane aria-hidden />
          <span className="hidden sm:inline">{copy.send}</span>
        </button>
      </form>
    </div>
  )
}

export function PortfolioChatSection({ language }) {
  const copy = COPY[language] || COPY.en

  return (
    <section id="interview" className="min-h-[70vh] py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              {copy.title}
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{copy.subtitle}</p>
        </div>
        <div className="max-w-3xl mx-auto min-h-[480px]">
          <PortfolioChat language={language} />
        </div>
      </div>
    </section>
  )
}
