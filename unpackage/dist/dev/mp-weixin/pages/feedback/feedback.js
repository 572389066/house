"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    onClickSubmit(e) {
      let content = e.detail.value.content;
      let phone = e.detail.value.phone;
      if (content.length === 0) {
        this.$msg("请详细描述你的问题");
        return;
      }
      this.submitFeedback(content, phone);
    },
    submitFeedback(content, phone) {
      this.$api.submitFeedback(content, phone).then((res) => {
        this.$msg("提交成功");
        common_vendor.index.navigateBack();
      }).catch((err) => {
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.onClickSubmit && $options.onClickSubmit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a24b82f2"], ["__file", "D:/uniapp/house/pages/feedback/feedback.vue"]]);
wx.createPage(MiniProgramPage);
