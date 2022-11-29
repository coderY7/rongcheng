<template>
  <view>
    <navbar title='新增商品'  @back="back()"></navbar>
    <view class="container">
      <view class="unit1">
          <u-search  placeholder="请输入商品条码" searchIcon="scan" searchIconSize="30" v-model="sptm" height="35" @clickIcon="scan()" @custom="search()" @search="search()"></u-search>
      </view>

      <view >

            <view class="box">
              <view class="boxname">商品状态:</view>
              <view class="boxinput">
                <u-input v-model="ztmc" border="surround"  :disabled="true"></u-input>
            </view>
            </view>
            <view class="box">
              <view class="boxname">商品条码:</view>
              <view class="boxinput">
                <u-input v-model="sp.barcode" border="surround" type="digit" :disabled="true"></u-input>
              </view>

            </view>
            <view class="box">
              <view class="boxname">商品名称:</view>
              <view class="boxinput">
                <view v-if="spzt=='normal'">
                  <u-input v-model="sp.name" border="surround"  :disabled="true"></u-input>
                </view>
                <view v-else>
                  <u-input v-model="sp.name" placeholder="请输入商品名称" border="surround" ></u-input>
                </view>
              </view>
              <text style="color: #ff0000;font-size: 20rpx;">* (必填)</text>

            </view>
            <view class="box">
              <view class="boxname">零售价格:</view>
              <view class="boxinput">
                <view v-if="spzt=='normal'">
                  <u-input v-model="price" border="surround" type="digit" :disabled="true"></u-input>
                </view>
                <view v-else>
                  <u-input v-model="price" border="surround" type="digit" @focus="changeprice()"></u-input>
                </view>
              </view>
              <text style="color: #ff0000;font-size: 20rpx;">* (必填)</text>

            </view>

        <view class="box">
          <view class="boxname">商品进价:</view>
          <view class="boxinput">
            <view v-if="spzt=='normal'">
              <u-input v-model="sjprice" border="surround" type="digit" :disabled="true"></u-input>
            </view>
            <view v-else>
              <u-input v-model="sjprice" border="surround" type="digit"></u-input>
            </view>
          </view>
          <text style="color: #ff0000;font-size: 20rpx;">* (必填)</text>

        </view>

            <view class="box">
              <view class="boxname">商家名称:</view>
              <view class="boxinput" @click="sjlist()">
                
                  <uni-data-select
                      v-model="sjbh"
                      :localdata="cxsjht"
                      @change="change"
                  ></uni-data-select>
                
              </view>
              <text style="color: #ff0000;font-size: 20rpx;">* (必填)</text>

            </view>
            <view v-if="isautosetcldsp">
              <view class="box">
                <view class="boxname">是否关联商品标识:</view>
                <view class="boxinput"><u-switch v-model="autosetcldsp" @change="relevancy()"></u-switch>
                </view>
              </view>
            </view>





<view v-if="spzt!='normal'">
  <u-button @click="save()" text="导入" type="primary"></u-button>
</view>

      </view>

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
      ztmc:'',
      spbm:'',
      sp:'',
      cxsjht:'',
      sjbh:'',
      isautosetcldsp:false,//是否显示开关
      autosetcldsp:false, //关联
      autosetcldspvalue:'F',
      price:'',
      sjprice:''
    };
  },
  components: {
    navbar
  },
  onLoad(){

  },

  onShow(){
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
    this.sjbh=this.cxsjht[0].value
  },
  watch:{
    sptm: (newValue, oldValue)=>{
      if(oldValue!=newValue){
        let a=/(^-?[0-9]\d*$)/
        console.log(a.test(newValue));
        if(newValue!=' ' && newValue!=null  && newValue!=undefined && newValue!=''){
          if(!a.test(newValue)){
            uni.showModal({
              title: '提示',
              content: '条码只能输入数字',
              success:  (res)=> {
                if (res.confirm) {
                  console.log('用户点击确定');

                } else if (res.cancel) {

                  console.log('用户点击取消');
                }
              }
            });
          }
        }

      }
    }
  },
  methods: {
    changeprice(){
      if(this.sp.sjprice==''|| this.sp.sjprice=='0'){
        this.sjprice=this.price*0.8
      }
    },
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
            this.search()
          }
        }
      });
    },
    search() {
      if(this.sptm){
        let data = {
          fdbh: uni.getStorageSync('fdbh'),
          barcode: this.sptm,
          vipid: '',
          levelprice: '',
          disrate: ''
        }
        uni.request({
          url: 'https://rcygpos.mzsale.cn/api/goods/rcyg/search', //仅为示例，并非真实接口地址。
          data: data,
          method: 'POST',
          header: {
            'custom-header': 'application/json' //自定义请求头信息
          },
          success: (res) => {
            console.log('搜索商品', res.data);

            if (res.data.result == 'success') {
              this.sp=res.data.goodslist[0]
              this.price=this.sp.price
              if(this.sp.sjprice==''|| this.sp.sjprice=='0'){
                this.sjprice=this.price*0.8
              }else {
                this.sjprice=this.sp.sjprice

              }
              if(this.sp.incode=='T'){
                this.isautosetcldsp=true
              }else {
                this.isautosetcldsp=false
              }
              switch (res.data.message) {
                case 'rcyg':
                  this.spzt = 'rcyg'
                  this.ztmc='蓉城易购模版库'
                  break;
                case 'mzsale':
                  this.spzt = 'mzsale'
                  this.ztmc='麦子易商模版库'

                  break;
                case 'normal':
                  this.spzt = 'normal'
                  this.ztmc='已导入商品'

                  break;
                case 'allnew':
                  this.spzt = 'allnew'
                  this.ztmc='新增商品'

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
                  this.ztmc='其他模版库'

                  break;
              }
            }else {
              if(res.data.result=='warning'){
                uni.showToast({
                  title: res.data.message,
                  duration: 2000,
                  icon:'none'
                });
                this.sptm=''
              }
            }
          }
        });
      }else {
        uni.showToast({
          title: '请输入条码',
          duration: 2000,
          icon:'none'
        });
      }

    },
    //保存
    save(){
      let data={
        fdbh: uni.getStorageSync('fdbh'),
      spsmm:this.sptm,
        spmc:this.sp.name,
        nsjg:this.price,
        pjjj:this.sjprice,
        sjbh:this.sjbh,
        modeltype:this.spzt,
        userid:uni.getStorageSync('userid'),
        autosetcldsp:this.autosetcldspvalue
      }
      
      uni.request({
        url: 'https://rcygpos.mzsale.cn/api/goods/rcyg/add', //仅为示例，并非真实接口地址。
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
            this.sptm=''
            this.spzt=''
            this.ztmc=''
            this.price=''
            this.sjprice=''
          }
          if(res.data.result=='warning'){
            uni.showToast({
              title: res.data.message,
              duration: 2000,
              icon:'none'
            });
            this.sp=''
          }
          if(res.data.result=='error') {
            uni.showToast({
              title: '商品保存失败',
              duration: 2000,
              icon:'none'
            });
            this.sp=''
          }
        }
      })
        },
        back(){
          uni.navigateBack({
            delta: 1
          });
        }
  }
}
</script>

<style lang="scss">
.container{
  padding:20rpx;
}
unit1{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .unit1left{
    width: 70%;
  }
  .unit1right{
    width: 30%;
  }
}
.box {
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 20rpx;
  width: 100%;
  margin: 30rpx 0;

  .boxname {
    font-size: 30rpx;
    width: 20%;
  }

  .boxinput {
    width: 65%;
    margin-left: 10rpx;
    margin-right: 20rpx;
    //overflow: hidden;
  }
  .uni-select__input-box{
    width: 100%;
  }
}
</style>
