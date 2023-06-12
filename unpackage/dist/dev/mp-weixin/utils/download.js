"use strict";
const common_vendor = require("../common/vendor.js");
getApp();
const download = {
  /**
   * 保存图片
   * url 图片url地址
   * is_video是否视频
   */
  saveImage: function(url, is_video) {
    let that = this;
    common_vendor.index.authorize({
      scope: "scope.writePhotosAlbum",
      success: () => {
        that.downLoadImg(url, is_video);
      },
      fail: () => {
        common_vendor.index.getSetting({
          success: (result) => {
            if (!result.authSetting["scope.writePhotosAlbum"]) {
              that.isAuth();
            }
          }
        });
      }
    });
  },
  /**
   * 下载资源，保存图片到系统相册
   */
  downLoadImg: function(url, is_video) {
    common_vendor.index.showLoading({
      title: "加载中"
    });
    common_vendor.index.downloadFile({
      url,
      success: (res) => {
        common_vendor.index.hideLoading();
        if (res.statusCode === 200) {
          if (is_video == false) {
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function() {
                common_vendor.index.showToast({
                  title: "已保存到相册",
                  icon: "none"
                });
              },
              fail: function() {
                common_vendor.index.showToast({
                  title: "保存失败，请稍后重试",
                  icon: "none"
                });
              }
            });
          } else {
            common_vendor.index.saveVideoToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function() {
                common_vendor.index.showToast({
                  title: "已保存到相册",
                  icon: "none"
                });
              },
              fail: function() {
                common_vendor.index.showToast({
                  title: "保存失败，请稍后重试",
                  icon: "none"
                });
              }
            });
          }
        } else {
          common_vendor.index.showToast({
            title: "资源格式错误，请联系管理员",
            icon: "none"
          });
        }
      },
      fail: (err) => {
        common_vendor.index.showToast({
          title: "保存失败，请联系管理员",
          icon: "none"
        });
      }
    });
  },
  /*
   * 引导用户开启权限
   */
  isAuth: function() {
    common_vendor.index.showModal({
      content: "由于您还没有允许保存图片到您相册里,无法进行保存,请点击确定允许授权",
      success: (res) => {
        if (res.confirm) {
          common_vendor.index.openSetting({
            success: (result) => {
              console.log(result.authSetting);
            }
          });
        }
      }
    });
  }
};
exports.download = download;
