<template>
    <div class="list" id="goods">
        <head-top
            isHome="true"
            isHeaderTime="true"
            isShare="true"
            @getTime="getTime"
            @clickShare="clickShare">
            <!-- 货单 header 导入 -->
            <div id="excelBtn" class="import-dropdown" slot="importBtn">
                <img class="list-derive" src="@/assets/imgs/icon_derive.png" alt="">
                <ul class="import-item">
                    <li>
                        <label for="import_file">导入数据</label>
                        <input type="file" id="import_file" v-on:change="isImport">
                    </li>
                    <li @click="templateDownload">模版下载</li>
                </ul>
            </div>
            <!-- 货单 header 搜索  -->
            <div class="search-btn" slot="goodsSearchBtn" @click="getSearchResult">搜索</div>
            <div class="list-search" slot="goodsSearchInput">
				<img src="@/assets/imgs/icon_search.png" alt="search">
				<span class="data-source" @click="tooggleDropDown = !tooggleDropDown">
					<span>{{searchTypeName}}</span>
					<span class="circle"></span>
				</span>
				<input id="likeParams" type="text" v-model="searchContent" placeholder="品名/批次号/装箱号"/>
				<ul class="source-type" v-show="tooggleDropDown">
					<li v-for="(item, index) in searchTypeArr" :key="index" @click="changeSearchType(index)" :style="searchTypeIndex == index ? 'color: #59B5E7;': '' ">{{item}}</li>
				</ul>
			</div>
        </head-top>
        <!-- 导入文件弹出框  -->
        <div class="commit-file" v-if="isFileType">
            <div class="c-header">
                <span>提示</span>
                <span class="close" @click="close">x</span>
            </div>
            <div class="c-content">
                <div></div>
                <div>确认导入此文件吗？</div>
                <div>
                    文件名称： <span class="file-name">{{fileName}}</span>
                </div>
            </div>
            <div class="c-bottom">
                <span class="send-sure" @click="importSure">确定</span>
                <span class="cancel" @click="close">取消</span>
            </div>
        </div>
		<!-- 无搜索结果  -->
		<no-data @uploadData="uploadData" :totalCount="totalCount" :resultData="resultData">

		</no-data>
        <!-- 验证码分享 -->
        <qrcode-modal v-if="isShowShareModal" :isShowShareModal="isShowShareModal" :shareIds="shareIds" @closeShareModal="isShowShareModal = false"> </qrcode-modal>
        <!-- 中间内容区域 -->
        <div class="container" v-if="totalCount">
            <el-table
                ref="multipleTable"
                stripe
                style="width: 100%"
                :height="containerHeight"
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
        <!-- goods 底部按钮 -->
        <div id="list_footer" v-if="totalCount">
			<!-- <div class="select-footer">
				<input type="checkbox" id="all_choose">
				<label for="all_choose" @click="chooseAll">全选</label>
			</div> -->
			<span>共选: </span>
			<span class="choose-data">{{selectArr.length}}</span>
			条
			<div class="export-footer" @click="exportFooter">立即导出</div>
			<div class="print-footer" @click="printFooter">立即打印</div>
		</div>
        <!-- 黑色遮罩 -->
        <div id="c-model" v-show="isShowShareModal"></div>
        <table-alert :isShowRowSearch="isShowRowSearch" :data="detailsData" @closeTableAlert="closeTableAlert"></table-alert>
    </div>
</template>

<script>
    import headTop from '@/components/header'
    import noData from '@/components/noSearchData'
    import qrcodeModal from '@/components/qrcodeModal'
    import tableAlert from '@/components/tableAlert'
    import { mapState, mapMutations } from 'vuex'
    import { searchGoodsResult, searchDetails, uploadExcel } from '@/service/getData'
    import { getEleTime, exportExcel } from '@/config/untils'

    export default {
        data() {
            return {
                time: '', // 时间
                searchTypeIndex: '0', //搜索框中的类型
                searchContent: '', // 搜索框中的内容
                tooggleDropDown: false, // 搜索框的下拉框是否显示
                searchTypeName: '数据来源',
                searchTypeArr: ['全部', '称重', '记账', '导入', '扫描'], // 搜索类型
                fileName: '', // 上传文件名称
                isFileType: false, // 上传文件弹出框 是否显示
                totalCount: 0, //总记录数
                isShowShareModal: false, // 验证码弹出框
                resultData: {}, // 搜索结果 二次封装
                isShowRowSearch: false, // 表格单行点击 modal
                detailsData:'', //详情数据
                selectArr: [], //选中项
                loading: false,
                files:'', // 导入的数据
            }
        },
        computed: {
            containerHeight() {
                return document.body.clientHeight - 112;
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
        components: {
            headTop, noData, qrcodeModal, tableAlert
        },
        mounted() {
            this.getSearchResult();
        },
        methods: {
            //  表格操作列点击
            async tableSearchClick(scope) {
                this.detailsData = await searchDetails(scope.row.accountsRecordId);
                this.isShowRowSearch = true;
            },
            closeTableAlert() {
                this.isShowRowSearch = false;
            },
            //选中框改变触发
            handleSelectionChange(val) {
                this.selectArr = val;
            },
            // 单选行触发
            /* 导入数据逻辑 */
            isImport(e) {
                console.dir(e);
                let files = e.target.files[0];
                this.files = files;
                this.fileName = files.name;
                let suffixArr = files.name.split('.');
                let suffix = suffixArr[suffixArr.length - 1];
                if( suffix != 'xlsx' && suffix != 'xls' ){
                    this.$message({
                        duration: 4000,
                        type: 'error',
                        message: '仅支持上传 xlsx, xls 格式的文件。',
                        showClose: true
                    })
                    return;
                }
                this.isFileType = true;
            },
            /* 确定导入 */
            importSure() {
                this.isFileType = false;
                //TODO:
                var formData = new FormData();
                formData.append("file", this.files);
                formData.append("name", this.fileName);
                debugger
                uploadExcel(formData)
            },
            /* 关闭确定导入弹出框 */
            close() {
                this.isFileType = false;
            },
            /* 模版下载 */
            templateDownload() {
                var form = document.createElement("form");
                document.body.appendChild(form);
                form.method = 'post';
                form.action = "http://cs.nongchangyun.cn/farmeasy-accountsbao-service/downTemplate";
                form.submit();
            },
            /* 获取子组件的时间 */
            getTime(time) {
                this.time = getEleTime(time, 1);
                this.getSearchResult();
            },
            /* 搜索按钮 */
            async getSearchResult() {
                this.loading = this.$loading({text:'加载中...'});
                var result = await searchGoodsResult(this.time[0], this.time[1], this.searchContent, this.searchTypeIndex );
                this.resultData = result.data;
                this.totalCount = ( result.data.list && result.data.list.length) || 0;
                this.loading.close();

            },
            /* 搜索下拉框 */
            changeSearchType(index) {
                this.tooggleDropDown = !this.tooggleDropDown;
                this.searchTypeIndex = index;
                this.searchTypeName = this.searchTypeArr[index];
            },
            /* 全选按钮 */
            chooseAll() {
                //TODO:
            },
            /* footer 导出 */
            exportFooter() {
                exportExcel(this.shareIds);
            },
            /* footer 打印 */
            printFooter() {
                this.$router.push({name: 'print', params:{ids: this.shareIds, printType: 1}})
            },
            uploadData() {
                let dom = document.getElementById('import_file');
                dom.click();
            },
            // 点击分享
            clickShare() {
                if( this.resultData.list && this.resultData.list.length > 0 ) {
                    this.isShowShareModal = true;
                }else {
                    this.$message('没有可分享的数据');
                }
            }
        },
    }
</script>

<style lang="scss">
    @import '../../style/mixin';
    #goods {
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
        .container {
            width: 100%;
            background: #FFF;
            overflow:hidden;
            .table-search img {
                @include wh(24px, 24px);
                cursor: pointer;
                position: relative;
                top:4px;
            }
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
        .search-btn {
            @include wh(86px, 36px);
            background: #fff;
            border-radius: 18px;
            font-size: 14px;
            line-height: 35px;
            position: relative;
            margin: 12px 6px 0 6px;
            float: right;
            cursor:pointer;
            text-align: center;
            border: 1px solid #dcdfe6;
            &:hover {
                color: #59B5E7;
                border: 1px solid #ccc;
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
                padding-left: 143px;
                padding-right: 16px;
                font-size: 14px;
                border: 1px solid #dcdfe6;
                &:hover {
                    border: 1px solid #ccc;
                }
            }
            .data-source {
				@include wh(92px, 27px);
                position: absolute;
                line-height:27px;
                top:5px;
                left:39px;
                border-right: 1px solid #ddd;
                cursor: pointer;
                font-size:13px;
                span:first-child {
                    display: inline-block;
                    width:52px;
                    text-align: center;
                }
                .circle {
                    border: 5px solid transparent;
                    border-top-color: #000;
                    position: relative;
                    bottom: -13px;
                    margin: 0 10px;
                }
            }
            .source-type, .import-item {
                position: absolute;
                top:36px;
                left:45px;
                width:86px;
                text-align: center;
                background: #fff;;
                border: 1px solid #ddd;
                padding:10px 0;
                z-index:99;
            }
            .import-item {
                width:80px;
                left:-25px;
                top:60px;
            }
            .import-item li, .source-type li {
                cursor:pointer;
                padding:5px 0;
                &:hover {
                    color:#59B5E7;
                }
            }
        }
        .commit-file{
			@include wh(519px, 328px);
            box-shadow: 1px 2px 6px 0 #919aaa;
            border-radius: 5px;
            @include center();
            background: #FFF;
            z-index:999999;
        }
        .c-header{
            height:40px;
            border-bottom: 1px solid #ddd;
        }
        .c-header span:first-child{
            float:left;
            width:60px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
        }
        .c-header span:last-child{
            float:right;
            width:40px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
        }
        .c-content{
            height: 219px;
        }
        .c-content div:first-child{
            background: url('~@/assets/imgs/icon-file.png') center center no-repeat;
            height:100px;
        }
        .c-content div:nth-child(2){
            font-size: 16px;
            color:#333;
            text-align: center;
        }
        .c-content div:last-child{
            font-size: 13px;
            color:#333;
            text-align: center;
        }
        .c-content div{
            margin:10px 0;
        }
        .c-bottom{
            border-top:1px solid #ddd;
            padding: 10px 0;
            text-align: center;
        }
        .c-bottom span{
            cursor: pointer;
        }
        .c-header .close{
            cursor: pointer;
            color:#999;
            font-size: 18px;
        }
        .c-bottom span:first-child{
			@include wh(95px, 36px);
            line-height: 36px;
            color: #fff;
            background: #00ace9;
            border-radius: 7px;
            display: inline-block;
            text-align: center;
        }
        .c-bottom span:last-child{
			@include wh(87px, 34px);
            display: inline-block;
            line-height: 34px;
            background:#ffffff;
            border:1px solid #cdcdcd;
            border-radius:7px;
            color:#666666;
            text-align: center;
        }
		#list_footer{
			@include wh(100%, 50px);
			line-height: 50px;
			background: #f4f4f4;
			border-top:1px solid #ddd;
			padding-left: 20px;
            font-size: 14px;
		}
		.export-footer, .print-footer{
			@include wh(200px, 50px);
			padding:0 20px 0 40px;
			float:right;
			line-height: 50px;
			text-align: center;
			font:13px;
			cursor:pointer;
		}
		  .export-footer{
			background: url('~@/assets/imgs/icon_derive.png') no-repeat 22% center #F9DA61;
			background-size: 24px 24px;
		}
		.print-footer{
			background: url('~@/assets/imgs/icon_print.png') no-repeat 22% center #4BAAE4;
			background-size: 24px 24px;
			color:#fff;
  		}
		.select-footer{
			float:left;
			margin:0 10px;
		}
		.select-footer input, .select-footer label{
			cursor: pointer;
		}
    }

</style>