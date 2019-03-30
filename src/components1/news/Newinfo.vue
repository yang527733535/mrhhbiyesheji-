<template>
    <div class="newsinfo-container">
         <!-- 获取ID的手段 -->
          <mt-header  class="he" fixed title="🐱第一个VUE项目😈">
<span   @click="goBack" slot="left">
    <mt-button icon="back">返回</mt-button>
  </span> 
				</mt-header>
          <!-- 大标题 -->
        <h3 class="title">{{newinfo.title}}</h3>
        <!-- 小标题 -->
        <p class="subtitle">

             <span> 发表时间:{{newinfo.add_time}}</span> 
             <span>点击:{{newinfo.click}}</span>
        </p>
        <hr>
            <!-- 内容区域-->
           <div class="content" v-html='newinfo.content'></div>
            <!-- 评论子组件区域 -->
            <comment-box :id='this.id'></comment-box>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'

export default {
    data(){
        return{
              id:this.$route.params.id,  //这是将url传递过来的ID值，挂在到data上，方便以后调用
              newinfo:{} //新闻对象
        }
       
    },
    created(){
      this.getNewsInfo()
    },
    methods:{
         goBack(){
				//点击后退
				this.$router.go(-1)
		 },
        getNewsInfo(){

            this.$http.get('http://www.liulongbin.top:3005/api/getnew/'+this.id).then(result=>{
                 if(result.body.status === 0){
                    this.newinfo =result.body.message[0];
                 }else{
                     Toast('获取失败')
                 }
            
            })

        }
    },
    components:{
       'comment-box' :comment
    }
}

</script>


<style  scoped>
.newsinfo-container{
     padding:0 4px;
}

.title{
      font-size: 16px;
      color: hotpink;
      text-align: center;
      margin: 15px 0;
      margin-top: 55px
    }

     .subtitle{
   font-size: 13px;
   color: blue;
   display: flex;
   justify-content: space-between
    }

    .content{
   font-size: 14px;
   color:grey
    }


</style>

