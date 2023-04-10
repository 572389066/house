<template>
	<view class="result">
		<view class="cont">
			<view class="add">
				<view class="yuan">
					<uni-icons type="checkmarkempty" size="30rpx" color="#fff"></uni-icons>
				</view>
				<view class="size">上传成功</view>
			</view>
			<view class="font">
				<view class="tips">*请于到<text>{{ address }}</text>领取奖励*</view>
				<view v-if="type=='Qrcode'" class="qr-box">
					<uqrcode ref="uqrcode" canvas-id="qrcode" :value="qrCode" :options="{ margin: 10 }"
						sizeUnit="rpx" size="244">
					</uqrcode>
				</view>
				<view class="_number" v-else-if="type=='Number'">
					<view class="number">{{ numberCode }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '',
				address: '',
				numberCode: '',
				qrCode: ''
			}
		},

		onLoad(option) {
			if (option.result) {
				let result = JSON.parse(decodeURIComponent(option.result))
				this.type = result.code_type
				this.address = result.address
				this.numberCode = result.code
				this.qrCode = result.qrcode
			}
		},

		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.result {
		overflow: hidden;

		.cont {
			overflow: hidden;
			padding-top: 20%;

			.font {
				padding-top: 10%;

				.qr-box {
					width: 244rpx;
					height: 244rpx;
					display: block;
					margin: 32rpx auto 0;
				}

				._number {
					display: flex;
					align-items: center;
					justify-content: center;
					padding-top: 32rpx;
				}

				.number {
					border: 2rpx solid rgba(51, 49, 52, .15);
					border-radius: 8rpx;
					padding: 10rpx 40rpx;
					font-size: 80rpx;
					font-weight: 600;
					letter-spacing: 10rpx;
				}

				.tips {
					font-size: 24rpx;
					text-align: center;

					text {
						color: #E09A5B;
						padding: 0 8rpx;
					}
				}
			}

			.add {
				display: flex;
				align-items: center;
				justify-content: center;

				.yuan {
					background: #2EB65F;
					width: 54rpx;
					height: 54rpx;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.size {
					font-size: 32rpx;
					padding-left: 24rpx;
				}
			}
		}
	}
</style>
