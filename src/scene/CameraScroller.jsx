import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'

const smoothstep = (t) => t * t * (3 - 2 * t)

const KEYFRAMES = [
  {
    t: 0,
    pos: new THREE.Vector3(-0.38, 1.76, 5.54),
    look: new THREE.Vector3(-0.05, 1.71, -0.05),
  },
  {
    t: 1 / 3,
    pos: new THREE.Vector3(-3.15, 0.92, 3.82),
    look: new THREE.Vector3(0.06, 0.35, 0),
  },
  {
    t: 2 / 3,
    pos: new THREE.Vector3(2.65, 1.58, -3.15),
    look: new THREE.Vector3(-0.1, 0.85, -0.15),
  },
  {
    t: 1,
    pos: new THREE.Vector3(0.28, 1.04, 0.92),
    look: new THREE.Vector3(0.28, 1.035, -0.22),
  },
]

/** Scroll-scrubbed camera path (fed by Drei ScrollControls wheel timeline). */
export function CameraScroller() {
  const scroll = useScroll()
  const { camera } = useThree()
  const tempPos = new THREE.Vector3()
  const tempLook = new THREE.Vector3()

  useFrame(() => {
    const tRaw = THREE.MathUtils.clamp(scroll.offset, 0, 1)
    let i = KEYFRAMES.length - 2
    for (let k = 0; k < KEYFRAMES.length - 1; k++) {
      if (tRaw <= KEYFRAMES[k + 1].t) {
        i = k
        break
      }
    }
    const a = KEYFRAMES[i]
    const b = KEYFRAMES[i + 1]
    const denom = Math.max(b.t - a.t, 1e-6)
    const seg = THREE.MathUtils.clamp((tRaw - a.t) / denom, 0, 1)
    const u = smoothstep(seg)
    tempPos.copy(a.pos).lerp(b.pos, u)
    tempLook.copy(a.look).lerp(b.look, u)
    camera.position.copy(tempPos)
    camera.lookAt(tempLook)
  })

  return null
}
