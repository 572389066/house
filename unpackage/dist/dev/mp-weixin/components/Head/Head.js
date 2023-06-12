"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "head",
  props: ["title"],
  data() {
    return {
      wx: {}
    };
  },
  created() {
    this.wx = common_vendor.wx$1.getMenuButtonBoundingClientRect();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.title),
    b: `${$data.wx.height}px`,
    c: `${$data.wx.top}px`
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ee5b923e"], ["__file", "D:/uniapp/house/components/Head/Head.vue"]]);
wx.createComponent(Component);
