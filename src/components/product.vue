<template>
    <div class="product">
<!--     动态路由跳转        -->
        <router-link :to="'/product/' + info.id" class="product-main">
            <img :src="info.image">
            <h4>{{ info.name }}</h4>                      <!--动态绑定颜色-->  
            <div class="product-color" :style="{ background: colors[info.color]}"></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div>
        </router-link>
    </div>
</template>
<script>
// 本组件效果  商品列表 鼠标经过时 显示加入购物车
export default {
  props: {
    info:{
        type:Object
    }
  },
  data() {
    return {
      colors: {
        '白色': "#ffffff",
        '金色': "#dac272",
        '蓝色': "#233472",
        '红色': "#f2352e"
      }
    };
  },
  methods:{
      // 点击加入购物车时 Vuex触发mutation保存到购物车 参数为商品的id
      handleCart(){
          this.$store.commit('addCart',this.info.id);
      }
  }
};
</script>
<!--只在本组件内生效-->
<style scoped>
 .product{
        width: 25%;
        float: left;
    }
    .product-main{
        display: block;
        margin: 16px;
        padding: 16px;
        border: 1px solid #dddee1;
        border-radius: 6px;
        overflow: hidden;
        background: #fff;
        text-align: center;
        position: relative;
    }
    .product-main img{
        width: 100%;
    }
    h4{
        color: #222;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .product-main:hover h4{
        color: #0070c9;
    }
    .product-color{
        display: block;
        width: 16px;
        height: 16px;
        border: 1px solid #dddee1;
        border-radius: 50%;
        margin: 6px auto;
    }
    .product-cost{
        color: #de4037;
        margin-top: 6px;
    }
    .product-add-cart{
        display: none;
        padding: 4px 8px;
        background: #2d8cf0;
        color: #fff;
        font-size: 12px;
        border-radius: 3px;
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .product-main:hover .product-add-cart{
        display: inline-block;
    }
</style>

