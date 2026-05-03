import { Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Grid, ScrollControls, Sparkles, useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { NarrativeServerRack } from './NarrativeServerRack'
import { CameraScroller } from './CameraScroller'
import { NarrativeFloatingHtml } from './NarrativeFloatingHtml'
import { NarrativeViewportChrome } from './NarrativeViewportChrome'
import { CYAN_HEX, FOG_HEX, FOG_NEAR, FOG_FAR, NAVY_BG } from './palette'

function ExposureBoost() {
  const { gl } = useThree()
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 1.38
    gl.outputColorSpace = THREE.SRGBColorSpace
    return () => {}
  }, [gl])
  return null
}

/** Balanced readability: lifted ambient plus cyan accent points (no silhouette rack). */
function NarrativeLights() {
  const drift = useRef(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (drift.current) {
      drift.current.position.set(
        9.4 + Math.sin(t * 0.58) * 1.95,
        7.95 + Math.cos(t * 0.37) * 0.92,
        10.85 + Math.cos(t * 0.49) * 1.42
      )
      drift.current.intensity = 20 + Math.sin(t * 2.07) * 3.05
    }
  })

  return (
    <>
      <ambientLight intensity={0.64} />
      <hemisphereLight intensity={1.04} sky="#8ee8ff" ground="#5a6984" />

      <directionalLight castShadow position={[9.75, 12.85, 15.05]} intensity={3.08} color="#f2fbff" />
      <directionalLight position={[-12.4, 7.95, -15.85]} intensity={2.08} color="#b4cbeb" />

      <pointLight position={[7.2, 5.08, 6.62]} decay={2} intensity={13.85} distance={74} color={CYAN_HEX} />
      <pointLight position={[0, 5.58, -6]} decay={2} intensity={9.42} distance={68} color="#7ec6f0" />
      <pointLight ref={drift} decay={2} distance={98} intensity={21} color="#c8faf5" />

      {/* Edge read on chassis left/front */}
      <pointLight position={[-6.2, 3.72, 3.92]} decay={2} intensity={11.72} distance={74} color="#aee7ff" />
    </>
  )
}

function ScrollSurfaceStyle() {
  const scroll = useScroll()
  useEffect(() => {
    const el = scroll.el
    const prev = el.style.overscrollBehavior
    el.style.overscrollBehavior = 'none'
    return () => {
      el.style.overscrollBehavior = prev
    }
  }, [scroll.el])
  return null
}

function ExperienceInner({ language, openClassicPortfolio }) {
  return (
    <>
      <ScrollSurfaceStyle />
      <ExposureBoost />
      <color attach="background" args={[NAVY_BG]} />
      <fog attach="fog" args={[FOG_HEX, FOG_NEAR, FOG_FAR]} />

      <NarrativeLights />

      {/* Soft vignette halo under the enclosure */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.018, -0.4]} receiveShadow>
        <circleGeometry args={[40, 64]} />
        <meshStandardMaterial color="#0f1a2d" metalness={0.2} roughness={0.88} />
      </mesh>

      <Grid
        infiniteGrid={false}
        args={[72, 72]}
        position={[0, 0.036, -0.4]}
        rotation-x={-Math.PI / 2}
        cellColor="#112033"
        sectionColor="#1e9dcf"
        cellSize={0.44}
        sectionSize={6.5}
        cellThickness={0.98}
        sectionThickness={1.78}
        fadeDistance={112}
        fadeStrength={3.95}
        side={THREE.FrontSide}
      />

      <Sparkles count={96} scale={[34, 3.2, 28]} speed={0.28} opacity={0.48} color="#71e3ff" size={3.6} position={[0, 2.35, -2.45]} />

      <CameraScroller />
      <NarrativeServerRack />
      <NarrativeViewportChrome language={language} />
      <NarrativeFloatingHtml language={language} openClassicPortfolio={openClassicPortfolio} />
    </>
  )
}

/** Full narrative stack: scroll timeline + rack + Html overlays + screen HUD. */
export function ServerNarrativeExperience({ language, openClassicPortfolio }) {
  return (
    <ScrollControls pages={4} damping={0.22} eps={0.001}>
      <Suspense fallback={null}>
        <ExperienceInner language={language} openClassicPortfolio={openClassicPortfolio} />
      </Suspense>
    </ScrollControls>
  )
}
