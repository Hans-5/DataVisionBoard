import { ref, onMounted } from 'vue'
import { fetchAnalytics } from '../../../core/api/apiClient.js'
import { logger } from '../../../core/logger/index.js'

export function useAnalyticsData() {
  const cityBar = ref(null)
  const behaviorPie = ref([])
  const radar = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function load() {
    loading.value = true
    try {
      const data = await fetchAnalytics()
      cityBar.value = data.cityBar
      behaviorPie.value = data.behaviorPie
      radar.value = data.radar
    } catch (e) {
      error.value = e.message
      logger.error('useAnalyticsData.load failed', e)
    } finally {
      loading.value = false
    }
  }

  onMounted(load)
  return { cityBar, behaviorPie, radar, loading, error }
}
