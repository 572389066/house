"use strict";class M{constructor({date:t,selected:e,startDate:a,endDate:s,range:l}={}){this.date=this.getDate(new Date),this.selected=e||[],this.startDate=a,this.endDate=s,this.range=l,this.cleanMultipleStatus(),this.weeks={},this.lastHover=!1}setDate(t){this.selectDate=this.getDate(t),this._getWeek(this.selectDate.fullDate)}cleanMultipleStatus(){this.multipleStatus={before:"",after:"",data:[]}}resetSatrtDate(t){this.startDate=t}resetEndDate(t){this.endDate=t}getDate(t,e=0,a="day"){t||(t=new Date),typeof t!="object"&&(t=t.replace(/-/g,"/"));const s=new Date(t);switch(a){case"day":s.setDate(s.getDate()+e);break;case"month":if(s.getDate()===31&&e>0)s.setDate(s.getDate()+e);else{const n=s.getMonth();s.setMonth(n+e);const r=s.getMonth();e<0&&n!==0&&r-n>e&&s.setMonth(r+(r-n+e)),e>0&&r-n>e&&s.setMonth(r-(r-n-e))}break;case"year":s.setFullYear(s.getFullYear()+e);break}const l=s.getFullYear(),h=s.getMonth()+1<10?"0"+(s.getMonth()+1):s.getMonth()+1,c=s.getDate()<10?"0"+s.getDate():s.getDate();return{fullDate:l+"-"+h+"-"+c,year:l,month:h,date:c,day:s.getDay()}}_getLastMonthDays(t,e){let a=[];for(let s=t;s>0;s--){const l=new Date(e.year,e.month-1,-s+1).getDate();a.push({date:l,month:e.month-1,disable:!0})}return a}_currentMonthDys(t,e){let a=[],s=this.date.fullDate;for(let l=1;l<=t;l++){let h=e.year+"-"+(e.month<10,e.month)+"-"+(l<10?"0"+l:l),c=s===h,n=this.selected&&this.selected.find(D=>{if(this.dateEqual(h,D.date))return D}),r=!0,u=!0;this.startDate&&(r=this.dateCompare(this.startDate,h)),this.endDate&&(u=this.dateCompare(h,this.endDate));let p=this.multipleStatus.data,g=!1,o=-1;this.range&&(p&&(o=p.findIndex(D=>this.dateEqual(D,h))),o!==-1&&(g=!0));let m={fullDate:h,year:e.year,date:l,multiple:this.range?g:!1,beforeMultiple:this.isLogicBefore(h,this.multipleStatus.before,this.multipleStatus.after),afterMultiple:this.isLogicAfter(h,this.multipleStatus.before,this.multipleStatus.after),month:e.month,disable:!(r&&u),isDay:c,userChecked:!1};n&&(m.extraInfo=n),a.push(m)}return a}_getNextMonthDays(t,e){let a=[];for(let s=1;s<t+1;s++)a.push({date:s,month:Number(e.month)+1,disable:!0});return a}getInfo(t){return t||(t=new Date),this.canlender.find(a=>a.fullDate===this.getDate(t).fullDate)}dateCompare(t,e){return t=new Date(t.replace("-","/").replace("-","/")),e=new Date(e.replace("-","/").replace("-","/")),t<=e}dateEqual(t,e){return t=new Date(t.replace("-","/").replace("-","/")),e=new Date(e.replace("-","/").replace("-","/")),t.getTime()-e.getTime()===0}isLogicBefore(t,e,a){let s=e;return e&&a&&(s=this.dateCompare(e,a)?e:a),this.dateEqual(s,t)}isLogicAfter(t,e,a){let s=a;return e&&a&&(s=this.dateCompare(e,a)?a:e),this.dateEqual(s,t)}geDateAll(t,e){var a=[],s=t.split("-"),l=e.split("-"),h=new Date;h.setFullYear(s[0],s[1]-1,s[2]);var c=new Date;c.setFullYear(l[0],l[1]-1,l[2]);for(var n=h.getTime()-24*60*60*1e3,r=c.getTime()-24*60*60*1e3,u=n;u<=r;)u=u+24*60*60*1e3,a.push(this.getDate(new Date(parseInt(u))).fullDate);return a}setMultiple(t){let{before:e,after:a}=this.multipleStatus;if(this.range){if(e&&a){if(!this.lastHover){this.lastHover=!0;return}this.multipleStatus.before=t,this.multipleStatus.after="",this.multipleStatus.data=[],this.multipleStatus.fulldate="",this.lastHover=!1}else e?(this.multipleStatus.after=t,this.dateCompare(this.multipleStatus.before,this.multipleStatus.after)?this.multipleStatus.data=this.geDateAll(this.multipleStatus.before,this.multipleStatus.after):this.multipleStatus.data=this.geDateAll(this.multipleStatus.after,this.multipleStatus.before),this.lastHover=!0):(this.multipleStatus.before=t,this.lastHover=!1);this._getWeek(t)}}setHoverMultiple(t){let{before:e,after:a}=this.multipleStatus;this.range&&(this.lastHover||(e?(this.multipleStatus.after=t,this.dateCompare(this.multipleStatus.before,this.multipleStatus.after)?this.multipleStatus.data=this.geDateAll(this.multipleStatus.before,this.multipleStatus.after):this.multipleStatus.data=this.geDateAll(this.multipleStatus.after,this.multipleStatus.before)):this.multipleStatus.before=t,this._getWeek(t)))}setDefaultMultiple(t,e){this.multipleStatus.before=t,this.multipleStatus.after=e,t&&e&&(this.dateCompare(t,e)?(this.multipleStatus.data=this.geDateAll(t,e),this._getWeek(e)):(this.multipleStatus.data=this.geDateAll(e,t),this._getWeek(t)))}_getWeek(t){const{fullDate:e,year:a,month:s,date:l,day:h}=this.getDate(t);let c=new Date(a,s-1,1).getDay(),n=new Date(a,s,0).getDate(),r={lastMonthDays:this._getLastMonthDays(c,this.getDate(t)),currentMonthDys:this._currentMonthDys(n,this.getDate(t)),nextMonthDays:[],weeks:[]},u=[];const p=42-(r.lastMonthDays.length+r.currentMonthDys.length);r.nextMonthDays=this._getNextMonthDays(p,this.getDate(t)),u=u.concat(r.lastMonthDays,r.currentMonthDys,r.nextMonthDays);let g={};for(let o=0;o<u.length;o++)o%7===0&&(g[parseInt(o/7)]=new Array(7)),g[parseInt(o/7)][o%7]=u[o];this.canlender=u,this.weeks=g}}function y(i,t){return`${S(i)} ${d(i,t)}`}function S(i){i=i,i=new Date(i);const t=i.getFullYear(),e=i.getMonth()+1,a=i.getDate();return`${t}-${f(e)}-${f(a)}`}function d(i,t){i=i,i=new Date(i);const e=i.getHours(),a=i.getMinutes(),s=i.getSeconds();return t?`${f(e)}:${f(a)}`:`${f(e)}:${f(a)}:${f(s)}`}function f(i){return i<10&&(i=`0${i}`),i}function w(i){return i?"00:00":"00:00:00"}function b(i,t){return i=new Date(i.replace(/-/g,"/")),t=new Date(t.replace(/-/g,"/")),i<=t}function v(i){const t=/((19|20)\d{2})(-|\/)\d{1,2}(-|\/)\d{1,2}/g;return i.match(t)}function k(i){return i}exports.Calendar=M;exports.checkDate=v;exports.dateCompare=b;exports.fixIosDateFormat=k;exports.getDate=S;exports.getDateTime=y;exports.getDefaultSecond=w;exports.getTime=d;