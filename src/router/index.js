//引入核心库
import Vue from 'vue'
import VueRouter from 'vue-router'

// 注册全局路由插件
Vue.use(VueRouter) 

// 配置路线
const routes = [
  {
    // 路由重定向
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    meta:{
      requiresAuth:true  //需要验证
    },
    component: () => import('../views/Home.vue'),
    children:
      [
        {
          path: '/home/index',//首页
          meta:{
            requiresAuth:true  //需要验证
          },
          component: () => import('../views/Dashbroad/Index.vue'),
        },
        {
          path: '/home/order',//订单管理
          meta:{
            title:'订单管理',
            requiresAuth:true  //需要验证
          },
          component: () => import('../views/OrderMana/Order.vue'),
        },
        {
          path: '/home/goodslist',//商品列表
          meta:{
            title:'商品列表',
            requiresAuth:true  //需要验证
          },
          component: () => import('../views/Product/Goodslist.vue'),
        },
        {
          path: '/home/addgoods',//添加商品
          meta:{
            title:'添加商品',
            requiresAuth:true  //需要验证
          },
          component: () => import('../views/Product/Addgoods.vue'),
        },
        {
          path: '/home/goodstypelist',//商品分类列表
          meta:{
            title:'商品分类列表',
            requiresAuth:true  //需要验证
          },
          component: () => import('../views/ProductType/GoodsTypeList.vue'),
        },
        {
          path: '/home/goodstype',//添加商品分类
          meta:{
            title:'添加商品分类',
            requiresAuth:true  //需要验证
          },
          component: () => import('../views/ProductType/GoodsType.vue'),
        },

        {
          path: '/home/repwd',//修改密码
          meta:{
            title:'修改密码',
            requiresAuth:true  //需要验证
          },
          component: () => import('../views/Account/Repwd.vue'),
        },
        {
          path: '/home/goodscount',//商品统计
          meta:{
            title:'商品统计',
            requiresAuth:true  //需要验证
          },
          component: () => import('../views/SaleStat/Goodscount.vue'),
        },
        {
          path: '/home/ordercount',//订单统计
          meta:{
            title:'订单统计',
            requiresAuth:true  //需要验证
          },
          component: () => import('../views/SaleStat/Ordercount.vue'),
        },
        {
          path: '/home/acountlist',//账户列表
          meta:{
            title:'账户列表',
            requiresAuth:true  //需要验证
          },
          component: () => import('../views/Account/AcountList.vue'),
        },
        {
          path: '/home/acountadd',//添加账户
          meta:{
            title:'添加账户',
            requiresAuth:true  //需要验证
          },
          component: () => import('../views/Account/AcountAdd.vue'),
        },
        {
          path: '/home/shopmana',//店铺管理
          meta:{
            title:'店铺管理',
            requiresAuth:true  //需要验证
          },
          component: () => import('../views/ShopMana/Shopmana.vue'),
        },
        {
          path: '/home/usercenter',//个人中心
          meta:{
            title:'个人中心',
            requiresAuth:true  //需要验证
          },
          component: () => import('../views/userCenter.vue'),
        },
      ]
  },
  {
    path: '/login',//注册
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  // 错误地址处理
  {
    // 其余错误地址的重定向
    path: '*', // 除上面配置以外的其他地址，统一指向“/”
    redirect: '/'
  }
]

// 创建路由
const router = new VueRouter({
    routes
})

// 配置路由前置守卫
router.beforeEach((to,from,next)=>{
  if(to.meta.requiresAuth){//requiresAuth标识，对要验证的页面进行拦截
    const token=localStorage.getItem('token');
    if(token){//如果用户名密码正确，有token，就可以放行
      next();
    }else{//如果没有token，就拦截
      next('/login');
    }
  }else{
    next();
  }
})


// 导出路由
export default router
