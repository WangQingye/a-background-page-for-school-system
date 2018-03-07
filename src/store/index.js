import Vue from 'vue'
import Vuex from 'vuex'
import {
  isLogin
} from '../api/getData'
import router from "../router/index.js" //首先导入路由对象

Vue.use(Vuex)

const state = {
  adminInfo: {
    account: 'admin',
    auth: {
      canCharge: false,
      canNotify: false
    },
    // id: '1',
    ok: true,
    type: '2'
  }
}

const mutations = {
  saveAdminInfo(state, adminInfo) {
    console.log('saveAdminInfo');
    state.adminInfo = adminInfo;
  }
}

const actions = {
  async getAdminData({
    commit
  }) {
    try {
      const res = await isLogin();
      if (res.ok) {
        if (res.isLogin) {
          commit('saveAdminInfo', res);
        } else {
            router.push('/')
        }
      } else {
        throw new Error(res)
      }
    } catch (err) {
      console.log('尚未登录或cookie失效');
    }
  }
}
export default new Vuex.Store({
  state,
  actions,
  mutations
})
