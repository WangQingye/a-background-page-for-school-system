import Vue from 'vue'
import Vuex from 'vuex'
import {isLogin} from '../api/getData'
Vue.use(Vuex)

const state = {
    adminInfo: {}
}

const mutations = {
    saveAdminInfo(state, adminInfo){
        console.log('save');
        state.adminInfo = adminInfo;
    }
}

const actions = {
    async getAdminData({commit}){
        try {
            const res = await isLogin()
            if (res.ok){
                commit('saveAdminInfo', res);
            } else {
                throw new Error(res)
            }
        } catch(err) {
            console.log('尚未登录或cookie失效');
        }
    }
}
export default new Vuex.Store({
    state,
    actions,
    mutations
})