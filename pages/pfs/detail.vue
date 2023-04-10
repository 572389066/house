<template>
	<view class="detail">
		<view class="banner">
			<image :src="getImageUrl(buildingDetail.pic)" mode="aspectFill"></image>
		</view>
		<view class="cont">
			<view class="info">
				<view class="label">
					<view class="active" v-if="buildingDetail.status==='preSale'">预售</view>
					<view class="active" v-else-if="buildingDetail.status==='onSale'">在售</view>
					<view class="active" v-else>售罄</view>
					<block v-for="(item,index) in buildingDetail.tags">
						<view v-if="item && item!=''">{{ item }}</view>
					</block>
				</view>
				<view class="title">{{ buildingDetail.name }}</view>
				<view class="price">约{{ buildingDetail.price }}起元/㎡</view>
				<view class="address">项目地址：{{ getDisplayAddress() }}</view>
			</view>
			<view class="content">
				<view class="title">项目详情</view>
				<view class="add">
					<mp-html :content="buildingDetail.detail" />
				</view>
			</view>
		</view>
		<view class="common_bottom" v-if="buildingDetail.phone" @click="onClickPhone">
			<view>电话咨询</view>
		</view>
	</view>
</template>

<script>
	import urlUtil from "../../utils/urlUtil.js"
	export default {
		data() {
			return {
				buildingId: '',
				buildingDetail: null,
			}
		},

		onLoad(option) {
			this.buildingId = option.id
			this.fetchBuildingDetail()
		},

		onShareAppMessage(res) {
			if (this.buildingDetail) {
				return this.$shareBuilding(this.buildingDetail.id, this.buildingDetail.name)
			} else {
				return this.$shareIndex()
			}

		},

		methods: {
			getImageUrl(url) {
				let relUrl = urlUtil.getImgUrl(url)
				return relUrl
			},
			getDisplayAddress() {
				let address = ''
				if (this.buildingDetail) {
					if (this.buildingDetail.province) {
						address = this.buildingDetail.province
					}
					if (this.buildingDetail.city) {
						address = address + this.buildingDetail.city
					}
					if (this.buildingDetail.district) {
						address = address + this.buildingDetail.district
					}
					if (this.buildingDetail.address) {
						address = address + this.buildingDetail.address
					}
				}
				return address
			},

			fetchBuildingDetail() {
				this.$api.fetchBuildingDetail(this.buildingId).then(res => {
					console.log("fetchBuildingDetail result: " + JSON.stringify(res));
					this.buildingDetail = res
				}).catch(err => {
					console.log("fetchBuildingDetail err: " + JSON.stringify(err));
				})
			},

			onClickPhone() {
				uni.makePhoneCall({
					phoneNumber: this.buildingDetail.phone
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.detail {
		background: #F9F9F9;
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		/* #ifdef H5 */
		min-height: calc(100vh - 88rpx);

		/* #endif */
		.cont {
			position: relative;
			z-index: 5;
			padding: 0 24rpx 188rpx;
			margin-top: -108rpx;
			overflow: hidden;

			.content {
				background: #fff;
				margin-top: 20rpx;
				padding: 32rpx 24rpx;

				.add {

					p,
					span {
						font-size: 24rpx;
					}

					image,
					img {
						width: 100%;
					}
				}

				.title {
					font-weight: 600;
					font-weight: 28rpx;
					margin-bottom: 32rpx;
				}
			}

			.info {
				width: 100%;
				min-height: 200rpx;
				background: #fff;
				padding: 32rpx 24rpx;

				.address {
					font-size: 24rpx;
					color: #626162;
					padding-top: 16rpx;
				}

				.price {
					font-size: 30rpx;
					color: #FE615E;
					font-weight: 600;
				}

				.title {
					font-size: 38rpx;
					font-weight: 600;
					padding-top: 16rpx;
					padding-bottom: 20rpx;
				}

				.label {
					overflow: hidden;

					view {
						height: 40rpx;
						padding: 0 10rpx;
						border: 2rpx solid #D6B07F;
						border-radius: 4rpx;
						float: left;
						font-size: 20rpx;
						color: #D6B07F;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-right: 8rpx;
						margin-bottom: 8rpx;
					}

					view.active {
						background: #D6B07F;
						color: #140200;
					}
				}
			}
		}

		.banner {
			width: 100%;
			height: calc(100vw * 470.0 / 750);
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
