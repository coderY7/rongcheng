<template>
	<view class="container">

    <navbar title='功能'></navbar>

    <view class="unit1">
			<ul>
				<li v-for="(item,index) in showlist" :key="index">
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
      rcOrderNew,
    rcjz,
	} from "../../network/api.js";
	import navbar from '../../components/nav.vue'
	export default {
		data() {
			return {
				urltest:"../../static/logo.png",
				bgColor: '#4f99ff', //动态背景
				Alllist: [],
        showlist:[],
				title: '报表查询',
        authority:''
			};
		},
		components: {
		    navbar
		  },
		onLoad() {
this.Alllist=[
    {cxmc:'新增商品',url:'https://integral-1256268364.cos.ap-chengdu.myqcloud.com/d265a362ce490577e179dfaac3406aa83e2b72ca.jpg',show:false},
  {cxmc:'商品修改',url:'https://integral-1256268364.cos.ap-chengdu.myqcloud.com/191e07a5f11667613274308cbc78a1c8080ce79e.jpg' ,show:false},
  {cxmc:'商品入库',url:'https://integral-1256268364.cos.ap-chengdu.myqcloud.com/7c008083cec15340bb84b85d096b63a9ad9869be.jpg' ,show:false},
  {cxmc:'商品退库',url:'https://integral-1256268364.cos.ap-chengdu.myqcloud.com/b96c3911ad158a905b2dd6c7de6e7c4a8202f843.jpg' ,show:false},
  {cxmc:'商品盘点',url:'https://integral-1256268364.cos.ap-chengdu.myqcloud.com/482ef74195927226bedd797c613423587c40ee5f.jpg' ,show:false},
  {cxmc:'盘点过账',url:'https://integral-1256268364.cos.ap-chengdu.myqcloud.com/0bf6b6e34e0d634778ac3492c932041f8e2a69a4.jpg' ,show:false},
  {cxmc:'销售财务日报表',url:'https://integral-1256268364.cos.ap-chengdu.myqcloud.com/1314a99b688a237bf3c640062c2cb1a20df42b19.jpg' ,show:false},
  {cxmc:'商品正常库存量分析',url:'https://integral-1256268364.cos.ap-chengdu.myqcloud.com/0f39fc8c14a0f30a62805e5bf612a21f067e326f.jpg' ,show:false},
  {cxmc:'入库单按单据汇总',url:'https://integral-1256268364.cos.ap-chengdu.myqcloud.com/fd16a5018148a5bd7ee52f2f2c23f17d54a3d714.jpg' ,show:false},
  {cxmc:'退货单按单据汇总',url:'https://integral-1256268364.cos.ap-chengdu.myqcloud.com/54e08d4787eabf9f15d994924a7d33e2696e01ad.jpg' ,show:false},
  {cxmc:'商品销售额汇总分析',url:'https://integral-1256268364.cos.ap-chengdu.myqcloud.com/734a3fe3bba6f7459ba20dc5f2d715bfa8190948.jpg' ,show:false},]
		},
    onShow(){
this.authority=uni.getStorageSync('authority').split(';')
      if(this.authority.indexOf('999998')!='-1'){
        this.Alllist[0].show=true
      }
      if(this.authority.indexOf('999998')!='-1'){
        this.Alllist[1].show=true
      }
      if(this.authority.indexOf('SPKF07')!='-1'){
        this.Alllist[2].show=true
      }
      if(this.authority.indexOf('SPKF08')!='-1'){
        this.Alllist[3].show=true
      }
      if(this.authority.indexOf('PPD17')!='-1'){
        this.Alllist[4].show=true
      }
      if(this.authority.indexOf('PPD06')!='-1'){
        this.Alllist[5].show=true
      }
      if(this.authority.indexOf('RB007APP')!='-1'){
        this.Alllist[6].show=true
      }
      if(this.authority.indexOf('KF011APP')!='-1'){
        this.Alllist[7].show=true
      }
      if(this.authority.indexOf('PS059APP')!='-1'){
        this.Alllist[8].show=true
      }
      if(this.authority.indexOf('HZ012APP')!='-1'){
        this.Alllist[9].show=true
      }
      if(this.authority.indexOf('RB003APP')!='-1'){
        this.Alllist[10].show=true
      }


      this.showlist=[]
      this.Alllist.forEach((item)=>{
        if(item.show){
          this.showlist.push(item)
        }
      })
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
          if(uni.getStorageSync('xrkdh')){
            uni.navigateTo({
              url: `../../pagesA/rcruku/rcruku`
            });
          }else {
            uni.navigateTo({
              url: `../../pagesA/rcruku/rcruku`
            });
          }

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
		if(item.cxmc=='商品盘点'){
		  uni.navigateTo({
		    url: '../../pagesA/pandian/pandian'
		  })
		}
		if(item.cxmc=='盘点过账'){
		  uni.navigateTo({
		    url: '../../pagesA/jizhang/jizhang'
		  })
		}
        if(item.cxmc=='销售财务日报表'){

          let data={
            access_token:uni.getStorageSync('access_token'),
            cxbh:'RB007APP'
          }
          condition(data).then((res)=>{
            console.log('res',res.data)
            let items = JSON.stringify(res)
            uni.setStorageSync('dqbb',{cxmc:'销售财务日报表',cxbh:'RB007APP'})
            uni.navigateTo({
              url: `../../pagesA/condition/condition?cxdj=${items}`
            })
          })
        }
        if(item.cxmc=='商品正常库存量分析'){
          let cxbh='KF011APP'
          let data={
            access_token:uni.getStorageSync('access_token'),
            cxbh:cxbh
          }
          condition(data).then((res)=>{
            console.log('res',res.data)
            let items = JSON.stringify(res)
            uni.setStorageSync('dqbb',{cxmc:'商品正常库存量分析',cxbh:'KF011APP'})

            uni.navigateTo({
              url: `../../pagesA/condition/condition?cxdj=${items}`
            })
          })
        }
        if(item.cxmc=='入库单按单据汇总'){
          let cxbh='PS059APP'
          let data={
            access_token:uni.getStorageSync('access_token'),
            cxbh:cxbh
          }
          condition(data).then((res)=>{
            console.log('res',res.data)
            let items = JSON.stringify(res)
            uni.setStorageSync('dqbb',{cxmc:'入库单按单据汇总',cxbh:'PS059APP'})

            uni.navigateTo({
              url: `../../pagesA/condition/condition?cxdj=${items}`
            })
          })
        }
        if(item.cxmc=='退货单按单据汇总'){
          let cxbh='HZ012APP'
          let data={
            access_token:uni.getStorageSync('access_token'),
            cxbh:cxbh
          }
          condition(data).then((res)=>{
            console.log('res',res.data)
            let items = JSON.stringify(res)
            uni.setStorageSync('dqbb',{cxmc:'退货单按单据汇总',cxbh:'HZ012APP'})

            uni.navigateTo({
              url: `../../pagesA/condition/condition?cxdj=${items}`
            })
          })
        }
        if(item.cxmc=='商品销售额汇总分析'){
          let cxbh='RB003APP'
          let data={
            access_token:uni.getStorageSync('access_token'),
            cxbh:cxbh
          }
          condition(data).then((res)=>{
            console.log('res',res.data)
            let items = JSON.stringify(res)
            uni.setStorageSync('dqbb',{cxmc:'商品销售额汇总分析',cxbh:'RB003APP'})

            uni.navigateTo({
              url: `../../pagesA/condition/condition?cxdj=${items}`
            })
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
    //background: url('../../static/shilu-login/logobj.png') no-repeat;
    //background-position: center center;
    //background-attachment: fixed;
  }
  image{
    height: 100%;
    width: 100%;
  }
</style>
