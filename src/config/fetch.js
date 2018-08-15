import { baseUrl } from './env'
import { getStore, setStore, removeStore } from './untils'

/**  pathType 用法
 *   	== 1  登陆相关
 *   	== 2  正常
 *   	== 3  上传文件
 */

export default async(url = '', data = {}, type = 'GET', pathType = 2) => {
	type = type.toUpperCase();
	let apiPath = '/farmeasy-accountsbao-service';
	if( pathType == 1 ) apiPath = '/farmeasy-api-gateway/farmeasy-auth-service';
	url = baseUrl + apiPath + url;

	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})
		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}
	return new Promise((resolve, reject) => {
		let requestObj;
		if (window.XMLHttpRequest) {
			requestObj = new XMLHttpRequest();
		} else {
			requestObj = new ActiveXObject;
		}

		let sendData = '';
		if (type == 'POST') {
			if(pathType == 3){
				sendData = data;
			}else {
				sendData = JSON.stringify(data);
			}
		}

		requestObj.open(type, url, true);
		if(pathType == 3) {
			//requestObj.setRequestHeader("Content-type", "x-www-form-urlencoded");
		}else {
			requestObj.setRequestHeader("Content-type", "application/json");
		}
		/* 验证相关 */
		requestObj.setRequestHeader("Platform-Code", "24yypy8pw1xp");
		requestObj.setRequestHeader("Platform-Secret", "6w6m8v9ihl55dcuafp0ux0zil7yqyuqx");

		let token = getStore('Access-Token');
		if( token && pathType != 1 ) requestObj.setRequestHeader('Access-Token', token);
		requestObj.send(sendData);

		requestObj.onreadystatechange = () => {
			if (requestObj.readyState == 4) {
				if (requestObj.status == 200) {
					let obj = requestObj.response;
					if (typeof obj !== 'object') {
						try{
							obj = JSON.parse(obj);
						}catch(e){
							
						}
					}
					resolve(obj)
				} else {
					reject(requestObj)
				}
			}
		}
	})
}