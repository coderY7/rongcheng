<template>

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


    }
  },
  onShow(){

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
      })
    },
  }
}
</script>

<style scoped>

</style>