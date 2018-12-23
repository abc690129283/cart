<template>
  <div v-if="list.length">
    <div class="list-control">
      <div class="list-control-filter">
        <span>品牌：</span>
        <span
          class="list-control-filter-item"
          v-for="item in brands"
          :class="{on:item===filterBrand}"
          @click="handleFilterBrand(item)"
        >{{item}}</span>
      </div>
      <div class="list-control-filter">
        <span>颜色：</span>
        <span
          class="list-control-filter-item"
          v-for="item in colors"
          :class="{on:item===filterColor}"
          @click="handleFilterColor(item)"
        >{{item}}</span>
      </div>
      <div class="list-control-order">
        <span>排序：</span>
        <span
          class="list-control-order-item"
          :class="{on:order===''}"
          @click="handleOrderDefault"
        >默认</span>
        <span
          class="list-control-order-item"
          :class="{on:order==='sales'}"
          @click="handleOrderSales"
        >销量
          <template v-if="order==='sales'">↓</template>
        </span>
        <span
          class="list-control-order-item"
          :class="{on:order.indexOf('cost')>-1}"
          @click="handleOrderCost"
        >价格
          <template v-if="order==='cost-asc'">↑</template>
          <template v-if="order==='cost-desc'">↓</template>
        </span>
      </div>
    </div>
    <Product v-for="item in filterAndOrderedList" :info="item" :key="item.id"></Product>
    <div class="product-ont-found" v-show="!filterAndOrderedList.length">
         暂无相关商品
    </div>
  </div>
</template>
<script>
import Product from "../components/product.vue";
export default {
  data() {
    return {
      order: "",
      filterBrand: "",
      filterColor: ""
    };
  },
  components: { Product },
  computed: {
    list() {
      return this.$store.state.productList;
    },
    brands() {
      return this.$store.getters.brands;
    },
    colors() {
      return this.$store.getters.colors;
    },
    // 过滤
    filterAndOrderedList() {
      let list = [...this.list];
      // 点击选中的时候 进行过滤 赋值回给list  筛选
      if (this.filterBrand !== "") {
        list = list.filter(item =>{
           //  10不同 === 10相同  从而显示为结果true的
            return item.brand===this.filterBrand;
        });
      }
      if(this.filterColor!==''){
          list = list.filter(item=>item.color===this.filterColor);
      }
      // .....排序  点击之后 进行判断
      if(this.order!==''){
          // 销量
          if(this.order==='sales'){
              list = list.sort((a,b)=>b.sales - a.sales);
              // 降序 大到小
          }else if (this.order==='cost-desc') {
              list = list.sort((a,b)=>b.cost - a.cost);
              // 升序 小到大
          }else if(this.order==='cost-asc'){
              list = list.sort((a,b)=>a.cost - b.cost);
          }
      }
      return list;
    }


  },
  mounted() {
    // 更新数据
    this.$store.dispatch("getProductList");
  },
  methods: {
    handleOrderDefault() {
      this.order = "";
    },
    handleOrderSales() {
      this.order = "sales";
    },
    handleOrderCost() {
      if (this.order === "cost-desc") {
        this.order = "cost-asc";
      } else {
        this.order = "cost-desc";
      }
    },
    handleFilterBrand(brand) {
      // 选中与取消
      if (this.filterBrand === brand) {
        this.filterBrand = "";
      } else {
        this.filterBrand = brand;
      }
    },
    handleFilterColor(color){
        if(this.filterColor===color){
            this.filterColor = '';
        }else{
            this.filterColor = color;
        }
    }
  }
};
</script>
<style scoped>
.list-control {
  background: #fff;
  border-radius: 6px;
  margin: 16px;
  padding: 16px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  color: black;
}
.list-control-filter {
  margin-bottom: 16px;
}
.list-control-filter-item,
.list-control-order-item {
  cursor: pointer;
  display: inline-block;
  border: 1px solid #e9eaec;
  border-radius: 4px;
  margin-right: 6px;
  padding: 2px 6px;
}
.list-control-filter-item.on,
.list-control-order-item.on {
  background: #f2352e;
  border: 1px solid #f2352e;
  color: #fff;
}
.product-ont-found{
  text-align: center;
  padding: 32px;
}
</style>


