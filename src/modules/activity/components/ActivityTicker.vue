<template>
  <div class="ticker-wrap">
    <span class="ticker-label">动态</span>
    <div class="ticker-window">
      <div class="ticker-track">
        <span v-for="(ev, i) in doubled" :key="i" class="ticker-item">
          <span class="ticker-time">{{ ev.time }}</span>
          <span class="ticker-tag">{{ ev.tag }}</span>
          <span class="ticker-text">{{ ev.text }}</span>
          <span class="ticker-sep">|</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'

  const BASE_EVENTS = [
    { time: '21:42:18', tag: '用户中心', text: '北京用户完成新课程注册，累计用户数突破 128,000' },
    { time: '21:41:55', tag: '课程中心', text: '《Vue3 实战》课程本月学习人数超 3,200 人' },
    { time: '21:41:30', tag: '订单中心', text: '上海用户今日活跃人数较昨日上涨 5.2%' },
    { time: '21:40:47', tag: '评分系统', text: '综合平台满意度评分达 98.7 分，再创新高' },
    { time: '21:40:12', tag: '直播中心', text: '深圳直播互动课程同时在线人数达 1,840 人' },
    { time: '21:39:58', tag: '资源中心', text: '本月新增课程资料下载 12,040 次' },
    { time: '21:39:33', tag: '用户中心', text: '成都新注册用户完成首次课程学习，转化率 68%' },
    { time: '21:39:01', tag: '报表系统', text: '月度数据报告已生成，本月累计课程数 39,218 门' },
    { time: '21:38:44', tag: 'AI推荐', text: 'AI 推荐引擎今日推送个性化课程 8,600 次' },
    { time: '21:38:20', tag: '监控系统', text: '系统各节点响应正常，平均延迟 12ms' },
  ]

  const events = ref([...BASE_EVENTS])

  const doubled = computed(() => [...events.value, ...events.value])

  let timer = null
  onMounted(() => {
    timer = setInterval(() => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('zh-CN', { hour12: false })
      const newEvent = {
        time: timeStr,
        tag: BASE_EVENTS[Math.floor(Math.random() * BASE_EVENTS.length)].tag,
        text: BASE_EVENTS[Math.floor(Math.random() * BASE_EVENTS.length)].text,
      }
      events.value = [newEvent, ...events.value.slice(0, 9)]
    }, 8000)
  })
  onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
  .ticker-wrap {
    display: flex;
    align-items: center;
    background: rgba(0, 20, 50, 0.7);
    border: 1px solid rgba(0, 180, 255, 0.2);
    border-radius: 4px;
    height: 36px;
    overflow: hidden;
    gap: 0;
  }

  .ticker-label {
    flex-shrink: 0;
    padding: 0 12px;
    font-size: 11px;
    font-weight: 700;
    color: #00e5ff;
    letter-spacing: 2px;
    border-right: 1px solid rgba(0, 180, 255, 0.25);
    background: rgba(0, 180, 255, 0.08);
    height: 100%;
    display: flex;
    align-items: center;
  }

  .ticker-window {
    flex: 1;
    overflow: hidden;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .ticker-track {
    display: flex;
    align-items: center;
    white-space: nowrap;
    width: 200%;
    animation: tickerScroll 60s linear infinite;
  }

  .ticker-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0 24px 0 0;
  }

  .ticker-time {
    font-size: 11px;
    color: #4a90b8;
    font-variant-numeric: tabular-nums;
  }

  .ticker-tag {
    font-size: 10px;
    color: #00c8ff;
    border: 1px solid rgba(0, 200, 255, 0.35);
    padding: 1px 5px;
    border-radius: 2px;
    letter-spacing: 0.5px;
  }

  .ticker-text {
    font-size: 12px;
    color: #c0e4ff;
  }

  .ticker-sep {
    color: rgba(0, 180, 255, 0.2);
    padding: 0 12px 0 0;
  }

  @keyframes tickerScroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
</style>
