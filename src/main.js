import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/mobile/flexible'
import '@/styles/reset.css'
import { Tabbar, TabbarItem, NavBar, Col, Row, Image as VanImage, Cell, CellGroup, Icon, Search, List } from 'vant';
import { recommendMusicApi } from '@/api'
// 目标: 封装网络请求
// 1. src/utils/request.js -  设置基地址, 导出axios函数
// 2. src/api/Home.js - 请求方法axios({url: "具体"})
// 3. src/api/index.js - 把Home.js里函数引入过来统一导出
// 4. 具体逻辑页面, 引入api/index.js请求方法, async+await等待axios的结果回来
async function fn() {
  const res = await recommendMusicApi()// api方法原地会得到axios请求在原地的Promise对象(里面有一个ajax请求)
  console.log(res);
}
fn()
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage)
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(Search);
Vue.use(List);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
