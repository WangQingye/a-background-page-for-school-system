import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/components/Login')), 'login');
const main = r => require.ensure([], () => r(require('@/components/MainPage')), 'main');
const mainInfo = r => require.ensure([], () => r(require('@/components/MainInfo')), 'mainInfo');
const userFeedBack = r => require.ensure([], () => r(require('@/components/UserFeedBack')), 'userFeedBack');
const addStudent = r => require.ensure([], () => r(require('@/components/addStudent')), 'addStudent');

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
      component: main,
      children: [
        {
          path:'',
          component: mainInfo,
          meta:['主页信息']
        },
        {
          path:'/userFeedBack',
          component: userFeedBack,
          meta:['家长反馈']
        },
        {
          path:'/addStudent',
          component: addStudent,
          meta:['添加学员']
        }
      ]
    }
  ]
})
