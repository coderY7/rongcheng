<template>
  <view>
    <navbar title='商品明细' @back="back()"></navbar>

      <view style=" padding:10px 10px 0;
      color: #fff;
      padding: 30rpx 0;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: #358CC9;">
        <view style="display: flex;
justify-content: center">盘点单号:{{pddh}}</view>

    </view>
    <view class="box-com">
      <!-- 编辑单据 内容 -->
      <view v-show="stateDetail">

        <u-form class="form-card" labelPosition="left" :model="editForm" :rules="editRules" ref="uForm">
          <view>
            <uni-card v-if="editForm.spmc" margin="5px" spacing="0px">
              <view  class="boxunit">
                <view class="boxunit1">商品编码:</view>
                <view class="boxunit2">
                  <u-input border="surround" v-model="editForm.spbm" :disabled="true"></u-input>
                </view>
              </view>
              <view  class="boxunit">
                <view class="boxunit1">商品名称:</view>
                <view class="boxunit2">
                  <u-input border="surround" v-model="editForm.spmc" :disabled="true"></u-input>
                </view>
              </view>
              <view  class="boxunit">
                <view class="boxunit1">商品条码:</view>
                <view class="boxunit2">
                  <u-input border="surround" v-model="editForm.spsmm"  :disabled="true"></u-input>
                </view>
              </view>
              <view  class="boxunit">
                <view class="boxunit1">最近进价:</view>
                <view class="boxunit2">
                  <u-input border="surround" v-model="editForm.cbjg"  :disabled="true"></u-input>
                </view>
              </view>

              <view  class="boxunit">
                <view class="boxunit1">盘点数量:</view>
                <view class="boxunit2">
                  <u-input border="surround" v-model="editForm.spsl" type="digit"></u-input>
                </view>
              </view>
<!--              <view  class="boxunit">-->
<!--                <view class="boxunit1">入库价格:</view>-->
<!--                <view class="boxunit2">-->
<!--                  <u-input border="surround" v-model="editForm.rkhsjg" type="digit"></u-input>-->
<!--                </view>-->
<!--              </view>-->

            </uni-card>
          </view>

        </u-form>

        <view class="btns" v-if="stateDetail">
          <u-button type="primary" class="my-primary-button" :plain="true" text="取消" throttleTime="2000"
                    @click="cancelDetail"></u-button>
          <u-button type="primary" class="my-primary-button" text="保存" throttleTime="2000" @click="editDetailSave">
          </u-button>
        </view>
      </view>

      <view class="foldGroup" v-if="!stateDetail">

        <view class="fold-content" v-for="(item,index) in detaildata">
          <view class="card-flex-wrap">
            <view class="card-row">{{item.spmc}}</view>
            <view v-if="showbnt">
              <uni-icons type="compose" size="20" color="#3183C1" @click="toeditDetail(item,index)"></uni-icons>
              <uni-icons type="trash" size="20" color="#F13B44" style="margin-left:10px;"  @click="delGoods(item,index)"></uni-icons>
            </view>
          </view>
          <view class="multiples">
            <view class="multiple-con">
              <text class="left-con">编码:</text>
              <text class="right-con">{{item.spbm}}</text>
            </view>
            <view class="multiple-con">
              <text class="left-con">条码:</text>
              <text class="right-con">{{item.spsmm}}</text>
            </view>
          </view>
          <view class="multiples">
            <view class="multiple-con view-flex">
              <text class="left-con">规格:</text>
              <text class="right-con">{{item.gg}}</text>
            </view>
            <view class="multiple-con view-flex">
              <text class="left-con">零售价格:</text>
              <text class="right-con">{{item.nsjg}}</text>
            </view>
          </view>
          <view class="multiples">
            <view class="multiple-con view-flex">
              <text class="left-con">最近进价:</text>
              <text class="right-con">{{item.pjjj}}</text>
            </view>
            <view class="multiple-con view-flex">
              <text class="left-con">盘点数量:</text>
              <text class="right-con" style="color: red">{{item.spsl}}</text>
            </view>
<!--            <view class="multiple-con view-flex">-->
<!--              <text class="left-con">入库价格:</text>-->
<!--              <text class="right-con" style="color: red">￥{{item.rkhsjg}}</text>-->
<!--            </view>-->
          </view>
        </view>
      </view>


      <!-- 弹窗。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。 -->
      <u-toast ref="uToast"></u-toast>


    </view>

  </view>

</template>

<script>
import dayjs from 'dayjs';
import {
  rccondition,
  rcckdosave,
  rcckdelete,
  rcckline,
  rcGetlistC,
  rcsearch,
  rcRkdDosave,
  rcrkddelLine,
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
  data(){
    return {
      detaildata:'',
pddh:'',
      thck:'',
      thlx:'',
      showbnt:true,
      editForm:{
        spbm: "",
        spsmm: "",
        spmc: "",
        dw: "",
        gg: "",
        rksl: "",
        rkhsjg: "",
        guid:'',
        splx: false,//赠送商品
        cxjbz: "",//供价类型

      },
      from:{},
      editRules:{
        "spsl": [{
          type: "number",
          required: true,
          message: "请填写盘点数量",
          trigger: ["blur", "change"]
        },
          {
            asyncValidator: (rule, value, callback) => {
              let reg=/^\d+(\.\d+)?$/
              if(reg.test(value)){
                callback();
              }else{
                callback(new Error('请输入非负数'));
              }
            }
          }
        ],
        "thjg": [{
          type: "number",
          required: true,
          message: "请填写退货价格",
          trigger: ["blur", "change"]
        },
          {
            asyncValidator: (rule, value, callback) => {
              let reg=/^\d+(\.\d+)?$/
              if(reg.test(value)){
                callback();
              }else{
                callback(new Error('请输入非负数'));
              }
            }
          }
        ],
      },
      serchGoodsData:[],
      lxlist:[],
      stateDetail: false,
      tableIndex: -1,
      djzt:'',
      shcg:false
    }
  },

  onLoad(option){
    this.pddh=option.pddh
    this.thck=option.thck
    this.thlx=option.thlx
    this.djzt=option.djzt
    this.shcg=option.shcg
    console.log(option);
  },
  onShow(){
this.getlist()
    if(this.djzt=='已审核'){
      this.showbnt=false
    }
    if(this.djzt=='未审核'){
      this.showbnt=true
    }
    console.log(this.shcg)
    if(this.shcg=='false'){
      this.showbnt=true
    }
    if(this.shcg=='true'){
      this.showbnt=false
    }
  },
  methods:{
    //退出
    back(){
      uni.navigateBack({
        delta: 1
      });
    },
    getlist(){
      let data={
        "access_token": uni.getStorageSync("access_token"),
        "djbh": this.pddh,
        "djtype": "SPPDB",
        "fdbh": uni.getStorageSync("fdbh"),
        "userid": uni.getStorageSync("userid"),
        "ztbz": ""
      }
      rcGetlistC(data).then((res)=>{
        console.log('明细列表',res)
        this.detaildata=res.data
        if(this.detaildata.length=='0'){
          uni.showToast({
            title: '没有商品明细',
            duration: 2000,
            icon:'none'
          });
          setTimeout(()=>{
            uni.navigateBack({
              delta: 1
            });
          },1000)
        }
      })
    },
    // 编辑商品
    toeditDetail(row, index) {
      console.log(row)
      this.editForm.cbjg = row.cbjg
      this.editForm.guid = row.recordid
      this.editForm.spmc = row.spmc
      this.editForm.spsmm = row.spsmm
      this.editForm.spbm = row.spbm
      //this.editForm.spsl = row.thsl
      this.editForm.nsjg = row.nsjg
      this.editForm.sppc = row.sppc
      this.editForm.rkhsjg=row.rkhsjg,
      this.editForm.spsl=row.spsl,
     this.editForm.cxjbz=row.cxjbz,
      this.serchGoodsData.jjsl=row.jjsl,
      this.editForm.splx = row.splx=="T"?true:false
      this.stateDetail = true
      this.tableIndex = index
    },
    cancelDetail() {
      this.editForm.cbjg=''
      this.editForm.guid = ''
      //this.editForm.thjg =''
      this.editForm.spmc =''
      this.editForm.spsmm =''
      this.editForm.spbm =''
      this.editForm.spsl =''
      this.editForm.nsjg =''
      this.editForm.sppc =''
      this.editForm.cxjbz= ""//供价类型
      this.editForm.rkhsjg='',
      this.editForm.rksl='',
      this.editForm.cxjbz='',
      this.serchGoodsData.jjsl='',
      this.editForm.splx= false//赠送商品
      this.editForm.thsl= ""
      this.editForm.thjg= ""
      this.stateDetail = false
      this.tableIndex = -1

    },

    switChange(val){
      this.editForm.splx=val
    },
    // 保存商品
    editDetailSave() {
      let a=dayjs(this.detaildata[this.tableIndex].scrq).format("YYYY-MM-DD")
      let b=dayjs(this.detaildata[this.tableIndex].bzjzrq).format("YYYY-MM-DD")

        this.from.cbjg=this.editForm.cbjg,
        this.from.guid=this.editForm.guid,
        this.from.jcl=this.editForm.jcl?this.editForm.jcl:'0',
        this.from.nsjg=this.editForm.nsjg,
        this.from.spbm=this.editForm.spbm,
        this.from.spmc=this.editForm.spmc,
        this.from.spsl=this.editForm.spsl,
        this.from.spsmm=this.editForm.spsmm

      let data={
        access_token:uni.getStorageSync('access_token'),
        userid:uni.getStorageSync('userid'),
        vtype:'EDIT',
        djbh:this.pddh,
        ck:this.thck,
        fdbh:uni.getStorageSync('fdbh'),
        remark:'',
        pdlx:'HAND',
        pdmd:uni.getStorageSync('fdbh'),
        list:[this.from]
      }
      rcpddosave(data).then((res)=>{
        console.log('编译保存',res)
        if (res.error_code == 0) {
          uni.showToast({
            title: '修改商品成功',
            duration: 2000,
            icon:'none'
          });
          this.stateDetail = false

          this.getlist()
        } else {
          uni.showToast({
            title: '修改商品失败',
            duration: 2000,
            icon:'none'
          });
        }
      })
    },

    // 删除商品
    delGoods(row, index) {
      console.log('删除',this.title,row)
      uni.showModal({
        content: "是否确认删除商品",
        success: (resm)=> {
          if (resm.confirm) {
            let dataes={
              "access_token": uni.getStorageSync("access_token"),
              "djbh": row.pddbh,
              "pdmd":uni.getStorageSync("fdbh"),
              "fdbh": uni.getStorageSync("fdbh"),
              "userid": uni.getStorageSync("userid"),
              "username": uni.getStorageSync("dlmc"),
              "list": [{
                "guid": row.recordid,
                "spbm": row.spbm,
                "spmc": row.spmc,
                "spsmm": row.spsmm,
              }]
            }
            rcpdline(dataes).then((res) => {
              console.log("删除商品 res",res)
              if (res.error_code == 0) {
                uni.showToast({
                  title: '删除商品成功',
                  duration: 2000,
                  icon:'none'
                });
                this.getlist()
              } else {
                uni.showToast({
                  title: '删除商品失败',
                  duration: 2000,
                  icon:'none'
                });
              }
            }).catch((err) => {
              console.log(err)
            })
          } else if (resm.cancel) {

          }
        }
      });
    },


  }
}
</script>

<style lang="scss" scoped>
.box-com {
  .view-flex {
    width: 100%;
    display: flex;
    align-items: center;

    .form-left-text {
      display: inline-block;
      min-width: 64px;
      text-align-last: justify;
      margin-right: 10px;
    }
  }

  .form-card {
    padding: 10px 15px;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
    .shopTishi{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .shopTishi-view{
        uni-text{
          font-size: 14px;
          color: #999;
          font-weight: 400;
        }
      }
      .shopTishi-view-half{
        width: 50%;
        uni-text{
          font-size: 14px;
          color: #999;
          font-weight: 400;
        }
      }
      .left-con{
        margin-right: 4px;
      }
      .show-dots{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .inp-right-text{
      display: inline-block;
      width: 19px;
    }
    .radio-view{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .radio-text{
        padding: 6px 14px;
        background-color: #F5F5F5;
        border-radius: 7px;
      }
    }
    .uni-date {
      width: 100%;
      .uni-date__x-input {
        height: 38px;
      }
      .uni-date-editor--x .uni-date__icon-clear {
        top: 6px;
        border: 2px solid transparent;
      }
      .uni-date-editor--x__disabled>.uni-date-x {
        background-color: #F5F7FA;
      }
    }
    .u-input__content__subfix-icon {
      flex-direction: row;
    }
  }

  .form-card>* {
    margin-bottom: 14px;
  }

  .u-form.form-card>* {
    margin-bottom: 14px;
  }

  .form-card>*:last-child {
    margin-bottom: 0px;
  }

  /deep/.u-form {
    .u-form-item__body {
      padding: 0;
    }
    .u-form-item__body__right__content__slot{
      display: flex;
      justify-content: space-between;
    }
    .shoping{
      margin-bottom: 0px;
    }
  }
  .btns {
    display: flex;
    justify-content: space-around;
    margin-top: 8px;

    /deep/.u-button {
      width: 33%;
      margin: 0;
    }
  }

  .foldGroup {
    .fold-title>*{
      margin-bottom: 8px;
    }
    .fold-title>*:last-child{
      margin-bottom: 0px;
    }
    .fold-title{
      margin-bottom: 10px;
      border-radius: 10px;
      box-sizing: border-box;
      padding: 10px;
      box-shadow: 0px 1px 5px 3px #e8e8e8;
      background-color: #fff;
      .fold-title-t{
        font-size: 17px;
        color: #1c1c28;
        font-weight: 600;
        margin-bottom: 4px;
        padding-bottom: 4px;
        border-bottom: 1px solid #ccc;
      }
      .fold-title-con{
        color: #999;
        font-weight: 400;
      }
      .fold-title-flex-start{
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .multiples {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .multiple-con {
          width: 50%;
        }
      }
      .show-dots{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .left-con{
        color: #999;
        font-weight: 400;
        margin-right: 4px;
      }
      .right-con{
        color: #1c1c28;
      }
      .cu1{
        color: #3a3a3a;
      }
      .cu-price{
        color: #358CC9;
      }
    }

    .fold-content {
      margin-bottom: 10px;
      border-radius: 10px;
      box-sizing: border-box;
      padding: 10px;
      box-shadow: 0px 1px 5px 3px #e8e8e8;
      background-color: #fff;

      .card-flex-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;

        // flex-wrap: wrap;
        .card-row {
          font-size: 16px;
          color: #1c1c28;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }

      .multiples {
        width: 100%;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .multiple-con {
          width: 50%;
        }

        .left-con {
          font-size: 12px;
          color: #999;
          font-weight: 400;
          margin-right: 4px;
          word-break: keep-all;
        }

        .right-con {
          color: #1c1c28;
        }
      }
    }

    .fold-content>* {
      margin-bottom: 10px;
    }

    .fold-content>*:last-child {
      margin-bottom: 0px;
    }
  }

  .lxactive{
    background-color: #358CC9 !important;
    color: #fff;
  }


  .flex-btns {
    display: flex;
    justify-content: space-between;

    /deep/.u-button--primary.my-primary-button {
      width: 28%;
    }
  }
}

/deep/.u-popup {
  border-radius: 30px;

  .u-popup__content {
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 10px;
    border-radius: 20px;
  }

  .uni-scroll-view-content {
    box-sizing: border-box;
    padding: 10px 0;

    .list {
      padding: 10px;
      border-bottom: 1px solid #E6E6E6;
    }

    .list>uni-text:first-child {
      color: #4A4A4A;
    }

    .list>uni-text:last-child {
      color: #A9A9A9;
    }

    .shop {
      .list {
        display: flex;
        padding: 10px 0;

        .shop-l {
          width: 24px;
          color: #060606;
          font-weight: 600;
        }

        .shop-r {
          width: calc(100% - 20px);

          .shop-r-t {
            display: flex;
            justify-content: space-between;
            font-weight: 600;
            margin-bottom: 8px;

            .t-name {
              color: #484858;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }

            .t-price {
              color: #3b9bda;
            }
          }

          .shop-r-b {
            display: flex;
            justify-content: space-between;
            font-size: 12px;

            .b-xi {
              color: #b1b1b1;
              font-weight: 400;
            }

            .b-cu {
              color: #717171;
              font-weight: 500;
            }

          }
        }
      }
    }
  }

  .closebtn {
    text-align: center;
    height: 34px;
    line-height: 34px;
    color: #358CC9;
    font-size: 17px;
  }
  .boxunit{
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 20rpx;
    width: 100%;

    .boxunit1{
      font-size: 30rpx;
      width: 20%;
    }
    .boxunit2{
      width: 70%;
      margin-left: 10rpx;
      margin-right: 20rpx;
    }
  }
}
</style>
