
let baseUrl;
if ( process.env.NODE_ENV == 'production' ){
    baseUrl = "http://cs.nongchangyun.cn";
}else{
    baseUrl = '/apis';
}
export {
    baseUrl
}

