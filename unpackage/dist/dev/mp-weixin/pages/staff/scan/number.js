"use strict";const i=require("../../../common/vendor.js"),c={data(){return{}},methods:{onClickSubmit(t){let e=t.detail.value.value;if(e===""){this.$msg("请填用户的领奖编码");return}if(e.length<6){this.$msg("请输入正确的领奖编码");return}i.index.showModal({title:"提示",content:"是否确认提交领奖码?",success:s=>{s.confirm?this.submitCode(e):s.cancel}})},submitCode(t){this.$staffApi.submitVerifyNumber(t).then(e=>{this.$msg("提交成功"),i.index.navigateBack()}).catch(e=>{console.log("submitCode err: "+JSON.stringify(e))})}}};function a(t,e,s,u,f,n){return{a:i.o((...r)=>n.onClickSubmit&&n.onClickSubmit(...r))}}const o=i._export_sfc(c,[["render",a],["__scopeId","data-v-ff4066e5"],["__file","D:/HBuilderProjects/house/pages/staff/scan/number.vue"]]);wx.createPage(o);