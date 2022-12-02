<template>
	<view>
    <uni-card padding="10px 5px" margin="10px 16px">
      <view class="box">
        <u-search placeholder="请输入小类编码" v-model="xlbh" :showAction="true" @custom="isqueryall()"></u-search>
      </view>
    </uni-card>

    <view class="dalei">
<view v-for="(item,index) in daleilist"></view>

		</view>
	</view>
</template>

<script>
	import {queryall} from "../../network/api";

  export default {
		name: "table",
    components: {},

    data() {
			return {
        xlbh:'',//小类编号
        daleilist:'',
			};
		},
		onLoad(option) {
		},
		onShow() {
		},
		methods: {
			isqueryall() {
				let data = {
					"access_token": uni.getStorageSync('access_token'),
					"CompanyID": uni.getStorageSync('companyid'),
					"level": "3",
					"keys":this.xlbh,
					"ParentsID": "",
					"fdbh": uni.getStorageSync('fdbh')
				}
				queryall(data).then((res) => {
					console.log('大类', res.nodes);
this.daleilist=res.nodes
				})
			},


		}
	}
</script>

<style lang="scss">
.fypage{
  margin: 0 200rpx;
}

</style>
