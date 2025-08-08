<template>
  <Analytics />
  <BasicLayout />

</template>

<style scoped></style>

<script setup>
import BasicLayout from './layouts/BasicLayout.vue'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Analytics } from '@vercel/analytics/vue';

onMounted(() => {
  const authStore = useAuthStore()
  authStore.checkSession() // 应用加载时检查登录状态
})

</script>