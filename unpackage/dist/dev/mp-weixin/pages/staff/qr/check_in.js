"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_cache = require("../../../utils/cache.js");
const _sfc_main = {
  data() {
    return {
      currentBuilding: null,
      showChannelPicker: false,
      channelData: [],
      selectedChannel: null,
      buildingData: [],
      customPhone: "",
      customNote: "",
      isSubmitting: false
    };
  },
  onLoad() {
    this.currentBuilding = utils_cache.cache.getCurrentBuilding();
  },
  methods: {
    onClickBuilding() {
      this.$refs.buildingPicker.open();
    },
    closeBuildingSelected() {
      this.$refs.buildingPicker.close();
    },
    onClickChennel() {
      this.$refs.channelPicker.open();
      this.fetchChannel();
    },
    closeChannelSelected() {
      this.$refs.channelPicker.close();
    },
    onChannelSelected(channel) {
      this.selectedChannel = channel;
      this.closeChannelSelected();
    },
    onClickSubmit(e) {
      let phone = e.detail.value.phone;
      let note = e.detail.value.note;
      if (!this.currentBuilding) {
        this.$msg("请选择楼盘");
        return;
      }
      if (!this.selectedChannel) {
        this.$msg("请选择渠道");
        return;
      }
      if (!phone || phone == "") {
        this.$msg("请输入客户电话");
        return;
      }
      if (phone.length != 11) {
        this.$msg("请输入正确的客户电话");
        return;
      }
      let that = this;
      common_vendor.index.showModal({
        title: "提示",
        content: "请确认登记信息，是否确认提交？",
        success: function(res) {
          if (res.confirm) {
            that.submitInfo(phone, note);
          } else if (res.cancel)
            ;
        }
      });
    },
    bindCurrentBuilding(building) {
      this.currentBuilding = building;
      this.closeBuildingSelected();
    },
    fetchChannel() {
      this.$staffApi.fetchChannel().then((res) => {
        this.$refs.pagingChannel.complete(res);
      }).catch((err) => {
      });
    },
    fetchBuilding(page, pageSize) {
      this.$staffApi.fetchBuildingList(page, pageSize).then((res) => {
        this.customPhone = "";
        this.$refs.paging.complete(res);
      }).catch((err) => {
      });
    },
    submitInfo(phone, note) {
      this.isSubmitting = true;
      this.$staffApi.submitCustomerCheck(this.currentBuilding.id, this.selectedChannel.id, phone, note).then((res) => {
        this.$msg("提交成功");
        this.customPhone = "";
        this.customNote = "";
        this.isSubmitting = false;
      }).catch((err) => {
        this.isSubmitting = false;
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
  return common_vendor.e({
    a: $data.currentBuilding
  }, $data.currentBuilding ? {
    b: $data.currentBuilding.name
  } : {}, {
    c: common_vendor.p({
      type: "right",
      size: "18",
      color: "#999999"
    }),
    d: common_vendor.o(($event) => $options.onClickBuilding()),
    e: $data.selectedChannel
  }, $data.selectedChannel ? {
    f: $data.selectedChannel.name
  } : {}, {
    g: common_vendor.p({
      type: "right",
      size: "18",
      color: "#999999"
    }),
    h: common_vendor.o(($event) => $options.onClickChennel()),
    i: $data.customPhone,
    j: common_vendor.o(($event) => $data.customPhone = $event.detail.value),
    k: $data.customNote,
    l: common_vendor.o(($event) => $data.customNote = $event.detail.value),
    m: $data.isSubmitting
  }, $data.isSubmitting ? {} : {}, {
    n: common_vendor.o((...args) => $options.onClickSubmit && $options.onClickSubmit(...args)),
    o: common_vendor.p({
      type: "closeempty",
      size: "20",
      color: "#999999"
    }),
    p: common_vendor.o((...args) => $options.closeChannelSelected && $options.closeChannelSelected(...args)),
    q: common_vendor.f($data.channelData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.o(($event) => $options.onChannelSelected(item))
      };
    }),
    r: common_vendor.sr("pagingChannel", "8b9f9631-3,8b9f9631-2"),
    s: common_vendor.o($options.fetchChannel),
    t: common_vendor.o($options.fetchChannel),
    v: common_vendor.o(($event) => $data.channelData = $event),
    w: common_vendor.p({
      fixed: false,
      ["refresher-only"]: true,
      modelValue: $data.channelData
    }),
    x: common_vendor.sr("channelPicker", "8b9f9631-2"),
    y: common_vendor.p({
      type: "bottom"
    }),
    z: common_vendor.p({
      type: "closeempty",
      size: "20",
      color: "#999999"
    }),
    A: common_vendor.o((...args) => $options.closeBuildingSelected && $options.closeBuildingSelected(...args)),
    B: common_vendor.f($data.buildingData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.o(($event) => $options.bindCurrentBuilding(item))
      };
    }),
    C: common_vendor.sr("paging", "8b9f9631-6,8b9f9631-5"),
    D: common_vendor.o($options.fetchBuilding),
    E: common_vendor.o(($event) => $data.buildingData = $event),
    F: common_vendor.p({
      fixed: false,
      modelValue: $data.buildingData
    }),
    G: common_vendor.sr("buildingPicker", "8b9f9631-5"),
    H: common_vendor.p({
      type: "bottom"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8b9f9631"], ["__file", "D:/uniapp/house/pages/staff/qr/check_in.vue"]]);
wx.createPage(MiniProgramPage);
