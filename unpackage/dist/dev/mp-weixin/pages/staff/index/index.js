"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_cache = require("../../../utils/cache.js");
const _sfc_main = {
  data() {
    return {
      currentBuilding: null,
      subscribeOff: true,
      subscribeTmplIds: ["p_BGDxGD2wY3kyfbB4sTSNdSevo4RRZeUy2uFSkj4aQ"]
    };
  },
  onLoad() {
    this.fetchBuilding();
  },
  onShow() {
  },
  methods: {
    subscribeMessage() {
      common_vendor.index.requestSubscribeMessage({
        tmplIds: this.subscribeTmplIds,
        success: (res) => {
          console.log("subscribeMessage:  success--->>" + JSON.stringify(res));
        },
        fail: (err) => {
          console.log("subscribeMessage:  fail--->>" + JSON.stringify(err));
        }
      });
    },
    showSubscribeModal() {
      common_vendor.index.showModal({
        title: "提示",
        content: "你尚未开启接收订阅消息，去开启？",
        success: (res) => {
          if (res.confirm) {
            this.openSetting();
          } else if (res.cancel)
            ;
        }
      });
    },
    openSetting() {
      common_vendor.index.openSetting({
        withSubscriptions: true,
        success: (res) => {
        }
      });
    },
    bindCurrentBuilding(building) {
      this.currentBuilding = building;
      utils_cache.cache.saveCurrentBuilding(this.currentBuilding);
    },
    onClickBuilding() {
      common_vendor.index.navigateTo({
        url: "/pages/staff/building/picker",
        events: {
          onDateResult: (e) => {
            if (e.data) {
              this.bindCurrentBuilding(e.data);
            }
          }
        }
      });
    },
    fetchBuilding() {
      this.$staffApi.fetchBuildingList(1, 1).then((res) => {
        if (!this.currentBuilding && res && res.length > 0) {
          this.bindCurrentBuilding(res[0]);
        }
      }).catch((err) => {
      });
    },
    loginOut() {
      common_vendor.index.showModal({
        title: "提示",
        content: "是否退出登录?",
        success: (res) => {
          if (res.confirm) {
            utils_cache.cache.saveStaffToken("");
            common_vendor.index.redirectTo({
              url: "/pages/staff/login/login"
            });
          } else if (res.cancel)
            ;
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  (_easycom_uni_icons2 + _easycom_uni_nav_bar2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_nav_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.currentBuilding
  }, $data.currentBuilding ? {
    b: common_vendor.t($data.currentBuilding.name)
  } : {}, {
    c: common_vendor.p({
      type: "right",
      size: "16",
      color: "#030303"
    }),
    d: common_vendor.o($options.onClickBuilding),
    e: common_vendor.p({
      ["left-width"]: "300rpx",
      statusBar: "true"
    }),
    f: $data.subscribeOff
  }, $data.subscribeOff ? {
    g: common_vendor.p({
      type: "right",
      color: "#ffffff",
      size: "28rpx"
    }),
    h: common_vendor.o(($event) => $options.subscribeMessage())
  } : {}, {
    i: common_vendor.o(($event) => $options.loginOut())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5bbb43aa"], ["__file", "D:/uniapp/house/pages/staff/index/index.vue"]]);
wx.createPage(MiniProgramPage);
