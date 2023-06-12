"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      type: "",
      address: "",
      numberCode: "",
      qrCode: ""
    };
  },
  onLoad(option) {
    if (option.result) {
      let result = JSON.parse(decodeURIComponent(option.result));
      this.type = result.code_type;
      this.address = result.address;
      this.numberCode = result.code;
      this.qrCode = result.qrcode;
    }
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uqrcode2 = common_vendor.resolveComponent("uqrcode");
  (_easycom_uni_icons2 + _easycom_uqrcode2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uqrcode = () => "../../uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uqrcode)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "checkmarkempty",
      size: "30rpx",
      color: "#fff"
    }),
    b: common_vendor.t($data.address),
    c: $data.type == "Qrcode"
  }, $data.type == "Qrcode" ? {
    d: common_vendor.sr("uqrcode", "bac3464c-1"),
    e: common_vendor.p({
      ["canvas-id"]: "qrcode",
      value: $data.qrCode,
      options: {
        margin: 10
      },
      sizeUnit: "rpx",
      size: "244"
    })
  } : $data.type == "Number" ? {
    g: common_vendor.t($data.numberCode)
  } : {}, {
    f: $data.type == "Number"
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bac3464c"], ["__file", "D:/uniapp/house/pages/award/result.vue"]]);
wx.createPage(MiniProgramPage);
