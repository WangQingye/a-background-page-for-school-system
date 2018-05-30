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
 * 首页数据
 */
// 获取首页统计数据
export const getMainInfo = () => fetch('/index/index');
// 获取未来请假情况
export const getLeaveList = data => fetch('/record/leavelist', data);
/**
 * 用户相关
 */
// 获取用户列表
export const getAdmins = () => fetch('/user/index');
// 修改用户资料
export const editAdmin = data => fetch('/user/edit', data, 'POST');
// 修改密码
export const changePass = data => fetch('/user/chgpass', data, 'POST');
// 删除账户
export const delAdmin = data => fetch('/user/del', data, 'POST');
/**
 * 用户反馈相关
 */
export const getFeedBack = data => fetch('/feedback/index', data);
export const replyFeedBack = data => fetch('/feedback/reply', data, 'POST');
export const delFeedBack = data => fetch('/feedback/del', data, 'POST');
/**
 * 校区相关
 */
// 获取校区列表
export const getSchools = () => fetch('/school/index');

/**
 * 学员相关
 */
// 获取学员列表
export const getStudentList = data => fetch('/student/index', data);
// 添加学员
export const addStudentInfo = data => fetch('/student/edit', data, 'POST');
// 删除学员
export const delStudent = data => fetch('/student/del', data, 'POST');
// 获取单个学员信息
export const getStudentInfo = data => fetch('/student/edit', data);
// 修改单个学员信息
export const changeStudentInfo = data => fetch('/student/edit', data, 'POST');
// 为学员添加课程
export const addClassToStudent = data => fetch('/order/edit', data, 'POST');
// 获取学员课程信息
export const getStudentClassInfo = data => fetch('/order/index', data);
// 获取学员课程记录
export const getStudentClassHistory = data => fetch('/record/index', data);
// 为学员充值
export const chargeStudent = data => fetch('/charge/add', data, 'POST');
// 获取学员充值记录
export const getStudentChargeHistory = data => fetch('/charge/index', data);
/**
 * 课程相关
 */
// 按校区获取课程
export const getClassList = schoolId => fetch('/lesson/list', schoolId);
// 修改已上课时数
export const changeExpendNum = data => fetch('/order/edit', data, 'POST');
// 续课
export const renewClass = id => fetch('/order/renew', id, 'POST');
// 暂停课
export const pauseClass = id => fetch('/order/pause', id, 'POST');
// 复课
export const continueClass = id => fetch('/order/continue', id, 'POST');
// 退课
export const stopClass = id => fetch('/order/stop', id, 'POST');
// 转班
export const transClass = data => fetch('/order/transfer', data, 'POST');


/**
 * 图片上传（用于小程序端首页展示）
 */
export const upImage = data => fetch('/setting/wxhomepic', data, 'POST');
