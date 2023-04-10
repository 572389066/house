"use strict";const n=require("../../../../../common/vendor.js"),h=require("./z-paging-static.js"),a=require("./z-paging-constant.js"),t=require("./z-paging-utils.js"),f=require("./modules/data-handle.js"),m=require("./modules/i18n.js"),p=require("./modules/nvue.js"),_=require("./modules/empty.js"),y=require("./modules/refresher.js"),S=require("./modules/load-more.js"),P=require("./modules/loading.js"),w=require("./modules/scroller.js"),T=require("./modules/back-to-top.js"),z=require("./modules/virtual-list.js"),I=require("./z-paging-enum.js"),b=()=>"../components/z-paging-refresh.js",x=()=>"../components/z-paging-load-more.js",B=()=>"../../z-paging-empty-view/z-paging-empty-view.js",c=n.index.getSystemInfoSync(),C={name:"z-paging",components:{zPagingRefresh:b,zPagingLoadMore:x,zPagingEmptyView:B},mixins:[f.dataHandleModule,m.i18nModule,p.nvueModule,_.emptyModule,y.refresherModule,S.loadMoreModule,P.loadingModule,w.scrollerModule,T.backToTopModule,z.virtualListModule],data(){return{base64Arrow:h.zStatic.base64Arrow,base64Flower:h.zStatic.base64Flower,base64BackToTop:h.zStatic.base64BackToTop,loadingType:I.Enum.LoadingType.Refresher,requestTimeStamp:0,chatRecordLoadingMoreText:"",wxsPropType:"",renderPropScrollTop:-1,checkScrolledToBottomTimeOut:null,systemInfo:null,cssSafeAreaInsetBottom:-1,cacheTopHeight:-1,insideOfPaging:-1,isLoadFailed:!1,isIos:c.platform==="ios",disabledBounce:!1,fromCompleteEmit:!1,disabledCompleteEmit:!1,wxsIsScrollTopInTopRange:!0,wxsScrollTop:0,wxsPageScrollTop:0,wxsOnPullingDown:!1}},props:{delay:{type:[Number,String],default:t.u.gc("delay",0)},minDelay:{type:[Number,String],default:t.u.gc("minDelay",0)},pagingStyle:{type:Object,default:function(){return t.u.gc("pagingStyle",{})}},height:{type:String,default:t.u.gc("height","")},width:{type:String,default:t.u.gc("width","")},bgColor:{type:String,default:t.u.gc("bgColor","")},pagingContentStyle:{type:Object,default:function(){return t.u.gc("pagingContentStyle",{})}},autoHeight:{type:Boolean,default:t.u.gc("autoHeight",!1)},autoHeightAddition:{type:[Number,String],default:t.u.gc("autoHeightAddition","0px")},defaultThemeStyle:{type:String,default:t.u.gc("defaultThemeStyle","black")},fixed:{type:Boolean,default:t.u.gc("fixed",!0)},safeAreaInsetBottom:{type:Boolean,default:t.u.gc("safeAreaInsetBottom",!1)},useSafeAreaPlaceholder:{type:Boolean,default:t.u.gc("useSafeAreaPlaceholder",!1)},topZIndex:{type:Number,default:t.u.gc("topZIndex",99)},superContentZIndex:{type:Number,default:t.u.gc("superContentZIndex",1)},contentZIndex:{type:Number,default:t.u.gc("contentZIndex",10)},autoFullHeight:{type:Boolean,default:t.u.gc("autoFullHeight",!0)},watchTouchDirectionChange:{type:Boolean,default:t.u.gc("watchTouchDirectionChange",!1)}},created(){this.createdReload&&!this.refresherOnly&&this.auto&&(this._startLoading(),this._preReload())},mounted(){this.wxsPropType=t.u.getTime().toString(),this.renderJsIgnore,!this.createdReload&&!this.refresherOnly&&this.auto&&this.$nextTick(()=>{this._preReload()}),this.finalUseCache&&this._setListByLocalCache();let e=0;e=100,this.$nextTick(()=>{this.systemInfo=n.index.getSystemInfoSync(),!this.usePageScroll&&this.autoHeight&&this._setAutoHeight(),this.loaded=!0}),this.updatePageScrollTopHeight(),this.updatePageScrollBottomHeight(),this._updateLeftAndRightWidth(),this.finalRefresherEnabled&&this.useCustomRefresher&&this.$nextTick(()=>{this.isTouchmoving=!0}),this._onEmit(),this.finalUseVirtualList&&this._virtualListInit(),this.$nextTick(()=>{setTimeout(()=>{this._getCssSafeAreaInsetBottom()},e)})},destroyed(){this._offEmit()},unmounted(){this._offEmit()},watch:{defaultThemeStyle:{handler(e){e.length&&(this.finalRefresherDefaultStyle=e)},immediate:!0},autoHeight(e){this.loaded&&!this.usePageScroll&&this._setAutoHeight(e)},autoHeightAddition(e){this.loaded&&!this.usePageScroll&&this.autoHeight&&this._setAutoHeight(e)}},computed:{finalPagingStyle(){const e=this.pagingStyle;if(!this.systemInfo)return e;const o=this.windowTop,i=this.windowBottom;return!this.usePageScroll&&this.fixed&&(o&&!e.top&&(e.top=o+"px"),i&&!e.bottom&&(e.bottom=i+"px")),this.bgColor.length&&!e.background&&(e.background=this.bgColor),this.height.length&&!e.height&&(e.height=this.height),this.width.length&&!e.width&&(e.width=this.width),e},finalLowerThreshold(){return t.u.convertToPx(this.lowerThreshold)},finalPagingContentStyle(){return this.contentZIndex!=1&&(this.pagingContentStyle["z-index"]=this.contentZIndex,this.pagingContentStyle.position="relative"),this.pagingContentStyle},safeAreaBottom(){if(!this.systemInfo)return 0;let e=0;return e=this.cssSafeAreaInsetBottom===-1?0:this.cssSafeAreaInsetBottom,e},renderJsIgnore(){return(this.usePageScroll&&this.useChatRecordMode||!this.refresherEnabled||!this.useCustomRefresher)&&this.$nextTick(()=>{this.renderPropScrollTop=10}),0},windowHeight(){return this.systemInfo&&this.systemInfo.windowHeight||0},windowTop(){return this.systemInfo&&this.systemInfo.windowTop||0},windowBottom(){if(!this.systemInfo)return 0;let e=this.systemInfo.windowBottom||0;return this.safeAreaInsetBottom&&!this.useSafeAreaPlaceholder&&(e+=this.safeAreaBottom),e},isOldWebView(){try{const e=c.system.split(" "),o=e[0],i=parseInt(e[1].slice(0,1));if(o==="iOS"&&i<=10||o==="Android"&&i<=6)return!0}catch{return!1}return!1},isIosAndH5(){return!1},zSlots(){return this.$slots}},methods:{getVersion(){return`z-paging v${a.c.version}`},setSpecialEffects(e){this.setListSpecialEffects(e)},setListSpecialEffects(e){this.nFixFreezing=e&&Object.keys(e).length,this.isIos&&(this.privateRefresherEnabled=0),this.usePageScroll||this.$refs["zp-n-list"].setSpecialEffects(e)},_doVibrateShort(){n.index.vibrateShort()},async _setAutoHeight(e=!0,o=null){let i="min-height";i="min-height";try{if(e){let s=o||await this._getNodeClientRect(".zp-scroll-view"),r=await this._getNodeClientRect(".zp-page-bottom");if(s){const u=s[0].top;let l=this.windowHeight-u;r&&(l-=r[0].height);const d=t.u.convertToPx(this.autoHeightAddition),g=l+d-(this.insideMore?1:0)+"px !important";this.$set(this.scrollViewStyle,i,g),this.$set(this.scrollViewInStyle,i,g)}}else this.$delete(this.scrollViewStyle,i),this.$delete(this.scrollViewInStyle,i)}catch{}},_getCssSafeAreaInsetBottom(){this._getNodeClientRect(".zp-safe-area-inset-bottom").then(e=>{e&&(this.cssSafeAreaInsetBottom=e[0].height,this.safeAreaInsetBottom&&this.updatePageScrollBottomHeight())})},_updateInsideOfPaging(){this.insideMore&&this.insideOfPaging===!0&&setTimeout(()=>{this.doLoadMore()},200)},_getNodeClientRect(e,o=!0,i=!1){let s=o?n.index.createSelectorQuery().in(o===!0?this:o):n.index.createSelectorQuery();return i?s.select(e).scrollOffset():s.select(e).boundingClientRect(),new Promise((r,u)=>{s.exec(l=>{r(l&&l!=""&&l!=null&&l.length?l:!1)})})},_cleanTimeout(e){return e&&(clearTimeout(e),e=null),e},_onEmit(){n.index.$on(a.c.errorUpdateKey,()=>{this.loading&&this.complete(!1)}),n.index.$on(a.c.completeUpdateKey,e=>{setTimeout(()=>{if(this.loading)if(this.disabledCompleteEmit)this.disabledCompleteEmit=!1;else{const o=e.type||"normal",i=e.list||e,s=e.rule;switch(this.fromCompleteEmit=!0,o){case"normal":this.complete(i);break;case"total":this.completeByTotal(i,s);break;case"nomore":this.completeByNoMore(i,s);break;case"key":this.completeByKey(i,s);break}}},1)})},_offEmit(){n.index.$off(a.c.errorUpdateKey),n.index.$off(a.c.completeUpdateKey)}}};exports._sfc_main=C;