<template>
	<view class="content">
		<view class="top"></view>
		<form @submit="onClickSubmit">
			<view class="item-box" @click="onClickBuilding()">
				<text class="title">楼盘</text>
				<input class="input" v-if="currentBuilding" placeholder="请选择楼盘" placeholder-class="placeholder"
					:value="currentBuilding.name" disabled="true" />
				<input class="input" v-else placeholder="请选择楼盘" placeholder-class="placeholder" disabled="true" />
				<uni-icons type="right" size="18" color="#999999"></uni-icons>
			</view>
			<view class="divider"></view>
			<view class="item-box" @click="onClickChennel()">
				<text class="title">渠道</text>
				<input class="input" v-if="selectedChannel" :value="selectedChannel.name" placeholder="请选择渠道"
					placeholder-class="placeholder" disabled="true" />
				<input class="input" v-else placeholder="请选择渠道" placeholder-class="placeholder" disabled="true" />
				<uni-icons type="right" size="18" color="#999999"></uni-icons>
			</view>
			<view class="divider"></view>
			<view class="item-box">
				<text class="title">客户电话</text>
				<input class="input" name="phone" placeholder="请输入客户电话" placeholder-class="placeholder" type="number"
					maxlength="11" v-model="customPhone" />
			</view>
			<view class="divider"></view>

			<view class="item-box note-box">
				<text class="title">客户描述</text>
				<textarea class="input" name="note" placeholder="请输入客户描述(100字内)" placeholder-class="placeholder"
					type="number" maxlength="100" v-model="customNote"></textarea>
			</view>

			<button form-type="submit" class="submit">提交</button>
		</form>

		<uni-popup ref="channelPicker" type="bottom">
			<view class="pop-content">
				<z-paging ref="pagingChannel" :fixed="false" v-model="channelData" @query="fetchChannel" refresher-only
					@onRefresh="fetchChannel">
					<template #top>
						<view class="title-box">
							<text>选择渠道</text>
							<view class="colse" @click="closeChannelSelected">
								<uni-icons type="closeempty" size="20" color="#999999"></uni-icons>
							</view>
						</view>
					</template>

					<view class="list-box">
						<block v-for="(item,index) in channelData">
							<view class="item" @click="onChannelSelected(item)">{{ item.name }}</view>
						</block>
					</view>
				</z-paging>
			</view>
		</uni-popup>

		<uni-popup ref="buildingPicker" type="bottom">
			<view class="pop-content">
				<z-paging ref="paging" :fixed="false" v-model="buildingData" @query="fetchBuilding">
					<template #top>
						<view class="title-box">
							<text>选择楼盘</text>
							<view class="colse" @click="closeBuildingSelected">
								<uni-icons type="closeempty" size="20" color="#999999"></uni-icons>
							</view>
						</view>
					</template>

					<view class="list-box">
						<block v-for="(item,index) in buildingData">
							<view class="item" @click="bindCurrentBuilding(item)">{{ item.name }}</view>
						</block>
					</view>
				</z-paging>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import cache from "../../../utils/cache.js"
	export default {
		data() {
			return {
				currentBuilding: null,
				showChannelPicker: false,
				channelData: [],
				selectedChannel: null,
				buildingData: [],
				customPhone: '',
				customNote: '',
			}
		},

		onLoad() {
			this.currentBuilding = cache.getCurrentBuilding()
		},

		methods: {
			onClickBuilding() {
				this.$refs.buildingPicker.open()
			},

			closeBuildingSelected() {
				this.$refs.buildingPicker.close()
			},

			onClickChennel() {
				this.$refs.channelPicker.open()
				this.fetchChannel()
			},

			closeChannelSelected() {
				this.$refs.channelPicker.close()
			},

			onChannelSelected(channel) {
				this.selectedChannel = channel
				this.closeChannelSelected()
			},

			onClickSubmit(e) {
				let phone = e.detail.value.phone
				let note=e.detail.value.note
				if (!this.currentBuilding) {
					this.$msg('请选择楼盘')
					return
				}
				if (!this.selectedChannel) {
					this.$msg('请选择渠道')
					return
				}
				if (!phone || phone == '') {
					this.$msg('请输入客户电话')
					return
				}
				if (phone.length != 11) {
					this.$msg('请输入正确的客户电话')
					return
				}

				let that = this
				uni.showModal({
					title: '提示',
					content: '请确认登记信息，是否确认提交？',
					success: function(res) {
						if (res.confirm) {
							that.submitInfo(phone,note)
						} else if (res.cancel) {

						}
					}
				});
			},

			bindCurrentBuilding(building) {
				this.currentBuilding = building
				this.closeBuildingSelected()
			},

			fetchChannel() {
				this.$staffApi.fetchChannel()
					.then(res => {
						this.$refs.pagingChannel.complete(res);
					}).catch(err => {

					})
			},

			fetchBuilding(page, pageSize) {
				this.$staffApi.fetchBuildingList(page, pageSize)
					.then(res => {
						this.customPhone = ''
						this.$refs.paging.complete(res);
					}).catch(err => {

					})
			},

			submitInfo(phone,note) {
				this.$staffApi.submitCustomerCheck(this.currentBuilding.id, this.selectedChannel.id, phone,note)
					.then(res => {
						this.$msg('提交成功')
						this.customPhone = ''
						this.customNote=''
					}).catch(err => {

					})
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #fff;
	}
	
	

	.item-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 32rpx 64rpx 32rpx 64rpx;


		.title {
			color: #333134;
			font-size: 28rpx;
			min-width: 160rpx;
		}

		.input {
			flex-grow: 1;
			font-size: 28rpx;
			color: #333134;
		}

		.placeholder {
			font-size: 28rpx;
			color: #999999;
		}

		textarea {
			height: 200rpx;
			padding: 16rpx;
			border: 2rpx solid #F2F2F2;
			border-radius: 6rpx;
		}

		
	}

.note-box{
			align-items: flex-start;
		}

	.divider {
		background-color: #F2F2F2;
		height: 2rpx;
		margin-left: 64rpx;
		margin-right: 64rpx;
	}

	.submit {
		margin-left: 64rpx;
		margin-right: 64rpx;
		margin-top: 160rpx;
		color: #FFFFFF;
		background-color: #333134;
	}

	.top {
		height: 64rpx;
	}

	.pop-content {
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		height: 50vh;

		.title-box {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			height: 100rpx;
			border-bottom: 2rpx solid #F2F2F2;

			text {
				color: #000;
				font-size: 32rpx;
				font-weight: 500;
			}

			.colse {
				position: absolute;
				height: 60rpx;
				width: 60rpx;
				right: 32rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
		}

		.list-box {
			display: flex;
			flex-direction: column;

			.item {
				text-align: center;
				padding-top: 24rpx;
				padding-bottom: 24rpx;
				margin-left: 32rpx;
				margin-right: 32rpx;
				border-bottom: 2rpx solid #F2F2F2;
			}
		}
	}
</style>
