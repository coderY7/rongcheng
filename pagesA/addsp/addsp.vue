<template>
  <view>
    <navbar title='新建商品' @lefts=left()></navbar>
    <view class="container">
      <view>
        <u-input v-model="sptm" border="surround" type="digit"></u-input>
        <view @click="scan()">扫码</view>
      </view>
      <view class="" @click="search()">查询</view>
      <view v-if="sp">
        <view>商品状态：{{spzt}}</view>
        <view>商品编码：{{sp.barcode}}</view>
        <view class="box">
          <view class="boxname">商品名称:</view>
          <view class="boxinput">
            <view v-if="spzt=='normal'">
              <view>{{sp.name}}</view>
            </view>
            <view v-else>
              <u-input v-model="sp.name" border="surround" type="digit"></u-input>
            </view>
          </view>
        </view>
        <view class="box">
          <view class="boxname">零售价格:</view>
          <view class="boxinput">
            <view v-if="spzt=='normal'">
              <view>{{sp.price}}</view>
            </view>
            <view v-else>
              <u-input v-model="sp.price" border="surround" type="digit"></u-input>
            </view>

          </view>
        </view>
        <view class="box">
          <view class="boxname">商家名称:</view>
          <view class="boxinput" @click="sjlist()">
            <uni-section  type="line">
              <uni-data-select
                  v-model="sjbh"
                  :localdata="cxsjht"
                  @change="change"
              ></uni-data-select>
            </uni-section>
          </view>
        </view>

        <view v-if="isautosetcldsp">
          <view class="box">
            <view class="boxname">是否关联商品标识:</view>
            <view class="boxinput"><u-switch v-model="autosetcldsp" @change="relevancy()"></u-switch>
            </view>
          </view>
        </view>

      </view>

      <view @click="save()" v-if="spzt!='normal'">保存</view>
    </view>
  </view>
</template>

<script>
import navbar from "../../components/nav";
import {
  rcspsearch,
  rcadd
} from '../../network/api.js'

export default {
  data() {
    return {
      sptm: '',//商品条码
      spzt: '',//商品状态
      spbm:'',
      sp:'',
      cxsjht:'',
      sjbh:'',
      isautosetcldsp:false,//是否显示开关
      autosetcldsp:false, //关联
      autosetcldspvalue:'F'
    };
  },
  components: {
    navbar
  },
  onLoad(){

  },
  onShow(){

  },
  methods: {
    relevancy(e){
      if(e){
        this.autosetcldspvalue='T'
      }else {
        this.autosetcldspvalue='F'
      }
    },
    sjlist(){
      this.cxsjht=uni.getStorageSync('basic').SJINFO
      //处理商家合同下拉框数据
      let cxsjht=[];
      this.cxsjht.forEach((item)=>{
        let datas={}
        datas.value=item.sjbh;
        datas.text=item.sjmc
        cxsjht.push(datas)
      })
      this.cxsjht=cxsjht
    },
    change(e) {
      console.log('change', e);

    },
    scan() {
// 调起条码扫描
      uni.scanCode({
        scanType: ['barCode'],
        success: (res) => {
          console.log('条码类型：' + res.scanType);
          console.log('条码内容：' + res.result);
          if (res.result) {
            this.sptm = res.result
          }
        }
      });
    },
    search() {
      let data = {
        fdbh: uni.getStorageSync('fdbh'),
        barcode: this.sptm,
        vipid: '',
        levelprice: '',
        disrate: ''
      }
      uni.request({
        url: 'http://211.149.188.114:86/api/goods/rcyg/search', //仅为示例，并非真实接口地址。
        data: data,
        method: 'POST',
        header: {
          'custom-header': 'application/json' //自定义请求头信息
        },
        success: (res) => {
          console.log('搜索商品', res.data);

          if (res.data.result == 'success') {
            this.sp=res.data.goodslist[0]

           if(this.sp.incode=='T'){
             this.isautosetcldsp=true
           }else {
             this.isautosetcldsp=false
           }
            switch (res.data.message) {
              case 'rcyg':
                this.spzt = 'rcyg'
                break;
              case 'mzsale':
                this.spzt = 'mzsale'
                break;
              case 'normal':
                this.spzt = 'normal'
                break;
              case 'allnew':
                this.spzt = 'allnew'
                uni.showModal({
                  title: '未查到商品',
                  content: '是否新增商品？',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定');
                    } else if (res.cancel) {
                      console.log('用户点击取消');
                      uni.navigateBack({
                        delta: 1
                      });
                    }
                  }
                });
                break;
              case 'other':
                this.spzt = 'other'
                break;
            }
          }
        }
      });
    },
    //保存
    save(){
      let data={
        fdbh: uni.getStorageSync('fdbh'),
      spsmm:this.sptm,
        spmc:this.sp.name,
        nsjg:this.sp.price,
        pjjj:'0',
        sjbh:this.sjbh,
        modeltype:this.spzt,
        userid:uni.getStorageSync('userid'),
        autosetcldsp:this.autosetcldspvalue
      }
      uni.request({
        url: 'http://211.149.188.114:86/api/goods/rcyg/add', //仅为示例，并非真实接口地址。
        data: data,
        method: 'POST',
        header: {
          'custom-header': 'application/json' //自定义请求头信息
        },
        success: (res) => {
          console.log('保存商品', res.data);
          if(res.data.result=='success'){
            uni.showToast({
              title: '商品保存成功',
              duration: 2000,
              icon:'none'
            });
            this.sp=''
          }else {
            uni.showToast({
              title: '商品保存失败',
              duration: 2000,
              icon:'none'
            });
            this.sp=''
          }
        }
      })

        }
  }
}
</script>

<style lang="scss">
.box {
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 20rpx;
  width: 100%;

  .boxname {
    font-size: 30rpx;
    width: 20%;
  }

  .boxinput {
    width: 60%;
    margin-left: 10rpx;
    margin-right: 20rpx;
  }
}
</style>
