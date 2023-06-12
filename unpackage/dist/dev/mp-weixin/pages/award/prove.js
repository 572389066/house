"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_urlUtil = require("../../utils/urlUtil.js");
require("../../utils/request.js");
require("../../utils/cache.js");
const _sfc_main = {
  data() {
    return {
      imageURL: "",
      promotionId: ""
    };
  },
  onLoad(option) {
    this.promotionId = option.id;
  },
  methods: {
    getImageUrl(url) {
      let relUrl = utils_urlUtil.urlUtil.getImgUrlNotSize(url);
      return relUrl;
    },
    onClockUpload() {
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
    },
    uploadImage(filePath) {
      this.$api.uploadFile(filePath).then((res) => {
        this.imageURL = res.url;
      }).catch((err) => {
        this.imageURL = "";
      });
    },
    submitPromotion() {
      if (!this.imageURL || this.imageURL === "") {
        this.$msg("请选择推广照片");
        return;
      }
      this.$api.submitPromotion(this.promotionId, this.imageURL).then((res) => {
        if (res) {
          if (res.code_type == "Qrcode" && res.qrcode && res.qrcode != "") {
            common_vendor.index.redirectTo({
              url: "/pages/award/result?result=" + encodeURIComponent(JSON.stringify(
                res
              ))
            });
          } else if (res.code_type == "Number" && res.code && res.code != "") {
            common_vendor.index.redirectTo({
              url: "/pages/award/result?result=" + encodeURIComponent(JSON.stringify(
                res
              ))
            });
          } else {
            this.$msg("获取提交结果失败");
          }
        }
      }).catch((err) => {
      });
    },
    onLoadImageError(e) {
      this.imageURL = "";
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
    a: $data.imageURL && $data.imageURL.length > 0
  }, $data.imageURL && $data.imageURL.length > 0 ? {
    b: $options.getImageUrl($data.imageURL),
    c: common_vendor.o((...args) => $options.onLoadImageError && $options.onLoadImageError(...args))
  } : {
    d: common_vendor.p({
      type: "camera-filled",
      size: "80rpx",
      color: "rgba(51, 49, 52, .25)"
    })
  }, {
    e: common_vendor.o(($event) => $options.onClockUpload()),
    f: common_vendor.o((...args) => $options.submitPromotion && $options.submitPromotion(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4d32f24a"], ["__file", "D:/uniapp/house/pages/award/prove.vue"]]);
wx.createPage(MiniProgramPage);
