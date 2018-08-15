/**
 * 存储sessionStorage
 */

export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.sessionStorage.setItem(name, content);
}

/**
 * 获取sessionStorage
 */

export const getStore = name => {
	if (!name) return;
	return window.sessionStorage.getItem(name);
}

/**
 * 删除sessionStorage
 */

export const removeStore = name => {
	if (!name) return;
	window.sessionStorage.removeItem(name);
}

/**
 * 获取浏览器传递参数
 */
export const getParams = url => {
	var params = {};
	var paramString = (url === undefined || url === null) ? window.location.search.substr(1) : url;
	var paramArray = paramString.split('&');
	for( let i = 0; i < paramArray.length; i ++ ){
		var itemArray = paramArray[i].split('=');
		var key = '';
		var value = null;
		if( itemArray.length > 0 ) key = decodeURIComponent(itemArray[0]);
		if( itemArray.length > 1 ) value = decodeURIComponent(itemArray[1]);
		if( !key ) continue;
		params[key] = value;
	}
	return params;
};
/**
 * 填充函数
 */

const padLeft = function( value, num, pad ) {
	var result = value + '';
	while( result.length < num ) {
		result = (pad || '0') + result;
	}
	return result;
}

/**
 * 格式化时间
 */

export const formatDate = function( date, format ) {
	if( typeof(date) == 'number' || typeof(date) == 'string' ) {
		date = new Date(date);
	}
	return (format || 'Y-m-d H:i:s.M').replace(/Y/g, padLeft(date.getFullYear(), 4))
		.replace(/m/g, padLeft(date.getMonth() + 1, 2))
		.replace(/d/g, padLeft(date.getDate(), 2))
		.replace(/H/g, padLeft(date.getHours(), 2))
		.replace(/i/g, padLeft(date.getMinutes(), 2))
		.replace(/s/g, padLeft(date.getSeconds(), 2))
		.replace(/M/g, padLeft(date.getMilliseconds(), 3));
}

/**
 * 处理 element 时间
 */

 export const getEleTime = (time, type = 0) => {
     var beginDate, endDate;
     if( type == 0 ) {
        beginDate = typeof time[0] != 'object' ? time[0] : time[0].getTime();
        endDate = typeof time[1] != 'object' ? time[1] : time[1].getTime();
     }else {
        beginDate = formatDate(time[0], 'Y-m-d');
        endDate = formatDate(time[1], 'Y-m-d');
     }
    return [beginDate, endDate]
 }
 /**
  * 导出函数
  */

  export const exportExcel = arr => {
    if( arr.length == 0 ) return;
    var form = document.createElement("form");
    document.body.appendChild(form);
    form.method = 'post';
    form.action = "http://cs.nongchangyun.cn/farmeasy-accountsbao-service/downExcel";

    var param_ids = document.createElement("input");
    param_ids.setAttribute("name", "ids");
    param_ids.setAttribute("type", "hidden");
    param_ids.setAttribute("value", arr);
    form.appendChild(param_ids);

    var param_userInfoId = document.createElement("input");
    param_userInfoId.setAttribute("name", "userInfoId");
    param_userInfoId.setAttribute("type", "hidden");
    param_userInfoId.setAttribute("value", getStore('User-Id'));
    form.appendChild(param_userInfoId);
    form.submit();
  }