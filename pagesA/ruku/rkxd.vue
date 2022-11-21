<template>
	<view class="box">
    <view class="status-bar"></view>
    <view v-if="navber">
      <uni-card :is-shadow="false" is-full padding="0px" margin="0px">
        <view class="nav-bar" style="display: flex; justify-content: space-between;
align-items: center;height: 50rpx;
    margin: 10rpx 0rpx;" >
          <view class="left">
            <view @click="historydh()" v-if="ifpage" style="color: #4f99ff">历史单号</view>
          </view>
        </view>
      </uni-card>

    </view>

		<view class="box-content" v-show="ifpage">
			<!-- 新增单据 表头 -->
			<view class="my-collapse">
				<view class="my-collapse-title" >
					<view class="fold-title">
						<view class="fold-title-t fold-title-flex" style="z-index: 999">
							<text>单号:{{uFormTitle.djbh}}</text>
							<text class="dhliang"  @click="honest()" v-if="tableData.length>'0'">明细:{{tableData.length}}</text>
						</view>
						<view style="display:flex;justify-content:center;align-items:center;padding:8px;" @click="myCollShow=!myCollShow">
							<text v-if="myCollShow">收起</text>
							<text v-else>展开</text>
							<uni-icons type="top" size="19" color="#fff" v-if="myCollShow"></uni-icons>
							<uni-icons type="bottom" size="19" color="#fff" v-else></uni-icons>
						</view>
					</view>
				</view>
				<view class="my-collapse-con" v-show="myCollShow">
					<view style="text-align:center;color:#F56C6C;" v-if="neworderShow">这是一个新单！！！</view>
					<u-form class="form-card" labelPosition="left" :model="uFormTitle">

            <view class="unitbox" style="margin: 20rpx 0">
  <view class="unitbox_l">商家编号:</view>
  <view @ckick="xzshbh()" class="unitbox_r">
    <uni-data-select
        v-model="uFormTitle.sjbh"
        :localdata="cxsjbh"
        @change="change"
    ></uni-data-select>
  </view>
            </view>

            <view class="unitbox" style="margin: 20rpx 0">
              <view class="unitbox_l">分店名称:</view>
              <view @ckick="xzfhlist()" class="unitbox_r">
                <uni-data-select
                    v-model="uFormTitle.fdbh"
                    :localdata="cxfdbh"
                    @change="fdchange"
                ></uni-data-select>
              </view>
            </view>

            <view class="unitbox" style="margin: 20rpx 0">

              <view class="unitbox_l">备注说明:</view>
              <view @ckick="xzfhlist()" class="unitbox_r">
                <u-input placeholder="请输入备注说明" v-model="uFormTitle.remarks" :disabled="state=='look'||state=='check'">
                </u-input>
              </view>
            </view>



					</u-form>



				</view>
			</view>
			<!-- 新增单据 内容 -->
			<view v-if="state=='add' ||state=='edit' ||state=='pladd'">
				<u-form class="form-card" labelPosition="left" :model="uFormModel"  ref="uForm">
          <view style="margin: 10rpx 0">
            <u-form-item label="商品条码:" :labelWidth="74" prop="spbm" class="shoping" v-show="doingindex>=0">
          <u-search  placeholder="请输入商品条码" searchIcon="scan" searchIconSize="30" v-model="uFormModel.spbm" height="30" @clickIcon="scan()" @custom="spbmChange()"></u-search>
            </u-form-item>
          </view>
<!--          搜索到选择的商品条码-->

            <view  class="unitbox" style="margin: 20rpx 0">
              <view class="unitbox_l">商品名称:</view>
              <view class="unitbox_r">
                <u-input border="surround" v-model="uFormModel.spmc" :disabled="true"></u-input>
              </view>
            </view>
<!--            <view  class="unitbox">-->
<!--              <view class="unitbox_l">商品条码:</view>-->
<!--              <view class="unitbox_r">-->
<!--                <u-input border="surround" v-model="uFormModel.spsmm"  :disabled="true"></u-input>-->
<!--              </view>-->
<!--            </view>-->


          <view style="margin: 10rpx 0">
            <u-form-item label="入库数量" :labelWidth="74" prop="jycgsl" v-show="doingindex>=1">
              <u-input placeholder="请输入入库数量" type="digit" v-model="uFormModel.jycgsl" :focus="focusObj.numFocus">
              </u-input>


            </u-form-item>
          </view>
          <view style="margin: 10rpx 0">
            <u-form-item label="入库价格" :labelWidth="74" prop="jycgjg" v-show="doingindex>=2">
              <u-input placeholder="请输入入库价格" type="digit" v-model="uFormModel.jycgjg" :focus="focusObj.priceFocus">
              </u-input>

            </u-form-item>
          </view>
<!--          <view style="margin: 10rpx 0">-->
<!--            <u-form-item label="是否赠品" :labelWidth="74" prop="splx" v-show="doingindex>=3">-->
<!--              <xuanSwitch :switchList="switchList" :defaultSwitch="uFormModel.splx" @change="switChange"></xuanSwitch>-->

<!--            </u-form-item>-->
<!--          </view>-->
          <view style="margin: 10rpx 0">
            <u-form-item label="生产日期" :labelWidth="76" prop="scrq" v-show="doingindex>=4">
              <uni-datetime-picker v-model="uFormModel.scrq" type="date" :clear-icon="false"/>

            </u-form-item>
          </view>
				</u-form>


					<view class="gjlxbox" v-show="doingindex>=5">
						<view class="gjlxbox_l">供价类型:</view>
            <view class="gjlxbox_r">
              <view class="gjlxbox_rr" v-for="(v, i) in lxlist" :class="{lxactive:uFormModel.jgcxbz==v.sjcxlxid}" @tap="formMoreChange(v.sjcxlxid+'-'+v.lxmc,false)">{{v.lxmc}}</view>
            </view>
					</view>


			</view>
		</view>


<view>
  <u-button type="primary" class="my-primary-button sticky-bottom" text="明细提交" throttleTime="2000" v-if="ifpage || contentShow" @click="save">
  </u-button>
</view>


    <view class="flex-btns" v-if="threean">
      <view style="width: 28%"><u-button type="primary" class="my-primary-button" text="整单审核"
                                         :disabled="state=='look'||state=='check'" throttleTime="2000"
                                         @click="subCheck">
      </u-button></view>
      <view style="width: 28%"><u-button type="primary" class="my-primary-button" text="整单删除"
                                         :disabled="state=='look'" throttleTime="2000" @click="deldh">
      </u-button></view>
      <view style="width: 28%"><u-button type="primary" class="my-primary-button" text="新增明细" :disabled="state=='look'||state=='check'"
                                         throttleTime="2000" @click="getcolumns">
      </u-button></view>
    </view>


		<view class="box-content" v-show="!ifpage">
			<edit @byqx="qxby()" @pygb="gbpy()" :title="editTitleObj" :tableData="tableData" :state="state" @editSave="editSave" ref="editDetail"></edit>
		</view>

    <view style="display: flex;justify-content: center;align-items: center">
      <view style="width: 60%;margin-bottom:20rpx">
        <u-button type="primary" class="my-primary-button sticky-bottom" text="关闭明细" throttleTime="2000" v-if="honestshow" @click="tuichu()">
        </u-button>
      </view>
    </view>

		<!-- 弹窗。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。 -->
		<u-overlay :show="coverShow"></u-overlay>
		<u-toast ref="uToast"></u-toast>
		<u-popup :show="popupShow" mode="center" class="u-popup-center" zIndex="20000">
			<scroll-view style="max-height: 80vh; margin-top: 30rpx" scroll-y="true">
				<view v-if="ifDrawer=='title'">
					<view class="list" v-for="(v, i) in selectData" @click="titleChange(v.id,v.name)">
						<text>{{v.id}}</text>-
						<text>{{v.name}}</text>
					</view>
				</view>
				<view v-else-if="ifDrawer=='goods'" class="shop">
					<view class="" v-for="(v, i) in selectData" class="list" @click="setForm(v,false)">
           <view style="display: flex;justify-content: center;padding: 10px 0;border-bottom: #6a6a6a solid 1px">
             <view>{{v.spmc}}---</view>
             <view>{{v.spbm}}</view>
             <view></view>
           </view>
					</view>
				</view>
			</scroll-view>
			<view class="closebtn" @click="popupShow=false">取消</view>
		</u-popup>



	</view>
</template>

<script>
	import dayjs from "dayjs";
	import {
    rcbasics,
    rcqueryHT,
		rcRkdCheck,
		rcRkdDelete,
		rcsearch,
		rcGetlistC,
		rcOrderNew,
		rcRkdDosave
	} from "@/network/api.js";
	import xuanSwitch from "@/components/xuan-switch/xuan-switch.vue";
	// import goodsVoice from '@/components/goodsVoice/goodsVoice';
	import edit from "./edit.vue"
	export default {
		components: {
			xuanSwitch,
			// goodsVoice,
			edit
		},
		data() {
			return {
        navber:true,
				ifpage: true,
        threean:true,
        range:[],
        cxsjbh:'',
        sjbh:'',
        cxfdbh:'',
        fdbh:'',

				uFormTitle: {
					djbh: "",
					sjbh: "",
					rkrq: dayjs().format('YYYY-MM-DD'),
					ckbh: "",
					service: "",
					ysdh: "",
					sphm: "",
					fdbh: "",
					remarks: ""
				},
				state: "",
				myCollShow: true,
				// 表单内容data
				neworderShow:false,
				uFormModel:{
					spbm: "",
					spsmm: "",
					spmc: "",
					dw: "",
					gg: "",
					jgcxbz: "",//供价类型
					splx: false,//赠送商品
					jycgsl: "",
					jycgjg: "",
					scrq: dayjs().format('YYYY-MM-DD'),
				},
				contentShow:false,
				spbmClearShow:false,
				isSpComplete: false,
				switchList:["是","否"],
				lxlist:[],
				ispda: uni.getStorageSync("pda"),
				focusObj:{
					spbmFocus:false,
					numFocus:false,
					priceFocus:false
				},
				selectId: "",
				uploadarr: [],
				serchGoodsData:"",
				// 第二页面 已上传数据页面 data
				tableData:[],
				editTitleObj:{},
				// 弹窗data
				ifDrawer: "",
				selectData: [],// 搜索的数据(语音)
				popupShow: false,
				coverShow: false,

				doingId: "",
				doingindex: 100,
				yuyinModelArr:[],
				searchCode: 400,
				yuyinArr:[],
        honestshow:false
			}
		},
    onLoad(option) {
      console.log(option)
      if(option.navber=='false'){
        this.navber=false
      }

      this.uFormTitle.djbh = option.djbh
      this.state = option.state
      let sjVal = option.sjbh
      let ckVal = option.ckbh
      let fdVal = option.fdbh
      // if (option.state == "add") {
      //
      // }else if (option.state == "edit"||option.state == "look") {
        this.ifpage = true
        let datee=option.djbh.split("RK")[1]
        let y="20"+datee.slice(0,2)
        let m=datee.slice(2,4)
        let d=datee.slice(4,6)
        this.uFormTitle.rkrq=`${y}-${m}-${d}`
        this.uFormTitle.ysdh=option.ysdh
        this.getList()
        uni.$on("editTitle",(data)=>{
          uni.setStorageSync('djbh',data['入库单号'])
          console.log('title',data)
          this.editTitleObj=data
        })
      // }
      //this.queryHt(true, sjVal, "sjbh")
       this.queryMore(true, ckVal, "CKINFO", "ckbh")
      // this.queryMore(true, fdVal, "FDINFO", "fdbh")
       this.queryMore(true, "", "USERINFO", "service")
      this.formMore("",true)
    },
		onReady() {

		},
		onShow() {

      this.cxsjbh=uni.getStorageSync('basic').SJINFO
      //处理商家合同下拉框数据
      let cxsjbh=[];
      this.cxsjbh.forEach((item)=>{
        let datas={}
        datas.value=item.sjbh;
        datas.text=item.sjmc
        cxsjbh.push(datas)
      })
      this.cxsjbh=cxsjbh
      this.uFormTitle.sjbh=this.cxsjbh[0].value

      this.cxfdbh=uni.getStorageSync('basic').FDINFO
      //处理商家合同下拉框数据
      let cxfdbh=[];
      this.cxfdbh.forEach((item)=>{
        let datas={}
        datas.value=item.fdbh;
        datas.text=item.fdmc
        cxfdbh.push(datas)
      })
      this.cxfdbh=cxfdbh
      this.uFormTitle.fdbh=this.cxfdbh[0].value

		},
		methods: {
      //商家编号
      change(e){
        console.log(e)
      },
      //取消编译
      qxby(){
        this.honestshow=true
      },
      //进去编译
      gbpy(){
        this.honestshow=false
      },
      //点击明细
      honest(){
        console.log('明细')
        this.ifpage=false
        this.threean=false
        this.navber=false
        this.honestshow=true
        this.contentShow=false
      },
      historydh(){
        uni.navigateTo({
          url: `../../pagesA/ruku/ruku`
        });
      },
      //退出明细
      tuichu(){
        this.threean=true
        this.ifpage=true
        this.honestshow=false
        this.navber=true

      },
			
			//新增单据 单头 函数........................................................
      // 查询合同
      queryHt(isauto, value, fixid) {
        if (!isauto) {
          if (this.state == "pladd" || this.state == "edit" || this.state == "look" || this.state == "check") {
            return
          }
        }
        this.searchCode=400
        let dataes={
          "access_token": uni.getStorageSync("access_token"),
          "CompanyID": uni.getStorageSync("companyid"),
          "EndRQ": "",
          "StartRQ": "",
          "htlxid": "",
          "sjbh": "",
          "sjmc": ""
        }
        rcqueryHT(dataes).then((res) => {
          // console.log("queryHt res",res)
          if (res.error_code == 0) {
            if(value){
              for (var i in res.data) {
                if(res.data[i].SJBH==value){
                  this.uFormTitle[fixid] = `${res.data[i].SJBH}-${res.data[i].SJMC}`
                }
              }
            }else{
              if (isauto) { //自动填充
                this.uFormTitle[fixid] = `${res.data[0].SJBH}-${res.data[0].SJMC}`
              } else {
                this.selectData = []
                this.popupShow = true
                this.ifDrawer = "title"
                this.selectId = fixid
                for (var i in res.data) {
                  this.selectData.push({
                    "id": res.data[i].SJBH,
                    "name": res.data[i].SJMC
                  })
                }
              }
            }
          } else {
            this.$refs.uToast.show({
              type: "error",
              message: res.message
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      // 新增单据
      queryMore(isauto, value, type, fixid) {
        if (!isauto) {
          if (this.state == "pladd" || this.state == "edit" || this.state == "look" || this.state == "check") {
            return
          }
        }
        this.searchCode=400
        let dataes={
          "access_token": uni.getStorageSync("access_token"),
          "dtype": type,
          "companyid": uni.getStorageSync("companyid"),
        }
        rcbasics(dataes).then((res) => {

          if (res.error_code == 0) {
            if(value){
              for (var i in res.data) {
                if (type == "CKINFO") {
                  if(res.data[i].ckbmid==value.split(" ")[0]){
                    this.uFormTitle[fixid] = `${res.data[i].ckbmid}-${res.data[i].ckmc}`
                  }
                }else if (type == "FDINFO") {
                  if(res.data[i].fdbh==value){
                    this.uFormTitle[fixid] = `${res.data[i].fdbh}-${res.data[i].fdmc}`
                  }
                }
              }
            }else{
              if (isauto) { //自动填充
                if (type == "CKINFO") {
                  this.uFormTitle[fixid] =
                      `${res.data[0].ckbmid}-${res.data[0].ckmc}`
                }else if (type == "FDINFO") {
                  this.uFormTitle[fixid] =
                      `${res.data[0].fdbh}-${res.data[0].fdmc}`
                }else if (type == "USERINFO") {
                  this.uFormTitle[fixid] =
                      `${res.data[0].userid}-${res.data[0].dlmc}`
                }else if (type == "") {

                }
              } else {
                this.selectId = fixid
                this.selectData = []
                this.popupShow = true
                this.ifDrawer = "title"
                for (var i in res.data) {
                  if (type == "CKINFO") {
                    this.selectData.push({
                      "id": res.data[i].ckbmid,
                      "name": res.data[i].ckmc
                    })
                  }else if (type == "FDINFO") {
                    this.selectData.push({
                      "id": res.data[i].fdbh,
                      "name": res.data[i].fdmc
                    })
                  }else if (type == "USERINFO") {
                    this.selectData.push({
                      "id": res.data[i].userid,
                      "name": res.data[i].dlmc
                    })
                  }else if (type == "") {

                  }
                }
              }
            }
          } else {
            this.$refs.uToast.show({
              type: "error",
              message: res.message
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      },
			// 报审核
			subCheck() {
				uni.showModal({
					content: "单据审核后不可修改，是否继续",
					cancelText: "否",
					confirmText: "是",
					success: (resm)=> {
						if (resm.confirm) {
							let dataes = {
								"access_token": uni.getStorageSync("access_token"),
								"userid": this.uFormTitle.service.split("-")[0],
								"username": uni.getStorageSync("dlmc"),
								"djbh": this.uFormTitle.djbh,
								"fdbh": this.uFormTitle.fdbh.split("-")[0],
								"sphm": this.uFormTitle.sphm,
								"remark": this.uFormTitle.remarks,
								"ysdh": this.uFormTitle.ysdh
							}
							rcRkdCheck(dataes).then((res) => {
								console.log("报审核 res", res)
								if (res.error_code == 0) {
									this.$refs.uToast.show({
										type: "success",
										message: "审核成功"
									})
									this.state = "check"
//审核后退出
								} else {
									this.$refs.uToast.show({
										type: "error",
										message: res.message
									})
								}
							}).catch((err) => {
								console.log(err)
							})
						} else if (resm.cancel) {
							
						}
					}
				});
			},
			// 整单 删除
			deldh() {
				uni.showModal({
					content: "是否确认删除整个单号",
					success: (resm)=> {
						if (resm.confirm) {
							let dataes={
								"access_token": uni.getStorageSync("access_token"),
								"userid": uni.getStorageSync("userid"),
								"username": uni.getStorageSync("dlmc"),
								"djbh": this.uFormTitle.djbh
							}
							rcRkdDelete(dataes).then((res) => {
								console.log("删除单据 res", res)
								if (res.error_code == 0) {
									this.$refs.uToast.show({
										type: "success",
										message: "删除成功"
									})
									this.uFormTitle.djbh = ""
									setTimeout(()=>{
										uni.navigateBack({
											delta: 1
										});
									},1800)
								} else {
									this.$refs.uToast.show({
										type: "error",
										message: res.message
									})
								}
							}).catch((err) => {
								console.log(err)
							})
						} else if (resm.cancel) {
							
						}
					}
				});
			},

			// 单据内容 函数...............................................................
			// 搜索商品编码
			spbmChange(val) {
				if (this.isSpComplete) {
					return
				}
				setTimeout(() => {
					if (val != "") {
						if (val == this.uFormModel.spbm) {
							this.serchGoods(val)
							uni.hideKeyboard()
						}
					}
				}, 500)
			},
			serchGoods(val) {
				this.coverShow = true
				uni.showLoading({
					title: "搜索中"
				});
				this.searchCode=400
				let conditions = val
				if (val == "") {
					conditions = "S=" + this.uFormTitle.sjbh
				}
				let dataes={
					"access_token": uni.getStorageSync("access_token"),
					"companyid": uni.getStorageSync("companyid"),
					"condition": conditions,
					"fdbh": uni.getStorageSync("fdbh"),
					"findtype": "01",
					"goodstype": "SP",
					"userid": uni.getStorageSync("userid"),
				}
				rcsearch(dataes).then((res) => {
					uni.hideLoading()
					this.coverShow = false
					console.log("查找商品 res", res)
					if (res.error_code == 0) {
						this.uploadarr = []
						if (res.data.length == 1) {
							this.setForm(res.data[0],true)
						} else {
							this.ifDrawer = "goods"
							this.popupShow = true
							this.selectData = res.data.slice(0, 20)
							this.searchCode=0
						}
					} else {
						this.$refs.uToast.show({
							type: "error",
							message: res.message
						})
					}
				}).catch((err) => {
					uni.hideLoading()
					console.log(err)
				})
			},
			setForm(data,isauto){
				this.serchGoodsData = data
				this.uFormModel.spbm=data.spbm
				this.uFormModel.spsmm=data.spsmm
				this.uFormModel.spmc=data.spmc
				this.uFormModel.dw=data.dw
				this.uFormModel.gg=data.gg
				this.uFormModel.splx=data.taxstate=="T"?true:false
				this.uFormModel.jycgsl=data.jycgsl
				this.uFormModel.jycgjg=data.jycgjg
				this.popupShow=false
				this.searchCode=400
				this.isSpComplete = true
					setTimeout(()=>{
						this.focusObj.numFocus=true
					},300)

			},
			// 扫码 搜索商品
			scan() {
				uni.scanCode({
					success: (res) => {
						console.log('扫码内容', res.result)
						this.uFormModel.spbm=res.result
						this.serchGoods(this.uFormModel.spbm)
					},
					fail: (err) => {
						this.$refs.uToast.show({
							type:"error",
							message: "识别失败"
						})
					}
				});
			}, 
			// 改变商品类型
			switChange(val){
				this.uFormModel.splx=val
			},
			// 查询 特供（供价类型）
			formMore(lx,isauto) {
				this.searchCode=400
				let dataes={
					"access_token": uni.getStorageSync("access_token"),
					"dtype": "DMINFO",
					"companyid": uni.getStorageSync("companyid"),
				}
				rcbasics(dataes).then((res) => {
					console.log("!特供（供价类型）! 基本信息 res", res)
					if (res.error_code == 0) {
						let isyuyinBol=false
						if (isauto) {
							this.lxlist = res.data
							this.uFormModel.jgcxbz=res.data[0].sjcxlxid
						} else {

							let tempArr=[]
							for(var i in res.data){
								if(res.data[i].sjcxlxid.indexOf(lx)>-1){

										let xx = `${res.data[i].sjcxlxid}-${res.data[i].lxmc}`
										this.formMoreChange(xx,isyuyinBol)

								}else if(res.data[i].lxmc.indexOf(lx)>-1){

										let xx = `${res.data[i].sjcxlxid}-${res.data[i].lxmc}`
										this.formMoreChange(xx,isyuyinBol)

								}
							}
							this.selectData=tempArr
							this.searchCode=0
						}
					}else{
						this.$refs.uToast.show({
							type:"error",
							message: "查询失败"
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			},

			formMoreChange(item,isauto){
				this.uFormModel.jgcxbz = item.split("-")[0]

			},
			
			//获取该单号已上传的商品
			getList() {
				let dataes={
					"access_token": uni.getStorageSync("access_token"),
					"djbh": this.uFormTitle.djbh,
					"djtype": "SPRKD",
					"fdbh": uni.getStorageSync("fdbh"),
					"userid": uni.getStorageSync("userid"),
					"ztbz": "T"
				}
				rcGetlistC(dataes).then((res) => {
					console.log("获取该单号已上传的商品 res", res)
					if (res.error_code == 0) {
						this.tableData = []
						this.tableData = res.data
            if(this.tableData.length=='0'){
              this.tuichu()
            }
					} else {
						this.$refs.uToast.show({
							type: "error",
							message: res.message
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			//查找表格列(新增)。。。
			getcolumns() {
				this.myCollShow=false
				this.contentShow=true
				setTimeout(()=>{
					this.focusObj.spbmFocus=true
				},300)
			},
			
			clearAlone(item) {
					this.uFormModel[item]=""
			},
			clearForm() {
				this.uFormModel.spbm= ""
				this.uFormModel.spsmm= ""
				this.uFormModel.spmc= ""
				this.uFormModel.dw= ""
				this.uFormModel.gg= ""
				this.uFormModel.jgcxbz= ""
				this.uFormModel.splx= false
				this.uFormModel.jycgsl= ""
				this.uFormModel.jycgjg= ""
			},
			clearFocus() {
				this.focusObj.spbmFocus=false
				this.focusObj.numFocus=false
				this.focusObj.priceFocus=false
			},
			
			// 编辑商品 保存商品............................................................
			editSave(arr) {
        this.honestshow=true
				this.uploadarr = arr
				this.doSave("EDIT")
      },
			toback(){
				this.ifpage=true
				this.getList()
			},
			
			newOrders() {
				if (this.state == "add") {
					return
				}
				let dataes={
					"access_token": uni.getStorageSync("access_token"),
					"djtype": "SPRKD",
					"fdbh": uni.getStorageSync("fdbh"),
					"userid": uni.getStorageSync("userid"),
				}
				rcOrderNew(dataes).then((res) => {
					if (res.error_code == 0) {
						this.uFormTitle.djbh = res.djbh
						this.state = "add"
						//this.queryHt(true, "sjbh")
						this.queryMore(true, "CKINFO", "ckbh")
						this.queryMore(true, "FDINFO", "fdbh")
						this.queryMore(true, "USERINFO", "service")
						this.tableData = []
					} else {
						this.$refs.uToast.show({
							type: "error",
							message: res.message
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			},

			// popup弹窗控制...................................................................
			// 表头弹窗
			titleChange(id, name) {
				if (this.selectId) {
					this.uFormTitle[this.selectId] = `${id}-${name}`
				}
				this.popupShow = false
				this.selectId = ""
			},
			
			// 保存事件函数。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
			save() {
        console.log('保存')
					this.uploadarr = []
					this.uploadarr.push({
						"bzjzrq": dayjs().date(dayjs().date() + this.serchGoodsData.bzqts).format("YYYY-MM-DD"),
						"hsjj": this.uFormModel.jycgjg,
						"rksl": this.uFormModel.jycgsl,
						"cxtype": this.uFormModel.jgcxbz.indexOf("-") > -1 ? this.uFormModel.jgcxbz.split("-")[0] :
							this.uFormModel.jgcxbz,
						"guid": "",
						"scrq": dayjs().format("YYYY-MM-DD"),
						"spbm": this.uFormModel.spbm,
						"splx": this.uFormModel.splx?"T":"F",
						"jjsl": this.serchGoodsData.sl,
						"spsmm": this.uFormModel.spsmm,
						"spmc": this.uFormModel.spmc,
						"sppc": ""
					})
					this.doSave("CHK")

			},
			doSave(state) {
console.log('编译保存')
				let dataes = {
					"access_token": uni.getStorageSync("access_token"),
					"djbh": this.uFormTitle.djbh,
					"sjbh": this.uFormTitle.sjbh.split("-")[0],
					"cw": this.uFormTitle.ckbh.split("-")[0],
					"cgy": this.uFormTitle.service.split("-")[0],
					"ysdj": this.uFormTitle.ysdh,
					"sphm": this.uFormTitle.sphm,
					"rkfd": this.uFormTitle.fdbh.split("-")[0],
					"remark": this.uFormTitle.remarks,
					"userid": uni.getStorageSync("userid"),
					"vtype": state,
					"list": this.uploadarr
				}
				console.log("新增 保存商品 dosave dataes", dataes)
				rcRkdDosave(dataes).then((res) => {
					console.log("新增 保存商品 dosave res", res)
					if (state == "EDIT") {
						if (res.error_code == 0) {
							this.$refs.uToast.show({
								type: "success",
								message: "保存成功"
							})
							this.$refs.editDetail.stateDetail = false
							this.$refs.editDetail.tableIndex = -1
							this.getList()
						}
						return
					}
					if (res.error_code == 0) {
						this.$refs.uToast.show({
							type: "success",
							message: "保存成功"
						})
						this.state = "pladd"
						this.uploadarr = []
						this.clearFocus()
						this.clearForm()
						this.getList()

							setTimeout(()=>{
								this.focusObj.spbmFocus=true
							},300)

					} else if (res.error_code == 2) {
						uni.showModal({
							content: res.error_data[0].message,
							success: function(res) {
								if (res.confirm) {
								
								} else if (res.cancel) {
								
								}
							}
						});
					} else if (res.error_code == 500) {
						this.$refs.uToast.show({
							type: "error",
							message: "保存失败"
						})
					} else {
						if (res.error_data.length == 1) {
							this.$refs.uToast.show({
								type: "error",
								message: res.error_data[0].message
							})
						} else if (res.error_data.length > 1) {
							uni.showModal({
								content: res.message,
								success: function(res) {
									if (res.confirm) {
								
									} else if (res.cancel) {
								
									}
								}
							});
						}
					}

				}).catch((err) => {
					console.log(err)
				})
			}
			
			
		},
		watch: {
			state: function(newv, oldv) {
				if(newv == "add"){
					this.neworderShow=true
					setTimeout(()=>{
						this.neworderShow=false
					},4000)
				}else{
					this.neworderShow=false
				}
			},
			"uFormModel.spbm": function(newv, oldv) {
				if(newv.length==0){
					this.spbmClearShow=false
					this.isSpComplete=false
					this.clearForm()
					this.clearFocus()
				}else{
					
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.box {
margin: 10rpx 20rpx;

		.box-content {

			padding-bottom: 0;

			.my-collapse {
				.my-collapse-title {
					padding:10px 10px 0;
					color: #fff;
					border-top-left-radius: 10px;
					border-top-right-radius: 10px;
					background-color: #358CC9;

					.fold-title {
						.fold-title-t {
							font-size: 15px;
							font-weight: 600;

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

						.fold-title-con {
							font-size: 12px;
							font-weight: 400;
						}

						.fold-title-flex {
							display: flex;
							justify-content: space-between;
							align-items: center;
						}
					}
				}

				.my-collapse-con {
					background-color: #fff;


					.form-card {
						border-top-left-radius: 0;
						border-top-right-radius: 0;
					}
				}
			}

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
				/deep/.uni-date {
					width: 100%;
					.uni-date__x-input {
						height: 36px;
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

			.lxactive{
				background-color: #358CC9 !important;
				color: #fff;
			}
		}

		.flex-btns {
			display: flex;
			justify-content: space-between;
margin: 20rpx 0;
			/deep/.u-button--primary.my-primary-button {
				width: 28%;
			}
		}
    .unitbox{
      width: 100%;
      display: flex;
      align-items: center;
      .unitbox_l{
        width: 20%;
        margin-right:10rpx;
        font-size: 28rpx;
      }
      .unitbox_r{
        width: 80%;

      }
    }
    .gjlxbox{
      width: 100%;
     display: inline-flex;
      align-items: center;
      margin-bottom:20rpx;
      .gjlxbox_l{
        width: 20%;
        margin-right:10rpx;
      }
      .gjlxbox_r{
        width: 75%;
        .gjlxbox_rr{
          display: inline-flex;
          margin: 0 10px;
        }
      }
    }

		
		.movable-area {
			width: 100%;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 5001;
			pointer-events:none;
			
			.movable-view {
				height: 56px;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				pointer-events:auto;
			}
			
			.movable-view-large{
				width: 100%;
				padding:0 10px;
				box-sizing: border-box;
			}
			
			.iconimgs{
				padding: 0 15px;
				position: relative;
				z-index: 4500;
				
				.iconView {
					width: 52px;
					height: 52px;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 50%;
					background-image: linear-gradient(to right, #48aeed, #3489c7);
					box-shadow: 0px 0px 6px 4px #cdcbcb;
				}
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

    .u-fade-enter-active.data-v-39e33bf2{
      z-index:0
    }
    .u-safe-bottom.data-v-758fd84f{
      padding: 0;
    }
    .u-popup__content.data-v-52d4ddd1{
      width: 90%;
    }
    //.unitbox{
    //  margin: 20rpx 0;
    //}

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
        width: 80%;
        margin-left: 10rpx;
        margin-right: 20rpx;
      }
    }
    
		.uni-select__input-box {
		    width: 100%;
		}
	}
</style>

