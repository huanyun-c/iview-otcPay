<style lang="less">
	@import "./home.less";
	@import "../../styles/common.less";
	@import "./components/styles/table.less";
	@import './components/styles/infor-card.less';
	.ivu-table td.table-add {
	    color:red;
	}
	.ivu-table td.table-minus {
	    color:green;
	}
	.ivu-table .bigSize{
		font-size: 14px;
		font-weight: 500;
	}
	.ivu-table .bigSizeWeight{
		font-size: 14px;
		font-weight: 600;
		font-family: "微软雅黑";
	}
</style>
<template>
	
	<div class="home-main" v-if="access">		
		<Row :gutter="10">
			<Col :md="24" :lg="24">
			<Row :gutter="5">
				<Col :xs="24" :sm="12" :md="8" :style="{marginBottom: '10px'}">
					<Card :padding="0">
				        <div class="infor-card-con">
				            <Col class="infor-card-icon-con" span="8" style='background:#3399ff;'>
				                <Row class="height-100" type="flex" align="middle" justify="center">
				                    <Icon type="social-bitcoin" :size="40" color="white"></Icon>
				                </Row>
				            </Col>
				            <Col span="16" class="height-100">
				                <Row align="middle" justify="center" class="height-100">  				                	
				                    <p style='height:60px;line-height: 60px;text-align: center;font-size:20px;color:#3399ff;'>余额USDT</p>   
				                    <p style='height:60px;line-height: 60px;text-align: center;font-size:14px;'>{{ currencyNumber }}</p>
				                </Row>
				            </Col>
				        </div>
				    </Card>
				</Col>
				<Col :xs="24" :sm="12" :md="8" :style="{marginBottom: '10px'}">
					<Card :padding="0">
				        <div class="infor-card-con">
				            <Col class="infor-card-icon-con" span="8" style='background:#00cc66;'>
				                <Row class="height-100" type="flex" align="middle" justify="center">
				                    <Icon type="social-bitcoin-outline" :size="40" color="white"></Icon>
				                </Row>
				            </Col>
				            <Col span="16" class="height-100">
				                <Row align="middle" justify="center" class="height-100">  
				                	
				                    <p style='height:60px;line-height: 60px;text-align: center;font-size:20px;color:#00cc66;'>冻结USDT</p>      
				                    <p style='height:60px;line-height: 60px;text-align: center;font-size:14px;'>{{ freezeNumber }}</p>
				                </Row>
				            </Col>
				        </div>
				    </Card>
				</Col>
				<Col :xs="24" :sm="12" :md="8" :style="{marginBottom: '10px'}">
					<Card :padding="0">
				        <div class="infor-card-con">
				            <Col class="infor-card-icon-con" span="8" style='background:#ff9900;'>
				                <Row class="height-100" type="flex" align="middle" justify="center">
				                    <Icon type="cash" :size="40" color="white"></Icon>
				                </Row>
				            </Col>
				            <Col span="16" class="height-100">
				                <Row align="middle" justify="center" class="height-100">  
				                	
				                    <p style='height:60px;line-height: 60px;text-align: center;font-size:20px;color:#ff9900;'>总额USDT</p>  
				                    <p style='height:60px;line-height: 60px;text-align: center;font-size:14px;'>{{ tatalNumber }}</p>
				                </Row>
				            </Col>
				        </div>
				    </Card>
				</Col>
			</Row>
			</Col>
		</Row>
		
		<Row class="margin-top-10">
			<Card>
				<h4 slot="title">
          			<Icon type="android-archive"></Icon>最新交易记录
        		</h4>
				<Row>
					<Col span="24">
						<Table :columns="columnsCsv" :data="csvData" size="default" ref="tableCsv"></Table>
					</Col>
				</Row>
			</Card>
		</Row>
		<!--<Row class="margin-top-10 margin-bottom-100" v-if='csvData.length'>
			<Col span='18'>
				<Page :total="totalList" show-elevator @on-change="changeTable"></Page>
			</Col>
			<Col span='6' style="text-align: right;">
				<i-button type="primary" @click="openEcxel" long>本页表格导出为csv</i-button>
			</Col>
		</Row>-->
		
		<!--<Modal v-model="modal1" title="导出为csv" ok-text="完成">
			<Card>
				<Row>
					<Col span='24' class="padding-left-10">
					<div class="exportable-table-download-con1">
						<span style="margin-right: 16px;"><Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出原始数据</Button></span>
						<Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> 导出排序和过滤后的数据</Button>
					</div>
					<div class="exportable-table-download-con2">
						<div>
							<span>选取行范围：&nbsp;</span>
							<InputNumber :min="1" :max="selectMaxRow" v-model="selectMinRow"></InputNumber>
							<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
							<InputNumber :min="selectMinRow" :max="rowNum" v-model="selectMaxRow"></InputNumber>
						</div>
						<div class="margin-top-10">
							<span>选取列范围：&nbsp;</span>
							<InputNumber :min="1" :max="selectMaxCol" v-model="selectMinCol"></InputNumber>
							<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
							<InputNumber :min="selectMinCol" :max="colNum" v-model="selectMaxCol"></InputNumber>
						</div>
						<div class="margin-top-10">
							<span>输入文件名：</span>
							<Input v-model="csvFileName" icon="document" placeholder="请输入文件名" style="width: 190px" />
						</div>
						<div class="margin-top-20">
							<Button type="primary" size="large" @click="exportData(3)"><Icon type="ios-download-outline"></Icon> 导出自定义数据</Button>
						</div>
					</div>
					</Col>
				</Row>
			</Card>
		</Modal>-->
	</div>
	
	<div v-else style="font-size:16px;">
		您的申请正在审核中。。
	</div>
	
</template>

<script>
	import Cookies from 'js-cookie';
	import table2excel from "@/libs/table2excel.js";
	import util from '../../libs/util.js';
	export default {
		name: "home",
		components: {

		},
		data() {
			return {				
				currencyNumber:0,
				freezeNumber:0,
				tatalNumber:0,				
				currentPage:1,				
				showAddNewTodo: false,
				newToDoItemValue: "",
				columnsCsv:[
				{
					'title':'订单号',
					'key':'orderNo'					
				},			    
			    {
			        'title': '金额',
			        'key': 'money',       
			        'sortable': true,
			        'className':"bigSizeWeight"
			    },
			    {
			        'title': '汇率',
			        'key': 'fav',        
			        'className':"bigSizeWeight"
			    },
			    {
			        'title': 'USDT',
			        'key': 'ico',        
			        'sortable': true,
			        'className':"bigSizeWeight"
			    },
			    {
			        'title': '内容',
			        'key': 'content',        
			        'className':"bigSize"
			    },
			    {
			        'title': '创建时间',
			        'key': 'time',     
			       	'className':"bigSize"
			    },
				{
			        'title': '交易状态',
			        'key': 'status',     
			       	'className':"bigSize"
			    }],
				csvData:[],
				rowNum :0,
				colNum :0,
				selectMinRow: 1,
				selectMaxRow:0,
				selectMinCol: 1,
				selectMaxCol:0,
				maxRow: 0,
				minRow: 1,
				maxCol: 0,
				minCol: 1,
				csvFileName: "",
				excelFileName: "",
				tableExcel: {},
				fontSize: 16,
				modal1: false,
				totalList:0,
				access:0
			};
		},
		computed: {
			avatorPath() {
				return localStorage.avatorImgPath;
			}
		},
		methods: {
			addNewToDoItem() {
				this.showAddNewTodo = true;
			},			
			cancelAdd() {
				this.showAddNewTodo = false;
				this.newToDoItemValue = "";
			},
			exportData(type) {
				if(type === 1) {
					this.$refs.tableCsv.exportCsv({
						filename: "原始数据"
					});
				} else if(type === 2) {
					this.$refs.tableCsv.exportCsv({
						filename: "排序和过滤后的数据",
						original: false
					});
				} else if(type === 3) {
					this.$refs.tableCsv.exportCsv({
						filename: this.csvFileName,
						columns: this.columnsCsv.filter(
							(col, index) =>
							index >= this.selectMinCol - 1 && index <= this.selectMaxCol - 1
						),
						data: this.csvData.filter(
							(data, index) =>
							index >= this.selectMinRow - 1 && index <= this.selectMaxRow - 1
						)
					});
				}
			},
			exportExcel() {
				table2excel.transform(
					this.$refs.tableExcel,
					"hrefToExportTable",
					this.excelFileName
				);
			},
			changeTable(page) {
				//设置一个参数接收page
				this.currentPage = page;
				
				this.$api.post('/ContactsImprove/api/userOrders', {
						pageNumber:this.currentPage,
						pageSize:30
				}, response => {
					
					if(response.status >= 200 && response.status < 300) {					
						if(response.data.code == 200){
							console.log(response.data);
							
							
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
			getIndex(){
				this.$api.post('/ContactsImprove/api/index', {
						
				}, response => {
					
					if(response.status >= 200 && response.status < 300) {	
						
						if(response.data.code == 200){
							let data = response.data;
								console.log(response.data);
								this.currencyNumber = data.data.UserWallet.currencyNumber;
								this.freezeNumber = data.data.UserWallet.freezeNumber;
								this.tatalNumber = util.accAdd(this.currencyNumber,this.freezeNumber)
								this.totalList = data.data.Orders.totalNumber;
								//this.csvData = data.data.Orders.OrdersList;
								this.selectMaxRow = data.data.Orders.totalNumber;
								this.rowNum = data.data.Orders.totalNumber;
								this.colNum = this.columnsCsv.length;
								//处理数据
								const OrdersList = data.data.Orders.OrdersList;
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
									}else if(value.status == '4'){
										status = '失败';
									}
									
						            orderObj[index] = {
						                orderNo : value.tradeNumber,//订单号
						                fav:value.exchangeRate,//倍率
						                ico: value.currencyAmount,//USDT
						                money  : value.amount,		//	RMB		              
						                time  : util.Changetime(value.createTime),//完成时间
						                content:value.subject,//交易内容
						                status:status//交易状态
						            }
						        })
								
								this.csvData = orderObj;
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
			openEcxel() {
				//弹出导出选择框
				console.log(111);
				this.modal1 = true;
			},
			ok() {
				this.$Message.info('点击了确定');
			},
			cancel() {
				this.$Message.info('点击了取消');
			}
		},
		created(){
			this.getIndex();
			//获取第一页的数据
			this.changeTable(1);
			
			this.selectMaxCol = this.columnsCsv.length;
			
			let access = Cookies.get('access');
			if(access == '0'){
				this.access = false;
			}else {
				this.access = true;
			}
			
		}
	};
	
	
</script>