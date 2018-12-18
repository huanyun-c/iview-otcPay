<template>
	<div class="tran_box">
		<Row>
			<i-col :xs="4" :sm="4" :md="4" :lg="4">
				<Menu theme="light" active-name="1" width="auto" @on-select="openTranList">	
					<Menu-item key="未付款交易"  name="1">
			                <Icon type="ios-circle-filled"></Icon>
			                未付款交易	                
			            </Menu-item>
			            <Menu-item key="已付款交易"  name="2">
			                <Icon type="ios-circle-filled"></Icon>
			                已付款交易	                
			            </Menu-item>
			            <Menu-item key="已完成交易"  name="3">
			                <Icon type="ios-checkmark"></Icon>
			                已完成交易
			            </Menu-item>
			            <Menu-item key="已取消交易"  name="4">
			                <Icon type="ios-close"></Icon>
			                已取消交易
			            </Menu-item>			       
			    </Menu>
			</i-col>
			<i-col :xs="20" :sm="20" :md="20" :lg="20" style="padding-left:10px;">
				<i-table :columns="columns1" :data="data1"></i-table>
			</i-col>
		</Row>
		<Spin fix v-if="spinShow">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        <Modal v-model="modal" title="获取验证码" ok-text="确定提交" @on-ok="tranUsdt">
			<Card>
				<i-input type="text" v-model="msgCode" placeholder="输入短信验证码">					
			        <span slot="prepend">验证码</span>
			        <i-button slot="append" @click="getCode" :disabled="disabled">{{smsMsg}}</i-button>
			    </i-input>					
			</Card>
		</Modal>
	</div>
</template>

<script>
	import util from '../../libs/util.js';
	import Cookies from 'js-cookie';
	export default {
        data () {
            return {
            	spinShow:false,
            	modal:false,
            	msgCode:'',
            	smsMsg:'获取验证码',
                count: 60,
                disabled: false,
                phone:'',
                columns1: [
                    {
                        title: '订单号',
                        key: 'orderNo'
                    },
                    {
                        title: '金额(元)',
                        key: 'money'
                    },
                    {
                        title: 'USDT',
                        key: 'ico'
                    },
                    {
                        title: '时间',
                        key: 'time'
                    },
                    {
                        title: '操作',
                        key: 'option',
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
											this.tranUsdtOpen(params.index)
										}
									}
								}, '确认转账'),
//								h('Button', {
//									props: {
//										type: 'error',
//										size: 'small'
//									},
//									style: {
//										margin: '5px'
//									},
//									on: {
//										click: () => {
//											this.setTrue(params.index)
//										}
//									}
//								}, '取消交易')

							]);
						}       
                    }
                ],
                data1:[],
                index:0
            }
        },
        methods: {
            tranUsdtOpen(index){
            	//弹出验证码,存index
            	this.index = index;
            	this.modal = true;
            },
            changeList(status){
            	var _this = this;
            	_this.data1 = [];
            	this.$api.post('/ContactsImprove/api/userOrdersByStatus', {
						pageNumber:1,
						pageSize:20,
						status:status
					}, response => {
						console.log(response)
						if(response.data.code == 200){
							
							const OrdersList = response.data.data.Orders.OrdersList;
							let orderObj=[];
							OrdersList.forEach(function (value, index, array) {
								let status;
								if(value.status == '0'){
									status = '未付款';
								}else if(value.status == '1'){
									status = '已付款';
								}else if(value.status == '2'){
									status = '已完成';
								}else if(value.status == '3'){
									status = '已取消';
								}
								
					            orderObj[index] = {
					                orderNo : value.tradeNumber,
					                ico: value.currencyAmount,
					                money  : value.amount,					              
					                status: status,
					                time  : util.Changetime(value.createTime),
					                tradeNumber:value.tradeNumber
					            }
					        })
							
							this.data1 = orderObj;
							
							
						}else if(response.data.code == 312){
							this.$store.commit('logout', this);
		                    this.$store.commit('clearOpenedSubmenu');
		                    this.$router.push({
		                        name: 'login'
		                    });
						}else {
							this.$Message.success(response.data.msg);
						}
						
						
					})
            },
            openTranList(key,page){
            	let _this = this;
            	if(key == '1'){
            		_this.spinShow = true;
            		_this.changeList(0);
            		
            		_this.columns1 = [
            			{
	                        title: '订单号',
	                        key: 'orderNo'
	                    },
	                    {
	                        title: '金额(元)',
	                        key: 'money'
	                    },
	                    {
	                        title: 'USDT',
	                        key: 'ico'
	                    },
	                    {
	                        title: '时间',
	                        key: 'time'
	                    },
	                    {
	                    	title:'状态',
	                    	key:"status"
	                    }
            		]
					setTimeout(function(){
						_this.spinShow = false;
					},1000)
            	}else if(key == '2'){
            		
            		_this.spinShow = true;
            		
            		_this.changeList(1);
            		
            		//未付款
            		_this.columns1 = [
	                    {
	                        title: '订单号',
	                        key: 'orderNo'
	                    },
	                    {
	                        title: '金额(元)',
	                        key: 'money'
	                    },
	                    {
	                        title: 'USDT',
	                        key: 'ico'
	                    },
	                    {
	                        title: '时间',
	                        key: 'time'
	                    },
	                    {
	                        title: '操作',
	                        key: 'option',
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
												this.tranUsdtOpen(params.index)
											}
										}
									}, '确认转账')
								]);
							}       
	                    }
	                ]
            		
            		setTimeout(function(){
						_this.spinShow = false;
					},1000)
            		
            	}else if(key == '3'){
            		_this.spinShow = true;
            		_this.changeList(2);
            		//已完成，切换页面
            		_this.columns1 = [
            			{
	                        title: '订单号',
	                        key: 'orderNo'
	                    },
	                    {
	                        title: '金额(元)',
	                        key: 'money'
	                    },
	                    {
	                        title: 'USDT',
	                        key: 'ico'
	                    },
	                    {
	                        title: '时间',
	                        key: 'time'
	                    },
	                    {
	                    	title:'状态',
	                    	key:"status"
	                    }
            		]
					setTimeout(function(){
						_this.spinShow = false;
					},1000)
            		
            	}else if(key == '4'){
            		_this.spinShow = true;
            		_this.changeList(3);
            		//已取消交易
            		_this.columns1 = [
            			{
	                        title: '订单号',
	                        key: 'orderNo'
	                    },
	                    {
	                        title: '金额(元)',
	                        key: 'money'
	                    },
	                    {
	                        title: 'USDT',
	                        key: 'ico'
	                    },
	                    {
	                        title: '时间',
	                        key: 'time'
	                    },
	                    {
	                    	title:'状态',
	                    	key:"status"
	                    }
            		]
            		setTimeout(function(){
						_this.spinShow = false;
					},1000)
            	}
            },
            tranUsdt(){
            	let index = this.index;

            	//TODO:币商确认交易
            	this.$api.post('/ContactsImprove/api/confirmPay', {
						tradeNumber:this.data1[index].tradeNumber,
						smsCode:this.msgCode
					}, response => {
						console.log(response)
						if(response.data.code == 200){
							
							this.$Message.success('交易成功');
							
							//处理数据
							this.data1.splice(index,1);
							
						}else if(response.data.code == 312){
							this.$store.commit('logout', this);
		                    this.$store.commit('clearOpenedSubmenu');
		                    this.$router.push({
		                        name: 'login'
		                    });
						}else {
							this.$Message.success(response.data.msg);
						}
						
						
					})
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
       	
       		this.openTranList('1',0);
       		
       		let phone = Cookies.get('user');
				
			this.phone = phone;
       }
    }
</script>

<style>
.tran_box {
	width:100%;
	position: relative;
}
.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
</style>