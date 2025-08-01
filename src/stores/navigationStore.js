// src/store/navigationStore.js
import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    // 存储要传递的参数
    selectedItem: null,
    shouldNavigate: false,
    isInit: false

  }),
  actions: {
    // 触发导航并传递参数
    navigateToB(item, init) {
      this.selectedItem = item;
      //  console.log(this.position)
      this.shouldNavigate = true;

      this.isInit = init;


    },

    // 重置状态
    resetNavigation() {
      this.selectedItem = null;
      this.shouldNavigate = false;
      this.isInit = false;
    }
  }
});