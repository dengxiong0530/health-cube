<template>
  <div class="profile-container">
    <!-- 自定义标签栏，若不需要可删除，这里保留方便整体结构 -->
    <div class="custom-tabs">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        :class="['custom-tab', { 'custom-tab--active': activeTab === tab.name }]"
        @click="activeTab = tab.name"
      >
        {{ tab.label }}
      </div>
    </div>

    <!-- 关于信息 -->
    <div class="about-section" v-if="activeTab === 'overview'">
      <h2 class="section-title">About</h2>
      <p class="about-content">
        Ethan Leo is a seasoned and results-driven Project Manager who brings experience and expertise 
        to project management. With a proven track record of successfully delivering complex projects on 
        time and within budget, Ethan Leo is the go-to professional for organizations seeking efficient and 
        effective project leadership.
      </p>

      <h2 class="section-title">Profile</h2>
      <!-- 手动实现的表格区域 -->
      <div class="custom-table">
        <div 
          class="table-row" 
          v-for="(item, index) in profileData" 
          :key="index"
        >
          <div class="table-cell label-cell">{{ item.label }}</div>
          <div class="table-cell value-cell">{{ item.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('overview');
const tabs = [
  { name: 'overview', label: 'Overview' },
  { name: 'profile', label: 'Profile' },
  { name: 'emails', label: 'Emails' },
  { name: 'password', label: 'Password' }
];
const profileData = [
  { label: 'First Name', value: 'Ethan' },
  { label: 'Last Name', value: 'Leo' },
  { label: 'Education', value: 'M.S Computer Science' },
  { label: 'Address', value: 'Mountain View, California' },
  { label: 'Country', value: 'United States' },
  { label: 'Job', value: 'Project Manager' },
  { label: 'Company', value: 'GitHub Inc' },
  { label: 'Phone', value: '+1 (248) 679-8745' },
  { label: 'Email', value: '[email protected]' }
];
</script>

<style scoped>
.profile-container {
  padding: 20px;
}
/* 标签栏样式，可根据需求调整或删除 */
.custom-tabs {
  display: flex;
  border-bottom: 1px solid var(--el-border-color);
  margin-bottom: 20px;
}
.custom-tab {
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 500;
  color: var(--el-text-color-secondary);
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
}
.custom-tab:hover {
  color: var(--el-color-primary);
}
.custom-tab--active {
  color: var(--el-color-primary);
  border-bottom-color: var(--el-color-primary);
}
.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.about-content {
  line-height: 1.6;
  margin-bottom: 20px;
}
/* 自定义表格样式 */
.custom-table {
  width: 100%;
  border-collapse: collapse; /* 合并边框，让线条显示清晰 */
  border: 1px solid #fff; /* 表格外层边框，可根据需要调整 */
}
.table-row {
  display: flex;
  border-bottom: 2px solid #fff; /* 加大底部横线宽度，调整为2px */
}
.table-cell {
  flex: 1;
  padding: 8px 12px;
  background-color: #f5f7fa; /* 灰色格子背景，可根据需求微调色调 */
  border-right: 2px solid #fff; /* 添加竖线，宽度2px，颜色白色 */
}
/* 去掉最后一个单元格的右边框，避免与表格外层边框重复 */
.table-cell:last-child {
  border-right: none; 
}
.label-cell {
  font-weight: 500;
}
</style>