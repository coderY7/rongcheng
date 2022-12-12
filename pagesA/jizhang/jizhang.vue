<template>
  <view>
    <zxcheckbox :list="checkboxData" @send="value"></zxcheckbox>
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
  },
  onShow() {
    this.checkboxData=uni.getStorageSync('jzlist')
  },
  data() {
    return {
       checkboxData:[],
    }
  },
  methods: {
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