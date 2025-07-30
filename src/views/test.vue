<template>
  <div class="radio-button-group-demo">
    <!-- 基础按钮式单选组（默认颜色） -->
    <el-radio-group v-model="selectedType" class="default-style">
      <el-radio-button label="primary">主要</el-radio-button>
      <el-radio-button label="success">成功</el-radio-button>
      <el-radio-button label="warning">警告</el-radio-button>
      <el-radio-button label="danger">危险</el-radio-button>
    </el-radio-group>

    <!-- 自定义颜色的按钮式单选组 -->
    <el-radio-group v-model="selectedStatus" class="custom-style">
      <el-radio-button label="online">在线</el-radio-button>
      <el-radio-button label="offline">离线</el-radio-button>
      <el-radio-button label="maintenance">维护中</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 绑定选中值
const selectedType = ref('primary')
const selectedStatus = ref('online')
</script>

<style scoped>
.radio-button-group-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  margin-top: 150px;
}

/* 自定义颜色样式 */
.custom-style {
  /* 未选中按钮的样式 */
  --el-radio-button-bg-color: #f5f7fa;
  --el-radio-button-text-color: #606266;
  --el-radio-button-border-color: #dcdfe6;
}


</style>
