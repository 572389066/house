"use strict";const a=require("../../common/vendor.js"),c={data(){return{scanResult:""}},onLoad(){this.scanCode()},methods:{scanCode(){let e=this;a.index.scanCode({scanType:["WX_CODE"],success:s=>{e.scanResult=s.path;let t=e.getPageParams(s.path),n=e.getPageName(s.path);t&&t.buildingId&&t.scene?n=="/signIn"?a.index.redirectTo({url:"/pages/register/signIn?buildingId="+t.buildingId+"&scene="+t.scene}):n=="/register"?a.index.redirectTo({url:"/pages/register/register?buildingId="+t.buildingId+"&scene="+t.scene}):e.scanCode():e.scanCode()},fail:s=>{e.scanResult="",a.index.navigateBack()},complete:()=>{}})},getPageParams(e){if(e&&e!=""){let s=e.indexOf("?");return s==-1&&(s=0),e.substring(s+1,e.length).split("&").map(n=>n.split("=")).reduce((n,r)=>{const[i,d]=r;return n[i]=d,n},{})}else return null},getPageName(e){let s=e.indexOf("?"),t=e.lastIndexOf("/");return t>=0?s>0?e.substring(t,s):e:s>0?e.substring(s):e}}};function g(e,s,t,n,r,i){return{}}const l=a._export_sfc(c,[["render",g],["__file","D:/HBuilderProjects/house/pages/register/scan.vue"]]);wx.createPage(l);