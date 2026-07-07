<template>
  <div
    class="chart-box anim-fade-up"
    :class="{ 'chart-box--tall': tall }"
    :style="{ animationDelay: delay }"
  >
    <div class="chart-box__header">
      <span class="chart-box__dot" />
      <span class="chart-box__title">{{ title }}</span>
      <span v-if="tag" class="chart-box__tag">{{ tag }}</span>
      <slot name="actions" />
    </div>
    <div class="chart-box__divider" />
    <div class="chart-box__body">
      <slot />
    </div>
  </div>
</template>

<script setup>
  defineProps({
    title: { type: String, required: true },
    tall: { type: Boolean, default: false },
    delay: { type: String, default: '0s' },
    tag: { type: String, default: '' },
  })
</script>

<style scoped>
  .chart-box {
    position: relative;
    background: rgba(4, 20, 40, 0.8);
    border: 1px solid rgba(0, 180, 255, 0.2);
    border-radius: 6px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    backdrop-filter: blur(4px);
    box-shadow: inset 0 0 20px rgba(0, 180, 255, 0.04);
    animation:
      fadeSlideUp 0.5s ease both,
      borderPulse 4s ease-in-out infinite;
    transition:
      border-color 0.3s,
      box-shadow 0.3s;
  }
  .chart-box:hover {
    border-color: rgba(0, 200, 255, 0.5);
    box-shadow: inset 0 0 30px rgba(0, 200, 255, 0.08);
  }
  .chart-box--tall .chart-box__body {
    min-height: 280px;
  }

  .chart-box__header {
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .chart-box__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #00c8ff;
    box-shadow: 0 0 6px #00c8ff;
    flex-shrink: 0;
    animation: bracketBlink 1.8s ease-in-out infinite;
  }
  .chart-box__title {
    font-size: 13px;
    color: #7ecfff;
    letter-spacing: 1px;
    text-transform: uppercase;
    flex: 1;
  }
  .chart-box__tag {
    font-size: 10px;
    color: #00c8ff;
    border: 1px solid rgba(0, 200, 255, 0.4);
    padding: 1px 6px;
    border-radius: 3px;
    letter-spacing: 1px;
    text-transform: uppercase;
    flex-shrink: 0;
  }
  .chart-box__divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(0, 200, 255, 0.4), transparent);
  }
  .chart-box__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
</style>
