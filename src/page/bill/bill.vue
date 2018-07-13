<template>
    <div id="bill">
        <head-top
            isHome="true"
            isHeaderTime="true"
            isShare="true"
            @getTime="getTime"
            @clickShare="clickShare">
			<div class="list-search" slot="goodsSearchInput">
                <img alt="search" src="@/assets/imgs/icon_search.png">
                <input id="likeParams" v-model="searchParams.linkParms" type="text" placeholder="品名/批次号/装箱号" @click="searchItemIsShow = !searchItemIsShow">
			</div>
        </head-top>
        <div id="search_result" v-show="resultTableIsShow">
          <div class="result-header">
              <div class="item-name">
                  <div class="all-bill">账单汇总</div>
                  <div class="static-time">
                      <div>开始时间：  <span class="item-begin-time">{{searchParams.beginDate}}</span></div>
                      <div>结束时间： <span class="item-end-time">{{searchParams.endDate}}</span> </div>
                  </div>
              </div>
              <div id="result_item">
                  <!-- Table -->
                  <el-table
                    ref="multipleTable"
                    stripe
                    style="width: 100%"
                    :max-height="tableMaxHeight"
                    :data="resultData"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        align="center"
                        min-width="140">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="num"
                        label="序号"
                        min-width="140">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="name"
                        label="品名"
                        min-width="180">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="count"
                        label="数量"
                        min-width="180">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="time"
                        label="记账时间"
                        min-width="200">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="people"
                        label="经手人"
                        min-width="160">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作"
                        min-width="200">
                        <template slot-scope="scope">
                            <span class="table-search">
                                <img @click="tableSearchClick(scope)" src="@/assets/imgs/table_search.png" alt="">
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
              </div>
              <div class="item-calc">
                  <div class="all-count">
                    合计： <span id="total_count">0</span> kg <span id="other" style="color:rgb(0, 172, 233)"></span>
                  </div>
                      <div style="margin:0px 10px;float:right;">最大： <span id="max_count">0</span> kg</div>
                      <div style="margin:0px 10px;float:right;">最小： <span id="min_count">0</span> kg</div>
                      <div style="margin:0px 10px;float:right;">均值： <span id="average_count">0</span> kg </div>
              </div>
          </div>
        </div>
        <div class="result-bottom" id="result-bottom" v-show="footerBtnIsShow">
              <span id="print-now">立即打印</span>
              <span id="export-now">立即导出</span>
        </div>
        <no-data :totalCount="totalCount">

        </no-data>
        <!-- 验证码分享 -->
        <qrcode-modal :isShowShareModal="isShowShareModal" @closeShareModal="isShowShareModal = !isShowShareModal"> </qrcode-modal>
        <!-- 下拉搜索框 -->
        <search-select :searchItemIsShow="searchItemIsShow" @searchResult="searchResult" @billReset="searchItemIsShow=false"></search-select>
        <!-- 黑色遮罩 -->
        <div id="c-model" v-show="isShowShareModal"></div>
    </div>
</template>

<script>
    import headTop from '@/components/header'
    import noData from '@/components/noData'
    import qrcodeModal from '@/components/qrcodeModal'
    import searchSelect from '@/components/searchSelect'
    import { getEleTime } from '@/config/untils'
    import { searchBillResult } from '@/service/getData'
    import { mapState, mapMutations } from 'vuex'

    export default {
        data() {
            return {
                time:'',
				totalCount: 1, // 总记录数
				searchItemIsShow: true, // 下拉框
                isShowShareModal: false, // 分享码弹出框
                searchParams: { // 搜索条件
                    beginDate: '',
                    endDate: '',
                    gradeList: [],
                    lowPrice: '',
                    highPrice: '',
                    likeParams: '',
                    operatorList: [],
                    payTypeList: [],
                    sourceList: [],
                    whereaboutsList: []
                },
                footerBtnIsShow: true,
                resultTableIsShow: true,
                tableHeight: 0, // 表格高度
                resultData: [   // 搜索结果 二次封装
                    {num:'0', name:'aaa',time:'1018-1-1',count:'infinity', people:'Me'},
                    {num:'0', name:'aaa',time:'1018-1-1',count:'infinity', people:'Me'},
                    {num:'0', name:'aaa',time:'1018-1-1',count:'infinity', people:'Me'},
                    {num:'0', name:'aaa',time:'1018-1-1',count:'infinity', people:'Me'},
                    {num:'0', name:'aaa',time:'1018-1-1',count:'infinity', people:'Me'},
                    {num:'0', name:'aaa',time:'1018-1-1',count:'infinity', people:'Me'},
                    {num:'0', name:'aaa',time:'1018-1-1',count:'infinity', people:'Me'},
                    {num:'0', name:'aaa',time:'1018-1-1',count:'infinity', people:'Me'},
                    {num:'0', name:'aaa',time:'1018-1-1',count:'infinity', people:'Me'},
                    {num:'0', name:'aaa',time:'1018-1-1',count:'infinity', people:'Me'},
                    {num:'0', name:'aaa',time:'1018-1-1',count:'infinity', people:'Me'},
                    {num:'0', name:'aaa',time:'1018-1-1',count:'infinity', people:'Me'},
                    {num:'0', name:'aaa',time:'1018-1-1',count:'infinity', people:'Me'},
                    {num:'0', name:'aaa',time:'1018-1-1',count:'infinity', people:'Me'},
                    {num:'0', name:'aaa',time:'1018-1-1',count:'infinity', people:'Me'},
                ],
            }
        },
        components: {
            headTop, noData, searchSelect, qrcodeModal
        },
        computed: {
            tableMaxHeight: function(){
                return document.body.clientHeight - 300
            }
        },
        methods: {
            getTime(time) {
                this.time = getEleTime(time, 1);
                
            },
            async searchResult(params) {
                // 搜索时 才获取时间
                this.searchParams.beginDate = this.time[0];
                this.searchParams.endDate = this.time[1];

                Object.assign(this.searchParams, params);
                let data = searchBillResult(this.searchParams);
                //if( data.code == '0000'){
                    this.searchItemIsShow = false;
                //}
            },
            // 点击分享
            clickShare() {
                this.isShowShareModal = !this.isShowShareModal;
            },
            // 选中发生改变时触发
            handleSelectionChange(val) {
                console.log(val);
            }
        }
    }
</script>

<style lang="scss">
	@import '../../style/mixin';
    #bill{
        #c-model {
            z-index: 99999;
            background: #000;
            opacity: 0.2;
            position: absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
        }
		.header-time {
            float: right;
            height: 36px;
            margin-top: 12px;
            border-radius: 26px;
            .el-range-separator {
                line-height: 29px;
            }
            .el-range__icon {
                line-height: 29px;
            }
            .el-icon-circle-close {
               // TODO:
            }
        }
		.list-search {
			@include wh(325px, 36px);
            position: relative;
            margin-top: 12px;
            margin-right: 6px;
            float: right;
            img {
				@include wh(17px, 17px);
                position: absolute;
                left: 16px;
                top: 10px;
            }
            input {
				@include wh(100%, 100%);
                border-radius: 18px;
                background: #fff;
                padding-left: 46px;
                padding-right: 16px;
                font-size: 14px;
                border: 1px solid #dcdfe6;
                &:hover {
                    border: 1px solid #ccc;
                }
            }
		}
            /**
            * search_result
            */
        #search_result{
            width: 95%;
            margin: 10px auto;
            .table-search {
                img {
                    @include wh(24px, 24px);
                    cursor: pointer;
                    position: relative;
                    top:4px;
                }
            }
        }
        .result-header{
            width: 100%;
            border: 1px solid #ddd;
            box-shadow: 1px 2px 4px #ccc;
        }
        .item-name{
            height:100px;
        }
        .all-bill{
            text-align: center;
            line-height: 100px;
            font-size: 26px;
            float:left;
            width: calc( 100% - 200px);
            padding-left: 200px;
        }
        .static-time{
            width:200px;
            float:right;
            margin-top: 17px;
        }
        .static-time div {
            padding: 8px 0;
        }
        .all-count {
            width:250px;
            float: left;
            padding-left:20px;
        }
        .group-count {
            width: 200px;
            float: right;
        }
        .item-calc{
            height:35px;
            width:100%;
        }
        .result-bottom {
            text-align: center;
            margin-top:20px;
            font-size: 14px;
        }
        .result-bottom span{
            cursor: pointer;
            display: inline-block;
            padding-left: 33px;
            width: 154px;
            height: 45px;
            line-height: 45px;
            border-radius: 30px;
            margin-left: 10px;
        }
        #total_count{
            font-size: 18px;
            color:#00ace9;
        }
        .group-count span{
            font-size: 18px;
        }
        #result_item{
            overflow-y: auto;
            border-top: 1px solid #ddd;
            margin-bottom: 10px;
        }
        #print-now{
            color: #fff;
            background: url('~@/assets/imgs/icon_print.png') no-repeat 22% center #4BAAE4;
            background-size: 24px 24px;
        }
        #export-now{
            background: url('~@/assets/imgs/icon_derive.png') no-repeat 22% center #F9DA61;
            background-size: 24px 24px;
        }
	}
</style>