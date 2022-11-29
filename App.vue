<script>
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
      uni.setStorageSync('computerid', '47bb955c');
      uni.setStorageSync('model', 'Test');
			uni.setStorageSync('sn', 'MOPMPI-MLKKNG-KFOLNF-QINPHH');
			uni.setStorageSync('appid', 'wx59bb9c5e21b4d3c4');
    },
		onShow: function() {
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	
	/*每个页面公共css */
</style>
