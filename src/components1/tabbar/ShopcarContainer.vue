<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表区域 -->
      <div class="mui-card" v-for="(item,index) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getGoodSelected[item.id]"
              @change="selectedChanged(item.id,$store.getters.getGoodSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path" alt>
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :goodsid="item.id" :initcount="$store.getters.getGoodsCount[item.id]"></numbox>
                <!-- 问题 如何从购物车中获取商品的数量 -->
                <!-- 1我们可以先创建一个空对象，然后循环购物车中所有商品的数据
                        把当前循环这条商品的id，作为对象的属性名，count值作为对象的
                属性值，这样，当把所有的商品循环一遍，就会得到一个对象：{88:2,89:1}-->

                <a href="#" @click.prevent="remove(item.id,index)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="letf">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价￥
              <span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>

    <p>{{$store.getters.getGoodSelected}}</p>
  </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue";

export default {
  data() {
    return {
      goodslist: [] //购物车中所有商品的数据
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      //获取购物车商品列表

      //1获取到store中所有商品的id 然后拼接出一个用逗号分隔的字符串
      var idArr = [];
      this.$store.state.car.forEach(item => {
        idArr.push(item.id);
      });
      //如果购物车中没有商品，直接返回 不需要请求数据接口 否则会报错
      if (idArr.length <= 0) {
        return;
      }
      this.$http
        .get(
          "http://www.liulongbin.top:3005/api/goods/getshopcarlist/" +
            idArr.join(",")
        )
        .then(data => {
          if (data.body.status === 0) {
            this.goodslist = data.body.message;
          }
        });
    },
    remove(id, index) {
      //点击删除，把商品从store中根据传递的id删除，同时把当前组件中的goodslist中，对应要删除
      //使用index来删除
      this.goodslist.splice(index, 1);
      this.$store.commit("removefromCar", id);
    },
    selectedChanged(id, val) {
      //每当点击开关，把最新的快关状态 同步到store中
      // console.log(id)
      console.log(val);
      this.$store.commit("updateGoodsSelected", { id: id, selected: val });
    }
  },
  components: {
    numbox
  }
};
</script>


<style  scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
}

.goods-list .mui-card-content-inner {
  display: flex;
  align-items: center;
}
.goods-list img {
  width: 60px;
  height: 60px;
}
.goods-list h1 {
  font-size: 14px;
}
.goods-list .info .price {
  color: red;
  font-weight: bold;
}

.jiesuan {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.jiesuan .red {
  color: red;
}
</style>
