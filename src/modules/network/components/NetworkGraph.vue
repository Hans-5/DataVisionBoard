<template>
  <ChartBox title="数据中台 · 服务架构网络" :tall="true" tag="Overview">
    <div ref="el" style="flex: 1; min-height: 0; width: 100%" />
  </ChartBox>
</template>

<script setup>
  import { watch } from 'vue'
  import ChartBox from '../../../shared/components/ChartBox.vue'
  import { useChart } from '../../../core/composables/useChart.js'
  import { useNetworkData } from '../composables/useNetworkData.js'

  const { nodes, links, categories } = useNetworkData()

  const PALETTE = ['#00e5ff', '#06d6a0', '#ffd166', '#ff6b6b']

  const { el, updateOption } = useChart(() => ({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#0d2540',
      borderColor: '#1e6fa8',
      textStyle: { color: '#e0f4ff' },
      formatter: (p) => p.data?.name ?? p.name,
    },
    legend: {
      data: ['核心层', '服务层', '应用层', '基础设施'],
      bottom: 4,
      textStyle: { color: '#5a9fc0', fontSize: 11 },
      icon: 'circle',
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        roam: true,
        draggable: true,
        categories: [],
        data: [],
        edges: [],
        force: { repulsion: 280, edgeLength: [60, 120], gravity: 0.08 },
        symbol: 'circle',
        itemStyle: { borderColor: 'rgba(255,255,255,0.3)', borderWidth: 1 },
        label: {
          show: true,
          position: 'bottom',
          color: '#a0d8ff',
          fontSize: 12,
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: { width: 3 },
          label: { show: true, fontSize: 13, color: '#fff' },
        },
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: 6,
        lineStyle: { color: 'rgba(0,180,255,0.3)', curveness: 0.2 },
      },
    ],
  }))

  watch([nodes, links, categories], ([n, l, c]) => {
    if (!n.length) return
    updateOption({
      legend: { data: c.map((cat) => cat.name) },
      series: [
        {
          categories: c,
          data: n.map((node) => ({
            ...node,
            symbolSize: node.value * 0.7,
            itemStyle: {
              color: PALETTE[node.category % PALETTE.length],
              shadowBlur: 18,
              shadowColor: PALETTE[node.category % PALETTE.length],
            },
          })),
          edges: l,
        },
      ],
    })
  })
</script>
