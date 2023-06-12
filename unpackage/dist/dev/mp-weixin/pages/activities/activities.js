"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_urlUtil = require("../../utils/urlUtil.js");
require("../../utils/request.js");
require("../../utils/cache.js");
const _sfc_main = {
  data() {
    return {
      activityData: []
    };
  },
  methods: {
    getImageUrl(url) {
      let relUrl = utils_urlUtil.urlUtil.getImgUrlNotSize(url);
      return relUrl;
    },
    onItemClick(item) {
      if (item) {
        if (item.type == "0") {
          if (item.url && item.url != "") {
            common_vendor.index.navigateTo({
              url: "/pages/web/web?url=" + utils_urlUtil.urlUtil.getFullUrl(item.url)
            });
          }
        } else if (item.type == "1") {
          if (item.url && item.url != "") {
            common_vendor.wx$1.openChannelsUserProfile({
              finderUserName: item.url,
              success: function() {
              },
              fail: function() {
                console.log("openChannelsUserProfile fail: " + JSON.stringify(e));
              }
            });
          }
        } else if (item.type == "2") {
          if (item.url && item.url != "" && item.video_id && item.video_id != "") {
            common_vendor.wx$1.openChannelsActivity({
              finderUserName: item.url,
              feedId: item.video_id,
              success: function() {
              },
              fail: function() {
                console.log("openChannelsActivity fail: " + JSON.stringify(e));
              }
            });
          }
        }
      }
    },
    fetchActivityList(page, pageSize) {
      this.$api.fetchActivityList(page, pageSize).then((res) => {
        console.log("fetchActivityList result: " + JSON.stringify(res));
        this.$refs.paging.complete(res);
      }).catch((err) => {
        console.log("fetchActivityList err: " + JSON.stringify(err));
        this.$refs.paging.complete(false);
      });
    }
  }
};
if (!Array) {
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  _easycom_z_paging2();
}
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  _easycom_z_paging();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.activityData, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.onItemClick(item), index),
        b: index,
        c: $options.getImageUrl(item.bg)
      };
    }),
    b: common_vendor.sr("paging", "aeaf27eb-0"),
    c: common_vendor.o($options.fetchActivityList),
    d: common_vendor.o(($event) => $data.activityData = $event),
    e: common_vendor.p({
      modelValue: $data.activityData
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-aeaf27eb"], ["__file", "D:/uniapp/house/pages/activities/activities.vue"]]);
wx.createPage(MiniProgramPage);
