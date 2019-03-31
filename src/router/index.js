// 路由器对象模块


import Shop from '../pages/shop/Shop'
import ShopGoods from '../pages/shop/ShopGoods/ShopGoods'
import ShopInfo from '../pages/shop/ShopInfo/ShopInfo'
import ShopRating from '../pages/shop/ShopRating/ShopRating'




import Vue from 'vue'
import Goodsinfo from '../components1/goods/GoodsInfo'
import GoodsDesc from '../components1/goods/GoodsDesc'
import Goodcomment from '../components1/goods/Goodscomment'
import goodslist from '../components1/goods/GoodsList'
import ShopcarContainer from '../components1/tabbar/ShopcarContainer'
import photoinfo from '../components1/photos/photoinfo'
import VueRouter from 'vue-router'
import photolist from '../components1/photos/Photolist.vue'
import MemberContainer from '../components1/tabbar/MemberContainer'
import Msite from '../pages/Msite/Msite.vue'
import NewInfo from '../components1/news/Newinfo.vue'
import NewsList from '../components1/news/NewsList.vue'
import SearchContainer from '../components1/tabbar/SearchContainer'
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
        { path:'/shopcar',
          component:ShopcarContainer 
        },
        {
            path:'/home/goodslist/',
            component:goodslist
        },
        {
            path:'/home/goodscomment/:id',
            component:Goodcomment,
            name:'pinglun'
        },
        {
            path:'/home/goodsinfo/:id',
            component: Goodsinfo
        },
        {path:'/home/goodsdesc/:id',
        component:GoodsDesc,
        name:'jieshao'},
        {
            path:'/home/photoinfo/:id',
            component:photoinfo
        },
        {
            path:'/home/photolist',
            component:photolist
        },
        {
            path:'/home/newsinfo/:id',
            component:NewInfo
        },
        {
            path:"/member",
            component:MemberContainer
        },
        {
            path:"/home/newslist",
            component:NewsList
        },
       
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
            component:SearchContainer,
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
        {
            path:"/shop",
            component:Shop,
            children:[
                {
                path:"/shop/goods",
                component:ShopGoods
                },
                {
                path:"/shop/ratings",
                component:ShopRating
                 },
                 {
                 path:"/shop/info",
                 component:ShopInfo
                  },
                  {
                      path:"",
                      redirect:"/shop/goods"
                  }
            ]
        }
        
    ]

})