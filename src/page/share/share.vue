<template>
    <div class="container" id="result_share">
        <header>
            <div class="right-triangle"></div>
            <img class="triangle" src="@/assets/imgs/icon_triangle.png" alt="triangle">
            <div class="logo">
                <img src="@/assets/imgs/icon_logo.png" alt="logo">
            </div>
            <span class="icon-cicle cicle-left"></span>
            <span class="icon-cicle cicle-bottom"></span>
        </header>
        <div class="bill-list" v-for="(item, index) in content" :key="index">
		  <span class="icon-cicle cicle-top"></span><span class="icon-cicle cicle-right"></span>
          <img class="connect connect-left" src="@/assets/imgs/icon_connect.png" alt="connect">
          <img class="connect connect-right" src="@/assets/imgs/icon_connect.png" alt="connect">
          <div class="bill-title">记账单{{index}}</div>
          <div class="cutting-line">---------- ***************** ----------</div>
          <div class="bill-top">
              <div class="bill-line" v-if="item.name">
                  <p>品名：</p>
                  <p>{{item.name}}</p>
              </div>
              <div class="bill-line" v-if="item.weight">
                  <p>数量：</p>
                  <p>{{item.weight}}{{item.unitName}}</p>
              </div>
              <div class="bill-line" v-if="item.accountsTime">
                  <p>记账时间：</p>
                  <p>{{item.accountsTime}}</p>
              </div>
              <div class="bill-line" v-if="item.price">
                  <p>单价：</p>
                  <p>{{item.price}}</p>
              </div>
              <div class="bill-line" v-if="item.total">
                  <p>总价：</p>
                  <p>{{item.total}}</p>
              </div>
              <div class="bill-line" v-if="item.position">
                  <p>部位：</p>
                  <p>{{item.position}}</p>
              </div>
              <div class="bill-line" v-if="item.batchCode">
                  <p>批次号：</p>
                  <p>{{item.batchCode}}</p>
              </div>
              <div class="bill-line" v-if="item.boxCode">
                  <p>装箱号：</p>
                  <p>{{item.boxCode}}</p>
              </div>
              <div class="bill-line" v-if="item.scenes">
                  <p>场景：</p>
                  <p>{{item.scenes}}</p>
              </div>
              <div class="bill-line" v-if="item.source">
                  <p>数据来源：</p>
                  <p>{{item.source}}</p>
              </div>
          </div><span class="icon-cicle cicle-left"></span><span class="icon-cicle cicle-bottom"></span>
      </div>
    </div>
</template>

<script>
    import { getParams } from '@/config/untils'
    import { getPrintInfo } from '@/service/getData'
    export default {
        data() {
            return {
                result: '',
				content: '',
				fontSize: 16
            }
        },
        mounted: function() {
			this.fontSize = document.documentElement.style.fontSize;
            this.rem();
            window.onresize = () => {
                this.rem();
            }
            this.getData();
        },
        methods: {
            rem() {
                try{
                    var rem = document.documentElement.clientWidth / 7.5;
                    document.documentElement.style.fontSize = rem + 'px';
                    if (document.documentElement.clientWidth >= 750) {
                        document.documentElement.clientWidth = 750;
                        document.documentElement.style.fontSize = 100 + 'px';
                    }
                    if (document.documentElement.clientWidth <= 320) {
                        document.documentElement.clientWidth = 320;
                        document.documentElement.style.fontSize = 320 / 7.5 + 'px';
                    }
                }catch(e){

                }
            },
            async getData() {
				let obj = getParams(window.location.hash.split('?')[1]);
				if(obj.ids) obj.ids = obj.ids.split(',')
                this.result = await getPrintInfo(obj.ids, obj.userInfoId, '/farmeasy-accountsbao-service');
                this.content = this.result.data.list;
            }
        },
        destroyed() {
			window.onresize = null;
			document.documentElement.style.fontSize = this.fontSize;
        }
    }
</script>

<style lang="scss">
#result_share{
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background: #ffda44;
  padding: 0.24rem 0.36rem;
  font-size: 0.28rem;
  color: #666;
  overflow-y: auto; 

header {
  width: 100%;
  height: 1.34rem;
  background: #fff;
  border-radius: 8px;
  padding-top: 0.24rem;
  padding-left: 0.3rem;
  position: relative; }

.right-triangle {
  width: 0;
  height: 0;
  border-top: 0.5rem solid #ffda44;
  border-left: 0.9rem solid transparent;
  position: absolute;
  right: 0;
  top: 0; }

.triangle {
  width: 0.9rem;
  height: 0.5rem;
  vertical-align: middle;
  position: absolute;
  right: 0;
  top: 0; }

.logo {
  width: 3.04rem;
  height: 0.74rem; }
  .logo img {
    width: 100%;
    height: 100%; }

.icon-cicle {
  position: absolute;
  width: 0.14rem;
  height: 0.14rem;
  border-radius: 100%;
  background: #ffda44; }

.cicle-top {
  left: 0.3rem;
  top: 0.1rem; }

.cicle-right {
  right: 0.3rem;
  top: 0.1rem; }

.cicle-bottom {
  right: 0.3rem;
  bottom: 0.1rem; }

.cicle-left {
  left: 0.3rem;
  bottom: 0.1rem; }

.bill-list {
  padding: 0.5rem 0.3rem;
  background: #fff;
  border-radius: 8px;
  margin-top: 0.1rem;
  position: relative; }
  .bill-list .connect {
    width: 0.06rem;
    height: 0.44rem;
    position: absolute; }
  .bill-list .connect-left {
    left: 0.34rem;
    top: -0.27rem; }
  .bill-list .connect-right {
    right: 0.34rem;
    top: -0.27rem; }
  .bill-list .bill-title {
    font-size: 0.36rem;
    text-align: center;
    line-height: 0.5rem; }
  .bill-list .cutting-line {
    text-align: center;
    line-height: 0.54rem; }
  .bill-list .bill-top, .bill-list .bill-bottom {
    border: 1px solid #ccc;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    line-height: 0.8rem; }
    .bill-list .bill-top .bill-line, .bill-list .bill-bottom .bill-line {
      display: flex; }
    .bill-list .bill-top .bill-line p:last-child, .bill-list .bill-bottom .bill-line p:last-child {
      flex: 1;
      text-align: right; }
  .bill-list .bill-bottom {
    border-top: 0; }

.bill-list:last-child .cicle-bottom, .bill-list:last-child .cicle-left {
  display: none; }

}

/*# sourceMappingURL=index.css.map */

</style>