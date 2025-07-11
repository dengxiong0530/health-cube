import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import NotFound from '@/views/error/404.vue';
import { useAuthStore } from '@/stores/auth'
import Dashboard from '@/views/dashboard/Dashboard.vue'
import TEST from '@/views/test.vue'



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
    path: '/test',
    name: 'TEST',
    component: TEST
  },
 
  {

      path: '/dashboard',
      name: 'DashBoard',
      component: Dashboard,
      meta: { requiresAuth: true }

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


// 路由守卫：保护需要登录的页面
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  // await authStore.checkSession() // 检查会话状态
  // console.log(authStore.user)
  // console.log(to.meta.requiresAuth)
  if (to.meta.requiresAuth && !authStore.user) {
    next({ name: 'Login' })
  } else {
    next()
  }
})


export default router;