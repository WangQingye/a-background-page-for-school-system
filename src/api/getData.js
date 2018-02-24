import fetch from '../config/fetch'

/**
 * 登录相关
 */
// 检测是否已经登录
export const isLogin = () => fetch('/login/islogin');
// 登录请求
export const login = data => fetch('/login/index', data, 'POST');
// 退出登录
export const logOut = () => fetch('/login/logout');
