"use strict";
const utils_request = require("../utils/request.js");
function getBanner() {
  return utils_request.get("/web/index/banner");
}
function fetchBuildingList(page, pageSize, name, province, isRecommend) {
  let recommend = "";
  if (isRecommend) {
    recommend = "Recommend";
  }
  return utils_request.get("/web/building/index", {
    page,
    limit: pageSize,
    name,
    province,
    type: recommend
  });
}
function fetchBuildingDetail(id) {
  return utils_request.get("/web/building/detail", {
    id
  });
}
function fetchPromotionList(page, pageSize) {
  return utils_request.get("/web/promotion/index", {
    page,
    limit: pageSize
  });
}
function fetchPromotionDetail(id) {
  return utils_request.get("/web/promotion/detail", {
    id
  });
}
function fetchPromotionRecord(page, pageSize) {
  return utils_request.get("/web/promotion/log", {
    page,
    limit: pageSize
  });
}
function submitPromotion(id, url) {
  return utils_request.post("/web/promotion/prof", {
    promotion_id: id,
    picture: url
  });
}
function fetchActivityList(page, pageSize) {
  return utils_request.get("/web/activity/index", {
    page,
    limit: pageSize
  });
}
function submitLogin(loginCode, phoneCode) {
  return utils_request.postWithoutToken("/web/user/login2", {
    code: loginCode,
    phonecode: phoneCode
  });
}
function uploadFile(filePath) {
  return utils_request.upload("/index/file/uploadfile", filePath);
}
function submitUserCard(name, phone, company, address) {
  return utils_request.post("/web/user/cardModify", {
    name,
    phone,
    company,
    address
  });
}
function fetchUserCard() {
  return utils_request.post("/web/user/getCard", {});
}
function fetchUserCompany() {
  return utils_request.get("/web/user/company", {});
}
function submitFeedback(content, phone) {
  return utils_request.post("/web/user/feedBack", {
    content,
    contact: phone
  });
}
function submitSalesCheck(scene, picture) {
  return utils_request.post("/web/building/salesCheck", {
    scene,
    picture
  });
}
function submitCustomCheck(scene) {
  return utils_request.post("/web/building/CustomerCheck", {
    scene,
    debug: 1
  });
}
function fetchCheckRecord(page, pageSize) {
  return utils_request.get("/web/building/log", {
    page,
    limit: pageSize
  });
}
function fetchUserInfo() {
  return utils_request.get("/web/user/getUserInfo", {});
}
function fetchChannel() {
  return utils_request.get("/web/channel/list", {});
}
function fetchCheckCode(buildingId, channelId) {
  return utils_request.get("/web/building/getCheckCode", {
    building_id: buildingId,
    channel_id: channelId
  });
}
function submitVerifyNumber(code) {
  return utils_request.post("/web/promotion/verifyNumber", {
    code
  });
}
function submitVerifyCode(codeId) {
  return utils_request.post("/web/promotion/verifyCode", {
    id: codeId
  });
}
function fetchScanRecord(scene) {
  return utils_request.get("/web/building/getScanLog", {
    scene
  });
}
function submitCustomerCheck(buildingId, channelId, phone, note) {
  return utils_request.post("/web/staff/check", {
    building_id: buildingId,
    channel_id: channelId,
    phone,
    description: note
  });
}
const api = {
  uploadFile,
  getBanner,
  fetchBuildingList,
  fetchBuildingDetail,
  fetchPromotionList,
  fetchPromotionDetail,
  fetchPromotionRecord,
  submitPromotion,
  fetchActivityList,
  submitLogin,
  submitUserCard,
  fetchUserCard,
  fetchUserCompany,
  submitFeedback,
  submitSalesCheck,
  submitCustomCheck,
  fetchCheckRecord,
  fetchUserInfo,
  // fetchBuildingList,
  fetchChannel,
  fetchCheckCode,
  submitVerifyNumber,
  submitVerifyCode,
  fetchScanRecord,
  // submitLogin,
  submitCustomerCheck
};
exports.api = api;
