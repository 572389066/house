"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_urlUtil = require("../../utils/urlUtil.js");
require("../../utils/request.js");
require("../../utils/cache.js");
const _sfc_main = {
  data() {
    return {
      recommendBuildingData: []
    };
  },
  onShareAppMessage(res) {
    return this.$shareIndex();
  },
  methods: {
    getImageUrl(url) {
      let relUrl = utils_urlUtil.urlUtil.getImgUrlNotSize(url);
      return relUrl;
    },
    getDisplayAddress(buildItem) {
      let address = "";
      if (buildItem) {
        if (buildItem.province) {
          address = buildItem.province;
        }
        if (buildItem.city) {
          address = address + buildItem.city;
        }
        if (buildItem.district) {
          address = address + buildItem.district;
        }
        if (buildItem.address) {
          address = address + buildItem.address;
        }
      }
      return address;
    },
    onItemClick(item) {
      common_vendor.index.navigateTo({
        url: "/pages/pfs/detail?id=" + item.id
      });
    },
    fetchRecommendBuilding(page, pageSize) {
      this.$api.fetchBuildingList(page, pageSize, "", "", true).then((res) => {
        console.log("fetchRecommendBuilding result: " + JSON.stringify(res));
        this.$refs.paging.complete(res);
      }).catch((err) => {
        console.log("fetchRecommendBuilding err: " + JSON.stringify(err));
        this.$refs.paging.complete(false);
      });
    }
  }
};
if (!Array) {
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  _easycom_z_paging2();
}
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  _easycom_z_paging();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.recommendBuildingData, (item, index, i0) => {
      return common_vendor.e({
        a: $options.getImageUrl(item.pic),
        b: item.status === "preSale"
      }, item.status === "preSale" ? {} : item.status === "onSale" ? {} : {}, {
        c: item.status === "onSale",
        d: common_vendor.t(item.name),
        e: common_vendor.t(item.price),
        f: common_vendor.t($options.getDisplayAddress(item)),
        g: common_vendor.f(item.tags, (tag, index2, i1) => {
          return {
            a: common_vendor.t(tag)
          };
        }),
        h: common_vendor.o(($event) => $options.onItemClick(item))
      });
    }),
    b: common_vendor.sr("paging", "611ff4ad-0"),
    c: common_vendor.o($options.fetchRecommendBuilding),
    d: common_vendor.o(($event) => $data.recommendBuildingData = $event),
    e: common_vendor.p({
      modelValue: $data.recommendBuildingData
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-611ff4ad"], ["__file", "D:/uniapp/house/pages/star/star.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
