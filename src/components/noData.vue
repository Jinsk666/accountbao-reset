<template>
    <!-- 无搜索结果  -->
    <div class="more" v-show="totalCount == 0">
        <img src="@/assets/imgs/no-data.png" alt=""/>
        <div class="">
            <div>您还没有数据, 选择下列方式去生成去生成货单吧！</div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['totalCount'],
        data() {
            return {
                
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../style/mixin';
    .more {
        @include wh(221px, 245px);
        @include center();
        text-align: center;
    }
    .more img {
        @include wh(221px, 185px);
    }
    .more p {
        @include sc(16px, #999);
        line-height: 60px;
		}
</style>