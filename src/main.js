import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import store from './store/index'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import api from './utils/request.js'

const app = createApp(App)

const token = localStorage.getItem('userToken', '')
api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(store);
app.use(router);
app.use(ElementPlus);

app.mount('#app')
