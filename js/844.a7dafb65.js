"use strict";(self["webpackChunksopimem"]=self["webpackChunksopimem"]||[]).push([[844],{6844:function(e,a,t){t.d(a,{Z:function(){return ea}});var l=t(6252),n=t(3577);const r={class:"card"},i={class:"card-header pb-0"},o={class:"card-body px-0 pt-0 pb-2"},s={class:"table-responsive p-0"},c={key:0,style:{"font-family":"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}},d={key:1,style:{"font-family":"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}},u={class:"car-details"},m=(0,l._)("br",null,null,-1),p=(0,l._)("br",null,null,-1),h={class:"p-fluid grid"},_={class:"field col-6"},f={class:"p-float-label"},v=(0,l._)("label",{for:"name"},"Nombre de tranche ",-1),w={class:"field col-6"},b={class:"p-float-label"},g=(0,l._)("label",{for:"name"},"N° Tranche ",-1),y={class:"field col-6"},x={class:"p-float-label"},T=(0,l._)("label",null,"Prochaine Rendez-vous Prévue",-1),k={class:"field col-6"},W={class:"p-float-label"},C=(0,l._)("label",{for:"name"},"Montant Prevus ",-1),P={class:"field col-6"},V={class:"p-float-label"},D=(0,l._)("label",null,"Prochaine Rendez-vous Réaliser",-1),S={class:"field col-6"},I={class:"p-float-label"},R=(0,l._)("label",{for:"name"},"Montant Réaliser ",-1),U=(0,l._)("br",null,null,-1),E=(0,l._)("br",null,null,-1),z={class:"p-fluid grid"},F={class:"field col-6"},O={class:"p-float-label"},H=(0,l._)("label",{for:"name"},"Numéro de la facture ",-1),L={class:"field col-6"},N={class:"p-float-label"},M=(0,l._)("label",{for:"name"},"Nombre de tranche ",-1),B={class:"field col-6"},q={class:"p-float-label"},A=(0,l._)("label",null,"Experation du contrat",-1),Z={class:"field col-6"},j={class:"p-float-label"},K=(0,l._)("label",{for:"name"},"N° Tranche ",-1),G={class:"field col-6"},$={class:"p-float-label"},J=(0,l._)("label",null,"Prochaine Rendez-vous Prévue",-1),Q={class:"field col-6"},X={class:"p-float-label"},Y=(0,l._)("label",{for:"name"},"Montant Prevus ",-1),ee={class:"field col-6"},ae={class:"p-float-label"},te=(0,l._)("label",null,"Prochaine Rendez-vous Réaliser",-1),le={class:"field col-6"},ne={class:"p-float-label"},re=(0,l._)("label",{for:"name"},"Montant Réaliser ",-1);function ie(e,a,t,ie,oe,se){const ce=(0,l.up)("ClientsCard"),de=(0,l.up)("Button"),ue=(0,l.up)("Toolbar"),me=(0,l.up)("Column"),pe=(0,l.up)("Row"),he=(0,l.up)("ColumnGroup"),_e=(0,l.up)("InputText"),fe=(0,l.up)("DataTable"),ve=(0,l.up)("InputNumber"),we=(0,l.up)("Calendar"),be=(0,l.up)("Dialog");return(0,l.wg)(),(0,l.iD)("div",r,[(0,l._)("div",i,[(0,l.Wm)(ce,{clientItems:ie.clientItems},null,8,["clientItems"]),(0,l.Wm)(ue,{class:"mb-4"},{end:(0,l.w5)((()=>[(0,l.Wm)(de,{label:"Export",icon:"pi pi-upload",class:"p-button-help",onClick:a[0]||(a[0]=e=>ie.exportCSV(ie.clientItems,ie.clientHistory))})])),_:1})]),(0,l._)("div",o,[(0,l._)("div",s,[(0,l.Wm)(fe,{editMode:"row",value:ie.clientHistory,ref:"dt",rowGroupMode:"rowspan",groupRowsBy:"montant_verser",sortMode:"single",sortField:"montant_verser",onCellEditComplete:se.onCellEditComplete,class:"bg-gray-600 dark-version editable-cells-table",editingRows:oe.editingRows,"onUpdate:editingRows":a[1]||(a[1]=e=>oe.editingRows=e),dataKey:"id",paginator:!0,rows:10,filters:oe.filters,resizableColumns:!0,columnResizeMode:"expand",showGridlines:"",paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[10,25,50],currentPageReportTemplate:"Showing {first} to {last} of {totalRecords} products",responsiveLayout:"scroll"},{default:(0,l.w5)((()=>[(0,l.Wm)(he,{type:"header"},{default:(0,l.w5)((()=>[(0,l.Wm)(pe,null,{default:(0,l.w5)((()=>[(0,l.Wm)(me,{header:"Echancier",rowspan:2}),(0,l.Wm)(me,{header:"Date",colspan:2}),(0,l.Wm)(me,{header:"Paiment",colspan:2}),(0,l.Wm)(me,{header:"Ecart Paiment",rowspan:2}),(0,l.Wm)(me,{header:"Versement Banque",colspan:3})])),_:1}),(0,l.Wm)(pe,null,{default:(0,l.w5)((()=>[(0,l.Wm)(me,{header:"Prévue",sortable:!0,field:"datePrevue"}),(0,l.Wm)(me,{header:"Réaliser",sortable:!0,field:"dateRealiser"}),(0,l.Wm)(me,{header:"Prévue",sortable:!0,field:"paimentPrevue"}),(0,l.Wm)(me,{header:"Réaliser",sortable:!0,field:"paimentRealiser"}),(0,l.Wm)(me,{header:"Date",sortable:!0,field:"dateVersement"}),(0,l.Wm)(me,{header:"Montant",sortable:!0,field:"montant"}),(0,l.Wm)(me,{header:"",sortable:!0,field:"modification"})])),_:1})])),_:1}),(0,l.Wm)(me,{field:"num_tranche",header:"",style:{width:"10%"}},{body:(0,l.w5)((({data:e,field:a})=>[1==e[a]?((0,l.wg)(),(0,l.iD)("span",c,(0,n.zw)(e[a])+" er Tranche",1)):((0,l.wg)(),(0,l.iD)("span",d,(0,n.zw)(e[a])+" eme Tranche",1))])),_:1}),(0,l.Wm)(me,{field:"prochaine_rdv_prevue",header:"datePrevue",style:{width:"10%"}},{body:(0,l.w5)((({data:e})=>[(0,l.Uk)((0,n.zw)(ie.formatDate(new Date(e.prochaine_rdv_prevue))),1)])),_:1}),(0,l.Wm)(me,{field:"prochaine_rdv_realise",header:"dateRealiser",style:{width:"10%"}},{body:(0,l.w5)((({data:e})=>[(0,l.Uk)((0,n.zw)(ie.formatDate(new Date(e.prochaine_rdv_realise))),1)])),_:1}),(0,l.Wm)(me,{field:"prix_prevue",header:"paimentPrevue",style:{width:"10%"}},{body:(0,l.w5)((({data:e})=>[(0,l._)("span",null,(0,n.zw)(e.prix_prevue),1)])),_:1}),(0,l.Wm)(me,{field:"prix_realise",header:"paimentRealiser",style:{width:"10%"}},{body:(0,l.w5)((({data:e})=>[(0,l.Uk)((0,n.zw)(e.prix_realise),1)])),_:1}),(0,l.Wm)(me,{field:"ecart_paiment",header:"paimentRealiser",style:{width:"10%"}},{editor:(0,l.w5)((({data:e,field:a})=>[(0,l.Wm)(_e,{modelValue:e[a],"onUpdate:modelValue":t=>e[a]=t},null,8,["modelValue","onUpdate:modelValue"])])),_:1}),(0,l.Wm)(me,{field:"montant_verser",header:"Date",style:{width:"10%"}},{body:(0,l.w5)((e=>[(0,l._)("div",u,[(0,l._)("span",null,(0,n.zw)(ie.formatDate(new Date(ie.date_verser_banque))),1)])])),_:1}),(0,l.Wm)(me,{field:"montant_verser",header:"Montant",footer:ie.montant_verser,style:{width:"15%"}},{body:(0,l.w5)((e=>[(0,l._)("span",null,(0,n.zw)(ie.montant_verser),1)])),_:1},8,["footer"]),(0,l.Wm)(he,{type:"footer"},{default:(0,l.w5)((()=>[(0,l.Wm)(pe,null,{default:(0,l.w5)((()=>[(0,l.Wm)(me,{footer:"Total Paiement:",colspan:3,footerStyle:"text-align:right"}),(0,l.Wm)(me,{footer:se.totalPaiementPrevus},null,8,["footer"]),(0,l.Wm)(me,{footer:se.totalPaiementRealiser},null,8,["footer"]),(0,l.Wm)(me,{footer:se.totalPaiementRester},null,8,["footer"]),(0,l.Wm)(me,{footer:"Total:",colspan:1,footerStyle:"text-align:right"}),(0,l.Wm)(me,{footer:ie.montant_verser,colspan:2},null,8,["footer"])])),_:1})])),_:1}),(0,l.Wm)(me,{headerStyle:"min-width:10rem;",header:"Opérations"},{body:(0,l.w5)((e=>[(0,l.Wm)(de,{style:{direction:"ltr"},onClick:a=>ie.deleteCanvaConfirm(e.data),icon:"pi pi-trash",label:"Supprimer",class:"p-button-outlined p-button-danger mb-2"},null,8,["onClick"])])),_:1})])),_:1},8,["value","onCellEditComplete","editingRows","filters"]),(0,l.Wm)(be,{visible:ie.editDatashow,"onUpdate:visible":a[9]||(a[9]=e=>ie.editDatashow=e),style:{width:"750px"},header:"Renseignements Logement",modal:!0,class:"p-fluid"},{footer:(0,l.w5)((()=>[(0,l.Wm)(de,{label:"Save",icon:"pi pi-check",class:"p-button-text",onClick:a[8]||(a[8]=e=>ie.editTranche(ie.rowEdit))})])),default:(0,l.w5)((()=>[m,p,(0,l._)("div",h,[(0,l._)("div",_,[(0,l._)("span",f,[(0,l.Wm)(_e,{inputId:"mile",disabled:!0,id:"name",modelValue:ie.rowEdit.nbr_tranche,"onUpdate:modelValue":a[2]||(a[2]=e=>ie.rowEdit.nbr_tranche=e)},null,8,["modelValue"]),v])]),(0,l._)("div",w,[(0,l._)("span",b,[(0,l.Wm)(ve,{inputId:"horizontal",min:0,max:ie.rowEdit.nbr_tranche,modelValue:ie.rowEdit.num_tranche,"onUpdate:modelValue":a[3]||(a[3]=e=>ie.rowEdit.num_tranche=e),showButtons:"",buttonLayout:"horizontal",step:1,decrementButtonClass:"p-button-danger",incrementButtonClass:"p-button-success",incrementButtonIcon:"pi pi-plus",decrementButtonIcon:"pi pi-minus"},null,8,["max","modelValue"]),g])]),(0,l._)("div",y,[(0,l._)("span",x,[(0,l.Wm)(we,{modelValue:ie.rowEdit.prochaine_rdv_prevue,"onUpdate:modelValue":a[4]||(a[4]=e=>ie.rowEdit.prochaine_rdv_prevue=e),showIcon:!0,dateFormat:"dd-mm-yy"},null,8,["modelValue"]),T])]),(0,l._)("div",k,[(0,l._)("span",W,[(0,l.Wm)(ve,{inputId:"horizontal",min:0,modelValue:ie.rowEdit.prix_prevue,"onUpdate:modelValue":a[5]||(a[5]=e=>ie.rowEdit.prix_prevue=e),mode:"currency",currency:"DZD"},null,8,["modelValue"]),C])]),(0,l._)("div",P,[(0,l._)("span",V,[(0,l.Wm)(we,{modelValue:ie.rowEdit.prochaine_rdv_realise,"onUpdate:modelValue":a[6]||(a[6]=e=>ie.rowEdit.prochaine_rdv_realise=e),showIcon:!0,dateFormat:"dd-mm-yy"},null,8,["modelValue"]),D])]),(0,l._)("div",S,[(0,l._)("span",I,[(0,l.Wm)(ve,{inputId:"mile",min:0,id:"name",modelValue:ie.rowEdit.prix_realise,"onUpdate:modelValue":a[7]||(a[7]=e=>ie.rowEdit.prix_realise=e),mode:"currency",currency:"DZD"},null,8,["modelValue"]),R])])])])),_:1},8,["visible"]),(0,l.Wm)(be,{visible:ie.showTrancheInput,"onUpdate:visible":a[20]||(a[20]=e=>ie.showTrancheInput=e),style:{width:"750px"},header:"Renseignements Logement",modal:!0,class:"p-fluid"},{footer:(0,l.w5)((()=>[(0,l.Wm)(de,{label:"Annuler",icon:"pi pi-check",class:"p-button-text",onClick:a[18]||(a[18]=a=>e.cancelTranche())}),(0,l.Wm)(de,{label:"Enregestrer",icon:"pi pi-check",class:"p-button-text",onClick:a[19]||(a[19]=e=>ie.addTranche(ie.dataTranche))})])),default:(0,l.w5)((()=>[U,E,(0,l._)("div",z,[(0,l._)("div",F,[(0,l._)("span",O,[(0,l.Wm)(_e,{disabled:!0,id:"name",modelValue:ie.dataTranche.num_facture,"onUpdate:modelValue":a[10]||(a[10]=e=>ie.dataTranche.num_facture=e)},null,8,["modelValue"]),H])]),(0,l._)("div",L,[(0,l._)("span",N,[(0,l.Wm)(_e,{inputId:"mile",disabled:!0,id:"name",modelValue:ie.dataTranche.new_tranche.nbr_tranche,"onUpdate:modelValue":a[11]||(a[11]=e=>ie.dataTranche.new_tranche.nbr_tranche=e)},null,8,["modelValue"]),M])]),(0,l._)("div",B,[(0,l._)("span",q,[(0,l.Wm)(_e,{disabled:!0,modelValue:ie.dataTranche.fin_contrat,"onUpdate:modelValue":a[12]||(a[12]=e=>ie.dataTranche.fin_contrat=e),showIcon:!0,dateFormat:"dd-mm-yy"},null,8,["modelValue"]),A])]),(0,l._)("div",Z,[(0,l._)("span",j,[(0,l.Wm)(ve,{inputId:"horizontal",min:0,max:ie.dataTranche.new_tranche.nbr_tranche,modelValue:ie.dataTranche.new_tranche.num_tranche,"onUpdate:modelValue":a[13]||(a[13]=e=>ie.dataTranche.new_tranche.num_tranche=e),showButtons:"",buttonLayout:"horizontal",step:1,decrementButtonClass:"p-button-danger",incrementButtonClass:"p-button-success",incrementButtonIcon:"pi pi-plus",decrementButtonIcon:"pi pi-minus"},null,8,["max","modelValue"]),K])]),(0,l._)("div",G,[(0,l._)("span",$,[(0,l.Wm)(we,{modelValue:ie.dataTranche.new_tranche.prochaine_rdv_prevue,"onUpdate:modelValue":a[14]||(a[14]=e=>ie.dataTranche.new_tranche.prochaine_rdv_prevue=e),showIcon:!0,dateFormat:"dd-mm-yy"},null,8,["modelValue"]),J])]),(0,l._)("div",Q,[(0,l._)("span",X,[(0,l.Wm)(ve,{inputId:"horizontal",min:0,modelValue:ie.dataTranche.new_tranche.prix_prevue,"onUpdate:modelValue":a[15]||(a[15]=e=>ie.dataTranche.new_tranche.prix_prevue=e),mode:"currency",currency:"DZD"},null,8,["modelValue"]),Y])]),(0,l._)("div",ee,[(0,l._)("span",ae,[(0,l.Wm)(we,{modelValue:ie.dataTranche.new_tranche.prochaine_rdv_realise,"onUpdate:modelValue":a[16]||(a[16]=e=>ie.dataTranche.new_tranche.prochaine_rdv_realise=e),showIcon:!0,dateFormat:"dd-mm-yy"},null,8,["modelValue"]),te])]),(0,l._)("div",le,[(0,l._)("span",ne,[(0,l.Wm)(ve,{inputId:"mile",min:0,id:"name",modelValue:ie.dataTranche.new_tranche.prix_realise,"onUpdate:modelValue":a[17]||(a[17]=e=>ie.dataTranche.new_tranche.prix_realise=e),mode:"currency",currency:"DZD"},null,8,["modelValue"]),re])])])])),_:1},8,["visible"])])])])}const oe={class:"card"},se=(0,l._)("h5",{class:"text-danger"},"Calendrier des paiements ",-1),ce=(0,l.Uk)(" Information sur le client "),de={class:"mb-2 text-lg"},ue=(0,l.Uk)(" Client: "),me={class:"text-dark font-weight-bold ms-sm-2"},pe={class:"mb-2 text-lg"},he=(0,l.Uk)(" Prix en T.T.C: "),_e={class:"text-dark ms-sm-2 font-weight-bold"},fe={key:0,class:"mb-2 text-lg"},ve=(0,l.Uk)(" N° Los: "),we={class:"text-dark ms-sm-2 font-weight-bold"},be=(0,l.Uk)(" -- N° box: "),ge={key:0,class:"text-dark ms-sm-2 font-weight-bold"},ye={key:1,class:"mb-2 text-lg"},xe=(0,l.Uk)(" N° du box: "),Te={class:"text-dark ms-sm-2 font-weight-bold"},ke={key:2,class:"mb-2 text-lg"},We=(0,l.Uk)(" N° du Locale: "),Ce={class:"text-dark ms-sm-2 font-weight-bold"},Pe={key:3,class:"text-lg"},Ve=(0,l.Uk)(" Projet: "),De={class:"text-dark ms-sm-2 font-weight-bold"},Se={key:4,class:"text-lg"},Ie=(0,l.Uk)(" Projet: "),Re={class:"text-dark ms-sm-2 font-weight-bold"},Ue={key:5,class:"text-lg"},Ee=(0,l.Uk)(" Projet: "),ze={class:"text-dark ms-sm-2 font-weight-bold"},Fe={class:"ms-auto text-end"},Oe=(0,l.Uk)(" TVA: "),He={class:"text-dark ms-sm-2 front-weight-bold"},Le=(0,l._)("br",null,null,-1),Ne={class:"mb-2 text-lg"},Me=(0,l.Uk)(" Soldé à ");function Be(e,a,t,r,i,o){const s=(0,l.up)("Divider"),c=(0,l.up)("ProgressBar"),d=(0,l.up)("Card");return(0,l.wg)(),(0,l.iD)("div",oe,[(0,l.Wm)(s,{align:"center",type:"dotted"},{default:(0,l.w5)((()=>[se])),_:1}),(0,l.Wm)(d,{style:{width:"25rem","margin-bottom":"2em"}},{title:(0,l.w5)((()=>[ce])),content:(0,l.w5)((()=>[(0,l._)("p",de,[ue,(0,l._)("span",me,(0,n.zw)(r.client.client.nom)+" "+(0,n.zw)(r.client.client.prenom),1)]),(0,l._)("p",pe,[he,(0,l._)("span",_e,(0,n.zw)(r.client.prix_TTC)+" DA",1)]),null!=r.client.appartement?((0,l.wg)(),(0,l.iD)("p",fe,[ve,(0,l._)("span",we,(0,n.zw)(r.client.appartement.num_lot)+" - "+(0,n.zw)(r.client.appartement.type),1),be,null!=r.client.appartement.box?((0,l.wg)(),(0,l.iD)("span",ge,(0,n.zw)(r.client.appartement.box.num_place),1)):(0,l.kq)("",!0)])):(0,l.kq)("",!0),null!=r.client.box?((0,l.wg)(),(0,l.iD)("p",ye,[xe,(0,l._)("span",Te,(0,n.zw)(r.client.box.num_place),1)])):(0,l.kq)("",!0),null!=r.client.locale?((0,l.wg)(),(0,l.iD)("p",ke,[We,(0,l._)("span",Ce,(0,n.zw)(r.client.locale.num_place),1)])):(0,l.kq)("",!0),null!=r.client.appartement?((0,l.wg)(),(0,l.iD)("p",Pe,[Ve,(0,l._)("span",De,(0,n.zw)(r.client.appartement.residance.designation),1)])):null!=r.client.locale?((0,l.wg)(),(0,l.iD)("p",Se,[Ie,(0,l._)("span",Re,(0,n.zw)(r.client.locale.residance.designation),1)])):null!=r.client.box?((0,l.wg)(),(0,l.iD)("p",Ue,[Ee,(0,l._)("span",ze,(0,n.zw)(r.client.box.residance.designation),1)])):(0,l.kq)("",!0),(0,l._)("div",Fe,[Oe,(0,l._)("span",He,(0,n.zw)(r.client.TVA),1)]),Le,(0,l._)("div",Ne,[Me,(0,l.Wm)(c,{value:r.client.tranches_data.length<=0?100:r.calculePocentage(r.client.tranches_data)},null,8,["value"])])])),_:1})])}var qe=t(2262),Ae={name:"client-card",props:{clientItems:Object},setup(e){const a=(0,qe.iH)();function t(e){let a=e.length,t=[];return e.forEach((e=>{e.prix_realise>=e.prix_prevue&&t.push(e)})),parseFloat(t.length/a*100).toFixed(2)}return a.value=e.clientItems,{client:a,calculePocentage:t}}},Ze=t(3744);const je=(0,Ze.Z)(Ae,[["render",Be]]);var Ke=je,Ge=(t(381),t(6358)),$e=t(9201),Je=t(1039),Qe=t(7877),Xe={props:{client:Object,listeFactureClient:Function,editclient:Function,clientDialog:Boolean},setup(e){(0,qe.iH)(0);const a=(0,qe.iH)(),t=((0,qe.iH)(""),(0,qe.iH)(e.client.tranches_data)),l=(0,qe.iH)(e.client.montant_verser),n=(0,qe.iH)(e.client.date_verser_banque),r=(0,qe.iH)(),i=(0,Je.N)(),o=(0,$e.p)(),s=e=>e.toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"}),c=function(){let a=0;return e.client.tranches_data.forEach((function(e){a+=parseFloat(e.montant_verser)})),a};function d(a){Qe.Z.post("/tranches/",a.new_tranche).then((a=>{console.log(e.clientDialog),e.listeFactureClient(),e.editclient(e.client),e.clientDialog=!1,o.add({severity:"success",summary:"Successful",detail:"Tranche ajouter avec succés",life:3e3}),v.value=!1})).catch((e=>console.log(e)))}function u(a){console.log("dataTrancheED",a),Qe.Z.put("/tranches/",a).then((a=>{e.listeFactureClient(),o.add({severity:"success",summary:"Successful",detail:"Canva Deleted",life:3e3}),b.value=!1})).catch((e=>console.log(e)))}function m(e,a){Qe.Z.get("http://localhost:8000/api/v1/facture-clients/export/?num_facture="+e.num_facture,{params:{num_facture:e.num_facture},responseType:"blob"}).then((e=>{if(204!=e.status){const a=window.URL.createObjectURL(new Blob([e.data])),t=document.createElement("a");t.href=a,t.setAttribute("download","Facture_Client.xlsx"),document.body.appendChild(t),t.click(),o.add({severity:"success",summary:"Successful",detail:"Operation completed successfully",life:1e3})}else o.add({severity:"error",summary:"Erreur",detail:"il n'est à pas des données à exporter",life:1500})})).catch((e=>{o.add({severity:"error",summary:"Erreur",detail:"L'opération n'est pas terminée avec succès",life:1e3})})),console.log("object")}function p(a){Qe.Z["delete"]("/tranches/",{params:{id:a.id}}).then((a=>{e.listeFactureClient(),o.add({severity:"success",summary:"Successful",detail:"Tranche supprimer avec succés",life:3e3})})).catch((e=>console.log(e)))}function h(e){i.require({message:"Etes-vous sûr de vouloir supprimer cette tranche",header:"Confirmation",icon:"pi pi-exclamation-triangle",accept:()=>{p(e)},reject:()=>{o.add({severity:"success",summary:"Successful",detail:"Opération annuler",life:3e3})}})}t.value.montant_verser=l.value,t.value.date_verser_banque=n.value,a.value=e.client;const _=(0,qe.iH)(),f=(0,qe.iH)({nbr_tranche:"",num_tranche:0,fact_client:"",prix_prevue:0,prochaine_rdv_prevue:new Date,prix_realise:0,prochaine_rdv_realise:new Date}),v=(0,qe.iH)(!1);function w(e,a){console.log("product",e),_.value=e;let t=_.value.nbr_tranche,l=_.value.num_tranche,n=_.value.fact_client;_.value["new_tranche"]=f,_.value.new_tranche.prochaine_rdv_prevue=_.value.prochaine_rdv_prevue,_.value.new_tranche.prix_prevue=_.value.prix_prevue,_.value.new_tranche.nbr_tranche=t,_.value.new_tranche.num_tranche=parseInt(l)+1,_.value.new_tranche.fact_client=n,_.value.fin_contrat=a.fin_contrat,_.value.num_facture=a.num_facture,v.value=!0}const b=(0,qe.iH)(!1),g=(0,qe.iH)({nbr_tranche:"",num_tranche:0,fact_client:"",prix_prevue:0,prochaine_rdv_prevue:new Date,prix_realise:0,prochaine_rdv_realise:new Date});function y(e){g.value=e,b.value=!0}return{addTranche:d,deleteCanvaConfirm:h,showDialogueTranche:w,editDatashow:b,rowEdit:g,editCanva:y,editTranche:u,showTrancheInput:v,dataTranche:_,clientItems:a,clientHistory:t,date_verser_banque:n,montant_verser:l,formatDate:s,totalVersement:c,exportCSV:m,dt:r}},computed:{totalPaiementPrevus:function(){let e=0;return this.client.tranches_data.forEach((function(a){e+=parseFloat(a.prix_prevue)})),e},totalPaiementRealiser:function(){let e=0;return this.client.tranches_data.forEach((function(a){null==a.prix_realise&&(a.prix_realise=0),e+=parseFloat(a.prix_realise)})),e},totalPaiementRester:function(){let e=0;return e=this.totalPaiementPrevus-this.totalPaiementRealiser,e}},components:{ClientsCard:Ke},name:"authors-table",data(e){return{editingRows:[],columns:null,client:e.client.tranches_data,products2:null,products3:null,statuses:[{label:"In Stock",value:"INSTOCK"},{label:"Low Stock",value:"LOWSTOCK"},{label:"Out of Stock",value:"OUTOFSTOCK"}],filters:{ecahncierPaiment:{value:null,matchMode:Ge.a6.STARTS_WITH},Nom:{value:null,matchMode:Ge.a6.STARTS_WITH},"Prénom":{value:null,matchMode:Ge.a6.STARTS_WITH},Poids:{value:null,matchMode:Ge.a6.STARTS_WITH},Taille:{value:null,matchMode:Ge.a6.STARTS_WITH}}}},created(){this.initFilters(),this.columns=[{field:"ecahncierPaiment",header:"ecahncierPaiment"}]},methods:{getClient(){},onCellEditComplete(e){let{data:a,newValue:t,field:l}=e;switch(l){case"quantity":case"price":this.isPositiveInteger(t)?a[l]=t:e.preventDefault();break;default:t.trim().length>0?a[l]=t:e.preventDefault();break}},isPositiveInteger(e){let a=String(e);if(a=a.trim(),!a)return!1;a=a.replace(/^0+/,"")||"0";var t=Math.floor(Number(a));return t!==1/0&&String(t)===a&&t>=0},onRowEditSave(e){let{newData:a,index:t}=e;this.client[t]=a},getStatusLabel(e){switch(e){case"INSTOCK":return"In Stock";case"LOWSTOCK":return"Low Stock";case"OUTOFSTOCK":return"Out of Stock";default:return"NA"}},nextPage(){this.submitted=!0,this.validateForm()&&(this.$store.commit("setPatient","patient"),this.$emit("next-page",{formData:{num_doss:this.num_doss,nom:this.nom,prenom:this.prenom,adress:this.adress,sexe:this.sexe,date_naissance:this.date_naissance,date_dece:this.date_dece,age:this.age},pageIndex:0}))},initFilters(){this.filters={global:{value:null,matchMode:Ge.a6.CONTAINS}}}}};const Ye=(0,Ze.Z)(Xe,[["render",ie]]);var ea=Ye}}]);
//# sourceMappingURL=844.a7dafb65.js.map