<template>
<div>
  <div class="header">
    <router-link to="/list" class="header-title">电商网站</router-link>
    <div class="header-menu">
    <router-link to="/cart" class="header-menu-cart">
      购物车
      <span v-if="cartList.length">{{cartList.length}}</span>  <!--显示数量-->
    </router-link>
    </div>
  </div>
      <router-view></router-view>
</div>
</template>
<script>
export default {
  computed:{
    cartList(){
      //拿到vuex的cartlist数据 点击之后添加的 
      return this.$store.state.cartList;
    }
  }
}
</script>


