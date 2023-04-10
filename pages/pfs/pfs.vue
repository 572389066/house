<template>
	<view class="pfs">
		<!-- #ifdef MP-WEIXIN -->
		<Head :title="'楼盘'"></Head>
		<!-- #endif -->
		<!-- 	<view class="top-search-box" :style="{top:'${wx.height + wx.top}px'}">
			<Search></Search>
		</view>

		<view class="cont">
			<view class="common-ul">
				<z-paging ref="paging" v-model="buildingData" @query="fetchBuildingList" use-page-scroll
					default-page-no="1" default-page-size="20">
					<view class="li" v-for="(item,index) in buildingData" @click="onItemClick(item)">
						<image :src="getImageUrl(item.pic)" mode="aspectFill"></image>
						<view class="font">
							<view class="name">{{ item.name }}</view>
							<view class="m">约{{ item.price }}起元/㎡</view>
							<view class="text">{{ item.address }}</view>
							<view class="label">
								<view v-for="(tag,index) in item.tags">{{ tag }}</view>
							</view>
						</view>
					</view>

				</z-paging>
			</view>
		</view> -->

		<z-paging ref="paging" v-model="buildingData" @query="fetchBuildingList">
			<!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
			<!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs，若需要使用z-tabs，请在插件市场搜索z-tabs并引入，否则会报插件找不到的错误 -->
			<template #top>
				<view>
					<Search></Search>
				</view>
			</template>
			<view class="cont">
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
	import Head from '@/components/Head/Head.vue';
	import Search from '@/components/Search/Search.vue';
	import urlUtil from "../../utils/urlUtil.js"

	export default {
		components: {
			Head,
			Search
		},
		data() {
			return {
				buildingData: [],
				wx: {}
			}
		},
		onLoad() {

		},
		onShow() {
			// #ifdef MP-WEIXIN
			this.wx = wx.getMenuButtonBoundingClientRect();
			// #endif
		},

		onShareAppMessage(res) {
			return this.$shareIndex()
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

			fetchBuildingList(pageNo, pageSize) {
				this.$api.fetchBuildingList(pageNo, pageSize, '', '', false).then(res => {
					this.$refs.paging.complete(res);
				}).catch(err => {
					this.$refs.paging.complete(false);
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.pfs {
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		/* #ifdef H5 */
		min-height: calc(100vh - 100rpx);
		/* #endif */
		background: url('http://zykjstore.oss-cn-chengdu.aliyuncs.com/upload/model/20230301_16776689413.png') no-repeat;
		background-position: top center;
		background-size: 100% auto;

		.cont {
			padding: 0 24rpx 24rpx;
			overflow: hidden;

			.common-ul {
				height: 100%;
				display: flex;
				flex-direction: column;
				background-color: transparent;


				.li {
					background-color: #fff;
					
					// image{
					// 	width: 258rpx;
					// 	height: 202rpx;
					// }
				}
			}
		}
	}
</style>
