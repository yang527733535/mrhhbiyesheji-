<template>
     <div class="msite">
        <!--首页头部-->
        <header class="header">
      <HeaderTop :title="address.name"></HeaderTop>   
       <span class="header_search" slot='left'>
           <i class="iconfont icon-sousuo"></i>
       </span>
       <span class="header_login" slot='right'>
            <span class="header_login_text">登录|注册</span>
          </span>
        </header>
        <!--首页导航-->
        <nav class="msite_nav" v-if="categorys.length">
          <div class="swiper-container">
            <div class="swiper-wrapper">
             
              <div :key="index" class="swiper-slide" v-for="(categorys,index) in categorysArr" >
                <a :key="index"  v-for="(category,index) in categorys" href="javascript:" class="link_to_food">
                  <div class="food_container">
                 <img :src="baseImageUrl+category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
                
              </div>
            </div>
            
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>

          </div>
          
      <img  src="./images/msite_back.svg" alt="back" >
        </nav>

        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
         <shoplist></shoplist>
        </div>
      </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import {mapState} from 'vuex'
import shoplist from '../../components/shoplist/shoplist.vue'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
export default {
  computed:{
    
    ...mapState(['address','categorys']),
    //根据categorys一维数组生成二维数值 小数组中的元素个数最大是8
    categorysArr () {
        const categorys = this.categorys
        // 准备空的2维数组
        const arr = []
        // 准备一个小数组(最大长度为8)
        let minArr = []
        // 遍历categorys
        categorys.forEach(c => {
          // 如果当前小数组已经满了, 创建一个新的
          if(minArr.length===8) {
            minArr = []
          }
          // 如果minArr是空的, 将小数组保存到大数组中
          if(minArr.length===0) {
            arr.push(minArr)
          }
          // 将当前分类保存到小数组中
          minArr.push(c)
        })

        return arr
      }
  },
  components:{
    HeaderTop  ,
     shoplist
  },
   mounted() {
  //  this.$store.dispatch('getCategorys')
  //  console.log(this.categorysArr )
// console.log(baseImageUrl);
      //创建一个swiper实例对象，来实现萝卜
      
   },
  data(){
   return {
       baseImageUrl: 'https://fuss10.elemecdn.com'
   }
  },
  watch:{
   categorys(value){  //category数组中有数据了，在异步更新界面之前执行
  
   //希望界面更新就立即创建swiper对象
   this.$nextTick(()=>{ //一旦完成界面更新立即调用 这条语句要写在数据更新之后
  new Swiper('.swiper-container',{
         loop: true, // 循环模式选项
          
         pagination: {
         el: '.swiper-pagination',
    },
      })
   })
    }
  }

}
</script>

<style lang="stylus" scoped>

@import "../../common/stylus/mixins.styl"

.msite  //首页
          width 100%
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
          .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
         </style>

