<template>
	<view class="star">
		<z-paging ref="paging" v-model="recommendBuildingData" @query="fetchRecommendBuilding">
			<view class="cont">
				<view class="common-ul">
					<view class="li" v-for="(item,index) in recommendBuildingData" @click="onItemClick(item)">
						<view class="img">
							<image :src="getImageUrl(item.pic)" mode="aspectFill"></image>
							<view  v-if="item.status==='preSale'">预售</view>
							<view  v-else-if="item.status==='onSale'">在售</view>
							<view  v-else>售罄</view>
						</view>
						<view class="font">
							<view class="name">{{ item.name }}</view>
							<view class="m">约{{ item.price }}起元/㎡</view>
							<view class="text">{{ getDisplayAddress(item) }}</view>
							<view class="label">
								<view v-for="(tag,index) in item.tags">{{ tag }}</view>
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
	export default {
		data() {
			return {
				recommendBuildingData: []
			}
		},
		
		onShareAppMessage(res) {
			return this.$shareIndex()
		},
		
		methods: {
			getImageUrl(url) {
				let relUrl = urlUtil.getImgUrlNotSize(url)
				return relUrl
			},
			
			getDisplayAddress(buildItem) {
				let address = ''
				if (buildItem) {
					if (buildItem.province) {
						address = buildItem.province
					}
					if (buildItem.city) {
						address = address + buildItem.city
					}
					if (buildItem.district) {
						address = address + buildItem.district
					}
					if (buildItem.address) {
						address = address + buildItem.address
					}
				}
				return address
			},
			
			onItemClick(item) {
				uni.navigateTo({
					url: '/pages/pfs/detail?id=' + item.id
				})
			},
			
			fetchRecommendBuilding(page, pageSize) {
				this.$api.fetchBuildingList(page, pageSize, '', '', true).then(res => {
					console.log("fetchRecommendBuilding result: " + JSON.stringify(res));
					this.$refs.paging.complete(res);
				}).catch(err => {
					console.log("fetchRecommendBuilding err: " + JSON.stringify(err));
					this.$refs.paging.complete(false);
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.star {
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		/* #ifdef H5 */
		min-height: calc(100vh - 88rpx);
		/* #endif */
		background: #f9f9f9;

		.cont {
			padding: 24rpx;
			overflow: hidden;
		}
	}
</style>
