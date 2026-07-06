import { loadData } from './data.js'

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i

export const toolDefinitions = [
  {
    type: 'function',
    function: {
      name: 'list_projects',
      description:
        'List all portfolio projects with summary info (slug, title, description, tags, role). Use for overview questions.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_project',
      description:
        'Get full details of a single project by slug (e.g. domainradar, prospectscope, inh, larche, iazur, eisenhower, invoicing-app, twitter-clone, restaurant-culinarium).',
      parameters: {
        type: 'object',
        properties: {
          slug: { type: 'string', description: 'Project slug identifier' },
        },
        required: ['slug'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'list_skills',
      description:
        'List all skills grouped by category (Backend & Data, Frontend, Infrastructure & DevOps, Data/AI & Automation, Tools & Ecosystem).',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_profile',
      description:
        'Get Axel Lapierre profile: bio, education, contact info, and interview talking points (strengths, work style, what he is looking for).',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
]

export function executeTool(name, args = {}) {
  const { profile, portfolio, skills } = loadData()

  switch (name) {
    case 'list_projects':
      return portfolio.projects.map((p) => ({
        slug: p.slug,
        title: p.title,
        description: p.description,
        tags: p.tags,
        role: p.role,
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
      }))

    case 'get_project': {
      const slug = String(args.slug || '').trim()
      if (!SLUG_RE.test(slug)) {
        return { error: `Invalid slug: ${slug}` }
      }
      const project = portfolio.projects.find((p) => p.slug === slug)
      if (!project) {
        return {
          error: `Project not found: ${slug}`,
          availableSlugs: portfolio.projects.map((p) => p.slug),
        }
      }
      return project
    }

    case 'list_skills':
      return skills

    case 'get_profile':
      return profile

    default:
      return { error: `Unknown tool: ${name}` }
  }
}
