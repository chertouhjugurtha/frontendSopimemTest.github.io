<template>
    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                <Divider align="center" type="dotted">Fiche Client</Divider>
            </template>

            <template v-slot:content>
                <div class="p-fluid grid">
                    <div class="field col-6">
                        <span class="p-float-label">
                            <!-- <InputText id="name" v-model="new_contrat.nomResidence" /> -->
                            <!-- <Dropdown :editable="true" id="nomResidence" v-model="selectResidence" :options="residanceClass" @change="residance_change($event,'locale')"  optionLabel="designation"  /> -->
                            <AutoComplete v-model="selectResidence"   @onDropdownClick="searchResidence($event)" :dropdown="true"
                                :suggestions="filteredResidences" :options="residanceClass"
                                @complete="searchResidence($event)" @change="searchResidence($event)" optionLabel="designation">
                                <template #item="slotProps">
                                    <div class="country-item">
                                        <!-- {{slotProps.item}} -->

                                        <div class="ml-2">{{slotProps.item.designation}}</div>
                                    </div>
                                </template>
                            </AutoComplete>
                            <label for="name">Nom résidance </label>
                        </span>
                    </div>
                    <!-- <div class="field col-6 ">
                        <span class="p-float-label">

                            <Calendar v-model="contrat_date" :showIcon="true" dateFormat="yy-mm-dd" />
                            <label>Contrat Du</label>
                        </span>
                    </div> -->
                    <div v-show="showSelectProperiter" class="field col-6">
                        <span class="p-float-label">
                            <Dropdown id="dropdown" v-model="type_choisie" :options="type_class"
                                @change="functionShow($event)"
                                :optionLabel="type_class.label==''?'Appartement':'label'" />
                            <label for="name">Choisissez ... </label>
                        </span>
                    </div>
                    <!-- :style="(type_choisie.value=='AP'  || type_choisie.value=='' )?'display:block':'display:none'" -->
                    
                    
                    <div class="field col-6">
                        <!-- :style="( type_choisie.value=='LC' )?'display:block':'display:none'" -->
                        <span v-show="stationnementBool" class="p-float-label">
                            <!-- <Dropdown  :editable="true"   id="nomResidence" v-model="selectStationnement"  
                            :options="Boxclass"   optionLabel="num_place"  /> -->

                            <AutoComplete v-model="selectStationnement"   @onDropdownClick="searchStationnement($event)" :dropdown="true"
                                :suggestions="filteredStationnement" :options="Boxclass"
                                @complete="searchStationnement($event)"  optionLabel="num_place">
                                <template #item="slotProps">
                                    <div class="country-item">
                                        <!-- {{slotProps.item}} -->

                                        <div class="ml-2">{{slotProps.item.num_place}}</div>
                                    </div>
                                </template>
                            </AutoComplete>

                            <!-- <AutoComplete optionGroupLabel="residence" optionGroupChildren="place_stationnement"
                                v-model="selectStationnement" :suggestions="filteredStationnement"
                                @complete="searchStationnement($event)" :dropdown="true" 
                                optionLabel="num_place" forceSelection>
                                <template #item="slotProps">
                                    <div class="country-item">
                                        {{slotProps.item}}
                                        
                                        <div class="ml-2">{{slotProps.item.num_place}}</div>
                                        <div class="ml-2">{{slotProps.item.etage_place}}</div>
                                    </div>
                                </template>
                            </AutoComplete> -->
                            <label for="func">Place de Stationnement</label>
                        </span>
                        <span v-show="localBool" class="p-float-label">
                            <AutoComplete 
                                v-model="selectedLocale" :suggestions="filteredLocal" @onDropdownClick="searchLocal($event)"
                                @complete="searchLocal($event)" :options="Localesclass"
                                :dropdown="true" field="num_place" optionLabel="num_place" >
                                <template #item="slotProps">
                                    <div class="country-item">

                                        <!-- <div class="ml-2">{{slotProps.item}}</div> -->
                                        <div class="ml-2">{{slotProps.item.num_place}}</div>
                                    </div>
                                </template>
                            </AutoComplete>
                            <label for="prenom">Lot N°</label>
                        </span>
                        
                    </div>
                    <div class="field col-6">
                        <!-- :style="(type_choisie.value=='AP' )?'display:block':'display:none'"  -->
                        <span v-show="appartementBool" class="p-float-label">
                            <AutoComplete 
                                v-model="selectedLot" :suggestions="filteredLot" @complete="searchLotapp($event)" 
                                @onDropdownClick="searchLotapp($event)" :dropdown="true" @change="selectedAppartement($event)" field="num_lot" 
                                :options="Appartementclass" optionLabel="num_lot" >
                                <template #item="slotProps">
                                    <div class="country-item">
                                        <!-- <div class="ml-2">{{slotProps.item}}</div> -->
                                        <div class="ml-2">{{slotProps.item.num_lot}}</div>
                                    </div>
                                </template>
                            </AutoComplete>
                            <label for="prenom">Lot N°</label>
                        </span>
                    </div>
                    <div v-show="appartementBool" class="field col-6">
                        <span class="p-float-label">
                            <InputText :disabled="true"   id="name" v-model="newAppartement.type" />
                            <label for="name">Type </label>
                        </span>
                    </div>
                    <div v-show="appartementBool" class="field col-6">
                        <span class="p-float-label">
                            <InputText :disabled="true"   id="name" v-model="newAppartement.etage" />
                            <label for="name">Etage </label>
                        </span>
                    </div>
                    <div v-show="appartementBool" class="field col-6">
                        <span class="p-float-label">
                            <InputText :disabled="true"   id="name" v-model="newAppartement.superficier" />
                            <label for="name">Superficier </label>
                        </span>
                    </div>
        
                </div>
            </template>
            <template v-slot:footer>
                <div class="grid grid-nogutter justify-content-between">
                    <Button label="Back" @click="prevPage1()" icon="pi pi-angle-left" />
                    <i></i>
                    <!-- "pi pi-angle-left":"pi pi-angle-right"' -->
                    <Button label="Suivant" @click="nextPage1"
                        icon="pi pi-angle-right" iconPos="right" />
                </div>
            </template>
        </Card>
    </div>
</template>
<script>
import { reactive, ref, onMounted } from 'vue'
// import ResidenceService from '../../service/ResidenceService';
import { FilterService, FilterMatchMode } from 'primevue/api';
import moment from "moment";
import { useStore } from 'vuex';
import api from '../../api';
import { or } from '@vuelidate/validators';
export default {
    emits: ["nextpage", "prevpage"],

    setup(_, { emit }) {
        // onMounted(() => {
        //     residenceGet.value.getResidences().then(data => appartementsData.value = data);
        // })
        const addBiens = ref(false)
        // const contrat_date = ref(new Date().toLocaleDateString())

        const appartementBool = ref(false)
        const stationnementBool = ref(false)
        const localBool = ref(false)
        const showSelectProperiter=ref(false)

        const selectResidence = ref({ designation: "", id: "" })
        const selectType = ref('')
        const selectLot = ref('')
        const selectLocal = ref('')
        const selectStationnement = ref('')
        const selectedLot=ref('')
        const selectedLocale=ref('')

        const filteredResidences = ref()
        const filteredType = ref()
        const filteredLot = ref()
        const filteredLocal = ref()
        const filteredStationnement = ref()

        const type_choisie = ref({label: '', value: ''})
        const type_class = ref([
            { label: 'Appartement', value: 'AP' },
            { label: 'Place de Stationnement', value: 'PS' },
            { label: 'Locale', value: 'LC' }
        ])
        const newAppartement=ref({selectResidence: '', selectStationnement: '',prix_ht:'',etage:'', type: '', superficier: '', num_lot: '',})
        const newBox=ref({})
        const newLocale=ref({})
        // contrat_date.appContext.config.globalProperties.$moment(res.data.contratDate).format('DD-MM-YYYY')
        const new_contrat = ref({ nomResidence: '', biens: '',etage:'', type: '', superficier: '', numLot: '', numLocale: '', placeStationnement: '', contratDate: new Date().toLocaleDateString('en-GB') })
        const logements = reactive([{ nomResidence: 'Bella vista', biens: 'ddffff', type: 'F3', numLot: 1, placeStationnement: '100', contratDate: "02-07-2020" },
        { nomResidence: 'Foresta', biens: 'mmmmm', type: 'F5', numLot: 2, placeStationnement: '50', contratDate: "18-12-2018" },
        { nomResidence: 'Bella vista', biens: 'dsdxz', type: 'F3', numLot: 3, placeStationnement: '20', contratDate: "20-07-2020" }])
        // newClient.contratDate=contrat_date.appContext.config.globalProperties.$moment(classes[0].contratDate).format('DD-MM-YYYY')
        const editing_rows = ref(null)
        // console.log(type_choisie.value)
        const columns = ref([
            // {field: 'name', header: 'Name'},
            { field: 'biens', header: 'Type du Biens' },
            { field: 'type', header: 'Type' },
            { field: 'numLot', header: 'Numéro du Lot' },
            { field: 'numLocale', header: 'Numéro du Locale' },
            { field: 'placeStationnement', header: 'Place de Stationnement' },
            { field: 'contratDate', header: 'Date Du Contrat' },
        ])
        const selectedColumns = ref(columns.value)
        const selectedSeat = ref('')
        // const filteredTarif = ref();
        const residanceClass = ref([])
        function getResidances() {
            api.get('/residence/').then(responce => {
                residanceClass.value = []
                responce.data.results.forEach((element) => {
                    residanceClass.value.push({ designation: element.designation, id: element.id })
                })
            })
            .catch(error => {
                errormessage.value = error.response.data
                console.log(errormessage.value.nom);
                toast.add({ severity: 'error', summary: 'Error', detail: 'unable to create new gerant : ' + error.message + ' :\n' + errormessage.value, life: 4000 });
            })
        }
        const Boxclass = ref([])
        const Localesclass=ref([])
        const Appartementclass=ref([])


        function searchResidence(event) {
            if(selectResidence.value.designation!=""){
                showSelectProperiter.value=true
            }
            let query = event.query;
            let newFilteredAppartements = [];
            let filteredItems = FilterService.filter(residanceClass.value, ['designation'], query, FilterMatchMode.STARTS_WITH);
            if (filteredItems && filteredItems.length) {
                newFilteredAppartements.push(...filteredItems);
                
            }
            filteredResidences.value = newFilteredAppartements;
            

            // console.log("event",event.value);            
        }
        function getBoxs(selectResidence) {
            api.get('/box/',{params:{residance:selectResidence.value.id}}).then(responce=>{
                Boxclass.value=[]
                // console.log('object',responce.data);
                responce.data.forEach((element) => {
                    Boxclass.value.push({num_place: element.num_place,prix_ht:element.prix_ht,etage_place:element.etage,id:element.id})
                    // console.log(ResidenceServices.value);
                    })
                })
                .catch(error=>{
                    errormessage.value=error.response.data
                    console.log(errormessage.value.nom);
                    toast.add({severity:'error', summary: 'Error', detail: 'unable to create new gerant : '+error.message+' :\n'+errormessage.value, life: 4000});
            })
                    
        }

        function searchStationnement(event) {
            getBoxs(selectResidence)
            
            let query = event.query;
            let newFilteredBox = [];
            let filteredItems = FilterService.filter(Boxclass.value, ['num_place'], query, FilterMatchMode.STARTS_WITH);
            if (filteredItems && filteredItems.length) {
                newFilteredBox.push(...filteredItems);
                
            }
            filteredStationnement.value = newFilteredBox;
                    
        }
        // const ResidenceServices = ref(ResidenceService)
        function getAppartement(selectResidence){
            // console.log(selectResidence.value.id,'eeeeeeeeeeee');

            api.get('/appartements/',{params:{residance:selectResidence.value.id}}).then(responce=>{
                Appartementclass.value=[]
                responce.data.forEach((element) => {
                    
                    Appartementclass.value.push({id:element.id,prix_ht:element.prix_ht,type: element.type,superficier:element.superficier,etage:element.etage,id:element.id,num_lot:element.num_lot})
                })
            })
            .catch(error=>{
                errormessage.value=error.response.data
                console.log(errormessage.value.nom);
                toast.add({severity:'error', summary: 'Error', detail: 'unable to create new gerant : '+error.message+' :\n'+errormessage.value, life: 4000});
            })
        }
        const searchLotapp = (event) => {

            getAppartement(selectResidence)
            let query = event.query;
            let newFilteredAppartement = [];
            
            let filteredItems = FilterService.filter(Appartementclass.value, ['num_lot'], query, FilterMatchMode.CONTAINS);
            if (filteredItems && filteredItems.length) {
                newFilteredAppartement.push(...filteredItems);
            }
           
            filteredLot.value = newFilteredAppartement;
           

        };
        const selectedAppartement=(event)=>{
            newAppartement.value.id=event.value.id
            newAppartement.value.type=event.value.type
            newAppartement.value.superficier=event.value.superficier
            newAppartement.value.etage=event.value.etage
            newAppartement.value.prix_ht=event.value.prix_ht
            
            newAppartement.value.num_lot=event.value.num_lot
        }
        
        const searchLocal = (event) => {
            api.get('/locaux/',{params:{residance:selectResidence.value.id}}).then(responce=>{
                Localesclass.value=[]
                // console.log('object',responce.data);
                responce.data.forEach((element) => {
                    Localesclass.value.push({num_place: element.num_place,prix_ht:element.prix_ht,etage_place:element.etage,id:element.id})
                    // console.log(ResidenceServices.value);
                    })
                })
                .catch(error=>{
                    errormessage.value=error.response.data
                    console.log(errormessage.value.nom);
                    toast.add({severity:'error', summary: 'Error', detail: 'unable to create new gerant : '+error.message+' :\n'+errormessage.value, life: 4000});
            })
            
            let query = event.query;
            let newFilteredLocal = [];
            
            let filteredItems = FilterService.filter(Localesclass.value, ['num_place'], query, FilterMatchMode.CONTAINS);
            if (filteredItems && filteredItems.length) {
                newFilteredLocal.push(...filteredItems);
            }
            
            filteredLocal.value = newFilteredLocal;
        };
        
        function functionShow(event) {
            console.log(event)
            if (event.value.value == "AP") {
                selectStationnement.value=""
                getBoxs(selectResidence)
                appartementBool.value = true
                stationnementBool.value = true
                localBool.value = false
            }
            if (event.value.value  == "PS") {
                selectStationnement.value=""
                getBoxs(selectResidence)
                appartementBool.value = false
                stationnementBool.value = true
                localBool.value = false
            }
            if (event.value.value  == "LC") {
                selectStationnement.value=""
                appartementBool.value = false
                stationnementBool.value = false
                localBool.value = true
            }

            // console.log("functionShow",event);
        }

        function DeleteC(event) {
            // confirm.require({
            //     message: 'Are you sure you want to delete this user?',
            //     header: 'Confirmation',
            //     icon: 'pi pi-exclamation-triangle',
            //     acceptClass: 'p-button-danger',
            //     accept: () => {
            //         console.log('id from lockUser accept = '+id);
            //         // removeUser(id)
            //     },
            //     reject: () => {
            //         toast.add({severity:'success', summary: 'Successful', detail: 'Delete user canceled', life: 1000});
            //     }
            // })
            const index = logements.findIndex(item => item.nomResidence === event.nomResidence && item.type === event.type && item.numLot === event.numLot);

            logements.splice(index)
        }
        function openNew() {
            addBiens.value = true;
        }
        function addClient() {
            getResidances()
            new_contrat.value.nomResidence = selectResidence.value.residence
            new_contrat.value.biens = type_choisie.value.label
            new_contrat.value.type = selectType.value.type
            new_contrat.value.etage = selectType.value.etage
            new_contrat.value.superficier = selectType.value.superficier
            new_contrat.value.numLot = selectLot.value.lot
            new_contrat.value.numLocale = selectLocal.value.num_lot
            new_contrat.value.placeStationnement = selectStationnement.value.num_place
            // new_contrat.value.contratDate = contrat_date.value.toLocaleDateString();
            logements.push(new_contrat.value)
            new_contrat.value = {}
            addBiens.value = false;
        }

       async function nextPage1() {
            let num_facture=''
                // formData.type_choisie
            await api.get('/facture-clients/get-num-facture/?type_fact='+type_choisie.value.value+'&limit=10').then(response => {
                num_facture=response.data.num_facture
                // vAdd$.value.num_facture.$model=  response.data.results{}
                })
                .catch(error => {
                        console.log(error.response.data)
                })

                // columns.value = ;
            
            let result={}
            switch (type_choisie.value.value) {
                
                case "AP":
                    result.value={}
                    // console.log("ap");
                    newBox.value={}
                    newLocale.value={}
                    newAppartement.value.residance=selectResidence.value;
                    newAppartement.value.num_place=selectStationnement.value;
                    // newAppartement.value.contrat_date=contrat_date.value;
                    newAppartement.value.type=selectedLot.value.type
                    newAppartement.value.prix_ht=selectedLot.value.prix_ht
                    
                    newAppartement.value.num_lot=selectedLot.value.num_lot
                    delete newAppartement.value.selectResidence
                    delete newAppartement.value.selectStationnement
                    console.log("AP",newAppartement.value);
                    result={ "appartement": newAppartement.value,"type_choisie":"AP","num_facture":num_facture }
                    if (newAppartement.value.num_lot==''| newAppartement.value.num_lot==undefined|newAppartement.value.num_lot==null) break;
                    emit('nextpage', { formData:result, pageIndex: 1 })
                    break;
                case "LC":
                    result.value={}
                    newBox.value={}
                    newAppartement.value={}
                    newLocale.value.prix_ht=
                    newLocale.value.residance=selectResidence.value
                    // newLocale.value.contrat_date=contrat_date.value
                    newLocale.value.num_place=selectedLocale.value
                    
                    // newLocale.value.residance=nomResidence
                    console.log("LC",newLocale.value);
                    result={ "locale": newLocale.value,"type_choisie":"LC","num_facture":num_facture }
                    if (newLocale.value.num_place==''| newLocale.value.num_place==undefined|newLocale.value.num_place==null) break;

                    emit('nextpage', { formData:result , pageIndex: 1 })
                    break;
                case "PS":
                    result.value={}
                    newLocale.value={}
                    newAppartement.value={}


                    newBox.value.residance=selectResidence.value
                    // newBox.value.contrat_date=contrat_date.value
                    newBox.value.num_place=selectStationnement.value
                    // newBox.value.residance=nomResidence
                    console.log("PS",newBox.value);
                    result={ "box": newBox.value,"type_choisie":"PS","num_facture":num_facture}
                    if (newBox.value.num_place==''| newBox.value.num_place==undefined|newBox.value.num_place==null) break;

                    emit('nextpage', { formData:result , pageIndex: 1 })
                    break;
                default:
                    break;
            }
            // emit('nextpage', { formData: { logements: logements }, pageIndex: 1 })

        }

        function prevPage1() {
            //console.log(emit('prevpage', {pageIndex: 1}));
            emit('prevpage', { pageIndex: 1 });
        }
        function onRowEditSave(event) {
            let { newData, index } = event;

            logements[index] = newData;
        }
        function tableData() {
            // columns.value = ;
        }

        function onToggle(value) {
            // console.log("columns: ",columns.filter(col => value.includes(col)));
            selectedColumns.value = columns.value.filter(col => value.includes(col));

        }
        function onSelectAllChange(event) {
            selectedColumns = event.checked
                ? logements.map((item) => item.value)
                : [];

        }

        getResidances()
        tableData()
        return {
            stationnementBool, appartementBool, localBool, selectStationnement,showSelectProperiter,
            editing_rows,
            logements,
            selectedColumns, residanceClass,Boxclass,Localesclass,Appartementclass,
            columns,
            type_choisie,
            // contrat_date,
            selectedSeat,
            type_class,
            filteredResidences, filteredType, filteredLot, filteredLocal, filteredStationnement,
            selectResidence, selectType, selectLot, selectLocal,selectedLot,selectedLocale,
            newAppartement,newBox,newLocale,
            nextPage1,

            prevPage1,
            onRowEditSave,
            getResidances,

            searchResidence, searchLocal, searchLotapp, searchStationnement,selectedAppartement,

            onSelectAllChange,
            onToggle, functionShow,
            openNew, new_contrat, addClient, DeleteC,
            addBiens
        }
    }

}
</script>