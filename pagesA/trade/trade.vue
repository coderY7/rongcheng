<template>
	<view>
		<navbar title='商品修改' @lefts=left() @back="back()"></navbar>

		<view class="container">

				<view class="box">
					<view class="boxname">商品条码 :</view>
					<view class=boxinput style="z-index: 99999;">
						<uni-combox :candidates="candidates" placeholder="请输入商品条码" v-model="spsmm" @input="change()">
						</uni-combox>
					</view>
					<view class="">
						<button @click="isinfo()" class="search">搜索</button>
					</view>
				</view>


			<uni-card v-if="spmc" margin="5px" spacing="0px">
        <view  class="boxunit">
          <view class="boxunit1">商品名称:</view>
          <view class="boxunit2">
            <u-input border="surround" v-model="spmc" :disabled="true"></u-input>
          </view>
        </view>
        <view  class="boxunit">
          <view class="boxunit1">商品编号:</view>
          <view class="boxunit2">
            <u-input border="surround" v-model="spbm" type="digit" :disabled="true"></u-input>
          </view>
        </view>

			</uni-card>
				<view v-for="(item, index) in testdata" :key="item">
					<view v-if="item.table" class="box">
						<view class="boxname">{{item.key}}:</view>
						<view class="boxinput">
							<u-input border="surround" v-model="item.value" ></u-input>
						</view>
						<view class="">
							<button @click="isqueryall(item)" class="search">查询</button>
						</view>
					</view>		
					<view v-else-if="item.number" class="box">
						<view class="boxname">{{item.key}}:</view>
						<u-input border="surround" v-model="item.value" type="digit"></u-input>
					</view>
					<view v-else-if="item.Boolean" style="
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20rpx 0;
">
						<view class="boxname ">{{item.key}}:</view>
            <view>
              <u-switch v-model="item.value" @change="switchs()"></u-switch>
            </view>
					</view>
					<view v-else-if="item.combox" class="box">
						<view class="boxname">{{item.key}}:</view>
						<view style="width: 80%">
								<uni-data-select v-model="xzzgys" :localdata="zgys">
								</uni-data-select>
							
						</view>
					</view>
					<view v-else class="box">
						<view class="boxname">{{item.key}}:</view>
						<u-input border="surround" v-model="item.value" ></u-input>
					</view>
				</view>


			<view class="">
<!--				<button @click="save()" class="search">保存</button>-->
        <u-button @click="save()" text="保存" type="primary"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from '../../components/nav.vue';
	import {
		rcsearchs,
		rcinfos,
		queryall,
    rcdosave
	} from '../../network/api.js'
	export default {
		data() {
			return {
				columndata: '',
				column: '',
				result: '',
				spbm: '', //商品编码
				spmc:'',
				candidates: [],
				itemdata: '',
				zgys: '', //主供应商
				spsmm:'',
				xzzgys: '',
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
					主供应商: ''
					// 商品进价:''
				}
			};
		},
		watch: {

		},
		components: {
			navbar
		},
		onLoad() {
			this.datachuli(this.testdata)
		},
		onShow() {
			this.testdata[0].value = uni.getStorageSync('xzxlbm')
		},
		methods: {
			//库存状态
			switchs(e) {
				console.log(e)
			},
			//主供应商处理
			iszgys(data) {
				let test = []
				data.forEach((item) => {
					let data = `${item['商家名称']}-${item['商家编号']}`
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
            // case '商品进价':
              test.push({
								key,
								value,
								number: true
							})
							break;
						case '库存状态':
							test.push({
								key,
								value: false,
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
							case '小类编码':
							test.push({
								key,
								value,
								table: true
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
				 console.log(e.split('-')[0])

				 await this.issearch(e.split('-')[0])
				 //this.spbm=e
			},
			//商品查询
			issearch(e) {
				let data = {
					access_token: uni.getStorageSync('access_token'), //token
					companyid: uni.getStorageSync('companyid'),
					condition: e,
					fdbh: uni.getStorageSync('fdbh'),
					findtype: "01",
					goodstype: "SP",
					userid: uni.getStorageSync('userid'),
				};
				rcsearchs(data).then((res) => {
					if (res.error_code == '500') {
						uni.showToast({
							title: res.message,
							duration: 2000,
							icon: 'none'
						});
            this.spbm=''
					} else {
						let candidates = []
						let itemdata = []
						console.log(res.data)
						res.data.forEach((item) => {
							candidates.push(`${item.spsmm}--${item.spmc}`)
							let a = {
								spbm: item.spbm,
								spsmm: item.spsmm,
								spmc: item.spmc,
				
							}
							itemdata.push(a)
						})
						this.candidates = candidates
						this.itemdata = itemdata
            this.spbm=res.data[0].spbm
					}
				})
			},
			//基本信息
			
			isinfo() {
				let data = {
					access_token: uni.getStorageSync('access_token'),
					fdbh: uni.getStorageSync('fdbh'),
					spbm: this.spbm,
				};
				rcinfos(data).then((res)=>{
          if(res.error_code=='0'){
console.log(res)
            this.spsmm=res.list.Table[0]?res.list.Table[0]['商品条码']:''
            this.spmc=res.list.Table[0]?res.list.Table[0]['商品名称']:''
            this.testdata[10].value=res.list.Table[0]?res.list.Table[0]['主供商家']:''
            this.testdata[4].value=res.list.Table[0]?res.list.Table[0]['会员价格']:''
            this.testdata[2].value=res.list.Table[0]?res.list.Table[0]['单位']:''
            this.testdata[0].value=res.list.Table[0]?res.list.Table[0]['小类编码']:''
            this.testdata[6].value=res.list.Table[0]?res.list.Table[0]['当前库存量']:''
            this.testdata[8].value=res.list.Table[0]?res.list.Table[0]['最大陈列量']:''
            this.testdata[9].value=res.list.Table[0]?res.list.Table[0]['最小陈列量']:''
            this.testdata[5].value=res.list.Table[0]?res.list.Table[0]['最近进价']:''


            this.testdata[7].value=res.list.Table[0]?res.list.Table[0]['管理库存']:''
            this.testdata[1].value=res.list.Table[0]?res.list.Table[0]['规格']:''
            this.testdata[3].value=res.list.Table[0]?res.list.Table[0]['零售价格']:''
            if (this.testdata[7].value=="T") {
              this.testdata[7].value=true
            } else {
              this.testdata[7].value=false
            }

            this.iszgys(res.list.Table3)
          }
					if(res.error_code=='500'){
            this.testdata.forEach((item)=>{
              item.value=''
            })
            uni.showToast({
              title:res.message,
              duration: 2000,
              icon:'none'
            });
          }
				})
			},
			//保存
			save() {
				let kczt = '';
				if (this.testdata[7].value) {
					kczt = "T"
				} else {
					kczt = "F"
				}
				let data = {
					"access_token": uni.getStorageSync('access_token'),
					"spbm": this.spbm,
					"spsmm": this.spsmm, //商品条码
					"spmc": this.spmc,
					"gg": this.testdata[1].value, //规格
					"dw": this.testdata[2].value, //单位
					"sjbh": this.xzzgys.split('-')[1], //主供应商
					"zlbmid": this.testdata[0].value, //小类
					"nsjg": this.testdata[3].value, //零售价
					"hyjg": this.testdata[4].value, //会员价
					"pjjj": this.testdata[5].value, //最近价
					"needkcbz": kczt,
					"dqkcl": this.testdata[6].value, //当前库存量 -1 代表不修正
					"zdkcl": this.testdata[8].value, //最大陈列量
					"zxkcl": this.testdata[9].value, //最小陈列量
					"userid": uni.getStorageSync('userid'),
					"fdbh": uni.getStorageSync('fdbh'),
				}
        rcdosave(data).then((res)=>{
          this.spbm=''
          this.spmc=''
          this.spsmm=''
          this.testdata.forEach((item)=>{
            item.value=''
          })
          console.log(res)
          uni.showToast({
            title: res.message,
            duration: 2000,
            icon:'none'
          });
        })

			},
			//小类编码
			isqueryall(datas) {
				console.log(datas.value)
				let data = {
					"access_token": uni.getStorageSync('access_token'),
					"CompanyID": uni.getStorageSync('companyid'),
					"level": "5",
					"keys": datas.value,
					"ParentsID": "",
					"fdbh": uni.getStorageSync('fdbh')
				}
				queryall(data).then((res) => {
					console.log('小类', res);
					this.column = [{
							name: '小类编码',
							label: '小类编码',
							width: 150,
							fixed: true

						},
						{
							name: '中类编码',
							label: '中类编码',
							width: 80,
						},
						{
							name: '大类编码',
							label: '大类编码',
							width: 200,
						},
						{
							name: '部门分组',
							label: '部门分组',
							width: 200,
						}
					]
					if (res.error_code == '0') {
						let result = []
						res.nodes.forEach((item) => {
							let a = {
								'小类编码': item.title,
								'中类编码': item.ParentId,
								'大类编码': item.supermc,
								'部门分组': item.departgroupmc
							}
							result.push(a)
						})
						console.log(result)
						this.result = result
						let column = JSON.stringify(this.column);
						let results = JSON.stringify(this.result)
						uni.navigateTo({
							url: `../../pagesA/table/table?result=${results}&column=${column}`
						})
					}


				})
			},
      back(){
        uni.navigateBack({
          delta: 1
        });
      }
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20rpx;
	}
.boxunit{
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 20rpx;
  width: 100%;

  .boxunit1{
    font-size: 30rpx;
    width: 20%;
  }
  .boxunit2{
    width: 70%;
    margin-left: 10rpx;
    margin-right: 20rpx;
  }
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
    .uni-select__input-box{
      width: 100%;
    }
    .boxbool{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20rpx 0;
    }
	}
</style>
