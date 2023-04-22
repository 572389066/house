<template>
	<view></view>
</template>

<script>
	export default {

		data() {
			return {
				scanResult: ''
			}
		},

		onLoad() {
			this.scanCode()
		},

		methods: {
			scanCode() {
				// 允许从相机和相册扫码
				let that = this
				wx.scanCode({
					// scanType: ["qrCode"],
					success: (res) => {
						console.log("scanCode: success" + JSON.stringify(res));
						let path=decodeURIComponent(res.path)
						that.scanResult = path
						let params = that.getPageParams(path)
						let pageName = that.getPageName(path)
						console.log("scanCode params: " + JSON.stringify(params));
						console.log("scanCode pageName: " + JSON.stringify(pageName));
						if (params && params.buildingId && params.scene) {
							if (pageName == '/signIn') {
								uni.redirectTo({
									url: '/pages/register/signIn?buildingId=' + params.buildingId +
										'&scene=' + params.scene
								})
							} else if (pageName == '/register') {
								uni.redirectTo({
									url: '/pages/register/register?buildingId=' + params.buildingId +
										'&scene=' + params.scene
								})
							} else {
								that.scanCode()
							}
						} else {
							that.scanCode()
						}

					},
					fail: (res) => {
						console.log("scanCode: fail" + JSON.stringify(res));
						that.scanResult = ''
						uni.navigateBack()
					},
					complete: () => {

					}
				})
			},

			getPageParams(url) {
				if (url && url != '') {
					let startInddex = url.indexOf('?')
					if (startInddex == -1) {
						startInddex = 0
					}
					let paramStr = url.substring(startInddex + 1, url.length)
					return paramStr.split('&')
						.map(substring => substring.split('='))
						.reduce((a, c) => {
							const [key, value] = c;
							a[key] = value;
							return a;
						}, {})
				} else {
					return null
				}

			},

			getPageName(url) {
				let endIndex = url.indexOf('?')
				let startInddex = url.lastIndexOf('/')
				if (startInddex >= 0) {
					if (endIndex > 0) {
						return url.substring(startInddex, endIndex)
					} else {
						return url
					}
				} else {
					if (endIndex > 0) {
						return url.substring(endIndex)
					} else {
						return url
					}
				}
			}

		}
	}
</script>

<style>

</style>