import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import findMusic from '../views/findMusic.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path:'/findMusic',
    name:'findMusic',
    component:findMusic
  }
]

const router = new VueRouter({
  routes
})

export default router
