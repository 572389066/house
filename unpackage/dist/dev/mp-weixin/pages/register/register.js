"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_urlUtil = require("../../utils/urlUtil.js");
const utils_cache = require("../../utils/cache.js");
require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      buildingId: "",
      scene: "",
      userCard: null,
      buildingDetail: null,
      uploadResult: []
    };
  },
  onLoad(options) {
    this.buildingId = options.buildingId;
    this.scene = options.scene;
    common_vendor.index.setNavigationBarTitle({
      title: "登记"
    });
    this.fetchBuilding();
  },
  onShow() {
    if (this.checkLogin()) {
      this.fetchUserCard();
    }
  },
  methods: {
    goFun() {
      common_vendor.index.navigateTo({
        url: "/pages/register/edit?type=2"
      });
    },
    getImageUrl(url) {
      return utils_urlUtil.urlUtil.getImgUrl(url);
    },
    onClickDelete(index) {
      if (this.uploadResult && this.uploadResult.length > index) {
        this.uploadResult.splice(index, 1);
        let arr = this.uploadResult;
        this.uploadResult = arr;
      }
    },
    onClickUpload() {
      let count = 4;
      if (this.uploadResult) {
        count = 4 - this.uploadResult.length;
      }
      if (count > 0) {
        common_vendor.index.chooseMedia({
          count: 1,
          mediaType: ["image"],
          sourceType: ["album", "camera"],
          maxDuration: 30,
          camera: "back",
          sizeType: ["compressed"],
          success: (res) => {
            if (res && res.tempFiles && res.tempFiles.length > 0) {
              let tempFile = res.tempFiles[0];
              this.uploadImage(tempFile.tempFilePath);
            }
          }
        });
      }
    },
    uploadImage(filePath) {
      this.$api.uploadFile(filePath).then((res) => {
        this.uploadResult.push(res.url);
      }).catch((err) => {
      });
    },
    fetchUserCard() {
      this.$api.fetchUserCard().then((res) => {
        this.userCard = res;
      }).catch((err) => {
      });
    },
    fetchBuilding() {
      this.$api.fetchBuildingDetail(this.buildingId).then((res) => {
        this.buildingDetail = res;
      }).catch((err) => {
      });
    },
    onClickSubmit() {
      common_vendor.index.showModal({
        title: "提示",
        content: "是否确认提交登记信息",
        success: (res) => {
          if (res.confirm) {
            this.submitCheck();
          } else if (res.cancel)
            ;
        }
      });
    },
    submitCheck() {
      let img = "";
      if (this.uploadResult && this.uploadResult.length > 0) {
        for (var i = 0; i < this.uploadResult.length; i++) {
          let url = this.uploadResult[i];
          if (url && url != "") {
            if (img != "") {
              img = img + ",";
            }
            img = img + url;
          }
        }
      }
      this.$api.submitSalesCheck(this.scene, img).then((res) => {
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
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "person",
      size: "34rpx",
      color: "#626162"
    }),
    b: $data.userCard
  }, $data.userCard ? {
    c: common_vendor.t($data.userCard.name),
    d: common_vendor.t($data.userCard.phone)
  } : {}, {
    e: common_vendor.p({
      type: "right",
      size: "34rpx",
      color: "rgba(51, 49, 52, .5)"
    }),
    f: common_vendor.o(($event) => $options.goFun()),
    g: common_vendor.p({
      type: "location",
      size: "34rpx",
      color: "#626162"
    }),
    h: $data.userCard && $data.userCard.company
  }, $data.userCard && $data.userCard.company ? {
    i: common_vendor.t($data.userCard.company)
  } : {}, {
    j: $data.userCard && $data.userCard.address
  }, $data.userCard && $data.userCard.address ? {
    k: common_vendor.t($data.userCard.address)
  } : {}, {
    l: $data.buildingDetail
  }, $data.buildingDetail ? {
    m: common_vendor.t($data.buildingDetail.name)
  } : {}, {
    n: $data.uploadResult && $data.uploadResult.length > 0
  }, $data.uploadResult && $data.uploadResult.length > 0 ? {
    o: common_vendor.f($data.uploadResult, (item, index, i0) => {
      return {
        a: $options.getImageUrl(item),
        b: "bac4a35d-3-" + i0,
        c: common_vendor.o(($event) => $options.onClickDelete(index))
      };
    }),
    p: common_vendor.p({
      type: "closeempty",
      size: "24rpx",
      color: "#fff"
    })
  } : {}, {
    q: !$data.uploadResult || $data.uploadResult.length < 4
  }, !$data.uploadResult || $data.uploadResult.length < 4 ? {
    r: common_vendor.p({
      type: "camera-filled",
      size: "80rpx",
      color: "rgba(51, 49, 52, .25)"
    }),
    s: common_vendor.o((...args) => $options.onClickUpload && $options.onClickUpload(...args))
  } : {}, {
    t: common_vendor.o(($event) => $options.onClickSubmit())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bac4a35d"], ["__file", "D:/uniapp/house/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);
