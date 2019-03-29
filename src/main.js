// 入口文件

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'



import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'


Vue.use(MintUI)
new Vue({
    el:"#app",
    render :h=>h(App),
    router
})