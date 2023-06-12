"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      channelData: []
    };
  },
  onLoad() {
    this.fetchChannel();
  },
  methods: {
    onItemClick(item) {
      if (item) {
        common_vendor.index.redirectTo({
          url: "/pages/staff/qr/qr?id=" + item.id + "&name=" + item.name
        });
      }
    },
    fetchChannel() {
      this.$staffApi.fetchChannel().then((res) => {
        this.$refs.paging.complete(res);
      }).catch((err) => {
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  (_easycom_uni_icons2 + _easycom_z_paging2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_z_paging = () => "../../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_z_paging)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.channelData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: "c00dc3e3-1-" + i0 + ",c00dc3e3-0",
        c: common_vendor.o(($event) => $options.onItemClick(item))
      };
    }),
    b: common_vendor.p({
      type: "right",
      size: "22"
    }),
    c: common_vendor.sr("paging", "c00dc3e3-0"),
    d: common_vendor.o($options.fetchChannel),
    e: common_vendor.o($options.fetchChannel),
    f: common_vendor.o(($event) => $data.channelData = $event),
    g: common_vendor.p({
      ["refresher-only"]: true,
      modelValue: $data.channelData
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c00dc3e3"], ["__file", "D:/uniapp/house/pages/staff/channel/channel.vue"]]);
wx.createPage(MiniProgramPage);
