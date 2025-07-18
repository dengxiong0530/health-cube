import { defineStore } from 'pinia';

export const useUserTargetStore = defineStore('userTarget', {
  state: () => ({
    targets: []
  }),
  actions: {
    /**
     * 更新或添加目标到存储
     * @param target 要更新或添加的目标
     */
    upsetTargetStore(target) {
      const targetIndex = this.targets.findIndex(item => item.name === target.name);
      
      if (targetIndex !== -1) {
        // 更新现有目标
        this.targets[targetIndex] = { ...this.targets[targetIndex], ...target };
      } else {
        // 添加新目标
        this.targets.push(target);
      }
    }
  }
});    