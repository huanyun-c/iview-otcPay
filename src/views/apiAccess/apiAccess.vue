<template>
	<div>
		<Card class="margin-top-10">
			<h4 slot="title">
				商户秘钥
				<i-button type="primary" :loading="loading" @click='openMsg'>更换秘钥</i-button>
			</h4>
			<i-table border :columns="columns1" :data="data1" size="large"></i-table>
		</Card>
		<Card class="margin-top-10">
			<h4 slot="title">
				签名机制			
			</h4>
			<div>
				<p>
					为保证数据在传输过程中，数据的真实性，保证数据在传输过程中不被结果或篡改，接口需要对接收的数据进行签名及验证签名校验，我方对数据签名使用算法为：
					<span style="color:red;font-weight: 600;">SHA256WithRSA算法</span> 提交给我方的数据需要通过私钥对交易报文数据进行签名。
				</p>
			</div>
		</Card>
		<Card>
			<div>
				<p>
					签名原始串按以下方式组装成字符串：
				</p>
				<p>
					1、除 sign 字段外，所有参数按照字段名的 ascii  码从小到大排序后使用 QueryString 的格式（即key1=value1&key2=value2…）拼接而成。
				</p>
				<p>
					2、签名原始串中，字段名和字段值都采用原始值，不进行 URL Encode。<span style="color:red;font-weight: 600;">签名值需要进行URL Encode.</span>
				</p>
				<p>
					3、返回的应答或通知消息可能会由于升级增加参数，请验证应答签名时注意允许这种情况。
				</p>
				<i>
					<pre>
						
						举例：
						调用某个接口，接口有如下字段：	
							
						{
							mch_create_ip:'127.0.0.1',
							mch_id:'001075552110006',
							nonce_str:'1409196838',
							notify_url:'http://227.0.0.1:9001/javak/sds?123&23=3',
							out_trade_no:'141903606228',
							service:'pay.weixin.jspay',
							sign:'83684D9546F261997EFF2ECFAC372583',
							total_fee:'1'
						}
						
						正确的签名字段排序为：
						body=测试支付
						&mch_create_ip=127.0.0.1&mch_id=001075552110006&nonce_str=1409196838&notify_url
						=http://227.0.0.1:9001/javak/sds?123&23=3&out_trade_no=141903606228&service=pay.
						weixin.jspay&total_fee=1

					</pre>
				</i>
			</div>
			
		</Card>
		<Card class="margin-top-10">
			<h4 slot="title">
				签名算法	(目前暂只支持SHA256WithRSA签名)		
			</h4>
			<div>
				<h2>
					SHA256WithRSA签名
				</h2>
				<p>
					SHA256即安全哈希算法（Secure Hash Algorithm），用于签名；RSA是目前最有影响力的公钥加密算法。
				</p>
				<p>
					注意：签名时将字符串转化成字节流时指定的编码字符集统一为UTF-8。签名字段不包含sign字段。
				</p>
				<p>
					SHA256WithRSA签名计算公式：sign =  base64编码(原字符串利用私钥进行SHA256WithRSA签名)
				</p>
			</div>
		</Card>
		<Modal v-model="modal" title="获取验证码" ok-text="确定提交" @on-ok="changeKey">
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
	import Cookies from 'js-cookie';
	export default {
		data() {
			return {
				self: this,
				modal:false,
            	msgCode:'',
            	smsMsg:'获取验证码',
                count: 60,
                disabled: false,
                phone:'',
				loading:false,
				columns1: [
				{
						title: '参数',
						key: 'tag'
					},
					{
						title: '内容',
						key: 'content'
					}

				],
				data1: [
				{
						tag: '商户id',
						content: ''

				},
				{
						tag: 'privateKey私钥',
						content: ''

					},
					{
						tag: 'publicKey公钥',
						content: ''
					}
				]
				
				
			}
		},
		methods: {
			getPersonKey(){
				this.$api.post('/ContactsImprove/api/merchantInfo', {
						
				}, response => {
					
					if(response.status >= 200 && response.status < 300) {					
						if(response.data.code == 200){
							const data = response.data;
							this.data1[0].content =  data.data.userId;
							this.data1[1].content =  data.data.privateKey;
							this.data1[2].content =  data.data.publicKey;								
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
			openMsg(){
				//弹出验证码            	
            	this.modal = true;
			},
			changeKey(){
				this.loading = true;
				this.$api.post('/ContactsImprove/api/produceKey', {
					keySize:2048,
					smsCode:this.msgCode
				}, response => {
					this.loading = false;
					console.log(response)
					if(response.status >= 200 && response.status < 300) {					
						if(response.data.code == 200){
							const data = response.data;
							//console.log(data);
							this.$Message.success('更换成功');		
							this.data1[0].content =  data.data.userId;
							this.data1[1].content =  data.data.privateKey;
							this.data1[2].content =  data.data.publicKey;									
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
			this.getPersonKey();
			
			let phone = Cookies.get('user');
				
			this.phone = phone;
		}

	}
</script>

<style lang="less">
	@import "../../styles/common.less";
</style>