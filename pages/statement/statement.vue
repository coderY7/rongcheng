<template>
	<view class="container">

    <navbar title='功能'></navbar>

    <view class="unit1">
			<ul>
				<li v-for="(item,index) in Alllist" :key="index">
					<view class="unit1_box" @click="enter(item)">
						<view class="boxs">
							<view class="boxsimg">
                <image :src="item.url"></image>
							</view>
							<view class="boxsname">{{item.cxmc}}</view>
						</view>
					</view>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	import {
		reportForm,
		condition,
      rcOrderNew
	} from "../../network/api.js";
	import navbar from '../../components/nav.vue'
	export default {
		data() {
			return {
				bgColor: '#4f99ff', //动态背景
				Alllist: [],
				title: '报表查询',
			};
		},
		components: {
		    navbar
		  },
		onLoad() {
			//this.isreportForm()
      //{cxmc:'商品出库',url:'https://integral-1256268364.cos.ap-chengdu.myqcloud.com/b96c3911ad158a905b2dd6c7de6e7c4a8202f843.jpg'}
this.Alllist=[{cxmc:'新增商品',url:'https://integral-1256268364.cos.ap-chengdu.myqcloud.com/d265a362ce490577e179dfaac3406aa83e2b72ca.jpg'},{cxmc:'商品修改',url:'https://integral-1256268364.cos.ap-chengdu.myqcloud.com/191e07a5f11667613274308cbc78a1c8080ce79e.jpg'},{cxmc:'商品入库',url:'https://integral-1256268364.cos.ap-chengdu.myqcloud.com/7c008083cec15340bb84b85d096b63a9ad9869be.jpg'},{cxmc:'商品退库',url:'https://integral-1256268364.cos.ap-chengdu.myqcloud.com/b96c3911ad158a905b2dd6c7de6e7c4a8202f843.jpg'}]
		},
		methods: {
			//获取报表
			isreportForm() {
				let reportFormdata = {
					access_token: uni.getStorageSync('access_token'),
					userid: uni.getStorageSync('userid'),
				}
				reportForm(reportFormdata).then((res) => {
					console.log('报表查询', res)
					this.Alllist = res.data
				})
			},
			enter(item) {
				console.log(item)
				if(item.cxmc=='商品修改'){
					uni.navigateTo({
						url: '../../pagesA/trade/trade'
					})
				};
				if(item.cxmc=='库存查询'){
					uni.navigateTo({
						url: '../../pagesA/condition/condition'
					})
				};
        if(item.cxmc=='商品入库'){
          // 创建新单
            let dataes={
              "access_token": uni.getStorageSync("access_token"),
              "djtype": "SPRKD",
              "fdbh": uni.getStorageSync("fdbh"),
              "userid": uni.getStorageSync("userid"),
            }
            rcOrderNew(dataes).then((res) => {
              uni.setStorageSync('djbh',res.djbh)
              // console.log("orderNew res",res)
              if(res.error_code==0){
                uni.navigateTo({
                  url: `../../pagesA/ruku/rkxd?djbh=${res.djbh}&state=add`
                });
              }else{
                this.$refs.uToast.show({
                  type:"error",
                  message: res.message
                })
              }
            }).catch((err) => {
              console.log(err)
            })


        };
        if(item.cxmc=='新增商品'){
          uni.navigateTo({
            url: '../../pagesA/addsp/addsp'
          })
        }
        if(item.cxmc=='商品退库'){
          uni.navigateTo({
            url: '../../pagesA/chuku/chuku'
          })
        }
			
			},

      //设置
      left() {

        uni.navigateTo({
          url: '../../pages/myset/myset'
        })
      },
		}
	}
</script>

<style lang="scss">
	.container {
		
	}

	ul {
		padding: 0;
	}

	li {
		list-style: none;
		text-align: center;
		border-radius: 5px;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
	}

	li {
		width: 26%;
		height: 180rpx;
		margin-right: 11%;
		font-size: 22rpx;
		margin-bottom: 5%;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}

	li:nth-of-type(3n) {
		margin-right: 0;
	}

	li:nth-of-type(n+99) {
		margin-bottom: 0;
	}

	.unit1 {
		margin: 50rpx 20rpx;
		
	}

	.unit1_box {
		width: 100%;
		height: 100%;
		
		.boxs {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.boxsimg {
				width: 80rpx;
				height: 80rpx;
				border-radius: 5rpx;
				margin-bottom: 20rpx;
			}
			.boxsname{
				font-size: 30rpx;
			}
		}
	}
  page{
    background: url('../../static/shilu-login/logobj.png') no-repeat;
    background-position: center center;
    background-attachment: fixed;
  }
  image{
    height: 100%;
    width: 100%;
  }
</style>
