"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_cache = require("../../utils/cache.js");
const common_assets = require("../../common/assets.js");
new Proxy({}, {
  get(_, key) {
    throw new Error(`Module "os" has been externalized for browser compatibility. Cannot access "os.${key}" in client code.  See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
  }
});
const _sfc_main = {
  data() {
    return {
      wx: {},
      main: [
        {
          img: "../../static/image/my1.png",
          name: "我的名片",
          url: "/pages/register/edit?type=1"
        },
        {
          img: "../../static/image/my2.png",
          name: "推广记录",
          url: "/pages/award/record"
        },
        {
          img: "../../static/image/my3.png",
          name: "登记记录",
          url: "/pages/register/record"
        },
        {
          img: "../../static/image/my4.png",
          name: "意见反馈",
          url: "/pages/feedback/feedback"
        }
      ],
      userInfo: null
    };
  },
  onShow() {
    this.wx = common_vendor.wx$1.getMenuButtonBoundingClientRect();
    this.fetchUserInfo();
  },
  onShareAppMessage(res) {
    return this.$shareIndex();
  },
  methods: {
    onClickInfo() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    },
    onClickMenu(url) {
      if (this.checkLogin()) {
        common_vendor.index.navigateTo({
          url
        });
      }
    },
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
  _easycom_Head2();
}
const _easycom_Head = () => "../../components/Head/Head.js";
if (!Math) {
  _easycom_Head();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "我的"
    }),
    b: common_assets._imports_0$1,
    c: common_vendor.o(($event) => $options.onClickInfo()),
    d: $data.userInfo && $data.userInfo.phone && $data.userInfo.phone != ""
  }, $data.userInfo && $data.userInfo.phone && $data.userInfo.phone != "" ? {
    e: common_vendor.t($data.userInfo.phone)
  } : {}, {
    f: common_vendor.o(($event) => $options.onClickInfo()),
    g: `${$data.wx.height + $data.wx.top}px`,
    h: common_vendor.f($data.main, (item, index, i0) => {
      return {
        a: item.img,
        b: common_vendor.t(item.name),
        c: index,
        d: common_vendor.o(($event) => $options.onClickMenu(item.url), index)
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2f1ef635"], ["__file", "D:/uniapp/house/pages/my/my.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
