<template>
    <div id="bill" >
        <head-top
            isHome="true"
            isHeaderTime="true"
            isShare="true"
            @getTime="getTime"
            @clickShare="clickShare">
			<div class="list-search" slot="goodsSearchInput">
                <img alt="search" src="@/assets/imgs/icon_search.png">
                <input id="likeParams" v-model="searchParams.linkParms" type="text" placeholder="品名/批次号/装箱号" @click="searchItemIsShow = true">
			</div>
        </head-top>
        <div id="search_result" v-if="totalCount">
          <div class="result-header">
              <div class="item-name">
                  <div class="all-bill">账单汇总</div>
                  <div class="static-time">
                      <div>开始时间：  <span class="item-begin-time">{{resultData.beginDate}}</span></div>
                      <div>结束时间： <span class="item-end-time">{{resultData.endDate}}</span> </div>
                  </div>
              </div>
              <div id="result_item">
                  <!-- Table -->
                  <el-table
                    ref="multipleTable"
                    stripe
                    style="width: 100%"
                    :max-height="tableMaxHeight"
                    :data="resultData.list"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        align="center"
                        min-width="140">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        type="index"
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
                        prop="weight"
                        label="数量"
                        min-width="180">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="accountsTime"
                        label="记账时间"
                        min-width="200">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="operator"
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
                    合计： <span id="total_count">{{resultData.weightAmount}}</span> kg <span id="other" style="color:rgb(0, 172, 233)"></span>
                  </div>
                      <div style="margin:0px 10px;float:right;">最大： <span id="max_count">{{resultData.maxAmount}}</span> kg</div>
                      <div style="margin:0px 10px;float:right;">最小： <span id="min_count">{{resultData.minAmount}}</span> kg</div>
                      <div style="margin:0px 10px;float:right;">均值： <span id="average_count">{{resultData.averageAmount}}</span> kg </div>
              </div>
          </div>
        </div>
        <div class="result-bottom" id="result-bottom" v-if="totalCount">
              <span id="print-now" @click="printFooter">立即打印</span>
              <span id="export-now" @click="exportFooter">立即导出</span>
        </div>
        <no-data :totalCount="totalCount"></no-data>
        <!-- 验证码分享 -->
        <qrcode-modal v-if="isShowShareModal" :isShowShareModal="isShowShareModal" :shareIds="shareIds" @closeShareModal="isShowShareModal = false"> </qrcode-modal>
        <!-- 下拉搜索框 -->
        <search-select :searchItemIsShow="searchItemIsShow" @searchResult="searchResult" @billReset="searchItemIsShow=false"></search-select>
        <!-- 黑色遮罩 -->
        <div id="c-model" v-show="isShowShareModal"></div>
        <table-alert :isShowRowSearch="isShowRowSearch" :data="detailsData" @closeTableAlert="closeTableAlert"></table-alert>
    </div>
</template>

<script>
    import headTop from '@/components/header'
    import noData from '@/components/noData'
    import qrcodeModal from '@/components/qrcodeModal'
    import searchSelect from '@/components/searchSelect'
    import tableAlert from '@/components/tableAlert'
    import { getEleTime, exportExcel } from '@/config/untils'
    import { searchBillResult, searchDetails } from '@/service/getData'
    import { mapState, mapMutations } from 'vuex'

    export default {
        data() {
            return {
                time:'',
				totalCount: 0, // 总记录数
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
                tableHeight: 0, // 表格高度
                resultData: {}, // 搜索结果
                isShowRowSearch: false, // tr 弹窗
                detailsData: '', // tr 详情
                selectArr: [], //选中项
                loading: false,
            }
        },
        components: {
            headTop, noData, searchSelect, qrcodeModal, tableAlert
        },
        computed: {
            tableMaxHeight: function(){
                return document.body.clientHeight - 300
            },
            shareIds: function() {
                let arr = [];
                if( this.selectArr.length > 0 ){
                    arr = this.selectArr.map( val => {
                        return val.accountsRecordId
                    })
                }else {
                    if( this.resultData.list && this.resultData.list.length > 0 ) {
                        arr = this.resultData.list.map( val => {
                            return val.accountsRecordId
                        })
                    }
                }
                return arr.join(',');
            }
        },
        methods: {
            //  表格操作列点击
            async tableSearchClick(scope) {
                this.loading = this.$loading({text: '加载中...'})
                this.detailsData = await searchDetails(scope.row.accountsRecordId || 0);
                this.isShowRowSearch = true;
                this.loading.close();
            },
            closeTableAlert() {
                this.isShowRowSearch = false;
            },
            getTime(time) {
                this.time = getEleTime(time, 1);
                this.searchResult();
            },
            async searchResult(params) {
                this.loading = this.$loading({text: '加载中...'})
                // 搜索时 才获取时间
                this.searchParams.beginDate = this.time[0];
                this.searchParams.endDate = this.time[1];

                Object.assign(this.searchParams, params);
                let data = await searchBillResult(this.searchParams);
                this.searchItemIsShow = false;
                this.resultData = data.data;
                this.totalCount = (this.resultData.list && this.resultData.list.length) || 0;
                this.loading.close();
            },
            // 点击分享
            clickShare() {
                if( this.resultData.list && this.resultData.list.length > 0 ) {
                    this.isShowShareModal = true;
                }else {
                    this.$message('没有可分享的数据');
                }
            },
            // 选中发生改变时触发
            handleSelectionChange(val) {
                this.selectArr = val;
            },
            // 导出
            exportFooter() {
                exportExcel(this.shareIds);
            },
            // 打印
            printFooter() {
                this.$router.push({name: 'print', params:{ids: this.shareIds, printType: 2}})
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