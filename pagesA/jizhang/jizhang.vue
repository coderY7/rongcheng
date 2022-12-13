<template>
  <view>
    <navbar title='记账审核' @back="back()"></navbar>

    <zxcheckbox :list="checkboxData" @send="value" v-if="show"></zxcheckbox>
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
    let data = {
      access_token: uni.getStorageSync('access_token'),
      vtype: 'pdlist',
      fdbh: uni.getStorageSync('fdbh')
    }
  rcjz(data).then((res) => {
    this.show=true
      uni.setStorageSync('jzlist',res.data)
      this.checkboxData=res.data
    })
  },
  data() {
    return {
       checkboxData:[],
      show:false
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

    }
  }
}
</script>

<style>

</style>