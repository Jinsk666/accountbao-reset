<template>
    <div v-show="totalCount == 0">
        <div class="no-data">
        <img alt="" src="~@/assets/imgs/no-data.png" style="margin-left:208px; width:200px;margin-bottom:30px;"/>
        <div class="no-data-body">
            <div class="no-data-fonts">您还没有数据, 选择下列方式去生成去生成货单吧！</div>
                <div class="no-data-img1" @click="uploadData">
                    <div class="no-data-left">点击上传货单</div>
                </div>
                <div class="no-data-img2" @click="isDownload = !isDownload">
                    <div class="no-data-right">下载账随行, 开始记录</div>
                </div>
            </div>
        </div>
        <div class="download-model" v-show="isDownload">
            <div class="download-code">
                <div class="download-code-icon">
                    <img src="@/assets/imgs/app-code.png" alt=""/>
                </div>
                <div class="download-code-font">扫码下载</div>
                <div class="download-code-btn">
                    <a href="http://z.farmeasy.cn/" class="download-btn">下载账随行</a>
                </div>
            </div>
            <div class="download-colse" @click="isDownload = !isDownload"></div>
        </div>
        <div id="c-model" v-show="isDownload"></div>
    </div>
</template>

<script>
    export default {
        props:['totalCount'],
        data() {
            return {
                isDownload: false
            }
        },
        methods: {
            uploadData() {
                
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../style/mixin';
    #c-model {
        z-index: 9999;
        background: #000;
        opacity: 0.2;
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
    }
    .no-data {
        width:630px;
        @include center();
    }
    .no-data-body {
        border: 1px dashed #ddd;
        border-radius: 10px;
        width: 630px;
        height: 280px;
        position: relative;
    }
    .no-data-fonts {
        font-size: 18px;
        color: #ddd;
        position:absolute;
        z-index:9;
        top: -14px;
        left:19%;
        background: #fff;
    }
    .no-data-img1, .no-data-img2 {
        float:left;
        width:313px;
        height:280px;
        position:relative;
        cursor:pointer;
    }
    .no-data-img1 {
        background:url('~@/assets/imgs/no-data-up.png') no-repeat center 40%;
    }
    .no-data-img2 {
        background:url('~@/assets/imgs/no-data-app.png') no-repeat center 40%;
    }
    .no-data-left {
        position: absolute;
        bottom:40px;
        left:102px;
        font-size: 18px;
    }
    .no-data-right {
        position: absolute;
        bottom:40px;
        right:68px;
        font-size: 18px;
    }
    .download-model {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 315px;
        height: 452px;
        z-index: 99999;
        border-radius: 10px;
        // display: none;
    }
    .download-code{
        background: #FFF;
        border-radius: 10px;
    }
    .download-code-icon img{
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .download-code-font {
        text-align: center;
        font-size: 20px;
        height:60px;
        line-height: 60px;
        background-color: #fff;
        letter-spacing: 24px;
        text-indent: 24px;
    }
    .download-code-btn {
        text-align: center;
        font-size: 18px;
        height:90px;
        line-height: 90px;
        background-color: #fff;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .download-code-btn .download-btn {
        display: inline-block;
        width: 60%;
        border-radius: 34px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        background: #ffda44;
        cursor: pointer;
        position: relative;
        bottom: 10px;
    }
    .download-colse {
        height: 100px;
        background: url('~@/assets/imgs/share-close.png') no-repeat center center;
        cursor:pointer;
    }
</style>