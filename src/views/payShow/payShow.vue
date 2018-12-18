<template>
	<div>		
		<Card class="margin-top-10">
			<h4 slot="title">
				商户模拟操作			
			</h4>
			<div>
				<p>
					1.进入平台<span style="color:red;">入金模拟</span>,输入商户平台创建的订单号，买入金额，支付方式，主题（可理解为交易备注），点击创建订单，即可发起入金操作。
				</p>
				<p>
					2.待币商线下收到用户转账，输入订单的订单号，点击<span style="color:red;">确认付款</span>，通知币商放币。
				</p>
				<p>
					3.我们将发送短信通知币商放币。
				</p>
				<p>
					4.币商在币商平台点击确认转账，输入短信验证码执行转账操作，至此入金交易完成。
				</p>
			</div>
		</Card>
		<Card class="margin-top-10">
			<h4 slot="title">
				提币操作			
			</h4>
			<div>
				<p>
					1.进入平台<span style="color:red;">钱包地址</span>,输入目标地址，数量，短信验证码，即可发起提币操作。
				</p>
				<p>
					2.提币20USDT起提，手续费1%。
				</p>
				<p>
					3.提币一般30分钟左右到账。
				</p>				
			</div>
		</Card>
	</div>
</template>

<script>
	import Cookies from 'js-cookie';
	export default {
		data() {
			return {
				
			}
		},
		methods: {

	

		},
		created(){

		}

	}
</script>

<style lang="less">
	@import "../../styles/common.less";
</style>