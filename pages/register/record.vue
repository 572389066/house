<template>
	<view class="record">
		<z-paging ref="paging" v-model="recordData" @query="fetchCheckRecord" default-page-size="30">
			<view class="ul" v-for="(item,index) in recordData">
				<navigator  hover-class="none" :url="'/pages/register/detail?detail='+JSON.stringify(item)" class="li">
					<view class="left">
						<view>{{ item.build_name }}</view>
						<view>{{ item.date }}</view>
					</view>
					<uni-icons type="right" size="30rpx" color="rgba(51, 49, 52, .6)"></uni-icons>
				</navigator>
			</view>
		</z-paging>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordData:[]
			}
		},
		methods: {
			fetchCheckRecord(page,pageSize){
				this.$api.fetchCheckRecord(page, pageSize)
				.then(res => {
					this.$refs.paging.complete(res);
				}).catch(err => {
					this.$refs.paging.complete(false);
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.record {
		overflow: hidden;
		.ul {
			padding: 0 32rpx;
			.li {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 40rpx 0;
				border-bottom: 2rpx solid rgba(186, 185, 191, .2);
				.left {
					view:first-child {
						font-size: 28rpx;
						font-weight: 600;
					}
					view:nth-child(2) {
						font-size: 24rpx;
						color: #A9A9A9;
						padding-top: 16rpx;
					}
				}
			}
		}
	}
</style>
