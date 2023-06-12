"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    submitCode(codeId) {
      this.$staffApi.submitVerifyCode(codeId).then((res) => {
        common_vendor.index.navigateBack();
      }).catch((err) => {
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/house/pages/staff/scan/scan.vue"]]);
wx.createPage(MiniProgramPage);
