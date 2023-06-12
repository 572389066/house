"use strict";
const utils_request = require("./request.js");
function getImgUrl(src) {
  if (src == "" || src === void 0 || src === null || src.length === 0) {
    return "";
  } else if (src.indexOf("https://") != -1 || src.indexOf("http://") != -1) {
    return appendImageSize(src + "");
  } else if (!src.startsWith("/")) {
    return appendImageSize(utils_request.HOST_IMG + "/" + src);
  } else {
    return appendImageSize(utils_request.HOST_IMG + src);
  }
}
function getImgUrlNotSize(src) {
  if (src == "" || src === void 0 || src === null) {
    return "";
  } else if (src.indexOf("https://") != -1 || src.indexOf("http://") != -1) {
    return src + "";
  } else if (!src.startsWith("/")) {
    return utils_request.HOST_IMG + "/" + src;
  } else {
    return utils_request.HOST_IMG + src;
  }
}
function appendImageSize(imgUrl) {
  if (imgUrl != null) {
    var index = imgUrl.indexOf("?");
    if (index >= 0) {
      return imgUrl + "&x-oss-process=image/resize,h_500,w_500";
    } else {
      return imgUrl + "?x-oss-process=image/resize,h_500,w_500";
    }
  }
  return imgUrl;
}
function isVideo(url) {
  if (url) {
    var index = url.indexOf(".");
    if (index >= 0) {
      let fileValueSuffix = url.substring(url.lastIndexOf("."));
      if (fileValueSuffix === ".mp4" || fileValueSuffix === ".m4v" || fileValueSuffix === ".3gp" || //rm、 rmvb
      fileValueSuffix === ".rmvb" || fileValueSuffix === ".rm" || //mpg、mpeg、mpe
      fileValueSuffix === ".mpg" || fileValueSuffix === ".mpeg" || fileValueSuffix === ".mpe" || //avi、dat、mkv、flv、vob
      fileValueSuffix === ".avi" || fileValueSuffix === ".dat" || fileValueSuffix === ".mkv" || fileValueSuffix === ".flv" || fileValueSuffix === ".vob" || //wmv、asf、asx
      fileValueSuffix === ".wmv" || fileValueSuffix === ".asf" || fileValueSuffix === ".asx") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function getFullUrl(url) {
  if (url == "" || url === void 0 || url === null) {
    return "";
  } else if (url.indexOf("https://") != -1 || url.indexOf("http://") != -1) {
    return url + "";
  } else {
    return "http://" + url;
  }
}
const urlUtil = {
  getImgUrl,
  getImgUrlNotSize,
  isVideo,
  getFullUrl
};
exports.urlUtil = urlUtil;
