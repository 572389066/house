"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_urlUtil = require("../../../utils/urlUtil.js");
require("../../../utils/request.js");
require("../../../utils/cache.js");
const _sfc_main = {
  data() {
    return {
      recordData: [],
      buildingData: [],
      channelData: [],
      currentBuilding: null,
      roleTypeData: [{
        id: "Customer",
        name: "客户"
      }, {
        id: "Sales",
        name: "中介"
      }],
      roleType: null,
      channel: null,
      roleTypeTmp: null,
      channelTmp: null,
      filterDate: "",
      filterDateTmp: "",
      nowTime: 0,
      searchKey: ""
    };
  },
  onLoad() {
    this.nowTime = Date.now();
    this.fetchChannel();
  },
  onShow() {
    this.$refs.paging.reload();
  },
  methods: {
    getImageUrl(url) {
      return utils_urlUtil.urlUtil.getImgUrlNotSize(url);
    },
    previewImage(item) {
      let imageArr = this.getPictures(item);
      if (imageArr.length == 0) {
        return;
      }
      common_vendor.index.previewImage({
        urls: imageArr,
        success: (res) => {
        }
      });
    },
    onClickSearch(e) {
      this.searchKey = e.value;
      this.$refs.paging.reload();
    },
    onSearchInput(e) {
      this.searchKey = e;
      this.$refs.paging.reload();
    },
    onSearchClear(e) {
      this.searchKey = "";
      this.$refs.paging.reload();
    },
    getDisplayRole(record) {
      if (record && record.type) {
        if (record.type == "Customer") {
          return "客户";
        } else if (record.type == "Sales") {
          return "中介";
        }
      }
      return "--";
    },
    onDateChange(e) {
      this.filterDateTmp = e;
      this.$refs.paging.reload();
    },
    showBuildingPicker() {
      this.$refs.buildingPicker.open();
    },
    closeBuildingPicker() {
      this.$refs.buildingPicker.close();
    },
    bindCurrentBuilding(building) {
      this.currentBuilding = building;
      this.closeBuildingPicker();
      this.$refs.paging.reload();
    },
    showFilterPicker() {
      this.roleTypeTmp = this.roleType;
      this.channelTmp = this.channel;
      this.filterDateTmp = this.filterDate;
      this.$refs.filterPicker.open();
    },
    closeFilterPicker() {
      this.$refs.filterPicker.close();
    },
    isSelectRoleType(roleType) {
      return this.roleTypeTmp && roleType && this.roleTypeTmp.id == roleType.id;
    },
    isSelectChannel(channel) {
      return this.channelTmp && channel && this.channelTmp.id == channel.id;
    },
    onRoleTypeSelected(roleType) {
      if (this.roleTypeTmp && roleType && roleType.id == this.roleTypeTmp.id) {
        this.roleTypeTmp = null;
      } else {
        this.roleTypeTmp = roleType;
      }
    },
    onChannelSelected(channel) {
      if (this.channelTmp && channel && this.channelTmp.id == channel.id) {
        this.channelTmp = null;
      } else {
        this.channelTmp = channel;
      }
    },
    onFilterResetClick() {
      this.roleTypeTmp = null;
      this.channelTmp = null;
      this.filterDateTmp = "";
    },
    onFilterConfirmClick() {
      this.roleType = this.roleTypeTmp;
      this.channel = this.channelTmp;
      this.filterDate = this.filterDateTmp;
      this.closeFilterPicker();
      this.$refs.paging.reload();
    },
    fetchBuilding(page, pageSize) {
      this.$staffApi.fetchBuildingList(page, pageSize, "", "", "").then((res) => {
        res.unshift({
          id: "",
          name: "全部楼盘"
        });
        this.$refs.buildingPaging.complete(res);
      }).catch((err) => {
        this.$refs.buildingPaging.complete(false);
      });
    },
    fetchChannel() {
      this.$staffApi.fetchChannel().then((res) => {
        this.channelData = res;
      }).catch((err) => {
      });
    },
    fetchRecord(page, pageSize) {
      let buildingName = this.currentBuilding ? this.currentBuilding.id : "";
      let customerName = this.searchKey;
      let date = this.filterDate;
      let channel = this.channel ? this.channel.id : "";
      let type = this.roleType ? this.roleType.id : "";
      this.$staffApi.fetchCustomerList(page, pageSize, buildingName, customerName, date, channel, type).then(
        (res) => {
          this.$refs.paging.complete(res);
        }
      ).catch((err) => {
        this.$refs.paging.complete(false);
      });
    },
    onItemClick(item) {
      if (item && item.type == "Customer") {
        common_vendor.index.navigateTo({
          url: "/pages/staff/qr/transfer?record=" + encodeURIComponent(JSON.stringify(item))
        });
      }
    },
    getPictures(item) {
      let img = [];
      if (item && item.pictures && item.pictures.length > 0) {
        for (var i = 0; i < item.pictures.length; i++) {
          let url = item.pictures[i];
          if (url && url != "") {
            img.push(this.getImageUrl(url));
          }
        }
      }
      return img;
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  (_easycom_uni_search_bar2 + _easycom_z_paging2 + _easycom_uni_icons2 + _easycom_uni_popup2 + _easycom_uni_datetime_picker2)();
}
const _easycom_uni_search_bar = () => "../../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_z_paging = () => "../../../uni_modules/z-paging/components/z-paging/z-paging.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_datetime_picker = () => "../../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_z_paging + _easycom_uni_icons + _easycom_uni_popup + _easycom_uni_datetime_picker)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.onClickSearch),
    b: common_vendor.o($options.onSearchInput),
    c: common_vendor.o($options.onSearchClear),
    d: common_vendor.o($options.onSearchClear),
    e: common_vendor.p({
      placeholder: "请输入登记名称/电话",
      ["bg-color"]: "#ffffff"
    }),
    f: common_vendor.t($data.currentBuilding ? $data.currentBuilding.name : "全部楼盘"),
    g: common_vendor.o(($event) => $options.showBuildingPicker()),
    h: common_vendor.o(($event) => $options.showFilterPicker()),
    i: common_vendor.f($data.recordData, (item, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.build_name),
        b: $options.getPictures(item).length > 0
      }, $options.getPictures(item).length > 0 ? {} : {}, {
        c: common_vendor.o(($event) => $options.previewImage(item)),
        d: common_vendor.t(item.create_time ? item.create_time : "--"),
        e: common_vendor.t(item.staff_username ? item.staff_username : "--"),
        f: common_vendor.t(item.user_phone ? item.user_phone : "--"),
        g: common_vendor.t($options.getDisplayRole(item)),
        h: common_vendor.t(item.channel ? item.channel : "--"),
        i: common_vendor.t(item.related_phone ? item.related_phone : "--"),
        j: common_vendor.t(item.description ? item.description : "--"),
        k: common_vendor.o(($event) => $options.onItemClick(item))
      });
    }),
    j: common_vendor.sr("paging", "214c8ed3-0"),
    k: common_vendor.o($options.fetchRecord),
    l: common_vendor.o(($event) => $data.recordData = $event),
    m: common_vendor.p({
      ["default-page-size"]: "20",
      auto: false,
      modelValue: $data.recordData
    }),
    n: common_vendor.p({
      type: "closeempty",
      size: "20",
      color: "#999999"
    }),
    o: common_vendor.o((...args) => $options.closeBuildingPicker && $options.closeBuildingPicker(...args)),
    p: common_vendor.f($data.buildingData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.o(($event) => $options.bindCurrentBuilding(item))
      };
    }),
    q: common_vendor.sr("buildingPaging", "214c8ed3-3,214c8ed3-2"),
    r: common_vendor.o($options.fetchBuilding),
    s: common_vendor.o(($event) => $data.buildingData = $event),
    t: common_vendor.p({
      fixed: false,
      modelValue: $data.buildingData
    }),
    v: common_vendor.sr("buildingPicker", "214c8ed3-2"),
    w: common_vendor.p({
      type: "bottom"
    }),
    x: common_vendor.p({
      type: "closeempty",
      size: "20",
      color: "#999999"
    }),
    y: common_vendor.o((...args) => $options.closeFilterPicker && $options.closeFilterPicker(...args)),
    z: common_vendor.f($data.roleTypeData, (item, k0, i0) => {
      return common_vendor.e({
        a: $data.roleTypeTmp && item && $data.roleTypeTmp.id == item.id
      }, $data.roleTypeTmp && item && $data.roleTypeTmp.id == item.id ? {
        b: common_vendor.t(item.name),
        c: common_vendor.o(($event) => $options.onRoleTypeSelected(item))
      } : {
        d: common_vendor.t(item.name),
        e: common_vendor.o(($event) => $options.onRoleTypeSelected(item))
      });
    }),
    A: common_vendor.f($data.channelData, (item, index, i0) => {
      return common_vendor.e({
        a: $data.channelTmp && item && $data.channelTmp.id == item.id
      }, $data.channelTmp && item && $data.channelTmp.id == item.id ? {
        b: common_vendor.t(item.name),
        c: common_vendor.o(($event) => $options.onChannelSelected(item))
      } : {
        d: common_vendor.t(item.name),
        e: common_vendor.o(($event) => $options.onChannelSelected(item))
      });
    }),
    B: $data.filterDateTmp && $data.filterDateTmp != ""
  }, $data.filterDateTmp && $data.filterDateTmp != "" ? {
    C: common_vendor.t($data.filterDateTmp == "" ? "全部" : $data.filterDateTmp)
  } : {}, {
    D: common_vendor.o($options.onDateChange),
    E: common_vendor.o(($event) => _ctx.single = $event),
    F: common_vendor.p({
      type: "date",
      end: $data.nowTime,
      modelValue: _ctx.single
    }),
    G: common_vendor.o(($event) => $options.onFilterResetClick()),
    H: common_vendor.o(($event) => $options.onFilterConfirmClick()),
    I: common_vendor.sr("filterPicker", "214c8ed3-5"),
    J: common_vendor.p({
      type: "bottom"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/house/pages/staff/qr/record.vue"]]);
wx.createPage(MiniProgramPage);
