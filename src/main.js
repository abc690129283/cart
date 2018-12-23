// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Routers from './router/index.js'
import Vuex from 'vuex'
import './style.css'
import product_data from './product.js'
Vue.use(VueRouter)
Vue.use(Vuex)


// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: Routers
}
const Router = new VueRouter(RouterConfig);
//即将离开的路由对象 当前导航即将离开的路由对象 next调用后才能执行下一个钩子
Router.beforeEach((to, from, next) => {
  // 拿到即将跳转路由的title
  window.document.title = to.meta.title;
  next();
})
// 进入导航之后 设置指定的坐标
Router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})



// Vuex
const store = new Vuex.Store({
  state: {
    productList: [],
    cartList:[]
  },
  getters:{
      brands:state=>{
        const brands = state.productList.map(item=>item.brand);
        return getFilterArray(brands);
      },
      colors:state=>{
        const colors = state.productList.map(item=>item.color);
         return getFilterArray(colors);
      }
  },
  mutations: {
    // 拿到数据
    setProductList(state,data) {
       state.productList = data;
    },
    // 加入购物车
    addCart(state,id){
       const isAdded = state.cartList.find(item=>item.id===id);
       // 开始先执行else 之后true  判断购物车是否有 如果有 数量加1   没有则写入数量
       if(isAdded){
         isAdded.count++;
       }else{
         // 往cartList写入数据 根组件才能显示购物车数量
         state.cartList.push({
           id:id,
           count:1
         })
       }
    },
    // 修改商品数量
    editCartCount(state,payload){
      // 找到满足测试函数的第一个元素值
      const product = state.cartList.find(item=>{
        // 所有的id 与 当前的id
         return item.id===payload.id;
      })
         // payload.count 每次点击都是1 然后+=给product.count
      product.count +=payload.count;
      
    },
    deleteCart(state,id){
      // 找到满足条件的第一索引 satet.cartList 指向添加到购物车里面的数据
      const index = state.cartList.findIndex(item=>{
        // 全部数据里面找到当前的id
            return item.id === id;
         
      })
       // 切掉当前的数据
      state.cartList.splice(index,1);
    },
    emptyCart(state){
      // actions 提交emptCart 来改变cartList 原代码 清空购物车
      state.cartList = [];
    }
  },
  actions: {
    // 请求数据  来改变初store的数据
    getProductList(context) {
      setTimeout(() => {
        context.commit('setProductList', product_data)
      })
    },
    buy(context){
      // 真实环境应该通过ajax购买请求后再清空购物列表
      return new Promise(resolve=>{
        setTimeout(()=>{
          context.commit('emptyCart');
          resolve(); // 执行完成后
        },500)
      })
    }
  }
})

// 数组去重
function getFilterArray(array){
  const res = [];
  const json = [];
  for(let i = 0;i<array.length;i++){
    const _self = array[i];
    if(!json[_self]){
      res.push(_self);
      json[_self] = 1;
    }
  }
  return res;
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router: Router,
  components: { App },
  template: '<App/>'
})
