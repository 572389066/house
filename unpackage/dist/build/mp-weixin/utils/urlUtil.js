"use strict";const t=require("./request.js");function e(t){return null!=t?t.indexOf("?")>=0?t+"&x-oss-process=image/resize,h_500,w_500":t+"?x-oss-process=image/resize,h_500,w_500":t}const n={getImgUrl:function(n){return""==n||null==n||0===n.length?"":-1!=n.indexOf("https://")||-1!=n.indexOf("http://")?e(n+""):n.startsWith("/")?e(t.HOST_IMG+n):e(t.HOST_IMG+"/"+n)},getImgUrlNotSize:function(e){return""==e||null==e?"":-1!=e.indexOf("https://")||-1!=e.indexOf("http://")?e+"":e.startsWith("/")?t.HOST_IMG+e:t.HOST_IMG+"/"+e},isVideo:function(t){if(t){if(t.indexOf(".")>=0){let e=t.substring(t.lastIndexOf("."));return".mp4"===e||".m4v"===e||".3gp"===e||".rmvb"===e||".rm"===e||".mpg"===e||".mpeg"===e||".mpe"===e||".avi"===e||".dat"===e||".mkv"===e||".flv"===e||".vob"===e||".wmv"===e||".asf"===e||".asx"===e}return!1}return!1},getFullUrl:function(t){return""==t||null==t?"":-1!=t.indexOf("https://")||-1!=t.indexOf("http://")?t+"":"http://"+t}};exports.urlUtil=n;