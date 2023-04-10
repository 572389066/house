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
				uni.scanCode({
					scanType: ["WX_CODE"],
					success: (res) => {
						that.scanResult = res.path
						let params = that.getPageParams(res.path)
						let pageName = that.getPageName(res.path)

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
