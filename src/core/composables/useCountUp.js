import { ref, onMounted } from 'vue'

export function useCountUp(target, duration = 1800) {
  const display = ref('0')

  onMounted(() => {
    // Strip non-numeric chars to get the raw number, preserve suffix
    const raw = String(target).replace(/,/g, '')
    const isFloat = raw.includes('.')
    const numericPart = parseFloat(raw)
    const suffix = String(target).replace(/[\d.,]/g, '')

    if (isNaN(numericPart)) {
      display.value = target
      return
    }

    const start = performance.now()
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = numericPart * eased
      display.value = (isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  })

  return display
}
