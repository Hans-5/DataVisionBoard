<template>
  <ChartBox title="用户行为分布">
    <div ref="el" style="height: 100%; min-height: 160px" />
  </ChartBox>
</template>

<script setup>
  import { watch } from 'vue'
  import ChartBox from '../../../shared/components/ChartBox.vue'
  import { useChart } from '../../../core/composables/useChart.js'
  import { useAnalyticsData } from '../composables/useAnalyticsData.js'

  const { behaviorPie } = useAnalyticsData()

  // orange replaces red for a warmer, more vivid palette
  const COLORS = ['#00b4ff', '#ff9500', '#ffd166', '#06d6a0', '#9b5de5']

  const { el, updateOption } = useChart(() => ({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item', backgroundColor: '#0d2540', borderColor: '#1e6fa8' },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      textStyle: { color: '#7ecfff', fontSize: 11 },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '62%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: true,
        label: {
          show: true,
          position: 'outside',
          color: '#7ecfff',
          fontSize: 11,
          formatter: '{b}\n{d}%',
        },
        labelLine: {
          show: true,
          length: 6,
          length2: 10,
          lineStyle: { color: 'rgba(100,200,255,0.5)', width: 1 },
        },
        emphasis: {
          label: { show: true, fontSize: 12, color: '#fff', fontWeight: 'bold' },
          itemStyle: { shadowBlur: 20, shadowColor: 'rgba(0,0,0,0.5)' },
        },
        data: [],
      },
    ],
  }))

  watch(
    behaviorPie,
    (d) => {
      if (!d?.length) return
      updateOption({
        series: [
          {
            data: d.map((item, i) => ({
              ...item,
              itemStyle: {
                color: COLORS[i % COLORS.length],
                shadowBlur: 8,
                shadowColor: COLORS[i % COLORS.length],
              },
            })),
          },
        ],
      })
    },
    { deep: true }
  )
</script>
