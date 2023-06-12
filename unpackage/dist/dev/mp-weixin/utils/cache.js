"use strict";
const common_vendor = require("../common/vendor.js");
function saveToken(token) {
  common_vendor.index.setStorage({
    key: "token",
    data: token
  });
}
function getToken() {
  try {
    return common_vendor.index.getStorageSync("token");
  } catch (e) {
    return "";
  }
}
function saveStaffToken(token) {
  common_vendor.index.setStorage({
    key: "staffToken",
    data: token,
    success: () => {
    },
    fail: (err) => {
    }
  });
}
function getStaffToken() {
  try {
    let token = common_vendor.index.getStorageSync("staffToken");
    return token;
  } catch (e) {
    return "";
  }
}
function saveHistoryKeywords(keywords) {
  if (!keywords || keywords == "") {
    return;
  }
  let historyKeywords = getHistoryKeywords();
  let arr = [];
  arr.push(keywords);
  if (historyKeywords && historyKeywords.length > 0) {
    let index = historyKeywords.indexOf(keywords);
    if (index >= 0) {
      historyKeywords.splice(index, 1);
    }
    for (var i = 0; i < historyKeywords.length; i++) {
      if (i < 10) {
        let key = historyKeywords[i];
        if (key && key != "") {
          arr.push(key);
        }
      } else {
        break;
      }
    }
  }
  common_vendor.index.setStorage({
    key: "historyKeywords",
    data: JSON.stringify(arr)
  });
}
function getHistoryKeywords() {
  let historyKeywords = [];
  try {
    let json = common_vendor.index.getStorageSync("historyKeywords");
    if (json && json != "") {
      historyKeywords = JSON.parse(json);
    }
  } catch (e) {
    return historyKeywords;
  }
  return historyKeywords;
}
function cleanHistoryKeywords() {
  common_vendor.index.setStorage({
    key: "historyKeywords",
    data: "[]"
  });
}
function saveCurrentBuilding(building) {
  if (building && building.id && building.id != "" && building.name && building.name != "") {
    common_vendor.index.setStorage({
      key: "current_building",
      data: JSON.stringify(building)
    });
  } else {
    common_vendor.index.setStorage({
      key: "current_building",
      data: ""
    });
  }
}
function getCurrentBuilding(building) {
  let currentBuilding = null;
  try {
    let json = common_vendor.index.getStorageSync("current_building");
    if (json && json != "") {
      currentBuilding = JSON.parse(json);
    }
  } catch (e) {
    return currentBuilding;
  }
  return currentBuilding;
}
function saveHistoryBuilding(building) {
  if (building && building.id && building.id != "" && building.name && building.name != "") {
    let historyBuilding = getHistoryBuilding();
    let arr = [];
    if (historyBuilding && historyBuilding.length > 0) {
      for (var i = 0; i < historyBuilding.length; i++) {
        if (arr.length < 3) {
          let building_ = historyBuilding[i];
          if (building.id && building_ && building_.id != building.id) {
            arr.push(building_);
          }
        } else {
          break;
        }
      }
    }
    arr.unshift(building);
    common_vendor.index.setStorage({
      key: "history_building",
      data: JSON.stringify(arr)
    });
  }
}
function getHistoryBuilding() {
  let historyBuilding = [];
  try {
    let json = common_vendor.index.getStorageSync("history_building");
    console.log("getHistoryBuilding: " + json);
    if (json && json != "") {
      historyBuilding = JSON.parse(json);
    }
  } catch (e) {
    return historyBuilding;
  }
  return historyBuilding;
}
const cache = {
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
};
exports.cache = cache;
