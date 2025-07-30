<template>
  <div class="progress-indicator">
    <!-- 文字标签 -->
    <div class="labels">
      <span v-for="(seg, idx) in segments" :key="idx" :style="{ left: `${seg.left + seg.width / 2}%` }">
        {{ seg.label }}
      </span>
    </div>

    <!-- 彩色分段条 -->
    <div class="color-bars">
      <div v-for="(seg, idx) in segments" :key="idx" :style="{
        width: `${seg.width}%`,
        backgroundColor: targetColors[seg.color],
        left: `${seg.left}%`
      }"></div>
    </div>

    <!-- 指针 -->
    <div class="pointer" :style="{
      left: `${pointerLeft}%`,
      borderBottomColor: currentColor
    }"></div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import tragetSegment from '@/data/targetSegment.json'
import { targetColors } from '@/constants/colors'

// 定义props并获取
const props = defineProps({
  value: { type: String, required: true },
  name: { type: String, required: true }
});

// const targetJson =  getTargetObject(props.name).segments;

function getTargetObject(name) {
  return tragetSegment.find(item => item.targetName === name) || {};
}


const segments = computed(() => getTargetObject(props.name).segments);

// 计算指针位置（通过props.value访问）
const pointerLeft = computed(() => {
  const seg = segments.value.find(s => s.label === props.value) || segments.value[0];
  return seg.left + seg.width / 2;
});

// 计算指针颜色（通过props.value访问）
const currentColor = computed(() => {
  const seg = segments.value.find(s => s.label === props.value) || segments.value[0];
  return targetColors[seg.color];
});
</script>

<style scoped>
.progress-indicator {
  position: relative;
  height: 80px;
  margin: 20px 0;
}

.labels {
  position: absolute;
  top: -5px;
  width: 100%;
  font-size: 12px;
  text-align: center;
}

.labels span {
  position: absolute;
  transform: translateX(-50%);
  white-space: nowrap;
}

.color-bars {
  position: absolute;
  top: 20px;
  width: 100%;
  height: 20px;
  display: flex;
}

.color-bars div {
  height: 100%;
  flex: 0 0 auto;
}

.pointer {
  position: absolute;
  /* top: 50px; */
  margin-top: 40px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 12px solid black;
  transform: translateX(-50%);
}
</style>