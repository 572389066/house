"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      recordData: []
    };
  },
  methods: {
    fetchCheckRecord(page, pageSize) {
      this.$api.fetchCheckRecord(page, pageSize).then((res) => {
        this.$refs.paging.complete(res);
      }).catch((err) => {
        this.$refs.paging.complete(false);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  (_easycom_uni_icons2 + _easycom_z_paging2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_z_paging)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.recordData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.build_name),
        b: common_vendor.t(item.date),
        c: "2821095d-1-" + i0 + ",2821095d-0",
        d: "/pages/register/detail?detail=" + JSON.stringify(item)
      };
    }),
    b: common_vendor.p({
      type: "right",
      size: "30rpx",
      color: "rgba(51, 49, 52, .6)"
    }),
    c: common_vendor.sr("paging", "2821095d-0"),
    d: common_vendor.o($options.fetchCheckRecord),
    e: common_vendor.o(($event) => $data.recordData = $event),
    f: common_vendor.p({
      ["default-page-size"]: "30",
      modelValue: $data.recordData
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2821095d"], ["__file", "D:/uniapp/house/pages/register/record.vue"]]);
wx.createPage(MiniProgramPage);
