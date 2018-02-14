import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const login = r =>
  require.ensure([], () => r(require('@/components/Login')), 'login');
const main = r =>
  require.ensure([], () => r(require('@/components/MainPage')), 'main');
const mainInfo = r =>
  require.ensure([], () => r(require('@/components/MainInfo')), 'mainInfo');
const userFeedBack = r =>
  require.ensure(
    [],
    () => r(require('@/components/UserFeedBack')),
    'userFeedBack'
  );
const addStudent = r =>
  require.ensure([], () => r(require('@/components/addStudent')), 'addStudent');
const studentList = r =>
  require.ensure(
    [],
    () => r(require('@/components/studentList')),
    'studentList'
  );
const classList = r =>
  require.ensure([], () => r(require('@/components/ClassList')), 'classList');
const addClass = r =>
  require.ensure([], () => r(require('@/components/AddClass')), 'addClass');
const classDetail = r =>
  require.ensure(
    [],
    () => r(require('@/components/subpages/ClassDetail')),
    'classDetail'
  );
const studentAttendance = r =>
  require.ensure(
    [],
    () => r(require('@/components/subpages/StudentAttendance')),
    'studentAttendance'
  );
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
          path: '',
          component: mainInfo,
          meta: ['主页信息']
        },
        {
          path: '/userFeedBack',
          component: userFeedBack,
          meta: ['家长反馈']
        },
        {
          path: '/addStudent',
          component: addStudent,
          meta: ['添加学员']
        },
        {
          path: '/studentList',
          component: studentList,
          meta: ['学员列表']
        },
        {
          path: '/classList',
          component: classList,
          meta: ['课程表']
        },
        {
          path: '/addClass',
          component: addClass,
          meta: ['添加课程']
        },
        {
          path: '/classDetail',
          component: classDetail,
          meta: ['课程详情']
        },
        {
          path: '/studentAttendance',
          component: studentAttendance,
          meta: ['课程出勤']
        }
      ]
    }
  ]
});
