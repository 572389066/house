<template>
	<view class="head" :style="{paddingTop: `${wx.top}px`}">
		<view class="header" :style="{height: `${wx.height}px`}">{{title}}</view>
	</view>
</template>

<script>
	export default {
		name: "head",
		props: ['title'],
		data() {
			return {
				wx: {}
			};
		},
		created() {
			// #ifdef MP-WEIXIN
			this.wx = wx.getMenuButtonBoundingClientRect();
			// #endif
		}
	}
</script>

<style lang="less" scoped>
	.head {
		background: url('http://zykjstore.oss-cn-chengdu.aliyuncs.com/upload/model/20230301_16776689413.png') no-repeat;
		background-position: top center;
		background-size: 100% auto;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		padding-bottom: 10rpx;
	}
	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		font-weight: 600;
		color: #333134;
	}
</style>