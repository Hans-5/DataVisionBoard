<template>
  <ChartBox title="月度用户增长趋势">
    <div ref="el" style="height: 100%; min-height: 180px" />
  </ChartBox>
</template>

<script setup>
  import { watch } from 'vue'
  import ChartBox from '../../../shared/components/ChartBox.vue'
  import { useChart } from '../../../core/composables/useChart.js'
  import { useOverviewData } from '../composables/useOverviewData.js'

  const { trend } = useOverviewData()

  const { el, updateOption } = useChart((ec) => ({
    backgroundColor: 'transparent',
    grid: { top: 10, right: 10, bottom: 24, left: 44 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#0d2540',
      borderColor: '#1e6fa8',
      textStyle: { color: '#e0f4ff' },
    },
    xAxis: {
      type: 'category',
      data: [],
      boundaryGap: false,
      axisLine: { lineStyle: { color: '#1e4060' } },
      axisLabel: { color: '#5a9fc0', fontSize: 12 },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#132840' } },
      axisLabel: { color: '#5a9fc0', fontSize: 12 },
    },
    series: [
      {
        type: 'line',
        data: [],
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: '#00c8ff',
          width: 2,
          shadowBlur: 8,
          shadowColor: 'rgba(0,200,255,0.5)',
        },
        areaStyle: {
          color: new ec.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0,200,255,0.45)' },
            { offset: 1, color: 'rgba(0,200,255,0.02)' },
          ]),
        },
      },
    ],
  }))

  // deep watch so the rolling update (new array ref each tick) is caught
  watch(
    trend,
    (d) => {
      if (!d) return
      updateOption({ xAxis: { data: d.months }, series: [{ data: d.values }] })
    },
    { deep: true }
  )
</script>
