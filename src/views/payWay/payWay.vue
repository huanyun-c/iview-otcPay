
<style lang='less'>
	@import "../../styles/common.less";
	.i-form-box {
		display: flex;
		flex-wrap:wrap;
	}
	.i-form-box-1 {
		width:50%;
	}
	.form {		
		min-width: 250px;
		max-width:30%;
		margin:auto;
	}
	.uploadBox {
		display: flex;
		width:100%;
		padding:10px 0;
	}
	.ivu-upload {
		width:250px;
		height:250px;	
		margin:auto;	
		margin-top:25px;
		position: relative;		
	}
	.colorGreen {
		color:green;
		font-weight: 700;
	}
	.demo-upload {
		width:250px;		
		margin:auto;
		margin-top:20px;
	}
	.demo-upload-list{
        display:inline-block;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
        position: absolute;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    width: 100%;
	    height: 100%;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
</style>
<template>
	<div>
		<Card>
			<p slot="title">微信收款二维码*（最多能上传3个收款二维码）</p>
			
			<p v-if='datawx.length == 0'>您没有收款二维码，<i-button type="primary" @click="showWx(wx)">点击上传</i-button></p>
			<div v-else>
				<i-table border :content="self" :columns="columnswx" :data="datawx"></i-table>				
				<p class="margin-top-10" v-if='datawx.length < 3'>您还能上传{{3 - datawx.length}}张收款二维码，<i-button type="primary" @click="showWx(wx)">点击上传</i-button></p>
			</div>
		</Card>
		<Card class="margin-top-10">
			<p slot="title">支付宝收款二维码*（最多能上传3个收款二维码）</p>
			<p v-if='datazfb.length == 0'>您没有收款二维码，<i-button type="primary" @click="showWx(zfb)">点击上传</i-button></p>
			<div v-else>
				<i-table border :content="self" :columns="columnszfb" :data="datazfb"></i-table>				
				<p class="margin-top-10" v-if='datazfb.length < 3'>您还能上传{{3 - datazfb.length}}张收款二维码，<i-button type="primary" @click="showWx(zfb)">点击上传</i-button></p>
			</div>
		</Card>
		<Card class="margin-top-10 margin-bottom-100">
			<p slot="title">银行卡号*（最多能上传3张银行卡号）</p>
			<p v-if='databank.length == 0'>您没有收款银行卡，<i-button type="primary" @click="showbank">点击上传</i-button></p>
			<div v-else>
				<i-table border :content="self" :columns="columnsbank" :data="databank"></i-table>				
				<p class="margin-top-10" v-if='databank.length < 3'>您还能上传{{3 - databank.length}}张收款银行卡，<i-button type="primary" @click="showbank">点击上传</i-button></p>
			</div>
		</Card>
		
		<!--微信支付宝模态框@on-ok="submitwx"-->
		<Modal v-model="modal1" :title="modalTitle" ok-text="完成" @on-ok="submitwx">
			<Card style="padding-bottom:100px;">
				<Row>
					<i-form ref='formCustom' :model="formCustom" :rules="ruleCustom" :label-width="90">
						<Form-item v-if="isWx" :label="label" prop="wxKey" class="form">							
				            <i-input  type="text" v-model="formCustom.wxKey"></i-input>				            
				        </Form-item>
						<Form-item v-else :label="label" prop="zfbKey" class="form">											          
				            <i-input type="text" v-model="formCustom.zfbKey"></i-input>
				        </Form-item>

						<Form-item  label="真实姓名" prop="trueName" class="form" style="margin-top:10px;">											          
				            <i-input type="text" v-model="formCustom.trueName"></i-input>
				        </Form-item>
				        <Upload
				        	ref='upload'
				        	:show-upload-list="false"				        	
				        	:on-success="handleSuccess"
				        	:before-upload="handleBeforeUpload"
				        	:on-format-error="handleFormatError"
				        	:on-exceeded-size="handleMaxSize"
				        	accept="image/*"
				        	:format="['jpg','jpeg','png']"
				        	:max-size="2048"
					        type="drag"
					        multiple
					        :data='msgData'
					        name='paymentQR'
					        action="http://192.168.1.254:8080/ContactsImprove/api/addPayment">
					        <div style="padding: 80px 0">
					            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
					            <p>点击或将二维码拖拽到这里上传</p>
					        </div>
					        <div class="demo-upload-list" v-if="MyImg">
					        <template >
					            <img :src="MyImg" style="">				            
					        </template>
					        <!--<template v-else>
					            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
					        </template>-->
					    </div>
					    </Upload>
					    
					</i-form>
<!--					<div class="demo-upload">-->
						
					<!--</div>-->
					
				</Row>				
			</Card>
		</Modal>
		<!--银行卡模态框-->
		<Modal v-model="modal2" title="上传银行卡相关信息" ok-text="确定提交" @on-ok="submitBank">
			<Card>
				<Row>
					<i-form ref='formCustom' :model="formCustom" :rules="ruleCustom" :label-width="80">
						<Form-item label="银行卡" prop="cardId" class="form">
				            <i-input type="text" v-model="formCustom.cardId"></i-input>
				        </Form-item>
				        <Form-item label="开户人" prop="cardName" class="form">
				            <i-input type="text" v-model="formCustom.cardName"></i-input>
				        </Form-item>
				        <Form-item label="开户行" prop="cardBank" class="form">
				            <i-input type="text" v-model="formCustom.cardBank"></i-input>
				        </Form-item>
					</i-form>
				</Row>				
			</Card>
			
		</Modal>
	</div>
</template>

<script>
	import axios from 'axios';
	import util from '../../libs/util.js';
	export default {
		inject:['reload'],
		name:'payWay',
        data () {           
            const validatorCardId = (rule, value, callback) => {
            	var pattern = /^([1-9]{1})(\d{14}|\d{18})$/;  
            	if (value === '') {
                    callback(new Error('请输入银行卡号'));
                }else if(!pattern.test(value)){
                	callback(new Error('请输入正确的银行卡'));
                }else {
                	callback();
                }
            };
            return {
            	defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
                        'status':'finished'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar',
                        'status':'finished'
                    }
                ],
                formCustom: { 
                    wxKey:'',
                    zfbKey:'',
                    cardId: '',  
                    cardName:'',
                    cardBank:'',
                    trueName:''
                },
                ruleCustom: {
                    wxKey:[{
                    	required: true,
						message: '账号不能为空',
						trigger: 'blur'
                    }],
                    zfbKey:[{
                    	required: true,
						message: '账号不能为空',
						trigger: 'blur'
                    }],
                    trueName:[{
                    	required: true,
						message: '真实姓名不能为空',
						trigger: 'blur'
                    }],
                    cardId:[{
                    	required: true,
                    	validator:validatorCardId,						
						trigger: 'blur'
                    }],
                    cardName:[{
                    	required: true,
						message: '开户人不能为空',
						trigger: 'blur'
                    }],
                    cardBank:[{
                    	required: true,
						message: '开户行不能为空',
						trigger: 'blur'
                    }]
                  
                },
                wx:'1',
                zfb:'2',
                bank:'3',
                isWx:true,
                modalTitle:'上传微信二维码',
                label:"微信账号",
                modal1: false,
                modal2:false,
                self: this,
                msgData:{},
                uploadData:new FormData(),
                MyImg:'',
                columnswx: [
                    {
                        title: '微信账号',
                        key: 'name'
                        
                    },
                    {
                        title: '实名',
                        key: 'userName'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '创建时间',
                        key: 'time'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										margin: '5px'
									},
									on: {
										click: () => {
											this.show(params.index)
										}
									}
								}, '查看二维码'),
								h('Button', {
									props: {
										type: 'warning',
										size: 'small'
									},
									style: {
										margin: '5px'
									},
									on: {
										click: () => {
											this.setTrue(this.wx,params.index)
										}
									}
								}, '设为收款号'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									style: {
										margin: '5px'
									},
									on: {
										click: () => {
											this.deleteWx(this.wx,params.index)
										}
									}
								}, '删除')

							]);
						}                       
                    }
                ],
                datawx: [
                ],
                columnszfb: [
                    {
                        title: '支付宝账号',
                        key: 'name'
                        
                    },
                    {
                        title: '实名',
                        key: 'userName'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '创建时间',
                        key: 'time'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										margin: '5px'
									},
									on: {
										click: () => {
											this.show(params.index)
										}
									}
								}, '查看二维码'),
								h('Button', {
									props: {
										type: 'warning',
										size: 'small'
									},
									style: {
										margin: '5px'
									},
									on: {
										click: () => {
											this.setTrue(this.zfb,params.index)
										}
									}
								}, '设为收款号'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									style: {
										margin: '5px'
									},
									on: {
										click: () => {
											this.deleteWx(this.zfb,params.index)
										}
									}
								}, '删除')

							]);
						}                       
                    }
                ],
                datazfb: [                    
                ],
                columnsbank: [
                    {
                        title: '银行卡号',
                        key: 'cardId'
                        
                    },
                    {
                        title: '开户人',
                        key: 'name'
                        
                    },
                    {
                        title: '开户行',
                        key: 'bank'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '创建时间',
                        key: 'time'
                    },                    
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
							return h('div', [							
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										margin: '5px'
									},
									on: {
										click: () => {
											this.setTrue(this.bank,params.index)
										}
									}
								}, '设为收款号'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									style: {
										margin: '5px'
									},
									on: {
										click: () => {
											this.deleteWx(this.bank,params.index)
										}
									}
								}, '删除')

							]);
						}                       
                    }
                ],
                databank: [
                ]
            }
        },
         computed: {
            uploadList () {
            	
                return this.$refs.upload ? this.$refs.upload.fileList : [];
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            showWx(type){            	
            	if(type == '1'){
            		this.modalTitle = '上传微信二维码';
            		this.label = '微信账号';
            		this.isWx = true;
            	}else if(type == '2'){
            		this.modalTitle = '上传支付宝二维码';
            		this.label = '支付宝账号';
            		this.isWx = false;
            	}
            	
            	this.modal1 = true;
            },
            showbank(){
            	this.modal2 = true;
            },
            show(index){
            	const content = `<img src="${this.datawx[index].img}" style="width:250px;height:250px;">`
            	this.$Modal.info({
					title: '收款二维码',
					content: content
				})
            },
            setTrue(type,index){
            	console.log(type)
            	if(type == '1'){
            		//微信
            		this.setpaymentDefault(this.datawx[index].paymentId);
            	}else if(type == '2'){
            		//支付宝
            		this.setpaymentDefault(this.datazfb[index].paymentId);
            	}else if(type == '3'){
            		//银行卡
            		this.setpaymentDefault(this.databank[index].paymentId)
            	}
            },
            //设置收款账号
            setpaymentDefault(index){
              	this.$api.post('/ContactsImprove/api/setPaymentDefault', {
					paymentId:index
				}, response => {
					
					if(response.status >= 200 && response.status < 300) {					
						if(response.data.code == 200){
							console.log(response)
							this.$Message.success('设置成功');
							this.reload();
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
            //删除
            deleteWx(type,index){
            	if(type == '1'){
            		//微信
            		this.delPayment(type,index,this.datawx[index].paymentId);
            	}else if(type == '2'){
            		//支付宝
            		this.delPayment(type,index,this.datazfb[index].paymentId);
            	}else if(type == '3'){
            		//银行卡
            		this.delPayment(type,index,this.databank[index].paymentId);
            	}
            },
            delPayment(type,idx,index){
            	this.$api.post('/ContactsImprove/api/delPayment', {
					paymentId:index
				}, response => {
					
					if(response.status >= 200 && response.status < 300) {					
						if(response.data.code == 200){
							console.log(response)							
							//处理删除事项
							
							this.$Message.success('删除成功');
							if(type == '1'){
			            		//微信
			            		this.datawx.splice(idx,1);
			            		console.log(this.datawx)
			            		//this.delPayment(this.datawx[index].paymentId);
			            	}else if(type == '2'){
			            		//支付宝
			            		this.datazfb.splice(idx,1);
			            		console.log(this.datazfb)
			            	}else if(type == '3'){
			            		//银行卡
			            		this.databank.splice(idx,1);
			            		console.log(this.databank)
			            	}
							
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
            
            submitBank(){
            	//提交银行卡
            	this.$api.post('/ContactsImprove/api/addPayment', {
					paymentType:'3',
					paymentNumber:this.formCustom.cardId,
					userName:this.formCustom.cardName,
					paymentDefault:'0',
					paymentName:this.formCustom.cardBank
				}, response => {
					
					if(response.status >= 200 && response.status < 300) {					
						if(response.data.code == 200){
            				this.reload();
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
            submitwx(){
            	let config = {
					headers: {
						'Content-Type': 'multipart/form-data'						
					}

				}; //添加请求头
            	if(this.isWx){
            		//提交微信
            		axios.post(util.ajaxUrl+'/ContactsImprove/api/addPayment', this.uploadData, config)            			
            		.then(response => {
            			if(response.data.code == 200){
            				this.reload();
            			}else if(response.data.code == 312){

							this.$store.commit('logout', this);
		                    this.$store.commit('clearOpenedSubmenu');
		                    this.$router.push({
		                        name: 'login'
		                    });
						}else {
							this.$Message.error(response.data.msg);
						}
            		})
            		.catch((error) => {
						console.log(error)

					})
//          		console.log(111);
            	}else {
            		//提交支付宝
            		axios.post(util.ajaxUrl+'/ContactsImprove/api/addPayment', this.uploadData, config)            			
            		.then(response => {
            			
            			
            			if(response.data.code == 200){
            				this.reload();
            			}else if(response.data.code == 312){

							this.$store.commit('logout', this);
		                    this.$store.commit('clearOpenedSubmenu');
		                    this.$router.push({
		                        name: 'login'
		                    });
						}else {
							this.$Message.error(response.data.msg);
						}
            		})
            		.catch((error) => {
						console.log(error)

					})
            	}

            },
            getpayList(){
            	this.$api.post('/ContactsImprove/api/paylist', {
						
				}, response => {
					
					if(response.status >= 200 && response.status < 300) {
						console.log(response)
						if(response.data.code == 200){
							const data = response.data;
							
							//判断是微信还是支付宝
							const payArray = data.data;
							
							for(let i = 0;i<payArray.length; i++){
								//console.log(payArray[i])
								//this.datawx.push(value)
								
								if(payArray[i].paymentTypeName == '微信支付'){
									
									let wxobj = {};
									wxobj.name = payArray[i].paymentNumber;
									wxobj.paymentId = payArray[i].paymentId;
									wxobj.status = payArray[i].paymentDefault == 0 ? '未启动' : '已启动';
									wxobj.img = payArray[i].paymentImage;
									wxobj.userName = payArray[i].userName;
									wxobj.time = util.Changetime(payArray[i].createTime);
									wxobj.cellClassName = payArray[i].paymentDefault == 1 ? {'status':'colorGreen'} : {};
									this.datawx.push(wxobj);
								}else if(payArray[i].paymentTypeName == '支付宝支付'){
									let zfbobj = {};
									zfbobj.name = payArray[i].paymentNumber;
									zfbobj.paymentId = payArray[i].paymentId;
									zfbobj.status = payArray[i].paymentDefault == 0 ? '未启动' : '已启动';
									zfbobj.img = payArray[i].paymentImage;
									zfbobj.userName = payArray[i].userName;
									zfbobj.time = util.Changetime(payArray[i].createTime);
									zfbobj.cellClassName = payArray[i].paymentDefault == 1 ? {'status':'colorGreen'} : {};
									this.datazfb.push(zfbobj);
								}else if(payArray[i].paymentTypeName == '银联支付'){
									let bankobj = {};
									bankobj.name = payArray[i].userName;
									bankobj.paymentId = payArray[i].paymentId;
									bankobj.status = payArray[i].paymentDefault == 0 ? '未启动' : '已启动';
									bankobj.cardId = payArray[i].paymentNumber;
									bankobj.userName = payArray[i].userName;
									bankobj.bank = payArray[i].paymentName;
									bankobj.time = util.Changetime(payArray[i].createTime);
									bankobj.cellClassName = payArray[i].paymentDefault == 1 ? {'status':'colorGreen'} : {};
									this.databank.push(bankobj);
								}
							}

						}else if(response.data.code == 312){
							//console.log(11111)
							
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
            //上传相关函数
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleBeforeUpload (file) {
            	let that = this;
            	this.$refs.upload.clearFiles();
            	let reader = new FileReader();
            	reader.readAsDataURL(file);
            	
            	reader.onload = function(e) {
            		
        			var image = new Image();
						image.src = e.target.result;
						
						image.onload = function() {
								var expectWidth = this.naturalWidth;
								var expectHeight = this.naturalHeight;
								if(this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
									expectWidth = 800;
									expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
								} else if(this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
									expectHeight = 1200;
									expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
								}
								var canvas = document.createElement("canvas");
								var ctx = canvas.getContext("2d");
								canvas.width = expectWidth;
								canvas.height = expectHeight;
								ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
								var base64 = null;
								//修复ios上传图片的时候 被旋转的问题

								base64 = canvas.toDataURL("image/jpeg", 0.5);

								that.MyImg = base64;

							};
            		
            }
            	
				
            	//验证微信支付宝是否填写
            	if(this.isWx){
            		if(this.formCustom.wxKey == ''){
            			this.$Notice.warning({
	                        title: '填写微信账号'
	                    });
	                    return false
            		}
            	

					let params = new FormData();
					
					params.append('paymentType','2');
					params.append('paymentNumber',this.formCustom.wxKey);
					params.append('userName', this.formCustom.trueName);
					params.append('paymentDefault','0');
					params.append('paymentQR',file);
					
            		this.uploadData = params;
            		//console.log(this.msgData)
            		//实现手动上传
            		return false;
            	}else {
            		if(this.formCustom.zfbKey == ''){
            			this.$Notice.warning({
	                        title: '填写支付宝账号'
	                    });
	                    
	                    return false
            		}
            		
            		let params = new FormData();
					
					params.append('paymentType','1');
					params.append('paymentNumber',this.formCustom.zfbKey);
					params.append('userName', this.formCustom.trueName);
					params.append('paymentDefault','0');
					params.append('paymentQR',file);
					
            		this.uploadData = params;
            		
            		
            		//实现手动上传
            		return false;
            	}			
            },
            handleSuccess (res, file) {
            	
                console.log(file)
                
                console.log(res)
            }
        },
        created(){
        	this.getpayList()
        }
    }
</script>
