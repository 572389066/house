<template>
	<view class="edit">
		<form @submit="submitUserCard">
			<view class="cont">
				<view class="ul">
					<view class="li">
						<view>联系人</view>
						<input type="text" name="name" placeholder="请填写姓名" placeholder-style="color: #BFBFBF"
							:value="getDisplayInputValue('name')">
					</view>
					<view class="li">
						<view>手机号</view>
						<input type="number" name="phone" placeholder="请填写手机号" maxlength="11"
							placeholder-style="color: #BFBFBF" :value="getDisplayInputValue('phone')">
					</view>
					<view class="li">
						<view>所属公司</view>
						<input type="text" name="company" placeholder="请选择公司" placeholder-style="color: #BFBFBF"
							v-model="companyName" disabled="true" @click="showCompanyPicker()">
					</view>
					<view class="li">
						<view>所属部门</view>
						<input type="text" name="address" placeholder="请填写所属部门" placeholder-style="color: #BFBFBF"
							:value="getDisplayInputValue('address')">
					</view>
				</view>
			</view>
			<view class="common_bottom">
				<button form-type="submit">{{type==1?'确认':'保存并使用'}}</button>
			</view>
		</form>

		<uni-popup ref="popup" type="bottom">
			<view class="pop-box">
				<view class="title-box">
					<text>选择所属公司</text>
					<view class="colse" @click="closeCompanyPicker">
						<uni-icons type="closeempty" size="20" color="#999999"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y="true">
					<view class="scroll-conetnt">
						<view class="li" v-for="(item,index) in companyData" @click="onCompanyItemClick(item)">
							{{ item }}
						</view>
					</view>
				</scroll-view>

			</view>
		</uni-popup>
	</view>
</template>

<script>
	import cache from "../../utils/cache.js"
	export default {
		data() {
			return {
				type: 1,
				userCard: null,
				userInfo: null,
				companyName: '',
				companyData: []
			}
		},
		onLoad(options) {
			const {
				type
			} = options;
			this.type = type;
			uni.setNavigationBarTitle({
				title: type == 1 ? '我的名片' : '编辑名片'
			});
		},

		onShow() {
			this.fetchUserCard()
			this.fetchUserInfo()
			this.fetchUserCompany()
		},

		methods: {
			showCompanyPicker() {
				this.$refs.popup.open()
			},
			closeCompanyPicker() {
				this.$refs.popup.close()
			},
			onCompanyItemClick(item) {
				this.companyName = item
				this.closeCompanyPicker()
			},
			getDisplayInputValue(key) {
				if (key === 'name' && this.userCard && this.userCard.name) {
					return this.userCard.name
				}
				if (key === 'phone') {
					if (this.userInfo && this.userInfo.phone) {
						return this.userInfo.phone
					} else {
						// return cache.getPhone()
						return ''
					}
				}
				if (key === 'company' && this.userCard && this.userCard.company) {
					return this.userCard.company
				}
				if (key === 'address' && this.userCard && this.userCard.address) {
					return this.userCard.address
				}
				return ''
			},

			fetchUserInfo() {
				let token = cache.getToken()
				if (token && token != '') {
					this.$api.fetchUserInfo()
						.then(res => {
							this.userInfo = res
							// if (res) {
							// 	cache.savePhone(res.phone)
							// }
						}).catch(res => {

						})
				} else {
					this.userInfo = null
				}
			},

			fetchUserCard() {
				this.$api.fetchUserCard().then(res => {
					this.userCard = res
					console.log("fetchUserCard: " + JSON.stringify(res));
					if (res && res.company) {
						this.companyName = res.company
					}
				}).catch(err => {

				})
			},

			fetchUserCompany() {
				this.$api.fetchUserCompany().then(res => {
					this.companyData = res
				}).catch(err => {

				})
			},

			submitUserCard(e) {
				let name = e.detail.value.name
				let phone = e.detail.value.phone
				let company = e.detail.value.company
				let address = e.detail.value.address

				if (name.length === 0) {
					this.$msg('请输入联系人')
					return
				}
				// if (phone.length === 0) {
				// 	this.$msg('请输入手机号')
				// 	return
				// }
				// if (phone.length != 11) {
				// 	this.$msg('请输入正确的手机号')
				// 	return
				// }

				this.$api.submitUserCard(name, phone, company, address).then(res => {
					this.$msg('提交成功')
					uni.navigateBack()
				}).catch(err => {

				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.edit {
		overflow: hidden;

		.cont {
			padding: 32rpx 24rpx;
			overflow: hidden;

			.ul {
				.li {
					display: flex;
					justify-content: space-between;
					height: 116rpx;
					border-bottom: 2rpx solid rgba(242, 242, 242, .5);

					view {
						display: flex;
						align-items: center;
						font-size: 28rpx;
						font-weight: 600;
					}

					input {
						width: calc(100% - 120rpx);
						height: 100%;
						padding-left: 30rpx;
						font-size: 28rpx;
					}
				}
			}
		}
	}


	.pop-box {
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		height: 50vh;
		display: flex;
		flex-direction: column;

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

		scroll-view {
			height: 0rpx;
			flex-grow: 1;

			.scroll-conetnt {
				display: flex;
				flex-direction: column;

				.li {
					text-align: center;
					padding-top: 30rpx;
					padding-bottom: 30rpx;
					margin-left: 32rpx;
					margin-right: 32rpx;
					border-bottom: 2rpx solid #F2F2F2;

					color: #343434;
					font-size: 32rpx;
				}
			}
		}
	}


	button {
		background: #333134;
		color: #fff;
	}
</style>