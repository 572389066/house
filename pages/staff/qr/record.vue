<template>
	<view class="content">

		<z-paging ref="paging" v-model="recordData" @query="fetchRecord" default-page-size="20" :auto="false">
			<template #top>
				<view class="top">
					<uni-search-bar @confirm="onClickSearch" @input="onSearchInput" @clear="onSearchClear"
						@cancel="onSearchClear" placeholder="请输入登记名称/电话" bg-color="#ffffff"></uni-search-bar>
					<view class="filter">
						<!-- <uni-datetime-picker v-model="single" type="date" return-type="timestamp" @change="onDateChange"
							:end="nowTime">
							<view class="li">
								<text>{{ getDisplayDate() }}</text>
								<image class="img" src="../../../static/image/staff/ic_filter_triangle.png"></image>
							</view>
						</uni-datetime-picker> -->

						<view class="li" @click="showBuildingPicker()">
							<text class="value">{{ currentBuilding?currentBuilding.name:'全部楼盘'}}</text>
							<image class="img" src="../../../static/image/staff/ic_filter_triangle.png"></image>
						</view>

						<view class="li li3" @click="showFilterPicker()">
							<text class="value">筛选</text>
							<image class="img" src="../../../static/image/staff/ic_filter_triangle.png"></image>
						</view>
					</view>
				</view>
			</template>
			<view class="bottom">
				<block v-for="item in recordData">
					<view class="ul" @click.stop="onItemClick(item)">
						<view class="li1">
							<view class="title" @click.stop="previewImage(item)">
								<text>{{ item.build_name }}</text>
								<image v-if="getPictures(item).length>0"
									src="../../../static/image/staff/ic_record_title.png"></image>
							</view>
							<text class="date">{{ item.create_time?item.create_time:'--' }}</text>
						</view>

						<view class="li2">
							<view class="left">
								<text class="title">登记人</text>
								<text class="value">{{ item.staff_username?item.staff_username:'--' }}</text>
							</view>
							<view class="divider1"></view>
							<view class="right">
								<text class="title">电话</text>
								<text class="value">{{ item.user_phone?item.user_phone:'--' }}</text>
							</view>
						</view>

						<view class="li3">
							<view class="l">
								<text class="title">登记类型</text>
								<text class="value">{{ getDisplayRole(item) }}</text>
							</view>
							<view class="l">
								<text class="title">渠道</text>
								<text class="value">{{ item.channel?item.channel:'--' }}</text>
							</view>
							<view class="l">
								<text class="title">关联电话</text>
								<text class="value">{{ item.related_phone?item.related_phone:'--' }}</text>
							</view>
						</view>
						<view class="divider2"></view>
						<view class="li4">
							<text class="title">描述</text>
							<text class="value">{{ item.description?item.description:'--' }}</text>
						</view>
					</view>
				</block>
			</view>
		</z-paging>

		<uni-popup ref="buildingPicker" type="bottom">
			<view class="pop-content">
				<z-paging ref="buildingPaging" :fixed="false" v-model="buildingData" @query="fetchBuilding">
					<template #top>
						<view class="title-box">
							<text>选择楼盘</text>
							<view class="colse" @click="closeBuildingPicker">
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

		<uni-popup ref="filterPicker" type="bottom">
			<view class="pop-content filter-box">
				<view class="title-box">
					<text>选择筛选条件</text>
					<view class="colse" @click="closeFilterPicker">
						<uni-icons type="closeempty" size="20" color="#999999"></uni-icons>
					</view>
				</view>
				<view class="list-box">
					<text class="title">登记类型</text>
					<view class="tab-box">
						<block v-for="item in roleTypeData">
							<block v-if="roleTypeTmp && item && roleTypeTmp.id == item.id">
								<text class="tab tab-s" @click="onRoleTypeSelected(item)">{{ item.name }}</text>
							</block>
							<block v-else>
								<text class="tab" @click="onRoleTypeSelected(item)">{{ item.name }}</text>
							</block>

						</block>
					</view>

					<text class="title">渠道</text>
					<view class="tab-box">
						<block v-for="(item,index) in channelData">
							<!-- 	<text :class="{'tab':true,'tab-s':isSelectChannel(item)}"
									@click="onChannelSelected(item)">{{ item.name }}</text> -->

							<block v-if="channelTmp && item && channelTmp.id == item.id">
								<text class="tab tab-s" @click="onChannelSelected(item)">{{ item.name }}</text>
							</block>
							<block v-else>
								<text class="tab" @click="onChannelSelected(item)">{{ item.name }}</text>
							</block>
						</block>
					</view>
					<text class="title">日期</text>
					<view class="tab-box">
						<uni-datetime-picker class="tab tab-s" v-model="single" type="date" @change="onDateChange"
							:end="nowTime">
							<view class="tab tab-s" v-if="filterDateTmp&& filterDateTmp!=''">
								{{ filterDateTmp==''?'全部':filterDateTmp }}
							</view>
							<view class="tab " v-else>请选择日期</view>
						</uni-datetime-picker>
					</view>
				</view>

				<view class="action-box">
					<text class="reset" @click="onFilterResetClick()">重置</text>
					<text class="confirm" @click="onFilterConfirmClick()">完成</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import formatUtils from "../../../utils/format_util.js"
	import urlUtil from "../../../utils/urlUtil.js"
	export default {
		data() {
			return {
				recordData: [],
				buildingData: [],
				channelData: [],
				currentBuilding: null,

				roleTypeData: [{
					id: 'Customer',
					name: '客户'
				}, {
					id: 'Sales',
					name: '中介'
				}],

				roleType: null,
				channel: null,
				roleTypeTmp: null,
				channelTmp: null,

				filterDate: '',
				filterDateTmp: '',
				nowTime: 0,
				searchKey: ''
			}
		},

		onLoad() {
			this.nowTime = Date.now()
			this.fetchChannel()
		},

		onShow() {
			this.$refs.paging.reload()
		},

		methods: {
			getImageUrl(url) {
				return urlUtil.getImgUrlNotSize(url)
			},
			previewImage(item) {
				let imageArr = this.getPictures(item)
				if (imageArr.length == 0) {
					return
				}
				uni.previewImage({
					urls: imageArr,
					success: (res) => {

					}
				});
			},
			onClickSearch(e) {
				this.searchKey = e.value
				this.$refs.paging.reload()
			},
			onSearchInput(e) {
				this.searchKey = e
				this.$refs.paging.reload()
			},
			onSearchClear(e) {
				this.searchKey = ''
				this.$refs.paging.reload()
			},
			getDisplayRole(record) {
				if (record && record.type) {
					if (record.type == 'Customer') {
						return '客户'
					} else if (record.type == 'Sales') {
						return '中介'
					}
				}
				return '--'
			},
			onDateChange(e) {
				this.filterDateTmp = e
				this.$refs.paging.reload()
			},

			showBuildingPicker() {
				this.$refs.buildingPicker.open()
			},

			closeBuildingPicker() {
				this.$refs.buildingPicker.close()
			},

			bindCurrentBuilding(building) {
				this.currentBuilding = building
				this.closeBuildingPicker()
				this.$refs.paging.reload()
			},

			showFilterPicker() {
				this.roleTypeTmp = this.roleType
				this.channelTmp = this.channel
				this.filterDateTmp = this.filterDate
				this.$refs.filterPicker.open()
			},

			closeFilterPicker() {
				this.$refs.filterPicker.close()
			},

			isSelectRoleType(roleType) {
				return this.roleTypeTmp && roleType && this.roleTypeTmp.id == roleType.id
			},

			isSelectChannel(channel) {
				return this.channelTmp && channel && this.channelTmp.id == channel.id
			},

			onRoleTypeSelected(roleType) {
				if (this.roleTypeTmp && roleType && roleType.id == this.roleTypeTmp.id) {
					this.roleTypeTmp = null
				} else {
					this.roleTypeTmp = roleType
				}
			},

			onChannelSelected(channel) {
				if (this.channelTmp && channel && this.channelTmp.id == channel.id) {
					this.channelTmp = null
				} else {
					this.channelTmp = channel
				}
			},

			onFilterResetClick() {
				this.roleTypeTmp = null
				this.channelTmp = null
				this.filterDateTmp = ''
				// this.$refs.paging.reload()
			},

			onFilterConfirmClick() {
				this.roleType = this.roleTypeTmp
				this.channel = this.channelTmp
				this.filterDate = this.filterDateTmp
				this.closeFilterPicker()
				this.$refs.paging.reload()
			},

			fetchBuilding(page, pageSize) {
				this.$staffApi.fetchBuildingList(page, pageSize, '', '', '')
					.then(res => {
						res.unshift({
							id: '',
							name: '全部楼盘'
						});
						this.$refs.buildingPaging.complete(res);
					}).catch(err => {
						this.$refs.buildingPaging.complete(false);
					})
			},

			fetchChannel() {
				this.$staffApi.fetchChannel()
					.then(res => {
						this.channelData = res
					}).catch(err => {

					})
			},

			fetchRecord(page, pageSize) {
				let buildingName = this.currentBuilding ? this.currentBuilding.id : ''
				let customerName = this.searchKey
				let date = this.filterDate
				let channel = this.channel ? this.channel.id : ''
				let type = this.roleType ? this.roleType.id : ''
				this.$staffApi.fetchCustomerList(page, pageSize, buildingName, customerName, date, channel, type).then(
					res => {
						this.$refs.paging.complete(res);
					}).catch(err => {
					this.$refs.paging.complete(false);
				})
			},

			onItemClick(item) {
				if (item && item.type == 'Customer') {
					uni.navigateTo({
						url: '/pages/staff/qr/transfer?record=' + encodeURIComponent(JSON.stringify(item))
					})
				}
			},

			getPictures(item) {
				let img = []
				if (item && item.pictures && item.pictures.length > 0) {
					for (var i = 0; i < item.pictures.length; i++) {
						let url = item.pictures[i]
						if (url && url != '') {
							img.push(this.getImageUrl(url))
						}
					}
				}
				return img
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F9F9F9;
	}

	.top {
		display: flex;
		flex-direction: column;
		background-color: #ffffff;

		.filter {
			display: flex;
			flex-direction: row;
			padding-left: 32rpx;
			padding-right: 32rpx;

			.li {
				display: flex;
				flex-direction: row;
				align-items: center;
				height: 100rpx;

				.value {
					color: #333134;
					font-size: 28rpx;
				}

				.img {
					height: 16rpx;
					width: 26rpx;
					margin-left: 4rpx;
				}
			}

			.li2 {
				margin-left: 32rpx;
			}

			.li3 {
				flex-grow: 1;
				justify-content: flex-end;
			}
		}


	}

	.bottom {
		display: flex;
		flex-direction: column;

		.ul {
			display: flex;
			flex-direction: column;
			margin-left: 20rpx;
			margin-right: 20rpx;
			margin-top: 20rpx;
			padding: 32rpx 20rpx;
			border-radius: 8rpx;
			background-color: #fff;
			overflow: hidden;

			.li1 {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.title {
					display: flex;
					flex-direction: row;
					align-items: center;

					text {
						font-size: 36rpx;
						color: #333134;
					}

					image {
						width: 28rpx;
						height: 28rpx;
						margin-left: 16rpx;
					}
				}

				.date {
					color: #a9a9a9;
					font-size: 24rpx;
				}
			}

			.li2 {
				display: flex;
				flex-direction: row;
				align-items: center;
				border-radius: 6px;
				background: #fafafc;
				padding: 28rpx 30rpx;
				margin-top: 32rpx;

				.left {
					width: calc((100% - 2rpx) / 2);
					display: flex;
					flex-direction: column;
					padding-right: 28rpx;
				}

				.right {
					width: calc((100% - 2rpx) / 2);
					display: flex;
					flex-direction: column;
					padding-left: 28rpx;
				}

				.divider1 {
					width: 2rpx;
					height: 64rpx;
					background: #f3f3f8;
				}

				.title {
					color: #a9a9a9;
					font-size: 24rpx;
				}

				.value {
					color: #333134;
					font-size: 32rpx;
					margin-top: 8rpx;
				}
			}

			.li3 {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				margin-top: 28rpx;

				.l {
					width: 30%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.title {
						color: #a9a9a9;
						font-size: 24rpx;
					}

					.value {
						color: #333134;
						font-size: 32rpx;
						margin-top: 8rpx;
					}
				}
			}

			.divider2 {
				height: 2rpx;
				background: #f2f2f2;
				width: 100%;
				margin-top: 32rpx;
			}

			.li4 {
				display: flex;
				flex-direction: column;
				margin-top: 24rpx;

				.title {
					color: #a9a9a9;
					font-size: 24rpx;
				}

				.value {
					color: #333134;
					font-size: 32rpx;
					margin-top: 8rpx;
				}
			}
		}
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

		// scroll-view {
		// 	height: calc(60vh - 242rpx);
		// }

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

			.title {
				color: #343434;
				font-size: 32rpx;
				margin-left: 32rpx;
				margin-top: 48rpx;
			}

			.tab-box {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				margin-left: 32rpx;
				margin-right: 32rpx;
				margin-top: 10rpx;

				.tab {
					color: #343434;
					font-size: 28rpx;
					line-height: 76rpx;
					border-radius: 8rpx;
					background-color: #F9F9F9;
					width: calc((100% - 40rpx) / 3);
					text-align: center;
					margin-right: 20rpx;
					margin-top: 20rpx;
				}

				text:nth-child(3n) {
					margin-right: 0rpx;
				}

				.tab-s {
					color: #fff;
					background-color: #333134;
				}
			}
		}

		.action-box {
			height: 140rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-top: 1rpx solid #f2f2f2;
			padding-left: 32rpx;
			padding-right: 32rpx;
			z-index: 100;

			.reset {
				line-height: 80rpx;
				font-size: 32rpx;
				color: #343434;
			}

			.confirm {
				line-height: 80rpx;
				font-size: 32rpx;
				color: #343434;
				border-radius: 8rpx;
				border: 1rpx solid #343434;
				padding-left: 52rpx;
				padding-right: 52rpx;
			}
		}
	}

	.filter-box {
		height: 80vh;
		display: flex;
		flex-direction: column;

		.list-box {
			flex-grow: 1;
		}
	}
</style>