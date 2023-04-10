<template>
	<view class="feedback">
		<form @submit="onClickSubmit">
			<view class="cont">
				<view class="ul">
					<view class="li">
						<view class="name">问题描述</view>
						<textarea name="content" id="" cols="30" rows="10" placeholder="请详细描述你的问题..."
							placeholder-style="color: #BFBFBF"></textarea>
					</view>
					<view class="li">
						<view class="name">联系方式</view>
						<input type="text" name="phone" placeholder="请输入手机号/QQ/邮箱" placeholder-style="color: #BFBFBF">
					</view>
				</view>
			</view>
			<view class="common_bottom">
				<button form-type="submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			onClickSubmit(e) {
				let content = e.detail.value.content
				let phone = e.detail.value.phone

				if (content.length === 0) {
					this.$msg('请详细描述你的问题')
					return
				}
				this.submitFeedback(content, phone)
			},
			submitFeedback(content, phone) {
				this.$api.submitFeedback(content, phone)
				.then(res => {
					this.$msg('提交成功')
					uni.navigateBack()
				}).catch(err => {

				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.feedback {
		overflow: hidden;

		.cont {
			padding: 60rpx 32rpx;
			overflow: hidden;

			.ul .li {
				margin-bottom: 40rpx;

				textarea {
					width: 100%;
					height: 306rpx;
					background-color: #F6F6F6;
					border-radius: 12rpx;
					font-size: 28rpx;
					padding: 32rpx 24rpx;
				}

				input {
					padding: 0 24rpx;
					height: 80rpx;
					background-color: #F6F6F6;
					border-radius: 12rpx;
					font-size: 28rpx;
				}

				.name {
					font-size: 32rpx;
					font-weight: 600;
					margin-bottom: 32rpx;
				}
			}
		}
	}

	button {
		background: #333134;
		color: #fff;
	}
</style>
