import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/components/Login')), 'login');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: login
    },
    {
      path: '/main',
      name: 'Main',
      
    }
  ]
})
