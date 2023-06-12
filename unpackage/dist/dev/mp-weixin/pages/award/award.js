"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_urlUtil = require("../../utils/urlUtil.js");
require("../../utils/request.js");
require("../../utils/cache.js");
const Head = () => "../../components/Head/Head.js";
const _sfc_main = {
  components: {
    Head
  },
  data() {
    return {
      promotionData: [],
      wx: {}
    };
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
    fetchPromotionList(page, pageSize) {
      this.$api.fetchPromotionList(page, pageSize).then((res) => {
        this.$refs.paging.complete(res);
      }).catch((err) => {
        this.$refs.paging.complete(false);
      });
    }
  }
};
if (!Array) {
  const _easycom_Head2 = common_vendor.resolveComponent("Head");
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  (_easycom_Head2 + _easycom_z_paging2)();
}
const _easycom_Head = () => "../../components/Head/Head.js";
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (_easycom_Head + _easycom_z_paging)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "推广获奖"
    }),
    b: common_vendor.f($data.promotionData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: "/pages/award/detail?id=" + item.id,
        c: index,
        d: `url(${$options.getImageUrl(item.picture)}) no-repeat`
      };
    }),
    c: `${$data.wx.height + $data.wx.top}px`,
    d: common_vendor.sr("paging", "9350b027-1"),
    e: common_vendor.o($options.fetchPromotionList),
    f: common_vendor.o(($event) => $data.promotionData = $event),
    g: common_vendor.p({
      modelValue: $data.promotionData
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9350b027"], ["__file", "D:/uniapp/house/pages/award/award.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
