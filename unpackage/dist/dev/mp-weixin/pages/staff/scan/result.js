"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      result: 1,
      codeId: ""
    };
  },
  onLoad(option) {
    if (option.id) {
      this.codeId = option.id;
      this.submitCode();
    } else {
      this.result = 2;
    }
  },
  methods: {
    submitCode() {
      this.$staffApi.submitVerifyCode(this.codeId).then((res) => {
        this.result = 1;
        console.log("submitCode success: " + JSON.stringify(res));
      }).catch((err) => {
        this.result = 2;
        console.log("submitCode err: " + JSON.stringify(err));
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.result == 1
  }, $data.result == 1 ? {} : $data.result == 2 ? {} : {}, {
    b: $data.result == 2,
    c: $data.result == 1
  }, $data.result == 1 ? {} : {}, {
    d: $data.result == 2
  }, $data.result == 2 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-23f71271"], ["__file", "D:/uniapp/house/pages/staff/scan/result.vue"]]);
wx.createPage(MiniProgramPage);
