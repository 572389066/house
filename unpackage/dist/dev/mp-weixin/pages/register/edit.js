"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_cache = require("../../utils/cache.js");
const _sfc_main = {
  data() {
    return {
      type: 1,
      userCard: null,
      userInfo: null,
      companyName: "",
      companyData: []
    };
  },
  onLoad(options) {
    const {
      type
    } = options;
    this.type = type;
    common_vendor.index.setNavigationBarTitle({
      title: type == 1 ? "我的名片" : "编辑名片"
    });
  },
  onShow() {
    this.fetchUserCard();
    this.fetchUserInfo();
    this.fetchUserCompany();
  },
  methods: {
    showCompanyPicker() {
      this.$refs.popup.open();
    },
    closeCompanyPicker() {
      this.$refs.popup.close();
    },
    onCompanyItemClick(item) {
      this.companyName = item;
      this.closeCompanyPicker();
    },
    getDisplayInputValue(key) {
      if (key === "name" && this.userCard && this.userCard.name) {
        return this.userCard.name;
      }
      if (key === "phone") {
        if (this.userInfo && this.userInfo.phone) {
          return this.userInfo.phone;
        } else {
          return "";
        }
      }
      if (key === "company" && this.userCard && this.userCard.company) {
        return this.userCard.company;
      }
      if (key === "address" && this.userCard && this.userCard.address) {
        return this.userCard.address;
      }
      return "";
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
    fetchUserCard() {
      this.$api.fetchUserCard().then((res) => {
        this.userCard = res;
        console.log("fetchUserCard: " + JSON.stringify(res));
        if (res && res.company) {
          this.companyName = res.company;
        }
      }).catch((err) => {
      });
    },
    fetchUserCompany() {
      this.$api.fetchUserCompany().then((res) => {
        this.companyData = res;
      }).catch((err) => {
      });
    },
    submitUserCard(e) {
      let name = e.detail.value.name;
      let phone = e.detail.value.phone;
      let company = e.detail.value.company;
      let address = e.detail.value.address;
      if (name.length === 0) {
        this.$msg("请输入联系人");
        return;
      }
      this.$api.submitUserCard(name, phone, company, address).then((res) => {
        this.$msg("提交成功");
        common_vendor.index.navigateBack();
      }).catch((err) => {
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $options.getDisplayInputValue("name"),
    b: $options.getDisplayInputValue("phone"),
    c: common_vendor.o(($event) => $options.showCompanyPicker()),
    d: $data.companyName,
    e: common_vendor.o(($event) => $data.companyName = $event.detail.value),
    f: $options.getDisplayInputValue("address"),
    g: common_vendor.t($data.type == 1 ? "确认" : "保存并使用"),
    h: common_vendor.o((...args) => $options.submitUserCard && $options.submitUserCard(...args)),
    i: common_vendor.p({
      type: "closeempty",
      size: "20",
      color: "#999999"
    }),
    j: common_vendor.o((...args) => $options.closeCompanyPicker && $options.closeCompanyPicker(...args)),
    k: common_vendor.f($data.companyData, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.o(($event) => $options.onCompanyItemClick(item))
      };
    }),
    l: common_vendor.sr("popup", "36de54db-0"),
    m: common_vendor.p({
      type: "bottom"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-36de54db"], ["__file", "D:/uniapp/house/pages/register/edit.vue"]]);
wx.createPage(MiniProgramPage);
