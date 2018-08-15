import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import { getStore, setStore } from '../config/untils'

Vue.use(Vuex)

const state = {
	userInfo: '', // 用户信息
	login: '', // 是否登陆
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})