<template>
	<view class="content">
		<z-paging ref="paging" v-model="buildingData" @query="fetchBuilding" default-page-size="30">
			<!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
			<!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs，若需要使用z-tabs，请在插件市场搜索z-tabs并引入，否则会报插件找不到的错误 -->
			<template #top>
				<view class="current-box">
					<block v-if="currentBuilding">
						<image src="../../static/images/ic_location.png" mode="aspectFill"></image>
						<text class="current">{{ currentBuilding.name }}</text>
						<text class="tip">（当前楼盘）</text>
					</block>
				</view>
			</template>
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
			<view class="bottom">
				<block v-if="historyBuilding">
					<text class="history-title">历史楼盘</text>
					<view class="li">
						<block v-for="(item,index) in historyBuilding">
							<text class="history" v-if="item" @click="onItemClick(item)">{{ item.name }}</text>
						</block>
					</view>
				</block>
				<text class="list-title">选择楼盘</text>

				<text class="item" v-for="(item,index) in buildingData" :key="index"
					@click="onItemClick(item)">{{ item.name }}</text>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import cache from "../../../utils/cache.js"
	export default {
		data() {
			return {
				currentBuilding: null,
				historyBuilding: null,
				buildingData: []
			}
		},

		onLoad() {
			this.historyBuilding = cache.getHistoryBuilding()
		},

		methods: {
			onItemClick(item) {
				if (item) {
					this.currentBuilding = item
					const eventChannel = this.getOpenerEventChannel();
					eventChannel.emit('onDateResult', {
						data: item
					});
					cache.saveHistoryBuilding(item)
					uni.navigateBack()
				}
			},

			fetchBuilding(page, pageSize) {
				this.$staffApi.fetchBuildingList(page, pageSize)
					.then(res => {
						this.$refs.paging.complete(res);
					}).catch(err => {

					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.current-box {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		margin-top: 42rpx;
		margin-bottom: 30rpx;

		image {
			width: 40rpx;
			height: 40rpx;
			margin-left: 32rpx;
			align-self: center;
		}

		.current {
			font-size: 48rpx;
			font-weight: 600;
			color: #333134;
			margin-left: 8rpx;
		}

		.tip {
			font-size: 24rpx;
			font-weight: 400;
			color: #626162;
		}

	}

	.bottom {
		display: flex;
		flex-direction: column;

		.history-title {
			margin-top: 30rpx;
			margin-left: 32rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: #333134;
		}

		.li {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			margin-left: 32rpx;
			margin-right: 32rpx;

			.history {
				background: #333134;
				border-radius: 8rpx;
				height: 70rpx;
				line-height: 70rpx;
				width: auto;
				align-self: flex-start;

				font-size: 24rpx;
				font-weight: 500;
				color: #FFFFFF;
				padding-left: 24rpx;
				padding-right: 24rpx;
				margin-left: 16rpx;
				margin-top: 28rpx;
			}

			text:first-child {
				margin-left: 0rpx;
			}
		}



		.list-title {
			width: calc(100% - 128rpx);
			background: #F6F6F6;
			border-radius: 8rpx;
			height: 70rpx;

			font-size: 32rpx;
			font-weight: 600;
			color: #333134;
			line-height: 70rpx;
			margin-left: 32rpx;
			margin-right: 32rpx;
			margin-top: 60rpx;
			padding-left: 32rpx;
			padding-right: 32rpx;
			margin-bottom: 20rpx;
		}

		.item {
			width: 100%;
			height: 108rpx;
			line-height: 108rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: #333134;
			padding-left: 64rpx;
			padding-right: 64rpx;
		}
	}
</style>