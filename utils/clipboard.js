export default function copyContent(content) {
	uni.setClipboardData({
		data: content + '',
		showToast: false,
		success: function() {
			console.log('success');
		},
		fail: () => {
			console.log('fail');
		}
	});
}
