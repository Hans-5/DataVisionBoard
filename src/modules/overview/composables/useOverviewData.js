import { ref, computed, onMounted, onUnmounted } from 'vue'
import { fetchOverviewMetrics } from '../../../core/api/apiClient.js'
import { logger } from '../../../core/logger/index.js'

function fluctuate(valStr, maxPct = 0.03) {
  const raw = String(valStr).replace(/,/g, '')
  const isFloat = raw.includes('.')
  const num = parseFloat(raw)
  if (isNaN(num)) return valStr
  const next = num * (1 + (Math.random() * maxPct * 2 - maxPct))
  return isFloat ? next.toFixed(1) : Math.round(next).toLocaleString()
}

export function useOverviewData() {
  const rawKpis = ref([])
  const liveValues = ref([])
  const trend = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const timers = []

  // Computed so template re-renders on every tick
  const kpis = computed(() =>
    rawKpis.value.map((k, i) => ({
      label: k.label,
      sub: k.sub,
      value: liveValues.value[i] ?? k.value,
    }))
  )

  async function load() {
    loading.value = true
    try {
      const data = await fetchOverviewMetrics()
      rawKpis.value = data.kpis
      trend.value = data.trend
      liveValues.value = data.kpis.map((k) => k.value)

      // Each KPI card ticks on its own staggered interval
      data.kpis.forEach((_, i) => {
        timers.push(
          setInterval(
            () => {
              const next = [...liveValues.value]
              next[i] = fluctuate(next[i])
              liveValues.value = next
            },
            2500 + i * 500
          )
        )
      })

      // Trend: shift oldest month off, push a new jittered value every 4 s
      timers.push(
        setInterval(() => {
          if (!trend.value) return
          const last = trend.value.values[trend.value.values.length - 1]
          const newVal = Math.max(50000, Math.round(last * (1 + (Math.random() * 0.06 - 0.03))))
          trend.value = {
            ...trend.value,
            values: [...trend.value.values.slice(1), newVal],
          }
        }, 4000)
      )
    } catch (e) {
      error.value = e.message
      logger.error('useOverviewData.load failed', e)
    } finally {
      loading.value = false
    }
  }

  onMounted(load)
  onUnmounted(() => timers.forEach(clearInterval))
  return { kpis, trend, loading, error }
}
