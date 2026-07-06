import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '../src/assets/data')

function readJson(filename) {
  const filePath = path.join(dataDir, filename)
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

let cache = null

export function loadData() {
  if (!cache) {
    cache = {
      profile: readJson('profileDb.json'),
      portfolio: readJson('portfolioDb.json'),
      skills: readJson('skillsDb.json'),
    }
  }
  return cache
}

export function clearDataCache() {
  cache = null
}
