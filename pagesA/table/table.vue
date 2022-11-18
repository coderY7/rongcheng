<template>
	<view>
    <uni-card padding="10px 5px" margin="10px 16px">
      <view class="box">
        <u-search placeholder="请输入小类编码" v-model="xlbh" :showAction="true" @custom="isqueryall()"></u-search>
      </view>
    </uni-card>

    <view class="">
			<uni-card >
				<view style="height: 500px">
					<zb-table :columns="column" :stripe="true" @rowClick="rowClick"
						@toggleRowSelection="toggleRowSelection" @toggleAllSelection="toggleAllSelection" :border="true"
						:data="columndata"></zb-table>
				</view>
			</uni-card>
			<!--          分页器-->
			<view class="fypage">
				<uni-pagination title="" :pageSize="pageSize" show-icon="true" :total="total" :current="page"
					@change="dj()">
				</uni-pagination>
			</view>
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
				columndata: '',
				column: '',
				showdata: '', //展示数据
				pageSize: 10,
				result: '',
				page: '', //当前页
				total: '', //数据总量
				spbm: '', //商品编码
        xlbh:''//小类编号
			};
		},
		onLoad(option) {
			console.log(option)
			this.result=JSON.parse(option.result)
			this.column=JSON.parse(option.column)
		},
		onShow() {
			this.pagination()
		},
		methods: {
			dj(e) {
				console.log(e)
				this.showdata = this.result[e.current - 1]
				this.columndata = this.showdata
			},
			//点击分页
			pagination() {
				this.total = this.result.length
				let pageCount = Math.ceil(this.total / this.pageSize);
				this.total % this.pageSize == 0 ? pageCount : pageCount + 1
				let arr = this.result
				let size = this.pageSize
				const arrNum = Math.ceil(arr.length / size, 10); // Math.ceil()向上取整的方法，用来计算拆分后数组的长度
				let index = 0; // 定义初始索引
				let resIndex = 0; // 用来保存每次拆分的长度
				const result = [];
				while (index < arrNum) {
					result[index] = arr.slice(Number(resIndex), Number(size) + Number(resIndex));
					resIndex += size;
					index++;
				}
				this.result = result
				this.columndata = this.result[0]
			},
			//小类编码
			isqueryall() {
				let data = {
					"access_token": uni.getStorageSync('access_token'),
					"CompanyID": uni.getStorageSync('companyid'),
					"level": "5",
					"keys":this.xlbh,
					"ParentsID": "",
					"fdbh": uni.getStorageSync('fdbh')
				}
				queryall(data).then((res) => {
					console.log('小类', res);

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
					this.pagination()
				})
			},
			rowClick(row, index) {
				console.log(row, index)
				//选择小类
				uni.setStorageSync('xzxlbm',row.小类编码.split(".")[0])
				uni.navigateBack({
					delta: 1
				});

			},


		}
	}
</script>

<style lang="scss">
.fypage{
  margin: 0 200rpx;
}

</style>
