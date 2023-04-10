<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		
		onLoad(options) {
			this.url = options.url;
		},
		
		onShareAppMessage(res) {
			return this.$shareIndex()
		},
		
		methods: {
			
		}
	}
</script>

<style>

</style>
