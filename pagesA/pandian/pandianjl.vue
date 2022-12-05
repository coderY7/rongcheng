<template>
<view>
  <view>
    <uni-card margin="0" padding="0" spaacing="0">
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

        <view v-if="item.type=='下拉框' || item.type=='查询下拉框'">
          <view v-if="item.colname=='分店编号'" class="box">
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

          <view v-if="item.colname=='商家合同'" class="box">
            <view class="box_l">{{item.colname}}:</view>
            <view class="box_r">
              <uni-data-select
                  v-model="sjbh"
                  :localdata="sjbhlist"
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

          <view  class="box" v-if="item.colname=='盘点单号'">
            <view class="box_l">{{item.colname}}:</view>
            <view class="box_r">
              <u-input v-model="pddh"></u-input>
            </view>
          </view>

        </view>


      </view>
    </view>
    </uni-card>

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
  <view>{{item['盘点单号']}}</view>
  <view>{{item['单据状态']}}</view>
</view>
        <view class="unit3box">
          <view>品种数:{{item['品种数']}}</view>
          <view>分店:{{item['分店编号']}}</view>
        </view>

        <view class="unit3box">
          <view>成本总额:{{item['盘点成本总额']}}</view>
          <view>零售总额:{{item['盘点零售总额']}}</view>
        </view>
        <view class="unit3box">
          <view>损溢总数:{{item['损溢总数']}}</view>
        </view>
        <view class="unit3box">
          <view>损溢成本总额:{{item['损溢成本总额']}}</view>
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
      pddh:'',
      termdata:[,,,,,,],
      fdlist:'',
      xzfd:"",
      ddztlist:'',
      ddzt:'',
      getdata:'',
      sjbhlist:'',

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

this.condition()
  },
  methods:{
    startdate(){},
    //拉取查询条件
    condition() {
      let dataes = {
        "access_token": uni.getStorageSync("access_token"),
        "cxbh": "SPPDB_F",
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
        this.ddzt=this.ddztlist[0].value
        this.term=res.data
      })
    },
    //查询
    query(){
      let test=`'SPPDB','${this.start}','${this.end}','${this.xzfd}','${this.pddh}','${this.sptm}','${this.ddzt}'`
      console.log(test)
      let data={
        djtype:'SPPDB',
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
          url: `../pandian/pandian?pddh=${item['盘点单号']}`
        });
      }else{
        states="look"
        uni.navigateTo({
          url: `../pandian/pandianmx?pddh=${item['盘点单号']}&djzt=${item['单据状态']}`
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
  margin: 30rpx 20rpx;
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
/deep/ .uni-card{
  overflow: inherit;
}
</style>