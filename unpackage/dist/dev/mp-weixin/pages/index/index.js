"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_urlUtil = require("../../utils/urlUtil.js");
const utils_cache = require("../../utils/cache.js");
const common_assets = require("../../common/assets.js");
require("../../utils/request.js");
const Head = () => "../../components/Head/Head.js";
const Search = () => "../../components/Search/Search.js";
const _sfc_main = {
  components: {
    Head,
    Search
  },
  data() {
    return {
      imageBannerData: [],
      videoBannerData: [],
      recommendBuildingData: [],
      wx: {}
    };
  },
  onShareAppMessage(res) {
    return this.$shareIndex();
  },
  onShow() {
    this.wx = common_vendor.wx$1.getMenuButtonBoundingClientRect();
  },
  onLoad() {
    this.fetchBanner();
  },
  methods: {
    getImageUrl(url) {
      return utils_urlUtil.urlUtil.getImgUrlNotSize(url);
    },
    isVideoBanner(url) {
      return utils_urlUtil.urlUtil.isVideo(url);
    },
    onBannerClick(item) {
      if (item) {
        if (item.handle_type == "1") {
          if (item.web_url && item.web_url != "") {
            common_vendor.index.navigateTo({
              url: "/pages/web/web?url=" + utils_urlUtil.urlUtil.getFullUrl(item.web_url)
            });
          }
        } else if (item.handle_type == "2") {
          if (item.web_url && item.web_url != "") {
            common_vendor.wx$1.openChannelsUserProfile({
              finderUserName: item.web_url,
              success: function() {
              },
              fail: function() {
                console.log("openChannelsUserProfile fail: " + JSON.stringify(e));
              }
            });
          }
        } else if (item.handle_type == "3") {
          if (item.web_url && item.web_url != "" && item.relation_id && item.relation_id != "") {
            common_vendor.wx$1.openChannelsActivity({
              finderUserName: item.web_url,
              feedId: item.relation_id,
              success: function() {
              },
              fail: function() {
                console.log("openChannelsActivity fail: " + JSON.stringify(e));
              }
            });
          }
        }
      }
    },
    onItemClick(item) {
      common_vendor.index.navigateTo({
        url: "/pages/pfs/detail?id=" + item.id
      });
    },
    onClickScan() {
      if (this.checkLogin()) {
        common_vendor.index.navigateTo({
          url: "/pages/register/scan"
        });
      }
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
    fetchBanner() {
      this.$api.getBanner().then((res) => {
        this.imageBannerData = res.imgBanner;
        this.videoBannerData = res.videoBanner;
      }).catch((err) => {
        console.log("getBanner err: " + JSON.stringify(err));
      });
    },
    onRefresh(page, pageSize) {
      if (page == 1) {
        this.fetchBanner();
      }
      this.fetchRecommendBuilding(page, pageSize);
    },
    fetchRecommendBuilding(page, pageSize) {
      this.$api.fetchBuildingList(page, pageSize, "", "", true).then((res) => {
        this.$refs.paging.complete(res);
      }).catch((err) => {
        this.$refs.paging.complete(false);
      });
    },
    checkLogin() {
      let token = utils_cache.cache.getToken();
      if (!token || token == "") {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
        return false;
      } else {
        return true;
      }
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
      title: "首页"
    }),
    b: common_vendor.f($data.imageBannerData, (item, index, i0) => {
      return {
        a: $options.getImageUrl(item.img_url),
        b: index,
        c: common_vendor.o(($event) => $options.onBannerClick(item), index)
      };
    }),
    c: common_assets._imports_0,
    d: common_assets._imports_1,
    e: common_vendor.o(($event) => $options.onClickScan()),
    f: common_assets._imports_2,
    g: common_vendor.f($data.videoBannerData, (item, index, i0) => {
      return common_vendor.e({
        a: $options.isVideoBanner(item.img_url)
      }, $options.isVideoBanner(item.img_url) ? {
        b: $options.getImageUrl(item.img_url),
        c: common_vendor.o(($event) => _ctx.BoFang(), index),
        d: common_vendor.o(($event) => _ctx.ZanTing(), index)
      } : {
        e: $options.getImageUrl(item.img_url)
      }, {
        f: index,
        g: common_vendor.o(($event) => $options.onBannerClick(item), index)
      });
    }),
    h: common_vendor.f($data.recommendBuildingData, (item, index, i0) => {
      return common_vendor.e({
        a: $options.getImageUrl(item.pic),
        b: item.status === "preSale"
      }, item.status === "preSale" ? {} : item.status === "onSale" ? {} : {}, {
        c: item.status === "onSale",
        d: common_vendor.f(item.tags, (tag, index2, i1) => {
          return common_vendor.e({
            a: tag && tag != ""
          }, tag && tag != "" ? {
            b: common_vendor.t(tag)
          } : {});
        }),
        e: common_vendor.t(item.name),
        f: common_vendor.t(item.price),
        g: common_vendor.t($options.getDisplayAddress(item)),
        h: common_vendor.o(($event) => $options.onItemClick(item))
      });
    }),
    i: common_vendor.sr("paging", "1cf27b2a-1"),
    j: common_vendor.o($options.onRefresh),
    k: common_vendor.o(($event) => $data.recommendBuildingData = $event),
    l: common_vendor.p({
      modelValue: $data.recommendBuildingData
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/uniapp/house/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
