<template>
    <div class="forget">
        <div class="forget-logo"><img src="@/assets/imgs/forget-logo.png"/></div>
        <div class="forget-wrap">
            <div class="forget-wrap-auto">
                <div class="login-phone">
                    <p class="login-label">手机号</p>
                    <input id="phone" type="text" v-model="phone" placeholder="请输入手机号"/>
                </div>
                <div class="login-code">
                    <p class="login-label">验证码</p>
                    <input type="text" placeholder="请输入验证码" v-model="verify" id="code"/>
                    <input type="button" :class="{ right_phone: rightPhone }" v-show="!countdownTime" value="发送验证码" id="sendCode" @click="sendVerify" />
                    <input type="button" :value="`重新发送(${countdownTime})`" v-show="countdownTime"/>
                </div>
                <div class="login-phone">
                    <p class="login-label">新密码</p>
                    <input type="password" placeholder="请输入新密码" v-model="newPassword" id="newpass"/>
                </div>
                <div class="login-phone">
                    <p class="login-label">确认密码</p>
                    <input type="password" placeholder="请确认新密码" v-model="newPassword2" id="surenewpass" @keydown.enter="modifyPassword"/>
                </div>
                <button class="to-login" @click="modifyPassword">确定</button>
                <p class="backlogo"><router-link :to="{ name: 'accountLogin', query: {phone: this.phone} }">返回登录</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import { getVerify, getModifyPassword } from '@/service/getData';

    export default {
        data() {
            return {
                phone: this.$route.query.phone || '',
                verify: '',
                newPassword: '',
                newPassword2: '',
                countdownTime: 0
            }
        },
        computed: {
            //判断手机号码
            rightPhone: function (){
                return /^1\d{10}$/gi.test(this.phone);
           }
        },
        methods: {
            async modifyPassword(){
                /*  提示 */
                if (!this.rightPhone){
					this.$message.error( '请填写正确的手机号码。' );
					return;
				}else if(!(/^\d{4}$/gi.test(this.verify))){
					this.$message.error( '请填写正确的验证码。' );
					return;
				}else if(!this.newPassword){
                    this.$message.error( '请输入新密码。' );
                    return;
                }else if(!this.newPassword2){
                    this.$message.error( '请再次输入新密码。' );
                    return;
                }else if(this.newPassword != this.newPassword2){
                    this.$message.error( '两次输入的密码不一致。' );
                }
                let res = await getModifyPassword(this.phone, this.verify, this.newPassword, this.newPassword2);
                if( res.code == '0000' ){
                    /* 成功提示 1500ms 跳转密码登录界面  */
                    return new Promise((resolve, reject) => {
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        })
                        setTimeout(resolve, 1500);
                    }).then(function(){
                        this.$router.push({ name: 'accountLogin', query: { phone: this.phone } })
                    })
                }else{
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
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../style/login';

    .forget{
        position: relative;
        @include wh(100%, 100%);
        min-height:620px;
        background: #fff url(~@/assets/imgs/forget-bg.png) no-repeat;
        background-position:bottom;
        background-size:100% auto;
    }
    .forget-wrap{
        background:#ffffff;
        border:1px solid #f1f1f1;
        box-shadow:0 10px 12px 0 rgba(0,0,0,0.07);
        @include wh(510px, 540px);
        @include center();
    }
    .forget-logo{
        padding: 20px;
    }
    .forget-wrap-auto{
        width: 332px;margin: auto;
    }
    .backlogo{
        text-align: center;
        font-weight: bold;
        font-size:16px;
        margin-top: 20px;
    }
    .backlogo a{
        color: #333;
    }
    .login-code input[type=button]{
        @include wh(98px, 40px);
        margin-left: 8px;
        background: #e5e5e5;
        border: 1px solid #dedede;
        border-radius: 8px;
        font-size: 14px;
        padding: 0;
    }
</style>