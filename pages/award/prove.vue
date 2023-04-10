<template>
	<view class="prove">
		<view class="cont">
			<view class="title">推广照片</view>
			<view class="box" @click="onClockUpload()">
				<image v-if="imageURL && imageURL.length>0" :src="getImageUrl(imageURL)" mode="heightFix"
					@error="onLoadImageError"></image>
				<view class="font" v-else>
					<uni-icons type="camera-filled" size="80rpx" color="rgba(51, 49, 52, .25)"></uni-icons>
					<view>上传推广凭证/截图</view>
				</view>
			</view>
		</view>
		<view class="common_bottom" @click="submitPromotion">
			<view>立即上传</view>
		</view>
	</view>
</template>

<script>
	import urlUtil from "../../utils/urlUtil.js"
	export default {
		data() {
			return {
				imageURL: '',
				promotionId: ''
			}
		},
		onLoad(option) {
			this.promotionId = option.id
		},

		methods: {
			getImageUrl(url) {
				let relUrl = urlUtil.getImgUrlNotSize(url)
				return relUrl
			},

			onClockUpload() {
				uni.chooseMedia({
					count: 1,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					maxDuration: 30,
					camera: 'back',
					sizeType: ['compressed'],
					success: (res) => {
						if (res && res.tempFiles && res.tempFiles.length > 0) {
							let tempFile = res.tempFiles[0]
							this.uploadImage(tempFile.tempFilePath)
						}
					}
				})
			},

			uploadImage(filePath) {
				this.$api.uploadFile(filePath)
					.then(res => {
						this.imageURL = res.url
					}).catch(err => {
						this.imageURL = ''
					})
			},

			submitPromotion() {
				if (!this.imageURL || this.imageURL === '') {
					this.$msg('请选择推广照片')
					return
				}
				this.$api.submitPromotion(this.promotionId, this.imageURL)
					.then(res => {
						if (res) {
							if (res.code_type == 'Qrcode' && res.qrcode && res.qrcode != '') {
								//二维码
								uni.redirectTo({
									url: '/pages/award/result?result=' + encodeURIComponent(JSON.stringify(
										res))
								})
							} else if (res.code_type == 'Number' && res.code && res.code != '') {
								//数字
								uni.redirectTo({
									url: '/pages/award/result?result=' + encodeURIComponent(JSON.stringify(
										res))
								})
							} else {
								this.$msg('获取提交结果失败')
							}
						}
					}).catch(err => {

					})
			},

			onLoadImageError(e) {
				this.imageURL = ''
			}
		}
	}
</script>

<style lang="less" scoped>
	.prove {
		overflow: hidden;

		.cont {
			padding: 40rpx 32rpx;
			overflow: hidden;

			.box {
				position: relative;
				display: flex;
				align-items: center;
				width: 100%;
				height: 338rpx;
				border: 2rpx dashed rgba(51, 49, 52, .25);
				overflow: hidden;

				image {
					position: absolute;
					top: 0;
					left: 50%;
					height: 100%;
					transform: translateX(-50%);
				}

				.font {
					width: 100%;
					text-align: center;

					view {
						text-align: center;
						font-size: 20rpx;
						color: rgba(51, 49, 52, .25);
					}
				}
			}

			.title {
				font-size: 28rpx;
				font-weight: 600;
				margin-bottom: 32rpx;
			}
		}
	}
</style>
