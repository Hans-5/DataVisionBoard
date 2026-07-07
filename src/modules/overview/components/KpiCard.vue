<template>
  <div class="kpi-card anim-fade-up" :style="{ animationDelay: delay }">
    <div class="kpi-label">
      {{ label }}
    </div>
    <div :key="flashKey" class="kpi-value">
      {{ value }}
    </div>
    <div class="kpi-sub">
      {{ sub }}
    </div>
    <span class="kpi-corner kpi-corner--tl" />
    <span class="kpi-corner kpi-corner--tr" />
    <span class="kpi-corner kpi-corner--bl" />
    <span class="kpi-corner kpi-corner--br" />
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const props = defineProps({
    label: { type: String, default: '' },
    value: { type: String, default: '0' },
    sub: { type: String, default: '' },
    delay: { type: String, default: '0s' },
  })

  // Re-key forces the CSS flash animation to replay on every live update
  const flashKey = ref(0)
  watch(
    () => props.value,
    () => {
      flashKey.value++
    }
  )
</script>

<style scoped>
  .kpi-card {
    position: relative;
    background: rgba(0, 180, 255, 0.06);
    border: 1px solid rgba(0, 180, 255, 0.2);
    border-radius: 6px;
    padding: 18px 20px 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    overflow: hidden;
    animation:
      fadeSlideUp 0.5s ease both,
      borderPulse 3s ease-in-out infinite;
  }
  .kpi-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00c8ff, transparent);
    animation: scanLine 3s linear infinite;
  }
  .kpi-label {
    font-size: 11px;
    color: #7ecfff;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }
  .kpi-value {
    font-size: 30px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 1px;
    text-shadow: 0 0 16px rgba(0, 200, 255, 0.4);
    animation: valueFlash 0.6s ease both;
  }
  .kpi-sub {
    font-size: 11px;
    color: #4a90b8;
  }

  .kpi-corner {
    position: absolute;
    width: 8px;
    height: 8px;
    border-color: #00c8ff;
    border-style: solid;
    animation: bracketBlink 2.5s ease-in-out infinite;
  }
  .kpi-corner--tl {
    top: 4px;
    left: 4px;
    border-width: 1px 0 0 1px;
  }
  .kpi-corner--tr {
    top: 4px;
    right: 4px;
    border-width: 1px 1px 0 0;
  }
  .kpi-corner--bl {
    bottom: 4px;
    left: 4px;
    border-width: 0 0 1px 1px;
  }
  .kpi-corner--br {
    bottom: 4px;
    right: 4px;
    border-width: 0 1px 1px 0;
  }
</style>
