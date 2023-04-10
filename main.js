import App from './App'
import api from "./api/index"
import staffApi from "./api/staff/index"

const tipsFun = (text) => {
	uni.showToast({
		title: text,
		icon: 'none',
		duration: 2000
	});
}

const shareIndex = () => {
	return {
		title: '森琥好房',
		path: '/pages/index/index'
	}
}

const shareBuilding = (id, title) => {
	let _title = '森琥好房'
	let path = '/pages/index/index'
	if (id && id != '') {
		path = '/pages/pfs/detail?id=' + id
		if (title && title != '') {
			_title = title
		}
	}

	return {
		title: _title,
		path: path
	}
}

const shareAward = (id, title) => {
	let _title = '森琥好房'
	let path = '/pages/index/index'
	if (id && id != '') {
		path = '/pages/award/detail?id=' + id
		if (title && title != '') {
			_title = title
		}
	}

	return {
		title: _title,
		path: path
	}
}

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.prototype.$staffApi = staffApi;
Vue.prototype.$msg = tipsFun;
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif



// #ifdef VUE3
import {
	createSSRApp
} from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	app.config.globalProperties.$api = api;
	app.config.globalProperties.$staffApi = staffApi;
	app.config.globalProperties.$msg = tipsFun;
	app.config.globalProperties.$shareIndex = shareIndex;
	app.config.globalProperties.$shareBuilding = shareBuilding;
	app.config.globalProperties.$shareAward = shareAward;
	return {
		app
	}
}
// #endif
