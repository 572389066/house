<template>
	<view class="search">
		<z-paging ref="paging" v-model="buildingData" @query="fetchBuildingList" default-page-size="20" :auto="false">
			<!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
			<!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs，若需要使用z-tabs，请在插件市场搜索z-tabs并引入，否则会报插件找不到的错误 -->
			<template #top>
				<view>
					<view class="top">
						<view class="add">
							<image src="@/static/image/search.png" mode="widthFix"></image>
							<input type="text" placeholder="请输入您要搜索的项目" placeholder-style="color: #D0D0D0;"
								confirm-type="search" @confirm="onClickSearch" @input="onSearch"
								v-model="selectedHistory">
						</view>
					</view>
					<view class="cont">
						<view class="title">
							<view>历史搜索</view>
							<uni-icons v-if="historyKey&&historyKey.length>0" type="trash-filled" size="34rpx"
								color="#626162" @click="cleanHistoryKeywords()"></uni-icons>
						</view>
						<view class="label">
							<block v-if="historyKey&&historyKey.length>0">
								<view v-for="(item,index) in historyKey" @click="onClickHistory(item)">{{ item }}</view>
							</block>
						</view>
					</view>
				</view>
			</template>
			<view class="list">
				<view class="common-ul">
					<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
					<view class="li" v-for="(item,index) in buildingData" @click="onItemClick(item)">
						<image :src="getImageUrl(item.pic)" mode="aspectFill"></image>
						<view class="font">
							<view class="name">{{ item.name }}</view>
							<view class="m">约{{ item.price }}起元/㎡</view>
							<view class="text">{{ item.address }}</view>
							<view class="label">
								<block v-for="(tag,index) in item.tags">
									<view v-if="tag && tab!=''">{{ tag }}</view>
								</block>
							</view>
						</view>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import urlUtil from "../../utils/urlUtil.js"
	import cache from "../../utils/cache.js"

	export default {
		data() {
			return {
				inputValue: '',
				buildingData: [],
				historyKey: [],
				keywords: null,
				selectedHistory: ''
			}
		},

		onLoad() {
			this.historyKey = cache.getHistoryKeywords()
		},

		methods: {
			getImageUrl(url) {
				let relUrl = urlUtil.getImgUrlNotSize(url)
				return relUrl
			},

			onItemClick(item) {
				uni.navigateTo({
					url: '/pages/pfs/detail?id=' + item.id
				})
			},

			cleanHistoryKeywords() {
				cache.cleanHistoryKeywords()
				this.historyKey = cache.getHistoryKeywords()
			},

			onClickSearch(e) {
				cache.saveHistoryKeywords(this.keywords)
				this.historyKey = cache.getHistoryKeywords()
				this.onSearch(e)
			},

			onClickHistory(key) {
				this.selectedHistory = key
				cache.saveHistoryKeywords(key)
				this.historyKey = cache.getHistoryKeywords()
				this.onSearch({
					detail: {
						value: key
					}
				})
			},

			onSearch(e) {
				this.keywords = e.detail.value
				this.fetchBuildingList(1, 20)
			},

			fetchBuildingList(pageNo, pageSize) {
				this.$api.fetchBuildingList(pageNo, pageSize, this.keywords, '', false).then(res => {
					this.$refs.paging.complete(res);
				}).catch(err => {
					this.$refs.paging.complete(false);
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.cont {
		overflow: hidden;
		padding: 0 32rpx;

		.label {
			overflow: hidden;

			view {
				background: #F7F7F7;
				border-radius: 6rpx;
				padding: 12rpx 20rpx;
				font-size: 24rpx;
				float: left;
				margin-right: 20rpx;
				margin-top: 20rpx;
			}
		}

		.title {
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			view {
				font-size: 28rpx;
				font-weight: 600;
			}
		}
	}

	.top {
		padding: 24rpx 32rpx;
		background: #fff;

		.add {
			width: 100%;
			height: 80rpx;
			background: rgba(246, 246, 246, 1);
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			padding: 0 16rpx;

			input {
				width: calc(100% - 24rpx);
				padding-left: 16rpx;
				font-size: 24rpx;
			}

			image {
				width: 24rpx;
			}
		}
	}

	.list {
		padding: 0 24rpx 24rpx;
		margin-top: 24rpx;
		flex-grow: 1;
		overflow: hidden;

		.common-ul {
			height: 100%;
			display: flex;
			flex-direction: column;
			background-color: transparent;

			.li {
				background-color: #fff;
				border-color: rgba(246, 246, 246, .8);
				background-size: 1rpx;
				border-style: solid;
				border-radius: 12rpx;
			}
		}
	}
</style>
