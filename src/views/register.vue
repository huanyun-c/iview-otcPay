<style lang="less">
	@import './login.less';
	@import "../styles/common.less";
</style>

<template>
	<div class="login" @keydown.enter="handleSubmit">
		<div class="login-con">
			<Card :bordered="false">
				<p slot="title">
					<Icon type="log-in"></Icon>
					注册成为平台用户
				</p>
				<div class="form-con">
					<Form ref="loginForm" :model="form" :rules="rules">
						<FormItem prop="userName">
							<Input v-model="form.userName" placeholder="请输入手机号">
							<span slot="prepend">
                                    <Icon :size="16" type="ios-person"></Icon>
                                </span>
							<i-button slot="append" @click="getMsgCode" type="primary" :disabled="disabled">{{form.codemsg}}</i-button>
							</Input>
						</FormItem>
						<FormItem prop="password">
							<Input v-model="form.password" placeholder="请输入密码">
							<span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
							</Input>
						</FormItem>
						<FormItem prop="msgCode">
							<Input v-model="form.msgCode" placeholder="请输入验证码">
							<span slot="prepend">
                                    <Icon :size="14" type="ios-email"></Icon>
                                </span>
							</Input>
						</FormItem>
						<FormItem>
							<i-button @click="handleSubmit(shoper)" type="primary" long>注册成为商户</i-button>
							<i-button @click="handleSubmit(bier)" type="warning" long class="margin-top-10">注册成为币商</i-button>
						</FormItem>
						<FormItem style="text-align: right;">
							<a href="/dist/index.html#/login" style="padding-left:20px;">
								前往登陆
								<Icon :size="14" type="arrow-right-c"></Icon>
							</a>
						</FormItem>

					</Form>
				</div>
				<p style="font-size:12px;">
					温馨提示：USDT、BTC等数字货币具有一定的风险，极速加密数字货币支付仅为C2C承兑通道提供服务，对数字货币的投资价值、交易汇率的变动影响等不可控因素，不承担任何审查、担保、赔偿的责任！
				</p>
			</Card>
		</div>
	</div>
</template>
<!--iview_admin-->
<script>
	import Cookies from 'js-cookie';
	import Util from '../libs/util';
	export default {
		data() {
			//验证手机号
			var PhonePass = (rule, value, callback) => {
				var myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
				if(value === '') {
					callback(new Error('请输入手机号'));
				} else if(!myreg.test(value)) {
					callback(new Error('请输入正确的手机号'));
				} else {
					callback();
				}
			};
			return {
				shoper:'1',
				bier:'2',
				count: 60,
				disabled: false,
				form: {
					userName: '',
					password: '',
					msgCode: '',
					codemsg: "获取验证码"
				},
				rules: {
					userName: [{
						required: true,
						validator: PhonePass,
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					}],
					msgCode: [{
						required: true,
						message: '验证码不能为空',
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			handleSubmit(type) {				
				this.$refs.loginForm.validate((valid) => {
					if(valid) {
						//TODO:调用注册的接口
						this.$api.post('/ContactsImprove/api/register', {
								phoneNumber:this.form.userName,
								password:this.form.password,
								type:type,
								smsCode:this.form.msgCode
						}, response => {
							
							if(response.status >= 200 && response.status < 300) {					
								if(response.data.code == 200){
										this.$router.push({
											name: 'login'
										});
								}else {
									this.$Message.error(response.data.msg);
								}
							}	
						});
						

//						Cookies.set('user', this.form.userName);
//						Cookies.set('password', this.form.password);
//						this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
//						if(this.form.userName === 'iview_admin') {
//							Cookies.set('access', 0);
//						} else {
//							Cookies.set('access', 1);
//						}
//						this.$router.push({
//							name: 'home_index'
//						});
					}
				});
			},
			getMsgCode() {
				let that = this;
				//先验证手机号
				if(that.form.userName == ''){
					//弹窗提示
					this.$Message.info('请输入手机号');
					
					return false;					
				}
				var myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
				if(!myreg.test(that.form.userName)){
					//弹窗提示
					this.$Message.info('请输入正确的手机号');
					return false;					
					
				}
				//禁止点击
				that.disabled = true;
				//倒计时
				let timer = setInterval(function() {
					--that.count;
					that.form.codemsg = that.count + '秒后重试';

					if(that.count == 0) {
						that.count = 60;
						that.disabled = false;
						that.form.codemsg = '获取验证码';
						clearInterval(timer);
					}

				}, 1000)

				//TODO:发送验证码
				this.$api.post('/ContactsImprove/api/sendValidSMS', {
								phoneNumber:this.form.userName								
						}, response => {
							
							if(response.status >= 200 && response.status < 300) {					
								if(response.data.code == 200){										
									this.$Message.success(response.data.msg);	
								}else {
									this.$Message.error(response.data.msg);
								}
							}	
						});
					
			}
		}
	};
</script>
