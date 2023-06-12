"use strict";
const api_staff_request = require("./request.js");
function uploadFile(filePath) {
  return api_staff_request.upload("/index/file/uploadfile", filePath);
}
function fetchBuildingList(page, pageSize, name = "", province = "", isRecommend = "") {
  let recommend = "";
  if (isRecommend) {
    recommend = "Recommend";
  }
  return api_staff_request.get("/web/building/index", {
    page,
    limit: pageSize,
    name,
    province,
    type: recommend
  });
}
function fetchChannel() {
  return api_staff_request.get("/web/channel/list", {});
}
function fetchCheckCode(buildingId, channelId) {
  return api_staff_request.get("/web/building/getCheckCode", {
    building_id: buildingId,
    channel_id: channelId
  });
}
function submitVerifyNumber(code) {
  return api_staff_request.post("/web/promotion/verifyNumber", {
    code
  });
}
function submitVerifyCode(codeId) {
  return api_staff_request.post("/web/promotion/verifyCode", {
    id: codeId
  });
}
function fetchScanRecord(scene) {
  return api_staff_request.get("/web/building/getScanLog", {
    scene
  });
}
function submitLogin(userName, password, code) {
  return api_staff_request.post("/web/staff/login2", {
    username: userName,
    password,
    code
  });
}
function submitCustomerCheck(buildingId, channelId, phone, note) {
  return api_staff_request.post("/web/staff/check", {
    building_id: buildingId,
    channel_id: channelId,
    phone,
    description: note
  });
}
function fetchCustomerList(page, pageSize, buildingId = "", customerName = "", date = "", channel = "", type = "") {
  return api_staff_request.get("/web/staff/myCustomers", {
    page,
    limit: pageSize,
    building_id: buildingId,
    user_name: customerName,
    date,
    channel_id: channel,
    type
  });
}
function fetchStaff() {
  return api_staff_request.get("/web/staff/getAllUser", {});
}
function submitTransfer(id, staffId) {
  return api_staff_request.post("/web/staff/updcrmstaff", {
    id,
    staff_id: staffId
  });
}
const staffApi = {
  uploadFile,
  fetchBuildingList,
  fetchChannel,
  fetchCheckCode,
  submitVerifyNumber,
  submitVerifyCode,
  fetchScanRecord,
  submitLogin,
  submitCustomerCheck,
  fetchCustomerList,
  fetchStaff,
  submitTransfer
};
exports.staffApi = staffApi;
