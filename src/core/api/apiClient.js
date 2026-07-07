import { logger } from '../logger/index.js'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

async function realFetch(endpoint) {
  const base = import.meta.env.VITE_API_BASE ?? '/api'
  const res = await fetch(`${base}${endpoint}`)
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${endpoint}`)
  return res.json()
}

export async function fetchOverviewMetrics() {
  logger.info('fetchOverviewMetrics', { mock: USE_MOCK })
  if (USE_MOCK) return (await import('../../modules/overview/mock/metrics.js')).default
  return realFetch('/overview/metrics')
}

export async function fetchAnalytics() {
  logger.info('fetchAnalytics', { mock: USE_MOCK })
  if (USE_MOCK) return (await import('../../modules/analytics/mock/analytics.js')).default
  return realFetch('/analytics')
}

export async function fetchNetworkGraph() {
  logger.info('fetchNetworkGraph', { mock: USE_MOCK })
  if (USE_MOCK) return (await import('../../modules/network/mock/network.js')).default
  return realFetch('/network/graph')
}
