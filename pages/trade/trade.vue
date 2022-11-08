<template>
	<view>
		<navbar title='新建商品' @lefts=left() leftname="设置"></navbar>

		<view class="container">
			<uni-card>
				<view class="box">
					<view class="boxname">商品编码 :</view>
					<view class=boxinput>
						<uni-combox :candidates="candidates" placeholder="请输入商品编码" v-model="spbm" @input="change()">
						</uni-combox>
					</view>
					<view class="">
						<button @click="isinfo()" class="search">搜索</button>
					</view>
				</view>
			</uni-card>

			<uni-card v-if="itemdata[0]">
				<view>编码:{{itemdata[0].spbm}}</view>
				<view>条码:{{itemdata[0].spsmm}}</view>
				<view>名称:{{itemdata[0].spmc}}</view>
			</uni-card>

			<uni-card>
				<view v-for="(item, index) in testdata" :key="item">
					<view v-if="item.number">
						<view>{{item.key}}:</view>
						<u-input border="surround" v-model="item.value" type="digit"></u-input>
					</view>
					<view v-else-if="item.Boolean">
						<view>{{item.key}}:</view>
						<u-input border="surround" v-model="item.value" type="digit"></u-input>
					</view>
					<view v-else-if="item.combox">
						<view>{{item.key}}:</view>
						<view class="boxinput">
							<uni-section type="line">
								<uni-data-select v-model="xzzgys" :localdata="zgys">
								</uni-data-select>
							</uni-section>
						</view>
					</view>
					<view v-else>
						<view>{{item.key}}:</view>
						<u-input border="surround" v-model="item.value" type="digit"></u-input>
					</view>
				</view>
			</uni-card>

			<view class="">
				<button @click="save()" class="search">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from '../../components/nav.vue';
	import {
		rcsearchs,
		rcinfos
	} from '../../network/api.js'
	export default {
		data() {
			return {
				spbm: '', //商品编码
				candidates: [],
				itemdata: '',
				zgys: '', //主供应商
				xzzgys:'',
				testdata: {
					小类编码: '',
					商品规格: '',
					销售单位: '',
					零售价格: '',
					会员价格: '',
					最近进价: '',
					当前库存: '',
					库存状态: '',
					最大陈列: '',
					最小陈列: '',
					主供应商: '',
				}
			};
		},
		watch: {
			spbm: function(newValue, oldValue) {
				if (newValue == undefined) {
					this.itemdata = false
				}
			}
		},
		components: {
			navbar
		},
		onShow() {
			this.datachuli(this.testdata)

		},

		methods: {
			//主供应商处理
			iszgys(data) {
				let test = []
				data.forEach((item)=>{
					let data=`${item['商家名称']}-${item['商家编号']}`
					test.push(data)
				})
				console.log(test)
				this.zgys = test
				let zgys = [];
				this.zgys.forEach((item) => {
					console.log(item)
					let datas = {}
					datas.value = item;
					datas.text = item
					zgys.push(datas)
				})
				this.zgys = zgys
			},
			//数据处理
			datachuli(data) {
				//数据处理
				let test = []
				for (let [key, value] of Object.entries(data)) {
					switch (key) {
						case '零售价格':
						case '会员价格':
						case '最近进价':
						case '最大陈列':
						case '最小陈列':
						case '当前库存':
							test.push({
								key,
								value,
								number: true
							})
							break;
						case '库存状态':
							test.push({
								key,
								value,
								Boolean: true
							})
							break;
						case '主供应商':
							test.push({
								key,
								value,
								combox: true
							})
							break;
						default:
							test.push({
								key,
								value
							})
					}


				}
				this.testdata = test
			},
			async change(e) {
				console.log(e)
				await this.issearch()
				//this.spbm = e
			},
			//商品查询
			issearch() {
				let data = {
					access_token: uni.getStorageSync('access_token'), //token
					companyid: uni.getStorageSync('companyid'),
					condition: this.spbm,
					fdbh: uni.getStorageSync('fdbh'),
					findtype: "01",
					goodstype: "SP",
					userid: uni.getStorageSync('userid'),
				};
				rcsearchs(data).then((res) => {
					let candidates = []
					let itemdata = []
					res.data.forEach((item) => {
						candidates.push(item.spbm)
						let a = {
							spbm: item.spbm,
							spsmm: item.spsmm,
							spmc: item.spmc
						}
						itemdata.push(a)
					})
					this.candidates = candidates
					this.itemdata = itemdata
				})
				console.log(this.spbm)
			},
			//基本信息
			isinfo() {
				let data = {
					access_token:uni.getStorageSync('access_token'),
					fdbh: '000501',
					spbm: this.spbm,
				};
				uni.request({
					url: "http://211.149.188.114:92/mzsale/web/goods/fast/info",
					method: "POST",
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					data: data,
					success: (res) => {
						console.log('基本信息', res.data.list)
						console.log(this,res.data.list.Table3)
						this.iszgys(res.data.list.Table3)
					}
				})
			},
			//保存
			save() {
				let data = {
					"access_token":uni.getStorageSync('access_token'),
					"spbm": "0020101002",
					"spsmm": "665547552",
					"spmc": "测试",
					"gg": "1",
					"dw": "个  ",
					"sjbh": "0005010101",
					"zlbmid": "001000108",
					"nsjg": 2,
					"hyjg": 83.7,
					"pjjj": 64.56,
					"needkcbz": "T",
					"dqkcl": -1,
					"zdkcl": 4,
					"zxkcl": 1,
					"userid": "00005",
					"fdbh": "000501"
				}
				uni.request({
					url: "http://211.149.188.114:92/mzsale/web/goods/fast/dosave",
					method: "POST",
					data: data,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					success: (res) => {
						console.log('保存信息', res)

					}
				})

			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20rpx;
	}

	.box {
		display: flex;
		align-items: center;
		margin: 0 auto;
		margin-bottom: 20rpx;
		width: 100%;

		.boxname {
			font-size: 30rpx;
			width: 20%;
		}

		.boxinput {
			width: 60%;
			margin-left: 10rpx;
			margin-right: 20rpx;
		}

		.search {
			color: #FFFFFF;
			font-size: 28rpx;
			background: linear-gradient(-90deg, #52c8f1, #85d8f3);
			box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
		}

		.search:hover {
			transform: scale(1.1, 1.1);
		}
	}
</style>
