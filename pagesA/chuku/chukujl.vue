<template>
<view>
  <view>
    <uni-card margin="0" padding="0" spaacing="">
    <view>
      <view></view>
    </view>
    </uni-card>
  </view>
</view>
</template>

<script>
import dayjs from 'dayjs';
import {
  rccondition,
  rcbasics,
  rcOrderNew,
  rcgetlist
} from "@/network/api.js";
export default {
  data(){
    return {
      term:''
    }
  },
  onShow(){
this.condition()
  },
  methods:{
    //拉取查询条件
    condition() {
      let dataes = {
        "access_token": uni.getStorageSync("access_token"),
        "cxbh": "SPTHD_F",
        "fdbh": uni.getStorageSync("fdbh"),
        "userid": uni.getStorageSync("userid"),
        "username": uni.getStorageSync("dlmc"),
      }
      rccondition(dataes).then((res) => {
        console.log('出库单条件',res)
        this.term=res.data
      })
    },
  }
}
</script>

<style scoped>

</style>