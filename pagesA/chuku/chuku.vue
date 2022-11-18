<template>
  <view>
<!--    <uni-card>-->
      <view class="box">
        <view class="box_l">商家编号:</view>
        <view class="box_r">
          <uni-data-select
              v-model="sjbh"
              :localdata="sjbhlist"
              @change="issjbh()"
          ></uni-data-select>
        </view>
      </view>

      <view>
        <view>退货仓库:</view>
        <view>
          <uni-data-select
              v-model="thck"
              :localdata="thcklist"
              @change="isthck()"
          ></uni-data-select>
        </view>
      </view>

      <view>
        <view>退换类型:</view>
        <view>
          <uni-data-select
              v-model="thlx"
              :localdata="thlxlist"
              @change="isthlx()"
          ></uni-data-select>
        </view>
      </view>

<!--    </uni-card>-->


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
  components: {},
  data() {
    return {
      sjbh: '',
      sjbhlist: '',
      thck: '',//仓库
      thcklist: '',
      thlx: '',//退回类型
      thlxlist: ''
    }
  },
  onLoad() {

  },
  onReady() {

  },
  onShow() {
    //处理仓库下拉框数据
    this.sjbhlist = uni.getStorageSync('basic').SJINFO
    let sjbhlist = [];
    this.sjbhlist.forEach((item) => {
      let datas = {}
      datas.value = item.sjbh;
      datas.text = item.sjmc
      sjbhlist.push(datas)
    })
    this.sjbhlist = sjbhlist
    this.sjbh = this.sjbhlist[0].value
    //处理仓库下拉框数据
    this.thcklist = uni.getStorageSync('basic').CKINFO
    let thcklist = [];
    this.thcklist.forEach((item) => {
      let datas = {}
      datas.value = item.ckbmid;
      datas.text = item.ckmc
      thcklist.push(datas)
    })
    this.thcklist = thcklist
    this.thck = this.thcklist[0].value

    //处理退货类型下拉框数据
    this.thlxlist = uni.getStorageSync('basic').TKLX
    let thlxlist = [];
    this.thlxlist.forEach((item) => {
      let datas = {}
      datas.value = item.tklxid;
      datas.text = item.tklxmc
      thlxlist.push(datas)
    })
    this.thlxlist = thlxlist
    this.thlx = this.thlxlist[0].value


    this.condition()
    this.new()
  },
  methods: {
    //创建出库单
    new() {
      let data = {
        access_token: uni.getStorageSync('access_token'),
        djtype: 'SPTHD',
        fdbh: uni.getStorageSync('fdbh'),
        userid: uni.getStorageSync('userid')
      }
      rcOrderNew(data).then((res) => {
        console.log('退货单创建成功', res)
      })

    }
  }

}
</script>

<style lang="scss" scoped>
.box{
  width: 100%;
  display: flex;
  .box_l{
    font-size: 30rpx;
   flex:2;
  }
  .box_r{
    flex: 5;
  }
}
.uni-card{
  overflow: initial;
}
.uni-select__input-box{
  //overflow: hidden;
  width: 100%;
}
</style>

