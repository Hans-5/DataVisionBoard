import { ref, onMounted } from 'vue'
import { fetchOverviewMetrics } from '../../../core/api/apiClient.js'
import { logger } from '../../../core/logger/index.js'

export function useOverviewData() {
  const kpis = ref([])
  const trend = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function load() {
    loading.value = true
    try {
      const data = await fetchOverviewMetrics()
      kpis.value = data.kpis
      trend.value = data.trend
    } catch (e) {
      error.value = e.message
      logger.error('useOverviewData.load failed', e)
    } finally {
      loading.value = false
    }
  }

  onMounted(load)
  return { kpis, trend, loading, error }
}
