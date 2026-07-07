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

  const PALETTE = ['#00e5ff', '#06d6a0', '#ffb347', '#ff6b6b']
  const GLOW = [
    'rgba(0,229,255,0.8)',
    'rgba(6,214,160,0.8)',
    'rgba(255,179,71,0.8)',
    'rgba(255,107,107,0.8)',
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
        // Higher gravity + friction keeps core node naturally centered
        force: {
          repulsion: 300,
          edgeLength: [80, 150],
          gravity: 0.25,
          friction: 0.65,
          layoutAnimation: true,
        },
        symbol: 'circle',
        label: {
          show: true,
          position: 'bottom',
          color: '#a0d8ff',
          fontSize: 12,
        },
        emphasis: {
          focus: 'adjacency',
          scale: true,
          scaleSize: 1.2,
          lineStyle: { width: 3 },
          label: { show: true, fontSize: 12, color: '#fff', fontWeight: 'bold' },
        },
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: 6,
        // Smooth glow on edges — no flickering because we use a CSS-independent shadow
        lineStyle: {
          color: 'rgba(0,229,255,0.35)',
          width: 1.5,
          curveness: 0.3,
          shadowBlur: 8,
          shadowColor: 'rgba(0,200,255,0.5)',
          opacity: 0.8,
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
              borderColor: 'rgba(255,255,255,0.3)',
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
