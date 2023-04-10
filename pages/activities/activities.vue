<template>
	<view class="activities">
		<z-paging ref="paging" v-model="activityData" @query="fetchActivityList">
			<view class="cont">
				<view class="ul">
					<!-- <view class="li" hover-class="none" @click="onItemClick(item.url)" v-for="(item, index) in activityData"
						:key="index"
						:style="{background:`url(${getImageUrl(item.bg)}) no-repeat`,backgroundPosition:'center',backgroundSize:'cover'}">
						<view class="font">
							<view class="name">{{item.name}}</view>
							<view class="text">
								<text>{{item.text}}</text>
								<uni-icons type="right" size="24rpx" color="#fff"></uni-icons>
							</view>
						</view>
					</view> -->

					<image class="li" hover-class="none" @click="onItemClick(item)"
						v-for="(item, index) in activityData" :key="index" :src="getImageUrl(item.bg)"
						mode="aspectFill"></image>
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
				activityData: []
			}
		},
		methods: {
			getImageUrl(url) {
				let relUrl = urlUtil.getImgUrlNotSize(url)
				return relUrl
			},

			onItemClick(item) {
				if (item) {
					if (item.type == '0') {
						//跳转网页
						if (item.url && item.url != '') {
							uni.navigateTo({
								url: '/pages/web/web?url=' + urlUtil.getFullUrl(item.url)
							})
						}
					} else if (item.type == '1') {
						//微信视频号主页
						if (item.url && item.url != '') {
							wx.openChannelsUserProfile({
								finderUserName: item.url,
								success: function() {

								},
								fail: function() {
									console.log("openChannelsUserProfile fail: " + JSON.stringify(e));
								}
							})
						}
					} else if (item.type == '2') {
						//微信视频号 视频
						if (item.url && item.url != '' && item.video_id && item.video_id != '') {
							wx.openChannelsActivity({
								finderUserName: item.url,
								feedId: item.video_id,
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

			fetchActivityList(page, pageSize) {
				this.$api.fetchActivityList(page, pageSize).then(res => {
					console.log("fetchActivityList result: " + JSON.stringify(res));
					this.$refs.paging.complete(res);
				}).catch(err => {
					console.log("fetchActivityList err: " + JSON.stringify(err));
					this.$refs.paging.complete(false);
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.activities {
		.cont {
			padding: 28rpx 24rpx;
			overflow: hidden;

			.ul {
				display: flex;
				flex-direction: column;
				margin-bottom: 28rpx;
			}

			.li {
				width: 100%;
				height: 240rpx;
				border-radius: 8rpx;
				margin-bottom: 28rpx;

				.font {
					.text {
						display: flex;
						align-items: center;
						padding-top: 8rpx;

						text {
							font-size: 24rpx;
							color: #fff;
							opacity: .8;
						}
					}

					.name {
						font-size: 40rpx;
						color: #fff;
						font-weight: 600;
					}
				}
			}

			.li:last-child {
				margin: 0;
			}
		}
	}
</style>
