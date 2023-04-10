<template>
	<view class="content">
		<view class="icon-box">
			<block v-if="result==1">
				<image src="../../static/images/img_success.png"></image>
				<text>验码成功</text>
			</block>
			<block v-else-if="result==2">
				<image src="../../static/images/img_fail.png"></image>
				<text>验码失败</text>
			</block>
		</view>

		<block v-if="result==1">
			<text class="tip">验码成功，请进行线下操作</text>
		</block>
		<block v-if="result==2">
			<text class="tip">未检查到相关码</text>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result: 1,
				codeId: ''
			}
		},
		onLoad(option) {
			if (option.id) {
				this.codeId = option.id
				this.submitCode()
			} else {
				this.result = 2
			}
		},
		methods: {
			submitCode() {
				this.$staffApi.submitVerifyCode(this.codeId)
					.then(res => {
						this.result = 1
						console.log("submitCode success: " + JSON.stringify(res));
					}).catch(err => {
						this.result = 2
						console.log("submitCode err: " + JSON.stringify(err));
					})
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {}

	.icon-box {
		display: flex;
		flex-direction: row;
		align-self: center;
		align-items: center;
		margin-top: 74rpx;

		image {
			width: 54rpx;
			height: 54rpx;
		}

		text {
			font-size: 32rpx;
			font-weight: 600;
			color: #333134;
			margin-left: 12rpx;
		}
	}

	.tip {
		font-size: 32rpx;
		font-weight: 400;
		color: #333134;
		margin-top: 52rpx;
		text-align: center;
	}
</style>
