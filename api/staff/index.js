import {
	post,
	postWithoutToken,
	get,
	getWithoutToken,
	upload,
} from "./request.js"

//上传文件
function uploadFile(filePath) {
	return upload('/index/file/uploadfile', filePath)
}

//获取楼盘列表
function fetchBuildingList(page, pageSize, name = '', province = '', isRecommend = '') {
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
function submitLogin(userName, password, code) {
	return post('/web/staff/login2', {
		username: userName,
		password: password,
		code: code
	})
}

//员工端提交登记
function submitCustomerCheck(buildingId, channelId, phone, note) {
	return post('/web/staff/check', {
		building_id: buildingId,
		channel_id: channelId,
		phone: phone,
		description: note
	})
}

//获取自己的客户
function fetchCustomerList(page, pageSize, buildingId = '', customerName = '', date = '', channel = '', type = '') {
	return get('/web/staff/myCustomers', {
		page: page,
		limit: pageSize,
		building_id: buildingId,
		user_name: customerName,
		date: date,
		channel_id: channel,
		type: type
	})
}

//获取所有员工
function fetchStaff() {
	return get('/web/staff/getAllUser', {})
}

//获取所有员工
function submitTransfer(id, staffId, ) {
	return post('/web/staff/updcrmstaff', {
		id: id,
		staff_id: staffId
	})
}

export default {
	uploadFile,
	fetchBuildingList,
	fetchChannel,
	fetchCheckCode,
	submitVerifyNumber,
	submitVerifyCode,
	fetchScanRecord,
	submitLogin,
	submitCustomerCheck,
	fetchCustomerList,
	fetchStaff,
	submitTransfer
}