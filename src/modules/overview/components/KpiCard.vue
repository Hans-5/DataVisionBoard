<template>
  <div class="kpi-card">
    <div class="kpi-label">
      {{ label }}
    </div>
    <div class="kpi-value">
      {{ value }}
    </div>
    <div class="kpi-sub">
      {{ sub }}
    </div>
  </div>
</template>

<script setup>
  defineProps({
    label: { type: String, default: '' },
    value: { type: String, default: '' },
    sub: { type: String, default: '' },
  })
</script>

<style scoped>
  .kpi-card {
    background: rgba(0, 180, 255, 0.07);
    border: 1px solid rgba(0, 180, 255, 0.2);
    border-radius: 6px;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .kpi-label {
    font-size: 11px;
    color: #7ecfff;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .kpi-value {
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 1px;
  }
  .kpi-sub {
    font-size: 11px;
    color: #4a90b8;
  }
</style>
