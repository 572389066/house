<template>
	<view class="common_top" :style="{marginTop: `${wx.height + wx.top}px`}">
		<view class="search">
			<view class="city" hover-class="none" @click="onClickCity()">
				<text>重庆</text>
			</view>
			<navigator class="text" hover-class="none" url="/pages/search/search">
				<image src="@/static/image/search.png" mode="widthFix"></image>
				<input type="text" disabled="true" placeholder="请输入您要搜索的项目" placeholder-style="color: #D0D0D0">
			</navigator>
		</view>
		<view class="map" @click="onClickMap">
			<image src="@/static/image/address.png" mode="widthFix"></image>
			<text>地图找房</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Search",
		data() {
			return {
				wx: {}
			};
		},
		created() {
			// #ifdef MP-WEIXIN
			this.wx = wx.getMenuButtonBoundingClientRect();
			// #endif
		},
		methods:{
			onClickMap(){
				this.$msg('暂未开放，敬请期待')
			},
			
			onClickCity(){
				this.$msg('暂未开放，敬请期待')
				// uni.navigateTo({
				// 	url:'/pages/area/area'
				// })
			}
		}
	}
</script>

<style lang="less" scoped>
	.common_top {
		padding: 32rpx 24rpx;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.search {
			display: flex;

			.text {
				display: block;
				flex: 1;
				position: relative;
				height: 100%;

				image {
					width: 24rpx;
					height: 24rpx;
					position: absolute;
					left: 24rpx;
					top: 50%;
					transform: translateY(-50%);
				}

				input {
					width: 100%;
					height: 100%;
					padding-left: 60rpx;
					font-size: 24rpx;
				}
			}

			.city::after {
				content: '';
				width: 2rpx;
				height: 26rpx;
				background: #D0D0D0;
				position: absolute;
				top: 50%;
				right: 0;
				border-radius: 2rpx;
				transform: translateY(-50%);
			}

			.city {
				position: relative;
				display: block;
				height: 100%;

				text {
					position: relative;
					font-size: 24rpx;
					font-weight: 600;
					padding-right: 20rpx;
				}

				text::after {
					position: absolute;
					right: 0;
					bottom: 6rpx;
					content: '';
					border-left: 10rpx solid transparent;
					border-right: 0 solid transparent;
					border-bottom: 10rpx solid #000;
				}

				display: flex;
				align-items: center;
				padding: 0 24rpx;
			}
		}

		.search,
		.map {
			width: calc(100% - 196rpx);
			height: 80rpx;
			background: #fff;
			border-radius: 8rpx;
		}

		.map {
			width: 176rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 30rpx;
			}

			text {
				font-size: 24rpx;
				font-weight: 600;
				margin-left: 16rpx;
			}
		}
	}
</style>
