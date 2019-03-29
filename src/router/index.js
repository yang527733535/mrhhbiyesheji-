// 路由器对象模块
import Vue from 'vue'

import VueRouter from 'vue-router'


import Msite from '../pages/Msite/Msite.vue'

import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import login from '../pages/login/login.vue'
import app1 from '../pages/app1/app1.vue'
import HomeContainer from '../components1/tabbar/HomeContainer.vue'
//声明使用插件
 Vue.use(VueRouter)

export default new VueRouter({
    // 所有路由
    routes:[
        {
            path:"/home",
            component:app1
        },
        {
            path:"/msite",
            component:Msite,
            meta:{
                showFooter:true
            }
        },
        {
            path:"/search",
            component:Search,
            meta:{
                showFooter:true
            }
        },
        {
            path:"/order",
            component:Order,
            meta:{
                showFooter:true
            }
        },
        {
            path:"/profile",
            component:Profile,
            meta:{
                showFooter:true
            }
        },
        {
            path:"/",
            redirect:"./home",
             meta:{
                showFooter:true
            }
        },
        {
            path:"/login",
            component:login,
            meta:{
                showFooter:false
            }
        },

    ]

})