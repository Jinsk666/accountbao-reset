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
                            <img src="@/assets/imgs/login_title.png" alt="">
                        </div>
                        <div class="right-text">
                            <img src="@/assets/imgs/login_text.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="login-phone">
                    <p class="login-label">手机号</p>
                    <input id="phone" type="text" v-model="phone" placeholder="请输入手机号"/>
                </div>
                <div class="login-phone">
                    <p class="login-label">密码</p>
                    <input id="password" type="password" v-model="password" placeholder="请输入密码" @keydown.enter="login" />
                </div>
                <button class="to-login" id="login_btn" @click="login">登录</button>
                <p class="backlogo"><router-link :to="{ name: 'login', query: { phone: this.phone } }">短信验证码登录</router-link>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<router-link :to="{ name: 'forget', query: { phone: this.phone } }">忘记密码？</router-link></p>
            </div>
            <img class="copyright" src="@/assets/imgs/icon_copyright.png"/>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex';
    import { accountLogin } from '@/service/getData';

    export default {
        data() {
            return {
                phone: this.$route.query.phone || '', // 手机号码
                password: '', // 密码
                userInfo:'', //记录用户信息
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
				}else if( this.password.trim() == '' ){
                    /*  提示 */
					this.$message.error( '请填写密码。' );
					return;
                }
				let res =  await accountLogin( this.phone, this.password );
				if( res.code == '0000' ){
					/* 成功将用户信息存入 vuex, 跳转首页  */
					this.RECORD_USERINFO( res.data );
					this.$router.push({ name: 'home' })
				}else{
					/*  提示 */
					this.$message.error( res.message );
				}
			}
        }
    }
</script>

<style lang='scss' scoped>
  @import '../../style/login';
</style>
