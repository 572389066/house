"use strict";const s=require("../common/vendor.js");function n(o){s.index.setClipboardData({data:o+"",showToast:!1,success:function(){console.log("success")},fail:()=>{console.log("fail")}})}exports.copyContent=n;