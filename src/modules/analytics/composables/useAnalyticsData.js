import { ref, onMounted, onUnmounted } from 'vue'
import { fetchAnalytics } from '../../../core/api/apiClient.js'
import { logger } from '../../../core/logger/index.js'

function jitter(arr, maxPct = 0.06) {
  return arr.map((v) => Math.max(0, Math.round(v * (1 + (Math.random() * maxPct * 2 - maxPct)))))
}

export function useAnalyticsData() {
  const cityBar = ref(null)
  const behaviorPie = ref([])
  const radar = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const timers = []

  async function load() {
    loading.value = true
    try {
      const data = await fetchAnalytics()

      cityBar.value = { ...data.cityBar }
      behaviorPie.value = data.behaviorPie.map((p) => ({ ...p }))
      radar.value = { ...data.radar }

      // Live: city bar values every 3 s
      timers.push(
        setInterval(() => {
          cityBar.value = { ...cityBar.value, values: jitter(cityBar.value.values, 0.06) }
        }, 3000)
      )

      // Live: behavior pie slices every 4 s
      timers.push(
        setInterval(() => {
          behaviorPie.value = behaviorPie.value.map((p) => ({
            ...p,
            value: Math.max(10, Math.round(p.value * (1 + (Math.random() * 0.1 - 0.05)))),
          }))
        }, 4000)
      )

      // Live: radar values every 5 s
      timers.push(
        setInterval(() => {
          radar.value = {
            ...radar.value,
            values: radar.value.values.map((v) =>
              Math.min(100, Math.max(20, Math.round(v * (1 + (Math.random() * 0.08 - 0.04)))))
            ),
          }
        }, 5000)
      )
    } catch (e) {
      error.value = e.message
      logger.error('useAnalyticsData.load failed', e)
    } finally {
      loading.value = false
    }
  }

  onMounted(load)
  onUnmounted(() => timers.forEach(clearInterval))
  return { cityBar, behaviorPie, radar, loading, error }
}
