"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_urlUtil = require("../../utils/urlUtil.js");
require("../../utils/request.js");
require("../../utils/cache.js");
const _sfc_main = {
  data() {
    return {
      buildingId: "",
      buildingDetail: null
    };
  },
  onLoad(option) {
    this.buildingId = option.id;
    this.fetchBuildingDetail();
  },
  onShareAppMessage(res) {
    if (this.buildingDetail) {
      return this.$shareBuilding(this.buildingDetail.id, this.buildingDetail.name);
    } else {
      return this.$shareIndex();
    }
  },
  methods: {
    getImageUrl(url) {
      let relUrl = utils_urlUtil.urlUtil.getImgUrl(url);
      return relUrl;
    },
    getDisplayAddress() {
      let address = "";
      if (this.buildingDetail) {
        if (this.buildingDetail.province) {
          address = this.buildingDetail.province;
        }
        if (this.buildingDetail.city) {
          address = address + this.buildingDetail.city;
        }
        if (this.buildingDetail.district) {
          address = address + this.buildingDetail.district;
        }
        if (this.buildingDetail.address) {
          address = address + this.buildingDetail.address;
        }
      }
      return address;
    },
    fetchBuildingDetail() {
      this.$api.fetchBuildingDetail(this.buildingId).then((res) => {
        console.log("fetchBuildingDetail result: " + JSON.stringify(res));
        this.buildingDetail = res;
      }).catch((err) => {
        console.log("fetchBuildingDetail err: " + JSON.stringify(err));
      });
    },
    onClickPhone() {
      common_vendor.index.makePhoneCall({
        phoneNumber: this.buildingDetail.phone
      });
    }
  }
};
if (!Array) {
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  _easycom_mp_html2();
}
const _easycom_mp_html = () => "../../uni_modules/mp-html/components/mp-html/mp-html.js";
if (!Math) {
  _easycom_mp_html();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.getImageUrl($data.buildingDetail.pic),
    b: $data.buildingDetail.status === "preSale"
  }, $data.buildingDetail.status === "preSale" ? {} : $data.buildingDetail.status === "onSale" ? {} : {}, {
    c: $data.buildingDetail.status === "onSale",
    d: common_vendor.f($data.buildingDetail.tags, (item, index, i0) => {
      return common_vendor.e({
        a: item && item != ""
      }, item && item != "" ? {
        b: common_vendor.t(item)
      } : {});
    }),
    e: common_vendor.t($data.buildingDetail.name),
    f: common_vendor.t($data.buildingDetail.price),
    g: common_vendor.t($options.getDisplayAddress()),
    h: common_vendor.p({
      content: $data.buildingDetail.detail
    }),
    i: $data.buildingDetail.phone
  }, $data.buildingDetail.phone ? {
    j: common_vendor.o((...args) => $options.onClickPhone && $options.onClickPhone(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7129c2de"], ["__file", "D:/uniapp/house/pages/pfs/detail.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
