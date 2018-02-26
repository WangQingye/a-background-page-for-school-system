import fetch from '../config/fetch'
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
// 修改用户资料
export const editAdmin = data => fetch('/user/edit', data, 'POST');
// 修改密码
export const changePass = data => fetch('/user/chgpass', data, 'POST')
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
