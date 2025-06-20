import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router';
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'font-awesome/css/font-awesome.min.css'
import store from './store'

const app = createApp(App)
app.use(router);
app.use(store);

app.mount('#app')
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }
