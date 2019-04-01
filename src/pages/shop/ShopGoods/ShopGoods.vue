<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!--current-->
         <li class="menu-item" v-for="(good, index) in goods" :key="index"
              :class="{current: index===currentIndex}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li  v-for="(good,index) in goods" :key="index" class="food-list-hook">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li :key="index" v-for="(food,index) in good.foods " class="food-item bottom-border-1px" >
                <div class="icon">
                  <img  :src="food.icon"
                  width="57" height="57" >
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span  v-if="food.oldPrice" class="old" >￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                  
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
     
    </div>
    
  </div>
</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
 

 //列表显示之后创建
// new BScroll('.menu-wrapper')

export default {
  computed:{
   ...mapState(['goods']),

   //计算得到当前分类的下标
   currentIndex(){

    //得到条件数据
  const {scrollY, tops} = this
    // 根据条件计算产生一个结果
    const index = tops.findIndex((top,index)=>{
       
        // scrollY>=top && scrollY<下一个top
    return scrollY>=top && scrollY<tops[index+1]
    })
       // 返回结果
        return index
   
}
    //
  },
 mounted(){
   this.$store.dispatch('getShopGoods',()=>{
     //数据更新之后再执行
     this.$nextTick(()=>{
      //  列表显示之后创建
        this._initScroll()
        this._initTops()
     })
     
   

   })
  
 },
  data(){
   return {
     scrollY:'0',  // scrollY 右侧滚动的Y轴坐标 (滑动过程中时刻在变化)
     tops:[]  // tops:所有右侧分类li的top组成的数组  (列表第一次显示以后不再变化)
   }
  },
  methods:{
    // 初始化滚动条
    _initScroll(){
       new BScroll('.menu-wrapper',{   
        })
           const foodsScroll= new BScroll('.foods-wrapper',{
           probeType:2 //因为惯性滑动 不会触发
        })
        //给右侧列表绑定scroll监听
        foodsScroll.on('scroll',({x,y})=>{
        this.scrollY = Math.abs(y)
    })
    foodsScroll.on('scrollEnd',({x,y})=>{
      console.log(x,y);
        this.scrollY = Math.abs(y)
    })
       //给右侧列表绑定scroll结束的监听
    },
    _initTops(){
    //得到的是一个伪数组
    //1 初始化tops
    const tops = []
    let top = 0
    tops.push(top)
    //2 收集
    const lis = this.$refs.foodsUl.children
    Array.prototype.slice.call(lis).forEach(li=>{
      top = top + li.clientHeight
      tops.push(top)
    })

    //3 更新状态
    this.tops = tops
    console.log(tops);
    }
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 215px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
