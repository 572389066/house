"use strict";
const common_vendor = require("../common/vendor.js");
const utils_cache = require("./cache.js");
const HOST_IMG = "https://zykjstore.oss-cn-chengdu.aliyuncs.com";
let baseURL = "";
{
  baseURL = "https://houseapi.cqsoftware.cn";
}
function post(url, params) {
  let token = utils_cache.cache.getToken();
  let header = {
    "content-type": "application/x-www-form-urlencoded"
  };
  if (token && token.length > 0) {
    header["uid"] = token;
  }
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseURL + url,
      data: params,
      header,
      method: "POST",
      success: (response) => {
        let res = response.data;
        if (res.code === 1) {
          resolve(res.return);
        } else {
          reject(res);
          showError(res);
        }
      },
      fail: (error) => {
        if (error && error.response) {
          reject(error.response);
          showError(error.response);
        }
      }
    });
  });
}
function postWithoutToken(url, params) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseURL + url,
      data: params,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: (response) => {
        let res = response.data;
        if (res.code === 1) {
          resolve(res.return);
        } else {
          reject(res);
          showError(res);
        }
      },
      fail: (error) => {
        if (error && error.response) {
          reject(error);
          showError(error.response);
        }
      }
    });
  });
}
function get(url, params = {}) {
  let token = utils_cache.cache.getToken();
  let header = {
    "Accept": "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  };
  if (token && token.length > 0) {
    header["uid"] = token;
  }
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseURL + url,
      data: params,
      header,
      method: "GET",
      success: (response) => {
        let res = response.data;
        if (res.code == 1) {
          resolve(res.return);
        } else {
          reject(res);
          showError(res);
        }
      },
      fail: (error) => {
        console.log("get request fail: " + JSON.stringify(error));
        if (error && error.response) {
          reject(error.response);
          showError(error.response);
        }
      }
    });
  });
}
function upload(url, filePath) {
  return new Promise((resolve, reject) => {
    common_vendor.index.uploadFile({
      url: baseURL + url,
      filePath,
      name: "file",
      formData: {},
      success: (response) => {
        let res = JSON.parse(response.data);
        if (res.code === 1) {
          resolve(res.return);
        } else {
          reject(res);
          showError(res);
        }
      },
      fail: (error) => {
        if (error && error.response) {
          reject(error);
          showError(error.response);
        }
      }
    });
  });
}
const showError = (error) => {
  let errorMsg = "";
  if (error.msg && error.msg != "") {
    errorMsg = error.msg;
  } else {
    switch (error.code) {
      case 300:
        errorMsg = "未授权，请登录";
        break;
      case 400:
        errorMsg = "请求参数错误";
        break;
      case 403:
        errorMsg = "跨域拒绝访问";
        break;
      case 404:
        errorMsg = "请求地址不存在";
        break;
      case 500:
        errorMsg = "服务器内部错误";
        break;
      case 504:
        errorMsg = "请求超时";
        break;
      default:
        errorMsg = "请求失败";
        break;
    }
  }
  common_vendor.index.showToast({
    title: errorMsg,
    icon: "none",
    duration: 3e3,
    complete: function() {
      setTimeout(function() {
        common_vendor.index.hideToast();
      }, 3e3);
    }
  });
  if (error.code == 300) {
    setTimeout(function() {
      onTokenInvalid();
    }, 500);
  }
};
function onTokenInvalid() {
  utils_cache.cache.saveToken("");
  common_vendor.index.navigateTo({
    url: "/pages/login/login"
  });
}
exports.HOST_IMG = HOST_IMG;
exports.get = get;
exports.post = post;
exports.postWithoutToken = postWithoutToken;
exports.upload = upload;
