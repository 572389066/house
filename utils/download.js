const app = getApp()
export default {
	/**
	 * 保存图片
	 * url 图片url地址
	 * is_video是否视频
	 */
	saveImage: function(url, is_video) {
		let that = this;
		// 向用户发起授权请求
		uni.authorize({
			scope: 'scope.writePhotosAlbum',
			success: () => {
				// 已授权
				that.downLoadImg(url, is_video);
			},
			fail: () => {
				// 拒绝授权，获取当前设置
				uni.getSetting({
					success: (result) => {
						if (!result.authSetting['scope.writePhotosAlbum']) {
							that.isAuth()
						}
					}
				});
			}
		})
	},
	/**
	 * 下载资源，保存图片到系统相册
	 */
	downLoadImg: function(url, is_video) {
		uni.showLoading({
			title: '加载中'
		});
		uni.downloadFile({
			url: url,
			success: (res) => {
				uni.hideLoading();
				if (res.statusCode === 200) {
					if (is_video == false) {
						// 图片下载
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								uni.showToast({
									title: "已保存到相册",
									icon: "none"
								});
							},
							fail: function() {
								uni.showToast({
									title: "保存失败，请稍后重试",
									icon: "none"
								});
							}
						});
					} else {
						// 视频下载
						uni.saveVideoToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								uni.showToast({
									title: "已保存到相册",
									icon: "none"
								});
							},
							fail: function() {
								uni.showToast({
									title: "保存失败，请稍后重试",
									icon: "none"
								});
							}
						})
					}

				} else {
					uni.showToast({
						title: "资源格式错误，请联系管理员",
						icon: "none"
					});
				}
			},
			fail: (err) => {
				uni.showToast({
					title: "保存失败，请联系管理员",
					icon: "none"
				});
			}
		})
	},

	/*
	 * 引导用户开启权限
	 */
	isAuth: function() {
		uni.showModal({
			content: '由于您还没有允许保存图片到您相册里,无法进行保存,请点击确定允许授权',
			success: (res) => {
				if (res.confirm) {
					uni.openSetting({
						success: (result) => {
							console.log(result.authSetting);
						}
					});
				}
			}
		});
	},
}
