<template>
  <el-card 
    class="custom-stat-card" 
    :style="{ backgroundColor: cardColor, borderRadius: '16px' }"
  >
    <div class="stat-title" >{{ title }}</div>
    <div class="stat-value">{{ value }}</div>

  </el-card>
</template>

<script setup>
import { ElCard } from 'element-plus';

defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  cardColor: {
    type: String,
    default: '#646cff' // 默认蓝色，可通过props修改
  }
});
</script>

<style scoped>
.custom-stat-card {
  /* padding: 24px; */
  color: white;
  box-shadow: none; /* 去除默认卡片阴影 */
}

.stat-title {
  font-size: 15px;
  margin-bottom: 12px;
  opacity: 0.8;
   font-family: "Nunito", sans-serif;
}

.stat-value {
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 8px;
  text-align: center;
  font-family: "Nunito", sans-serif;
  
}


</style>