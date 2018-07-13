// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/common.scss'

Vue.use(elementUi)

Vue.config.productionTip = false

// 拦截请求
// router.beforeEach((to, from, next) => {
//   if(to.meta.requireAuth && !sessionStorage.getItem('Access-Token')){
//     next({path: '/login', query: {rediect: to.fullPath}})
//   }else {
//     next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
