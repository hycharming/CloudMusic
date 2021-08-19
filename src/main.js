import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/global.css'
import './assets/navbarIcons/iconfont.css'
import './assets/sidebarIcons/iconfont.css'
import './assets/audioIcons/iconfont.css'

import {
  Container,
  Aside,
  Header,
  Main,
  Footer,
  Input,
  Card,
  Progress,
  Badge,
  Menu,
  MenuItem,
  Carousel,
  CarouselItem,
  Image,
  Avatar,
  Dialog,
  Checkbox,
  Divider
} from 'element-ui'

Vue.use(Container),
Vue.use(Aside),
Vue.use(Header),
Vue.use(Main),
Vue.use(Footer),
Vue.use(Input),
Vue.use(Card),
Vue.use(Progress),
Vue.use(Badge),
Vue.use(Menu),
Vue.use(MenuItem),
Vue.use(Carousel),
Vue.use(CarouselItem),
Vue.use(Image),
Vue.use(Avatar),
Vue.use(Dialog),
Vue.use(Checkbox),
Vue.use(Divider)

Vue.config.productionTip = false

// 事件总线
Vue.prototype.$EventBus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
