<template>
    <div class="share-model" v-show="isShowShareModal">
        <div class="share-code">
            <div class="share-code-icon">
                <div class="share-code-bg">
                    <div id="qrcode"></div>
                </div>
            </div>
            <div class="share-code-font">扫一扫, 分享账单</div>
        </div>
        <div class="share-colse" @click="closeShareModal"></div>
    </div>
</template>

<script>
    export default {
        props: ['isShowShareModal'],
        data() {
            return {
            }
        },
        methods: {
            closeShareModal() {
                this.$emit('closeShareModal');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/mixin';
    .share-model {
        @include center();
        width: 315px;
        height: 452px;
        border-radius: 10px;
        z-index: 999999;
    }
    .share-code{
        border-radius: 10px;
    }
    .share-code-icon{
        background: #e4eef4;
        height:267px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        position: relative;
    }
    .share-code-bg{
        width: 228px;
        height: 228px;
        background: #FFF;
        @include center();
    }
    .share-code-font {
        text-align: center;
        font-size: 24px;
        height:85px;
        line-height: 85px;
        background-color: #fff;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .share-colse {
        height: 100px;
        background: url('~@/assets/imgs/share-close.png') no-repeat center center;
        cursor:pointer;
    }
    #qrcode {
        @include center();
        width: 208px;
        height: 208px;
    }
</style>