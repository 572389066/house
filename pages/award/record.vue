<template>
	<view class="record">

		<z-paging ref="paging" v-model="recordData" @query="fetchPromotionRecord">
			<view class="ul">
				<view class="li" v-for="(item,index) in recordData" @click="showQRCodeUI(item)">
					<view class="left">
						<view>{{ item.promotion_title }}</view>
						<!-- <view>“重庆金地自在城销售中心”领取</view> -->
						<view>{{ item.date }}</view>
					</view>
					<view class="right" v-if="item.code_type==='Qrcode'">
						<view>
							<image src="@/static/image/code.png"></image>
						</view>
						<view class="none" v-if="item.code_status==='Enable'">待领取</view>
						<view v-else>已领取</view>
					</view>
					<view class="right" v-else-if="item.code_type==='Number'">
						<view>{{ item.code }}</view>
						<view class="none" v-if="item.code_status==='Enable'">待领取</view>
						<view v-else>已领取</view>
					</view>
					<view class="right" v-else>

					</view>
				</view>
			</view>
		</z-paging>

		<uni-popup ref="popup" type="center">
			<view class="code">
				<view class="title">领取码</view>
				<view class="code-box" @longpress="saveQR">
					<uqrcode ref="uqrcode" canvas-id="qrcode" :value="qrCodeValue" :options="{ margin: 0 }"
						sizeUnit="rpx" size="300"></uqrcode>
				</view>
				<view class="text">提供二维码获奖</view>
				<view class="tip">长按二维码保存</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qrCodeValue: '',
				recordData: []
			}
		},
		methods: {
			showQRCodeUI(item) {
				if (item && item.code_status == 'Enable' && item.code_type == 'Qrcode') {
					this.qrCodeValue = item.qrcode
					this.$refs.popup.open()
				}
			},

			saveQR() {
				this.$refs.uqrcode.save({
					success: () => {
						uni.showToast({
							icon: 'success',
							title: '保存成功'
						});
					}
				});
			},

			fetchPromotionRecord(page, pageSize) {
				this.$api.fetchPromotionRecord(page, pageSize)
				.then(res => {
					this.$refs.paging.complete(res);
				}).catch(err => {
					this.$refs.paging.complete(false);
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.code {
		position: relative;
		z-index: 54;
		width: 400rpx;
		background: #fff;
		border-radius: 8rpx;
		padding: 40rpx 50rpx;

		display: flex;
		flex-direction: column;

		.text {
			text-align: center;
			font-size: 28rpx;
			color: #A3A7B3;
		}

		.tip {
			text-align: center;
			font-size: 24rpx;
			color: #A3A7B3;
		}

		.code-box {
			width: 300rpx;
			height: 300rpx;
			align-self: center;
			margin-top: 40rpx;
			margin-bottom: 40rpx;
		}

		.title {
			font-size: 32rpx;
			font-weight: 600;
			text-align: center;
		}
	}

	.record {
		overflow: hidden;

		.ul {
			padding: 0 32rpx;

			.li {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 40rpx 0;
				border-bottom: 2rpx solid rgba(186, 185, 191, .2);

				.right,
				.left {
					view:first-child {
						font-size: 28rpx;
						font-weight: 600;
					}

					view:nth-child(2) {
						font-size: 24rpx;
						margin-top: 16rpx;
					}

					view:nth-child(3) {
						font-size: 24rpx;
						color: #A9A9A9;
						padding-top: 16rpx;
					}
				}

				.right {
					text-align: right;

					image {
						width: 28rpx;
						height: 28rpx;
					}

					.none {
						color: #4C00C8 !important;
					}
				}
			}
		}
	}
</style>
