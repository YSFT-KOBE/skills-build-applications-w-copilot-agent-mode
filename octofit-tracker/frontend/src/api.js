const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

export async function fetchCollection(resource, signal) {
  const response = await fetch(`${API_BASE_URL}/api/${resource}/`, { signal })
  if (!response.ok) throw new Error(`Unable to load ${resource} (${response.status})`)
  return normalizeCollection(await response.json())
}

export function displayDate(value) {
  if (!value) return '-'
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value))
}