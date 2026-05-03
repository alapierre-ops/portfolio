/**
 * Optional GLB / GLTF server rack.
 * 1. Place a file at `public/models/server-rack.glb` (or change the URL).
 * 2. Set `enabled: true`. If the file is missing, the scene falls back to the procedural rack.
 *
 * Model tips: Y-up GLTF; scale is normalized to ~2.35m cabinet height, bottom on the floor.
 * Free options (check license): Poly Pizza / Sketchfab “server rack” downloads in GLB/GLTF.
 */
export const SERVER_GLTF = {
  enabled: false,
  url: '/models/server-rack.glb',
}
