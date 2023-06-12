"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_urlUtil = require("../../utils/urlUtil.js");
require("../../utils/request.js");
require("../../utils/cache.js");
const Head = () => "../../components/Head/Head.js";
const Search = () => "../../components/Search/Search.js";
const _sfc_main = {
  components: {
    Head,
    Search
  },
  data() {
    return {
      buildingData: [],
      wx: {}
    };
  },
  onLoad() {
  },
  onShow() {
    this.wx = common_vendor.wx$1.getMenuButtonBoundingClientRect();
  },
  onShareAppMessage(res) {
    return this.$shareIndex();
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
    fetchBuildingList(pageNo, pageSize) {
      this.$api.fetchBuildingList(pageNo, pageSize, "", "", false).then((res) => {
        this.$refs.paging.complete(res);
      }).catch((err) => {
        this.$refs.paging.complete(false);
      });
    }
  }
};
if (!Array) {
  const _easycom_Head2 = common_vendor.resolveComponent("Head");
  const _easycom_Search2 = common_vendor.resolveComponent("Search");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  (_easycom_Head2 + _easycom_Search2 + _easycom_z_paging2)();
}
const _easycom_Head = () => "../../components/Head/Head.js";
const _easycom_Search = () => "../../components/Search/Search.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (_easycom_Head + _easycom_Search + _easycom_z_paging)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "楼盘"
    }),
    b: common_vendor.f($data.buildingData, (item, index, i0) => {
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
    c: common_vendor.sr("paging", "0673e562-1"),
    d: common_vendor.o($options.fetchBuildingList),
    e: common_vendor.o(($event) => $data.buildingData = $event),
    f: common_vendor.p({
      modelValue: $data.buildingData
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0673e562"], ["__file", "D:/uniapp/house/pages/pfs/pfs.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
