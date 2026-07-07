<template>
  <div class="dashboard">
    <!-- Header -->
    <header class="header">
      <span class="header-time">{{ currentTime }}</span>
      <h1 class="header-title">数据视界 · DataVisionBoard</h1>
      <span class="header-date">{{ currentDate }}</span>
    </header>

    <!-- KPI Row -->
    <section class="kpi-row">
      <KpiCard
        v-for="kpi in kpis"
        :key="kpi.label"
        :label="kpi.label"
        :value="kpi.value"
        :sub="kpi.sub"
      />
    </section>

    <!-- Charts Grid: [left col] [network center] [right col] -->
    <section class="charts-grid">
      <!-- Left column -->
      <div class="col-left">
        <TrendChart />
        <BehaviorDonut />
      </div>

      <!-- Center: network graph -->
      <div class="col-center">
        <NetworkGraph />
      </div>

      <!-- Right column -->
      <div class="col-right">
        <CityBarChart />
        <SkillRadar />
      </div>
    </section>

    <footer class="footer">DataVisionBoard · 数据视界 © 2026</footer>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import KpiCard from './modules/overview/components/KpiCard.vue'
  import TrendChart from './modules/overview/components/TrendChart.vue'
  import BehaviorDonut from './modules/analytics/components/BehaviorDonut.vue'
  import CityBarChart from './modules/analytics/components/CityBarChart.vue'
  import SkillRadar from './modules/analytics/components/SkillRadar.vue'
  import NetworkGraph from './modules/network/components/NetworkGraph.vue'
  import { useOverviewData } from './modules/overview/composables/useOverviewData.js'

  const { kpis } = useOverviewData()

  const currentTime = ref('')
  const currentDate = ref('')

  function tick() {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString('zh-CN')
    currentDate.value = now.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })
  }

  let timer = null
  onMounted(() => {
    tick()
    timer = setInterval(tick, 1000)
  })
  onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
  .dashboard {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 14px 20px;
    background: linear-gradient(160deg, #071520 0%, #0a1929 60%, #071a2e 100%);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 180, 255, 0.2);
    padding-bottom: 10px;
  }
  .header-title {
    font-size: 22px;
    font-weight: 700;
    color: #e0f4ff;
    letter-spacing: 2px;
    text-shadow: 0 0 20px rgba(0, 200, 255, 0.5);
  }
  .header-time,
  .header-date {
    font-size: 13px;
    color: #4a90b8;
    min-width: 160px;
  }
  .header-date {
    text-align: right;
  }

  .kpi-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }

  /* Three-column chart grid matching sample image */
  .charts-grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr 1fr;
    gap: 14px;
    flex: 1;
  }

  .col-left,
  .col-right {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .col-left > *,
  .col-right > * {
    flex: 1;
  }

  .col-center {
    display: flex;
    flex-direction: column;
  }

  .col-center > * {
    flex: 1;
    min-height: 360px;
  }

  .footer {
    text-align: center;
    font-size: 11px;
    color: #2a5070;
    padding-top: 8px;
    border-top: 1px solid rgba(0, 180, 255, 0.1);
  }

  @media (max-width: 900px) {
    .kpi-row {
      grid-template-columns: repeat(2, 1fr);
    }
    .charts-grid {
      grid-template-columns: 1fr;
    }
    .col-center > * {
      min-height: 280px;
    }
  }
</style>
