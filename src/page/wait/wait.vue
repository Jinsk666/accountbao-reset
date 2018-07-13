<template>
    <div class="list">
        <head-top isHome="true"></head-top>
        <div class="more">
            <img src="@/assets/imgs/icon_more.png" alt=""/>
            <p>敬请期待!</p>
        </div>
    </div>
</template>

<script>
    import headTop from '@/components/header';

    export default {
        data() {
            return {

            }
        },
        computed: {

        },
        components: {
            headTop
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

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