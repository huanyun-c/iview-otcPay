<template>
	<div>
		<Card :bordered="false" style="margin-top:10px;width:400px;">
			<i-form :model="formLeft" label-position="left" :label-width="100">
		        <Form-item label="第三方订单号">
		            <i-input :value.sync="formLeft.input1" v-model="formLeft.input1"></i-input>
		        </Form-item>
		        <Form-item label="金额">
		            <i-input :value.sync="formLeft.input2" v-model="formLeft.input2"></i-input>
		        </Form-item>
		        <Form-item label="支付方式">
		            <i-select :model.sync="model1" style="width:270px" @on-change="change">
				        <i-option v-for="item in payList" :value="item.value">{{ item.label }}</i-option>
				    </i-select>
		        </Form-item>
		        <Form-item label="主题">
		            <i-input :value.sync="formLeft.input4" v-model="formLeft.input4"></i-input>
		        </Form-item>
		    </i-form>
		</Card>
		<i-button type="primary" @click="createdOrder" style="margin-top:10px;">创建订单</i-button>
		
		
		<Card :bordered="false" style="margin-top:10px;width:400px;">
			<i-form :model="formLeft" label-position="left" :label-width="100">
		        <Form-item label="平台订单号">
		            <i-input :value.sync="formLeft.input3" v-model="formLeft.input3"></i-input>
		        </Form-item>		       
		    </i-form>
		</Card>
		<i-button type="primary" @click="orderPayTest" style="margin-top:10px;">确认收款</i-button>
	</div>
</template>

<script>
	import Cookies from 'js-cookie';
	import util from '../../libs/util.js';
	export default {
		data() {
			return {
				merchantUserId:'',
				formLeft: {
                    input1: '',
                    input2: '',
                    input3: '',
                    input4: ''
                },
                payList: [
                    {
                        value: 'ALIPAY',
                        label: '支付宝'
                    },
                    {
                        value: 'WEIPAY',
                        label: '微信'
                    },
                    {
                        value: 'UNIONPAY',
                        label: '银行卡'
                    }
                    
                ],
                model1: '',
                payWay:''
			}
		},
		methods: {
			createdOrder(){
				//数据要动态的
				let time = new Date().getTime();
				this.$api.post('/ContactsImprove/api/testCreateOrder', {
								merchantUserId:this.merchantUserId,
						    	currencyType:'USDT',
						    	outTradeNo:this.formLeft.input1,
						    	version:'1.0',
						    	amount:this.formLeft.input2,
						    	subject:this.formLeft.input4,
						    	timestamp:time,
						    	paymentType:this.payWay,
						    	merchantAccount:'laihuan',
						    	notifyUrl:'http://localhost:8080/ContactsImprove/api/notify',
						    	body:'用户充值'							
						}, response => {
							
							if(response.status >= 200 && response.status < 300) {	
								console.log(response)
								if(response.data.code == 200){
									this.$Message.success(response.data.msg);
									this.trueCreatedOrder(time,response.data.data.sign);
								}else {
									this.$Message.error(response.data.msg);
								}
							}	
						});
			},
			trueCreatedOrder(time,sign){
				this.$api.post('/ContactsImprove/api/createOrder', {
								merchantUserId:this.merchantUserId,
						    	currencyType:'USDT',
						    	outTradeNo:this.formLeft.input1,
						    	version:'1.0',
						    	amount:this.formLeft.input2,
						    	subject:this.formLeft.input4,
						    	timestamp:time,
						    	paymentType:this.payWay,
						    	merchantAccount:'laihuan',
						    	notifyUrl:'http://localhost:8080/ContactsImprove/api/notify',
						    	body:'用户充值',
						    	sign:sign
						}, response => {
							
							if(response.status >= 200 && response.status < 300) {	
								console.log(response)
								if(response.data.code == 200){
									this.$Message.success(response.data.msg);
								}else {
									this.$Message.error(response.data.msg);
								}
							}	
						});
			},
			getMsgIWant(str) {
				var obj      = {};
				var queryArr = str.split("&");
				queryArr.forEach(function(item) {
			
					var value = item.split("=")[1];
					var key   = item.split("=")[0];
					obj[key]  = value;
				});
				return obj;
			},
			orderPayTest(){

				let time = new Date().getTime();
				
				this.$api.post('/ContactsImprove/api/testOrderPay', {
								tradeNumber:this.formLeft.input3					    								
						}, response => {
							
							if(response.status >= 200 && response.status < 300) {	
								console.log(response)
								if(response.data.code == 200){
									this.$Message.success(response.data.msg);
									
									//解析出时间
									const dataNew = this.getMsgIWant(response.data.data.paraStr);
									console.log(dataNew);

									this.orderPay(dataNew.timestamp,dataNew.outTradeNo,response.data.data.sign);
								}else {
									this.$Message.error(response.data.msg);
								}
							}	
						});
			},
			orderPay(time,outTradeNo,sign){
				this.$api.post('/ContactsImprove/api/orderPay', {
								tradeNumber:this.formLeft.input3,
								merchantUserId:this.merchantUserId,
						    	outTradeNo:outTradeNo,
						    	version:'1.0',
						    	timestamp:time,
						    	sign:sign
						    	
						}, response => {
							
							if(response.status >= 200 && response.status < 300) {	
								console.log(response)
								if(response.data.code == 200){
									this.$Message.success(response.data.msg);
									//this.orderPay(time,response.data.data.sign);
								}else {
									this.$Message.error(response.data.msg);
								}
							}	
						});
			},
			change(value){
				console.log(value)
				this.payWay = value;
			}
		},
		computed:{

		},
		created(){
			let merchantUserId = Cookies.get('userid');
				
			this.merchantUserId = merchantUserId;
		}

	}
</script>

<style lang="less">
	@import "../../styles/common.less";
	.colorGreen {
		color:green;
		font-weight: 700;
	}
</style>