const http = uni.$u.http


// post请求，获取菜单
//export const postMenu = (params, config = {}) => http.post("/ebapi/public_api/index", params, config)
// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
//export const getMenu = (data) => http.get("/ebapi/public_api/index", data)

//商家预付款
export const businessprepay=(params, config = {}) => http.post("mzato/businessprepay", params, config)
export const sendmessage=(params, config = {}) => http.post("mzato/main/app/sendmessage", params, config)
//永续采购 流程图 公用接口
export const commonMain=(params, config = {}) => http.post("mzato/main", params, config)

//手机验证码
export const bindphone=(params, config = {}) => http.post("mzato/main/app/bindphone", params, config)
//用户注册接口
export const usercheck=(params, config = {}) => http.post("mzato/main/app/usercheck", params, config)
//检测门店是否在线门店接口
export const ckonlinefd=(params, config = {}) => http.post("mzato/main/app/ckonlinefd", params, config)
//用户验证
export const usercheckapp=(params, config = {}) => http.post("mzsale/web/login/usercheck", params, config)
//第三方登录
export const logintype=(params, config = {}) => http.post("mzato/main/app/logintype", params, config)
//
export const sendCheck=(params, config = {}) => http.post("mzato/main/app/sendCheck", params, config)
//微信获取openid
export const getopenid=(params, config = {}) => http.post("mzato/main/app/getopenid", params, config)

//三方验证
export const userfast=(params, config = {}) => http.post("mzato/main/app/userfast", params, config)
//登录日志
export const getlogin=(params, config = {}) => http.post("mzato/main/app/getlogin", params, config)
//问题反馈
export const getQuestion=(params, config = {}) => http.post("mzato/main/app/getQuestion", params, config)
//公告拉取,验收完成处理
export const oaNoticec=(params, config = {}) => http.post("mzato/main/app/oaNoticec", params, config)
//获取最新工作信息
export const oaWorkFlow=(params, config = {}) => http.post("mzato/main/app/oaWorkFlow", params, config)
// app获取首页仪表盘分析数据
export const getappsalereport=(params, config = {}) => http.post("mzato/main/app/getappsalereport", params, config)
//工作流快速处理
export const oaWorkFlowWCk=(params, config = {}) => http.post("mzato/main/app/oaWorkFlowWCk", params, config)
//公告内容预览
export const getnotice=(params, config = {}) => http.post("mzato/main/app/getnotice", params, config)
//公告回复操作
export const oaNoticeRey=(params, config = {}) => http.post("mzato/main/app/oaNoticeRey", params, config)
//应用检查更新
export const appCheckVersion=(params, config = {}) => http.post("mzato/main/app/appCheckVersion", params, config)
//工作流内容预览
export const getDJdata=(params, config = {}) => http.post("mzato/main/app/getDJdata", params, config)
//工作流内容处理
export const oaNoticeCk=(params, config = {}) => http.post("mzato/main/app/oaNoticeCk", params, config)
//OA与APP获取必要信息
export const getother=(params, config = {}) => http.post("mzato/main/app/getother", params, config)

//仪表盘数据
export const getpcadmindaysale=(params, config = {}) => http.post("mzsale/web/basic/getpcadmindaysale", params, config)
//更新商店信息
export const getFenDian=(params, config = {}) => http.post("mzato/main/app/getFenDian", params, config)
//商品上传更新
export const uploadgoshoping=(params, config = {}) => http.post("mzato/main/app/uploadgoshoping", params, config)
//在线查找商品
export const searchGoods=(params, config = {}) => http.post("mzato/main/app/searchGoods", params, config)
//在线查找商家
export const searchSupplier=(params, config = {}) => http.post("mzato/main/app/searchSupplier", params, config)
//更新供货方式信息
export const getSupplyType=(params, config = {}) => http.post("mzato/main/app/getSupplyType", params, config)
//更新部门信息
export const getDepart=(params, config = {}) => http.post("mzato/main/app/getDepart", params, config)
//在线商店信息
export const getfendians=(params, config = {}) => http.post("mzato/main/app/getfendians", params, config)
//报表查询接口
//12个综合报表
export const reportForm = (params, config = {}) => http.post("mzato/main/app/reportForm", params, config)
//查询动态报表条件
export const condition = (params, config = {}) => http.post("mzsale/web/report/condition", params, config)
//获取报表列头
export const getcolumns = (params, config = {}) => http.post("mzsale/web/report/condition/getcolumns", params, config)

//查询报表明细
export const getlist = (params, config = {}) => http.post("mzsale/web/report/condition/getlist", params, config)


//通用动态条件查询
export const  query= (params, config = {}) => http.post("mzsale/web/report/conditon/query", params, config)
//基础信息查询接口
export const  basic= (params, config = {}) => http.post("mzsale/web/basic", params, config)

//更新商家信息
export const getSupplier=(params, config = {}) => http.post("mzato/main/app/getSupplier", params, config)
//商家销售
export const checkSjSale=(params, config = {}) => http.post("mzato/main/app/checkSjSale", params, config)
//收银缴款查询
export const getQuerySyySaleJK=(params, config = {}) => http.post("mzato/main/app/getQuerySyySaleJK", params, config)
//销售日报
export const saleCWbb=(params, config = {}) => http.post("mzato/main/app/saleCWbb", params, config)
//部门分析
export const queryBMSalebb=(params, config = {}) => http.post("mzato/main/app/queryBMSalebb", params, config)
//大类分析
export const fdSuperSale=(params, config = {}) => http.post("mzato/main/app/fdSuperSale", params, config)
//门店分析
export const fdSaleAnalyze=(params, config = {}) => http.post("mzato/main/app/fdSaleAnalyze", params, config)
//大类指标
export const fdSPTypeAnalyze=(params, config = {}) => http.post("mzato/main/app/fdSPTypeAnalyze", params, config)
//应付账款
export const cwsjjxcInfo=(params, config = {}) => http.post("mzato/main/app/cwsjjxcInfo", params, config)
//商品详情
export const spkcinfo=(params, config = {}) => http.post("mzato/main/app/spkcinfo", params, config)
//商品库存详情
export const qySpkcinfo=(params, config = {}) => http.post("mzato/main/app/qySpkcinfo", params, config)
//销售客单统计
export const custombb=(params, config = {}) => http.post("mzato/main/app/custombb", params, config)
//顾客消费分析
export const query002=(params, config = {}) => http.post("mzato/main/app/query002", params, config)
//商品销售综合
export const querySPSalebb=(params, config = {}) => http.post("mzato/main/app/querySPSalebb", params, config)
//实时获取报表数据
export const getAPPSaleReport=(params, config = {}) => http.post("mzato/main/app/getAPPSaleReport", params, config)
//获取采购数据
export const getCGDdata=(params, config = {}) => http.post("mzato/main/app/getCGDdata", params, config)
//验收完成处理
export const getCGDdataCK=(params, config = {}) => http.post("mzato/main/app/getCGDdataCK", params, config)
//获取实时报表数据
export const getToDaySale=(params, config = {}) => http.post("mzato/main/app/getToDaySale", params, config)

//商品补货接口
//离线上传补货单
export const uploadList=(params, config = {}) => http.post("mzato/main/app/uploadList", params, config)
//获取永续补货数据
export const getYXBHData=(params, config = {}) => http.post("mzato/main/app/getYXBHData", params, config)

//商品入库
//更新仓库信息
export const getCheckStorage=(params, config = {}) => http.post("mzato/main/app/getCheckStorage", params, config)
//离线上传入库单
export const uploadstorage=(params, config = {}) => http.post("mzato/main/app/uploadstorage", params, config)
//查询商品库存概况
export const getGoodsStock=(params, config = {}) => http.post("mzato/main/app/getGoodsStock", params, config)
//商品拣货处理
export const getPickArea=(params, config = {}) => http.post("mzato/main/app/getPickArea", params, config)

//商品盘点接口
//离线盘点单上传
export const uploadCheckList=(params, config = {}) => http.post("mzato/main/app/uploadCheckList", params, config)

//录标价签
//上传标价签
export const uploadLabelList=(params, config = {}) => http.post("mzato/main/app/uploadLabelList", params, config)
//永续补货 上传
export const upload=(params, config = {}) => http.post("mzato/main/app/upload", params, config)


//手动生成离线包
//手动生成离线数据包
export const eCAppBaseData=(params, config = {}) => http.post("mzato/main/app/eCAppBaseData", params, config)

//蓉城易购
export const rcusercheck=(params, config = {}) => http.post("mzsale/web/login/usercheck", params, config)
export const rcsearchs=(params, config = {}) => http.post("mzsale/web/goods/search", params, config)
export const rcinfos=(params, config = {}) => http.post("mzsale/web/goods/fast/info", params, config)
export const rclogin=(params, config = {}) => http.post("mzsale/web/login", params, config)
export const queryall=(params, config = {}) => http.post("mzsale/web/goodstype/queryall", params, config)

export const rcdosave=(params, config = {}) => http.post("mzsale/web/goods/fast/dosave", params, config)

export const rcgetpctodayssale=(params, config = {}) => http.post("mzsale/web/basic/getpctodayssale", params, config)
export const rcspsearch=(params, config = {}) => http.post("api/goods/rcyg/search", params, config)
export const rcadd=(params, config = {}) => http.post("api/goods/rcyg/add", params, config)
//basics
export const rcbasics=(params, config = {}) => http.post("mzsale/web/basic", params, config)
export const rcgetlist = (params, config = {}) => http.post("/mzsale/web/report/getlist", params, config)
export const rccondition = (params, config = {}) => http.post("mzsale/web/report/condition", params, config)
export const rcsearch = (params, config = {}) => http.post("/mzsale/web/goods/search", params, config)

//token
export const token = (params, config = {}) => http.post("/mzsale/web/token", params, config)


//入库单
export const rcRkdCheck = (params, config = {}) => http.post("/mzsale/web/rkd/check", params, config)
export const rcRkdDelete = (params, config = {}) => http.post("/mzsale/web/rkd/delete", params, config)
export const rcRkdDosave = (params, config = {}) => http.post("/mzsale/web/rkd/dosave", params, config)
export const rcrkddelLine = (params, config = {}) => http.post("/mzsale/web/rkd/delete/line", params, config)
export const rcGetlistC = (params, config = {}) => http.post("/mzsale/web/common/getlist", params, config)
export const rcOrderNew = (params, config = {}) => http.post("/mzsale/web/common/order/new", params, config)
export const rcqueryHT = (params, config = {}) => http.post("/mzsale/web/contract/ht/query", params, config)
export const rcip = (params, config = {}) => http.get("/mzsale/web/login", params, config)
export const rcserct = (params, config = {}) => http.post("/mzato/main/app/serct", params, config)
//出库
export const rcckdosave = (params, config = {}) => http.post("/mzsale/web/thd/dosave", params, config)
export const rcckcheck = (params, config = {}) => http.post("/mzsale/web/thd/check", params, config)
export const rcckdelete = (params, config = {}) => http.post("/mzsale/web/thd/delete", params, config)
export const rcckline = (params, config = {}) => http.post("/mzsale/web/thd/delete/line", params, config)
//盘点
export const rcpddosave = (params, config = {}) => http.post("/mzsale/web/pdd/dosave", params, config)
export const rcpdcheck = (params, config = {}) => http.post("/mzsale/web/pdd/check", params, config)
export const rcpddelete = (params, config = {}) => http.post("/mzsale/web/pdd/delete", params, config)
export const rcpdline = (params, config = {}) => http.post("/mzsale/web/pdd/delete/line", params, config)
//记账
export const rcjz = (params, config = {}) => http.post("/mzsale/web/pdd/app/fastset", params, config)
//功能权限
export const  rcgnqx= (params, config = {}) => http.post("/mzsale/web/basic/authority", params, config)
//子层级查询
export const  getchild= (params, config = {}) => http.post("/mzsale/web/report/condition/child/getlist", params, config)