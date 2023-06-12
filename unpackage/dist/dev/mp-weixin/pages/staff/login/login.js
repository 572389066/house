"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_cache = require("../../../utils/cache.js");
const _sfc_main = {
  data() {
    return {};
  },
  onLoad(option) {
    let token = utils_cache.cache.getStaffToken();
    if (token && token != "") {
      common_vendor.index.redirectTo({
        url: "/pages/staff/index/index"
      });
    }
  },
  methods: {
    onClickSubmit(e) {
      var _phone = e.detail.value.phone;
      var _password = e.detail.value.password;
      if (!_phone || _phone.length === 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "请输入用户名"
        });
        return;
      }
      if (!_password || _password.length === 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "请输入登录密码"
        });
        return;
      }
      common_vendor.index.login({
        "provider": "weixin",
        "onlyAuthorize": true,
        // 微信登录仅请求授权认证
        success: (event) => {
          const {
            code
          } = event;
          this.submitLogin(_phone, _password, code);
        },
        fail: (err) => {
          this.$msg("登录失败");
        }
      });
    },
    submitLogin(phone, password, code) {
      this.$staffApi.submitLogin(phone, password, code).then((res) => {
        if (res) {
          utils_cache.cache.saveStaffToken(res);
          common_vendor.index.redirectTo({
            url: "/pages/staff/index/index"
          });
        } else {
          this.$msg("获取登录信息失败");
        }
      }).catch((err) => {
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.onClickSubmit && $options.onClickSubmit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/house/pages/staff/login/login.vue"]]);
wx.createPage(MiniProgramPage);
