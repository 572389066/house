<template>
	<view class="content">
		<view class="ul1">
			<text class="title">客户信息</text>
			<!-- 	<view class="li">
				<text>姓名</text>
				<text class="value">--</text>
			</view> -->
			<view class="li">
				<text>电话</text>
				<text class="value">{{ recordData?recordData.user_phone:'--' }}</text>
			</view>
		</view>

		<view class="ul2">
			<text class="title">接收员工</text>
			<view class="li" @click="showStaffPicker()">
				<text>账号:</text>
				<text class="value">{{ staff?staff.username:'' }}</text>
				<uni-icons type="right" color="#333134" size="28rpx"></uni-icons>
			</view>
		</view>

		<button @click="onClickSubmit()">确定</button>

		<uni-popup ref="staffPicker" type="bottom">
			<view class="pop-content">
				<z-paging ref="staffPaging" :fixed="false" v-model="staffData" @query="fetchStaff"
					:loading-more-enabled="false">
					<template #top>
						<view class="title-box">
							<text>选择员工</text>
							<view class="colse" @click="closeStaffPicker">
								<uni-icons type="closeempty" size="20" color="#999999"></uni-icons>
							</view>
						</view>
					</template>

					<view class="list-box">
						<block v-for="(item,index) in staffData">
							<view class="item" @click="bindStaff(item)">{{ item.username }}</view>
						</block>
					</view>
				</z-paging>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordData: null,
				staffData: [],
				staff: null
			}
		},

		onLoad(option) {
			if (option && option.record) {
				this.recordData = JSON.parse(decodeURIComponent(option.record))
			}
		},

		methods: {
			showStaffPicker() {
				this.$refs.staffPicker.open()
			},
			closeStaffPicker() {
				this.$refs.staffPicker.close()
			},
			bindStaff(item) {
				this.staff = item
				this.closeStaffPicker()
			},
			onClickSubmit() {
				if (!this.recordData || !this.recordData.id) {
					this.$msg('获取客服信息出错')
					return
				}
				if (!this.staff || !this.staff.id) {
					this.$msg('选择员工')
					return
				}
				uni.showModal({
					title: '提示',
					content: '是否将当前客户转让给' + this.staff.username + '?',
					success: (res) => {
						if (res.confirm) {
							this.submitTransfer()
						} else if (res.cancel) {

						}
					}
				});
			},

			submitTransfer() {
				this.$staffApi.submitTransfer(this.recordData.id, this.staff.id)
					.then(res => {
						this.$msg('转让成功')
						setTimeout(() => {
							uni.navigateBack()
						}, 1000);
					}).catch(err => {

					})
			},

			fetchStaff(page, pageSize) {
				this.$staffApi.fetchStaff()
					.then(res => {
						this.$refs.staffPaging.complete(res);
					}).catch(err => {
						this.$refs.staffPaging.complete(false);
					})
			},
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F9F9F9;
	}

	.content {
		padding: 0rpx;
	}

	.ul1 {
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 20rpx;
		padding: 32rpx 20rpx;
		border-radius: 8rpx;
		background-color: #fff;
		overflow: hidden;

		.title {
			font-size: 36rpx;
			font-weight: 500;
			color: #000;
			margin-bottom: 24rpx;
		}

		.li {
			display: flex;
			flex-direction: row;
			height: 90rpx;
			align-items: center;

			text {
				font-size: 28rpx;
				color: #333134;
			}

			.value {
				flex-grow: 1;
				margin-left: 16rpx;
			}
		}
	}

	.ul2 {
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 20rpx;
		padding: 32rpx 20rpx;
		border-radius: 8rpx;
		background-color: #fff;
		overflow: hidden;

		.title {
			font-size: 36rpx;
			font-weight: 500;
			color: #000;
			margin-bottom: 24rpx;
		}

		.li {
			display: flex;
			flex-direction: row;
			height: 90rpx;
			align-items: center;

			text {
				font-size: 28rpx;
				color: #333134;
			}

			.value {
				flex-grow: 1;
				margin-left: 16rpx;
				margin-right: 12rpx;
			}
		}
	}

	button {
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 80rpx;
		background-color: #333134;
		border-radius: 8rpx;
		color: #fff;
	}

	.pop-content {
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		height: 60vh;

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
				padding-top: 30rpx;
				padding-bottom: 30rpx;
				margin-left: 32rpx;
				margin-right: 32rpx;
				border-bottom: 2rpx solid #F2F2F2;
			}
		}
	}
</style>