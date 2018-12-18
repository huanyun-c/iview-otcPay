<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    	欢迎平台商户
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                        <FormItem style="text-align: right;">
                        	<!--<a href="#">忘记密码</a>-->
                        	<a href="/dist/index.html#/register" style="padding-left:20px;">
                        		商户注册
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
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {

            this.$refs.loginForm.validate((valid) => {
                if (valid) {
					//TODO:调用登录的接口
					this.$api.post('/ContactsImprove/api/login', {
								phoneNumber:this.form.userName,
								password:this.form.password								
						}, response => {
							
							if(response.status >= 200 && response.status < 300) {	
								console.log(response)
								if(response.data.code == 200){

									Cookies.set('user', this.form.userName);
									Cookies.set('userid', response.data.data.userId);
									this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
									//存用户的id
									//this.$store.commit('getmerchantUserId',response.data.data.userId);
									console.log(response.data.data.type)
									if (response.data.data.type === 1) {
				                        Cookies.set('access',1);
				                        //调用store的方法改变全局的变量
				                       // this.$store.commit('getaccess',1);
				                    } else if((response.data.data.type === 0)) {
				                        Cookies.set('access',0);
				                        //this.$store.commit('getaccess',2);
				                    }else {
				                    	Cookies.set('access',2);
				                    }
				                    				                    
			                    	this.$router.push({
										name: 'home_index'
									});

				                    
								}else {
									this.$Message.error(response.data.msg);
								}
							}	
						});
                }
            });
        }
    }
};
</script>

<style>

</style>
