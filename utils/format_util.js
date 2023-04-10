function formatPhone(phone) {
	if (phone === undefined || phone === null || phone === '') {
		return '';
	} else {
		return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2')
	}
}

function formatBankCardNo(cardNo) {
	if (cardNo === undefined || cardNo === null || cardNo === '') {
		return '';
	} else if (cardNo.length <= 4) {
		return '**** **** **** ' + cardNo
	} else {
		return '**** **** **** ' + cardNo.substring(cardNo.length - 4)
	}
}

function formatPrice(num) {
	if (Object.prototype.toString.call(num) == "[object Number]") {
		if (num.toString().indexOf(".") < 0) {
			return num + '.00'
		}

		num = num.toString()
		while (num.length - num.indexOf(".") < 3) {
			num += '0'
		}
		return num.substring(0, num.indexOf(".") + 3)
	} else if (Object.prototype.toString.call(num) == "[object String]") {
		if (num.indexOf(".") < 0) {
			return num + '.00'
		}

		while (num.length - num.indexOf(".") < 3) {
			num += '0'
		}
		return num.substring(0, num.indexOf(".") + 3)
	} else {
		return num;
	}
}



// 补0，如1 -> 01
function padZero(num, targetLength = 2) {
	let str = `${num}`
	while (str.length < targetLength) {
		str = `0${str}`
	}
	return str
}
const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

function parseTimeData(time) {
	const days = Math.floor(time / DAY)
	const hours = Math.floor((time % DAY) / HOUR)
	const minutes = Math.floor((time % HOUR) / MINUTE)
	const seconds = Math.floor((time % MINUTE) / SECOND)
	const milliseconds = Math.floor(time % SECOND)
	return {
		days,
		hours,
		minutes,
		seconds,
		milliseconds
	}
}

function parseFormat(format, timeData) {
	let {
		days,
		hours,
		minutes,
		seconds,
		milliseconds
	} = timeData
	// 如果格式化字符串中不存在DD(天)，则将天的时间转为小时中去
	if (format.indexOf('DD') === -1) {
		hours += days * 24
	} else {
		// 对天补0
		format = format.replace('DD', padZero(days))
	}
	// 其他同理于DD的格式化处理方式
	if (format.indexOf('HH') === -1) {
		minutes += hours * 60
	} else {
		format = format.replace('HH', padZero(hours))
	}
	if (format.indexOf('mm') === -1) {
		seconds += minutes * 60
	} else {
		format = format.replace('mm', padZero(minutes))
	}
	if (format.indexOf('ss') === -1) {
		milliseconds += seconds * 1000
	} else {
		format = format.replace('ss', padZero(seconds))
	}
	return format.replace('SSS', padZero(milliseconds, 3))
}

function formatData(timestamp) {
	console.log('formatData---->'+timestamp);
	if (timestamp) {
		let date = new Date(timestamp)
		var year = date.getFullYear()
		    var month = date.getMonth() + 1
		    var day = date.getDate()
		
		    var hour = date.getHours()
		    var minu = date.getMinutes()
		    var sec = date.getSeconds()
		
		    month = month >= 10 ? month : '0' + month
		    day = day >= 10 ? day : '0' + day
		    // hour = hour >= 10 ? hour : '0' + hour
		    // minu = minu >= 10 ? minu : '0' + minu
		    // sec = sec >= 10 ? sec : '0' + sec
		    return `${year}-${month}-${day}`
	}
	return ''
}
export default {
	formatPhone,
	formatBankCardNo,
	formatPrice,
	parseTimeData,
	parseFormat,
	formatData
}