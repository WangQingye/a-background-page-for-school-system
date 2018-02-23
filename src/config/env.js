/**
 * 环境切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImagePath: 图片存放地址
 */

 let baseUrl = 'http://class.wuxin.ren/api';
 let routerMode = 'history';

 export {
     baseUrl,
     routerMode
 }

 {
     isSuper: true; //是不是超级管理员（可以添加和删除账号）
     canCharge: true; // 能不能充值
     canNotify: true; // 能不能发通知
 }