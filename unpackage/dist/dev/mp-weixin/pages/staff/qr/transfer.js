"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      recordData: null,
      staffData: [],
      staff: null
    };
  },
  onLoad(option) {
    if (option && option.record) {
      this.recordData = JSON.parse(decodeURIComponent(option.record));
    }
  },
  methods: {
    showStaffPicker() {
      this.$refs.staffPicker.open();
    },
    closeStaffPicker() {
      this.$refs.staffPicker.close();
    },
    bindStaff(item) {
      this.staff = item;
      this.closeStaffPicker();
    },
    onClickSubmit() {
      if (!this.recordData || !this.recordData.id) {
        this.$msg("获取客服信息出错");
        return;
      }
      if (!this.staff || !this.staff.id) {
        this.$msg("选择员工");
        return;
      }
      common_vendor.index.showModal({
        title: "提示",
        content: "是否将当前客户转让给" + this.staff.username + "?",
        success: (res) => {
          if (res.confirm) {
            this.submitTransfer();
          } else if (res.cancel)
            ;
        }
      });
    },
    submitTransfer() {
      this.$staffApi.submitTransfer(this.recordData.id, this.staff.id).then((res) => {
        this.$msg("转让成功");
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1e3);
      }).catch((err) => {
      });
    },
    fetchStaff(page, pageSize) {
      this.$staffApi.fetchStaff().then((res) => {
        this.$refs.staffPaging.complete(res);
      }).catch((err) => {
        this.$refs.staffPaging.complete(false);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_z_paging2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_z_paging = () => "../../../uni_modules/z-paging/components/z-paging/z-paging.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_z_paging + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.recordData ? $data.recordData.user_phone : "--"),
    b: common_vendor.t($data.staff ? $data.staff.username : ""),
    c: common_vendor.p({
      type: "right",
      color: "#333134",
      size: "28rpx"
    }),
    d: common_vendor.o(($event) => $options.showStaffPicker()),
    e: common_vendor.o(($event) => $options.onClickSubmit()),
    f: common_vendor.p({
      type: "closeempty",
      size: "20",
      color: "#999999"
    }),
    g: common_vendor.o((...args) => $options.closeStaffPicker && $options.closeStaffPicker(...args)),
    h: common_vendor.f($data.staffData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.username),
        b: common_vendor.o(($event) => $options.bindStaff(item))
      };
    }),
    i: common_vendor.sr("staffPaging", "51bd0aed-2,51bd0aed-1"),
    j: common_vendor.o($options.fetchStaff),
    k: common_vendor.o(($event) => $data.staffData = $event),
    l: common_vendor.p({
      fixed: false,
      ["loading-more-enabled"]: false,
      modelValue: $data.staffData
    }),
    m: common_vendor.sr("staffPicker", "51bd0aed-1"),
    n: common_vendor.p({
      type: "bottom"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/house/pages/staff/qr/transfer.vue"]]);
wx.createPage(MiniProgramPage);
