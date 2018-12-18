<template>
	<div>
		<!--<Card class="margin-top-10" v-if="access">
			<h4 slot="title">
				钱包地址				
			</h4>
			<i-table border :columns="columns1" :data="data1" size="large"></i-table>
		</Card>	-->
		<Card class="margin-top-10">
			<h4 slot="title">
				钱包地址				
			</h4>
			<i-table border :columns="columns2" :data="data1" size="large"></i-table>
		</Card>
		<!--<Modal v-model="modal" title="更换钱包地址" ok-text="确定提交" @on-ok="submitBank">
			<Card>
				<i-input type="text" v-model="moneySite">
			        <span slot="prepend">USDT地址</span>
			    </i-input>					
			</Card>
		</Modal>-->
		<Card class="margin-top-10">
			<h4 slot="title">
				钱包二维码				
			</h4>
			<div id="qrcode"></div>
			<p style="text-align:center;padding:10px 0;">可以用钱包扫描二维码充币</p>
		</Card>
		<Card class="margin-top-10">
			<h4 slot="title">
				提币				
			</h4>
			<i-form :model="formLeft" label-position="left" :label-width="100" style="width:400px;">
		        <Form-item label="钱包地址">
		            <i-input :value.sync="formLeft.input1" disabled></i-input>
		        </Form-item>		        
		        <Form-item label="目标地址">
		            <i-input :value.sync="formLeft.input3" v-model="formLeft.input3" placeholder="请输入目标地址"></i-input>
		        </Form-item>
		        <Form-item label="提币数量">
		        	<Input-number :max="1000" :min="20" :value.sync="formLeft.input2" style="width:300px;" @on-change="moneyChange"></Input-number>
		        </Form-item>
		        
		        <Form-item label="手续费">
		            <i-input :value.sync="formLeft.input4" disabled placeholder="手续费"></i-input>
		        </Form-item>
		        <Form-item label="验证码">
		        	<i-input :value.sync="formLeft.input3" v-model="formLeft.smscode" placeholder="输入短信验证码">
		        		<i-button slot="append" type="primary" @click="getCode" :disabled="disabled">{{smsMsg}}</i-button>
		        	</i-input>
		        	
		        </Form-item>
		        <p style="color:#999;">温馨提示：最低提币为20，每天最高为1000,手续费为1%</p>
		        
		        	
		    </i-form>
	        <i-button type="primary" @click="tibi" long style='margin-top:10px;width:400px;'>确定提币</i-button>
		</Card>
	</div>
</template>

<script>
	import Cookies from 'js-cookie';
	import QRCode from 'qrcodejs2';
	import util from '../../libs/util.js';
	export default {
		data() {
			return {
				merchantUserId:'',
				self: this,
				modal:false,
				moneySite:'',
				access:true,
				disabled: false,
				formLeft: {
                    input1:'',
                    input2:20,
                    input3:'',
                    input4:0.2,
                    smscode:''
                },
                smsMsg:'获取验证码',
                count: 60,
                site:'',
                phone:'',
				columns1: [{
						title: '钱包地址',
						key: 'site'
					},
					{
						title: '状态',
						key: 'status'
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
											this.setTrue()
										}
									}
								}, '更换')

							]);
						}              
					}

				],
				columns2: [{
						title: '钱包地址',
						key: 'site'
					},
					{
						title: '状态',
						key: 'status'
					}
				],
				data1: [{
						site: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
						status: '已冻结'	,
						cellClassName:{
                        	'status':'colorGreen'
                        }
					}
				]
				
				
			}
		},
		methods: {
			setTrue(){
				this.modal = true;
			},
			getPersonSite(){
				//先获取权限
				let accessCode = parseInt(Cookies.get('access'));
				
				if(accessCode == '1'){
					this.access = true;
				}else {
					this.access = false;
				}
				this.$api.post('/ContactsImprove/api/walletAddress', {
					
				}, response => {
					
					if(response.status >= 200 && response.status < 300) {					
						if(response.data.code == 200){
							this.$Message.success('查询成功');
							
							this.data1[0].site = response.data.data.walletAddress;
							this.formLeft.input1 = response.data.data.walletAddress;
							this.data1[0].status = response.data.data.status == '1' ? '已启用' : '已冻结';
							this.qrcode();
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
				//TODO:执行提交操作
				this.$api.post('/ContactsImprove/api/setWalletAddress', {
					address:this.moneySite
				}, response => {
					
					if(response.status >= 200 && response.status < 300) {					
						if(response.data.code == 200){
								this.$Message.success('更换成功');	
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
			qrcode () {
		      let qrcode = new QRCode('qrcode', {
		        width: 200,
		        height: 200, // 高度
		        text: this.data1[0].site, // 二维码内容
		        render: 'canvas', // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
		        background: '#f0f',
		        foreground: '#ff0'
		      })		     
		   },
		   moneyChange(money){
		   	
			   	this.formLeft.input2 = money;
			   	//计算手续费
			   	this.formLeft.input4 = util.accMul(money,0.01);
		   },
		   siteChange(site){

		   		this.formLeft.site = site.data;
		   },
		   tibi(){

				this.$api.post('/ContactsImprove/api/withdrawUSDT', {
						toAddress:this.formLeft.input3,
						amount:this.formLeft.input2,
						smsCode:this.formLeft.smscode
				}, response => {
				
					if(response.status >= 200 && response.status < 300) {	
						if(response.data.code == 200){
							this.$Message.success(response.data.msg);							
						}else {
							this.$Message.error(response.data.msg);
						}
					}	
				});
		  },
		  getCode(){
		  	let that = this;
		  	//禁止点击
			that.disabled = true;
			//倒计时
			let timer = setInterval(function() {
				--that.count;
				that.smsMsg = that.count + '秒后重试';

				if(that.count == 0) {
					that.count = 60;
					that.disabled = false;
					that.smsMsg = '获取验证码';
					clearInterval(timer);
				}

			}, 1000)

		  	this.$api.post('/ContactsImprove/api/sendValidSMS', {
						phoneNumber:this.phone								
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
		created(){
			this.getPersonSite();
			
			let merchantUserId = Cookies.get('userid');
				
			this.merchantUserId = merchantUserId;
			
			let phone = Cookies.get('user');
				
			this.phone = phone;
		}

	}
</script>

<style lang="less">
	@import "../../styles/common.less";
	.colorGreen {
		color:green;
		font-weight: 700;
	}
	#qrcode img {
		margin:auto;
	}
</style>