"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_cache = require("../../../utils/cache.js");
const _sfc_main = {
  data() {
    return {
      currentBuilding: null,
      historyBuilding: null,
      buildingData: []
    };
  },
  onLoad() {
    this.historyBuilding = utils_cache.cache.getHistoryBuilding();
  },
  methods: {
    onItemClick(item) {
      if (item) {
        this.currentBuilding = item;
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.emit("onDateResult", {
          data: item
        });
        utils_cache.cache.saveHistoryBuilding(item);
        common_vendor.index.navigateBack();
      }
    },
    fetchBuilding(page, pageSize) {
      this.$staffApi.fetchBuildingList(page, pageSize).then((res) => {
        this.$refs.paging.complete(res);
      }).catch((err) => {
      });
    }
  }
};
if (!Array) {
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  _easycom_z_paging2();
}
const _easycom_z_paging = () => "../../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  _easycom_z_paging();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.currentBuilding
  }, $data.currentBuilding ? {
    b: common_vendor.t($data.currentBuilding.name)
  } : {}, {
    c: $data.historyBuilding
  }, $data.historyBuilding ? {
    d: common_vendor.f($data.historyBuilding, (item, index, i0) => {
      return common_vendor.e({
        a: item
      }, item ? {
        b: common_vendor.t(item.name),
        c: common_vendor.o(($event) => $options.onItemClick(item))
      } : {});
    })
  } : {}, {
    e: common_vendor.f($data.buildingData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: index,
        c: common_vendor.o(($event) => $options.onItemClick(item), index)
      };
    }),
    f: common_vendor.sr("paging", "7cab160a-0"),
    g: common_vendor.o($options.fetchBuilding),
    h: common_vendor.o(($event) => $data.buildingData = $event),
    i: common_vendor.p({
      ["default-page-size"]: "30",
      modelValue: $data.buildingData
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7cab160a"], ["__file", "D:/uniapp/house/pages/staff/building/picker.vue"]]);
wx.createPage(MiniProgramPage);
