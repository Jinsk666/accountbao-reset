
module.exports =  {
    proxy: {
        '/apis': {    //映射本地根路径为 /apis
            target: 'http://cs.nongchangyun.cn',  // 接口域名
            secure: false,  // https配置参数
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/apis': ''   //重写,
            }
        }
    }
}