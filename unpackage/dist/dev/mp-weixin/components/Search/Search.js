"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  name: "Search",
  data() {
    return {
      wx: {}
    };
  },
  created() {
    this.wx = common_vendor.wx$1.getMenuButtonBoundingClientRect();
  },
  methods: {
    onClickMap() {
      this.$msg("暂未开放，敬请期待");
    },
    onClickCity() {
      this.$msg("暂未开放，敬请期待");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.onClickCity()),
    b: common_assets._imports_0$2,
    c: common_assets._imports_1$1,
    d: common_vendor.o((...args) => $options.onClickMap && $options.onClickMap(...args)),
    e: `${$data.wx.height + $data.wx.top}px`
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-18b56a49"], ["__file", "D:/uniapp/house/components/Search/Search.vue"]]);
wx.createComponent(Component);
