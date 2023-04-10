<template>
	<view class="award">
		<!-- #ifdef MP-WEIXIN -->
		<Head :title="'推广获奖'"></Head>
		<!-- #endif -->

		<z-paging ref="paging" v-model="promotionData" @query="fetchPromotionList">
			<view class="cont" :style="{marginTop: `${wx.height + wx.top}px`}">
				<view class="ul">
					<navigator :url="'/pages/award/detail?id='+item.id" hover-class="none" class="li"
						v-for="(item,index) in promotionData" :key="index"
						:style="{background:`url(${getImageUrl(item.picture)}) no-repeat`,backgroundPosition:'center',backgroundSize:'cover'}">
						<view class="name">{{item.title}}</view>
					</navigator>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import Head from '@/components/Head/Head.vue';
	import urlUtil from "../../utils/urlUtil.js"
	export default {
		components: {
			Head
		},
		data() {
			return {
				promotionData: [],
				wx: {}
			}
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


			fetchPromotionList(page, pageSize) {
				this.$api.fetchPromotionList(page, pageSize).then(res => {
					this.$refs.paging.complete(res);
				}).catch(err => {
					this.$refs.paging.complete(false);
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.award {
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		/* #ifdef H5 */
		min-height: calc(100vh - 100rpx);
		/* #endif */
		background: url('http://zykjstore.oss-cn-chengdu.aliyuncs.com/upload/model/20230301_16776689413.png') no-repeat;
		background-position: center;
		background-size: cover;

		.cont {
			padding: 32rpx 24rpx;
			overflow: hidden;

			.ul {

				a,
				.li {
					position: relative;
					width: 100%;
					height: 390rpx;
					background: #fff;
					margin-bottom: 20rpx;
					border-radius: 12rpx;
					overflow: hidden;

					.name {
						position: absolute;
						left: 0;
						bottom: 0;
						width: 100%;
						height: 88rpx;
						display: flex;
						align-items: center;
						padding: 0 24rpx;
						font-size: 32rpx;
						color: #fff;
						font-weight: 600;
						background: linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 1));
					}
				}
			}
		}
	}
</style>
