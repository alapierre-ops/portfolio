# Portfolio

Personal developer portfolio — an animated, bilingual (FR/EN) single-page site with an
**AI chatbot** that answers recruiters' questions about my background, projects and skills.

🔗 **Live:** https://axel-lapierre.netlify.app

## Features

- Animated UI (Framer Motion) — hero, project gallery, skills, experience timeline.
- **Bilingual FR/EN**, content-driven from a single `portfolioDb.json`.
- **AI chatbot** (`/api/chat`) streaming answers about my work, powered by Groq LLMs over SSE.
- Contact form with a server-side inbox.
- Project gallery with Swiper carousels and per-project detail cards.

## Tech stack

- **Frontend:** React 19, Vite 6, Tailwind CSS 4, Framer Motion, React Router, Swiper.
- **Backend:** minimal Node HTTP server (`server/`) — chat proxy + contact inbox, streamed via Server-Sent Events.
- **Hosting:** Netlify (static frontend) + separately hosted Node API.

## Getting started

```bash
npm install
cp .env.example .env   # then fill in GROQ_API_KEY
npm run dev            # runs the API (:8787) and Vite (:5173) together
```

- `npm run dev:web` — frontend only
- `npm run dev:server` — API only
- `npm run build` — production build to `dist/`

## Environment variables

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `GROQ_API_KEY` | for chat | — | Groq API key powering the AI chatbot (`/api/chat` returns 503 without it) |
| `ALLOWED_ORIGINS` | no | `http://localhost:5173,http://127.0.0.1:5173` | Comma-separated CORS allow-list for the API |
| `PORT` | no | `8787` | API server port |

## Architecture

The frontend is a static Vite build deployed on Netlify (`netlify.toml`). The AI chatbot and
contact form are served by the standalone Node server in `server/`, which must be hosted
separately (any Node host) and pointed at via `ALLOWED_ORIGINS`. Portfolio content lives in
`src/assets/data/portfolioDb.json`, so updating projects/skills needs no code changes.
