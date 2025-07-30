<template>
  <CustomDialog
    :visible="dialogVisible"
    title="Cookies Usage Tips"
    @close="dialogVisible = false"
  >
    <div class="cookies-content">
      <p>Our website uses cookies to enhance your browsing experience. By continuing to use our website, you consent to our use of cookies.</p>
      <p>You can manage your cookie preferences through your browser settings.</p>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <button class="btn btn-default" @click="handleReject">拒绝</button>
        <button class="btn btn-primary" @click="handleAccept">接受</button>
      </div>
    </template>
  </CustomDialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import cache from '@/plugins/cache';
import cookiesManager from '@/utils/cookiesManager';
import CustomDialog from './CustomDialog.vue';

const dialogVisible = ref(false);

onMounted(() => {
  // Check if user has already made a choice
  const cookiesConsent = cache.local.get('cookies_consent');
  if (!cookiesConsent) {
    dialogVisible.value = true;
  }
});

const handleAccept = () => {
  // Save user's choice
  cache.local.set('cookies_consent', 'accepted');
  dialogVisible.value = false;
};

const handleReject = () => {
  // Save user's choice
  cache.local.set('cookies_consent', 'rejected');
  // Clear all cookies
  cookiesManager.clearAllCookies();
  dialogVisible.value = false;
};
</script>

<style scoped>
.cookies-content {
  margin: 20px 0;
  padding: 10px 0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.btn-default {
  background-color: #f0f0f0;
  color: #333;
}

.btn-primary {
  background-color: #409eff;
  color: white;
}
</style>