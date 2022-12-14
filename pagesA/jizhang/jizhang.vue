<template>
  <view>
    <navbar title='记账审核' @back="back()"></navbar>
    <zxcheckbox :list="checkboxData"  :hz="hz" :mydata="mydata" @send="value" @ishz="list" @issh="list" v-if="show"></zxcheckbox>
    <view v-if="mydata" class="msj">
      <view>
        <image src="https://integral-1256268364.cos.ap-chengdu.myqcloud.com/c5b9ec0862a57c4cee9d7373806b93cab8013b3c.jpg"></image>
      </view>
      <view>未查询到数据</view>
    </view>
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
      hz:true,
      mydata:false
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
      this.mydata=false
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
          this.mydata=true
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
.msj{
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>