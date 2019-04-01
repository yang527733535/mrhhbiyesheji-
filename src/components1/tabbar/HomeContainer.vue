<template>
  <div>
    <!-- 这是轮播图区域 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img class="jy1" src="./jy1.jpeg" alt>
        </div>
        <div class="swiper-slide">slider2</div>
        <div class="swiper-slide">slider3</div>
      </div>
    </div>
    <!-- 九宫格到6宫格的改造  -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li  class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../images/menu1.png" alt>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../images/menu2.png" alt>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../images/menu3.png" alt>
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../images/menu4.png" alt>
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../images/menu5.png" alt>
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../images/menu6.png" alt>
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
//  import {Toast} from 'mint-ui'
import Swiper from "swiper";
import axios from "axios";
import "swiper/dist/css/swiper.css";

var mySwiper = new Swiper(".swiper-container", {
  direction: "vertical", // 垂直切换选项
  loop: true, // 循环模式选项

  // 如果需要分页器
  pagination: {
    el: ".swiper-pagination"
  },

  // 如果需要前进后退按钮
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },

  // 如果需要滚动条
  scrollbar: {
    el: ".swiper-scrollbar"
  }
});

export default {
  data() {
    return {
      lunbotuList: [] //保存轮播图的数组
    };
  },
  created() {
    //  this.getLunbotu()
  },
  components: {},
  methods: {}
};
</script>

<style lang="stylus" scoped>
.jy1 {
  height: 100%;
  width: 73%;
}

.swiper-container {
  width: 600px;
  height: 300px;
}

.mui-grid-view.mui-grid-9 {
  background-color: white;
  border: none;

  img {
    width: 60px;
    height: 60px;
  }

  .mui-media-body {
    font-size: 14px;
  }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}
</style>
