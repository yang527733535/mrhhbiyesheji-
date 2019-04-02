/* eslint-disable no-new */
// 入口文件
import './Mock/mockServer' // 加载mockserver即可
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// eslint-disable-next-line import/no-duplicates
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
// eslint-disable-next-line import/no-duplicates
import {Button} from 'mint-ui'
import loading from './common/image/loading.gif'
import './filter/index.js'  //加载过滤器

Vue.component(Button.name, Button) // mt-button标签可以直接用了
Vue.use(VueResource)
Vue.use(MintUI)
Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  //内部自定义了一个指令 lazy
   loading
})

new Vue({
  el: '#app',
  render: h => h(App),
  router, // 使用上vue-router
  store // 使用上vuex
})
