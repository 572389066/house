"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_cache = require("../../utils/cache.js");
const _sfc_main = {
  data() {
    return {
      token: "",
      phone: ""
    };
  },
  onLoad() {
    this.token = utils_cache.cache.getToken();
    if (this.token && this.token != "") {
      this.fetchUserInfo();
    }
  },
  methods: {
    fetchUserInfo() {
      let token = utils_cache.cache.getToken();
      if (token && token != "") {
        this.$api.fetchUserInfo().then((res) => {
          this.userInfo = res;
          if (res) {
            this.phone = res.phone;
          }
        }).catch((res) => {
        });
      } else {
        this.userInfo = null;
      }
    },
    onLoginResult(e) {
      common_vendor.index.login({
        "provider": "weixin",
        "onlyAuthorize": true,
        // 微信登录仅请求授权认证
        success: (event) => {
          const {
            code
          } = event;
          this.submitLogin(code, e.detail.code);
        },
        fail: (err) => {
          this.$msg("登录失败");
        }
      });
    },
    submitLogin(loginCode, phoneCode) {
      this.$api.submitLogin(loginCode, phoneCode).then((res) => {
        utils_cache.cache.saveToken(res);
        this.$msg("登录成功");
        common_vendor.index.navigateBack();
      }).catch((err) => {
      });
    },
    onClickLoginOut() {
      common_vendor.index.showModal({
        title: "提示",
        content: "是否确认退出登录",
        success: (res) => {
          if (res.confirm) {
            this.loginOut();
          } else if (res.cancel)
            ;
        }
      });
    },
    loginOut() {
      utils_cache.cache.saveToken("");
      common_vendor.index.navigateBack();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.token && $data.token != ""
  }, $data.token && $data.token != "" ? common_vendor.e({
    b: !$data.phone || $data.phone == ""
  }, !$data.phone || $data.phone == "" ? {} : {
    c: common_vendor.t($data.phone)
  }, {
    d: common_vendor.o((...args) => $options.onClickLoginOut && $options.onClickLoginOut(...args))
  }) : {
    e: common_vendor.o((...args) => $options.onLoginResult && $options.onLoginResult(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/house/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
