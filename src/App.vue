<template>
    <div id="app">
   <router-view></router-view>
   <FooterGuide v-if="$route.meta.showFooter"></FooterGuide>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {  
//  ...mapActions //返回的是一个对象 对象里面是方法 直接调用即可
  mounted(){
    //  this.$store.dispatch('getAddress')
    this.getAddress()
    this.getCategorys()
    this.getShops()
 },
 methods:{
   ...mapActions(['getAddress','getCategorys','getShops'])
 },
    components:{
      FooterGuide
    },
  data(){
   return {

   }
  }
}
</script>

 
<style lang="stylus" scoped>
 
  .app
    width 100%
    height 100%
    background #f5f5f5
</style>

