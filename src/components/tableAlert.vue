<template>
    <div>
        <!-- 表格单挑记录弹出框 -->
        <div class="mark" v-if="isShowRowSearch">
			<div class="dialog">
				<div class="dialog-title">
					<span>查看详情</span>
					<img @click="closeTableAlert" src="@/assets/imgs/icon_close.png" alt="close">
				</div>
				<div class="dialog-content">
					<table class="dialog-table" id="detail_table" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td>品名:</td><td class="table-title">{{data.data.name}}</td>
                                <td>数量:</td><td class="table-title">{{data.data.weight}}</td>
                            </tr>
                            <tr>
                                <td>记账时间:</td><td class="table-title">{{data.data.accountsTime}}</td>
                                <td>单价:</td><td class="table-title">{{data.data.price}}</td>
                            </tr>
                            <tr>
                                <td>总价:</td><td class="table-title">{{data.data.total}}</td>
                                <td>部位:</td><td class="table-title">{{data.data.position}}</td>
                            </tr>
                            <tr>
                                <td>批次号:</td><td class="table-title">{{data.data.batchCode}}</td>
                                <td>装箱号:</td><td class="table-title">{{data.data.boxCode}}</td>
                            </tr>
                            <tr>
                                <td>场景:</td><td class="table-title">{{data.data.scenes}}</td>
                                <td>数据来源:</td><td class="table-title">{{data.data.source}}</td>
                            </tr>
                        </tbody>
					</table>
				</div>
				<div class="back">
					<a @click="closeTableAlert">返回</a>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
    export default {
        props: ['isShowRowSearch', 'data'],
        data() {
            return {
                
            }
        },
        methods: {
            closeTableAlert() {
                this.$emit('closeTableAlert');
            }
        },
    }
</script>

<style lang="scss" scoped>
    // 表格弹出框样式
    .mark {
        z-index:9;
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        background: rgba(0,0,0,0.4);
        .dialog {
            width: 678px;
            background: #fff;
            box-shadow: 0 7px 6px 0 rgba(0,0,0,0.23);
            border-radius: 8px;
            position: absolute;
            left: 50%;
            margin-left: -339px;
            top: 150px;
            font-size: 14px;
            .dialog-title{
                height: 50px;
                line-height: 50px;
                padding-left: 20px;
                padding-right: 20px;
                position: relative;
                border-bottom: 1px solid #dcdcdc;
                cursor: pointer;
                img{
                    width: 16px;
                    height: 16px;
                    position: absolute;
                    right: 20px;
                    top: 17px;
                }
            }
        }

        .dialog-content{
            padding: 20px 30px 24px;
        .dialog-table{
            width: 100%;
            border: 1px solid #dfdfdf;
            tr{
                height: 42px;
                line-height: 42px;
                td{
                    width: 100px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                    -icab-text-overflow: ellipsis;
                    -khtml-text-overflow: ellipsis;
                    -moz-text-overflow: ellipsis;
                    -webkit-text-overflow: ellipsis;
                    border-right: 1px dashed #dedede;
                    border-bottom: 1px dashed #dedede;
                    text-align: center;
                }
                td:last-child{
                    border-right: 0;
                }
                .table-title{
                    width: 206px;
                    text-align: left;
                    padding-left: 16px;
                    background: #f6fafc;
                }
            }
            tr:last-child td{
                border-bottom: 0;
            }
        }
        }
        .back{
            width: 100%;
            height: 60px;
            position: relative;
            a{
                display: inline-block;
                width: 100px;
                height: 35px;
                text-align: center;
                line-height: 35px;
                color: #666;
                border: 1px solid #cccccc;
                border-radius: 8px;
                position: absolute;
                left: 50%;
                margin-left: -50px;
                cursor: pointer;
            }
            a:hover{
                background: #F3F3F3;
            }
        }
    }
</style>