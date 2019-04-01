<template>
  <div>
    <mt-header class="he" fixed title="🐱第一个VUE项目😈">
      <span @click="goBack" slot="left">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            v-for="(item,index) in cates"
            :key="index"
            class="mui-control-item mui-active"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link tag="li" v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
//1导入mui 的js文件
// import mui from '../../lib/mui/js/mui.min.js'
//2 初始化滑动控件
//  mui('.mui-scroll-wrapper').scroll({
// 	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
//     });

export default {
  data() {
    return {
      cates: [], //所有分类的列表数组
      list: []
    };
  },
  created() {
    this.getAllCategort();
    this.getphotobycateid(0);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getAllCategort() {
      //获取所有图片分类
      this.$http
        .get("http://www.liulongbin.top:3005/api/getimgcategory")
        .then(result => {
          if (result.body.status === 0) {
            result.body.message.unshift({ title: "全部", id: 0 });
            this.cates = result.body.message;
          }
        });
    },
    getphotobycateid(cateid) {
      //根据ID获取获取图片列表
      this.$http
        .get("http://www.liulongbin.top:3005/api/getimages/" + cateid)
        .then(data => {
          if (data.body.status === 0) {
            this.list = data.body.message;
          }
        });
    }
  }
};
</script>

<style  scoped>
.mui-slider {
  margin-top: 40px;
}
.photo-list {
  margin: 0;
  padding: 10px;
  list-style: none;
  padding-bottom: 0;
}
.photo-list li {
  position: relative;
  text-align: center;
  margin-bottom: 10px;
  background-color: #ccc;
  box-shadow: 0 0 9px #999;
}
.photo-list li .info {
  color: white;
  text-align: left;
  position: absolute;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.4);
}
.photo-list li .info .info-title {
  font-size: 14px;
}
.photo-list li .info .info-body {
  font-size: 13px;
}
.photo-list li img {
  widows: 100%;
  vertical-align: middle;
}
.photo-list li img[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>
