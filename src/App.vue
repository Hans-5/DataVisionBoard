<template>
  <div class="dashboard">
    <!-- Header -->
    <header class="header">
      <div class="header-left">
        <span class="header-tag">LIVE</span>
        <span class="header-time">{{ currentTime }}</span>
      </div>
      <div class="header-center">
        <div class="header-brackets">
          <span class="bracket">【</span>
          <h1 class="header-title">数据视界 · DataVisionBoard</h1>
          <span class="bracket">】</span>
        </div>
        <p class="header-subtitle">MOCK DATA VISUALIZATION TEACHING DASHBOARD</p>
        <div class="header-scan" />
      </div>
      <div class="header-right">
        <span class="header-date">{{ currentDate }}</span>
      </div>
    </header>

    <!-- KPI Row -->
    <section class="kpi-row">
      <KpiCard
        v-for="(kpi, i) in kpis"
        :key="kpi.label"
        :label="kpi.label"
        :value="kpi.value"
        :sub="kpi.sub"
        :delay="`${i * 0.1}s`"
      />
    </section>

    <!-- Charts Grid -->
    <section class="charts-grid">
      <div class="col-left">
        <TrendChart />
        <BehaviorDonut />
      </div>
      <div class="col-center">
        <NetworkGraph />
      </div>
      <div class="col-right">
        <CityBarChart />
        <SkillRadar />
      </div>
    </section>

    <ActivityTicker />

    <footer class="footer">
      DataVisionBoard · 数据视界 © 2026 &nbsp;|&nbsp; Vue 3 + Vite + ECharts
    </footer>
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
  import ActivityTicker from './modules/activity/components/ActivityTicker.vue'
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
    background:
      radial-gradient(ellipse at 20% 0%, rgba(0, 100, 200, 0.12) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 100%, rgba(0, 60, 140, 0.1) 0%, transparent 60%),
      linear-gradient(160deg, #050e1a 0%, #0a1929 60%, #060f1c 100%);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 180, 255, 0.25);
    padding-bottom: 10px;
    animation: fadeSlideUp 0.4s ease both;
  }
  .header-left,
  .header-right {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 200px;
    font-size: 13px;
    color: #4a90b8;
  }
  .header-right {
    justify-content: flex-end;
  }
  .header-tag {
    font-size: 10px;
    font-weight: 700;
    color: #00ff99;
    border: 1px solid #00ff99;
    padding: 1px 6px;
    border-radius: 3px;
    letter-spacing: 1px;
    animation: bracketBlink 1.5s ease-in-out infinite;
  }
  .header-center {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    overflow: hidden;
    padding: 0 8px;
  }
  .header-brackets {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .bracket {
    font-size: 24px;
    color: rgba(0, 200, 255, 0.5);
    animation: bracketBlink 2s ease-in-out infinite;
  }
  .header-title {
    font-size: 22px;
    font-weight: 700;
    color: #e0f4ff;
    letter-spacing: 3px;
    text-shadow:
      0 0 24px rgba(0, 200, 255, 0.6),
      0 0 48px rgba(0, 100, 200, 0.3);
    white-space: nowrap;
  }
  .header-subtitle {
    font-size: 11px;
    color: rgba(0, 180, 255, 0.5);
    letter-spacing: 2px;
    margin: 0;
  }
  .header-scan {
    position: absolute;
    bottom: 0;
    left: -100%;
    width: 40%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00c8ff, transparent);
    animation: scanLine 3s linear infinite;
  }

  .kpi-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }

  .charts-grid {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
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
    min-height: 520px;
  }

  .footer {
    text-align: center;
    font-size: 12px;
    color: #2a5070;
    padding-top: 8px;
    border-top: 1px solid rgba(0, 180, 255, 0.1);
    letter-spacing: 0.5px;
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
