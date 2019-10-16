import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/pay/reserve',
      name: 'reserve',
      component: () => import('./views/Reserve.vue')
    },
    {
      path: '/pay/confirm',
      name: 'confirm',
      component: () => import('./views/Confirm.vue')
    }
  ]
})