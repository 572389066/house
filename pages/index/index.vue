<template>
	<view class="home">
		<!-- #ifdef MP-WEIXIN -->
		<Head :title="'首页'"></Head>
		<!-- #endif -->

		<z-paging ref="paging" v-model="recommendBuildingData" @query="onRefresh">
			<!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
			<!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs，若需要使用z-tabs，请在插件市场搜索z-tabs并引入，否则会报插件找不到的错误 -->
			<template #top>
				<view>
					<Search></Search>
				</view>
			</template>

			<view class="cont">
				<view class="banner">
					<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="2000"
						:duration="500" indicator-color="rgba(0,0,0,.1)" indicator-active-color="#fff">
						<swiper-item class="swiper-item" v-for="(item,index) in imageBannerData" :key="index"
							@click="onBannerClick(item)">
							<image :src="getImageUrl(item.img_url)" mode="aspectFill" class="img"></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="main">
					<navigator class="li" hover-class="none" url="/pages/star/star">
						<image src="@/static/image/main1.png" mode="widthFix"></image>
					</navigator>
					<view class="li" hover-class="none" @click="onClickScan()">
						<image src="@/static/image/main2.png" mode="widthFix"></image>
					</view>
					<navigator class="li" hover-class="none" url="/pages/activities/activities">
						<image src="@/static/image/main3.png" mode="widthFix"></image>
					</navigator>
					<!-- <navigator class="li" hover-class="none" url="/pages/staff/login/login">
						<image src="@/static/image/main4.png" mode="widthFix"></image>
					</navigator> -->
				</view>
				<view class="video">
					<swiper class="swiper" circular :indicator-dots="false" :autoplay="true" :interval="2000"
						:duration="500" indicator-color="rgba(0,0,0,.1)" indicator-active-color="#fff">
						<swiper-item class="swiper-item" v-for="(item,index) in videoBannerData" :key="index"
							@click="onBannerClick(item)">
							<video v-if="isVideoBanner(item.img_url)" id="banenrVideo" :src="getImageUrl(item.img_url)"
								@play="BoFang()" @pause="ZanTing()" controls></video>
							<image v-else :src="getImageUrl(item.img_url)" mode="aspectFill" class="img"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="list">
				<view class="title">热盘推荐</view>
				<view class="ul">
					<view class="li" v-for="(item,index) in recommendBuildingData" @click="onItemClick(item)">
						<image :src="getImageUrl(item.pic)" mode="aspectFill"></image>
						<view class="bg">
							<view class="label">
								<view class="active" v-if="item.status==='preSale'">预售</view>
								<view class="active" v-else-if="item.status==='onSale'">在售</view>
								<view class="active" v-else>售罄</view>
								<block v-for="(tag,index) in item.tags">
									<view v-if="tag && tag!=''">{{ tag }}</view>
								</block>
							</view>
							<view class="add">
								<view>{{ item.name }}</view>
								<view>约{{ item.price }}起元/㎡</view>
								<view>{{ getDisplayAddress(item) }}</view>
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
	import cache from "../../utils/cache.js"
	export default {
		components: {
			Head,
			Search
		},
		data() {
			return {
				imageBannerData: [],
				videoBannerData: [],
				recommendBuildingData: [],
				wx: {}
			}
		},

		onShareAppMessage(res) {
			return this.$shareIndex()
		},

		onShow() {
			// #ifdef MP-WEIXIN
			this.wx = wx.getMenuButtonBoundingClientRect();
			// #endif
		},
		onLoad() {
			this.fetchBanner()
		},
		methods: {

			getImageUrl(url) {
				return urlUtil.getImgUrlNotSize(url)
			},

			isVideoBanner(url) {
				return urlUtil.isVideo(url)
			},

			onBannerClick(item) {
				if (item) {
					if (item.handle_type == '1') {
						//跳转网页
						if (item.web_url && item.web_url != '') {
							uni.navigateTo({
								url: '/pages/web/web?url=' + urlUtil.getFullUrl(item.web_url)
							})
						}
					} else if (item.handle_type == '2') {
						//微信视频号主页
						if (item.web_url && item.web_url != '') {
							wx.openChannelsUserProfile({
								finderUserName: item.web_url,
								success: function() {

								},
								fail: function() {
									console.log("openChannelsUserProfile fail: " + JSON.stringify(e));
								}
							})
						}
					} else if (item.handle_type == '3') {
						//微信视频号 视频
						if (item.web_url && item.web_url != '' && item.relation_id && item.relation_id != '') {
							wx.openChannelsActivity({
								finderUserName: item.web_url,
								feedId: item.relation_id,
								success: function() {

								},
								fail: function() {
									console.log("openChannelsActivity fail: " + JSON.stringify(e));
								}
							})
						}
					}
				}
			},

			onItemClick(item) {
				uni.navigateTo({
					url: '/pages/pfs/detail?id=' + item.id
				})
			},

			onClickScan() {
				if (this.checkLogin()) {
					uni.navigateTo({
						url: '/pages/register/scan'
					})
				}
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


			fetchBanner() {
				this.$api.getBanner().then(res => {
					this.imageBannerData = res.imgBanner
					this.videoBannerData = res.videoBanner
				}).catch(err => {
					console.log("getBanner err: " + JSON.stringify(err));
				})
			},

			onRefresh(page, pageSize) {
				if (page == 1) {
					this.fetchBanner()
				}
				this.fetchRecommendBuilding(page, pageSize)
			},

			fetchRecommendBuilding(page, pageSize) {
				this.$api.fetchBuildingList(page, pageSize, '', '', true).then(res => {
					this.$refs.paging.complete(res);
				}).catch(err => {
					this.$refs.paging.complete(false);
				})
			},

			checkLogin() {
				let token = cache.getToken()
				if (!token || token == '') {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return false
				} else {
					return true
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.home {
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		/* #ifdef H5 */
		min-height: calc(100vh - 100rpx);
		/* #endif */
		background: url('http://zykjstore.oss-cn-chengdu.aliyuncs.com/upload/model/20230301_16776689413.png') no-repeat;
		background-position: top center;
		background-size: 100% auto;

		.list {
			overflow: hidden;
			background: #fff;
			border-top-right-radius: 32rpx;
			border-top-left-radius: 32rpx;
			padding: 0 24rpx;
			margin-top: 36rpx;

			.title {
				font-size: 30rpx;
				font-weight: 600;
				padding: 40rpx 0;
				display: flex;
				align-items: center;
			}

			.ul {
				.li {
					width: 100%;
					height: 440rpx;
					background-position: center;
					background-size: cover;
					border-radius: 10rpx;
					margin-bottom: 20rpx;
					overflow: hidden;
					position: relative;

					image {
						width: 100%;
						height: 100%;
						z-index: 0;
						position: absolute;
						top: 0;
					}

					.bg {
						position: absolute;
						width: 100%;
						height: 100%;
						padding: 20rpx 24rpx;
						background: linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, .5));
						z-index: 2;
					}

					.add {
						position: absolute;
						left: 0;
						width: 100%;
						bottom: 0;
						padding: 0 24rpx 30rpx;
						z-index: 2;

						view:first-child {
							font-size: 32rpx;
							color: #fff;
							font-weight: 600;
						}

						view:nth-child(2) {
							color: #E09A5B;
							font-size: 26rpx;
							font-weight: 500;
							padding: 4rpx 0;
						}

						view:last-child {
							color: #fff;
							font-size: 24rpx;
						}
					}

					.label {
						overflow: hidden;
						z-index: 2;

						view {
							padding: 4rpx 10rpx;
							background: rgba(0, 0, 0, .6);
							border-radius: 4rpx;
							font-size: 20rpx;
							color: #fff;
							margin-right: 10rpx;
							float: left;
							margin-bottom: 10rpx;
						}

						view.active {
							background: #D6B07F;
							color: #140200;
						}
					}
				}
			}
		}

		.cont {
			padding: 0 24rpx;
			overflow: hidden;

			.video {
				overflow: hidden;
				width: calc(100vw - 48rpx);
				height: calc((100vw - 48rpx) * (180.0 / 702.0));

				.swiper,
				.swiper-item,
				video,
				image {
					width: 100%;
					height: 100%;
				}
			}

			.main {
				padding: 36rpx 0;
				overflow: hidden;
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				.li {
					position: relative;
					width: calc((100vw - 48rpx - 32rpx) / 3);
					height: calc((100vw - 48rpx - 32rpx) / 3 * (99 / 81));
					background: #fff;

					image {
						width: calc((100vw - 48rpx - 32rpx) / 3);
						height: calc((100vw - 48rpx - 32rpx) / 3 * (99 / 81));
					}
				}
			}

			.banner {
				width: calc(100vw - 48rpx);
				height: calc((100vw - 48rpx) * (394.0 / 702.0));
				border-radius: 10rpx;
				overflow: hidden;

				.swiper,
				.swiper-item,
				image {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}
		}

	}
</style>