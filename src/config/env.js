
let baseUrl;
let shareUrl;
if ( process.env.NODE_ENV == 'production' ){
    baseUrl = "http://auth.farmeasy.cn";
    shareUrl = "http://auth.farmeasy.cn/farmeasy-accountsbao-service/share?"
}else{
    baseUrl = 'apis';
    //baseUrl = "http://cs.nongchangyun.cn";
    shareUrl = "http://cs.nongchangyun.cn/farmeasy-accountsbao-service/share?"
}
export {
    baseUrl, shareUrl
}

