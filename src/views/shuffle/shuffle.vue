<template>
	<div>
		<Tabs active-key="key1" :animated='false'>
			<Tab-pane label="创建订单" key="key1">
				<Card>
					<h2 slot="title">
						创建订单
						<Tag type="border" color="blue">HTTP</Tag>
						<Tag type="border" color="yellow">POST</Tag>
					</h2>
					<p style="font-size: 16px;font-weight: 600;">接口地址：https://www.paj166.org/ContactsImprove/api/createOrder</p>
				</Card>
				<!--<Card class="margin-top-10">
					<h4 slot="title">
						请求头部				
					</h4>
					<i-table border :columns="columns1" :data="data1"></i-table>
				</Card>-->
				<Card class="margin-top-10">
					<h4 slot="title">
						请求参数				
					</h4>
					<i-table border :content='self' :columns="columns2" :data="data2"></i-table>
				</Card>
				<Card class="margin-top-10">
					<h4 slot="title">
						返回参数				
					</h4>
					<i-table border :content='self' :columns="columns3" :data="data3"></i-table>
				</Card>
				<Card class="margin-top-10">
					<Tabs type="card">
				        <Tab-pane label="成功示例">
				        	<i>
				        		<pre>
					        		   {
									   "msg":"成功",
									    "code":200,
									    "data":{
									        "orderDetail":{
									            "tradeNumber":"2018112816264743110000000001",
									            "outTradeNo":"369852199",
									            "merchantUserId":2018112710100000001,
									            "payTimeout":900,
									            "merchantAccount":"李四",
									            "paymentType":"ALIPAY",
									            "currencyType":"USDT",
									            "currencyAmount":28.571429,
									            "exchangeRate":7,
									            "amount":200
									        },
									        "paymentList":[
									            {
									                "paymentId":1,
									                "paymentTypeName":"支付宝支付",
									                "paymentNumber":"zhangsan@163.com",
									                "paymentName":null,
									                "paymentImage":null,
									                "userName":"张三"
									            }
									        ]
									    }
									}
					        	</pre>
				        	</i>
				        	
				        </Tab-pane>
				        <Tab-pane label="失败示例">
				        	<i>
				        		<pre>
				        			{

										"code":202,// 状态码
										
										"msg":"失败",// 返回消息
										
										"data":null// 返回数据
										
										}
				        		</pre>
				        	</i>
				        </Tab-pane>				        
				    </Tabs>
				</Card>
				<Card class="margin-top-10">
					<h4 slot="title">
						备注				
					</h4>
					<i-table border :content='self' :columns="columnsRemarks" :data="dataRemarks"></i-table>
				</Card>
			</Tab-pane>
			<Tab-pane label="订单付款" key="key2">
				<Card>
					<h2 slot="title">
						订单付款
						<Tag type="border" color="blue">HTTP</Tag>
						<Tag type="border" color="yellow">POST</Tag>
					</h2>
					<p style="font-size: 16px;font-weight: 600;">接口地址：https://www.paj166.org/ContactsImprove/api/orderPay</p>
				</Card>
				<!--<Card class="margin-top-10">
					<h4 slot="title">
						请求头部				
					</h4>
					<i-table border :columns="columns1" :data="data1"></i-table>
				</Card>-->
				<Card class="margin-top-10">
					<h4 slot="title">
						请求参数				
					</h4>
					<i-table border :content='self' :columns="columns2" :data="datakey2_1"></i-table>
				</Card>
				<Card class="margin-top-10">
					<h4 slot="title">
						返回参数				
					</h4>
					<i-table border :content='self' :columns="columns3" :data="datakey2_2"></i-table>
				</Card>
				<Card class="margin-top-10">
					<Tabs type="card">
				        <Tab-pane label="成功示例">
				        	<i>
				        		<pre>
				        			{

										"code":200,// 状态码
										
										"msg":"成功",// 返回消息
										
										"data":null// 返回数据
										
										}
				        		</pre>
				        	</i>
				        </Tab-pane>
				        <Tab-pane label="失败示例">
				        	<i>
				        		<pre>
				        			{

										"code":202,// 状态码
										
										"msg":"失败",// 返回消息
										
										"data":null// 返回数据
										
										}
				        		</pre>
				        	</i>
				        </Tab-pane>				        
				    </Tabs>
				</Card>
				<Card class="margin-top-10">
					<h4 slot="title">
						备注				
					</h4>
					<i-table border :content='self' :columns="columnsRemarks" :data="dataRemarks"></i-table>
				</Card>
			</Tab-pane>
			<Tab-pane label="提币接口" key="key3">
				<Card>
					<h2 slot="title">
						提币接口
						<Tag type="border" color="blue">HTTP</Tag>
						<Tag type="border" color="yellow">POST</Tag>
					</h2>
					<p style="font-size: 16px;font-weight: 600;">接口地址：https://www.paj166.org/ContactsImprove/api/ transferUsdt</p>
				</Card>
				<!--<Card class="margin-top-10">
					<h4 slot="title">
						请求头部				
					</h4>
					<i-table border :columns="columns1" :data="data1"></i-table>
				</Card>-->
				<Card class="margin-top-10">
					<h4 slot="title">
						请求参数				
					</h4>
					<i-table border :content='self' :columns="columns2" :data="datakey4_1"></i-table>
				</Card>
				<Card class="margin-top-10">
					<h4 slot="title">
						返回参数				
					</h4>
					<i-table border :content='self' :columns="columns3" :data="datakey4_2"></i-table>
				</Card>
				<Card class="margin-top-10">
					<Tabs type="card">
				        <Tab-pane label="成功示例">
				        	<i>
				        		<pre>
				        			{

										"code":200,// 状态码
										
										"msg":"成功",// 返回消息
										
										"data":null// 返回数据
										
										}
				        		</pre>
				        	</i>
				        </Tab-pane>
				        <Tab-pane label="失败示例">
				        	<i>
				        		<pre>
				        			{

										"code":202,// 状态码
										
										"msg":"失败",// 返回消息
										
										"data":null// 返回数据
										
										}
				        		</pre>
				        	</i>
				        </Tab-pane>				        
				    </Tabs>
				</Card>
				<Card class="margin-top-10">
					<h4 slot="title">
						备注				
					</h4>
					<i-table border :content='self' :columns="columnsRemarks" :data="dataRemarks"></i-table>
				</Card>
			</Tab-pane>
			<Tab-pane label="异步回调" key="key4">
				<Card>
					<h2 slot="title">
						异步回调
						<!--<Tag type="border" color="blue">HTTP</Tag>
						<Tag type="border" color="yellow">POST</Tag>-->
					</h2>
					<div>
						<p>当币商在订单列表确认用户付款后，平台将通过商户上送报文请求时提供的notifyUrl字段向商户发送交易结果信息。</p>
						<p>平台存在补发通知机制，如果发送失败后一定时间后会再次发送通知，当商户成功接收到平台发送的回调信息，请在response 报文体中 回复一下内容 “success”</p>
						<p>当平台服务器接收到 success 内容后 将不会继续对商户发送该订单的后台服务通知
						最多回调6次 ，间隔分别为：0分钟 ，5分钟，30分钟，1小时，4小时，12小时。</p>
						<p style="color:red;">
							PS: 返回参数有可能会多出字段或者少字段，进行验签时请根据实际返回参数进行签名。验签用商户的公钥进行验签。
						</p>
						
					</div>
					<!--<p style="font-size: 16px;font-weight: 600;">接口地址：http://api.saintenjoy.com/ContactsImprove/api/orderPay</p>-->
				</Card>
				
				<!--<Card class="margin-top-10">
					<h4 slot="title">
						请求头部				
					</h4>
					<i-table border :columns="columns1" :data="data1"></i-table>
				</Card>-->
				<Card class="margin-top-10">
					<h4 slot="title">
						请求参数				
					</h4>
					<i-table border :content='self' :columns="columns2" :data="datakey3_1"></i-table>
				</Card>
				<!--<Card class="margin-top-10">
					<h4 slot="title">
						返回参数				
					</h4>
					<i-table border :content='self' :columns="columns3" :data="data3"></i-table>
				</Card>
				<Card class="margin-top-10">
					<Tabs type="card">
				        <Tab-pane label="成功示例">
				        	<i>
				        		<p>{</p>
								    <p>"res":200,// 状态码</p>
								    <p>"resMsg":"添加商品成功",// 返回消息</p>
								    <p>"obj":null// 返回数据</p>
								<p>}</p>
				        	</i>
				        </Tab-pane>
				        <Tab-pane label="失败示例">
				        	<i>
				        		<p>{</p>
								    <p>"res":202,// 状态码</p>
								    <p>"resMsg":"添加商品失败",// 返回消息</p>
								    <p>"obj":null// 返回数据</p>
								<p>}</p>
				        	</i>
				        </Tab-pane>				        
				    </Tabs>
				</Card>
				<Card class="margin-top-10">
					<h4 slot="title">
						注意事项				
					</h4>
					<p>所有请求都要做加密操作</p>
				</Card>-->
			</Tab-pane>
		</Tabs>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				self: this,
//				columns1: [{
//						title: '标签',
//						key: 'tag'
//					},
//					{
//						title: '内容',
//						key: 'content'
//					}
//
//				],
//				data1: [{
//						tag: 'apiKey',
//						content: '商户秘钥，前往接口权限查看'
//
//					},
//					{
//						tag: 'apiId',
//						content: '商户id，前往接口权限查看'
//					}
//				],
				columns2: [{
						title: '参数名称',
						key: 'tag'
					},
					{
						title: '参数编码',
						key: 'code'
					},
					{
						title: "属性",
						key: 'notNull'
					},
					{
						title: "数据描述",
						key: 'explain'
					},
					{
						title: '数据类型',
						key: 'type'
					},
//					{
//						title: "更多",
//						key: 'more',
//						width: 150,
//						align: 'center',
//						render: (h, params) => {
//							return h('div', [
//								h('Button', {
//									props: {
//										type: 'primary',
//										size: 'small'
//									},
//									style: {
//										marginRight: '5px'
//									},
//									on: {
//										click: () => {
//											this.show(params.index)
//										}
//									}
//								}, '查看详情')
//
//							]);
//						}
//					}

				],
				data2: [{
						tag: 'merchantUserId',
						type: 'N(15)',
						code:'商户号',
						notNull: '必填',
						explain: '平台下发给商户的商户号',
						maybe: 'iphonex',
						limit: '时间字符串，格式为yyyy-MM-dd HH:mm'

					},
					{
						tag: 'currencyType',
						type: 'A(8)',
						code:'数字货币类型',
						notNull: '必填',
						explain: '固定为 USDT',
						maybe: 'iphonex',
						limit: '时间字符串，格式为yyyy-MM-dd HH:mm'

					},
					{
						tag: 'outTradeNo',
						type: 'ASC(50)',
						code:'订单号',
						notNull: '必填',
						explain: '商户平台订单号',
						maybe: 'iphonex',
						limit: '时间字符串，格式为yyyy-MM-dd HH:mm'

					},
					{
						tag: 'version',
						type: 'A(3)',
						code:'版本号',
						notNull: '必填',
						explain: '固定为1.0',
						maybe: 'iphonex',
						limit: '时间字符串，格式为yyyy-MM-dd HH:mm'

					},
					{
						tag: 'amount',
						type: 'N(64)',
						code:'交易金额',
						notNull: '必填',
						explain: '元为单位',
						maybe: 'iphonex',
						limit: '时间字符串，格式为yyyy-MM-dd HH:mm'
					},
					{
						tag: 'subject',
						type: 'ASC(80)',
						code:'交易主题',
						notNull: '必填',
						explain: '交易主题',
						maybe: 'iphonex',
						limit: '时间字符串，格式为yyyy-MM-dd HH:mm'
					},
					{
						tag: 'timestamp',
						type: '',
						code:'时间戳',
						notNull: '必填',
						explain: '请求发起的时间戳',
						maybe: 'iphonex',
						limit: '时间字符串，格式为yyyy-MM-dd HH:mm'
					},
					{
						tag: 'paymentType',
						type: '',
						code:'支付方式',
						notNull: '必填',
						explain: 'ALIPAY(支付宝), WEIPAY(微信), UNIONPAY(银联)',
						maybe: 'iphonex',
						limit: '时间字符串，格式为yyyy-MM-dd HH:mm'
					},
					{
						tag: 'merchantAccount',
						type: '',
						code:'商户平台用户账号',
						notNull: '选填',
						explain: '商户平台用户的唯一标示',
						maybe: 'iphonex',
						limit: '时间字符串，格式为yyyy-MM-dd HH:mm'
					},
					{
						tag: 'notifyUrl',
						type: '',
						code:'异步通知',
						notNull: '必填',
						explain: '例如：http://www.baidu.com（务必确保外网可以访问）',
						maybe: 'iphonex',
						limit: '时间字符串，格式为yyyy-MM-dd HH:mm'
					},
					{
						tag: 'body',
						type: '',
						code:'交易描述',
						notNull: '必填',
						explain: '交易描述',
						maybe: 'iphonex',
						limit: '时间字符串，格式为yyyy-MM-dd HH:mm'
					},
					{
						tag: 'sign',
						type: '',
						code:'签名字段',
						notNull: '必填',
						explain: '参考签名说明',
						maybe: 'iphonex',
						limit: '时间字符串，格式为yyyy-MM-dd HH:mm'
					}
				],
				columns3: [{
						title: '参数名称',
						key: 'tag'
					},
					
					{
						title: '参数编码',
						key: 'code'
					},
					{
						title: "必含",
						key: 'notNull'
					},
					{
						title: "数据描述",
						key: 'explain'
					},
					{
						title: '数据类型',
						key: 'type'
					},
//					{
//						title: "更多",
//						key: 'more',
//						width: 150,
//						align: 'center',
//						render: (h, params) => {
//							return h('div', [
//								h('Button', {
//									props: {
//										type: 'primary',
//										size: 'small'
//									},
//									style: {
//										marginRight: '5px'
//									},
//									on: {
//										click: () => {
//											this.show2(params.index)
//										}
//									}
//								}, '查看详情')
//
//							]);
//						}
//					}

				],
				data3: [{
						tag: 'code',
						type: 'ASC(4)',
						code:'返回码',
						notNull: '必含',
						explain: '状态码,成功时为200',
						maybe: '200',
						maybeWord:'成功'
					},
					{
						tag: 'msg',
						type: 'ASC(1,64)',
						code:'返回描述',
						notNull: '必含',
						explain: '返回消息',
						maybe: '成功'
						

					},
					{
						tag: 'merchantUserId',
						type: 'N(15)',
						code:'商户号',
						notNull: '必含',
						explain: '平台下发给商户的商户号',
						maybe: 'iphonex'
					},
					{
						tag: 'outTradeNo',
						type: '',
						code:'交易金额',
						notNull: '必含',
						explain: '交易金额',
						maybe: 'iphonex'
					},
					{
						tag: 'amount',
						type: 'N(15)',
						code:'商户号',
						notNull: '必含',
						explain: '平台下发给商户的商户号',
						maybe: 'iphonex'
					},
					{
						tag: 'tradeNumber',
						type: 'A(28)',
						code:'交易流水号',
						notNull: '必含',
						explain: '平台交易流水号',
						maybe: 'iphonex'
					},
					{
						tag: 'payTimeout',
						type: '',
						code:'超时时间',
						notNull: '必含',
						explain: '支付超时时间',
						maybe: 'iphonex'
					},
					{
						tag: 'paymentType',
						type: '',
						code:'支付方式',
						notNull: '必含',
						explain: 'ALIPAY(支付宝), WEIPAY(微信), UNIONPAY(银联)',
						maybe: 'iphonex'
					},
					{
						tag: 'currencyType',
						type: '',
						code:'数字货币类型',
						notNull: '必含',
						explain: '',
						maybe: 'iphonex'
					},
					{
						tag: 'currencyAmount',
						type: '',
						code:'数字货币数量',
						notNull: '必含',
						explain: '',
						maybe: 'iphonex'
					},
					{
						tag: 'paymentType',
						type: '',
						code:'支付方式',
						notNull: '必含',
						explain: '',
						maybe: 'iphonex'
					},
					{
						tag: 'exchangeRate',
						type: '',
						code:'汇率',
						notNull: '必含',
						explain: '',
						maybe: 'iphonex'
					},
					{
						tag: 'paymentId',
						type: '',
						code:'支付id',
						notNull: '必含',
						explain: '平台支付方式id',
						maybe: 'iphonex'
					},
					{
						tag: 'paymentTypeName',
						type: '',
						code:'支付方式名称',
						notNull: '必含',
						explain: '',
						maybe: 'iphonex'
					},
					{
						tag: 'paymentNumber',
						type: '',
						code:'支付的账号',
						notNull: '必含',
						explain: '支付宝号，微信号，银行号',
						maybe: 'iphonex'
					},
					{
						tag: 'paymentImage',
						type: '',
						code:'支付二维码',
						notNull: '必含',
						explain: '支付二维码',
						maybe: 'iphonex'
					},
					{
						tag: 'userName',
						type: '',
						code:'用户名字',
						notNull: '必含',
						explain: '用户名字',
						maybe: 'iphonex'
					}				
				],
				columnsRemarks:[
					{
						title: '数据类型',
						key: 'type'
					},
					{
						title: "类型描述",
						key: 'des'
					}					
				],
				dataRemarks:[
					{						
						type: 'N(x)',
						des:'固定长度的数组 如 N4 允许上送 2017'						
					},
					{						
						type: 'N(x,y)',
						des:'长度在 x~y 范围之间的数字 如 N1..2 允许上送  1 或 10'						
					},
					{						
						type: 'A(x)',
						des:'固定长度位的字母 如 A5 允许上送 SALES'						
					},
					{						
						type: 'A(x,y)',
						des:'长度在 x~y 范围之间的字母 如 A1..2 允许上送 A 或 AB'						
					},
					{						
						type: 'ASC(x)',
						des:'固定长度的任意字符 '						
					},
					{						
						type: 'dd',
						des:'日'						
					},
					{						
						type: 'MM',
						des:'月 '						
					},
					{						
						type: 'yyyy',
						des:'年 '						
					},
					{						
						type: 'HH',
						des:'时(24小时进制) 0-23时 '						
					},
					{						
						type: 'mm',
						des:'分 '						
					},
					{						
						type: 'ss',
						des:'秒  '						
					}
					
				],
				datakey2_1:[
					{
						tag: 'merchantUserId',
						type: 'N(15)',
						code:'商户号',
						notNull: '必填',
						explain: '平台下发给商户的商户号'

					},
					{
						tag: 'outTradeNo',
						type: 'ASC(20)',
						code:'订单号',
						notNull: '必填',
						explain: '商户平台订单号'
					},
					{
						tag: 'sign',
						type: 'N(64)',
						code:'签名字段',
						notNull: '必填',
						explain: '参考接口权限'
					},
					{
						tag: 'tradeNumber',
						type: 'A(28)',
						code:'交易号',
						notNull: '必填',
						explain: '平台交易流水号'
					},
					{
						tag: 'timestamp',
						type: '',
						code:'时间戳',
						notNull: '必填',
						explain: '时间戳'
					},
					{
						tag: 'version',
						type: '',
						code:'版本号',
						notNull: '必填',
						explain: '固定为1.0'
						
					},
					{
						tag: 'paymentId',
						type: '',
						code:'支付方式Id',
						notNull: '必填',
						explain: '创建订单是返回的paymentId'
					}
				],
				datakey2_2:[
					{
						tag: 'code',
						type: 'ASC(4)',
						code:'返回码',
						notNull: '必含',
						explain: '状态码,成功时为200',
						maybe: '200',
						maybeWord:'成功'
					},
					{
						tag: 'msg',
						type: 'ASC(1,64)',
						code:'返回描述',
						notNull: '必含',
						explain: '返回消息',
						maybe: '成功'
					}
				],
				columnskey3_1:[],
				datakey3_1:[
					{
						tag: 'merchantUserId',
						type: 'N(15)',
						code:'商户号',
						notNull: '必填',
						explain: '平台下发给商户的商户号'

					},
					{
						tag: 'outTradeNo',
						type: 'ASC(40)',
						code:'订单号',
						notNull: '必填',
						explain: '商户平台订单号'
					},
					{
						tag: 'amount',
						type: 'N(64)',
						code:'交易金额',
						notNull: '必填',
						explain: '元为单位'
					},
					{
						tag: 'currencyAmount',
						type: '',
						code:'数字货币交易数量',
						notNull: '必填',
						explain: ''
					},
					{
						tag: 'amount',
						type: 'N(64)',
						code:'交易金额',
						notNull: '必填',
						explain: '元为单位',
						maybe: 'iphonex',
						limit: '时间字符串，格式为yyyy-MM-dd HH:mm'
					},
					{
						tag: 'tradeNumber',
						type: 'ASC(28)',
						code:'流水号',
						notNull: '必填',
						explain: '平台平台产生的交易流水号'
					},
					{
						tag: 'tradeStatus',
						type: 'ASC(4)',
						code:'返回码',
						notNull: '必填',
						explain: 'TRADE_SUCCESS代表成功，TRADE_SUCCESS代表失败'
					},
					{
						tag: 'paymentType',
						type: 'ASC(10)',
						code:'支付方式',
						notNull: '必填',
						explain: 'ALIPAY(支付宝), WEIPAY(微信), UNIONPAY(银联)'
					},
					{
						tag: 'gmtCreate',
						type: 'ASC(40)',
						code:'订单创建时间',
						notNull: '选填',
						explain: ''
					},
					{
						tag: 'gmtPayment',
						type: 'ASC(1,64)',
						code:'支付时间',
						notNull: '必填',
						explain: ''
					},
					{
						tag: 'gmtClose',
						type: '',
						code:'交易完成时间',
						notNull: '必填',
						explain: ''
					},
					{
						tag: 'timestamp',
						type: '',
						code:'时间戳',
						notNull: '必填',
						explain: ''
					},
					{
						tag: 'merchantAccount',
						type: '',
						code:'商户平台用户',
						notNull: '选填',
						explain: '商户平台用户的唯一标识'
					},
					{
						tag: 'sign',
						type: '',
						code:'签名字段',
						notNull: '必填',
						explain: '参考接口权限'
					}
				],
				datakey4_1:[
					{
						tag: 'merchantUserId',
						type: 'N(15)',
						code:'商户号',
						notNull: '必填',
						explain: '平台下发给商户的商户号'

					},
					{
						tag: 'outTradeNo',
						type: 'ASC(1,30)',
						code:'订单号',
						notNull: '必填',
						explain: '商户平台订单号'
					},
					{
						tag: 'currencyType',
						type: 'A(4)',
						code:'提币类型',
						notNull: '必填',
						explain: 'USDT',
						maybe: 'USDT'
					},
					{
						tag: 'currencyAmount',
						type: 'N(1,30)',
						code:'数字货币交易数量',
						notNull: '必填',
						explain: ''
					},
					{
						tag: 'timestamp',
						type: 'A(19)',
						code:'时间戳',
						notNull: '必填',
						explain: 'yyyy-MM-dd HH:mm:ss'
					},
					{
						tag: 'toAddress',
						type: '',
						code:'目标地址',
						notNull: '必填',
						explain: '提币到目标地址'
					},
					{
						tag: 'subject',
						type: 'ASC(1，80)',
						code:'主题',
						notNull: '必填',
						explain: '交易主题'
					},
					{
						tag: 'version',
						type: 'ASC(1，80)',
						code:'版本号',
						notNull: '必填',
						explain: '版本号固定1.0'
					},
					{
						tag: 'notifyUrl',
						type: 'ASC(11,200)',
						code:'回调地址',
						notNull: '必填',
						explain: ''
					},
					{
						tag: 'body',
						type: 'ASC(1,200)',
						code:'交易描述',
						notNull: '必填',
						explain: ''
					},
					{
						tag: 'merchantAccount',
						type: 'A(1,30)',
						code:'商户平台用户',
						notNull: '必填',
						explain: '商户平台用户的唯一标识'
					},
					{
						tag: 'sign',
						type: '',
						code:'签名字段',
						notNull: '必填',
						explain: '参考接口权限'
					}
				],
				datakey4_2:[
					{
						tag: 'code',
						type: 'ASC(4)',
						code:'返回码',
						notNull: '必含',
						explain: '状态码,成功时为200',
						maybe: '200',
						maybeWord:'成功'
					},
					{
						tag: 'msg',
						type: 'ASC(1,64)',
						code:'返回描述',
						notNull: '必含',
						explain: '返回消息',
						maybe: '成功'
					}
				]
				
			}
		},
		methods: {
			show(index) {
				this.$Modal.info({
					title: '参数详情',
					content: `值可能性：${this.data2[index].maybe}<br>参数限制：${this.data2[index].limit}<br>参数示例：${this.data2[index].maybe}`
				})
			},
			show2(index) {
				this.$Modal.info({
					title: '参数详情',
					content: `值可能性：
					<p>
						<span style="padding-right:10px;">${this.data3[index].maybe[0]}</span>|
						<span style="padding:0 10px;">${this.data3[index].maybeWord[0]}</span>
					</p>
					<p>
						<span style="padding-right:10px;">${this.data3[index].maybe[1]}</span>|
						<span style="padding:0 10px;">${this.data3[index].maybeWord[1]}</span>
					</p>
					<p>
						<span style="padding-right:10px;">${this.data3[index].maybe[2]}</span>|
						<span style="padding:0 10px;">${this.data3[index].maybeWord[2]}</span>
					</p>
					<p>
						<span style="padding-right:10px;">${this.data3[index].maybe[3]}</span>|
						<span style="padding:0 10px;">${this.data3[index].maybeWord[3]}</span>
					</p>
					
					参数示例：${this.data3[index].maybe[0]}`
				})
			}
		}

	}
</script>

<style lang="less">
	@import "../../styles/common.less";
</style>