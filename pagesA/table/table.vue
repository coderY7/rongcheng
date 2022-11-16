<template>
	<view>
		<view class="">
			<uni-card title="固定多列和表头">
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
	export default {
		name: "table",
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
			isqueryall(datas) {
				console.log(datas.value)
				let data = {
					"access_token": uni.getStorageSync('access_token'),
					"CompanyID": uni.getStorageSync('companyid'),
					"level": "5",
					"keys": "",
					"ParentsID": "",
					"fdbh": uni.getStorageSync('fdbh')
				}
				queryall(data).then((res) => {
					console.log('小类', res);
					this.column = [{
							name: '小类编码',
							label: '小类编码'
						},
						{
							name: '中类编码',
							label: '中类编码'
						},
						{
							name: '大类编码',
							label: '大类编码'
						},
						{
							name: '部门分组',
							label: '部门分组'
						}
					]
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
				// uni.showToast({
				// 	icon: 'none',
				// 	duration: 2000,
				// 	title: row
				// })
			},
		}
	}
</script>

<style lang="scss">

</style>
