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

function buildSub(i, currentStr, originalNums) {
  if (i === 3) return '满分 100 分'
  const cur = parseFloat(String(currentStr).replace(/,/g, ''))
  const orig = originalNums[i]
  if (i === 2) {
    const diff = Math.max(0, Math.round(cur - orig))
    return `本月新增 ${diff.toLocaleString()}`
  }
  const pct = (((cur - orig) / orig) * 100).toFixed(1)
  const arrow = cur >= orig ? '↑' : '↓'
  const label = i === 0 ? '较上月' : '较昨日'
  return `${arrow} ${Math.abs(pct)}% ${label}`
}

export function useOverviewData() {
  const rawKpis = ref([])
  const liveValues = ref([])
  const liveSubs = ref([])
  const trend = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const timers = []
  const originalNums = []

  const kpis = computed(() =>
    rawKpis.value.map((k, i) => ({
      label: k.label,
      sub: liveSubs.value[i] ?? k.sub,
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

      originalNums.splice(
        0,
        originalNums.length,
        ...data.kpis.map((k) => parseFloat(String(k.value).replace(/,/g, '')))
      )
      liveSubs.value = data.kpis.map((_, i) => buildSub(i, data.kpis[i].value, originalNums))

      data.kpis.forEach((_, i) => {
        timers.push(
          setInterval(
            () => {
              const next = [...liveValues.value]
              next[i] = fluctuate(next[i])
              liveValues.value = next
              const subs = [...liveSubs.value]
              subs[i] = buildSub(i, next[i], originalNums)
              liveSubs.value = subs
            },
            2500 + i * 500
          )
        )
      })

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
