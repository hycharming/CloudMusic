import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import findMusic from '../views/findMusic/findMusic.vue'
import command from '../views/findMusic/children/command.vue'
import songlist from '../views/findMusic/children/songlist.vue'
import TV from '../views/findMusic/children/TV.vue'
import singer from '../views/findMusic/children/singer.vue'
import rank from '../views/findMusic/children/rank.vue'
import newestMusic from '../views/findMusic/children/newestMusic.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  redirect:'/findMusic',
  children: [{
    path: '/findMusic',
    name: 'findMusic',
    component: findMusic,
    redirect:'/command',
    children: [{
        path: '/command',
        name: 'command',
        component: command
      },
      {
        path: '/songlist',
        name: 'songlist',
        component: songlist,
      }, {
        path: '/TV',
        name: 'TV',
        component:TV,
      }, {
        path: '/singer',
        name: 'singer',
        component: singer,
      }, {
        path: '/rank',
        name: 'rank',
        component: rank,
      }, {
        path: '/newestMusic',
        name: 'newestMusic',
        component: newestMusic,
      }
    ]
  }]
}]

const router = new VueRouter({
  routes
})

export default router