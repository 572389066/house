import cache from "./cache"
export const HOST_IMG = 'https://zykjstore.oss-cn-chengdu.aliyuncs.com'

let baseURL = ''
if (process.env.NODE_ENV === 'development') {
	//开发环境
	baseURL = 'https://houseapi.cqsoftware.cn'
} else {
	//生产环境
	baseURL = 'https://houseapi.cqsoftware.cn'
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
	let token = cache.getToken()
	let header = {
		'content-type': 'application/x-www-form-urlencoded'
	}
	if (token && token.length > 0) {
		header['uid'] = token
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + url,
			data: params,
			header: header,
			method: "POST",
			success: (response) => {
				let res = response.data
				if (res.code === 1) {
					resolve(res.return)
				} else {
					reject(res)
					showError(res);
				}
			},
			fail: (error) => {
				if (error && error.response) {
					reject(error.response)
					showError(error.response);
				}
			},
		});
	})
}

/** 
 * post方法，不带token 对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function postWithoutToken(url, params) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + url,
			data: params,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			method: "POST",
			success: (response) => {
				let res = response.data
				if (res.code === 1) {
					resolve(res.return)
				} else {
					reject(res)
					showError(res);
				}
			},
			fail: (error) => {
				if (error && error.response) {
					reject(error)
					showError(error.response);
				}
			},
		});
	})
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params = {}) {
	let token = cache.getToken()
	let header = {
		'Accept': 'application/json',
		'Content-Type': 'application/x-www-form-urlencoded',
	}
	if (token && token.length > 0) {
		header['uid'] = token
	}

	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + url,
			data: params,
			header: header,
			method: "GET",
			success: (response) => {
				let res = response.data
				if (res.code == 1) {
					resolve(res.return)
				} else {
					reject(res)
					showError(res);
				}
			},
			fail: (error) => {
				console.log("get request fail: " + JSON.stringify(error));
				if (error && error.response) {
					reject(error.response)
					showError(error.response);
				}
			}
		});
	})
}

/**
 * get方法 不传token，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function getWithoutToken(url, params = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + url,
			data: params,
			header: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			method: "GET",
			success: (response) => {
				let res = response.data
				if (res.code == 1) {
					resolve(res.return)
				} else {
					reject(res)
					showError(res);
				}
			},
			fail: (error) => {
				console.log("get request fail: " + JSON.stringify(error));
				if (error && error.response) {
					reject(error.response)
					showError(error.response);
				}
			}
		});
	})
}


/** 
 * post方法，不带token 对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function upload(url, filePath) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: baseURL + url,
			filePath: filePath,
			name: 'file',
			formData: {},
			success: (response) => {
				let res = JSON.parse(response.data)
				if (res.code === 1) {
					resolve(res.return)
				} else {
					reject(res)
					showError(res);
				}
			},
			fail: (error) => {
				if (error && error.response) {
					reject(error)
					showError(error.response);
				}
			},
		});
	})
}

const showError = error => {
	let errorMsg = ''
	if (error.msg && error.msg != '') {
		errorMsg = error.msg
	} else {
		switch (error.code) {
			case 300:
				errorMsg = '未授权，请登录'
				break
			case 400:
				errorMsg = '请求参数错误'
				break
			case 403:
				errorMsg = '跨域拒绝访问'
				break
			case 404:
				errorMsg = '请求地址不存在'
				break
			case 500:
				errorMsg = '服务器内部错误'
				break
			case 504:
				errorMsg = '请求超时'
				break
			default:
				errorMsg = "请求失败"
				break
		}
	}

	uni.showToast({
		title: errorMsg,
		icon: 'none',
		duration: 3000,
		complete: function() {
			setTimeout(function() {
				uni.hideToast();
			}, 3000);
		}
	});
	if (error.code == 300) {
		setTimeout(function() {
			onTokenInvalid()
		}, 500)
	}
}

function onTokenInvalid() {
	// cache.savePhone('')
	cache.saveToken('')

	uni.navigateTo({
		url: '/pages/login/login'
	})
}
