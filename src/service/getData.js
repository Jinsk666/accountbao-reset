import fetch from '../config/fetch';
import { hex_sha1 } from '../assets/sha1';
import { userInfo } from 'os';

/**
 * 获取验证码
 */

export const getVerify = ( phone ) => fetch('/auth/userInfo/sendSms?phone=' + phone ,{

}, 'POST', 1)

/**
 * 手机登陆
 */

export const mobileLogin = ( phone, verify ) => fetch('/auth/loginWithType', {
    username: phone,
    password: verify,
    loginType: 1
}, 'POST', 1)

 /**
  * 账号密码登陆
  */

export const accountLogin = ( phone, password ) => fetch('/auth/loginWithType', {
    username: phone,
    password: hex_sha1( password ),
    loginType: 2
}, 'POST', 1)

/**
 * 找回密码
 */
export const getModifyPassword = ( phone, verify, password, password2 ) => fetch('/auth/userInfo/findPassword' , {
    username: phone,
    authCode: verify,
    resurePassword: hex_sha1( password2 ),
    password: hex_sha1( password )
}, 'POST', 1)

 /**
  * 货单获取结果列表
  */

export const searchGoodsResult = (beginDate, endDate, content, index ) => fetch('/v1.0/accounts/record/searchRecords',{
    "beginDate": beginDate,
    "endDate": endDate,
    "likeParams": content,
    "dataEntry": index
}, 'POST')

/**
 * 获取单行具体信息
 */

export const searchDetails = id => fetch('/v1.0/accounts/record/get/'+id,{
})

/**
 * 获取账单搜索下拉列表
 */

export const getSearchSelect = () => fetch('/v1.0/accounts/record/getSearchLable',{

},'GET', 2, 'promise')

/**
 * 获取账单结果列表
 */

export const searchBillResult = params => fetch('/v1.0/accounts/record/getStatisticsResult', params, 'POST')

// 上传文件
export const uploadExcel = file => fetch('/uploadExcel', file, 'POST', 3)

// 打印数据
export const getPrintInfo = (ids, printType) => fetch('/v1.0/accounts/record/searchRecords',{
    ids: ids,
}, 'POST')
