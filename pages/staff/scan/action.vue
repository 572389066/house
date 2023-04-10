<template>
	<view class="content">
		<view class="item-box">
			<text class="value">二维码</text>
			<uni-icons type="right" size="22"></uni-icons>
		</view>
		<navigator class="item-box" url="number" hover-class="none">
			<text class="value">领奖编码</text>
			<uni-icons type="right" size="22"></uni-icons>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
		
		}
	}
</script>

<style lang="less" scoped>
	.item-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-right: 32rpx;
		margin-left: 32rpx;
		border-bottom: 2rpx solid #F2F2F2;
		padding-top: 50rpx;
		padding-bottom: 52rpx;

		.value {
			font-size: 32rpx;
			font-weight: 500;
			color: #333134;
			flex-grow: 1;
		}
	}
</style>
