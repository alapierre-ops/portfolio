import { Html, useScroll } from '@react-three/drei'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { FaEnvelope } from 'react-icons/fa'
import { CYAN, HTML_Z_INDEX_STORY } from './palette'
import { projectsData } from '../assets/data/projectsData'

function glassOuterStyle(opacity, maxRem = 26.5) {
  return {
    opacity,
    transition: 'opacity 0.22s ease',
    maxWidth: `min(${maxRem}rem, calc(100vw - 11rem))`,
    width: '100%',
  }
}

const DF = {
  hero: 5,
  skills: 4.95,
  projects: 4.85,
  contact: 3.85,
}

function HudAccentCorners() {
  return (
    <>
      <span className="pointer-events-none absolute left-2 top-2 h-5 w-5 border-l-2 border-t-2 border-[#00a8ff]/80" aria-hidden />
      <span className="pointer-events-none absolute right-2 top-2 h-5 w-5 border-r-2 border-t-2 border-[#00a8ff]/50" aria-hidden />
      <span className="pointer-events-none absolute bottom-2 left-2 h-5 w-5 border-l-2 border-b-2 border-[#00a8ff]/40" aria-hidden />
      <span className="pointer-events-none absolute bottom-2 right-2 h-5 w-5 border-r-2 border-b-2 border-[#00a8ff]/35" aria-hidden />
    </>
  )
}

/** Console tile: cyan rail strip + framed body (designed HUD, not a default flex column card). */
function HudShell({ eyebrow, accent = CYAN, title, styleOuter, children }) {
  return (
    <div style={styleOuter} className="pointer-events-none text-left [&_button]:cursor-pointer [&_a]:cursor-pointer">
      <div className="pointer-events-auto relative overflow-hidden rounded-sm border border-sky-500/22 bg-[radial-gradient(120%_92%_at_22%_-8%,rgba(0,168,255,0.1),transparent_58%),linear-gradient(158deg,#0d182ef5,#08121bed)] backdrop-blur-md shadow-[0_0_54px_rgba(0,168,255,0.074)] ring-1 ring-white/[0.05]">
        <HudAccentCorners />
        <div className="flex items-center gap-4 border-b border-sky-500/17 px-5 py-3">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full shadow-[0_0_13px_rgba(56,189,248,0.55)]"
            style={{ background: accent }}
          />
          <span
            className="min-w-0 flex-1 font-mono text-[9px] uppercase tracking-[0.36em]"
            style={{ color: accent }}
          >
            {eyebrow}
          </span>
        </div>
        <div className={`px-5 pb-7 ${title ? 'pt-11' : 'pt-11'}`}>
          {title && (
            <h2 className="bg-gradient-to-r from-white via-slate-50 to-slate-300 bg-clip-text text-[1.52rem] font-black leading-snug tracking-tight text-transparent">
              {title}
            </h2>
          )}
          <div className={title ? 'mt-9' : 'mt-0'}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export function NarrativeFloatingHtml({ language, openClassicPortfolio }) {
  const scroll = useScroll()
  const clamp = gsap.utils.clamp(0, 1)

  const scrollStoryTo = (progress) => {
    const el = scroll.el
    const max = Math.max(1, el.scrollHeight - el.clientHeight)
    el.scrollTo({ top: clamp(progress) * max, behavior: 'smooth' })
  }

  const heroCopy = {
    fr: {
      eyebrow: 'session · frontal-blade · uplink.idle',
      kicker: 'accès distant',
      name: 'Axel Lapierre',
      role: 'Développeur full-stack orienté backends robustes, APIs et architectures de services pensées avec les équipes interface.',
      projects: 'Pousser la timeline jusqu’aux projets',
      contact: 'Aller au contact',
      classic: 'Ouvrir en grille classique',
      wheel: 'MOLETTE • parcourir le rack comme une timeline caméra.',
      rail: '// uplink.portfolio · frontal sector',
    },
    en: {
      eyebrow: 'session · frontal-blade · uplink.idle',
      kicker: 'remote access',
      name: 'Axel Lapierre',
      role: 'Full-stack engineer focused on resilient backends, APIs, and service architecture delivered with frontend partners.',
      projects: 'Scrub timeline → projects beat',
      contact: 'Jump to contact',
      classic: 'Open classic portfolio grid',
      wheel: 'SCROLL • drive the camera rails through the enclosure.',
      rail: '// uplink.portfolio · frontal sector',
    },
  }

  const skillsCopy = {
    fr: {
      eyebrow: 'stack · system registry · read-only',
      title: 'Cartographie techno',
      lines: ['Node · Express · PostgreSQL · MongoDB', 'React · TypeScript · Tailwind', 'Docker · CI/CD · Git · Nginx'],
      footer: 'Analyse dorsale suivante après ce panneau.',
    },
    en: {
      eyebrow: 'stack · system registry · read-only',
      title: 'Technical cartography',
      lines: ['Node · Express · PostgreSQL · MongoDB', 'React · TypeScript · Tailwind', 'Docker · CI/CD · Git · Nginx'],
      footer: 'Dorsal analytics resume past this tile.',
    },
  }

  const projectsCopy = {
    fr: {
      eyebrow: 'IO · dorsal-plane · html-native',
      title: 'Faisceaux projet',
      body: 'Routage dorsal vers les fiches projet : texte lisible, SEO inchangé, navigation identique au mode classique.',
      browse: '↗',
      classicAll: 'Afficher grille complète',
    },
    en: {
      eyebrow: 'IO · dorsal-plane · html-native',
      title: 'Project uplinks',
      body: 'Dorsal IO routes into detail views — readable copy and SEO parity with classic mode.',
      browse: '↗',
      classicAll: 'Show full portfolio grid',
    },
  }

  const contactCopy = {
    fr: {
      eyebrow: 'heartbeat · noc · presence',
      badge: 'STATUT • EN LIGNE',
      title: 'Ouvert aux échanges sérieux.',
      subtitle: 'Alternance full-stack disponible · réponse même quand la caméra est contre les voyants.',
      email: 'Lancer SMTP',
      classic: 'Mode grille (contact)',
    },
    en: {
      eyebrow: 'heartbeat · noc · presence',
      badge: 'STATUS • ONLINE',
      title: 'Open for real conversations.',
      subtitle: 'Full-stack apprenticeship track · reachable even glued to blinkenlights.',
      email: 'Fire up SMTP',
      classic: 'Classic layout (contact)',
    },
  }

  const c = heroCopy[language]

  const heroVis = clamp(scroll.curve(0, 0.22, 0.045))
  const skillsVis = clamp(scroll.curve(0.31, 0.21, 0.05))
  const projectsVis = clamp(scroll.curve(0.6, 0.22, 0.035))
  const contactVis = clamp(scroll.curve(0.92, 0.16, 0.08))

  const preview = projectsData.slice(0, 4)

  return (
    <>
      <Html
        center
        position={[0.42, 1.88, 0.76]}
        distanceFactor={DF.hero}
        style={glassOuterStyle(heroVis)}
        zIndexRange={HTML_Z_INDEX_STORY}
      >
        <HudShell eyebrow={`${c.eyebrow} · idle`}>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: CYAN }}>
            {c.kicker}
          </p>
          <p className="mt-8 font-mono text-[11px] text-sky-400/90">{c.rail}</p>

          <h1 className="mt-14 text-[1.95rem] font-black leading-[1.06] tracking-tight text-white md:text-[2.06rem]">
            {c.name}
          </h1>

          <div className="mt-14 border-l border-[#00a8ff]/40 pl-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sky-200/88">ROLE</p>
            <p className="mt-7 max-w-md text-[15px] leading-[1.76] text-slate-300/93 md:text-[15px]">{c.role}</p>
          </div>

          <div className="mt-24 flex flex-col gap-14 border-t border-sky-500/18 pt-12">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <button
                type="button"
                onClick={() => scrollStoryTo(0.61)}
                className="rounded-md bg-gradient-to-br from-[#0284ce] via-[#00a8ff] to-[#63e0ff] px-7 py-[1.125rem] text-center text-[13.75px] font-semibold uppercase tracking-[0.12em] text-slate-950 shadow-[0_0_42px_rgba(0,168,255,0.41)] hover:brightness-110 pointer-events-auto"
              >
                {c.projects}
              </button>
              <button
                type="button"
                onClick={() => scrollStoryTo(0.82)}
                className="rounded-md border border-sky-500/54 px-7 py-[1.125rem] text-center text-[13.75px] font-semibold uppercase tracking-[0.12em] text-sky-50/93 hover:bg-sky-500/15 pointer-events-auto"
              >
                {c.contact}
              </button>
            </div>
            <button
              type="button"
              onClick={() => openClassicPortfolio()}
              className="inline-flex items-center gap-8 self-start rounded border border-transparent px-0 font-mono text-[10px] uppercase tracking-[0.22em] text-sky-300/93 hover:border-sky-500/43 hover:bg-sky-500/17 hover:text-sky-100 pointer-events-auto"
            >
              <span aria-hidden className="text-[13px] text-[#00a8ff]" style={{ color: CYAN }}>
                ▶
              </span>
              {c.classic}
            </button>
          </div>

          <footer className="mt-24 border-t border-sky-500/15 pb-px pt-9 font-mono text-[10px] uppercase tracking-[0.36em] text-sky-200/72">
            {c.wheel}
          </footer>
        </HudShell>
      </Html>

      <Html
        center
        position={[-1.32, 0.92, 0.58]}
        distanceFactor={DF.skills}
        style={glassOuterStyle(skillsVis, 22)}
        zIndexRange={HTML_Z_INDEX_STORY}
      >
        <HudShell eyebrow={skillsCopy[language].eyebrow} title={skillsCopy[language].title}>
          <ul className="space-y-[1.375rem] font-mono text-[12.65px] leading-[1.7] text-sky-200/93">
            {skillsCopy[language].lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <footer className="mt-24 border-t border-sky-500/15 pt-9 font-mono text-[10px] uppercase tracking-[0.22em] text-sky-200/72">
            {skillsCopy[language].footer}
          </footer>
        </HudShell>
      </Html>

      <Html
        center
        position={[0.28, 1.06, -0.58]}
        distanceFactor={DF.projects}
        style={glassOuterStyle(projectsVis, 26)}
        zIndexRange={HTML_Z_INDEX_STORY}
      >
        <HudShell eyebrow={projectsCopy[language].eyebrow} title={projectsCopy[language].title}>
          <p className="max-w-xl text-[14.65px] leading-[1.9] text-slate-400/93">{projectsCopy[language].body}</p>
          <ul className="mt-24 flex flex-col gap-[1.025rem] pointer-events-auto">
            {preview.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/project/${p.slug}`}
                  className="flex items-start justify-between gap-6 rounded-sm border border-sky-500/28 px-4 py-[0.975rem] text-[13.85px] text-sky-100/93 hover:border-sky-400/73 hover:bg-sky-500/18"
                >
                  <span className="min-w-0 flex-1 text-white">{p.title?.[language] ?? p.slug}</span>
                  <span className="font-mono text-[13px]" style={{ color: CYAN }}>
                    {projectsCopy[language].browse}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => openClassicPortfolio('#projects')}
            className="mt-24 inline-flex items-center gap-7 font-mono text-[10.25px] uppercase tracking-[0.22em] text-sky-300/93 hover:text-sky-100 pointer-events-auto"
          >
            <span className="text-[#00a8ff]" style={{ color: CYAN }}>
              ▸
            </span>
            {projectsCopy[language].classicAll}
          </button>
        </HudShell>
      </Html>

      <Html
        center
        position={[0.5, 1.02, 0.42]}
        distanceFactor={DF.contact}
        style={glassOuterStyle(contactVis, 23)}
        zIndexRange={HTML_Z_INDEX_STORY}
      >
        <HudShell eyebrow={contactCopy[language].eyebrow} accent="#34d399" title={contactCopy[language].title}>
          <div className="mt-12 inline-flex items-center gap-5 rounded border border-emerald-500/48 bg-black/48 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-200/94">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_9px_rgba(52,211,153,0.88)]" />
            {contactCopy[language].badge}
          </div>
          <p className="mt-16 max-w-md text-[14.75px] leading-[1.88] text-slate-400/93">{contactCopy[language].subtitle}</p>
          <a
            href="mailto:lapierre.axel30@gmail.com"
            className="mt-24 inline-flex w-full items-center justify-center gap-4 rounded-md bg-[#0284cf] px-8 py-4 text-[14.25px] font-semibold text-white uppercase tracking-[0.18em] shadow-[0_0_48px_rgba(0,168,255,0.52)] hover:brightness-110 pointer-events-auto md:w-fit md:justify-start"
          >
            <FaEnvelope className="shrink-0" />
            {contactCopy[language].email}
          </a>
          <button
            type="button"
            onClick={() => openClassicPortfolio('#contact')}
            className="mt-24 inline-flex items-center gap-6 font-mono text-[10.25px] uppercase tracking-[0.22em] text-sky-300/93 hover:text-sky-100 pointer-events-auto"
          >
            ◂ <span>{contactCopy[language].classic}</span>
          </button>
        </HudShell>
      </Html>
    </>
  )
}
