<template>
  <view>
    <navbar title='盘点' @back="back()"></navbar>

    <view class="nav">
    <view @click="jl()">
      <u-button text="历史记录" type="primary" size="small"></u-button>
    </view>
      <view @click="cknew()">
        <u-button text="创建新单" type="primary" size="small"></u-button>
      </view>
    </view>
    <view class="unit1">
      <view class="head">
        <view>盘点单:{{pddh}}</view>
        <view v-if="detail" class="dhliang" @click="isdetail()">
          明细:{{detaildata.length}}
        </view>
      </view>
      <view class="container">
        <uni-card margin="0px" spacing="0px" padding="0px 10px">
<!--          <view class="box">-->
<!--            <view class="box_l">商家编号:</view>-->
<!--            <view class="box_r">-->
<!--              <uni-data-select-->
<!--                  v-model="sjbh"-->
<!--                  :localdata="sjbhlist"-->

<!--              ></uni-data-select>-->
<!--            </view>-->
<!--          </view>-->

          <view class="box">
            <view class="box_l">盘点仓库:</view>
            <view class="box_r">
              <uni-data-select
                  v-model="thck"
                  :localdata="thcklist"

              ></uni-data-select>
            </view>
          </view>

          <view class="box">
            <view class="box_l">盘点类型:</view>
            <view class="box_r">
<!--              <uni-data-select-->
<!--                  v-model="pdlx"-->
<!--                  :localdata="pdlxlist"-->
<!--              ></uni-data-select>-->
              <u-input
                  v-model="pdlxlist[3].text"
                  border="bottom"
                  :disabled="true"
              ></u-input>
            </view>
          </view>


          <view class="box">
            <view class="box_l">商品条码:</view>
            <view class="box_r">
              <u-search  placeholder="请输入商品条码" searchIcon="scan" searchIconSize="30" v-model="spbm" height="30" @clickIcon="scan()" @custom="Search()" @search="Search()"></u-search>
            </view>
          </view>

          <view class="box" v-if="pitchdata">
            <view class="box_l">商品名称:</view>
            <view class="box_r">
              <u-input
                  v-model="pitchdata.spmc"
                  border="bottom"
                  :disabled="true"
              ></u-input>
            </view>
          </view>

          <view class="box" v-if="pitchdata">
            <view class="box_l">商品编码:</view>
            <view class="box_r">
              <u-input
                  placeholder=""
                  border="bottom"
                  v-model="from.spbm"
                  :disabled="true"

              ></u-input>
            </view>
          </view>

                    <view class="box" v-if="pitchdata">
                      <view class="box_l">零售价格:</view>
                      <view class="box_r">
                        <u-input
                            type="digit"
                            placeholder=""
                            border="bottom"
                            v-model="from.nsjg"
                            :disabled="true"
                        ></u-input>
                      </view>
                    </view>

          <view class="box" v-if="pitchdata">
            <view class="box_l">最近进价:</view>
            <view class="box_r">
              <u-input
                  type="digit"
                  placeholder=""
                  border="bottom"
                  v-model="from.cbjg"
                  :disabled="true"
              ></u-input>
            </view>
          </view>

          <view class="box">
            <view class="box_l">盘点数量:</view>
            <view class="box_r">
              <u-input
                  type="digit"
                  placeholder="请输入数量"
                  v-model="from.spsl"
                  border="bottom"
                  clearable
              ></u-input>
            </view>
          </view>





          <view class="box">
            <view class="box_l">备注信息:</view>
            <view class="box_r">
              <u-input
                  placeholder="请输入备注信息(可不填)"
                  border="bottom"
                  v-model="remark"
                  clearable
              ></u-input>
            </view>
          </view>

        </uni-card>

      </view>
    </view>
    <view class="unit2">
      <u-button text="保存商品" @click="added()" type="primary" :disabled="shcg"></u-button>
    </view>

    <view class="unit3">
      <view class="unit3_l"><u-button type="primary" text="整单审核" @click="ischeck()"></u-button></view>
      <view class="unit3_r"><u-button type="primary" text="整单删除" @click="isdelete()"></u-button></view>
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
                  <view>{{v.spbm}}</view>
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
import dayjs from 'dayjs';
import {
  rcOrderNew,
  rcsearch,
  rcGetlistC,
  rcRkdDosave,
  rcRkdCheck,
  rcRkdDelete,
  rcpddosave,
  rcpdcheck,
  rcpddelete,
  rcpdline,
} from "@/network/api.js";
import navbar from '../../components/nav.vue'

export default {
  components: {
    navbar
  },
  data() {
    return {
      pdlxlist:'',
      pdlx:'',
      spbm:'',
      sjbh: '',
      sjbhlist: '',
      thck: '',//仓库
      thcklist: '',
      thlx: '',//退回类型
      thlxlist: '',
      pddh:uni.getStorageSync('pddh'),//盘点单
      pdrq:'',//盘点日期
      detail:true,//明细
      detaildata:[],//明细数据
      from:{},
      popupShow:false,
      searchdata:'',
      pitchdata:'',//选中
      remark:'',//备注
      shcg:false
    }
  },
  onLoad(option) {
    console.log(option);
    if(option.pddh){
      uni.setStorageSync('pddh',option.pddh)
      this.pddh=option.pddh
    }
  },
  onReady() {

  },
  onShow() {
    //盘点类型
    this.pdlxlist = uni.getStorageSync('pdlxlist')
    let pdlxlist = [];
    this.pdlxlist.forEach((item) => {
      let datas = {}
      datas.value = item.id;
      datas.text = item.name
      pdlxlist.push(datas)
    })
    this.pdlxlist = pdlxlist
    this.pdlx = this.pdlxlist[3].value

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
if(uni.getStorageSync('pddh')){
  this.getlist()
}else {
  this.cknew()
}


  },
  methods: {
    //退出
    back(){
      uni.switchTab({
        url: '../../pages/statement/statement'
      });
    },
    //创建盘点单
    cknew() {
            let data = {
              access_token: uni.getStorageSync('access_token'),
              djtype: 'SPPDB',
              fdbh: uni.getStorageSync('fdbh'),
              userid: uni.getStorageSync('userid')
            }
            rcOrderNew(data).then((res) => {
              console.log('盘点单创建成功', res)
              this.shcg=false
              this.pddh=res.djbh
              uni.setStorageSync('pddh',this.pddh)
              let datee=this.pddh.split("PZ")[1]
              let y="20"+datee.slice(0,2)
              let m=datee.slice(2,4)
              let d=datee.slice(4,6)
              this.pdrq=`${y}-${m}-${d}`
            })



    },
    // 扫码 搜索商品
    scan() {
      uni.scanCode({
        success: (res) => {
          console.log('扫码内容', res.result)
          this.spbm=res.result
this.Search()
        },
        fail: (err) => {
          this.$refs.uToast.show({
            type:"error",
            message: "识别失败"
          })
        }
      });
    },
    //商品搜索
    Search(){
      if(this.pddh){
        let data={
          access_token: uni.getStorageSync('access_token'),
          companyid:uni.getStorageSync('companyid'),
          condition:this.spbm,
          fdbh:uni.getStorageSync('fdbh'),
          findtype:'01',
          goodstype:'SP',
          userid:uni.getStorageSync('userid')
        };
        rcsearch(data).then((res)=>{
          console.log(res);
          if(res.error_code=='0'){
            console.log('搜索到的',res)
            if(res.data.length>'0'&&res.data.length!='1'){
              this.popupShow=true
              this.searchdata=res.data
            }
            if(res.data.length=='1'){
              console.log('只有一个',res.data[0])
              this.ispitchdata(res.data[0])
            }
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
      }else {
        this.cknew()

      }

    },
    //选中的商品
    ispitchdata(item) {
      this.pitchdata=item
      this.popupShow=false
      console.log('选中的商品', this.pitchdata);
      this.from.cbjg=this.pitchdata.pjjj,
      this.from.guid="",
      this.from.jcl=this.pitchdata.jcl?this.pitchdata.jcl:'0',
      this.from.nsjg=this.pitchdata.nsjg,
      this.from.spbm=this.pitchdata.spbm,
      this.from.spmc=this.pitchdata.spmc,
      this.from.spsl='',
      this.from.spsmm=this.pitchdata.spsmm
    },
    //上传商品
    added(){
      console.log(this.pddh)
      if(this.pddh){
        let data={
          access_token:uni.getStorageSync('access_token'),
          userid:uni.getStorageSync('userid'),
          vtype:'ADD',
          djbh:this.pddh,
          ck:this.thck,
          fdbh:uni.getStorageSync('fdbh'),
          remark:'',
          pdlx:this.pdlx,
          pdmd:uni.getStorageSync('fdbh'),
          list:[this.from]
        }
        rcpddosave(data).then((res)=>{
          console.log('新增',res)
          this.getlist()
          if(res.error_code=='0'){
            uni.showToast({
              title: '新增商品成功',
              duration: 2000,
              icon:'none'
            });
            this.pitchdata=''
            this.from={}
            this.spbm=''
          }
          if(res.error_code=='2'){
            uni.showToast({
              title:res.error_data[0].message,
              duration: 2000,
              icon:'none'
            });
            this.pitchdata=''
            this.from={}
          }
          if(res.error_code=='500'){
            uni.showToast({
              title: res.message,
              duration: 2000,
              icon:'none'
            });
          }

        })
      }else {
        uni.showToast({
          title: '盘点单为空',
          duration: 2000,
          icon:'none'
        });
      }

    },
    //查询上传商品
    getlist(){
      if(this.pddh){
        let data={
          "access_token": uni.getStorageSync("access_token"),
          "djbh": this.pddh,
          "djtype": "SPPDB",
          "fdbh": uni.getStorageSync("fdbh"),
          "userid": uni.getStorageSync("userid"),
          "ztbz": "T"
        }
        rcGetlistC(data).then((res)=>{
          console.log('明细列表',res)
          this.detaildata=res.data
        })
      }else {
        uni.showToast({
          title: '盘点单为空',
          duration: 2000,
          icon:'none'
        });
      }

    },
    //点击明细
    isdetail(){
      uni.navigateTo({
        url:`../pandian/pandianmx?pddh=${this.pddh}&thck=${this.thck}&thlx=${this.thlx}&shcg=${this.shcg}`
      })
    },
    //审核
    ischeck(){
if(this.detaildata.length==0){
  uni.showToast({
    title: '未添加盘点商品',
    duration: 2000,
    icon:'none'
  });
  return
}
      if(this.pddh){
        uni.showModal({
          title: '提示',
          content: '是否整单审核',
          success:  (res)=> {
            if (res.confirm) {
              console.log('用户点击确定');
              let data={
                ckbmid:this.thck,
                pdlx:this.pdlx,
                pdmd:uni.getStorageSync('fdbh'),
                access_token:uni.getStorageSync('access_token'),
                userid:uni.getStorageSync('userid'),
                username:uni.getStorageSync('dlmc'),
                djbh:this.pddh,
                fdbh:uni.getStorageSync('fdbh'),
                remark:this.remark,
              }
              rcpdcheck(data).then((res)=>{
                console.log('审核',res)
                if(res.error_code=='0'){
                  uni.showToast({
                    title: '整单审核成功',
                    duration: 2000,
                    icon:'none'
                  });
                  this.shcg=true
                  this.pddh=''
                  uni.setStorageSync('pddh','')
                  this.detaildata=''
                  this.spbm=''
                }
                if(res.error_code=='500'){
                  uni.showToast({
                    title: res.message,
                    duration: 2000,
                    icon:'none'
                  });
                }
              })

            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      }else {
        uni.showToast({
          title: '盘点单为空',
          duration: 2000,
          icon:'none'
        });
      }

    },
    //整单删除
    isdelete(){
      if(this.pddh){
        uni.showModal({
          title: '提示',
          content: '是否整单删除',
          success:  (res)=> {
            if (res.confirm) {
              console.log('用户点击确定');
              let data={
                access_token:uni.getStorageSync('access_token'),
                userid:uni.getStorageSync('userid'),
                username:uni.getStorageSync('dlmc'),
                djbh:this.pddh,
              }
              rcpddelete(data).then((res)=>{
                console.log('整单删除',res)
                if(res.error_code=='0'){
                  uni.showToast({
                    title: '整单删除成功',
                    duration: 2000,
                    icon:'none'
                  });
                  this.pddh=''
                  this.spbm=''
                  this.detaildata=''
                  this.pitchdata=''
                  uni.setStorageSync('pddh','')
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });


      }else {
        uni.showToast({
          title: '盘点单为空',
          duration: 2000,
          icon:'none'
        });
      }

    },
    //记录
    jl(){
      uni.navigateTo({
        url:`../pandian/pandianjl`
      });
    }

  }

}
</script>

<style lang="scss" scoped>
.nav{
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 20rpx;
}
.head{
  padding: 10px;
  color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #358CC9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .dhliang {
    display: block;
    height: 17px;
    line-height: 16px;
    padding: 0px 12px;
    background-color: #F13B44;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 500;
  }
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

.uni-card {
  overflow: initial;
}

.uni-select__input-box {
  width: 100%;
}
.closebtn {
  text-align: center;
  height: 30px;
  line-height: 30px;
  color: #358CC9;
  font-size: 18px;
  margin-top: 15px;
}
.unit2{

  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0 20rpx;

  margin-top: 20px;
}
.unit3{
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  .unit3_l{
    width: 45%;
  }
  .unit3_r{
    width: 45%;

  }
}
/deep/.uni-select__input-box {
  height: 35px;
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
</style>

