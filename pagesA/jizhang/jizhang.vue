<template>
  <view>
    <navbar title='记账审核' @back="back()"></navbar>

    <zxcheckbox :list="checkboxData"  :hz="hz" @send="value" @ishz="list" @issh="list" v-if="show"></zxcheckbox>
  </view>
</template>

<script>
import zxcheckbox from './zxcheckbox/zxcheckbox.vue'
import {rcjz} from '../../network/api'
import navbar from '../../components/nav.vue'

export default {
  components: {
    zxcheckbox,
navbar
  },
  onLoad() {
  },
  onShow() {

  },
   created(){
   this.list()
  },
  data() {
    return {
       checkboxData:[],
      show:false,
      hz:true
    }
  },
  methods: {
    back(){
      uni.switchTab({
        url: '../../pages/statement/statement'
      });
    },
    value(res) {
      console.log('内容：', res)
    },
    //列表
    list() {
      this.show=false
      let data = {
        access_token: uni.getStorageSync('access_token'),
        vtype: 'pdlist',
        fdbh: uni.getStorageSync('fdbh')
      }
      rcjz(data).then((res) => {
        //判断是否记账
        if(res.error_code=='0'){
          if(res.data[0]['过账类型']=='CHECK'){
            this.hz=false
            this.show=true
            this.checkboxData=res.data
          }
        }
        if(res.error_code=='500'){
          uni.showToast({
            title: res.message,
            duration: 2000,
            icon:'none'
          });
          setTimeout(()=>{
            this.back()
          },2000)
        }
        if(res.error_code=='0'){
          if(res.data[0]['过账类型']=='UNION'){
            this.hz=true
            this.show=true
            this.checkboxData=res.data

          }
        }

      })
    }
  }
}
</script>

<style>

</style>