"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_cache = require("../../utils/cache.js");
const _sfc_main = {
  data() {
    return {
      buildingId: "",
      scene: "",
      buildingDetail: null
    };
  },
  onLoad(options) {
    this.buildingId = options.buildingId;
    this.scene = options.scene;
    this.fetchBuilding();
    this.checkLogin();
  },
  methods: {
    fetchBuilding() {
      this.$api.fetchBuildingDetail(this.buildingId).then((res) => {
        this.buildingDetail = res;
      }).catch((err) => {
      });
    },
    submitCustomCheck() {
      this.$api.submitCustomCheck(this.scene).then((res) => {
        this.$msg("提交成功");
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }, 500);
      }).catch((err) => {
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.buildingDetail
  }, $data.buildingDetail ? {
    b: common_vendor.t($data.buildingDetail.name)
  } : {}, {
    c: common_vendor.o(($event) => $options.submitCustomCheck())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-966b116c"], ["__file", "D:/uniapp/house/pages/register/signIn.vue"]]);
wx.createPage(MiniProgramPage);
