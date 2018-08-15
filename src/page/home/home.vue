<template>
    <div class="list">
        <head-top>
        </head-top>
        <section class="index">
            <div class="tip" v-show="welcome">
                <span>欢迎您进入账随行</span>
                <img class="to-close" src="@/assets/imgs/close.png" @click="welcome = false" alt=""/>
            </div>
            <div class="menu clearfix">
                <router-link :to="{ name: 'goods' }">
                    <div class="dl-parent">
                        <dl class="to-list">
                            <dt>
                                <img src="@/assets/imgs/icon_take.png" alt=""/>
                            </dt>
                            <dd class="title">货单</dd>
                            <dd>查看货单详细信息</dd>
                        </dl>
                    </div>
                </router-link>
                <router-link :to="{ name: 'bill' }">
                    <div class="dl-parent">
                        <dl class="to-list">
                            <dt>
                                <img src="@/assets/imgs/icon_bill.png" alt=""/>
                            </dt>
                            <dd class="title">账单</dd>
                            <dd>整合货单 了解账目</dd>
                        </dl>
                    </div>
                </router-link>
                <router-link :to="{ name: 'wait' }">
                    <div class="dl-parent">
                        <dl class="to-more">
                            <dt>
                                <img class="three" src="@/assets/imgs/icon_report.png" alt=""/>
                            </dt>
                            <dd class="title">报表</dd>
                            <dd>分析统计 生成报告</dd>
                        </dl>
                    </div>
                </router-link>
                <router-link :to="{ name: 'wait' }">
                    <div class="dl-parent">
                        <dl class="to-more">
                            <dt>
                                <img class="four" src="@/assets/imgs/icon_manage.png" alt=""/>
                            </dt>
                            <dd class="title">管理</dd>
                            <dd>统一设置货点功能</dd>
                        </dl>
                    </div>
                </router-link>
            </div>
        </section>
    </div>
</template>

<script>
    import headTop from '@/components/header';

    export default {
        data() {
            return {
                welcome: true, // 欢迎提示
            }
        },
        components: {
            headTop
        },
        computed: {

        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .list {
        width: 100%;
        min-width: 1024px;
        height: 100%;
       // position: relative;
    }
    .to-close{
        cursor: pointer;
    }
    .index {
        width: 100%;
    }
    .index .tip {
        height: 50px;
        background: rgba(213, 223, 234, 0.53);
        padding-left: 48px;
        font-size: 16px;
        color: #616878;
        line-height: 50px;
        position: relative;
    }
    .index .tip img {
      @include wh(22px, 22px);
      position: absolute;
      right: 45px;
      top: 14px;
    }
    .menu {
        width: 80%;
        @include center();
        margin-top:30px;
    }
    .menu .dl-parent{
        width: 22%;
        background: #fff;
        box-shadow: 1px 4px 10px 0 #919aaa;
        float: left;
        margin-right: 3%;
        min-width:180px;
        cursor: pointer;
        &:hover{
            box-shadow: 1px 1px 6px $color;
        }
    }
    .menu dl {
        @include wh(100%, 0);
        padding-bottom:160%;
    }
    .menu dl dt {
        width: 100%;
        text-align: center;
    }
    .menu dl dt img {
        @include wh(144px, 141px);
        margin: 26% 0 7% 0;
    }
    .menu dl dd {
        font-size: 20px;
        color: #666;
        text-align: center;
        line-height: 50px;
        margin-bottom: 8.2%;
    }
    .menu dl .title {
        font-size: 30px;
        line-height: 60px;
    }
    .menu dl:last-child {
        margin-right: 0;
    }
    .three {
        width: 156px !important;
        height: 146px !important;
        margin-bottom: 4.7% !important;
    }
    .four {
        width: 128px !important;
        height: 176px !important;
        margin-top: 10.8% !important;
    }
    .on {
        border: 2px solid #ffda44;
    }
    @media screen and (max-width: 1150px){
        .menu dl dt img{
            margin: 5px 0 10px 0!important;
            height:141px!important;
        }
  }
</style>