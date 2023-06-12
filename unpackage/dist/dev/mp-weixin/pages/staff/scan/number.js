"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    onClickSubmit(e) {
      let value = e.detail.value.value;
      if (value === "") {
        this.$msg("请填用户的领奖编码");
        return;
      }
      if (value.length < 6) {
        this.$msg("请输入正确的领奖编码");
        return;
      }
      common_vendor.index.showModal({
        title: "提示",
        content: "是否确认提交领奖码?",
        success: (res) => {
          if (res.confirm) {
            this.submitCode(value);
          } else if (res.cancel)
            ;
        }
      });
    },
    submitCode(value) {
      this.$staffApi.submitVerifyNumber(value).then((res) => {
        this.$msg("提交成功");
        common_vendor.index.navigateBack();
      }).catch((err) => {
        console.log("submitCode err: " + JSON.stringify(err));
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.onClickSubmit && $options.onClickSubmit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ff4066e5"], ["__file", "D:/uniapp/house/pages/staff/scan/number.vue"]]);
wx.createPage(MiniProgramPage);
