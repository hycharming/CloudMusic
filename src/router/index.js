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
import songsListDetail from '../views/songsListDetail/songsListDetail.vue'
import songsList from '../views/songsListDetail/children/songsList.vue'
import comment from '../views/songsListDetail/children/comment.vue'
import collector from '../views/songsListDetail/children/collector.vue'


Vue.use(VueRouter)

// 解决被重复点击的问题
// const VueRouterPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(to) {
//   return VueRouterPush.call(this, to).catch(err => err)
// }

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  redirect: '/findMusic',
  children: [{
    path: '/findMusic',
    name: 'findMusic',
    component: findMusic,
    redirect: '/findMusic/command',
    children: [{
        path: '/findMusic/command',
        name: 'command',
        component: command
      },
      {
        path: '/findMusic/songlist',
        name: 'songlist',
        component: songlist,
      }, {
        path: '/findMusic/TV',
        name: 'TV',
        component: TV,
      }, {
        path: '/findMusic/singer',
        name: 'singer',
        component: singer,
      }, {
        path: '/findMusic/rank',
        name: 'rank',
        component: rank,
      }, {
        path: '/newestMusic',
        name: 'newestMusic',
        component: newestMusic,
      }
    ]
  }, {
    path: '/songsListDetail',
    name: 'songsListDetail',
    component: songsListDetail,
    redirect: '/songsListDetail/songsList',
    children: [{
      path: '/songsListDetail/songsList',
      name: 'songsList',
      component: songsList
    }, {
      path: '/songsListDetail/comment',
      name: 'comment',
      component: comment

    }, {
      path: '/songsListDetail/collector',
      name: 'collector',
      component: collector
    }]
  }]
}]

const router = new VueRouter({
  routes
})

export default router