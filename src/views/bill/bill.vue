<style lang="less">
	
	@import "../../styles/common.less";
	@import "../home/components/styles/table.less";
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
	
	<div class="home-main">				
		
		<Row class="margin-top-10">
			<Card>
				<h4 slot="title">
          			<Icon type="android-archive"></Icon>账单流水
        		</h4>
				<Row>
					<Col span="24">
						<Table :columns="columnsCsv" :data="csvData" size="default" ref="tableCsv"></Table>
					</Col>
				</Row>
			</Card>
		</Row>
		<Row class="margin-top-10 margin-bottom-100" v-if='csvData.length'>
			<Col span='18'>
				<Page :total="totalList" :page-size='pagesize' show-elevator @on-change="changeTable"></Page>
			</Col>
			<Col span='6' style="text-align: right;">
				<i-button type="primary" @click="openEcxel" long>本页表格导出为csv</i-button>
			</Col>
		</Row>
		
		<Modal v-model="modal1" title="导出本页为csv" ok-text="完成">
			<Card>
				<Row>
					<Col span='24' class="padding-left-10">
					<div class="exportable-table-download-con1">
						<span style="margin-right: 16px;"><Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出本页原始数据</Button></span>
						<Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> 导出本页排序和过滤后的数据</Button>
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
							<Button type="primary" size="large" @click="exportData(3)"><Icon type="ios-download-outline"></Icon> 导出本页自定义数据</Button>
						</div>
					</div>
					</Col>
				</Row>
			</Card>
		</Modal>
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
				currentPage:1,				
				showAddNewTodo: false,
				newToDoItemValue: "",
				columnsCsv:[
				{
			        'title': '流水号',
			        'key': 'journalAccountId',     
			       	'className':"bigSize"
			    },			    
			    {
			        'title': '可用变动前',
			        'key': 'currencyNumberBefore',       
			        'sortable': true,
			        'className':"bigSizeWeight"
			    },
			    {
			        'title': '变动值',
			        'key': 'changeAmount',        
			        'className':"bigSizeWeight"
			    },
			    {
			        'title': '可用变动后',
			        'key': 'currencyNumberAfter',        
			        'sortable': true,
			        'className':"bigSizeWeight"
			    },
			    {
			        'title': '冻结变动前',
			        'key': 'freezeNumberBefore',        
			        'className':"bigSize"
			    },
			    {
			        'title': '冻结变动后',
			        'key': 'freezeNumberAfter',     
			       	'className':"bigSize"
			    },
				{
			        'title': '交易时间',
			        'key': 'createTime',     
			       	'className':"bigSize"
			    },
				{
			        'title': '描述',
			        'key': 'remark',     
			       	'className':"bigSize"
			    },
				],
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
				pagesize:15,
				modal1: false,
				totalList:0
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
				
				this.$api.post('/ContactsImprove/api/journalAccount', {
						pageNumber:this.currentPage,
						pageSize:this.pagesize
				}, response => {
					
					if(response.status >= 200 && response.status < 300) {					
						if(response.data.code == 200){
							console.log(response.data);
							this.totalList = response.data.data.totalNumber;
							this.selectMaxRow = response.data.data.journalList.length;
							this.rowNum = response.data.data.totalNumber;
							this.colNum = this.columnsCsv.length;
							
							//处理时间
							const OrdersList = response.data.data.journalList;
								let orderObj=[];
								OrdersList.forEach(function (value, index, array) {
																		
						            orderObj[index] = {
						                userId : value.userId,
						                currencyNumberBefore:value.currencyNumberBefore,
						                changeAmount: value.changeAmount,
						                currencyNumberAfter  : value.currencyNumberAfter,			              
						                createTime  : util.Changetime(value.createTime),
						                freezeNumberBefore:value.freezeNumberBefore,
						                freezeNumberAfter:value.freezeNumberAfter,
						                remark:value.remark,
						                journalAccountId:value.journalAccountId
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
			//获取第一页的数据
			this.changeTable(1);
			
			//this.selectMaxCol = this.columnsCsv.length;
						
		}
	};
	
	
</script>