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
						<input type="text" name="company" placeholder="请填写公司" placeholder-style="color: #BFBFBF"
							:value="getDisplayInputValue('company')">
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
	</view>
</template>

<script>
	import cache from "../../utils/cache.js"
	export default {
		data() {
			return {
				type: 1,
				userCard: null,
				userInfo: null
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
		},
		
		methods: {
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
					console.log("fetchUserCard result: " + JSON.stringify(res));
				}).catch(err => {
					console.log("fetchUserCard err: " + JSON.stringify(err));
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

	button {
		background: #333134;
		color: #fff;
	}
</style>
