"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_urlUtil = require("../../utils/urlUtil.js");
const utils_cache = require("../../utils/cache.js");
const common_assets = require("../../common/assets.js");
require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      inputValue: "",
      buildingData: [],
      historyKey: [],
      keywords: null,
      selectedHistory: ""
    };
  },
  onLoad() {
    this.historyKey = utils_cache.cache.getHistoryKeywords();
  },
  methods: {
    getImageUrl(url) {
      let relUrl = utils_urlUtil.urlUtil.getImgUrlNotSize(url);
      return relUrl;
    },
    onItemClick(item) {
      common_vendor.index.navigateTo({
        url: "/pages/pfs/detail?id=" + item.id
      });
    },
    cleanHistoryKeywords() {
      utils_cache.cache.cleanHistoryKeywords();
      this.historyKey = utils_cache.cache.getHistoryKeywords();
    },
    onClickSearch(e) {
      utils_cache.cache.saveHistoryKeywords(this.keywords);
      this.historyKey = utils_cache.cache.getHistoryKeywords();
      this.onSearch(e);
    },
    onClickHistory(key) {
      this.selectedHistory = key;
      utils_cache.cache.saveHistoryKeywords(key);
      this.historyKey = utils_cache.cache.getHistoryKeywords();
      this.onSearch({
        detail: {
          value: key
        }
      });
    },
    onSearch(e) {
      this.keywords = e.detail.value;
      this.fetchBuildingList(1, 20);
    },
    fetchBuildingList(pageNo, pageSize) {
      this.$api.fetchBuildingList(pageNo, pageSize, this.keywords, "", false).then((res) => {
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
  return common_vendor.e({
    a: common_assets._imports_0$2,
    b: common_vendor.o((...args) => $options.onClickSearch && $options.onClickSearch(...args)),
    c: common_vendor.o([($event) => $data.selectedHistory = $event.detail.value, (...args) => $options.onSearch && $options.onSearch(...args)]),
    d: $data.selectedHistory,
    e: $data.historyKey && $data.historyKey.length > 0
  }, $data.historyKey && $data.historyKey.length > 0 ? {
    f: common_vendor.o(($event) => $options.cleanHistoryKeywords()),
    g: common_vendor.p({
      type: "trash-filled",
      size: "34rpx",
      color: "#626162"
    })
  } : {}, {
    h: $data.historyKey && $data.historyKey.length > 0
  }, $data.historyKey && $data.historyKey.length > 0 ? {
    i: common_vendor.f($data.historyKey, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.o(($event) => $options.onClickHistory(item))
      };
    })
  } : {}, {
    j: common_vendor.f($data.buildingData, (item, index, i0) => {
      return {
        a: $options.getImageUrl(item.pic),
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.price),
        d: common_vendor.t(item.address),
        e: common_vendor.f(item.tags, (tag, index2, i1) => {
          return common_vendor.e({
            a: tag && _ctx.tab != ""
          }, tag && _ctx.tab != "" ? {
            b: common_vendor.t(tag)
          } : {});
        }),
        f: common_vendor.o(($event) => $options.onItemClick(item))
      };
    }),
    k: common_vendor.sr("paging", "c10c040c-0"),
    l: common_vendor.o($options.fetchBuildingList),
    m: common_vendor.o(($event) => $data.buildingData = $event),
    n: common_vendor.p({
      ["default-page-size"]: "20",
      auto: false,
      modelValue: $data.buildingData
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c10c040c"], ["__file", "D:/uniapp/house/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
