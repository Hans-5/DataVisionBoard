<template>
  <ChartBox title="服务架构网络 · 点击节点可拖拽" :tall="true">
    <div ref="el" style="height: 100%; min-height: 320px" />
  </ChartBox>
</template>

<script setup>
  import { watch } from 'vue'
  import ChartBox from '../../../shared/components/ChartBox.vue'
  import { useChart } from '../../../core/composables/useChart.js'
  import { useNetworkData } from '../composables/useNetworkData.js'

  const { nodes, links, categories } = useNetworkData()

  // cyan → teal → orange → soft red
  const PALETTE = ['#00e5ff', '#06d6a0', '#ffb347', '#ff6b6b']
  const GLOW = [
    'rgba(0,229,255,0.7)',
    'rgba(6,214,160,0.7)',
    'rgba(255,179,71,0.7)',
    'rgba(255,107,107,0.7)',
  ]

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
      textStyle: { color: '#5a9fc0', fontSize: 10 },
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
        force: { repulsion: 320, edgeLength: [70, 140], gravity: 0.06, friction: 0.6 },
        symbol: 'circle',
        label: {
          show: true,
          position: 'bottom',
          color: '#a0d8ff',
          fontSize: 10,
        },
        emphasis: {
          focus: 'adjacency',
          scale: true,
          scaleSize: 1.2,
          lineStyle: { width: 3, shadowBlur: 8, shadowColor: 'rgba(0,200,255,0.6)' },
          label: { show: true, fontSize: 12, color: '#fff', fontWeight: 'bold' },
        },
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: 6,
        lineStyle: {
          color: 'rgba(0,200,255,0.25)',
          curveness: 0.25,
          shadowBlur: 6,
          shadowColor: 'rgba(0,180,255,0.3)',
        },
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
            symbolSize: node.value * 0.9,
            itemStyle: {
              color: PALETTE[node.category % PALETTE.length],
              borderColor: 'rgba(255,255,255,0.25)',
              borderWidth: 1.5,
              shadowBlur: 30,
              shadowColor: GLOW[node.category % GLOW.length],
            },
          })),
          edges: l,
        },
      ],
    })
  })
</script>
