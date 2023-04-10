import {
	post,
	postWithoutToken,
	get,
	getWithoutToken,
	upload,
} from "../utils/request.js"

//首页banner
function getBanner() {
	return get('/web/index/banner')
}

//获取楼盘列表
function fetchBuildingList(page, pageSize, name, province, isRecommend) {
	let recommend = ''
	if (isRecommend) {
		recommend = 'Recommend'
	}
	return get('/web/building/index', {
		page: page,
		limit: pageSize,
		name: name,
		province: province,
		type: recommend
	})
}

//获取楼盘详情
function fetchBuildingDetail(id) {
	return get('/web/building/detail', {
		id: id
	})
}

//推广获奖
function fetchPromotionList(page, pageSize) {
	return get('/web/promotion/index', {
		page: page,
		limit: pageSize
	})
}

//推广获奖详情
function fetchPromotionDetail(id) {
	return get('/web/promotion/detail', {
		id: id
	})
}

//推广记录
function fetchPromotionRecord(page, pageSize) {
	return get('/web/promotion/log', {
		page: page,
		limit: pageSize
	})
}

//上传推广凭证
function submitPromotion(id, url) {
	return post('/web/promotion/prof', {
		promotion_id: id,
		picture: url
	})
}

//活动项目
function fetchActivityList(page, pageSize) {
	return get('/web/activity/index', {
		page: page,
		limit: pageSize
	})
}

//登录
///web/user/login
function submitLogin(loginCode, phoneCode) {
	return postWithoutToken('/web/user/login2', {
		code: loginCode,
		phonecode: phoneCode
	})
}

//上传文件
function uploadFile(filePath) {
	return upload('/index/file/uploadfile', filePath)
}

//编辑用户卡片
function submitUserCard(name, phone, company, address) {
	return post('/web/user/cardModify', {
		name: name,
		phone: phone,
		company: company,
		address: address
	})
}

//获取用户卡片
function fetchUserCard() {
	return post('/web/user/getCard', {})
}

//用户反馈
function submitFeedback(content, phone) {
	return post('/web/user/feedBack', {
		content: content,
		contact: phone
	})
}

//中介登记签到
function submitSalesCheck(scene, picture) {
	return post('/web/building/salesCheck', {
		scene: scene,
		picture: picture
	})
}

//客户登记签到
function submitCustomCheck(scene) {
	return post('/web/building/CustomerCheck', {
		scene: scene,
		debug: 1
	})
}

//登记记录
function fetchCheckRecord(page, pageSize) {
	return get('/web/building/log', {
		page: page,
		limit: pageSize
	})
}

//获取用户
function fetchUserInfo() {
	return get('/web/user/getUserInfo', {})
}

//*********员工端 START---------------------------------------------------
//获取楼盘列表
// function fetchBuildingList(page, pageSize, name, province, isRecommend) {
// 	let recommend = ''
// 	if (isRecommend) {
// 		recommend = 'Recommend'
// 	}
// 	return get('/web/building/index', {
// 		page: page,
// 		limit: pageSize,
// 		name: name,
// 		province: province,
// 		type: recommend
// 	})
// }

//获取渠道
function fetchChannel() {
	return get('/web/channel/list', {})
}

//获取登记二维码
function fetchCheckCode(buildingId, channelId) {
	return get('/web/building/getCheckCode', {
		building_id: buildingId,
		channel_id: channelId
	})
}

//核销---数字码
function submitVerifyNumber(code) {
	return post('/web/promotion/verifyNumber', {
		code: code
	})
}

//核销---二维码
function submitVerifyCode(codeId) {
	return post('/web/promotion/verifyCode', {
		id: codeId
	})
}

//获取二维码扫描记录
function fetchScanRecord(scene) {
	return get('/web/building/getScanLog', {
		scene: scene
	})
}

//员工登录
// function submitLogin(userName, password) {
// 	return post('/web/staff/login', {
// 		username: userName,
// 		password: password
// 	})
// }

//员工端提交登记
function submitCustomerCheck(buildingId, channelId, phone, note) {
	return post('/web/staff/check', {
		building_id: buildingId,
		channel_id: channelId,
		phone: phone,
		description: note
	})
}
//------------------------------------------------------------员工端 END---------------------------------------------------//

export default {
	uploadFile,
	getBanner,
	fetchBuildingList,
	fetchBuildingDetail,
	fetchPromotionList,
	fetchPromotionDetail,
	fetchPromotionRecord,
	submitPromotion,
	fetchActivityList,
	submitLogin,
	submitUserCard,
	fetchUserCard,
	submitFeedback,
	submitSalesCheck,
	submitCustomCheck,
	fetchCheckRecord,
	fetchUserInfo,


	// fetchBuildingList,
	fetchChannel,
	fetchCheckCode,
	submitVerifyNumber,
	submitVerifyCode,
	fetchScanRecord,
	// submitLogin,
	submitCustomerCheck
}