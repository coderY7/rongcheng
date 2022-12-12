<template>
	<view>
        <zxcheckbox @send="value" :list="checkboxData" ></zxcheckbox>
    </view>
</template>

<script>
    import zxcheckbox from './zxcheckbox/zxcheckbox.vue'
    import {rcjz} from '../../network/api'
    export default {
        components: {
            zxcheckbox
        },
        onLoad() {
          this.list()
        },
        onShow() {
        },
		data() {
			return {
                checkboxData: [],
			}
		},
		methods: {
            value(res) {
                console.log('内容：', res)
            },
            //列表
      list(){
              let data={
                access_token:uni.getStorageSync('access_token'),
                vtype:'pdlist',
                fdbh:uni.getStorageSync('fdbh')
              }
        rcjz(data).then((res)=>{
          console.log(res.data)
          this.checkboxData=res.data
        })

      }
		}
	}
</script>

<style>
    
</style>