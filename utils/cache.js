function saveToken(token) {
	uni.setStorage({
		key: 'token',
		data: token,
	});
}

function getToken() {
	try {
		return uni.getStorageSync('token');
	} catch (e) {
		return ''
	}
}

function saveStaffToken(token) {
	uni.setStorage({
		key: 'staffToken',
		data: token,
		success: () => {

		},
		fail: (err) => {

		}
	});
}

function getStaffToken() {
	try {
		let token = uni.getStorageSync('staffToken');
		return token
	} catch (e) {
		return ''
	}
}

// function savePhone(phone) {
// 	uni.setStorage({
// 		key: 'phone',
// 		data: phone,
// 	});
// }

// function getPhone() {
// 	try {
// 		return uni.getStorageSync('phone');
// 	} catch (e) {
// 		return ''
// 	}
// }

function saveHistoryKeywords(keywords) {
	if (!keywords || keywords == '') {
		return
	}
	let historyKeywords = getHistoryKeywords()

	let arr = []
	arr.push(keywords)

	if (historyKeywords && historyKeywords.length > 0) {
		let index = historyKeywords.indexOf(keywords)
		if (index >= 0) {
			historyKeywords.splice(index, 1);
		}

		for (var i = 0; i < historyKeywords.length; i++) {
			if (i < 10) {
				let key = historyKeywords[i]
				if (key && key != '') {
					arr.push(key)
				}
			} else {
				break
			}
		}

	}

	uni.setStorage({
		key: 'historyKeywords',
		data: JSON.stringify(arr),
	});
}

function getHistoryKeywords() {
	let historyKeywords = []
	try {
		let json = uni.getStorageSync('historyKeywords');
		if (json && json != '') {
			historyKeywords = JSON.parse(json)
		}
	} catch (e) {
		return historyKeywords
	}
	return historyKeywords
}

function cleanHistoryKeywords() {
	uni.setStorage({
		key: 'historyKeywords',
		data: "[]",
	});
}

function saveCurrentBuilding(building) {
	if (building && building.id && building.id != '' && building.name && building.name != '') {
		uni.setStorage({
			key: 'current_building',
			data: JSON.stringify(building),
		});
	} else {
		uni.setStorage({
			key: 'current_building',
			data: '',
		});
	}

}

function getCurrentBuilding(building) {
	let currentBuilding = null
	try {
		let json = uni.getStorageSync('current_building');
		if (json && json != '') {
			currentBuilding = JSON.parse(json)
		}
	} catch (e) {
		return currentBuilding
	}
	return currentBuilding
}

function saveHistoryBuilding(building) {
	if (building && building.id && building.id != '' && building.name && building.name != '') {
		let historyBuilding = getHistoryBuilding()
		let arr = []

		if (historyBuilding && historyBuilding.length > 0) {
			for (var i = 0; i < historyBuilding.length; i++) {
				if (arr.length < 3) {
					let building_ = historyBuilding[i]
					if (building.id && building_ && building_.id != building.id) {
						arr.push(building_)
					}
				} else {
					break
				}
			}
		}
		arr.unshift(building)
		uni.setStorage({
			key: 'history_building',
			data: JSON.stringify(arr),
		});
	}

}

function getHistoryBuilding() {
	let historyBuilding = []
	try {
		let json = uni.getStorageSync('history_building');
		console.log("getHistoryBuilding: " + json);
		if (json && json != '') {
			historyBuilding = JSON.parse(json)
		}
	} catch (e) {
		return historyBuilding
	}
	return historyBuilding
}


export default {
	saveToken,
	getToken,
	saveStaffToken,
	getStaffToken,
	// savePhone,
	// getPhone,
	saveHistoryKeywords,
	getHistoryKeywords,
	cleanHistoryKeywords,

	saveCurrentBuilding,
	getCurrentBuilding,
	getHistoryBuilding,
	saveHistoryBuilding
}