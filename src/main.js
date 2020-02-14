import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 引入重置样式
import 'normalize.css';

// 引入全局样式
import './assets/styles/common.less';

Vue.use(ElementUI);

Vue.config.productionTip = false

// 全局bus
const bus=new Vue({})
Vue.prototype.$bus=bus;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
