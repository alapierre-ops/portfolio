import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { CYAN_HEX, CHASSIS_HEX, GREEN_LED_HEX } from './palette'

const metalProps = () => ({
  color: new THREE.Color(CHASSIS_HEX),
  metalness: 0.48,
  roughness: 0.54,
})

function Blade({ y, idx }) {
  const h = 0.268
  const w = 0.935
  const d = 0.392

  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({ ...metalProps() }), [])
  const darkTrim = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0f1c34',
        metalness: 0.62,
        roughness: 0.68,
      }),
    []
  )

  const ledsMat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: 0x08222c,
      emissive: new THREE.Color(CYAN_HEX),
      emissiveIntensity: 1.82,
      metalness: 0.32,
      roughness: 0.5,
      toneMapped: true,
    })
    m.userData.blinkLed = true
    m.userData.blinkBase = 0.88 + (idx % 4) * 0.04
    return m
  }, [idx])

  const ledStripMat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: 0x051018,
      emissive: new THREE.Color(CYAN_HEX),
      emissiveIntensity: 0.55,
      metalness: 0.4,
      roughness: 0.55,
    })
    m.userData.blinkLed = true
    m.userData.blinkBase = 0.35
    return m
  }, [])

  return (
    <group position={[0, y, 0.018]}>
      {/* Recessed tray read */}
      <mesh castShadow receiveShadow position={[0, 0, -0.012]} material={darkTrim}>
        <boxGeometry args={[w + 0.028, h + 0.014, d * 0.24]} />
      </mesh>
      <mesh castShadow receiveShadow material={bodyMat}>
        <boxGeometry args={[w, h, d]} />
      </mesh>
      <mesh position={[0, 0, d / 2 + 0.0025]} material={ledsMat}>
        <planeGeometry args={[w * 0.9, h * 0.76]} />
      </mesh>
      {/* Upper status strip */}
      <mesh position={[0, h * 0.28, d / 2 + 0.0035]} material={ledStripMat}>
        <planeGeometry args={[w * 0.62, h * 0.08]} />
      </mesh>
      {/* Drive / vent columns */}
      {[-0.33, -0.11, 0.11, 0.33].map((x) => (
        <mesh key={x} position={[x, -0.02, d / 2 + 0.0045]}>
          <boxGeometry args={[0.06, h * 0.58, 0.009]} />
          <meshStandardMaterial color="#152a44" roughness={0.82} metalness={0.28} />
        </mesh>
      ))}
    </group>
  )
}

function FiberCables({ zBack }) {
  const paths = useMemo(() => {
    const curves = []
    const hues = [CYAN_HEX, 0x0891e4, 0x67e8f9, 0x006c9e, GREEN_LED_HEX]
    for (let i = 0; i < 36; i++) {
      const t = i / 36
      const x = THREE.MathUtils.lerp(-0.42, 0.42, t) + Math.sin(i * 2.17) * 0.035
      const y = THREE.MathUtils.lerp(0.25, 1.95, (i % 9) / 8)
      const c = new THREE.CatmullRomCurve3([
        new THREE.Vector3(x, y, zBack),
        new THREE.Vector3(x * 1.1, y + 0.06, zBack - 0.06),
        new THREE.Vector3(x * 0.85 + 0.2, y - 0.02, zBack - 0.38),
      ])
      const col = hues[i % hues.length]
      curves.push({ c, color: col, radius: THREE.MathUtils.lerp(0.012, 0.022, Math.random()) })
    }
    return curves
  }, [zBack])

  return (
    <group>
      {paths.map((p, i) => (
        <mesh key={i} castShadow receiveShadow frustumCulled={false}>
          <tubeGeometry args={[p.c, 24, p.radius, 8, false]} />
          <meshStandardMaterial
            color={p.color}
            emissive={p.color}
            emissiveIntensity={0.92}
            metalness={0.25}
            roughness={0.45}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/** More “19-inch” readable silhouette: corner posts, ears, stepped face, fiber IO. */
export function ProceduralServerRack() {
  const rackRef = useRef(null)

  const frameMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        ...metalProps(),
        metalness: 0.58,
      }),
    []
  )
  const railMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#101e33',
        metalness: 0.66,
        roughness: 0.46,
      }),
    []
  )
  const bezelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x15263c,
        metalness: 0.48,
        roughness: 0.78,
      }),
    []
  )

  const statusMat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: 0x022c14,
      emissive: new THREE.Color(GREEN_LED_HEX),
      emissiveIntensity: 1.22,
      toneMapped: false,
    })
    m.userData.greenLed = true
    return m
  }, [])

  const rackW = 1.05
  const rackH = 2.28
  const rackD = 0.5
  const zBack = -rackD / 2 - 0.02

  const bladeYs = useMemo(() => Array.from({ length: 7 }, (_, b) => 0.33 + b * 0.282), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    rackRef.current?.traverse((child) => {
      const mat = child.material
      if (!mat || Array.isArray(mat)) return

      if (mat.userData?.greenLed) {
        mat.emissiveIntensity = 1.05 + Math.sin(t * 4.6) * 0.08 + (Math.sin(t * 17) > 0.93 ? Math.random() * 0.15 : 0)
        return
      }

      if (mat.userData?.blinkLed) {
        const base = mat.userData.blinkBase ?? 0.75
        mat.emissiveIntensity =
          base +
          Math.sin(t * 7.2 + mat.uuid.charCodeAt(0)) * 0.1 +
          (Math.sin(t * 22 + mat.uuid.charCodeAt(5)) > 0.94 ? Math.random() * 0.45 : 0)
      }
    })
  })

  const halfW = rackW / 2
  const postX = halfW + 0.036
  const postZ = rackD / 2 + 0.02

  return (
    <group ref={rackRef} position={[0, rackH / 2, 0]}>
      <mesh castShadow receiveShadow material={frameMat}>
        <boxGeometry args={[rackW + 0.1, rackH + 0.08, rackD]} />
      </mesh>

      {/* 19" rack ears (mounting rails) */}
      <mesh castShadow receiveShadow position={[-(halfW + 0.058), 0, rackD / 2]} material={railMat}>
        <boxGeometry args={[0.05, rackH + 0.105, 0.06]} />
      </mesh>
      <mesh castShadow receiveShadow position={[halfW + 0.058, 0, rackD / 2]} material={railMat}>
        <boxGeometry args={[0.05, rackH + 0.105, 0.06]} />
      </mesh>

      {/* Proud corner posts */}
      {[
        [-postX, postZ],
        [postX, postZ],
        [-postX, -postZ],
        [postX, -postZ],
      ].map(([x, z], i) => (
        <mesh key={i} castShadow receiveShadow position={[x, 0.05, z]}>
          <boxGeometry args={[0.065, rackH + 0.085, 0.065]} />
          <meshStandardMaterial color="#1a2942" metalness={0.58} roughness={0.5} />
        </mesh>
      ))}

      <mesh position={[0, rackH / 2 - 0.12, rackD / 2 + 0.016]} castShadow receiveShadow material={railMat}>
        <boxGeometry args={[rackW * 1.035, rackH * 0.068, 0.028]} />
      </mesh>

      <mesh position={[0, 0, rackD / 2 + 0.014]} material={bezelMat}>
        <boxGeometry args={[rackW * 1.02, rackH * 0.985, 0.018]} />
      </mesh>

      <group position={[0.36, rackH / 2 - 0.34, rackD / 2 + 0.022]}>
        <mesh>
          <planeGeometry args={[0.11, 0.055]} />
          <meshStandardMaterial color="#0c1930" metalness={0.35} roughness={0.72} />
        </mesh>
        <mesh position={[0.02, -0.006, 0.0025]} material={statusMat}>
          <circleGeometry args={[0.009, 20]} />
        </mesh>
      </group>

      {bladeYs.map((y, i) => (
        <Blade key={i} y={y - rackH / 2} idx={i} />
      ))}

      <FiberCables zBack={zBack} />

      <pointLight position={[rackW * 0.72, rackH * 0.54, rackD]} intensity={3.72} distance={17} decay={2} color={CYAN_HEX} />
      <pointLight position={[0, rackH * 0.5, rackD / 2 + 0.4]} intensity={2.92} distance={14} decay={2} color="#bfeefe" />
      <spotLight position={[-rackW * 0.95, rackH + 0.52, rackD]} angle={0.52} penumbra={1} intensity={11.95} decay={2} distance={52} />
      <pointLight position={[0.15, rackH * 0.48, -rackD]} intensity={9.92} distance={38} decay={2} color={CYAN_HEX} />
    </group>
  )
}
