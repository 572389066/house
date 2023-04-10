"use strict";const e=require("../../../common/vendor.js"),o={data(){return{recordData:null,staffData:[],staff:null}},onLoad(s){s&&s.record&&(this.recordData=JSON.parse(decodeURIComponent(s.record)))},methods:{showStaffPicker(){this.$refs.staffPicker.open()},closeStaffPicker(){this.$refs.staffPicker.close()},bindStaff(s){this.staff=s,this.closeStaffPicker()},onClickSubmit(){if(!this.recordData||!this.recordData.id){this.$msg("获取客服信息出错");return}if(!this.staff||!this.staff.id){this.$msg("选择员工");return}e.index.showModal({title:"提示",content:"是否将当前客户转让给"+this.staff.username+"?",success:s=>{s.confirm?this.submitTransfer():s.cancel}})},submitTransfer(){this.$staffApi.submitTransfer(this.recordData.id,this.staff.id).then(s=>{this.$msg("转让成功"),setTimeout(()=>{e.index.navigateBack()},1e3)}).catch(s=>{})},fetchStaff(s,n){this.$staffApi.fetchStaff().then(f=>{this.$refs.staffPaging.complete(f)}).catch(f=>{this.$refs.staffPaging.complete(!1)})}}};if(!Array){const s=e.resolveComponent("uni-icons"),n=e.resolveComponent("z-paging"),f=e.resolveComponent("uni-popup");(s+n+f)()}const r=()=>"../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js",c=()=>"../../../uni_modules/z-paging/components/z-paging/z-paging.js",u=()=>"../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";Math||(r+c+u)();function p(s,n,f,h,i,a){return{a:e.t(i.recordData?i.recordData.user_phone:"--"),b:e.t(i.staff?i.staff.username:""),c:e.p({type:"right",color:"#333134",size:"28rpx"}),d:e.o(t=>a.showStaffPicker()),e:e.o(t=>a.onClickSubmit()),f:e.p({type:"closeempty",size:"20",color:"#999999"}),g:e.o((...t)=>a.closeStaffPicker&&a.closeStaffPicker(...t)),h:e.f(i.staffData,(t,l,d)=>({a:e.t(t.username),b:e.o(_=>a.bindStaff(t))})),i:e.sr("staffPaging","d054866e-2,d054866e-1"),j:e.o(a.fetchStaff),k:e.o(t=>i.staffData=t),l:e.p({fixed:!1,["loading-more-enabled"]:!1,modelValue:i.staffData}),m:e.sr("staffPicker","d054866e-1"),n:e.p({type:"bottom"})}}const m=e._export_sfc(o,[["render",p],["__file","D:/HBuilderProjects/house/pages/staff/qr/transfer.vue"]]);wx.createPage(m);