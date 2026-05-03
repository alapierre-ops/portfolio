import { Suspense, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFServerRack } from './GLTFServerRack'
import { ProceduralServerRack } from './ProceduralServerRack'
import { SERVER_GLTF } from './serverModelConfig'

/**
 * Procedural cabinet by default. Set `SERVER_GLTF.enabled` + drop a file at `SERVER_GLTF.url`
 * to swap in a purchased / modeled GLB (auto fall back if the URL 404s).
 */
export function NarrativeServerRack() {
  const [glbOk, setGlbOk] = useState(() => (!SERVER_GLTF.enabled ? false : undefined))

  useEffect(() => {
    if (!SERVER_GLTF.enabled) return
    useGLTF.preload(SERVER_GLTF.url)
    fetch(SERVER_GLTF.url, { method: 'HEAD' })
      .then((r) => setGlbOk(r.ok))
      .catch(() => setGlbOk(false))
  }, [])

  if (glbOk === undefined) return <ProceduralServerRack />
  if (glbOk)
    return (
      <Suspense fallback={<ProceduralServerRack />}>
        <GLTFServerRack url={SERVER_GLTF.url} />
      </Suspense>
    )
  return <ProceduralServerRack />
}
