<template>
    <div class="card">
    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                 <Divider align="center" type="dotted">
                    <label v-if="localeLang=='ar'" for="raison_social"  >{{ar.headerstep}}</label>
                    <label v-else-if="localeLang == 'fr'" for="raison_social">{{fr.headerstep}}</label>
                    <label v-else for="raison_social">{{en.headerstep}}</label>
                </Divider>
            </template>

            <template v-slot:content>
                <DataTable :value="sitesProductions" editMode="row" dataKey="denomination"  responsiveLayout="scroll" columnResizeMode="fit" showGridlines>
                    <template #header>
                        <div class="flex justify-content-between">
                            <MultiSelect v-model="selectedColumns" :options="columns" optionLabel="header"
                                @update:modelValue="onToggle" :placeholder='localeLang=="ar"?"اختر العمود الذي تريد تعيينه":(localeLang=="fr")?"Choisissez votre filtre":"Choose your filter"'
                                :virtualScrollerOptions="{ itemSize: 44 }" :maxSelectedLabels="3"
                                @selectall-change="onSelectAllChange($event)" />
                        </div>
                    </template>
                    <Toolbar class="mb-4">
                        <template #start>
                            <Button :label='(localeLang=="ar")?"إضافة":(localeLang=="fr")?"Ajouter":"ADD"'  icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                        </template>

                    </Toolbar>
                    
                    <Column field="designation" :header='(localeLang=="ar")?"اسم الشركة":(localeLang=="fr")? "Dénomination" :"Company Name"' style="width:20%">
                        <template #editor="{ data, field }">
                            <InputText v-model="data[field]" />
                        </template>
                    </Column>

                    <Column v-for="(col, index) of selectedColumns" :field="col.field" :header="col.header"
                        :key="col.field + '_' + index" :sortable="true" style="white-space: normal !important;">
                        <template #editor="{ data, field }">
                            <InputText v-model="data[field]" />
                        </template>
                    </Column>

                    <Column style="width:1.5%">
                        <template #header>
                            Actions
                        </template>
                        <template #body="slotProps" >
                            <span class="">
                                <SplitButton style="direction:ltr" @click="openDialogueDetail(slotProps.data.id)" 
                                label="Détails" icon="pi pi-eye" 
                                :model="[{label: 'Edit',icon:'pi pi-pencil',command: ()=>{
                                    editDetail(slotProps.data.id)}},{label: 'Delete',icon:'pi pi-trash',command: ()=>{
                                    confirmDrop(slotProps.data.id)}}]" class="p-button-outlined p-button-secondary mb-2">
                                </SplitButton>
                            </span>
                        </template>
                    </Column>
                   
                </DataTable>
            </template>
            <template v-slot:footer>
                
            </template>
        </Card><br/>
        <div class="grid grid-nogutter justify-content-between">
            <Button :label='(localeLang=="ar")?"العودة":(localeLang=="fr")?"Retour":"Back"' @click="prevPage1()" :icon='localeLang=="ar"?"pi pi-angle-right":"pi pi-angle-left"' />
            <Button :label='(localeLang=="ar")?"التالي":(localeLang=="fr")?"Suivant":"Next"' @click="nextPage1()" :icon='localeLang=="ar"?"pi pi-angle-left":"pi pi-angle-right"' iconPos="right" />
        </div>
        <Dialog  v-model:visible="dialogDetail" :style="{ width: '700px' }" :header='(localeLang=="ar")?"أضف موقعًا جديدًا":(localeLang=="fr")?"Ajouter un nouveaux site":"Add a New Site"' :modal="true"
            class="p-fluid">
            <div class="formgrid grid">
                <div class="field col">
                    <span class="p-float-label">
                        <InputText id="denomination" v-model="rowEditDetail.designation" :disabled="desabledInputs"  />
                        <label v-if="localeLang=='ar'" for="denomination">{{ar.denomination}} </label>
                        <label v-else-if="localeLang=='fr'"  for="denomination">{{fr.denomination}} </label>
                        <label v-else for="denomination">{{en.denomination}} </label>
                    </span>
                </div>
            </div>
            <div class="formgrid grid">
                <div class="field col">
                    <span class="p-float-label">
                        <InputText id="addressSiege" v-model="address.addressSiege"  :disabled="desabledInputs" />
                        <label v-if="localeLang=='ar'" for="addressSiege">{{ar.adresseSiege}} </label>
                        <label v-else-if="localeLang=='fr'"  for="addressSiege">{{fr.adresseSiege}} </label>
                        <label v-else for="addressSiege">{{en.adresseSiege}} </label>
                    </span>
                </div>
            </div>   
            <div class="formgrid grid" >
                <div class="field col-12 md:col-6" style="padding-top: 10px;">
                    <span class="p-float-label">
                        <Dropdown id="dropdown" v-model="rowEditDetail.situation_foncier" :options="situationFoncierClasses" optionLabel="name" optionValue="value" :disabled="desabledInputs"/>
                        <label v-if="localeLang=='ar'" for="name">{{ar.situation_foncier}} </label>
                        <label v-else-if="localeLang=='fr'"  for="name">{{fr.situation_foncier}} </label>
                        <label v-else for="name">{{en.situation_foncier}} </label>
                    </span>
                </div>
                <div class="field col-12 md:col-6" style="padding-top: 10px;">
                    <span class="p-float-label">
                        <Dropdown id="dropdown" v-model="rowEditDetail.lieu_implantation" :options="lieuImplantationClasses" optionLabel="name" optionValue="value" :disabled="desabledInputs"/>
                        <label v-if="localeLang=='ar'" for="name">{{ar.lieuImplantation}} </label>
                        <label v-else-if="localeLang=='fr'"  for="name">{{fr.lieuImplantation}} </label>
                        <label v-else for="name">{{en.lieuImplantation}} </label>
                        
                    </span>
                </div>
                
                 <div class="field col-12 md:col-6" style="padding-top: 10px;">
                    <span class="p-float-label">
                            <Dropdown id="dropdown" v-model="address.wilaya" :options="Wilayas"
                                :optionLabel="localeLang == 'ar' ? 'ar_name' : 'name'" optionValue="code"
                                @change="getCommuneByWilaya()" :disabled="desabledInputs"/>
                            <label v-if="localeLang == 'ar'" for="dropdown">{{ ar.wilaya }} </label>
                            <label v-else-if="localeLang == 'fr'" for="dropdown">{{ fr.wilaya }} </label>
                            <label v-else for="dropdown">{{ en.wilaya }} </label>
                        </span>
                </div>
                 <div class="field col-12 md:col-6" style="padding-top: 10px;">
                    <span class="p-float-label">
                            <Dropdown id="dropdown" v-model="address.commune"  :options="communesByWilaya"
                                :optionLabel="localeLang == 'ar' ? 'commune_name' : 'commune_name_ascii'" :disabled="desabledInputs"/>
                            <label v-if="localeLang == 'ar'" for="dropdown">{{ ar.commune }} </label>
                            <label v-else-if="localeLang == 'fr'" for="dropdown">{{ fr.commune }} </label>
                            <label v-else for="dropdown">{{ en.commune }} </label>
                        </span>
                </div>
            </div>
            <template #footer>
                <Button v-show="!desabledInputs"  :label='(localeLang=="ar")?"حفظ":(localeLang=="fr")?"Entregistrer":"Save"' icon="pi pi-check" class="p-button-text" @click="editSite" />
            </template>
        </Dialog>
        <Dialog v-model:visible="addNewSite" :style="{ width: '700px' }" :header='(localeLang=="ar")?"أضف موقعًا جديدًا":(localeLang=="fr")?"Ajouter un nouveaux site":"Add a New Site"' :modal="true"
            class="p-fluid">
            <br/>
            <div class="formgrid grid">
                <div class="field col">
                    <span class="p-float-label">
                        <InputText id="denomination" v-model="designation"  />
                        <label v-if="localeLang=='ar'" for="denomination">{{ar.denomination}} </label>
                        <label v-else-if="localeLang=='fr'"  for="denomination">{{fr.denomination}} </label>
                        <label v-else for="denomination">{{en.denomination}} </label>
                    </span>
                </div>
            </div>
            <div class="formgrid grid">
                <div class="field col">
                    <span class="p-float-label">
                        <InputText id="addressSiege" v-model="address.addressSiege" />
                        <label v-if="localeLang=='ar'" for="addressSiege">{{ar.adresseSiege}} </label>
                        <label v-else-if="localeLang=='fr'"  for="addressSiege">{{fr.adresseSiege}} </label>
                        <label v-else for="addressSiege">{{en.adresseSiege}} </label>
                    </span>
                </div>
            </div>   
            <div class="formgrid grid" >
                <div class="field col-12 md:col-6" style="padding-top: 10px;">
                    <span class="p-float-label">
                        <Dropdown id="dropdown" v-model="situation_foncier" :options="situationFoncierClasses" optionLabel="name" optionValue="value"/>
                        <label v-if="localeLang=='ar'" for="name">{{ar.situation_foncier}} </label>
                        <label v-else-if="localeLang=='fr'"  for="name">{{fr.situation_foncier}} </label>
                        <label v-else for="name">{{en.situation_foncier}} </label>
                    </span>
                </div>
                <div class="field col-12 md:col-6" style="padding-top: 10px;">
                    <span class="p-float-label">
                        <Dropdown id="dropdown" v-model="lieu_implantation" :options="lieuImplantationClasses" optionLabel="name" optionValue="value" />
                        <label v-if="localeLang=='ar'" for="name">{{ar.lieuImplantation}} </label>
                        <label v-else-if="localeLang=='fr'"  for="name">{{fr.lieuImplantation}} </label>
                        <label v-else for="name">{{en.lieuImplantation}} </label>
                        
                    </span>
                </div>
                
                 <div class="field col-12 md:col-6" style="padding-top: 10px;">
                    <span class="p-float-label">
                            <Dropdown id="dropdown" v-model="address.wilaya" :options="Wilayas"
                                :optionLabel="localeLang == 'ar' ? 'ar_name' : 'name'" optionValue="code"
                                @change="getCommuneByWilaya()" />
                            <label v-if="localeLang == 'ar'" for="dropdown">{{ ar.wilaya }} </label>
                            <label v-else-if="localeLang == 'fr'" for="dropdown">{{ fr.wilaya }} </label>
                            <label v-else for="dropdown">{{ en.wilaya }} </label>
                        </span>
                </div>
                 <div class="field col-12 md:col-6" style="padding-top: 10px;">
                    <span class="p-float-label">
                            <Dropdown id="dropdown" v-model="address.commune" :options="communesByWilaya"
                                :optionLabel="localeLang == 'ar' ? 'commune_name' : 'commune_name_ascii'" />
                            <label v-if="localeLang == 'ar'" for="dropdown">{{ ar.commune }} </label>
                            <label v-else-if="localeLang == 'fr'" for="dropdown">{{ fr.commune }} </label>
                            <label v-else for="dropdown">{{ en.commune }} </label>
                        </span>
                </div>
            </div>

            

            <!--<RadioButton name="experience.contrainte" value="Non levés" v-model="product2.contrainte" v-show="false"/>-->
            <template #footer>
                <Button :label='(localeLang=="ar")?"حفظ":(localeLang=="fr")?"Entregistrer":"Save"' icon="pi pi-check" class="p-button-text" @click="addSite" />
            </template>
        </Dialog>
        <Toast />
        <ConfirmDialog></ConfirmDialog>
    </div>
</div>
</template>

<script>

import { reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex';
import api from '../../api';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import Wilayas from '../../../public/data/algeria/wilaya.json'
import Algeria from '../../../public/data/algeria/algeria_cities.json'
export default {
    emits: ["nextpage", "prevpage"],

    setup(_, { emit }) {
        const store=useStore()
        const confirm = useConfirm();
        const toast = useToast();
        // const addressSiege = ref(null)
        const address = reactive({wilaya:null,commune:null,addressSiege:null})
        const communesByWilaya = ref([])
        const localeLang=ref(store.state.user.localeLang)
        const siteProductionHeaders= reactive({
            ar:{
                headerstep:"المعلومات الخاصة بموقع الإنتاج",
                secteurActivite:"قطاع النشاط",
                denomination:"اسم الشركة",
                abreviation:" الاختصار",
                adresseSiege:"عنوان المقر الإجتماعي",
                lieuImplantation:"مكان التركيب",
                wilaya:"الولاية",
                commune:"البلدية",
                situation_foncier:"الوضع الأرضي",
               confirm_drop:"هل أنت متأكد أنك تريد حذف هذا الموقع؟",

                
            },
            fr:{
                headerstep:"Informations sur le site de production",
                secteurActivite:"Secteur d'Activite",
                denomination:"Dénomination",
                abreviation:"Abréviation",
               adresseSiege:"Adresse du siège social",
               lieuImplantation:"Lieu de l'implantation",
               wilaya:"Wilaya",
               commune:"Commune",
               situation_foncier:"Situation Foncier",
               confirm_drop:"Voulez-vous vraiment supprimer ce site ?",
               
            },
            en:{
                headerstep:"Manager Information",
                
                secteurActivite:"Sector of activity",
                denomination:"Denomination",
                abreviation:"Abbreviation",
                adresseSiege:"Registered Address",
                lieuImplantation:"place of installation",
                wilaya:"Wilaya",
                commune:"Commune",
                situation_foncier:"Land situation",
               confirm_drop:"Are you sure you want to delete this user?",

            }
        })
        const addNewSite = ref(false)
        const selectedColumns = ref(null)
        const situationFoncierClasses=ref([{name:"CESSION",value:"CESSION"},{name:"CONCESSION",value:"CONCESSION"},{name:"LOCATION",value:"LOCATION"},{name:"PROPRIETE PRIVE",value:"PRIVE"}])
        const lieuImplantationClasses=ref([{name:"ZA",value:"ZA"},{name:"ZI",value:"ZI"},{name:"HORS (ZA|ZI)",value:"HORS_ZA_ZI"}])
        const newSite= reactive({ situation_foncier :'',designation:'',address,lieu_implantation:''})
        const rowEditDetail=ref({})
        const sitesProductions = ref([])
        const editingRows = ref(null)
        const columns = ref(null)
        const dialogDetail=ref(false)
        function getCommuneByWilaya() {
            communesByWilaya.value = Algeria.filter(commune=>commune.wilaya_code==address.wilaya)
            communesByWilaya.value.sort((a,b)=>{return a.id>b.id})
        }

        function changeAdress() {
            commune.value.address = addressSiege.value
            sitesProductions.address = JSON.stringify(commune.value)
        }
        function getAllRows(){
            api.get('/site-production/')
            .then((response)=>{
                sitesProductions.value=response.data
                console.log(response.data);
            }).catch((error)=>{console.log("error",error);})
        }
        
        function getAllProductionEntreprise(id){
            api.get('productions/site-productions/',{ params: { id: id } })
            .then((response)=>{
                // console.log(response.data);
                response.data.forEach((element) => {
                    element.address=JSON.parse(element.address)
                }
 
                );
                console.log(sitesProductions);
                sitesProductions.value=response.data
                
            }).catch((error)=>{console.log("error",error);})
        }
        getAllProductionEntreprise("5645ff84-a8b8-42a4-83ef-3b0137109abb")
        function getDetailRow(id){
            console.log(sitesProductions.value);
            rowEditDetail.value = sitesProductions.value.find(row=>row.id==id) 
            
        }
        const desabledInputs=ref(false)
        function openDialogueDetail(id){
            dialogDetail.value=true
            desabledInputs.value=true
            getDetailRow(id)
        }
        function editDetail(id){
            dialogDetail.value=true
            desabledInputs.value=false
            getDetailRow(id)
        }
        function openNew() {
            addNewSite.value = true;
        }
        function addSite(){
            newSite.address=JSON.stringify(address)
            console.log(JSON.stringify(address));
            api.post('/site-production/',newSite)
            .then(response => {
                console.log(response.data)
                getAllProductionEntreprise("5645ff84-a8b8-42a4-83ef-3b0137109abb")
                toast.add({severity:'success', summary: 'Successful', detail: 'user created Successfully', life: 1000});
            })
            .catch(error => {
                console.log(error.response.data)
            })
            newSite.value={}
            addNewSite.value = false;

        }
        function editSite(){
            rowEditDetail.value.address=JSON.stringify(address)
            console.log('eowEditDetail:'+rowEditDetail.value);
            api.put(`/site-production/${rowEditDetail.value.id}/`, rowEditDetail.value)
             .then(response => {
                 console.log("respoanse",response.data);
                 getAllProductionEntreprise("5645ff84-a8b8-42a4-83ef-3b0137109abb")
                //  toast.add({severity:'success', summary: 'Successful', detail: 'user created Successfully', life: 1000});

             })
             .catch(function (error) {
                console.log(error.response)
             })
            console.log(rowEditDetail.value);
            dialogDetail.value=false
        }
        function dropSite(id){

            api.delete(`/site-production/`+id)
            .then((response)=>{
                //users.value = response.data
                console.log(response.data);
                getAllProductionEntreprise("5645ff84-a8b8-42a4-83ef-3b0137109abb")
			    // toast.add({severity:'success', summary: 'Successful', detail: 'user deleted', life: 1000});
                // setTimeout(()=>{
                //     router.go()
                // },500)

            }).catch((error)=>{
                toast.add({severity:'error', summary: 'Error', detail: 'user undeleted: '+error.message, life: 1000});
            })
            
            dialogDetail.value=false
        }
        function confirmDrop(id){
            confirm.require({
                message: localeLang.value=="ar"?siteProductionHeaders.ar.confirm_drop:localeLang.value=='fr'?siteProductionHeaders.fr.confirm_drop:siteProductionHeaders.en.confirm_drop,
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    console.log('id from lockUser accept = '+id);
                    dropSite(id)
                },
                reject: () => {
                    toast.add({severity:'success', summary: 'Successful', detail: 'Delete user canceled', life: 1000});
                }
            })
        }
        function nextPage1() {
            console.log("object")
            emit('nextpage', { formData: { }, pageIndex: 2 });

        }

        function prevPage1() {
            //console.log(emit('prevpage', {pageIndex: 1}));
            emit('prevpage', { pageIndex: 2 });
        }
        // function onRowEditSave(event) {            
        //     let { newData, index } = event;
        //     sitesProductions[index] = newData;
        // }
        function tableData() {
            columns.value = [
                // {field: 'name', header: 'Name'},
                // { field: 'Dénomination', header: 'Dénomination' },
                // { field: 'abreviation',header: (localeLang.value=="fr")?siteProductionHeaders.fr.abreviation:(localeLang.value=="ar")?siteProductionHeaders.ar.abreviation:siteProductionHeaders.en.abreviation },
                //  { field: 'secteurActivite',header: (localeLang.value=="fr")?siteProductionHeaders.fr.secteurActivite:(localeLang.value=="ar")?siteProductionHeaders.ar.secteurActivite:siteProductionHeaders.en.secteurActivite },
                  { field: 'situation_foncier',header: (localeLang.value=="fr")?siteProductionHeaders.fr.situation_foncier:(localeLang.value=="ar")?siteProductionHeaders.ar.situation_foncier:siteProductionHeaders.en.situation_foncier  },
                  { field: 'address.addressSiege',header: (localeLang.value=="fr")?siteProductionHeaders.fr.adresseSiege:(localeLang.value=="ar")?siteProductionHeaders.ar.adresseSiege:siteProductionHeaders.en.adresseSiege},
                  { field: (localeLang.value=="ar")?'address.commune.wilaya_name':'address.commune.wilaya_name_ascii',header: (localeLang.value=="fr")?siteProductionHeaders.fr.wilaya:(localeLang.value=="ar")?siteProductionHeaders.ar.wilaya:siteProductionHeaders.en.wilaya },
                  { field: (localeLang.value=="ar")?'address.commune.commune_name':'address.commune.commune_name_ascii',header: (localeLang.value=="fr")?siteProductionHeaders.fr.commune :(localeLang.value=="ar")?siteProductionHeaders.ar.commune :siteProductionHeaders.en.commune},
                  { field: 'lieu_implantation',header: (localeLang.value=="fr")?siteProductionHeaders.fr.lieuImplantation:(localeLang.value=="ar")?siteProductionHeaders.ar.lieuImplantation:siteProductionHeaders.en.lieuImplantation },
                  

            ];
            selectedColumns.value=columns.value

        }
        function onToggle(value) {
            console.log(value);
            selectedColumns.value = columns.value.filter(col => value.includes(col));
        }
        function onSelectAllChange(event) {
            selectedColumns = event.checked
                ? sitesProductions.map((item) => item.value)
                : [];

        }
        tableData()
        return {
            editingRows,columns,desabledInputs,
            sitesProductions,confirm,toast,
            selectedColumns,

            dialogDetail,rowEditDetail,situationFoncierClasses,lieuImplantationClasses,Wilayas,communesByWilaya,
            nextPage1,
            prevPage1,
            onSelectAllChange,
            openDialogueDetail,editDetail,editSite,dropSite,confirmDrop,getAllRows,
            getAllProductionEntreprise,getCommuneByWilaya,changeAdress,

            onToggle,
            openNew,addSite,
            addNewSite,
            localeLang,...toRefs(siteProductionHeaders),...toRefs(newSite),
        }
    }

}
</script>