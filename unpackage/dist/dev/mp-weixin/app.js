"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_cache = require("./utils/cache.js");
const api_index = require("./api/index.js");
const api_staff_index = require("./api/staff/index.js");
require("./utils/request.js");
require("./api/staff/request.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/my/my.js";
  "./pages/pfs/pfs.js";
  "./pages/award/award.js";
  "./pages/star/star.js";
  "./pages/register/register.js";
  "./pages/register/edit.js";
  "./pages/activities/activities.js";
  "./pages/search/search.js";
  "./pages/pfs/detail.js";
  "./pages/award/detail.js";
  "./pages/award/prove.js";
  "./pages/award/result.js";
  "./pages/register/record.js";
  "./pages/award/record.js";
  "./pages/feedback/feedback.js";
  "./pages/area/area.js";
  "./pages/register/signIn.js";
  "./pages/login/login.js";
  "./pages/register/scan.js";
  "./pages/register/detail.js";
  "./pages/web/web.js";
  "./pages/staff/login/login.js";
  "./pages/staff/index/index.js";
  "./pages/staff/channel/channel.js";
  "./pages/staff/qr/qr.js";
  "./pages/staff/scan/action.js";
  "./pages/staff/building/picker.js";
  "./pages/staff/scan/scan.js";
  "./pages/staff/scan/number.js";
  "./pages/staff/scan/result.js";
  "./pages/staff/qr/check_in.js";
  "./pages/staff/qr/record.js";
  "./pages/staff/qr/transfer.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
    this.fetchUserInfo();
  },
  onHide: function() {
    console.log("App Hide");
  },
  methods: {
    fetchUserInfo() {
      let token = utils_cache.cache.getToken();
      if (token && token != "") {
        this.$api.fetchUserInfo().then((res) => {
          this.userInfo = res;
        }).catch((res) => {
        });
      } else {
        this.userInfo = null;
      }
    }
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uniapp/house/App.vue"]]);
const tipsFun = (text) => {
  common_vendor.index.showToast({
    title: text,
    icon: "none",
    duration: 2e3
  });
};
const shareIndex = () => {
  return {
    title: "森琥好房",
    path: "/pages/index/index"
  };
};
const shareBuilding = (id, title) => {
  let _title = "森琥好房";
  let path = "/pages/index/index";
  if (id && id != "") {
    path = "/pages/pfs/detail?id=" + id;
    if (title && title != "") {
      _title = title;
    }
  }
  return {
    title: _title,
    path
  };
};
const shareAward = (id, title) => {
  let _title = "森琥好房";
  let path = "/pages/index/index";
  if (id && id != "") {
    path = "/pages/award/detail?id=" + id;
    if (title && title != "") {
      _title = title;
    }
  }
  return {
    title: _title,
    path
  };
};
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.config.globalProperties.$api = api_index.api;
  app.config.globalProperties.$staffApi = api_staff_index.staffApi;
  app.config.globalProperties.$msg = tipsFun;
  app.config.globalProperties.$shareIndex = shareIndex;
  app.config.globalProperties.$shareBuilding = shareBuilding;
  app.config.globalProperties.$shareAward = shareAward;
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
