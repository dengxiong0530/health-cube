import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import cookiesManager from '@/utils/cookiesManager';
import 'font-awesome/css/font-awesome.min.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入Element Plus英文语言包
import enLocale from 'element-plus/dist/locale/en.mjs'
import store from './stores'
import {useAuthStore} from './stores/auth'

const app = createApp(App)
app.use(router);
app.use(store);
// 配置Element Plus使用英文语言
app.use(ElementPlus, {
  locale: enLocale,
})
const authStore = useAuthStore()
authStore.init() // 从 Cookie 恢复用户信息

// 初始化cookies管理
cookiesManager.init();

app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
