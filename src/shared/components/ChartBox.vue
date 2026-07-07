<template>
  <div class="chart-box" :class="{ 'chart-box--tall': tall }">
    <div class="chart-box__header">
      <span class="chart-box__title">{{ title }}</span>
      <slot name="actions" />
    </div>
    <div class="chart-box__body">
      <slot />
    </div>
  </div>
</template>

<script setup>
  defineProps({
    title: { type: String, required: true },
    tall: { type: Boolean, default: false },
  })
</script>

<style scoped>
  .chart-box {
    background: rgba(0, 180, 255, 0.07);
    border: 1px solid rgba(0, 180, 255, 0.2);
    border-radius: 6px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .chart-box--tall .chart-box__body {
    min-height: 280px;
  }

  .chart-box__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .chart-box__title {
    font-size: 12px;
    color: #7ecfff;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .chart-box__body {
    flex: 1;
  }
</style>
