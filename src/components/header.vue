<template>
    <header class="clearfix">
		<router-link :to="{ name: 'home' }">
			<img class="table-sign" src="@/assets/imgs/icon_left_logo.png" alt="sign"/>
		</router-link>
        
		<!-- 不同页面不同头部按钮 -->
		<!-- header 共用退出登陆 -->
		<router-link :to="{ name: 'login' }">
			<img id="logOutBtn" class="list-derive" @click="loginOut" src="@/assets/imgs/logout.png" alt="">
		</router-link>
		<div class="home-dropdown" v-if="isHome">
			<img class="list-derive" src="@/assets/imgs/icon-home.png" alt="">
			<ul class="home-item">
				<router-link :to="{ name: 'goods' }">
					<li>货单</li>
				</router-link>
				<router-link :to="{ name: 'bill' }">
					<li>账单</li>
				</router-link>
				<router-link :to="{ name: 'wait' }">
					<li>报表</li>
				</router-link>
				<router-link :to="{ name: 'wait' }">
					<li>管理</li>
				</router-link>
			</ul>
		</div>
		<!-- header 货单导入下拉 -->
		<slot name="importBtn"></slot>
		<!-- 分享按钮 -->
		<img @click="clickShare" v-if="isShare" id="shareBtn" class="list-derive" alt="" src="@/assets/imgs/icon-share.png">
		<!-- header 货单搜索 -->
		<slot name="goodsSearchBtn"></slot>
		<!-- header 共用时间 isHeaderTime 定义显示与否-->
		<el-date-picker
			v-show="isHeaderTime"
			@change="getTime"
			class="header-time"
			slot="time"
			v-model="time"
			type="datetimerange"
			range-separator="至"
			start-placeholder="开始日期"
			end-placeholder="结束日期"
			format="yyyy-MM-dd H:mm">
		</el-date-picker>
		<!-- header 货单搜索下拉框 -->
		<slot name="goodsSearchInput"></slot>
    </header>
</template>

<script>
	import { mapMutations } from 'vuex'
    export default {
		props: ['isHome', 'isHeaderTime', 'isShare'],
        data() {
            return {
				time: [new Date() - ( 3600 * 24 * 30 * 1000 ), +new Date()]
            }
        },
        computed: {

		},
		mounted() {
			this.$emit('getTime', this.time);
		},
        methods: {
			...mapMutations([
				'RECORD_LOGINOUT'
			]),
			getTime() {
				this.$emit('getTime', this.time);
			},
			loginOut() {
				this.RECORD_LOGINOUT();
			},
			clickShare() {
				this.$emit('clickShare');
			}
        }
    }
</script>

<style lang="scss" scoped>
	@import '../style/mixin';

    header{
        @include wh(100%, 60px);
        background: #ffda44;
		padding-left: 13px;
		padding-right: 26px
    }
    .table-sign{
        height: 44px;
        margin-top: 8px;
		margin-right: 11px;
		float: left;
		cursor: pointer;
    }
    .header-title{
        margin-top: 10px;
        float: left;
        .title-name{
            @include wh(57px, 20px);
            img{
                @include wh(100%, 100%);
            }
        }
        .title-text{
            @include wh(107px, 11px);
            margin-top: 5px;
            img{
                @include wh(100%, 100%);
            }
        }
    }
    .list-derive{
		@include wh(24px, 24px);
        margin-left: 10px;
        margin-top: 18px;
		float: right;
		cursor: pointer;
	}
	
	div.import-dropdown{
		position: relative;
		margin-top:0;
		@include wh(24px, 60px);
		margin-left: 10px;
		float: right;
		&:hover .import-item{
			display: inline-block;
		}
	}
	.import-item {
		position: absolute;
		text-align: center;
		background: #fff;;
		border: 1px solid #ddd;
		padding:10px 0;
		width:80px;
		left:-25px;
		top:60px;
		display:none;
		font-size: 14px;
		z-index: 99;
		label {
			cursor: pointer;
		}
		li {
			cursor:pointer;
			 padding:5px 0;
			 &:hover{
				 color:#59B5E7;
			 }
		}
	}
	#import_file {
		@include wh(1px, 1px);
		position: fixed;
		bottom:0;
	}
	div.home-dropdown{
		position: relative;
		height:60px;
		width: 24px;
		margin-left: 10px;
		float: right;
		cursor: pointer;
	}
	div.home-dropdown:hover .home-item{
		display:inline-block;
	}
	.home-item{
		position: absolute;
		top:36px;
		left:45px;
		width:86px;
		text-align: center;
		background: #fff;;
		border: 1px solid #ddd;
		padding:10px 0;
		display: none;
		z-index:999;
	}
	.home-item{
		width:80px;
		left:-25px;
		top:60px;
	}
	.home-item li{
		cursor:pointer;
		padding:5px 0;
	}
	.home-item li:hover{
		color:#59B5E7;
	}

</style>