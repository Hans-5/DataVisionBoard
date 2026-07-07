import { ref, onUnmounted } from 'vue'

// Fluctuates a numeric string value by ±maxPct% on each tick
export function useLiveValue(source, { interval = 3000, maxPct = 0.05 } = {}) {
  const current = ref(source.value ?? source)

  function fluctuate(base) {
    const raw = String(base).replace(/,/g, '')
    const isFloat = raw.includes('.')
    const num = parseFloat(raw)
    if (isNaN(num)) return base
    const delta = num * (Math.random() * maxPct * 2 - maxPct)
    const next = num + delta
    return isFloat ? next.toFixed(1) : Math.round(next).toLocaleString()
  }

  let timer = null

  function start() {
    timer = setInterval(() => {
      current.value = fluctuate(current.value)
    }, interval)
  }

  function stop() {
    clearInterval(timer)
  }

  // Auto-start and stop with the component lifecycle
  start()
  onUnmounted(stop)

  return current
}

// Fluctuates an array of numbers by ±maxPct% on each tick
export function useLiveArray(source, { interval = 4000, maxPct = 0.08 } = {}) {
  const current = ref([...source])

  let timer = setInterval(() => {
    current.value = current.value.map((v) => {
      const delta = v * (Math.random() * maxPct * 2 - maxPct)
      return Math.max(0, Math.round(v + delta))
    })
  }, interval)

  onUnmounted(() => clearInterval(timer))
  return current
}
