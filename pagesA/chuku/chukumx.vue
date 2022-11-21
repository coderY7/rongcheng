<template>

</template>

<script>
import dayjs from 'dayjs';
import {
  rccondition,
  rcbasics,
  rcOrderNew,
  rcgetlist,
  rcGetlistC
} from "@/network/api.js";
export default {
  data(){
    return {

thdh:''
    }
  },
  onLoad(option){
    this.thdh=option.thdh
  },
  onShow(){
this.getlist()
  },
  methods:{
    getlist(){
      let data={
        "access_token": uni.getStorageSync("access_token"),
        "djbh": this.thdh,
        "djtype": "SPTHD",
        "fdbh": uni.getStorageSync("fdbh"),
        "userid": uni.getStorageSync("userid"),
        "ztbz": "F"
      }
      rcGetlistC(data).then((res)=>{
        console.log('明细列表',res)
        this.detaildata=res.data
      })
    },
  }
}
</script>

<style scoped>

</style>