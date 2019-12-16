import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '../views/Main.vue')
  },
  {
    path: '/background',
    name: 'background',
    component: () => import(/* webpackChunkName: "background" */ '../views/Background.vue')
  },
  {
    path: '/video-input',
    name: 'video-input',
    component: () => import(/* webpackChunkName: "background" */ '../views/VideoInput.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import(/* webpackChunkName: "background" */ '../views/Layout.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
