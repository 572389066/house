"use strict";function c(){let i=this.waitingQueue=[],s=this.isRunning=!1;function a(n,u,t){n().then(e=>{u(e)}).catch(e=>{t(e)}).finally(()=>{if(i.length){const e=i.shift();a(e.task,e.resolve,e.reject)}else s=!1})}this.exec=function(n){return new Promise((u,t)=>{s?i.push({task:n,resolve:u,reject:t}):(s=!0,a(n,u,t))})}}const f=new c,l=new c;exports.queueDraw=f;exports.queueLoadImage=l;