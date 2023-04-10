<template>
	<view class="register">
		<view class="cont">
			<view :class="['info','active']">
				<view class="li" @click="goFun()">
					<view class="left">
						<view class="name">
							<uni-icons type="person" size="34rpx" color="#626162"></uni-icons>
							<view>基础信息</view>
						</view>
						<view class="text">
							<view v-if="userCard">{{ userCard.name }} {{ userCard.phone }}</view>
							<view class="tip" v-else></view>
						</view>
					</view>
					<uni-icons type="right" size="34rpx" color="rgba(51, 49, 52, .5)"
						style="position: relative;top: 2rpx;"></uni-icons>
				</view>
				<view class="li">
					<view class="left">
						<view class="name">
							<uni-icons type="location" size="34rpx" color="#626162"></uni-icons>
							<view>所属公司</view>
						</view>
						<view class="text">
							<block v-if="userCard && userCard.company">
								<view>{{ userCard.company }}</view>
							</block>
							<block v-else>
								<view></view>
							</block>
							<block v-if="userCard && userCard.address">
								<view>{{ userCard.address }}</view>
							</block>
							<block v-else>
								<view></view>
							</block>
						</view>
					</view>
				</view>
			</view>

			<view class="address" v-if="buildingDetail">项目 {{ buildingDetail.name}}</view>
			<view class="address" v-else>项目</view>

			<view class="photos">
				<view class="title">客户接待照片</view>
				<view class="ul">
					<block v-if="uploadResult&&uploadResult.length>0">
						<view class="img" v-for="(item,index) in uploadResult">
							<image :src="getImageUrl(item)" mode="aspectFill"></image>
							<!-- #ifdef MP-WEIXIN -->
							<view class="clon" @click="onClickDelete(index)">
								<uni-icons type="closeempty" size="24rpx" color="#fff"></uni-icons>
							</view>
							<!-- #endif -->
							<!-- #ifndef MP-WEIXIN -->
							<view class="clon" @click="onClickDelete(index)">
								<uni-icons type="closeempty" size="16rpx" color="#fff"></uni-icons>
							</view>
							<!-- #endif -->
						</view>
					</block>

					<block v-if="!uploadResult||uploadResult.length<4">
						<view class="upload" @click="onClickUpload">
							<view>
								<uni-icons type="camera-filled" size="80rpx" color="rgba(51, 49, 52, .25)"></uni-icons>
								<view>上传图片</view>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
		<view class="common_bottom" @click="onClickSubmit()">
			<view>提交</view>
		</view>
	</view>
</template>

<script>
	import urlUtil from "../../utils/urlUtil.js"
	import cache from "../../utils/cache.js"
	export default {
		data() {
			return {
				buildingId: '',
				scene: '',
				userCard: null,
				buildingDetail: null,
				uploadResult: []
			}
		},
		onLoad(options) {
			this.buildingId = options.buildingId;
			this.scene = options.scene;

			uni.setNavigationBarTitle({
				title: '登记'
			});

			this.fetchBuilding()
		},

		onShow() {
			if (this.checkLogin()) {
				this.fetchUserCard()
			}
		},

		methods: {
			goFun() {
				uni.navigateTo({
					url: "/pages/register/edit?type=2"
				})
			},

			getImageUrl(url) {
				return urlUtil.getImgUrl(url)
			},

			onClickDelete(index) {
				if (this.uploadResult && this.uploadResult.length > index) {
					this.uploadResult.splice(index, 1)
					let arr = this.uploadResult
					this.uploadResult = arr
				}
			},

			onClickUpload() {
				let count = 4
				if (this.uploadResult) {
					count = 4 - this.uploadResult.length
				}
				if (count > 0) {
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
				}
			},

			uploadImage(filePath) {
				this.$api.uploadFile(filePath)
					.then(res => {
						this.uploadResult.push(res.url)
					}).catch(err => {

					})
			},

			fetchUserCard() {
				this.$api.fetchUserCard()
					.then(res => {
						this.userCard = res
					}).catch(err => {})
			},

			fetchBuilding() {
				this.$api.fetchBuildingDetail(this.buildingId)
					.then(res => {
						this.buildingDetail = res
					}).catch(err => {})
			},

			onClickSubmit() {
				uni.showModal({
					title: '提示',
					content: '是否确认提交登记信息',
					success: (res) => {
						if (res.confirm) {
							this.submitCheck()
						} else if (res.cancel) {

						}
					}
				});
			},

			submitCheck() {
				let img = ''
				if (this.uploadResult && this.uploadResult.length > 0) {
					for (var i = 0; i < this.uploadResult.length; i++) {
						let url = this.uploadResult[i]
						if (url && url != '') {
							if (img != '') {
								img = img + ','
							}
							img = img + url
						}
					}
				}
				this.$api.submitSalesCheck(this.scene, img)
					.then(res => {
						this.$msg('提交成功')
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}, 500)
					}).catch(err => {})
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
	.register {
		overflow: hidden;

		.cont {
			padding: 24rpx 32rpx 174rpx;
			overflow: hidden;

			.time {
				font-size: 24rpx;
				color: #A9A9A9;
				padding-top: 60rpx;
			}

			.photos {
				overflow: hidden;
				padding-top: 60rpx;

				.ul {
					overflow: hidden;

					.upload {
						float: left;
						margin-top: 24rpx;
						width: calc((100vw - 64rpx - 36rpx) / 4.0);
						height: calc((100vw - 64rpx - 36rpx) / 4.0);
						border-radius: 4rpx;
						border: 2rpx dashed rgba(51, 49, 52, .25);
						display: flex;
						align-items: center;
						justify-content: center;

						view {
							text-align: center;
							font-size: 20rpx;
							color: rgba(51, 49, 52, .25);
						}
					}

					.img {
						position: relative;
						overflow: hidden;
						width: calc((100vw - 64rpx - 36rpx) / 4.0);
						height: calc((100vw - 64rpx - 36rpx) / 4.0);
						border-radius: 4rpx;
						margin-top: 24rpx;
						margin-right: 12rpx;
						float: left;

						.clon {
							position: absolute;
							top: 0;
							right: 0;
							width: 40rpx;
							height: 40rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							background: rgba(0, 0, 0, .5);
							border-bottom-left-radius: 4rpx;

							/* #ifdef MP-WEIXIN */
							uni-icons {
								position: relative;
								top: -2rpx;
							}

							/* #endif */
						}

						image {
							width: 100%;
							height: 100%;
						}
					}

					view:last-child {
						margin-right: 0rpx;
					}
				}



				.title {
					font-size: 28rpx;
					font-weight: 600;
				}
			}

			.address {
				padding: 44rpx 0;
				border-bottom: 2rpx solid rgba(242, 242, 242, .5);
				font-size: 28rpx;
				font-weight: 600;
			}

			.info.active {
				background: #F6F6F6;
			}

			.info {
				border-radius: 24rpx;
				padding: 0 24rpx;
				border: 2rpx solid #F6F6F6;

				.li {
					padding: 40rpx 0;
					border-bottom: 2rpx solid rgba(186, 185, 191, .15);
					display: flex;
					justify-content: space-between;

					.left {
						display: flex;

						.text {
							padding-left: 20rpx;

							view:first-child {
								color: #333134;
								font-size: 28rpx;
								font-weight: 600;
							}

							view:nth-child(2) {
								font-size: 24rpx;
								color: #A9A9A9;
								padding-top: 8rpx;
							}
						}

						.name {
							display: flex;

							.uni-icons {
								position: relative;
								top: 2rpx;
							}

							view {
								font-size: 28rpx;
								color: #626162;
								padding-left: 8rpx;
							}
						}
					}
				}

				.li:last-child {
					border: none;
				}
			}
		}
	}

	.tip {
		color: #A9A9A9;
	}
</style>
