<template>
  <teleport to="body">
    <div v-if="visible" class="custom-dialog-overlay">
      <div class="custom-dialog">
        <div class="custom-dialog-header">
          <h3>{{ title }}</h3>
        </div>
        <div class="custom-dialog-content">
          <slot></slot>
        </div>
        <div class="custom-dialog-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

defineEmits(['close']);
</script>

<style scoped>
.custom-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.custom-dialog {
  width: 30%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-top: 50px;
}

.custom-dialog-header {
  padding: 20px 20px 10px;
  border-bottom: 1px solid #eee;
}

.custom-dialog-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.custom-dialog-content {
  padding: 20px;
  max-height: 500px;
  overflow-y: auto;
}

.custom-dialog-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>