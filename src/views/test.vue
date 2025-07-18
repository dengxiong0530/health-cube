<template>
  <header class="app-header">
    <div class="header-content">
      <!-- Logo区域 -->
      <div class="logo">
        <span class="el-icon-s-home"></span>
        <span class="title">健康管理平台</span>
      </div>

      <!-- 桌面端导航 -->
      <nav class="desktop-nav" v-if="!isMobile">
        <ul class="nav-list">
          <li class="nav-item" @click="navigateTo('dashboard')">
            <span class="el-icon-s-data"></span> 仪表盘
          </li>
          <li class="nav-item" @click="navigateTo('profile')">
            <span class="el-icon-user"></span> 个人资料
          </li>
          <li class="nav-item" @click="navigateTo('history')">
            <span class="el-icon-s-order"></span> 历史记录
          </li>
          <li class="nav-item" @click="navigateTo('settings')">
            <span class="el-icon-setting"></span> 设置
          </li>
        </ul>
      </nav>

      <!-- 移动端导航按钮 -->
      <div class="mobile-nav" v-else>
        <el-dropdown @command="navigateTo">
          <el-button type="text">
            <i class="el-icon-menu"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="dashboard">
                <span class="el-icon-s-data"></span> 仪表盘
              </el-dropdown-item>
              <el-dropdown-item command="profile">
                <span class="el-icon-user"></span> 个人资料
              </el-dropdown-item>
              <el-dropdown-item command="history">
                <span class="el-icon-s-order"></span> 历史记录
              </el-dropdown-item>
              <el-dropdown-item command="settings">
                <span class="el-icon-setting"></span> 设置
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isMobile = ref(false);

// 判断屏幕尺寸
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

// 导航方法
const navigateTo = (path) => {
  router.push({ name: path });
};

// 监听窗口大小变化
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

// 组件卸载时移除监听器
watch(() => isMobile.value, (newVal) => {
  // 可以在这里添加切换动画逻辑
});

// 清理
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<style scoped>
.app-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 60px;
  display: flex;
  align-items: center;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
}

.desktop-nav .nav-list {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.desktop-nav .nav-item {
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
}

.desktop-nav .nav-item:hover {
  background-color: #f5f7fa;
}

.mobile-nav .el-dropdown {
  height: 100%;
}

/* 移动端样式 */
@media (max-width: 767px) {
  .desktop-nav {
    display: none;
  }
}

/* 桌面端样式 */
@media (min-width: 768px) {
  .mobile-nav {
    display: none;
  }
}
</style>