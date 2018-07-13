import * as types from './mutations-types';
import { setStore, getStore, removeStore } from '../config/untils'

export default {
    // 记录用户信息
	[types.RECORD_USERINFO](state, res) {
        setStore('Access-Token', res.accessToken);
        setStore('User-Id', res.userInfoId);
		state.userInfo = res;
		state.login = true;
    },
    [types.RECORD_LOGINOUT](state) {
        removeStore('Access-Token');
        removeStore('User-Id');
        state.userInfo = '';
		state.login = false;
    }
}