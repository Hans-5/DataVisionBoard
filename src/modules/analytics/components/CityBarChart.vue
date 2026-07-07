<template>
  <ChartBox title="城市分布 TOP 6" tag="Ranking">
    <div ref="el" style="height: 100%; min-height: 160px" />
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
    grid: { top: 8, right: 56, bottom: 8, left: 44, containLabel: false },
    tooltip: { trigger: 'axis', backgroundColor: '#0d2540', borderColor: '#1e6fa8' },
    xAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#132840' } },
      axisLabel: { color: '#5a9fc0', fontSize: 11 },
    },
    yAxis: {
      type: 'category',
      data: [],
      axisLine: { lineStyle: { color: '#1e4060' } },
      axisLabel: { color: '#c0e4ff', fontSize: 12 },
      inverse: true,
    },
    series: [
      {
        type: 'bar',
        barMaxWidth: 18,
        data: [],
        label: { show: true, position: 'right', color: '#7ecfff', fontSize: 11 },
        itemStyle: {
          color: new ec.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#00b4ff' },
            { offset: 1, color: '#06d6a0' },
          ]),
          borderRadius: [0, 4, 4, 0],
        },
      },
    ],
  }))

  watch(
    cityBar,
    (d) => {
      if (!d) return
      updateOption({ yAxis: { data: d.cities }, series: [{ data: d.values }] })
    },
    { deep: true }
  )
</script>
