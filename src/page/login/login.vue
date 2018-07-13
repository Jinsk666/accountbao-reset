<template>
    <div class="login">
        <div class="login-side">
            <img class="side-img" src="@/assets/imgs/icon_side.jpg" alt="side"/>
            <img class="side-icon" src="@/assets/imgs/icon_sign.png" alt="icon"/>
        </div>
        <div class="login-content">
            <div class="login-detail">
                <div class="login-title">
                    <div class="login-left">
                        <img class="left-img" src="@/assets/imgs/icon_sign.png" alt="icon"/>
                    </div>
                    <div class="login-right">
                        <div class="right-title">
                            <img src="@/assets/imgs/login_title.png" alt=""/>
                        </div>
                        <div class="right-text">
                            <img src="@/assets/imgs/login_text.png" alt=""/>
                        </div>
                    </div>
                </div>
                <div class="login-phone">
                    <p class="login-label">手机号</p>
                    <input id="phone" type="text" v-model="phone" placeholder="请输入手机号"/>
                </div>
                <div class="login-code">
                    <p class="login-label">验证码</p>
                    <input id="password" type="text" v-model="verify" placeholder="请输入验证码"/>
                    <button id="send_sms_code" :class="{ right_phone: rightPhone }" v-show="!countdownTime" @click="sendVerify" @keydown.enter="login">发送验证码</button>
                    <button v-show="countdownTime">{{countdownTime}}秒重新发送</button>
                </div>
                <button class="to-login" id="login_btn" @click="login">登录</button>
                <p class="backlogo"><router-link :to="{ name: 'accountLogin', query: {phone: this.phone} }">账号密码登录</router-link></p>
            </div>
            <img class="copyright" src="@/assets/imgs/icon_copyright.png"/>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
	import { getVerify, mobileLogin } from '@/service/getData';

    export default {
        data() {
            return {
                phone: this.$route.query.phone || '', // 手机号码
                verify: '', // 验证码
				countdownTime: 0, // 发送验证时倒计时
				userInfo:'', // 获取用户信息
            }
        },
        computed: {
          //判断手机号码
            rightPhone: function (){
                return /^1\d{10}$/gi.test(this.phone);
            }
        },
        methods: {
			...mapMutations([
                'RECORD_USERINFO',
            ]),
			/* 登陆请求  */
            async login(){
				if (!this.rightPhone){
					/*  提示 */
					this.$message.error( '请填写正确的手机号码。' );
					return;
				}else if(!(/^\d{4}$/gi.test(this.verify))){
					/*  提示 */
					this.$message.error( '请填写正确的验证码' );
					return;
				}
				let res =  await mobileLogin( this.phone, this.verify );
				if( res.code == '0000' ){
					/* 成功将用户信息存入 vuex, 跳转首页  */
					this.RECORD_USERINFO( res.data );
					this.$router.push({ name: 'home' })
				}else{
					/*  提示 */
					this.$message.error( res.message );
				}
			},
			/* 验证码请求 */
            async sendVerify(){
				if( this.rightPhone ){
					/* 验证码读秒 */
					this.countdownTime = 60;
					this.timer = setInterval(() => {
						this.countdownTime --;
						if( this.countdownTime == 0 ){
							clearInterval( this.timer );
							this.timer = null;
						}
					},1000)
					let res = await getVerify( this.phone );
					if( res.code == '0000' ){
						
					}else{
						/*  提示 */
						this.$message.error( res.message );
					}
				}else{
					/*  提示 */
					this.$message.error('请填写正确的手机号码。');
				}
            }
        }
    }
</script>

<style lang='scss' scoped>
  @import '../../style/login';
</style>
