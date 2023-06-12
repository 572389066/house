"use strict";
const utils_urlUtil = require("../../utils/urlUtil.js");
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
require("../../utils/cache.js");
const _sfc_main = {
  data() {
    return {
      recordDetail: {},
      uploadResult: []
    };
  },
  onLoad(options) {
    let detail = options.detail;
    if (detail && detail != "") {
      this.recordDetail = JSON.parse(detail);
    }
    if (this.recordDetail && this.recordDetail.pictures) {
      this.uploadResult = this.recordDetail.pictures;
    }
  },
  methods: {
    getImageUrl(url) {
      return utils_urlUtil.urlUtil.getImgUrl(url);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "person",
      size: "34rpx",
      color: "#626162"
    }),
    b: common_vendor.t($data.recordDetail.user_name),
    c: common_vendor.t($data.recordDetail.user_phone),
    d: common_vendor.p({
      type: "location",
      size: "34rpx",
      color: "#626162"
    }),
    e: common_vendor.t($data.recordDetail.user_company),
    f: common_vendor.t($data.recordDetail.user_company_address),
    g: common_vendor.n(_ctx.type != 1 ? "active" : ""),
    h: common_vendor.t($data.recordDetail.build_name),
    i: $data.uploadResult && $data.uploadResult.length > 0
  }, $data.uploadResult && $data.uploadResult.length > 0 ? {
    j: common_vendor.f($data.uploadResult, (item, index, i0) => {
      return {
        a: $options.getImageUrl(item)
      };
    })
  } : {}, {
    k: common_vendor.t($data.recordDetail.date)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8a469bc9"], ["__file", "D:/uniapp/house/pages/register/detail.vue"]]);
wx.createPage(MiniProgramPage);
