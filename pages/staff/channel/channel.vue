<template>
	<view class="content">
		<z-paging ref="paging" v-model="channelData" @query="fetchChannel" refresher-only @onRefresh="fetchChannel">
			<view class="list-box">
				<view class="item-box" v-for="(item,index) in channelData" @click="onItemClick(item)">
					<text class="value">{{ item.name }}</text>
					<uni-icons type="right" size="22"></uni-icons>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				channelData: []
			}
		},
		
		onLoad() {
			this.fetchChannel()
		},
		
		methods: {
			onItemClick(item){
				if(item){
					uni.redirectTo({
						url:'/pages/staff/qr/qr?id='+item.id+'&name='+item.name
					})
				}
			},
			
			fetchChannel() {
				this.$staffApi.fetchChannel()
					.then(res => {
						this.$refs.paging.complete(res);
					}).catch(err => {

					})
			}
		}
	}
</script>

<style lang="less" scoped>
	.item-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-right: 32rpx;
		margin-left: 32rpx;
		border-bottom: 2rpx solid #F2F2F2;
		padding-top: 50rpx;
		padding-bottom: 52rpx;

		.value {
			font-size: 32rpx;
			font-weight: 500;
			color: #333134;
			flex-grow: 1;
		}
	}
</style>
