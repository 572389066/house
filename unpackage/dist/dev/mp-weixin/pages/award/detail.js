"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_cache = require("../../utils/cache.js");
const utils_download = require("../../utils/download.js");
const utils_urlUtil = require("../../utils/urlUtil.js");
const utils_clipboard = require("../../utils/clipboard.js");
require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      promotionId: "",
      promotionDetail: null,
      videoData: []
    };
  },
  onLoad(option) {
    this.promotionId = option.id;
    this.fetchPromotionDetail();
  },
  onShareAppMessage(res) {
    if (this.promotionDetail) {
      return this.$shareAward(this.promotionId, this.promotionDetail.title);
    } else {
      return this.$shareIndex();
    }
  },
  methods: {
    goupload() {
      if (this.checkLogin()) {
        common_vendor.index.navigateTo({
          url: "/pages/award/prove?id=" + this.promotionId
        });
      }
    },
    fetchPromotionDetail() {
      this.$api.fetchPromotionDetail(this.promotionId).then((res) => {
        this.promotionDetail = res;
        this.getVideo();
      }).catch((err) => {
      });
    },
    getVideo() {
      if (this.promotionDetail && this.promotionDetail.detail && this.promotionDetail.detail != "") {
        let data = [];
        let html = this.promotionDetail.detail;
        html.replace(/<video [^>]*src=['"]([^'"]+)[^>]*>/, function(match, capture) {
          data.push(capture);
        });
        this.videoData = data;
      }
    },
    onClickDownload() {
      let view = this.$refs.article;
      let imageList = view.imgList;
      let mediumData = [];
      if (imageList && imageList.length > 0) {
        for (var i = 0; i < imageList.length; i++) {
          let url = imageList[i];
          if (url && url != "") {
            mediumData.push(url);
          }
        }
      }
      if (this.videoData && this.videoData.length > 0) {
        for (var i = 0; i < this.videoData.length; i++) {
          let url = this.videoData[i];
          if (url && url != "") {
            mediumData.push(url);
          }
        }
      }
      if (mediumData.length == 0) {
        this.$msg("未找到图片/视频资源");
        return;
      }
      for (var i = 0; i < mediumData.length; i++) {
        let url = mediumData[i];
        utils_download.download.saveImage(url, utils_urlUtil.urlUtil.isVideo(url));
      }
    },
    onClickCopy() {
      let view = this.$refs.article;
      let text = view.getText();
      utils_clipboard.copyContent(text);
      this.$msg("复制成功");
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
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  (_easycom_uni_icons2 + _easycom_mp_html2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_mp_html = () => "../../uni_modules/mp-html/components/mp-html/mp-html.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_mp_html)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "info",
      size: "30rpx",
      color: "#E09A5B"
    }),
    b: common_vendor.t($data.promotionDetail.title),
    c: common_vendor.sr("article", "c2cf99df-1"),
    d: common_vendor.p({
      content: $data.promotionDetail.detail
    }),
    e: common_vendor.o(($event) => $options.onClickDownload()),
    f: common_vendor.o(($event) => $options.onClickCopy()),
    g: common_vendor.o((...args) => $options.goupload && $options.goupload(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c2cf99df"], ["__file", "D:/uniapp/house/pages/award/detail.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
