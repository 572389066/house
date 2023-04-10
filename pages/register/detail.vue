<template>
	<view class="register">
		<view class="cont">
			<view :class="['info',type!=1?'active':'']">
				<view class="li">
					<view class="left">

						<view class="name">
							<uni-icons type="person" size="34rpx" color="#626162"></uni-icons>
							<view>基础信息</view>
						</view>

						<view class="text">
							<view>{{ recordDetail.user_name }} {{ recordDetail.user_phone }} </view>
						</view>
					</view>
				</view>
				<view class="li">
					<view class="left">
						<view class="name">
							<uni-icons type="location" size="34rpx" color="#626162"></uni-icons>
							<view>所属公司</view>
						</view>
						<view class="text">
							<view>{{ recordDetail.user_company }}</view>
							<view>{{ recordDetail.user_company_address }}</view>
						</view>
					</view>
				</view>
			</view>

			<view class="address">{{ recordDetail.build_name }}</view>

			<view class="photos">
				<view class="title">客户接待照片</view>
				<view class="ul">
					<block v-if="uploadResult&&uploadResult.length>0">
						<view class="img" v-for="(item,index) in uploadResult">
							<image :src="getImageUrl(item)" mode="aspectFill"></image>
						</view>
					</block>
				</view>
			</view>
			<view class="time">登记时间：{{ recordDetail.date }}</view>
		</view>

	</view>
</template>

<script>
	import urlUtil from "../../utils/urlUtil.js"
	export default {
		data() {
			return {
				recordDetail: {},
				uploadResult: []
			}
		},
		onLoad(options) {
			let detail = options.detail;
			if (detail && detail != '') {
				this.recordDetail = JSON.parse(detail)
			}

			if (this.recordDetail && this.recordDetail.pictures) {
				this.uploadResult = this.recordDetail.pictures
			}
		},


		methods: {
			getImageUrl(url) {
				return urlUtil.getImgUrl(url)
			},
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
