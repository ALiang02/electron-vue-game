import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { createFromIconfontCN } from '@ant-design/icons-vue'
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3352346_5eha77ddspc.js', // 在 iconfont.cn 上生成
})

const app = createApp(App).use(store).use(router).use(ElementPlus).use(Antd)
app.component('my-icon', MyIcon)
app.mount('#app')
