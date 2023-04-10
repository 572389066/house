<script>
	import cache from "./utils/cache.js"
	export default {
		onLaunch: function() {
			console.log('App Launch')

		},
		onShow: function() {
			console.log('App Show')
			this.fetchUserInfo()
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
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
		}
	}
</script>

<style lang="less">
	@import url('@/static/css/common.css');

	/*每个页面公共css */
	::-webkit-scrollbar {
		display: none;
	}

	/* #ifdef H5 || APP-PLUS */
	uni-checkbox .uni-checkbox-input {
		border-radius: 50% !important;
		margin-right: 0;
	}

	uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
		border-color: #59D5DD !important;
	}

	uni-checkbox.active .uni-checkbox-input {
		background: #59D5DD !important;
		border-color: #59D5DD !important;
	}

	/* #endif */
	/* 微信样式 */
	/* #ifdef MP-WEIXIN || APP-PLUS */
	checkbox .wx-checkbox-input {
		border-radius: 50% !important;
		color: #ffffff !important;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		color: #fff;
		background: #59D5DD;
		border-color: #59D5DD;
	}

	radio .wx-radio-input.wx-radio-input-checked {
		background: #59D5DD;
		border-color: #59D5DD;
	}

	/* #endif */
	image {
		vertical-align: middle;
	}

	view,
	input,
	navigator,
	textarea {
		box-sizing: border-box;
		color: #232122;
	}

	view,
	text {
		font-size: 26rpx;
		color: #232122;
	}

	uni-button::after,
	button,
	button::after {
		border: none !important;
		box-shadow: none;
		outline: none;
	}

	.uni-swiper-dots-horizontal {
		.uni-swiper-dot {
			width: 30rpx;
			height: 10rpx;
			border-radius: 30rpx;
			background: #fff;
		}

		.uni-swiper-dot.uni-swiper-dot-active {
			background: #fff !important;
		}
	}
	
	.content{
		display: flex;
		flex-direction: column;
	}
	
	.list-box{
		display: flex;
		flex-direction: column;
	}
</style>
