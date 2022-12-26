<template>
    <view class="content">
      <view v-if="edit" class="hz_type">
        <u-radio-group  @change="ispdlx" size="26" v-model="radiovalue">
          <u-radio shape="square" label="部分盘点" name="PA" :customStyle="{marginRight: '20px'}"></u-radio>
          <u-radio shape="square" label="全部盘点" name="AL"></u-radio>
        </u-radio-group>
      </view>
        <view class="collshop-box">
<!--            <view class="collshop-top" @click="isedit">{{edit?'完成':'编辑'}}</view>-->
            <view class="collshop-cen">
                <checkbox-group class="block" @change="changeCheckbox">
                    <block v-for="item in datalist" :key="item['盘点单号']">
                        <view class="collshop-cen-item">
                            <checkbox  style="margin: auto 0" v-if="edit" :value="JSON.stringify(item)"
                                :checked="checkedArr.includes(JSON.stringify(item))"
                                :class="{'checked':checkedArr.includes(JSON.stringify(item))}"></checkbox>

                            <view class="right unit3" @click="itemdata(item)">

                              <view class="unit3box" >
                                <view class="title"> <span style="color: #4f99ff;font-size: 18px">{{item['盘点单号']}}</span></view>
                                <view class="title">实盘总数量:
                                  <span style="color: red;">{{item['实盘总数量']}}</span>
                                  </view>
                              </view>
                              <view class="unit3box">
                                <view class="title">预损溢数量:
                                  <span style="color: red;">{{item['预损溢数量']}}</span>
                                  </view>
                                <view class="title">预损溢金额:
                                  <span style="color: red;">{{item['预损溢金额']}}</span>
                                </view>
                              </view>

                              <view class="unit3box">
                                <view class="title">盘点开始日:{{item['盘点开始日']}}</view>
                              </view>
                              <view class="unit3box">
                                <view class="title">盘点结束日:{{item['盘点结束日']}}</view>
                              </view>

                            </view>
                        </view>
                    </block>
                </checkbox-group>
            </view>
            <view  class="collshop-bot">
                <checkbox-group @change="allChoose" v-if="edit">
                    <label>
                        <checkbox value="all" :class="{'checked':allChecked}" :checked="allChecked?true:false">
                        </checkbox> 全选
                    </label>
                </checkbox-group>


              <view class="right" @click="hezhang" v-if="edit">合帐</view>
              <view class="right" @click="shenhe" v-if="!edit">审核</view>
            </view>
        </view>


    </view>

</template>

<script>
import {rcjz} from '../../../network/api'

    export default {
        props:{
          list: {
            type: Array,
            default() {
              return
            }
          },
          hz:{
            type:Boolean,
            default() {
              return
            }
          }
        },


        data() {
            return {
              radiovalue:'PA',
              hzlist:'',
              gztype:'',
              result:'',
              bdt:'',
              sumdata:'',
                edit: true,
                datalist: [],
                checkedArr: [], //复选框选中的值
                allChecked: false //是否全选
            }
        },
      mounted() {
          console.log(this.hz,this.list)
             this.datalist=this.list
             this.edit=this.hz
        },

        methods: {
          ispdlx(n){
            this.gztype=n
          },
            // 多选复选框改变事件
            changeCheckbox(e) {
              this.checkedArr = e.detail.value;
              let hzlist=[]
              e.detail.value.forEach((item)=>{
                hzlist.push(JSON.parse(item))
              })
              this.hzlist=hzlist

              let datalist=[]
              e.detail.value.forEach((item)=>{
                datalist.push(JSON.parse(item))
              })
                this.$emit("send", datalist)
                // 如果选择的数组中有值，并且长度等于列表的长度，就是全选
                if (this.checkedArr.length > 0 && this.checkedArr.length == this.datalist.length) {
                    this.allChecked = true;
                } else {
                    this.allChecked = false;
                }
            },
            // 全选事件
            allChoose(e) {
                let chooseItem = e.detail.value;
              // 全选
                if (chooseItem[0] == 'all') {
                    this.allChecked = true;
                  for (let item of this.datalist) {
                        let itemVal =JSON.stringify(item)
                        if (!this.checkedArr.includes(itemVal)) {
                            this.checkedArr.push(itemVal);

                          let hzlist=[]
                          this.checkedArr.forEach((item)=>{
                            hzlist.push(JSON.parse(item))
                          })
                          this.hzlist=hzlist

                          let datalist=[]
                          this.checkedArr.forEach((item)=>{
                            datalist.push(JSON.parse(item))
                          })
                          this.$emit("send", datalist)
                        }
                    }
                } else {
                    // 取消全选
                  this.$emit("send", [])
                  this.allChecked = false;
                    this.checkedArr = [];
                }
            },
            //跳转
          itemdata(item){
            let datas = {
              access_token: uni.getStorageSync('access_token'),
              vtype: 'pddetail',
              fdbh: uni.getStorageSync('fdbh'),
              pddh:item['盘点单号']
            }
            rcjz(datas).then((res) => {
              console.log(res.data)
              this.result=res.data
              this.bdt=Object.keys(this.result[0])
              //表单头处理
              let cl=this.bdt
              let a=[];
              cl.forEach((item)=>{
                a.push({name:item,lable:item,width:80})
              })
              this.bdt=a
              //跳转新页面
              let bdt = JSON.stringify(this.bdt)
              console.log(bdt)
              let result = JSON.stringify(this.result)
              let sumdata = JSON.stringify(this.sumdata)
              uni.setStorageSync('result',result)
              uni.navigateTo({
                url: `../../pagesA/result/result?bdt=${bdt}&result=${result}&sumdata=${sumdata}`
              });
            })

          },

          //合帐
          hezhang() {
            if(this.hzlist==''){
              uni.showToast({
                title:'请勾选盘点单号',
                duration: 2000,
                icon:'none'
              });
              return
            }
            let hzlist=[]
            this.hzlist.forEach((item)=>{
              hzlist.push((item['盘点单号']))
            })
            this.hzlist=hzlist
            this.hzlist=this.hzlist.join(',')

            let datas = {
              access_token: uni.getStorageSync('access_token'),
              vtype: 'pdhdbz',
              fdbh: uni.getStorageSync('fdbh'),
              pddh:this.hzlist,
              gztype:this.gztype==''?"PA":this.gztype,
              userid:uni.getStorageSync('userid')
            }
            rcjz(datas).then((res) => {
              if(res.error_code=='0'){
                uni.showToast({
                  title: res.message,
                  duration: 2000,
                  icon:'none'
                });
                this.$emit("ishz")
              }
            })
          },
// 审核
shenhe() {
  let datas = {
    access_token: uni.getStorageSync('access_token'),
    vtype: 'pdgzsh',
    fdbh: uni.getStorageSync('fdbh'),
    pddh:this.datalist[0]['盘点单号'],
    pdjzno:this.datalist[0]['记账标号'],
    userid:uni.getStorageSync('userid')
  }
  rcjz(datas).then((res) => {
    if(res.error_code=='0'){
      uni.showToast({
        title: res.message,
        duration: 2000,
        icon:'none'
      });
      this.$emit("issh")
    }
  })

},
        }
    }
</script>

<style lang="scss">
     checkbox .wx-checkbox-input {
    	 border-radius: 50% !important;
    	  color: #ffffff !important;
    	}
    	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
    	  color: #fff;
    	  background: #550000;
    	  border: 4upx solid #010155;
    	}
    	.wx-checkbox-input.wx-checkbox-input-checked {
    	  border: none !important;
    	}
    page {
        background-color: #eee;
    }
     .hz_type{
       width: 100%;
       padding: 20rpx;
     }
    .collshop-box {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        overflow: hidden;
    }

    .collshop-top {
        width: 100%;
        height: 88rpx;
        line-height: 88rpx;
        text-align: right;
        font-size: 24rpx;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #E10800;
        padding: 0 22rpx;
        box-sizing: border-box;
    }

    .collshop-cen {
        width: 100%;
        height: auto;
        overflow: hidden;
    }

    .collshop-cen-item {
      display: flex;
    align-items: center;
        width: 100%;
        padding:0 20rpx;
        box-sizing: border-box;
        background-color: #fff;
        margin-bottom: 20rpx;
        overflow: hidden;
    }

    .collshop-cen-item .left {
        float: left;
        width: 92rpx;
        height: 92rpx;
        border-radius: 12rpx;
    }

    .collshop-cen-item .right {
        float: left;
        margin-left: 24rpx;
    }

    .collshop-cen-item .right .title {
        font-size: 28rpx;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333;
    }

    .collshop-cen-item .right .dengjiimg {
        width: 76rpx;
        height: 30rpx;
        margin-top: 12rpx;
    }

    .collshop-cen-item checkbox {
        float: left;
        width: 40rpx;
        height: 40rpx;
        margin: 16rpx 36rpx 0 0;
    }

    .collshop-bot {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100rpx;
        line-height: 92rpx;
        overflow: hidden;
        padding: 0 22rpx;
        box-sizing: border-box;
        background-color: #fff;
    }

    .collshop-bot checkbox-group {
        float: left;
    }

    .collshop-bot .right {
        float: right;
        width: 170rpx;
        height: 70rpx;
        line-height: 70rpx;
        text-align: center;
        background: #E10800;
        font-size: 30rpx;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #FFF;
        border-radius: 6rpx;
        margin-top: 15rpx;
    }



     .unit3{
       width: 90%;
       display: flex;
       flex-direction: column;
       justify-content: center;
       margin: 30rpx auto;
       //padding: 20rpx;
       //border: silver solid 1px;
       //border-radius: 10px;
     .unit3box{
       display: flex;
       justify-content: space-between;
       align-items: center;
       flex-direction: row;
       padding-bottom:5px;
     }
     }
</style>
