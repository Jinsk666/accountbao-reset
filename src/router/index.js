import Vue from 'vue'
import Router from 'vue-router'

const login = r => require.ensure(
  [], () => r( require('../page/login/login') ), 'login'
)
const accountLogin = r => require.ensure(
  [], () => r( require('../page/login/accountLogin') ), 'accountLogin'
)
const forget = r => require.ensure(
  [], () => r( require('../page/forget/forget') ), 'forget'
)
const home = r => require.ensure(
  [], () => r( require('../page/home/home') ), 'home'
)
const goods = r => require.ensure(
  [], () => r( require('../page/goods/goods') ), 'goods'
)
const bill = r => require.ensure(
  [], () => r( require('../page/bill/bill') ), 'bill'
)
const wait = r => require.ensure(
  [], () => r( require('../page/wait/wait') ), 'wait'
)

Vue.use(Router)

export default new Router({
  routes: [
    /* 默认  */
    {
      path: '/', redirect: '/login'
    },
    /* 敬请期待 */
    {
      path:'/wait', name: 'wait', component: wait, meta: { requireAuth: true }
    },
    /* 登录  */
    {
      path: '/login', name: 'login', component: login
    },
    /* 账号密码登录  */
    {
      path:'/accountLogin', name:'accountLogin', component: accountLogin
    },
    /* 忘记密码  */
    {
      path:'/forget', name: 'forget', component: forget
    },
    /* 首页  */
    {
      path: '/home', name: 'home', component: home, meta: { requireAuth: true }
    },
    /* 货单  */
    {
      path:'/goods', name: 'goods', component: goods, meta: { requireAuth: true }
    },
    /* 账单  */
    {
      path: '/bill', name: 'bill', component: bill, meta: { requireAuth: true }
    },
  ]
})
