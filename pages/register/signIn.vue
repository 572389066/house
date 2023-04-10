<template>
	<view class="signin">
		<view class="cont">
			<view class="title" v-if="buildingDetail">{{ buildingDetail.name }}</view>
			<view class="title" v-else></view>
			<view class="submit" @click="submitCustomCheck()">
				<view>签到登记</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cache from "../../utils/cache.js"
	export default {
		data() {
			return {
				buildingId: '',
				scene: '',
				buildingDetail: null,
			}
		},

		onLoad(options) {
			this.buildingId = options.buildingId;
			this.scene = options.scene;

			this.fetchBuilding()
			
			this.checkLogin()
		},

		methods: {
			fetchBuilding() {
				this.$api.fetchBuildingDetail(this.buildingId)
					.then(res => {
						this.buildingDetail = res
					}).catch(err => {})
			},
			
			submitCustomCheck(){
				this.$api.submitCustomCheck(this.scene)
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
	.signin {
		width: 100%;
		min-height: 100vh;
		/* #ifdef H5 */
		min-height: calc(100vh - 100rpx);
		/* #endif */
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;

		.submit {
			width: 330rpx;
			height: 330rpx;
			border-radius: 50%;
			border: 20rpx solid rgba(51, 49, 52, .1);

			view {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background: #333134;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 36rpx;
				color: #fff;
			}
		}

		.title {
			font-size: 28rpx;
			font-weight: 600;
			margin-bottom: 100rpx;
			text-align: center;
			margin-top: -140rpx;
		}
	}
</style>
