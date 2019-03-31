// 入口文件

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store'
import VueResource from 'vue-resource'

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import {Button} from 'mint-ui'

Vue.component(Button.name,Button)  //mt-button标签可以直接用了
Vue.use(VueResource)
Vue.use(MintUI)
new Vue({
    el:"#app",
    render :h=>h(App),
    router, //使用上vue-router
    store  //使用上vuex
})