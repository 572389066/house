<template>
	<view class="content">
		<view class="empty1"></view>
		<text class="tip" v-if="channel">此二维码来自“{{ channel.name }}”</text>
		<text class="tip" v-else></text>
		<view class="qr-box" mode="aspectFill">
			<block v-if="qrCodeImage">
				<image v-if="role==='1'" :src="qrCodeImage.client"></image>
				<image v-else-if="role==='2'" :src="qrCodeImage.sales"></image>
			</block>
		</view>
		<text class="title" v-if="channel && role==='2'">业务员码</text>
		<text class="title" v-else-if="role==='1'">客户码</text>
		<text class="title" v-else></text>

		<text class="tip" v-if="role==='1'">客户扫一扫，立即签到登记</text>
		<text class="tip" v-if="role==='2'">业务员扫一扫，立即签到登记</text>
		<view class="empty2"></view>
		<view class="action-box">
			<view class="action" @click="onChangeRole()">
				<image src="../../static/images/img_qr_next.png">
				</image>
				<text>关联码</text>
			</view>
			<view class="action" @click="onClickReset()">
				<image src="../../static/images/img_reset.png">
				</image>
				<text>重置二维码</text>
			</view>
		</view>

		<view class="record-box">
			<block v-if="role==='1'">
				<text class="title">客户登记记录</text>
				<block v-if="clientRecord">
					<text class="count">{{clientRecord.length}}人已登记</text>
				</block>
				<block v-else>
					<text class="count">0人</text>
				</block>
				<block v-if="clientRecord">
					<view class="list-box" v-for="(item,index) in clientRecord">
						<text class="item">{{ item.phone }}</text>
						<view class="divider"></view>
					</view>
				</block>
			</block>
			<block v-else-if="role==='2'">
				<text class="title">业务员登记记录</text>
				<block v-if="salesRecord">
					<view class="list-box" v-for="(item,index) in salesRecord">
						<text class="item">{{ item.phone }}</text>
						<view class="divider"></view>
					</view>
				</block>
			</block>
		</view>
	</view>
</template>

<script>
	import cache from "../../../utils/cache.js"
	export default {
		data() {
			return {
				channel: null,
				currentBuilding: null,
				qrCodeImage: null,
				role: '1',
				scene: '',
				intervalId: null,
				clientRecord: [],
				salesRecord: [],

				toastIntervalId: null,
				taostClientData: [],
				toastSalesData: [],
			}
		},

		onLoad(option) {
			if (option.id && option.name) {
				this.channel = {
					id: option.id,
					name: option.name
				}
			} else {
				this.$msg('获取渠道失败')
			}

			this.currentBuilding = cache.getCurrentBuilding()
			if (!this.currentBuilding) {
				this.$msg('请先选择楼盘')
				// uni.navigateBack()
			}

			this.fetchCheckCode()
		},

		onUnload() {
			if (this.intervalId) {
				clearInterval(this.intervalId)
			}
			if (this.toastIntervalId) {
				clearInterval(this.toastIntervalId)
			}
		},

		methods: {
			onClickReset() {
				this.qrCodeImage = null
				this.fetchCheckCode()
			},

			onChangeRole() {
				if ('2' === this.role) {
					this.role = '1'
				} else {
					this.role = '2'
				}
			},

			fetchCheckCode() {
				this.$staffApi.fetchCheckCode(this.currentBuilding.id, this.channel.id)
					.then(res => {
						this.qrCodeImage = res
						this.scene = res.scene
						this.startInterval()
					}).catch(err => {
						this.qrCodeImage = null
					})
			},

			fetchScanRecord() {
				this.$staffApi.fetchScanRecord(this.scene)
					.then(res => {
						this.clientRecord = res.client
						this.salesRecord = res.sales
					}).catch(err => {
						this.clientRecord = []
						this.salesRecord = []
					})
			},

			startInterval() {
				let that = this
				if (this.intervalId) {
					clearInterval(this.intervalId)
				}
				this.intervalId = setInterval(function() {
					that.fetchScanRecord()
				}, 2000)
			},

			// handleLastRecord() {
			// 	if ()
			// }
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #f5f6f1;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.empty1 {
		height: 200rpx;
	}

	.empty2 {
		flex-grow: 256rpx;
	}


	text:nth-child(5) {
		margin-top: 30rpx;
	}

	.tip {
		font-size: 24rpx;
		color: #333134;
		opacity: .5;
	}

	.title {
		font-size: 36rpx;
		font-weight: 500;
		color: #000;
		margin-top: 56rpx;
	}

	.qr-box {
		margin-top: 56rpx;
		height: 300rpx;

		image {
			width: 300rpx;
			height: 300rpx;
		}
	}

	.action-box {
		display: flex;
		flex-direction: row;
		margin-left: 130rpx;
		margin-right: 130rpx;
		width: calc(100% - 260rpx);
		margin-top: 160rpx;
		justify-content: space-between;

		.action {
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 114rpx;
				height: 114rpx;
			}

			text {
				font-size: 28rpx;
				font-weight: 500;
				color: #000000;
				margin-top: 24rpx;
			}
		}
	}

	.record-box {
		display: flex;
		flex-flow: column;
		margin-top: 80rpx;
		width: 100%;
		align-items: center;

		.title {
			font-size: 32rpx;
			font-weight: 600;
			color: #333134;
			margin-left: 32rpx;

		}

		.count {
			font-size: 28rpx;
			color: #A9A9A9;
			margin-top: 20rpx;
		}

		.list-box {
			display: flex;
			flex-flow: column;
			margin-top: 50rpx;
			width: 100%;

			.item {
				font-size: 28rpx;
				font-weight: 500;
				color: #626162;
				line-height: 80rpx;
				padding-left: 32rpx;
				padding-right: 32rpx;
				width: calc(100% - 64rpx);
			}

			.divider {
				width: calc(100% - 64rpx);
				height: 2rpx;
				background: #BAB9BF;
				opacity: 0.15;
				margin-left: 32rpx;
				margin-right: 32rpx;
			}
		}
	}
</style>