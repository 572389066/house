"use strict";
const common_vendor = require("../common/vendor.js");
function copyContent(content) {
  common_vendor.index.setClipboardData({
    data: content + "",
    showToast: false,
    success: function() {
      console.log("success");
    },
    fail: () => {
      console.log("fail");
    }
  });
}
exports.copyContent = copyContent;
