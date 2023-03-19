<template>
    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                <Divider align="center" type="dotted">Fiche Client</Divider>
            </template>
            
            <template v-slot:content>
                <DataTable :value="logements" editMode="row" dataKey="name" v-model:editing_rows="editing_rows"
                    @row-edit-save="onRowEditSave" responsiveLayout="scroll">
                    <template #header>
                        <div class="flex justify-content-between">
                            <MultiSelect v-model="selectedColumns" :options="columns" optionLabel="header"
                                @update:modelValue="onToggle" placeholder="Sélectionner les colonnes"
                                :virtualScrollerOptions="{ itemSize: 44 }" :maxSelectedLabels="3"
                                @selectall-change="onSelectAllChange($event)"  />



                        </div>
                    </template>
                    <Toolbar class="mb-4">
                        <template #start>
                            <Button label="Ajouter" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                        </template>

                    </Toolbar>
                    <Column field="nomResidence" header="Nom Residence" style="width:20%">
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
                    
                    <Column :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
                      <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="DeleteC(slotProps.data)" />
                    </template>
                </Column>
                </DataTable>
            </template>
            <template v-slot:footer>
                <div class="grid grid-nogutter justify-content-between">
                    <Button label="Back" @click="prevPage1()" icon="pi pi-angle-left" />
                    <Button label="Next" @click="nextPage1()" icon="pi pi-angle-right" iconPos="right" />
                </div>
            </template>
        </Card>
        <Dialog v-model:visible="addBiens" :style="{ width: '450px' }" header="Renseignements Logement" :modal="true"
            class="p-fluid">
            <br/>
            <div class="field col-12">
                <span class="p-float-label">
                    <!-- <InputText id="name" v-model="new_contrat.nomResidence" /> -->
                    <!-- <Dropdown :editable="true" id="nomResidence" v-model="selectResidence" :options="residanceClass" @change="residance_change($event,'locale')"  optionLabel="designation"  /> -->
                    <AutoComplete v-model="selectResidence.residence" :dropdown="true" :suggestions="filteredResidences" :options="residanceClass" @complete="searchResidence($event)" optionLabel="designation" >
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
            <div class="field col-12">
                <span class="p-float-label">
                    <Dropdown id="dropdown" v-model="type_choisie" :options="type_class" @change="functionShow(type_choisie)"  :optionLabel="type_class.label==''?'Appartement':'label'"  />
                    <label for="name">Choisissez ... </label>
                </span>
            </div>
            <!-- :style="(type_choisie.value=='AP'  || type_choisie.value=='' )?'display:block':'display:none'" -->
            <div v-show="appartementBool"  class="field col-12">
                <span  class="p-float-label">
                    <AutoComplete optionGroupLabel="residence"
                    optionGroupChildren="appartements"
                    v-model="selectType" :suggestions="filteredType" @complete="searchType($event)" :dropdown="true" field="type" optionLabel="type" forceSelection>
                        <template  #item="slotProps"  >
                            <div class="country-item">
                                
                                <!-- <div class="ml-2">{{slotProps.item}}</div> -->
                                <div class="ml-2">{{slotProps.item.type}}</div>
                            </div>
                        </template>
                    </AutoComplete>
                   
                    <!-- <InputText   id="name" v-model="new_contrat.type" /> -->
                    <label  for="name">Type </label>
                </span>
            </div>
            <div class="field col-12">
                <!-- :style="(type_choisie.value=='AP' )?'display:block':'display:none'"  -->
                <span v-show="appartementBool"  class="p-float-label">
                    <AutoComplete optionGroupLabel="residence"
                    optionGroupChildren="appartements"
                    v-model="selectLot" :suggestions="filteredLot" @complete="searchType($event)" :dropdown="true" field="lot" optionLabel="lot" forceSelection>
                        <template  #item="slotProps"  >
                            <div class="country-item">
                                
                                <!-- <div class="ml-2">{{slotProps.item}}</div> -->
                                <div class="ml-2">{{slotProps.item.lot}}</div>
                            </div>
                        </template>
                    </AutoComplete>
                    
                    <label for="prenom">Lot N°</label>
                </span>
              <!-- :style="( type_choisie.value=='LC' )?'display:block':'display:none'" -->
                <span v-show="localBool"  class="p-float-label">
                    <AutoComplete optionGroupLabel="residence"
                    optionGroupChildren="locales"
                    v-model="selectLocal" :suggestions="filteredLocal" @complete="searchLocal($event)" :dropdown="true" field="num_lot" optionLabel="num_lot" forceSelection>
                        <template  #item="slotProps"  >
                            <div class="country-item">
                                
                                <!-- <div class="ml-2">{{slotProps.item}}</div> -->
                                <div class="ml-2">{{slotProps.item.num_lot}}</div>
                            </div>
                        </template>
                    </AutoComplete>
                    
                    <label for="prenom">Lot N°</label>
                </span>
            </div>

            <div  v-show="stationnementBool" class="field col-12">

                <span class="p-float-label">
                    <AutoComplete optionGroupLabel="residence"
                    optionGroupChildren="place_stationnement"
                    v-model="selectStationnement" :suggestions="filteredStationnement" @complete="searchStationnement($event)" :dropdown="true" field="num_place" optionLabel="num_place" forceSelection>
                        <template  #item="slotProps"  >
                            <div class="country-item">
                                
                                <!-- <div class="ml-2">{{slotProps.item}}</div> -->
                                <div class="ml-2">{{slotProps.item.num_place}}</div>
                                <div class="ml-2">{{slotProps.item.etage_place}}</div>
                            </div>
                        </template>
                    </AutoComplete>
                  
                    <label for="func">Place de Stationnement</label>
                </span>
            </div>
            <div class="field col-12 ">
                <span class="p-float-label">
                
                    <Calendar v-model="contrat_date" :showIcon="true"   dateFormat="dd/mm/yy" />
                    <label >Contrat Du</label>
                </span>
            </div> 
            <!--<RadioButton name="experience.contrainte" value="Non levés" v-model="product2.contrainte" v-show="false"/>-->
            <template #footer>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="addClient" />
            </template>
        </Dialog>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
// import ResidenceService from '../../service/ResidenceService';
import ResidenceService from '../../../public/data/appartement.json'
import {FilterService,FilterMatchMode} from 'primevue/api';
import moment from "moment";
import { useStore } from 'vuex';
import api from '../../api';
export default {
    emits: ["nextpage", "prevpage"],

    setup(_, { emit }) {
        // onMounted(() => {
        //     residenceGet.value.getResidences().then(data => appartementsData.value = data);
        // })
        const addBiens = ref(false)
        const contrat_date=ref(new Date().toLocaleDateString())

        const appartementBool=ref(false)
        const stationnementBool=ref(false)
        const localBool=ref(false)

        const selectResidence=ref({designation:"",id:""})
        const selectType=ref('')
        const selectLot=ref('')
        const selectLocal=ref('')
        const selectStationnement=ref('')

        const filteredResidences=ref()
        const filteredType=ref()
        const filteredLot=ref()
        const filteredLocal=ref()
        const filteredStationnement=ref()
        
        const type_choisie=ref('')
        const type_class=ref([
            {label: 'Appartement', value: 'AP'},
            {label: 'Place de Stationnement', value: 'PS'},
            {label: 'Locale', value: 'LC'}
        ])
       
        // contrat_date.appContext.config.globalProperties.$moment(res.data.contratDate).format('DD-MM-YYYY')
        const new_contrat= ref({ nomResidence: '',biens:'', type: '', numLot: '',numLocale:'',placeStationnement:'' ,contratDate:new Date().toLocaleDateString()})
        const logements = reactive([{ nomResidence: 'Bella vista',biens:'ddffff', type: 'F3', numLot: 1 ,placeStationnement:'100',contratDate:"02-07-2020"},
        { nomResidence: 'Foresta',biens:'mmmmm', type: 'F5', numLot: 2,placeStationnement:'50' ,contratDate:"18-12-2018"},
        { nomResidence: 'Bella vista',biens:'dsdxz', type: 'F3', numLot: 3 ,placeStationnement:'20',contratDate:"20-07-2020"}])
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
        const residanceClass=ref([])
        function getResidances(){
            api.get('/residence/').then(responce=>{
                    residanceClass.value=[]
                    responce.data.results.forEach((element) => {
                        residanceClass.value.push({designation: element.designation,id:element.id})
                        
                    })
                })
                .catch(error=>{
                    errormessage.value=error.response.data
                    console.log(errormessage.value.nom);
                    toast.add({severity:'error', summary: 'Error', detail: 'unable to create new gerant : '+error.message+' :\n'+errormessage.value, life: 4000});
            })
        }
        function searchResidence(event){
            let query = event.query;
            let newFilteredAppartements = [];
            let filteredItems = FilterService.filter(residanceClass.value, ['designation'], query, FilterMatchMode.STARTS_WITH);
            if (filteredItems && filteredItems.length) {
                newFilteredAppartements.push(...filteredItems);
            }  
            filteredResidences.value = newFilteredAppartements;
            console.log('object',filteredResidences.value);
            }  
        const ResidenceServices=ref(ResidenceService)
        const searchType = (event) => {
            let query = event.query;
            let newFilteredType = [];
            let newFilteredLot = [];
            for (let appartements of ResidenceServices.value) {    
                let filteredItems = FilterService.filter(appartements.appartements, ['type'], query, FilterMatchMode.CONTAINS);
                if (filteredItems && filteredItems.length) {
                    newFilteredType.push({...appartements, ...{appartements: filteredItems}});
                }
                let filteredItemsLot = FilterService.filter(appartements.appartements, ['lot'], query, FilterMatchMode.CONTAINS);
                if (filteredItemsLot && filteredItemsLot.length) {
                    newFilteredLot.push({...appartements, ...{appartements: filteredItemsLot}});
                }
            }
            filteredType.value = newFilteredType;
            filteredLot.value = newFilteredLot;

        };
       
        const searchLocal = (event) => {
            let query = event.query;
            let newFilteredLocal = [];
            for (let locales of ResidenceServices.value) {    
                let filteredItems = FilterService.filter(locales.locales, ['num_lot'], query, FilterMatchMode.CONTAINS);
                if (filteredItems && filteredItems.length) {
                    newFilteredLocal.push({...locales, ...{locales: filteredItems}});
                }   
            }
            filteredLocal.value = newFilteredLocal;
        };
        const searchStationnement = (event) => {
            let query = event.query;
            let newFilteredStationnement = [];
            
            for (let place_stationnement of ResidenceServices.value) {    
                let filteredItems = FilterService.filter(place_stationnement.place_stationnement, ['num_place'], query, FilterMatchMode.CONTAINS);
                if (filteredItems && filteredItems.length) {
                    newFilteredStationnement.push({...place_stationnement, ...{place_stationnement: filteredItems}});
                }
            }
            filteredStationnement.value = newFilteredStationnement;
            

        };
        function functionShow(event){
            if (event.value=="AP"){
                appartementBool.value=true
                stationnementBool.value=true
                localBool.value=false
            }
            if (event.value=="PS"){
                appartementBool.value=false
                stationnementBool.value=true
                localBool.value=false
            }
            if (event.value=="LC"){
                appartementBool.value=false
                stationnementBool.value=false
                localBool.value=true
            }
            
            // console.log("functionShow",event);
        }
         
        function DeleteC(event){
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
            const index = logements.findIndex(item => item.nomResidence === event.nomResidence && item.type === event.type &&item.numLot === event.numLot );
            
            logements.splice(index)
        }
        function openNew() {
            addBiens.value = true;
        }
        function addClient(){
            getResidances()
            new_contrat.value.nomResidence=selectResidence.value.residence
            new_contrat.value.biens=type_choisie.value.label
            new_contrat.value.type=selectType.value.type
            new_contrat.value.numLot=selectLot.value.lot
            new_contrat.value.numLocale=selectLocal.value.num_lot
            new_contrat.value.placeStationnement=selectStationnement.value.num_place
            new_contrat.value.contratDate=contrat_date.value.toLocaleDateString();
           
            logements.push(new_contrat.value)
            console.log(logements.value);
            new_contrat.value={}
            addBiens.value = false;

        }

        function nextPage1() {
            
            emit('nextpage', { formData: {logements:logements }, pageIndex: 1 })

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
            stationnementBool,appartementBool,localBool,selectStationnement,
            editing_rows,
            logements,
            selectedColumns,residanceClass,
            columns,
            type_choisie,
            contrat_date,
            selectedSeat,
            type_class,
            filteredResidences,filteredType,filteredLot,filteredLocal,filteredStationnement,
            selectResidence, selectType, selectLot,selectLocal,
 
            nextPage1,
            
            prevPage1,
            onRowEditSave,
            getResidances,

            searchResidence,searchLocal,searchType,searchStationnement,
            
            onSelectAllChange,
            onToggle,functionShow,
            openNew,new_contrat,addClient,DeleteC,
            addBiens
        }
    }

}
</script>