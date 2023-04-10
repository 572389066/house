<template>
	<view class="content">
		<form @submit="onClickSubmit">
			<view class="input-box">
				<text class="title">领奖编码</text>
				<input class="input" name="value" placeholder="请填用户的领奖编码" placeholder-class="placeholder" type="number"
					maxlength="10" />
			</view>
			<view class="divider"></view>
			<button class="submit" form-type="submit">确认</button>
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
				let value = e.detail.value.value
				if (value === '') {
					this.$msg('请填用户的领奖编码')
					return
				}
				if (value.length < 6) {
					this.$msg('请输入正确的领奖编码')
					return
				}
				uni.showModal({
					title: '提示',
					content: '是否确认提交领奖码?',
					success: (res) => {
						if (res.confirm) {
							this.submitCode(value)
						} else if (res.cancel) {

						}
					}
				});
			},

			submitCode(value) {
				this.$staffApi.submitVerifyNumber(value)
					.then(res => {
						this.$msg('提交成功')
						uni.navigateBack()
					}).catch(err => {
						console.log("submitCode err: " + JSON.stringify(err));
					})
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}

	.input-box {
		display: flex;
		flex-direction: row;
		margin-top: 22rpx;
		padding-top: 44rpx;
		padding-bottom: 44rpx;

		.title {
			min-width: 160rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #333134;
			margin-left: 32rpx;
		}

		.input {
			font-size: 28rpx;
			font-weight: 400;
			color: #333134;
			flex-grow: 1;
			margin-right: 32rpx;
		}

		.placeholder {
			font-size: 28rpx;
			font-weight: 400;
			color: #BFBFBF;
		}
	}

	.divider {
		margin-left: 32rpx;
		margin-right: 32rpx;
		height: 2rpx;
		background: #F2F2F2;
		opacity: 0.5;
	}

	.submit {
		width: calc(100% - 64rpx);
		height: 98rpx;
		background: #333134;
		border-radius: 8rpx;
		position: absolute;
		bottom: 32rpx;
		left: 32rpx;
		color: #fff;
	}
</style>
