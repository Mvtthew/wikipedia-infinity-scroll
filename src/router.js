import Vue from 'vue'
import Router from 'vue-router'
import Infinity from './views/Infinity.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Infinity',
      component: Infinity
    },
  ]
})
