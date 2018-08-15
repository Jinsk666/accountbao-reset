<template>
    <div id="printBody">
        <p style="font-family: PingFangSC-Regular;font-size: 20px;text-align: center;margin-bottom: 40px;">账单</p>
        <div class="page-container" v-for="(item, index) in result" :key="index" :style="{marginTop: index==0?'0px':'50px'}">
            <table cellspacing="0" cellpadding="0" style="width: 750px;border: 1px solid #333;border-bottom: 0;margin: 0 auto;">
                <tbody>
                    <tr style="height: 60px; font-weight:bold;">
                        <td style="border-bottom: 1px solid #333;text-align: center;width: 57px;">品名</td>
                        <td style="border-bottom: 1px solid #333;text-align: center;width: 66px;">记账时间</td>
                        <td style="border-bottom: 1px solid #333;text-align: center;width: 57px;">数量</td>
                        <td style="border-bottom: 1px solid #333;text-align: center;width: 57px;">单价</td>
                        <td style="border-bottom: 1px solid #333;text-align: center;width: 57px;">总价</td>
                        <td style="border-bottom: 1px solid #333;text-align: center;width: 57px;">部位</td>
                        <td style="border-bottom: 1px solid #333;text-align: center;width: 57px;">批次号</td>
                        <td style="border-bottom: 1px solid #333;text-align: center;width: 57px;">装箱号</td>
                    </tr>
                    <tr v-for="(item1, index1) in item" :key="index1 + 10000" style="height: 60px;">
                        <td style="border-bottom: 1px solid #333;text-align: center;width: 57px;">{{item1.name}}</td>
                        <td style="border-bottom: 1px solid #333;text-align: center;width: 66px;">{{item1.accountsTime}}</td>
                        <td style="border-bottom: 1px solid #333;text-align: center;width: 57px;">{{item1.weight}}</td>
                        <td style="border-bottom: 1px solid #333;text-align: center;width: 57px;">{{item1.price}}</td>
                        <td style="border-bottom: 1px solid #333;text-align: center;width: 57px;">{{item1.total}}</td>
                        <td style="border-bottom: 1px solid #333;text-align: center;width: 57px;">{{item1.position}}</td>
                        <td style="border-bottom: 1px solid #333;text-align: center;width: 57px;">{{item1.batchCode}}</td>
                        <td style="border-bottom: 1px solid #333;text-align: center;width: 57px;">{{item1.boxCode}}</td>
                    </tr>
                </tbody>
            </table>
            <div :style="{pageBreakAfter: index==result.length - 1? 'auto': 'always'}"></div>
        </div>
        <div class="all-count" style="height:35px;text-align:right;width:750px;margin:20px auto 0;padding-right:20px;">
            合计： <span id="total_count" style="color:#00ace9;font-size:18px;">{{total}}</span> kg <span id="other" style="color:rgb(0, 172, 233)"></span>
        </div>
        <div id="footer" style="background:#fff;padding: 60px 0;text-align:center;width: 100%;position: absolute;left: 50%;transform: translateX(-50%);">
            <div @click="handleBack" class="back" style="display:inline-block;width: 100px;border: 1px solid #333;border-radius: 8px;color: #666;text-align: center;line-height: 36px;margin-right: 10px;">关闭</div>
            <div @click="handlePrint" id="printBtn" style="display:inline-block;width: 130px;border: 1px solid #333;background: #00ace9;border-radius: 8px;color: #666;line-height: 36px;">
                <img style="cursor:pointer;width: 20px;height: 20px;margin-right: 12px;vertical-align: middle;" alt="print" src="@/assets/imgs/icon_print.png">
                <span style="color: #fff;cursor:pointer;">打印</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { getPrintInfo } from '@/service/getData'
    export default {
        data() {
            return {
                result: [], // 结构为 15个一组的 二维数组
                total: 0
            }
        },
        mounted: function() {
            this.getData();
        },
        methods: {
            async getData() {
                let ids = this.$route.params.ids;
                if(ids) ids = ids.split(',');
                let printType = this.$route.params.printType;
                let result = await getPrintInfo(ids, printType);
                result.data.total = this.total;
                let one = []
                result.data.list.forEach( (val, index) => {
                    one.push(val);
                    if( one.length < 15 ) {
                        if( result.data.list.length == index + 1 ) {
                            this.result.push(one);
                            one = [];
                        }
                    } else {
                        this.result.push(one);
                        one = [];
                    }
                });
            },
            handlePrint() {
                let dom = document.getElementById('footer');
                dom.style.display= 'none';
                window.print();
                dom.style.display= 'block';
            },
            handleBack() {
                this.$router.go(-1);
            }
        },
    }
</script>

<style lang="scss" scoped>
    #printBody {
        box-sizing: border-box;
        background: #fff;
        width: 100%;
        padding-top: 40px;
    }

</style>