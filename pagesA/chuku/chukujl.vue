<template>
<view>
  <view>
<!--    <uni-card margin="0" padding="0" spaacing="0">-->
    <view>
      <view v-for="(item,index) in term">

        <view v-if="item.type=='开始DATE'" class="box">
          <view class="box_l">{{item.colname}}:</view>
          <view class="box_r">
            <uni-datetime-picker type="date" :value="start" v-model="start"
                                 @change="startdate()" />
          </view>
        </view>

        <view v-if="item.type=='结束DATE'" class="box">
          <view class="box_l">{{item.colname}}:</view>
          <view class="box_r">
            <uni-datetime-picker type="date" :value="end" v-model="end"
                                 @change="startdate()" />
          </view>
        </view>

        <view v-if="item.type=='下拉框'" >
          <view v-if="item.codeid=='FK'" class="box">
            <view class="box_l">{{item.colname}}:</view>
            <view class="box_r">
              <uni-data-select
                  v-model="xzfd"
                  :localdata="fdlist"
              ></uni-data-select>
            </view>
          </view>

          <view v-if="item.codeid=='SK'" class="box">
            <view class="box_l">{{item.colname}}:</view>
            <view class="box_r">
              <uni-data-select
                  v-model="ddzt"
                  :localdata="ddztlist"
              ></uni-data-select>
            </view>
          </view>

        </view>

        <view v-if="item.type=='字符'">
          <view  class="box" v-if="item.colname=='商品条码'">
            <view class="box_l">{{item.colname}}:</view>
            <view class="box_r">
              <u-input v-model="sptm"></u-input>
            </view>
          </view>

          <view  class="box" v-if="item.colname=='退货单号'">
            <view class="box_l">{{item.colname}}:</view>
            <view class="box_r">
              <u-input v-model="tkdh"></u-input>
            </view>
          </view>

        </view>


      </view>
    </view>
<!--    </uni-card>-->

    <view class="unit2">
<view>
  <u-button text="查询" @click="query()" type="primary"></u-button>
</view>
      <view>

      </view>
    </view>

    <view>
      <view v-for="(item,index) in getdata":key="item" class="unit3" @click="getitem(item)">
<view class="unit3box" style="color: #4f99ff;font-size: 20px">
  <view>{{item['退货单号']}}</view>
  <view>{{item['单据状态']}}</view>
</view>
        <view class="unit3box">
          <view>类型:{{item['退换类型']}}</view>
          <view>分店:{{item['退货分店']}}</view>
        </view>

        <view class="unit3box">
          <view>零售金额:{{item['零售金额']}}</view>
          <view>退货金额:{{item['退货金额']}}</view>
        </view>
        <view class="unit3box">
          <view>退货商家:{{item['退货商家']}}</view>
        </view>

      </view>
    </view>

  </view>
</view>
</template>

<script>
import dayjs from 'dayjs';
import {
  rccondition,
  rcbasics,
  rcOrderNew,
  rcgetlist,
  rcGetlistC,
} from "@/network/api.js";
export default {
  data(){
    return {
      term:'',
      start:'',
      end:'',
      sjbh:'',
      sptm:'',
      tkdh:'',
      termdata:[,,,,,,],
      fdlist:'',
      xzfd:"",
      ddztlist:'',
      ddzt:'',
      getdata:'',
    }
  },
  onShow(){
    this.start=dayjs().format('YYYY-MM-DD')
    this.end=dayjs().format('YYYY-MM-DD')
    //处理分店下拉框数据
    this.fdlist = uni.getStorageSync('basic').FDINFO
    let cxfdbh = [];
    this.fdlist.forEach((item) => {
      let datas = {}
      datas.value = item.fdbh;
      datas.text = item.fdmc
      cxfdbh.push(datas)
    })
    this.fdlist = cxfdbh
    this.xzfd=this.fdlist[0].value
this.condition()
  },
  methods:{
    startdate(){},
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
        this.ddztlist=JSON.parse(res.data[5].tabname)
        let ddztlist = [];
        this.ddztlist.forEach((item) => {
          let datas = {}
          datas.value = item.id;
          datas.text = item.name
          ddztlist.push(datas)
        })
        this.ddztlist = ddztlist
        //this.ddzt=this.ddztlist[0].value
        this.term=res.data
      })
    },
    //查询
    query(){
      let test=`'SPTHD','${this.start}','${this.end}','${this.xzfd}','${this.tkdh}','${this.sptm}','${this.ddzt}'`
      console.log(test)
      let data={
        djtype:'SPTHD',
        access_token: uni.getStorageSync('access_token'),
        fdbh: this.xzfd,
        userid: uni.getStorageSync('userid'),
        exeStr:test
      }
      rcgetlist(data).then((res)=>{
        console.log('res',res)
        this.getdata=res.data
      })
    },
    //单项
    getitem(item){
      console.log(item)
      let states=""
      if(item['单据状态']=="未审核"){
        states="edit"
        uni.navigateTo({
          url: `../chuku/chuku?thdh=${item['退货单号']}`
        });
      }else{
        states="look"
        uni.navigateTo({
          url: `../chuku/chukumx?thdh=${item['退货单号']}&djzt=${item['单据状态']}`
        });
      }


    }
  }
}
</script>

<style scoped lang="scss">
.box{
  width: 100%;
  display: flex;
  padding: 10rpx;
  justify-content: center;
  align-items: center;
  .box_l{
    width:20%;
  }
  .box_r{
    width: 80%;
  }
}
.unit2{
  margin: 30rpx 0;
}
.unit3{
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30rpx auto;
  padding: 20rpx;
  border: silver solid 1px;
border-radius: 10px;
  .unit3box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding-bottom:5px;
  }
}
</style>