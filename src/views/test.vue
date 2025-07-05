<template>
  <div class="gauge-container">
    <canvas ref="canvasRef" :width="size" :height="size" class="gauge-canvas"></canvas>
    <div class="gauge-info">
      <div class="gauge-value">{{ value }}<span class="gauge-unit">{{ unit }}</span></div>
      <div class="gauge-label">{{ label }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, watch } from 'vue';

const props = defineProps({
  // 仪表盘当前值
  value: {
    type: Number,
    default: 0
  },
  // 最小值
  min: {
    type: Number,
    default: 0
  },
  // 最大值
  max: {
    type: Number,
    default: 100
  },
  // 仪表盘标题
  label: {
    type: String,
    default: '仪表盘'
  },
  // 单位
  unit: {
    type: String,
    default: '%'
  },
  // 仪表盘大小
  size: {
    type: Number,
    default: 300
  },
  // 动画持续时间（毫秒）
  animationDuration: {
    type: Number,
    default: 1500
  },
  // 刻度数量
  ticks: {
    type: Number,
    default: 10
  },
  // 颜色配置
  colors: {
    type: Object,
    default: () => ({
      background: '#f0f0f0',
      progress: '#3498db',
      text: '#333',
      needle: '#e74c3c',
      tick: '#999'
    })
  }
});

const canvasRef = ref(null);
let ctx = null;
let animationFrameId = null;
let currentValue = 0;
let lastAnimationTime = 0;

// 初始化和绘制仪表盘
const initGauge = () => {
  if (!canvasRef.value) return;
  
  ctx = canvasRef.value.getContext('2d');
  currentValue = props.min;
  drawGauge();
};

// 绘制仪表盘
const drawGauge = () => {
  if (!ctx) return;
  
  const { size, min, max, ticks, colors } = props;
  const center = size / 2;
  const radius = center * 0.8;
  const startAngle = (3 * Math.PI) / 4;
  const endAngle = (Math.PI) / 4;
  const totalAngle = startAngle - endAngle;
  
  // 清除画布
  ctx.clearRect(0, 0, size, size);
  
  // 绘制背景圆弧
  ctx.beginPath();
  ctx.arc(center, center, radius, startAngle, endAngle, true);
  ctx.lineWidth = radius * 0.15;
  ctx.strokeStyle = colors.background;
  ctx.stroke();
  
  // 绘制刻度
  ctx.lineWidth = 2;
  ctx.strokeStyle = colors.tick;
  ctx.font = `bold ${radius * 0.08}px Arial`;
  ctx.fillStyle = colors.text;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  for (let i = 0; i <= ticks; i++) {
    const tickAngle = startAngle - (i / ticks) * totalAngle;
    const tickStartX = center + Math.cos(tickAngle) * (radius - ctx.lineWidth);
    const tickStartY = center - Math.sin(tickAngle) * (radius - ctx.lineWidth);
    const tickEndX = center + Math.cos(tickAngle) * (radius - ctx.lineWidth * 5);
    const tickEndY = center - Math.sin(tickAngle) * (radius - ctx.lineWidth * 5);
    
    ctx.beginPath();
    ctx.moveTo(tickStartX, tickStartY);
    ctx.lineTo(tickEndX, tickEndY);
    ctx.stroke();
    
    // 绘制刻度值
    if (i % 2 === 0) { // 只在偶数刻度显示数值
      const value = min + (i / ticks) * (max - min);
      const textX = center + Math.cos(tickAngle) * (radius - ctx.lineWidth * 7);
      const textY = center - Math.sin(tickAngle) * (radius - ctx.lineWidth * 7);
      ctx.fillText(value.toFixed(0), textX, textY);
    }
  }
  
  // 绘制当前值圆弧
  const valueRatio = (currentValue - min) / (max - min);
  const valueAngle = startAngle - valueRatio * totalAngle;
  
  ctx.beginPath();
  ctx.arc(center, center, radius, startAngle, valueAngle, true);
  ctx.lineWidth = radius * 0.15;
  ctx.strokeStyle = colors.progress;
  ctx.stroke();
  
  // 绘制指针
  ctx.beginPath();
  ctx.moveTo(center, center);
  ctx.lineTo(
    center + Math.cos(valueAngle) * (radius * 0.6),
    center - Math.sin(valueAngle) * (radius * 0.6)
  );
  ctx.lineWidth = radius * 0.03;
  ctx.lineCap = 'round';
  ctx.strokeStyle = colors.needle;
  ctx.stroke();
  
  // 绘制指针中心圆
  ctx.beginPath();
  ctx.arc(center, center, radius * 0.08, 0, Math.PI * 2);
  ctx.fillStyle = colors.needle;
  ctx.fill();
  
  // 绘制中心小圆
  ctx.beginPath();
  ctx.arc(center, center, radius * 0.03, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
};

// 动画更新仪表盘值
const animateGauge = (timestamp) => {
  if (!lastAnimationTime) lastAnimationTime = timestamp;
  const elapsed = timestamp - lastAnimationTime;
  
  if (elapsed < 16) { // 控制帧率
    animationFrameId = requestAnimationFrame(animateGauge);
    return;
  }
  
  lastAnimationTime = timestamp;
  
  const { value, min, max, animationDuration } = props;
  const targetValue = Math.max(min, Math.min(max, value));
  const delta = (targetValue - currentValue) * (elapsed / animationDuration);
  
  if (Math.abs(delta) > 0.1) {
    currentValue += delta;
    drawGauge();
    animationFrameId = requestAnimationFrame(animateGauge);
  } else {
    currentValue = targetValue;
    drawGauge();
  }
};

// 值变化时开始动画
watch(() => props.value, () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  lastAnimationTime = 0;
  animationFrameId = requestAnimationFrame(animateGauge);
});

onMounted(() => {
  initGauge();
  animationFrameId = requestAnimationFrame(animateGauge);
});

onUpdated(() => {
  if (ctx) {
    drawGauge();
  }
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
.gauge-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gauge-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.gauge-info {
  position: relative;
  text-align: center;
  z-index: 10;
}

.gauge-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.gauge-unit {
  font-size: 16px;
  margin-left: 4px;
}

.gauge-label {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}
</style>  