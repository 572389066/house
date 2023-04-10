<template>
	<view class="content">
		<view class="top"></view>
		<image class="avatar" src="../../static/image/img_avatar_def.png"></image>

		<block v-if="token&&token!=''">
			<text class="title" v-if="!phone||phone==''">森琥好房</text>
			<text class="title" v-else>{{ phone }}</text>
			<button class="submit" @click="onClickLoginOut">退出登录</button>
		</block>

		<block v-else>
			<text class="title">森琥好房</text>
			<button class="submit" open-type="getPhoneNumber" @getphonenumber="onLoginResult">微信手机号快捷登录</button>
		</block>
		<view class="bottom"></view>
	</view>
</template>

<script>
	import cache from "../../utils/cache.js"
	export default {
		data() {
			return {
				token: '',
				phone: ''
			}
		},

		onLoad() {
			this.token = cache.getToken()
			// this.phone = cache.getPhone()
			if(this.token && this.token!=''){
				this.fetchUserInfo()
			}
		},

		methods: {
			fetchUserInfo() {
				let token = cache.getToken()
				if (token && token != '') {
					this.$api.fetchUserInfo()
						.then(res => {
							this.userInfo = res
							if (res) {
								this.phone = res.phone
								// cache.savePhone(res.phone)
							}
						}).catch(res => {

						})
				} else {
					this.userInfo = null
				}
			},


			onLoginResult(e) {
				uni.login({
					"provider": "weixin",
					"onlyAuthorize": true, // 微信登录仅请求授权认证
					success: (event) => {
						const {
							code
						} = event
						this.submitLogin(code, e.detail.code)
					},
					fail: (err) => {
						this.$msg('登录失败')
					}
				})

			},

			submitLogin(loginCode, phoneCode) {
				this.$api.submitLogin(loginCode, phoneCode)
					.then(res => {
						cache.saveToken(res)
						this.$msg('登录成功')
						uni.navigateBack()
					}).catch(err => {

					})
			},

			onClickLoginOut() {
				uni.showModal({
					title: '提示',
					content: '是否确认退出登录',
					success: (res) => {
						if (res.confirm) {
							this.loginOut()
						} else if (res.cancel) {

						}
					}
				});
			},

			loginOut() {
				// cache.savePhone('')
				cache.saveToken('')
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		position: absolute;
		height: 100%;
		width: 100%;

		.top {
			flex-grow: 2;
			word-wrap: break-word;
			word-break: break-all;
		}

		.bottom {
			flex-grow: 5;
			word-wrap: break-word;
			word-break: break-all;
		}

		.avatar {
			align-self: center;
			width: 160rpx;
			height: 160rpx;
			border-radius: 100rpx;
			overflow: hidden;
		}

		.title {
			font-size: 32rpx;
			color: #030303;
			align-self: center;
			margin-top: 36rpx;
		}

		.submit {
			margin-left: 48rpx;
			margin-right: 48rpx;
			margin-top: 96rpx;
			background: #333134;
			color: #fff;
			font-size: 20rxp;
		}
	}
</style>