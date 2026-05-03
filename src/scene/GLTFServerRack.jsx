import * as THREE from 'three'
import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

const TARGET_HEIGHT = 2.38

function applyShadows(o) {
  o.traverse((ch) => {
    if (!ch.isMesh) return
    ch.castShadow = true
    ch.receiveShadow = true
  })
}

/** GLB / GLTF cabinet; height-normalized & grounded like the procedural rack. */
export function GLTFServerRack({ url }) {
  const { scene } = useGLTF(url)

  const root = useMemo(() => {
    const g = new THREE.Group()
    const clone = scene.clone(true)
    applyShadows(clone)
    g.add(clone)

    g.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(g)
    const size = new THREE.Vector3()
    box.getSize(size)
    const s = TARGET_HEIGHT / Math.max(size.y, 1e-4)
    g.scale.setScalar(s)
    g.updateMatrixWorld(true)
    box.setFromObject(g)

    const center = new THREE.Vector3()
    box.getCenter(center)
    g.position.set(-center.x, -box.min.y + 0.02, -center.z)

    /** Slight turn so the fascia catches key light (tweak per asset if needed). */
    g.rotation.y = THREE.MathUtils.degToRad(8)

    return g
  }, [scene])

  return <primitive object={root} />
}
