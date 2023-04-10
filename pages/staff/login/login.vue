<template>
	<view class="content">
		<view class="page-box">
			<view class="empty-view-1"></view>
			<text class="title">森琥好房</text>
			<view class="empty-view-2"></view>
			<form @submit="onClickSubmit" class="form">
				<view class="from-box">
					<view class="input-box">
						<input class="phone" placeholder="请输入用户名" placeholder-class="placeholder" maxlength="30"
							name="phone" />
					</view>
					<view class="divider"></view>

					<view class="input-box password-box">
						<input class="password" placeholder="请输入登录密码" placeholder-class="placeholder" maxlength="16"
							name="password" password="true" />
					</view>

					<view class="divider"></view>
					<button form-type="submit" class="btn-login">立即登录</button>
				</view>
			</form>
			<view class="empty-view-3"></view>
		</view>
	</view>

</template>

<script>
	import cache from "../../../utils/cache.js"
	export default {
		data() {
			return {

			}
		},

		onLoad(option) {
			let token = cache.getStaffToken()
			if (token && token != '') {
				uni.redirectTo({
					url: '/pages/staff/index/index'
				})
			}
		},

		methods: {
			onClickSubmit(e) {
				var _phone = e.detail.value.phone
				var _password = e.detail.value.password

				if (!_phone || _phone.length === 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入用户名'
					})
					return
				}

				if (!_password || _password.length === 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入登录密码'
					})
					return
				}

				uni.login({
					"provider": "weixin",
					"onlyAuthorize": true, // 微信登录仅请求授权认证
					success: (event) => {
						const {
							code
						} = event
						this.submitLogin(_phone, _password, code)
					},
					fail: (err) => {
						this.$msg('登录失败')
					}
				})
			},

			submitLogin(phone, password, code) {
				this.$staffApi.submitLogin(phone, password, code)
					.then(res => {
						if (res) {
							cache.saveStaffToken(res)
							uni.redirectTo({
								url: '/pages/staff/index/index'
							})
						} else {
							this.$msg('获取登录信息失败')
						}
					}).catch(err => {

					})
			},
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.content {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.page-box {
		display: flex;
		flex-direction: column;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.title {
		font-weight: 600;
		color: #333134;
		margin-left: 64rpx;
		font-size: 62rpx;
	}

	.empty-view-1 {
		flex-grow: 0.3;
	}

	.empty-view-2 {
		flex-grow: 0.8;
	}

	.empty-view-3 {
		flex-grow: 2;
	}

	.app-name {
		width: 400rpx;
		height: 134rpx;
	}

	.form {
		width: 100%;
	}

	.from-box {
		display: flex;
		flex-direction: column;
		padding-left: 64rpx;
		padding-right: 64rpx;
	}

	.password-box {
		margin-top: 50rpx;
	}

	.input-box {
		width: 100%;
		display: flex;
		flex-direction: row;
		height: 92rpx;
		align-items: center;
		justify-content: space-between;
	}

	.phone {
		flex-grow: 1;
		font-size: 28rpx;
		color: #333134;
	}

	.password {
		flex-grow: 1;
		font-size: 28rpx;
		color: #333134;
	}

	.placeholder {
		font-size: 28rpx;
		color: #999999;
	}

	.divider {
		background-color: #F2F2F2;
		height: 2rpx;
		width: 100%;
	}

	.btn-login {
		width: 100%;
		margin-top: 160rpx;
		color: #FFFFFF;
		background-color: #333134;
	}
</style>