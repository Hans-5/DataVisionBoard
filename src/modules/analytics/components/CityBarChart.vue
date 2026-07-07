<template>
  <ChartBox title="城市分布 TOP 6">
    <div ref="el" style="height: 160px" />
  </ChartBox>
</template>

<script setup>
  import { watch } from 'vue'
  import ChartBox from '../../../shared/components/ChartBox.vue'
  import { useChart } from '../../../core/composables/useChart.js'
  import { useAnalyticsData } from '../composables/useAnalyticsData.js'

  const { cityBar } = useAnalyticsData()

  const { el, updateOption } = useChart((ec) => ({
    backgroundColor: 'transparent',
    grid: { top: 10, right: 10, bottom: 24, left: 44 },
    tooltip: { trigger: 'axis', backgroundColor: '#0d2540', borderColor: '#1e6fa8' },
    xAxis: {
      type: 'category',
      data: [],
      axisLine: { lineStyle: { color: '#1e4060' } },
      axisLabel: { color: '#5a9fc0', fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#132840' } },
      axisLabel: { color: '#5a9fc0', fontSize: 10 },
    },
    series: [
      {
        type: 'bar',
        barMaxWidth: 28,
        data: [],
        itemStyle: {
          color: new ec.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#06d6a0' },
            { offset: 1, color: '#00b4ff' },
          ]),
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  }))

  watch(cityBar, (d) => {
    if (!d) return
    updateOption({ xAxis: { data: d.cities }, series: [{ data: d.values }] })
  })
</script>
