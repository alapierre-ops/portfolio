import { Html, useScroll } from '@react-three/drei'
import { HTML_Z_INDEX_CHROME } from './palette'

/** Screen-space HUD framing (fills empty viewport margins; fills “data-center console” silhouette). */
export function NarrativeViewportChrome({ language }) {
  const scroll = useScroll()
  const p = Math.round(scroll.offset * 100)

  const t =
    language === 'fr'
      ? {
          line1: '// uplink.portfolio.local · rack:primary',
          line2: 'telemetry: ACTIVE',
          line3: 'scroll → timeline ',
          hud: 'LIVE_FEED',
          sector: 'SECTOR_UI',
          trail: `TIMELINE ${p}%`,
        }
      : {
          line1: '// uplink.portfolio.local · rack:primary',
          line2: 'telemetry: ACTIVE',
          line3: 'scroll timeline →',
          hud: 'LIVE_FEED',
          sector: 'SECTOR_UI',
          trail: `TIMELINE ${p}%`,
        }

  const corner = 'pointer-events-none border-[#00a8ff]/50'
  const L = `${corner} absolute h-14 w-14`
  const lineLeft = 'absolute h-px w-36 md:w-48 bg-gradient-to-r from-[#00a8ff]/70 to-transparent opacity-90'
  const lineRight = 'absolute h-px w-36 md:w-48 bg-gradient-to-l from-[#00a8ff]/70 to-transparent opacity-90'

  return (
    <Html fullscreen style={{ pointerEvents: 'none' }} zIndexRange={HTML_Z_INDEX_CHROME}>
      <div className="relative h-screen w-screen overflow-hidden font-mono select-none">
        {/* Corner brackets */}
        <div className={`${L} left-10 top-[4.85rem] border-l-[2px] border-t-[2px]`} aria-hidden />
        <div className={`${L} right-10 top-[4.85rem] border-r-[2px] border-t-[2px]`} aria-hidden />
        <div className={`${L} bottom-14 left-10 border-l-[2px] border-b-[2px]`} aria-hidden />
        <div className={`${L} bottom-14 right-10 border-r-[2px] border-b-[2px]`} aria-hidden />

        {/* Top rails */}
        <div className={`${lineLeft} left-[3.75rem] top-[5rem]`} aria-hidden />
        <div className={`${lineRight} right-[3.75rem] top-[5rem]`} aria-hidden />

        {/* Left telemetry */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 max-md:hidden flex flex-col gap-2 text-[9px] leading-relaxed uppercase tracking-[0.22em] text-sky-200/52 text-left md:left-14">
          <span className="whitespace-pre-wrap max-w-[10rem] border-l border-sky-500/35 pl-2.5">
            {t.line1}
          </span>
          <span className="pl-2.5 text-emerald-300/70">{t.line2}</span>
          <span className="pl-2.5 text-sky-300/52">{t.line3}</span>
        </div>

        {/* HUD chips top-center */}
        <div className="absolute left-1/2 top-[calc(5.25rem)] flex -translate-x-1/2 gap-6 text-[10px] tracking-[0.35em] text-sky-200/72">
          <span className="rounded border border-[#00a8ff]/30 bg-black/38 px-2.5 py-1">{t.sector}</span>
          <span className="rounded border border-emerald-500/36 bg-black/38 px-2.5 py-1">{t.hud}</span>
        </div>

        {/* Bottom scrub + label */}
        <div className="absolute bottom-7 left-[18%] right-[18%] flex flex-col items-center gap-2">
          <div className="h-1 w-full max-w-xl overflow-hidden rounded-full bg-slate-950/90 ring-1 ring-[#00a8ff]/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0891e4]/60 via-[#00a8ff] to-cyan-200/95 shadow-[0_0_22px_rgba(0,168,255,0.45)] transition-[width] duration-200"
              style={{ width: `${p}%` }}
            />
          </div>
          <span className="text-[9px] uppercase tracking-[0.45em] text-sky-200/72">{t.trail}</span>
        </div>
      </div>
    </Html>
  )
}
