"use strict";(self["webpackChunksopimem"]=self["webpackChunksopimem"]||[]).push([[269],{5269:function(e,t,l){l.r(t),l.d(t,{default:function(){return D}});var n=l(6252),i=l(3577);const a={class:"grid"},s={class:"col-12 xl:col-4"},o={class:"card"},c=(0,n._)("div",{class:"flex align-items-center justify-content-between mb-4"},[(0,n._)("h5",null,"Notifications"),(0,n._)("div")],-1),r={ref:"notificationUl",class:"p-0 mx-0 mt-0 mb-4 list-none",style:{"min-height":"350px",height:"500px",overflow:"auto"}},u={class:"flex align-items-center py-2 border-bottom-1 surface-border link-active"},d=(0,n._)("div",{class:"w-3rem h-3rem flex align-items-center justify-content-center bg-green-100 border-circle mr-3 flex-shrink-0"},[(0,n._)("i",{class:"pi pi-bell text-xl text-green-500"})],-1),f={class:"flex flex-column ml-3",style:{"flex-grow":"1"}},v={class:"flex align-items-center justify-content-between mb-1"},m={key:0,class:"flex align-items-center py-2 border-bottom-1 surface-border link-active"},g=(0,n.uE)('<div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0"><i class="pi pi-bell text-xl text-blue-500"></i></div><div class="flex flex-column ml-3" style="flex-grow:1;"><div class="flex align-items-center justify-content-between mb-1"><span class="text-700 font-bold">No message recieved found</span></div><span class="text-700">No data to present</span></div>',2),p=[g];function x(e,t,l,g,x,b){const w=(0,n.up)("Tag"),_=(0,n.up)("router-link"),h=(0,n.up)("router-view");return(0,n.wg)(),(0,n.iD)("div",a,[(0,n._)("div",s,[(0,n._)("div",o,[c,(0,n._)("ul",r,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(g.listNofitications,(e=>((0,n.wg)(),(0,n.j4)(_,{key:e.id,to:{name:"notif-details",params:{id:e.id}}},{default:(0,n.w5)((()=>[(0,n._)("li",u,[d,(0,n._)("div",f,[(0,n._)("div",v,[(0,n._)("span",{class:(0,i.C_)(["font-bold",e.opened?"text-500":"text-900"])},[(0,n.Uk)((0,i.zw)(e.subject)+"  ",1),e.opened?(0,n.kq)("",!0):((0,n.wg)(),(0,n.j4)(w,{key:0,class:"mr-2",severity:"warning",value:"Unread",rounded:!0}))],2),(0,n._)("small",null,(0,i.zw)(g.getMomentDate(e.created_at)),1)]),(0,n._)("span",{class:(0,i.C_)(e.opened?"text-500":"text-900")},(0,i.zw)(e.content.substring(0,50)+"..."),3)])])])),_:2},1032,["to"])))),128)),g.listNofitications.length?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("li",m,p))],512)])]),(0,n.Wm)(h,{name:"notifviewdetails"})])}var b=l(2262),w=l(3907),_=l(7877),h=l(2201),k=(l(9201),l(381)),y=l.n(k),j={name:"Notifications",setup(){const e=(0,w.oR)(),t=((0,h.yj)(),(0,b.iH)(localStorage.getItem("localeLang"))),l=(0,b.iH)([]),i=(0,b.iH)(""),a=(0,b.iH)(!0);function s(){_.Z.get("/notifications/?send_to="+e.state.user.id+"&ordering=-created_at").then((e=>{l.value=e.data.results.data,i.value=e.data.next,a.value=!1})).catch((e=>console.log(e)))}function o(e){const l=new Date(e);y().locale("ar"==t.value?"ar-dz":"fr"==t.value?"fr-fr":"en-us");let n=y()(l).fromNow();return n}function c(e){_.Z.put("/notifications/"+e+"/set_opened/").then((t=>{let n=l.value.findIndex((t=>t.id===e));l.value[n]=t.data})).catch((e=>{console.log(e)}))}s();const r=(0,b.iH)(null);function u(){a.value=!0,r.value.onscroll=()=>{let e=r._value.scrollHeight-r._value.scrollTop===r._value.offsetHeight;e&&null!==i.value&&_.Z.get(i.value).then((e=>{l.value.push(...e.data.results.data),i.value=e.data.next,a.value=!1})).catch((e=>console.log(e)))}}return(0,h.ao)(((e,t,n)=>{let i=l.value.find((t=>t.id==e.params.id&&!t.opened));void 0!=i?(c(e.params.id),n(!1)):n()})),(0,n.bv)((()=>u())),{localeLang:t,listNofitications:l,nextNotifications:i,scrollToLoad:a,getMomentDate:o,notificationUl:r}}},N=l(3744);const H=(0,N.Z)(j,[["render",x]]);var D=H}}]);
//# sourceMappingURL=269.3bf52d73.js.map