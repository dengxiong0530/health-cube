import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import NotFound from '@/views/error/404.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },
    {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)*', // Vue Router 4.x 语法，匹配所有路径
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 当存在保存的位置时（如后退操作），恢复到该位置
    if (savedPosition) {
      return savedPosition;
    } 
    // 对于动态路由跳转，强制滚动到顶部
    else if (to.name === from.name && to.params.id !== from.params.id) {
      return { top: 0 };
    } 
    // 其他情况默认滚动到顶部
    else {
      return { top: 0 };
    }
  }
});

export default router;