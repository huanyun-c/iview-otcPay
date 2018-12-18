<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div>
                <Form 
                    ref="userForm"
                    :model="userForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >
                    <!--<FormItem label="用户姓名：" prop="name">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.name" ></Input>
                        </div>
                    </FormItem>-->
                    <!--<FormItem label="用户手机：" prop="cellphone" >
                        <div style="display:inline-block;width:204px;">
                            <Input v-model="userForm.cellphone" @on-keydown="hasChangePhone"></Input>
                        </div>
                        <div style="display:inline-block;position:relative;">
                            <Button @click="getIdentifyCode" :disabled="canGetIdentifyCode">{{ gettingIdentifyCodeBtnContent }}</Button>
                            <div class="own-space-input-identifycode-con" v-if="inputCodeVisible">
                                <div style="background-color:white;z-index:110;margin:10px;">
                                    <Input v-model="securityCode" placeholder="请填写短信验证码" ></Input>
                                    <div style="margin-top:10px;text-align:right">
                                        <Button type="ghost" @click="cancelInputCodeBox">取消</Button>
                                        <Button type="primary" @click="submitCode" :loading="checkIdentifyCodeLoading">确定</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FormItem>-->
                    <FormItem label="用户ID：">
                        <span>{{ userForm.userId }}</span>
                    </FormItem>
                    <FormItem label="用户手机号：">
                        <span>{{ initPhone }}</span>
                    </FormItem>
                    <FormItem label="用户类型：">
                        <span>{{ userForm.type }}</span>
                    </FormItem>
                    <FormItem label="用户状态：">
                        <span>{{ userForm.status }}</span>
                    </FormItem>
                    <FormItem label="登录密码：">
                        <Button type="text" size="small" @click="showEditPassword">修改密码</Button>
                    </FormItem>
                    <div>
                        <Button type="text" style="width: 100px;" @click="cancelEditUserInfor">取消</Button>
                        <!--<Button type="primary" style="width: 100px;" :loading="save_loading" @click="saveEdit">保存</Button>-->
                    </div>
                </Form>
            </div>
        </Card>
        <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500">
            <h3 slot="header" style="color:#2D8CF0">修改密码</h3>
            <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
                <!--<FormItem label="原密码" prop="oldPass" :error="oldPassError">
                    <Input v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码" ></Input>
                </FormItem>-->
                <FormItem label="用户手机" prop="cellphone" >
                    <div style="display:inline-block;width:204px;">
                        <Input v-model="editPasswordForm.cellphone" @on-keydown="hasChangePhone"></Input>
                    </div>
                    <div style="display:inline-block;position:relative;">
                        <Button @click="getIdentifyCode" :disabled="canGetIdentifyCode">{{ gettingIdentifyCodeBtnContent }}</Button>
                        <!--<div class="own-space-input-identifycode-con" v-if="inputCodeVisible">
                            <div style="background-color:white;z-index:110;margin:10px;">
                                <Input v-model="securityCode" placeholder="请填写短信验证码" ></Input>
                                <div style="margin-top:10px;text-align:right">
                                    <Button type="ghost" @click="cancelInputCodeBox">取消</Button>
                                    <Button type="primary" @click="submitCode" :loading="checkIdentifyCodeLoading">确定</Button>
                                </div>
                            </div>
                        </div>-->
                        
                    </div>
                </FormItem>
                <FormItem label="短信验证码" prop="securityCode">
                    <Input v-model="editPasswordForm.securityCode" placeholder="请输入短信验证码" ></Input>
                </FormItem>
                <FormItem label="新密码" prop="newPass">
                    <Input v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符" ></Input>
                </FormItem>
                <FormItem label="确认新密码" prop="rePass">
                    <Input v-model="editPasswordForm.rePass" placeholder="请再次输入新密码" ></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelEditPass">取消</Button>
                <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'ownspace_index',
    data () {
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };
        const valideRePassword = (rule, value, callback) => {
            if (value !== this.editPasswordForm.newPass) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        return {
            userForm: {
                name: '',
                cellphone: '',
                company: '',
                department: '',
                type:'',
                status:''
            },
            uid: '', // 登录用户的userId
            securityCode: '', // 验证码
            phoneHasChanged: false, // 是否编辑了手机
            save_loading: false,
            identifyError: '', // 验证码错误
            editPasswordModal: false, // 修改密码模态框显示
            savePassLoading: false,
            oldPassError: '',
            identifyCodeRight: false, // 验证码是否正确
            hasGetIdentifyCode: false, // 是否点了获取验证码
            canGetIdentifyCode: false, // 是否可点获取验证码
            checkIdentifyCodeLoading: false,
            inforValidate: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                cellphone: [
                    { required: true, message: '请输入手机号码' },
                    { validator: validePhone }
                ]
            },
            editPasswordForm: {
                cellphone: '',
                newPass: '',
                rePass: '',
                securityCode:''
            },
            passwordValidate: {
            	cellphone: [
                    { required: true, message: '请输入手机号码' },
                    { validator: validePhone }
                ],
                securityCode:[
                	{ required: true, message: '请输入短信验证码', trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
                    { max: 32, message: '最多输入32个字符', trigger: 'blur' }
                ],
                rePass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: valideRePassword, trigger: 'blur' }
                ]
            },
            inputCodeVisible: false, // 显示填写验证码box
            initPhone: '',
            gettingIdentifyCodeBtnContent: '获取验证码' // “获取验证码”按钮的文字
        };
    },
    methods: {
        getIdentifyCode () {
            this.hasGetIdentifyCode = true;
            if (this.editPasswordForm.cellphone !="" && this.editPasswordForm.cellphone == this.initPhone) {
                    this.canGetIdentifyCode = true;
                    let timeLast = 60;
                    let timer = setInterval(() => {
                        if (timeLast >= 0) {
                            this.gettingIdentifyCodeBtnContent = timeLast + '秒后重试';
                            timeLast -= 1;
                        } else {
                            clearInterval(timer);
                            this.gettingIdentifyCodeBtnContent = '获取验证码';
                            this.canGetIdentifyCode = false;
                        }
                    }, 1000);
                    this.inputCodeVisible = true;

                    //TODO:获取短信验证码
                    this.$api.post('/ContactsImprove/api/sendValidSMS', {
								phoneNumber:this.editPasswordForm.cellphone							
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
            
        },
        showEditPassword () {
            this.editPasswordModal = true;
        },
        cancelEditUserInfor () {
            this.$store.commit('removeTag', 'ownspace_index');
            localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList);
            let lastPageName = '';
            if (this.$store.state.app.pageOpenedList.length > 1) {
                lastPageName = this.$store.state.app.pageOpenedList[1].name;
            } else {
                lastPageName = this.$store.state.app.pageOpenedList[0].name;
            }
            this.$router.push({
                name: lastPageName
            });
        },
        saveEdit () {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    if (this.phoneHasChanged && this.userForm.cellphone !== this.initPhone) { // 手机号码修改过了而且修改之后的手机号和原来的不一样
                        if (this.hasGetIdentifyCode) { // 判断是否点了获取验证码
                            if (this.identifyCodeRight) { // 判断验证码是否正确
                                this.saveInfoAjax();
                            } else {
                                this.$Message.error('验证码错误，请重新输入');
                            }
                        } else {
                            this.$Message.warning('请先点击获取验证码');
                        }
                    } else {
                        this.saveInfoAjax();
                    }
                }
            });
        },
        cancelEditPass () {
            this.editPasswordModal = false;
        },
        saveEditPass () {
            this.$refs['editPasswordForm'].validate((valid) => {
                if (valid) {
                    this.savePassLoading = true;

                    this.$api.post('/ContactsImprove/api/modifyPwd', {
						newPwd:this.editPasswordForm.newPass,
						smsCode:this.editPasswordForm.securityCode
					}, response => {
						this.savePassLoading = false;
						if(response.status >= 200 && response.status < 300) {					
							if(response.data.code == 200){
																
								this.$Message.success('修改成功');
								//退出重新登录
								this.$store.commit('logout', this);
			                    this.$store.commit('clearOpenedSubmenu');
			                    this.$router.push({
			                        name: 'login'
			                    });
							}else if(response.data.code == 312){
								this.$store.commit('logout', this);
			                    this.$store.commit('clearOpenedSubmenu');
			                    this.$router.push({
			                        name: 'login'
			                    });
							}else {
								this.$Message.error(response.data.msg);
							}
						}	
					});
                }
            });
        },
        init () {
        	//获取用户信息
        	this.$api.post('/ContactsImprove/api/userCenter', {
				
			}, response => {
				
				if(response.status >= 200 && response.status < 300) {					
					if(response.data.code == 200){
						
						const data = response.data;
						console.log(data)
						this.userForm.name = data.data.userName;
						this.userForm.userId = data.data.userId;
			            this.initPhone = data.data.phoneNumber;
			            this.editPasswordForm.cellphone = this.initPhone;
			            this.userForm.type = data.data.type == '1' ? '平台商户' : '币商';
			            this.userForm.status = data.data.status == '1' ? '可用' : '冻结';

						this.$Message.success('查询成功');
					}else if(response.data.code == 312){

						this.$store.commit('logout', this);
	                    this.$store.commit('clearOpenedSubmenu');
	                    this.$router.push({
	                        name: 'login'
	                    });
					}else {
						this.$Message.error(response.data.msg);							
					}
				}	
			});
            
        },
        cancelInputCodeBox () {
            this.inputCodeVisible = false;
            this.userForm.cellphone = this.initPhone;
        },
        submitCode () {
            let vm = this;
            vm.checkIdentifyCodeLoading = true;
            if (this.securityCode.length === 0) {
                this.$Message.error('请填写短信验证码');
            } else {
                setTimeout(() => {
                    this.$Message.success('验证码正确');
                    this.inputCodeVisible = false;
                    this.checkIdentifyCodeLoading = false;
                }, 1000);
            }
        },
        hasChangePhone () {
            this.phoneHasChanged = true;
            this.hasGetIdentifyCode = false;
            this.identifyCodeRight = false;
        },
        saveInfoAjax () {
            this.save_loading = true;
            setTimeout(() => {
                this.$Message.success('保存成功');
                this.save_loading = false;
            }, 1000);
        }
    },
    mounted () {
        this.init();
    }
};
</script>
