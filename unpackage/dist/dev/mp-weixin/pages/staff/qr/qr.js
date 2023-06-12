"use strict";
const utils_cache = require("../../../utils/cache.js");
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      channel: null,
      currentBuilding: null,
      qrCodeImage: null,
      role: "1",
      scene: "",
      intervalId: null,
      clientRecord: [],
      salesRecord: [],
      toastIntervalId: null,
      taostClientData: [],
      toastSalesData: []
    };
  },
  onLoad(option) {
    if (option.id && option.name) {
      this.channel = {
        id: option.id,
        name: option.name
      };
    } else {
      this.$msg("获取渠道失败");
    }
    this.currentBuilding = utils_cache.cache.getCurrentBuilding();
    if (!this.currentBuilding) {
      this.$msg("请先选择楼盘");
    }
    this.fetchCheckCode();
  },
  onUnload() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.toastIntervalId) {
      clearInterval(this.toastIntervalId);
    }
  },
  methods: {
    onClickReset() {
      this.qrCodeImage = null;
      this.fetchCheckCode();
    },
    onChangeRole() {
      if ("2" === this.role) {
        this.role = "1";
      } else {
        this.role = "2";
      }
    },
    fetchCheckCode() {
      this.$staffApi.fetchCheckCode(this.currentBuilding.id, this.channel.id).then((res) => {
        this.qrCodeImage = res;
        this.scene = res.scene;
        this.startInterval();
      }).catch((err) => {
        this.qrCodeImage = null;
      });
    },
    fetchScanRecord() {
      this.$staffApi.fetchScanRecord(this.scene).then((res) => {
        this.clientRecord = res.client;
        this.salesRecord = res.sales;
      }).catch((err) => {
        this.clientRecord = [];
        this.salesRecord = [];
      });
    },
    startInterval() {
      let that = this;
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      this.intervalId = setInterval(function() {
        that.fetchScanRecord();
      }, 2e3);
    }
    // handleLastRecord() {
    // 	if ()
    // }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.channel
  }, $data.channel ? {
    b: common_vendor.t($data.channel.name)
  } : {}, {
    c: $data.qrCodeImage
  }, $data.qrCodeImage ? common_vendor.e({
    d: $data.role === "1"
  }, $data.role === "1" ? {
    e: $data.qrCodeImage.client
  } : $data.role === "2" ? {
    g: $data.qrCodeImage.sales
  } : {}, {
    f: $data.role === "2"
  }) : {}, {
    h: $data.channel && $data.role === "2"
  }, $data.channel && $data.role === "2" ? {} : $data.role === "1" ? {} : {}, {
    i: $data.role === "1",
    j: $data.role === "1"
  }, $data.role === "1" ? {} : {}, {
    k: $data.role === "2"
  }, $data.role === "2" ? {} : {}, {
    l: common_vendor.o(($event) => $options.onChangeRole()),
    m: common_vendor.o(($event) => $options.onClickReset()),
    n: $data.role === "1"
  }, $data.role === "1" ? common_vendor.e({
    o: $data.clientRecord
  }, $data.clientRecord ? {
    p: common_vendor.t($data.clientRecord.length)
  } : {}, {
    q: $data.clientRecord
  }, $data.clientRecord ? {
    r: common_vendor.f($data.clientRecord, (item, index, i0) => {
      return {
        a: common_vendor.t(item.phone)
      };
    })
  } : {}) : $data.role === "2" ? common_vendor.e({
    t: $data.salesRecord
  }, $data.salesRecord ? {
    v: common_vendor.f($data.salesRecord, (item, index, i0) => {
      return {
        a: common_vendor.t(item.phone)
      };
    })
  } : {}) : {}, {
    s: $data.role === "2"
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ed94f8f7"], ["__file", "D:/uniapp/house/pages/staff/qr/qr.vue"]]);
wx.createPage(MiniProgramPage);
