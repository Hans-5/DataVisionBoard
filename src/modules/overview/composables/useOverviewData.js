import { ref, computed, onMounted } from 'vue'
import { fetchOverviewMetrics } from '../../../core/api/apiClient.js'
import { logger } from '../../../core/logger/index.js'
import { useLiveValue } from '../../../core/composables/useLiveData.js'

export function useOverviewData() {
  const rawKpis = ref([])
  const liveRefs = ref([])
  const trend = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Computed array so template re-renders when any liveRef ticks
  const kpis = computed(() =>
    rawKpis.value.map((k, i) => ({
      label: k.label,
      sub: k.sub,
      value: liveRefs.value[i]?.value ?? k.value,
    }))
  )

  async function load() {
    loading.value = true
    try {
      const data = await fetchOverviewMetrics()
      trend.value = data.trend
      rawKpis.value = data.kpis
      // Stagger intervals so cards don't all tick at once
      liveRefs.value = data.kpis.map((k, i) =>
        useLiveValue(k.value, { interval: 2500 + i * 500, maxPct: 0.03 })
      )
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
