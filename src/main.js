import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router';
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'font-awesome/css/font-awesome.min.css'
import ElementPlus from 'element-plus'
import store from './stores'
import {useAuthStore} from './stores/auth'

const app = createApp(App)
app.use(router);
app.use(store);
app.use(ElementPlus)
const authStore = useAuthStore()
authStore.init() // 从 Cookie 恢复用户信息

app.mount('#app')
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }
