<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			submitCode(codeId) {
				this.$staffApi.submitVerifyCode(codeId)
					.then(res => {
						uni.navigateBack()
					}).catch(err => {
						
					})
			}
		}
	}
</script>

<style>

</style>
