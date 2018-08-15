<template>
    <div class="share-model" v-if="isShowShareModal">
        <div class="share-code">
            <div class="share-code-icon">
                <div class="share-code-bg">
                    <canvas id="qrcode"></canvas>
                </div>
            </div>
            <div class="share-code-font">扫一扫, 分享账单</div>
        </div>
        <div class="share-colse" @click="closeShareModal"></div>
    </div>
</template>

<script>
    import qrcode from 'qrcode'
    import { shareUrl } from '@/config/env'
    import { getStore } from '@/config/untils'
    export default {
        props: ['isShowShareModal', 'shareIds'],
        data() {
            return {
            }
        },
        mounted: function() {
            let canvas = document.querySelectorAll('#qrcode')[0];
            let userInfoId = getStore('User-Id') || '';
            let base = shareUrl + `ids=${this.shareIds}&userInfoId=${userInfoId}`;
            qrcode.toCanvas(canvas, base, (error) => {
                if(error) {
                    this.$message.error('获取失败');
                }else {
                    
                }
            })
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
        width: 228px!important;
        height: 228px!important;
    }
</style>