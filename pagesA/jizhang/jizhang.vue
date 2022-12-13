<template>
  <view>
    <navbar title='记账审核' @back="back()"></navbar>

    <zxcheckbox :list="checkboxData" @send="value"></zxcheckbox>
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
    this.checkboxData=uni.getStorageSync('jzlist')
  },
  data() {
    return {
       checkboxData:uni.getStorageSync('jzlist'),
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