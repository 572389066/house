"use strict";const n=require("./request.js");function u(e){return e==""||e===void 0||e===null||e.length===0?"":e.indexOf("https://")!=-1||e.indexOf("http://")!=-1?f(e+""):e.startsWith("/")?f(n.HOST_IMG+e):f(n.HOST_IMG+"/"+e)}function r(e){return e==""||e===void 0||e===null?"":e.indexOf("https://")!=-1||e.indexOf("http://")!=-1?e+"":e.startsWith("/")?n.HOST_IMG+e:n.HOST_IMG+"/"+e}function f(e){if(e!=null){var i=e.indexOf("?");return i>=0?e+"&x-oss-process=image/resize,h_500,w_500":e+"?x-oss-process=image/resize,h_500,w_500"}return e}function s(e){if(e){var i=e.indexOf(".");if(i>=0){let t=e.substring(e.lastIndexOf("."));return t===".mp4"||t===".m4v"||t===".3gp"||t===".rmvb"||t===".rm"||t===".mpg"||t===".mpeg"||t===".mpe"||t===".avi"||t===".dat"||t===".mkv"||t===".flv"||t===".vob"||t===".wmv"||t===".asf"||t===".asx"}else return!1}else return!1}function l(e){return e==""||e===void 0||e===null?"":e.indexOf("https://")!=-1||e.indexOf("http://")!=-1?e+"":"http://"+e}const d={getImgUrl:u,getImgUrlNotSize:r,isVideo:s,getFullUrl:l};exports.urlUtil=d;