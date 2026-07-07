<template>
  <ChartBox title="综合能力评估">
    <div ref="el" style="height: 160px" />
  </ChartBox>
</template>

<script setup>
  import { watch } from 'vue'
  import ChartBox from '../../../shared/components/ChartBox.vue'
  import { useChart } from '../../../core/composables/useChart.js'
  import { useAnalyticsData } from '../composables/useAnalyticsData.js'

  const { radar: radarData } = useAnalyticsData()

  const { el, updateOption } = useChart(() => ({
    backgroundColor: 'transparent',
    radar: {
      indicator: [],
      shape: 'polygon',
      splitNumber: 4,
      axisName: { color: '#7ecfff', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(0,180,255,0.15)' } },
      splitArea: { show: false },
      axisLine: { lineStyle: { color: 'rgba(0,180,255,0.2)' } },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [],
            areaStyle: { color: 'rgba(6,214,160,0.25)' },
            lineStyle: { color: '#06d6a0', width: 2 },
            itemStyle: { color: '#06d6a0' },
          },
        ],
      },
    ],
  }))

  watch(
    radarData,
    (d) => {
      if (!d) return
      updateOption({
        radar: { indicator: d.indicators },
        series: [{ data: [{ value: d.values }] }],
      })
    },
    { deep: true }
  )
</script>
