<template>
  <view>
	<navbar :title='dqbb.cxmc' @lefts=left()></navbar>
    <view id="pages">
      <view class="container">
<!--        <uni-card margin="0px" spacing="0px" padding="0px 10px">-->
          <view v-for="(item,index) in cxtj">
            <view v-if="item.type=='字符'">
              <view v-if="item.colname=='商品条码'" class="box">
                <view class="box_l">{{ item.colname }}:</view>
                <view class="box_r">
                  <u-search  placeholder="请输入商品条码" searchIcon="scan" searchIconSize="30" v-model="sptm" height="30" @clickIcon="scan()" @custom="Search()" @search="Search()"></u-search>
                </view>
              </view>
              <view v-if="item.colname=='商品编码'" class="box">
<!--                <view class="box_l">{{ item.colname }}:</view>-->
<!--                <view class="box_r">-->
<!--                                    <u-input-->
<!--                                        placeholder="请输入查询内容"-->
<!--                                        border="surround"-->
<!--                                        v-model="item.defval"-->
<!--                                        clearable-->
<!--                                    ></u-input>-->
<!--                </view>-->
              </view>

              <view v-if="item.colname=='商品名称'" class="box">
                <view class="box_l">{{ item.colname }}:</view>
                <view class="box_r">
                                    <u-input
                                        placeholder="请输入查询内容"
                                        border="surround"
                                        v-model="item.defval"
                                        clearable
                                    ></u-input>
                </view>
              </view>


            </view>


            <view v-if="item.type=='开始日期'" class="box">
              <view class="box_l">{{ item.colname }}:</view>
              <view class="box_r">
                <uni-datetime-picker
                    type="date"
                    :value="start"
                    v-model="item.defval"
                    @change="startdate()"
                />
              </view>
            </view>

            <view v-if="item.type=='结束日期'" class="box">
              <view class="box_l">{{ item.colname }}:</view>
              <view class="box_r">
                <uni-datetime-picker
                    type="date"
                    :value="end"
                    v-model="item.defval"
                    @change="enddate()"
                />
              </view>
            </view>

            <view v-if="item.type=='开始DATE'" class="box">
              <view class="box_l">{{ item.colname }}:</view>
              <view class="box_r">
                <uni-datetime-picker
                    type="date"
                    :value="start"
                    v-model="item.defval"
                    @change="startdate()"
                />
              </view>
            </view>

            <view v-if="item.type=='结束DATE'" class="box">
              <view class="box_l">{{ item.colname }}:</view>
              <view class="box_r">
                <uni-datetime-picker
                    type="date"
                    :value="end"
                    v-model="item.defval"
                    @change="enddate()"
                />
              </view>
            </view>

            <view v-if="item.type=='多选下拉框'">
              <view v-if="item.colname=='分店编号'" class="box">
                <view class="box_l">{{ item.colname }}:</view>
                <view class="box_r">

                  <uni-data-select
                      v-model="item.defval"
                      :localdata="cxfdbh"
                      @change="change"
                  ></uni-data-select>

                </view>
              </view>
            </view>

            <view v-if="item.type=='下拉框'">

              <view v-if="item.colname=='分店编号'" class="box">
                <view class="box_l">{{ item.colname }}:</view>
                <view class="box_r">

                  <uni-data-select
                      v-model="item.defval"
                      :localdata="cxfdbh"
                      @change="change"
                  ></uni-data-select>

                </view>
              </view>

              <view v-if="item.colname=='商品品牌'" class="box">
                <view class="box_l">{{ item.colname }}:</view>
                <view class="box_r">

                  <uni-data-select
                      v-model="item.defval"
                      :localdata="cxsppp"
                      @change="change"
                  ></uni-data-select>

                </view>
              </view>

            </view>

            <view v-if="item.type=='查询下拉框'">

              <view v-if="item.colname=='商家合同'" class="box">
                <view class="box_l">{{ item.colname }}:</view>
                <view class="box_r">

                  <uni-data-select
                      v-model="item.defval"
                      :localdata="cxsjht"
                      @change="change"
                  ></uni-data-select>

                </view>
              </view>

            </view>

            <view v-if="item.type=='选择'">

              <view v-if="item.colname=='数据安全'" class="box">
                <view class="box_l">{{ item.colname }}:</view>
                <view class="box_r">
                  <view>{{item.defval}}</view>
                </view>
              </view>
            </view>
          </view>
<!--        </uni-card>-->

      </view>

<view class="unit3" v-if="cxtj.length!=0">
  <view class="unit3_box">
    <u-button @click="isquery()" type="primary">查询</u-button>
  </view>
</view>

  </view>


    <!--    弹出框-->
    <view>
      <u-popup :show="popupShow" @close="close" @open="open" mode="center" :round="10">
        <view>
          <scroll-view style="max-height: 60vh; margin-top: 30rpx" scroll-y="true">
            <view  class="">
              <view class="" v-for="(v, i) in searchdata" class="" @click="ispitchdata(v)">
                <view style="display: flex;justify-content: center;padding: 10px 20px;border-bottom: #6a6a6a solid 1px">
                  <view>{{v.spmc}}---</view>
                  <view>{{v.spsmm}}</view>
                  <view></view>
                </view>
              </view>
            </view>
          </scroll-view>
          <view class="closebtn" @click="popupShow=false">取消</view>
        </view>
      </u-popup>
    </view>

  </view>
</template>

<script>
import {
  getlist,
  getcolumns,
    query,
  condition,
  rcsearch,
} from '../../network/api.js';
	import navbar from '../../components/nav.vue'
import dayjs from 'dayjs'; // ES 2015


export default {
  data() {
    return {
      sptm:'',
      bgColor:'#4f99ff',
      dqbb: '', //当前报表
      start: '', //开始时间
      end: '', //结束时间
      cxtj: '',//查询条件
      tj: [],
      bdt:[],//表单头
      bdtdata:'',
      result:'',//查询结果
      cxfdbh:'',//查询分店编号
      cxsppp:'',//查询商品品牌
      cxsjht:'',//查询商家合同
      sumdata:'',//查询到的汇总

      spbm:'',
      sjbh: '',
      sjbhlist: '',
      thck: '',//仓库
      thcklist: '',
      thlx: '',//退回类型
      thlxlist: '',
      thdh:uni.getStorageSync('thdh'),//退货单
      thrq:'',//退货日期
      detail:true,//明细
      detaildata:[],//明细数据
      from:{},
      popupShow:false,
      searchdata:'',
      pitchdata:'',//选中
      remark:'',//备注
      shcg:false
    };
  },
  components: {
      navbar
    },
  onLoad(option) {
    this.cxtj = JSON.parse(option.cxdj).data //查询条件
    this.dqbb = uni.getStorageSync('dqbb') //当前报表
  },
  onShow() {
    this.start = dayjs().format('YYYY-MM-DD') // 获取当前时间
    this.end = dayjs().format('YYYY-MM-DD') // 获取当前时间
    this.cxfdbh=uni.getStorageSync('basic').FDINFO
    this.cxsppp=uni.getStorageSync('basic').PPINFO
    this.cxsjht=uni.getStorageSync('basic').SJINFO

    //处理分店下拉框数据
    let cxfdbh=[];
   this.cxfdbh.forEach((item)=>{
     let datas={}
     datas.value=item.fdbh;
     datas.text=item.fdmc
     cxfdbh.push(datas)
   })
    this.cxfdbh=cxfdbh
//处理商品品牌下拉框数据
    let cxsppp=[];
    this.cxsppp.forEach((item)=>{
      let datas={}
      datas.value=item.ppbmid;
      datas.text=item.ppmc
      cxsppp.push(datas)
    })
    this.cxsppp=cxsppp

    //处理商家合同下拉框数据
    let cxsjht=[];
    this.cxsjht.forEach((item)=>{
      let datas={}
      datas.value=item.sjbh;
      datas.text=item.sjmc
      cxsjht.push(datas)
    })
    this.cxsjht=cxsjht

    this.cxtj.forEach((item) => {
      if(item.colname=='开始日期'){
        item.defval=this.start
      }
      if(item.colname=='结束日期'){
        item.defval=this.end
      }
      if(item.colname=='分店编号'){
        item.defval=this.cxfdbh[0].value
      }
      if(item.colname=='商家合同'){
        item.defval=this.cxsjht[0].value
      }

    })
  },
  watch: {
    sptm:{
      handler:function (newValue,oldValue){
        console.log(oldValue,newValue,this)
        this.cxtj.forEach((item) => {
          if (item.colname == '商品条码') {
            item.defval=newValue
          }
        })
      },
      deep:true
    }
  },
  methods: {
// 扫码 搜索商品
    scan() {
      uni.scanCode({
        success: (res) => {
          console.log('扫码内容', res.result)
          this.sptm=res.result
          this.cxtj.forEach((item) => {
            if(item.colname=='商品条码'){
              //item.defval=this.sptm
            }
          })
          this.Search()
        },
        fail: (err) => {

        }
      });
    },
    //商品搜索
    Search(){
          let data={
            access_token: uni.getStorageSync('access_token'),
            companyid:uni.getStorageSync('companyid'),
            condition:this.sptm,
            fdbh:uni.getStorageSync('fdbh'),
            findtype:'01',
            goodstype:'SP',
            userid:uni.getStorageSync('userid')
          };
          rcsearch(data).then((res)=>{
            if(res.error_code=='0'){
              console.log('搜索到的',res)
              if(res.data.length>'0'){
                this.popupShow=true
                this.searchdata=res.data
              }
              // if(res.data.length=='1'){
              //   console.log('只有一个',res.data[0])
              //   this.ispitchdata(res.data[0])
              // }
            }
            if(res.error_code=='500'){
              this.searchdata=[]
              this.pitchdata=''
              this.from={}
              uni.showToast({
                title: '未搜索到商品',
                duration: 2000,
                icon:'none'
              });
            }

          })




    },
    //选中的商品
    ispitchdata(item) {
      this.pitchdata=item
      this.sptm=item.spsmm
      this.popupShow=false
      console.log('选中的商品', this.pitchdata);
    },
    //自定义返回
    left() {
      uni.navigateBack({
        delta: 1
      });
    },
    //开始日期
    startdate(e){
      console.log(e);
      this.start=e
    },
    //结束日期
    enddate(e){
      console.log(e);
      this.end=e

    },
    maskClick(e) {
      console.log('----maskClick事件:', e);
    },
    //列表头
    getcol() {
      let data = {
        access_token: uni.getStorageSync('access_token'),
        userid: uni.getStorageSync('userid'),
        djtype: uni.getStorageSync('dqbb').cxbh,
        fdbh: uni.getStorageSync('fdbh')
      }
      getcolumns(data).then((res) => {
        console.log('表单头', res)
        this.bdt=res.data
      })
    },
    //查询
    isquery() {
      this.tj=[];//清空之前填写
      this.cxtj.forEach((item) => {
        this.tj.push({'Convalue': item.defval, 'recordid': item.recordid})
      })
      let data = {
        djtype: uni.getStorageSync('dqbb').cxbh,
        access_token: uni.getStorageSync('access_token'),
        userid: uni.getStorageSync('userid'),
        groupid: uni.getStorageSync('groupid'),
        username: uni.getStorageSync('dlmc'),
        fdbh: uni.getStorageSync('fdbh'),
        condition: this.tj
      }
      uni.showLoading({
        title: '加载中'
      });
      getlist(data).then((res) => {
        uni.hideLoading();
        this.result=res.data
        this.sumdata=res.sumdata
        //表单头处理
        let cl=res.columns
        let a=[];
        cl.forEach((item)=>{
          a.push({name:item.title,lable:item.title,width:item.width})
        })
        this.bdt=a
        //跳转新页面
        let bdt = JSON.stringify(this.bdt)
        let result = JSON.stringify(this.result)
        let sumdata = JSON.stringify(this.sumdata)
        let creportcolumns=res.creportcolumns
        uni.setStorageSync('result',result)
        uni.navigateTo({
          url: `../../pagesA/result/result?bdt=${bdt}&result=${result}&sumdata=${sumdata}&creportcolumns=${creportcolumns}`
        });
      })

    }
  }
}
</script>

<style lang="scss">
#pages{
  margin:20rpx;
}

.box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20rpx;

  .box_l {
    font-size: 26rpx;
    width: 20%;
  }
  .box_r {
    width: 80%;
  }
}

.unit3{
  //width: 100%;
  //margin:30rpx 0;
  //display: flex;
  //justify-content:content;
  //align-items: center;
}
.unit3_box{
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0 20rpx;
  margin-top: 20px;
}
.unit4_box{
  display: flex;
  justify-content: space-around;
}
.bottom{

}
.closebtn {
  text-align: center;
  height: 30px;
  line-height: 30px;
  color: #358CC9;
  font-size: 18px;
  margin-top: 15px;
}
.uni-select__input-box{
  width: 100%;
}
</style>
