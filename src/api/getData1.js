import fetch from '../config/fetch';
// import axios from 'axios'
/**
 * 登录相关
 */
// 检测是否已经登录
export const isLogin = () => fetch('/login/islogin');
// 登录请求
export const login = data => fetch('/login/index', data, 'POST');
// 退出登录
export const logOut = () => fetch('/login/logout');

/**
 * 用户相关
 */
// 获取用户列表
export const getAdmins = () => fetch('/user/index');
// 修改用户
export const editAdmin = data => fetch('/user/edit', data, 'POST');
// export const editAdmin = (data) => {
//   axios.post('http://class.wuxin.ren/api/user/edit', data)
//     .then(function (response) {
//       console.log(response);
//       return Promise.resolve(response.data)
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }
/**
 * 用户反馈相关
 */
export const getFeedBack = data => fetch('/feedback/index', data);
// axios.defaults.withCredentials = true;
// export const getFeedBack = (data) => {
//   return axios.get('http://class.wuxin.ren/api/feedback/index', {
//     params: data
//   }).then((res) => {
//     return Promise.resolve(res.data)
//   })
// }

// 获取校区
export const getSchool = data => fetch('/school/index', data);
// 获取课程表
export const getClassDetail = data => fetch('/lesson/index', data);
// 获取课程详情
export const getClassInfo = data => fetch('/lesson/edit', data);
// 添加课程
export const addClass = data => fetch('/lesson/edit', data, 'POST');
// 删除课程
export const delClass = data => fetch('/lesson/del', data);
// 获取课程上课历史记录
export const getHistory = data => fetch('/lesson/history', data);
// 获取课程上课未来安排
export const getFuture = data => fetch('/lesson/future', data);
// 获取学生出勤记录
export const getStudent = data => fetch('/record/lessondetail', data);
// 更改学生出勤记录
export const changeStudent = data => fetch('/record/chgtype', data, 'POST');
// 添加校区
export const addSchool = data => fetch('/school/add', data, 'POST');
// 添加短信模板
export const addTemplate = data => fetch('/sms/addtemplate', data, 'POST');
// 获取模板列表
export const getTemplate = data => fetch('/sms/templatelist', data);
