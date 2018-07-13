<template>
        <!--  高级搜索 -->
    <div class="search-mask" v-show="searchItemIsShow">
        <div class="search-wrap">
	        <!-- 来源 -->
	        <div class="search-list" id="sourceList" :class="{height: !sourceListMoreClick}">
	            <p class="list-title">来源</p>
	            <div class="list-more" v-show="sourceListMore">
                    <p class="list-more-up" @click="sourceListMoreClick = !sourceListMoreClick" v-show="sourceListMoreClick">更多
                        <img src="../assets/imgs/icon2.png" width="15"/>
                    </p>
                    <p class="list-more-down" @click="sourceListMoreClick = !sourceListMoreClick" v-show="!sourceListMoreClick">收起
                        <img src="../assets/imgs/icon3.png" width="15"/>
                    </p>
                </div>
	            <ul class="list-each clear">
                    <li @click="addDataList(index, item, 'sourceList')"
                        :class="{cur: chooseData.sourceList.includes( item )}"
                        v-for="(item, index) in data.sourceList"
                        :key="index">{{item}}</li>
	            </ul>
	        </div>
	        <!-- 去向 -->
            <div class="search-list" id="whereaboutsList" :class="{height: !whereaboutsListMoreClick}">
	            <p class="list-title">来源</p>
	            <div class="list-more" v-show="whereaboutsListMore">
                    <p class="list-more-up" @click="whereaboutsListMoreClick = !whereaboutsListMoreClick" v-show="whereaboutsListMoreClick">更多
                        <img src="../assets/imgs/icon2.png" width="15"/>
                    </p>
                    <p class="list-more-down" @click="whereaboutsListMoreClick = !whereaboutsListMoreClick" v-show="!whereaboutsListMoreClick">收起
                        <img src="../assets/imgs/icon3.png" width="15"/>
                    </p>
                </div>
	            <ul class="list-each clear">
                    <li @click="addDataList(index, item, 'whereaboutsList')"
                        :class="{cur: chooseData.whereaboutsList.includes( item )}"
                        v-for="(item, index) in data.whereaboutsList"
                        :key="index">{{item}}</li>
	            </ul>
	        </div>
	        <!-- 支付方式 -->
	        <div class="search-list" id="payTypeList" :class="{height: !payTypeListMoreClick}">
	            <p class="list-title">付款方式</p>
                <div class="list-more" v-show="payTypeListMore">
                    <p class="list-more-up" @click="payTypeListMoreClick = !payTypeListMoreClick" v-show="payTypeListMoreClick">更多
                        <img src="../assets/imgs/icon2.png" width="15"/>
                    </p>
                    <p class="list-more-down" @click="payTypeListMoreClick = !payTypeListMoreClick" v-show="!payTypeListMoreClick">收起
                        <img src="../assets/imgs/icon3.png" width="15"/>
                    </p>
                </div>
                <ul class="list-each clear">
                    <li @click="addDataList(index, item, 'payTypeList')"
                        :class="{cur: chooseData.payTypeList.includes( item )}"
                        v-for="(item, index) in data.payTypeList"
                        :key="index">{{item}}</li>
	            </ul>
	        </div>
	        <!-- 品级 -->
	        <div class="search-list" id="gradeList" :class="{height: !gradeListMoreClick}">
	            <p class="list-title">品级</p>
                <div class="list-more" v-show="gradeListMore">
                    <p class="list-more-up" @click="gradeListMoreClick = !gradeListMoreClick" v-show="gradeListMoreClick">更多
                        <img src="../assets/imgs/icon2.png" width="15"/>
                    </p>
                    <p class="list-more-down" @click="gradeListMoreClick = !gradeListMoreClick" v-show="!gradeListMoreClick">收起
                        <img src="../assets/imgs/icon3.png" width="15"/>
                    </p>
                </div>
                <ul class="list-each clear">
                    <li @click="addDataList(index, item, 'gradeList')"
                        :class="{cur: chooseData.gradeList.includes( item )}"
                        v-for="(item, index) in data.gradeList"
                        :key="index">{{item}}</li>
	            </ul>
	        </div>
	        <!--  经手人 -->
	        <div class="search-list" id="operatorList" :class="{height: !operatorListMoreClick}">
	            <p class="list-title">经手人</p>
                <div class="list-more" v-show="operatorListMore">
                    <p class="list-more-up" @click="operatorListMoreClick = !operatorListMoreClick" v-show="operatorListMoreClick">更多
                        <img src="../assets/imgs/icon2.png" width="15"/>
                    </p>
                    <p class="list-more-down" @click="operatorListMoreClick = !operatorListMoreClick" v-show="!operatorListMoreClick">收起
                        <img src="../assets/imgs/icon3.png" width="15"/>
                    </p>
                </div>
                <ul class="list-each clear">
                    <li @click="addDataList(index, item, 'operatorList')"
                        :class="{cur: chooseData.operatorList.includes( item )}"
                        v-for="(item, index) in data.operatorList"
                        :key="index">{{item}}</li>
	            </ul>
	        </div>
	        <!-- 单价 -->
	        <div class="search-list">
	            <p class="list-title">单价</p>
	            <div class="list-input-wrap">
	                <p class="fl mr10"><input v-model="data.lowPrice" class="list-input" id="lowPrice" /></p>
	                <p class="fl mr10 mt10">—</p>
	                <p class="fl mr10"><input v-model="data.highPrice" class="list-input" id="highPrice" /></p>
	                <p class="fl mt10">元/公斤</p>
	                <div class="clearfix"></div>
	            </div>
	        </div>
	        <div class="search-btn-wrap">
	            <input type="button" value="搜索" @click="searchResult" class="search-btn-sure" />
	            <input type="button" value="重置" class="search-btn-reset" @click="reset"/>
	        </div>
	    </div>
	</div>
</template>

<script>
    import { getSearchSelect } from '@/service/getData'
    import { getStyle } from '@/config/untils'

    export default {
        props: ['searchItemIsShow'],
        data() {
            return {
               data: {
                   sourceList: [],
                   whereaboutsList: [],
                   payTypeList: [],
                   gradeList: [],
                   operatorList: [],
                   lowPrice: '',
                   highPrice: ''
               },
               chooseData: { // 选中数据
                   sourceList: [],
                   whereaboutsList: [],
                   payTypeList: [],
                   gradeList: [],
                   operatorList: [],
                   lowPrice: '',
                   highPrice: ''
               },
               sourceListMore: false, // 是否显示更多
               whereaboutsListMore: false,
               payTypeListMore: false,
               gradeListMore: false,
               operatorListMore: false,
               // ----------------------------------------
               sourceListMoreClick: true, // 来源更多
               whereaboutsListMoreClick: true,
               operatorListMoreClick: true,
               gradeListMoreClick: true,
               payTypeListMoreClick: true,
               map:{
                   '#sourceList': 'sourceListMore',
                   '#whereaboutsList': 'whereaboutsListMore',
                   '#payTypeList': 'payTypeListMore',
                   '#gradeList': 'gradeListMore',
                   '#operatorList': 'operatorListMore'
               },
            }
        },
        mounted() {
            getSearchSelect().then((data) => {
                console.dir(data);
                if( data.code == '0000' ){
                    this.data = data.data;
                    this.$nextTick(() => {
                        for(var key in this.map) {
                            let dom = document.querySelector(key +' ul');
                            let height = getStyle(dom, 'height');
                            this[this.map[key]] = height > 46 ? true : false;
                        }
                    })
                }
            });
        },
        computed: {

        },
        methods: {
            // 来源
            addDataList(index, item, attr){
                let a = this.chooseData[attr].includes(item);
                if( !a ) {
                    this.chooseData[attr].push(item);
                }else {
                    let a = this.chooseData[attr].indexOf(item);
                    this.chooseData[attr].splice(a,1);
                }
            },
            // 搜索结果
            searchResult() {
                this.chooseData.lowPrice = this.data.lowPrice || '';
                this.chooseData.highPrice = this.data.highPrice || '';
                this.$emit('searchResult', this.chooseData);
            },
            // 重置
            reset() {
                this.chooseData = { // 清空选中
                   sourceList: [],
                   whereaboutsList: [],
                   payTypeList: [],
                   gradeList: [],
                   operatorList: [],
                   lowPrice: '',
                   highPrice: ''
                };
                this.$emit('billReset');
            }
        },
    }
</script>

<style lang="scss" scoped>
    /*高级搜索*/
    .height{
        height: auto!important;
    }
    .search-mask{
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        top:60px;
        left:0;
        bottom: 0;
        z-index: 99;
    }
    .search-wrap{
        position: absolute;
        background: #fff;
        width: 100%;
        top:0px;
        left:0;padding: 20px;
        box-sizing: border-box;
    }
    .search-list{
        position: relative;
        margin-bottom: 10px;
        height: 40px;
        overflow: hidden;
    }
    .list-title{
        position: absolute;
        top: 8px;
        left: 0;
        font-weight: bold;
    }
    .list-each,.list-input-wrap{
        width: 100%;
        padding:0 80px;
        box-sizing: border-box;
    }
    .list-each li,.list-each .all{
        float: left;
        cursor: pointer;
        padding: 8px 18px;
        border:1px solid rgba(227,227,227,0);
        margin: 0 5px 5px 5px;}
    .list-each li:hover,.list-each .all:hover{
        background: #ffda44;
    }
    .list-each li.cur,.list-each .all.cur{
        border:1px solid rgba(227,227,227,1);
        background: url(~@/assets/imgs/icon1.png) no-repeat;
        background-position:100% 0;
        background-size: 12px 12px;
    }
    /*按钮*/
    .search-btn-wrap{border-top:1px solid #e1e1e1;padding-top:20px;text-align: center;}
    .search-btn-wrap input{margin: 0 10px;}
    .search-btn-sure{font-size:16px;width: 80px;height: 35px;text-align: center;color: #FFFFFF;background: #00abe9;border-radius: 5px;cursor: pointer;border:1px solid #00abe9}
    .search-btn-reset{font-size:16px;width: 80px;height: 35px;text-align: center;background: #fff;border-radius: 5px;cursor: pointer;border:1px solid #e1e1e1}
    .search-btn-cancel{width: 80px;height: 35px;text-align: center;background: #fff;border-radius: 5px;cursor: pointer;border:1px solid #e1e1e1}
    .list-input{border:1px solid #e1e1e1;background: none;width:80px;text-align: center;height: 35px;}
    .mr10{margin-right:10px;}
    .mt10{margin-top:10px;}
    /*更多*/
    .list-more{position: absolute;right: 0;top: 8px;cursor: pointer;color: #00abe9;}
    .list-more img{margin-left: 5px;}
    .list-more.cur{display: none;}
    .list-more.cur .list-more-down,.list-more .list-more-up{display: block;}
    .heightauto{height: auto;}
</style>