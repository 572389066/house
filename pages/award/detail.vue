<template>
	<view class="a_detail">
		<view class="cont">
			<view class="tips">
				<uni-icons type="info" size="30rpx" color="#E09A5B"></uni-icons>
				<view>复制文字与图片分享到朋友圈，截图上传推广证明。得奖励</view>
			</view>
			<view class="title">{{ promotionDetail.title }}</view>
			
			<mp-html ref="article" :content="promotionDetail.detail" />
			<!-- <view class="content">
				<image src="https://www.cqwuyesq.com/assets/introduce4-d764c829.png" mode="widthFix"></image>
			</view> -->
		</view>
		<view class="common_bottom three">
			<view class="active" @click="onClickDownload()">导出图片/视频</view>
			<view class="active" @click="onClickCopy()">复制文字</view>
			<view @click="goupload">上传推广证明</view>
		</view>
	</view>
</template>

<script>
	import cache from "../../utils/cache.js"
	import download from "../../utils/download.js"
	import urlUtil from "../../utils/urlUtil.js"
	import clipboard from "../../utils/clipboard.js"
	export default {
		data() {
			return {
				promotionId: '',
				promotionDetail: null,
				videoData: []
			}
		},

		onLoad(option) {
			this.promotionId = option.id
			this.fetchPromotionDetail()
		},

		onShareAppMessage(res) {
			if (this.promotionDetail) {
				return this.$shareAward(this.promotionId, this.promotionDetail.title)
			} else {
				return this.$shareIndex()
			}

		},

		methods: {
			goupload() {
				if (this.checkLogin()) {
					uni.navigateTo({
						url: '/pages/award/prove?id=' + this.promotionId
					})
				}
			},

			fetchPromotionDetail() {
				this.$api.fetchPromotionDetail(this.promotionId).then(res => {
					this.promotionDetail = res
					this.getVideo()
				}).catch(err => {

				})
			},

			getVideo() {
				if (this.promotionDetail && this.promotionDetail.detail && this.promotionDetail.detail != '') {
					let data = [];
					let html = this.promotionDetail.detail
					html.replace(/<video [^>]*src=['"]([^'"]+)[^>]*>/, function(match, capture) {
						data.push(capture);
					});
					this.videoData = data
				}
			},

			onClickDownload() {
				let view = this.$refs.article
				let imageList = view.imgList

				let mediumData = []
				if (imageList && imageList.length > 0) {
					for (var i = 0; i < imageList.length; i++) {
						let url = imageList[i]
						if (url && url != '') {
							mediumData.push(url)
						}
					}
				}

				if (this.videoData && this.videoData.length > 0) {
					for (var i = 0; i < this.videoData.length; i++) {
						let url = this.videoData[i]
						if (url && url != '') {
							mediumData.push(url)
						}
					}
				}
				if (mediumData.length == 0) {
					this.$msg('未找到图片/视频资源')
					return
				}

				for (var i = 0; i < mediumData.length; i++) {
					let url = mediumData[i]
					download.saveImage(url, urlUtil.isVideo(url))
				}
			},
			
			onClickCopy(){
				let view = this.$refs.article
				let text = view.getText()
				clipboard(text)
				
				this.$msg('复制成功')
			},

			checkLogin() {
				let token = cache.getToken()
				if (!token || token == '') {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return false
				} else {
					return true
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.a_detail {
		overflow: hidden;

		.cont {
			padding: 24rpx;
			overflow: hidden;

			.content {
				padding: 28rpx 0 192rpx;

				p,
				span {
					font-size: 24rpx;
				}

				image,
				img {
					width: 100%;
				}
			}

			.text {
				font-size: 28rpx;
				color: #333134;
			}

			.title {
				font-size: 40rpx;
				font-weight: 600;
				padding: 24rpx 0;
				margin-bottom: 10rpx;
			}

			.tips {
				display: flex;
				// align-items: center;
				background: rgba(167, 167, 167, .1);
				padding: 28rpx 24rpx;
				border-radius: 8rpx;

				view {
					font-size: 24rpx;
					color: #E09A5B;
				}
			}
		}
	}
</style>
