import { Canvas } from '@react-three/fiber'
import { NAVY_BG } from './palette'
import { ServerNarrativeExperience } from './ServerNarrativeExperience'

/** Full-viewport R3F root; wheel scroll is owned by Drei ScrollControls (not body overflow). */
export function ServerNarrativeCanvas({ language, openClassicPortfolio }) {
  return (
    <Canvas
      className="h-full w-full touch-none"
      shadows
      camera={{ fov: 44, near: 0.12, far: 94, position: [0, 1.72, 4.95] }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      dpr={[1, Math.min(window.devicePixelRatio ?? 1, 1.75)]}
      style={{
        height: '100%',
        width: '100%',
        display: 'block',
        background: NAVY_BG,
      }}
    >
      <ServerNarrativeExperience language={language} openClassicPortfolio={openClassicPortfolio} />
    </Canvas>
  )
}
