<script>
	
	export default {
		onLaunch: function(option) {
			console.log('App Launch',option)
      uni.setStorageSync('computerid', '47bb955c');
      uni.setStorageSync('model', 'Test');
			uni.setStorageSync('sn', 'MOPMPI-MLKKNG-KFOLNF-QINPHH');
			uni.setStorageSync('appid', 'wx59bb9c5e21b4d3c4');
      uni.setStorageSync("rkdh", '')
      uni.setStorageSync("thdh", '')
      uni.setStorageSync("pddh", '')
    },
		onShow: function(options) {
      let pdlxlist=[
        {
          "id":"HAND",
          "name":"手工录入"
        },
        {
          "id":"POS",
          "name":"前台盘点"
        },
        {
          "id":"HWB",
          "name":"货位盘点"
        },
        {
          "id":"PDJ",
          "name":"手持盘点机"
        },
        {
          "id":"DYPD",
          "name":"动态手工盘点"
        }
      ]
      uni.setStorageSync('pdlxlist',pdlxlist)

      //console.log('从二维码中取的数据', options)
      if(options.query.scene){
        let name = options.query.scene
        uni.setStorageSync('codetest',name) //存储二维码数据
        let now = name.split("-")
        let codeparam = []
        // now.forEach(item => {
        //   codeparam.push(parseInt(item, 16).toString(10))
        // })
        console.log('从二维码中取的数据',now)
        uni.setStorageSync('userid', now[0]);
        uni.setStorageSync('fdbh', now[1]);
        uni.setStorageSync('companyid', now[2]);
      }



      const updateManager = wx.getUpdateManager()

      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate)
      })

      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })

      updateManager.onUpdateFailed(function () {
        // 新版本下载失败
      })

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
