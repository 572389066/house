<template>
	<view class="content">
		<uni-nav-bar @clickLeft="onClickBuilding" left-width="300rpx" statusBar="true">
			<block v-slot:left>
				<view class="u-nav-slot">
					<text class="building" v-if="currentBuilding">{{ currentBuilding.name }}</text>
					<text class="building" v-else>请选择楼盘</text>
					<uni-icons type="right" size="16" color="#030303"></uni-icons>
				</view>
			</block>
		</uni-nav-bar>

		<view class="ul" v-if="subscribeOff" @click="subscribeMessage()">
			<text class="title">访客咨询提醒</text>
			<uni-icons type="right" color="#ffffff" size="28rpx"></uni-icons>
		</view>

		<view class="menu-box">
			<navigator class="menu" url="../channel/channel" hover-class="none">
				<image src="../../../static/image/staff/img_home_menu_qr.png" mode="widthFix"></image>
				<view class="empty"></view>
				<text>生成登记二维码</text>
				<text>快速生成登记二维码</text>
			</navigator>

			<navigator class="menu" url="../scan/action" hover-class="none">
				<image src="../../../static/image/staff/img_home_menu_gift.png" mode="widthFix"></image>
				<view class="empty"></view>
				<text>消码发奖</text>
				<text>消码分发奖励</text>
			</navigator>

			<navigator class="menu" url="../qr/check_in" hover-class="none">
				<image src="../../../static/image/staff/img_home_menu_checkin.png" mode="widthFix"></image>
				<view class="empty"></view>
				<text>客户登记</text>
				<text>手动客户登记</text>
			</navigator>

			<navigator class="menu" url="../qr/record" hover-class="none">
				<image src="../../../static/image/staff/img_home_menu_record.png" mode="widthFix"></image>
				<view class="empty"></view>
				<text>登记记录</text>
				<text>查看客户登记</text>
			</navigator>
		</view>
		<view open-type="navigateBack" class="back" @click="loginOut()">退出登录</view>
	</view>
</template>

<script>
	import cache from "../../../utils/cache.js"
	export default {
		data() {
			return {
				currentBuilding: null,
				subscribeOff: true,
				subscribeTmplIds: ['p_BGDxGD2wY3kyfbB4sTSNdSevo4RRZeUy2uFSkj4aQ'],
			}
		},

		onLoad() {
			this.fetchBuilding()
		},

		onShow() {
			// wx.getSetting({
			// 	withSubscriptions: true,
			// 	success: (res) => {
			// 		if (res && res.subscriptionsSetting && !res.subscriptionsSetting.mainSwitch) {
			// 			this.showSubscribeModal()
			// 			this.subscribeOff = true
			// 			return
			// 		}

			// 		if (res && res.subscriptionsSetting && res.subscriptionsSetting.itemSettings && res
			// 			.subscriptionsSetting.itemSettings[this.subscribeTmplIds[0]] == 'accept') {
			// 			this.subscribeOff = false
			// 			return
			// 		}
			// 		this.subscribeOff = true
			// 	}
			// })
		},

		methods: {
			subscribeMessage() {
				uni.requestSubscribeMessage({
					tmplIds: this.subscribeTmplIds,
					success: (res) => {
						// this.subscribeOff = !res[this.subscribeTmplIds[0]] == 'accept'
						console.log("subscribeMessage:  success--->>" + JSON.stringify(res));
					},
					fail: (err) => {
						console.log("subscribeMessage:  fail--->>" + JSON.stringify(err));
					}
				})
			},

			showSubscribeModal() {
				uni.showModal({
					title: '提示',
					content: '你尚未开启接收订阅消息，去开启？',
					success: (res) => {
						if (res.confirm) {
							this.openSetting()
						} else if (res.cancel) {

						}
					}
				});
			},

			openSetting() {
				uni.openSetting({
					withSubscriptions: true,
					success: (res) => {
						
					}
				})
			},

			bindCurrentBuilding(building) {
				this.currentBuilding = building
				cache.saveCurrentBuilding(this.currentBuilding)
			},

			onClickBuilding() {
				uni.navigateTo({
					url: '/pages/staff/building/picker',
					events: {
						onDateResult: (e) => {
							if (e.data) {
								this.bindCurrentBuilding(e.data)
							}
						}
					}
				})
			},

			fetchBuilding() {
				this.$staffApi.fetchBuildingList(1, 1)
					.then(res => {
						if (!this.currentBuilding && res && res.length > 0) {
							this.bindCurrentBuilding(res[0])
						}
					}).catch(err => {

					})
			},
			
			loginOut(){
				uni.showModal({
					title: '提示',
					content: '是否退出登录?',
					success: (res) => {
						if (res.confirm) {
							cache.saveStaffToken('')
							uni.redirectTo({
								url:'/pages/staff/login/login'
							})
						} else if (res.cancel) {
				
						}
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		display: flex;
		flex-direction: column;

		.building {
			font-size: 36rpx;
			font-weight: 500;
			color: #030303;
			margin-right: 20rpx;
		}
	}

	.u-nav-slot {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.ul {
		height: 80rpx;
		padding-left: 32rpx;
		padding-right: 32rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
		background-color: #E09A5B;
		border-radius: 8rpx;

		margin-left: 32rpx;
		margin-right: 32rpx;

		.title {
			font-size: 28rpx;
			color: #fff;
		}
	}

	.menu-box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-left: 32rpx;
		margin-right: 32rpx;
		margin-top: 32rpx;
		flex-wrap: wrap;

		navigator:nth-child(2) {
			background: url("../../../static/image/staff/img_home_menu_bg2.png") no-repeat;
			background-position: center;
			background-size: cover;
		}

		navigator:nth-child(3) {
			background: url("../../../static/image/staff/img_home_menu_bg3.png") no-repeat;
			background-position: center;
			background-size: cover;
			margin-top: 32rpx;
		}

		navigator:nth-child(4) {
			background: url("../../../static/image/staff/img_home_menu_bg4.png") no-repeat;
			background-position: center;
			background-size: cover;
			margin-top: 32rpx;
		}

		.menu {
			width: calc((100vw - 64rpx - 32rpx) / 2.0);
			height: calc(((100vw - 64rpx - 32rpx) / 2.0) * (366.0 / 326.0));
			background: url("../../../static/image/staff/img_home_menu_bg1.png") no-repeat;
			background-position: center;
			background-size: cover;
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 30%;
				vertical-align: middle;
				margin-top: 40rpx;
			}

			.empty {
				flex-grow: 1;
			}

			text {
				color: #fff;
				font-size: 26rpx;
				font-weight: 600;
			}

			text:last-child {
				font-size: 20rpx;
				opacity: .5;
				margin-bottom: 44rpx;
				font-weight: 400;
				margin-top: 20rpx;
			}
		}
	}

	.back {
		height: 96rpx;
		margin-top: 160rpx;
		color: #FFFFFF;
		background-color: #333134;
		margin-left: 32rpx;
		margin-right: 32rpx;
		text-align: center;
		border-radius: 8rpx;
		line-height: 96rpx;
		font-size: 32rpx;
	}
</style>