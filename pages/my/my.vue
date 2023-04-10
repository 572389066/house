<template>
	<view class="my">
		<!-- #ifdef MP-WEIXIN -->
		<Head :title="'我的'"></Head>
		<!-- #endif -->
		<view class="info" :style="{marginTop: `${wx.height + wx.top}px`}">
			<image src="@/static/image/img_avatar_def.png" mode="aspectFill" @click="onClickInfo()"></image>
			<view class="font" @click="onClickInfo()">
				<view v-if="userInfo&&userInfo.phone&&userInfo.phone!=''">{{ userInfo.phone }}</view>
				<view v-else>微信用户</view>
				<view>Hi~欢迎来到森琥好房</view>
			</view>
			<navigator class="staff" url="../staff/login/login" hover-class="none">切换员工端</navigator>
		</view>
		<view class="main">
			<view class="title">我的服务</view>
			<view class="ul">
				<view hover-class="none" class="li" v-for="(item, index) in main" :key="index"
					@click="onClickMenu(item.url)">
					<image :src="item.img" mode="heightFix"></image>
					<view>{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		userInfo
	} from "os";
	import cache from "../../utils/cache.js"
	export default {
		data() {
			return {
				wx: {},
				main: [{
						img: '../../static/image/my1.png',
						name: '我的名片',
						url: '/pages/register/edit?type=1'
					},
					{
						img: '../../static/image/my2.png',
						name: '推广记录',
						url: '/pages/award/record'
					},
					{
						img: '../../static/image/my3.png',
						name: '登记记录',
						url: '/pages/register/record'
					},
					{
						img: '../../static/image/my4.png',
						name: '意见反馈',
						url: '/pages/feedback/feedback'
					}
				],
				userInfo: null,
			}
		},
		onShow() {
			// #ifdef MP-WEIXIN
			this.wx = wx.getMenuButtonBoundingClientRect();
			// #endif

			this.fetchUserInfo()
		},

		onShareAppMessage(res) {
			return this.$shareIndex()
		},

		methods: {
			onClickInfo() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},

			onClickMenu(url) {
				if (this.checkLogin()) {
					uni.navigateTo({
						url: url
					})
				}
			},

			fetchUserInfo() {
				let token = cache.getToken()
				if (token && token != '') {
					this.$api.fetchUserInfo()
						.then(res => {
							this.userInfo = res
							if (res) {
								// cache.savePhone(res.phone)
							}
						}).catch(res => {

						})
				} else {
					this.userInfo = null
				}
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
			},
		}
	}
</script>

<style lang="less" scoped>
	.my {
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		/* #ifdef H5 */
		min-height: calc(100vh - 100rpx);

		/* #endif */
		.main {
			background: #fff;
			padding: 32rpx 28rpx;
			border-top-left-radius: 32rpx;
			border-top-right-radius: 32rpx;
			margin-top: -32rpx;

			.ul {
				overflow: hidden;

				.li {
					float: left;
					width: calc(100% / 4);
					padding: 48rpx 0;

					view {
						font-size: 24rpx;
						text-align: center;
						padding-top: 20rpx;
					}

					image {
						height: 50rpx;
						width: auto;
						display: block;
						margin: 0 auto;
					}
				}
			}

			.title {
				font-size: 36rpx;
				font-weight: 600;
			}
		}

		.info {
			padding: 32rpx 32rpx 64rpx;
			overflow: hidden;
			display: flex;
			align-items: center;
			background: url('http://zykjstore.oss-cn-chengdu.aliyuncs.com/upload/model/20230301_16776689413.png') no-repeat;
			background-position: top center;
			background-size: 100% auto;
			position: relative;

			image {
				width: 124rpx;
				height: 124rpx;
				border-radius: 50%;
			}

			.font {
				width: calc(100% - 124rpx);
				padding-left: 24rpx;

				view:first-child {
					font-size: 36rpx;
					font-weight: 600;
				}

				view:last-child {
					font-size: 24rpx;
					color: #626162;
					margin-top: 8rpx;
				}
			}
			
			.staff{
				position: absolute;
				right: 0;
				background-color: rgba(76, 0, 200, .7);
				line-height: 50rpx;
				padding-left: 24rpx;
				padding-right: 24rpx;
				font-size: 24rpx;
				color: #fff;
				border-radius: 25rpx 0rpx 0rpx 25rpx;
			}
		}
	}
</style>