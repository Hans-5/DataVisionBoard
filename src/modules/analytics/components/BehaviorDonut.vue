<template>
  <ChartBox title="用户行为分布">
    <div ref="el" style="height: 160px" />
  </ChartBox>
</template>

<script setup>
  import { watch } from 'vue'
  import ChartBox from '../../../shared/components/ChartBox.vue'
  import { useChart } from '../../../core/composables/useChart.js'
  import { useAnalyticsData } from '../composables/useAnalyticsData.js'

  const { behaviorPie } = useAnalyticsData()

  const COLORS = ['#00b4ff', '#ff6b6b', '#ffd166', '#06d6a0', '#9b5de5']

  const { el, updateOption } = useChart(() => ({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item', backgroundColor: '#0d2540', borderColor: '#1e6fa8' },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: { color: '#7ecfff', fontSize: 10 },
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['38%', '50%'],
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: { label: { show: true, fontSize: 12, color: '#fff' } },
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
              itemStyle: { color: COLORS[i % COLORS.length] },
            })),
          },
        ],
      })
    },
    { deep: true }
  )
</script>
