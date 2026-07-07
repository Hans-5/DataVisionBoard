import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { logger } from '../logger/index.js'

export function useChart(optionBuilder) {
  const el = ref(null)
  let chart = null

  function resize() {
    chart?.resize()
  }

  onMounted(() => {
    try {
      chart = echarts.init(el.value, null, { renderer: 'canvas' })
      chart.setOption(optionBuilder(echarts))
      window.addEventListener('resize', resize)
    } catch (e) {
      logger.error('useChart init failed', e)
    }
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resize)
    chart?.dispose()
  })

  function updateOption(option) {
    chart?.setOption(option, { notMerge: false })
  }

  return { el, updateOption }
}
