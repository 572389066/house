"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      qrCodeValue: "",
      recordData: []
    };
  },
  methods: {
    showQRCodeUI(item) {
      if (item && item.code_status == "Enable" && item.code_type == "Qrcode") {
        this.qrCodeValue = item.qrcode;
        this.$refs.popup.open();
      }
    },
    saveQR() {
      this.$refs.uqrcode.save({
        success: () => {
          common_vendor.index.showToast({
            icon: "success",
            title: "保存成功"
          });
        }
      });
    },
    fetchPromotionRecord(page, pageSize) {
      this.$api.fetchPromotionRecord(page, pageSize).then((res) => {
        this.$refs.paging.complete(res);
      }).catch((err) => {
        this.$refs.paging.complete(false);
      });
    }
  }
};
if (!Array) {
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  const _easycom_uqrcode2 = common_vendor.resolveComponent("uqrcode");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_z_paging2 + _easycom_uqrcode2 + _easycom_uni_popup2)();
}
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
const _easycom_uqrcode = () => "../../uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_z_paging + _easycom_uqrcode + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.recordData, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.promotion_title),
        b: common_vendor.t(item.date),
        c: item.code_type === "Qrcode"
      }, item.code_type === "Qrcode" ? common_vendor.e({
        d: common_assets._imports_0$3,
        e: item.code_status === "Enable"
      }, item.code_status === "Enable" ? {} : {}) : item.code_type === "Number" ? common_vendor.e({
        g: common_vendor.t(item.code),
        h: item.code_status === "Enable"
      }, item.code_status === "Enable" ? {} : {}) : {}, {
        f: item.code_type === "Number",
        i: common_vendor.o(($event) => $options.showQRCodeUI(item))
      });
    }),
    b: common_vendor.sr("paging", "7df445e8-0"),
    c: common_vendor.o($options.fetchPromotionRecord),
    d: common_vendor.o(($event) => $data.recordData = $event),
    e: common_vendor.p({
      modelValue: $data.recordData
    }),
    f: common_vendor.sr("uqrcode", "7df445e8-2,7df445e8-1"),
    g: common_vendor.p({
      ["canvas-id"]: "qrcode",
      value: $data.qrCodeValue,
      options: {
        margin: 0
      },
      sizeUnit: "rpx",
      size: "300"
    }),
    h: common_vendor.o((...args) => $options.saveQR && $options.saveQR(...args)),
    i: common_vendor.sr("popup", "7df445e8-1"),
    j: common_vendor.p({
      type: "center"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7df445e8"], ["__file", "D:/uniapp/house/pages/award/record.vue"]]);
wx.createPage(MiniProgramPage);
