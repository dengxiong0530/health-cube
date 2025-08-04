import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import NotFound from '@/views/error/404.vue';
import { useAuthStore } from '@/stores/auth'
import Dashboard from '@/views/dashboard/Dashboard.vue'
import TEST from '@/views/test.vue'

import Settings from '@/views/Settings/Settings.vue'
import Trend from '@/views/trend/Trend.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'


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

    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: { requiresAuth: true }

  }
  ,
  {

    path: '/trend',
    name: 'trend',
    component: Trend,
    meta: { requiresAuth: true }

  },
   {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      guest: true 
    }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: {
      guest: true 
    }
  }

  ,
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
  
    if (savedPosition) {
      return savedPosition;
    }
 
    else if (to.name === from.name && to.params.id !== from.params.id) {
      return { top: 0 };
    }

    else {
      return { top: 0 };
    }
  }
});


// 路由守卫：保护需要登录的页面
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.user) {
    next({ name: 'Login' })
       ElMessage.warning('Please sgin in first.')
  } else {
    next()
  }
})


export default router;