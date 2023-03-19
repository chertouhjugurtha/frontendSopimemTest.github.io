<template>
    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                Informations sur l'états des tranches non régler
            </template>
            
            <template v-slot:content>
                <DataTable :value="classes" editMode="row" :rows="10" :paginator="true"  :rowsPerPageOptions="[10, 25, 50]"
                :filters="filters" v-model:editingRows="editingRows" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    @row-edit-save="onRowEditSave" responsiveLayout="scroll">
                    <template #header>
                        <div class="flex justify-content align-items-center">
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Recherche ... " />
                            </span>
                        </div>
                        <div class="flex justify-content-between">
                            <!-- <MultiSelect v-model="selectedColumns" :options="columns" optionLabel="header"
                                @update:modelValue="onToggle" placeholder="Sélectionner les colonnes"
                                :virtualScrollerOptions="{ itemSize: 44 }" :maxSelectedLabels="3"
                                @selectall-change="onSelectAllChange($event)" /> -->
                        </div>
                    </template>
                    <!-- <Toolbar class="mb-4">
                        <template #start>
                            <Button label="Ajouter" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                        </template>

                    </Toolbar> -->
                    
                    <Column field="client" header="Client" style="width:20%">
                        <template #body="{data}">
                            {{data.tranche_client.prenom}} {{data.tranche_client.nom}}
                      </template>
                      <template #filter="{filterModel}">
                          <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                      </template>
                    </Column>
                    <Column field="client" header="N°Fact/N°Tranche" style="width:20%">
                        <template #body="{data}">
                            {{data.tranche_client.num_facture}}/{{data.tranche_client.num_tranche}}
                      </template>
                      <template #filter="{filterModel}">
                          <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                      </template>
                    </Column>
                    <Column field="client" header="Téléphone" style="width:23%">
                        <template #body="{data}">
                            {{data.tranche_client.telephone}}
                      </template>
                      <template #filter="{filterModel}">
                          <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                      </template>
                    </Column>
                    <Column field="client" header="Prix Réalisé" style="width:23%">
                        <template #body="{data}">
                            <span v-if="parseFloat(data.prix_prevue).toLocaleString('fr-FR')===parseFloat(data.prix_realise).toLocaleString('fr-FR')" style="border-radius: 2rem;color:#F1F6F5;background-color:#9DC08B; padding: 15px;">
                                {{parseFloat(data.prix_realise).toLocaleString('fr-FR')}}DZD
                            </span>
                            <span v-else-if="parseFloat(data.prix_prevue).toLocaleString('fr-FR')>parseFloat(data.prix_realise).toLocaleString('fr-FR')" style="border-radius: 2rem;color:#F1F6F5;background-color:#EB455F; padding: 15px;">
                                {{parseFloat(data.prix_realise).toLocaleString('fr-FR')}}DZD
                            </span>
                            <span v-else-if="parseFloat(data.prix_prevue).toLocaleString('fr-FR')<parseFloat(data.prix_realise).toLocaleString('fr-FR')" style="border-radius: 2rem;color:#F1F6F5;background-color:#EB455FC7 ; padding: 15px;">
                                {{parseFloat(data.prix_realise).toLocaleString('fr-FR')}}DZD
                            </span>
                            
                      </template>
                      <template #filter="{filterModel}">
                          <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                      </template>
                    </Column>
                    <Column field="client" header="Date Réalisé" style="width:15%">
                        <template #body="{data}">
                            <span v-if="data.prochaine_rdv_prevue.split('T')[0]<data.prochaine_rdv_realise.split('T')[0]"  style="border-radius: 2rem;color:#F1F6F5;background-color: #EB455FC7; padding: 15px;">
                                {{data.prochaine_rdv_realise.split('T')[0]}}
                            </span>
                            <span v-else style="border-radius: 2rem; padding: 15px;">
                                {{data.prochaine_rdv_realise.split('T')[0]}}
                            </span>
                            
                      </template>
                      <template #filter="{filterModel}">
                          <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                      </template>
                    </Column>
                    <Column field="client" header="Prix prévue" style="width:23%">
                        <template #body="{data}">
                            <span  style="border-radius: 2rem;color:#F1F6F5;background-color: #9DC08B; padding: 15px;">
                                {{parseFloat(data.prix_prevue).toLocaleString('fr-FR')}}DZD
                            </span>
                            
                      </template>
                      <template #filter="{filterModel}">
                          <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                      </template>
                    </Column>
                    <Column field="client" header="Date prévue" style="width:15%">
                        <template #body="{data}">
                            <span v-if="data.prochaine_rdv_prevue.split('T')[0]<data.prochaine_rdv_realise.split('T')[0]"  style="border-radius: 2rem;color:#F1F6F5;background-color: #EB455FC7; padding: 15px;">
                                {{data.prochaine_rdv_prevue.split('T')[0]}}
                            </span>
                            <span v-else style="border-radius: 2rem; padding: 15px;">
                                {{data.prochaine_rdv_prevue.split('T')[0]}}
                            </span>
                            
                      </template>
                      <template #filter="{filterModel}">
                          <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                      </template>
                    </Column>
                    <Column field="status" header="Status" style="width:15%">
                        <template #body="{data}">
                            <span v-if="data.status==='dette'"  style="border-radius: 2rem;color:#F1F6F5;background-color: #EB455FC7; padding: 15px;">
                                Dette
                            </span>
                            <span v-else-if="data.status==='retard'"  style="border-radius: 2rem;color:#F1F6F5;background-color: rgb(235, 69, 95); padding: 15px;">
                                Retard
                            </span>
                            <span v-else-if="data.status=='regler'"  style="border-radius: 2rem;color:#F1F6F5;background-color:#9DC08B; padding: 15px;">
                                Régler
                            </span>
                            
                      </template>
                      <template #filter="{filterModel}">
                          <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                      </template>
                    </Column>
                   

                    <Column v-for="(col, index) of selectedColumns" :field="col.field" :header="col.header"
                        :key="col.field + '_' + index" :sortable="true" style="white-space: normal !important;">
                        <template #editor="{ data, field }">
                            <InputText v-model="data[field]" />
                        </template>
                    </Column>

                    <Column  style="min-width:8rem" bodyStyle="text-align:left" header="">
                        <template #body="slotProps">   
                            <div class="template">
                                <Button class="vimeo p-0 h-3rem w-9rem" aria-label="Vimeo" @click="ReglerDialogue(slotProps.data)" >
                                    <i class="pi pi-check px-2 py-3"></i>
                                    <span class="px-4">Régler</span>
                                </Button>
                            </div>
                            <div class="template mt-2">
                                <Button class="youtube p-0 h-3rem w-9rem" aria-label="Youtube" @click="DeleteDialogue(slotProps.data)" >
                                    <i class="pi pi-trash px-2 py-3"></i>
                                    <span class="px-4">Supprimer</span>
                                </Button>
                            </div>
                            
                        </template>
                        
                    </Column>
                    
                </DataTable>
            </template>
        </Card>
        <Dialog v-model:visible="productDialog3" :style="{ width: '700px' }" header="Ajouter un nouveaux site" :modal="true"
            class="p-fluid">
            <br/>
            <div class="formgrid grid">
                <div class="field col">
                    <span class="p-float-label">
                        <InputText id="name" v-model="newSite.nomPrenom" disabled="true"/>
                        <label for="name">{{nom_prenom}} </label>
                    </span>
                </div>
                <div class="field col">
                    <span class="p-float-label">
                        <InputText id="prenom" v-model="newSite.montantHt" />
                        <label for="prenom">Montant HT</label>
                    </span>
                </div>
            </div>          
            <div class="formgrid grid" >
                <div class="field col">
                    <span class="p-float-label">
                        <InputText id="prenom" v-model="newSite.tva9" />
                        <label for="prenom">T.V.A. 9%</label>
                    </span>
                </div>
                 <div class="field col-12 md:col-4" style="padding-top: 10px;">
                    <span class="p-float-label">
                        <Dropdown id="dropdown" v-model="SecteurActivite" :options="SecteurActivite" optionLabel="name" />
                        <label for="dropdown">T.V.A. 9%</label>
                    </span>
                </div>
                <div class="field col-12 md:col-4" style="padding-top: 10px;">
                    <span class="p-float-label">
                        <Dropdown id="dropdown" v-model="SituationFoncier" :options="SituationFoncier" optionLabel="name" />
                        <label for="dropdown">Situation Foncier</label>
                    </span>
                </div>
                <div class="field col-12 md:col-4" style="padding-top: 10px;">
                    <span class="p-float-label">
                        <Dropdown id="dropdown" v-model="LieuImplantation" :options="LieuImplantation" optionLabel="name" />
                        <label for="dropdown">LieuImplantation</label>
                    </span>
                </div>
                 <div class="field col-12 md:col-6" style="padding-top: 10px;">
                    <span class="p-float-label">
                        <Dropdown id="dropdown" v-model="Wilaya" :options="Wilaya" optionLabel="name" />
                        <label for="dropdown">Wilaya</label>
                    </span>
                </div>
                 <div class="field col-12 md:col-6" style="padding-top: 10px;">
                    <span class="p-float-label">
                        <Dropdown id="dropdown" v-model="Commune" :options="Commune" optionLabel="name" />
                        <label for="dropdown">Commune</label>
                    </span>
                </div>
                
 
            </div>

            

            <!--<RadioButton name="experience.contrainte" value="Non levés" v-model="product2.contrainte" v-show="false"/>-->
            <template #footer>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="addSite" />
            </template>
        </Dialog>
        <Toast />
        <ConfirmDialog></ConfirmDialog>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import api from '../api';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { FilterMatchMode } from "primevue/api";
export default {
    name:"Productions",
    emits: ["nextpage", "prevpage"],

    setup(_, { emit }) {
        const confirm = useConfirm();
        const productDialog3 = ref(false)
        const selectedColumns = ref(null)
        const newSite= reactive({ Dénomination: '', Abréviation: '', SecteurActivite: '' ,SituationFoncier :'',siègeSocial:'',Wilaya:'',Commune:'',LieuImplantation:''})
        const classes = ref([])
        reactive([{ Dénomination: 'Cevital Group', Abréviation: 'civitale', SecteurActivite: 'chiemie' ,SituationFoncier:'Location',siègeSocial:'alger centre',Wilaya:'alger',Commune:'kouba',LieuImplantation:'ZA'},
        { Dénomination: 'Cevital Group1', Abréviation: 'civitale', SecteurActivite: 'chiemie' ,SituationFoncier:'Location',siègeSocial:'alger centre',Wilaya:'alger',Commune:'kouba',LieuImplantation:'ZA'},
        { Dénomination: 'Cevital Group2', Abréviation: 'civitale', SecteurActivite: 'chiemie' ,SituationFoncier:'Location',siègeSocial:'alger centre',Wilaya:'alger',Commune:'kouba',LieuImplantation:'ZA'}])
        const editingRows = ref(null)
        const columns = ref(null)
        const selectedSeat = ref('')
        const tranchesImpye=ref([])
        const toast = useToast();
        const filters = ref({
                    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
                  })
        function DeleteG(event){
            console.log("event mmm",event);
           
        }
        
        
        function openNew() {

            productDialog3.value = true;
        }
        function addSite(){
            console.log("gerant:",newSite);
            classes.push(newSite)
            console.log("gerant:",classes);
            productDialog3.value = false;

        }

        function nextPage1() {
            console.log("object");
            emit('nextpage', { formData: { }, pageIndex: 2 });

        }

        function prevPage1() {
            //console.log(emit('prevpage', {pageIndex: 1}));
            emit('prevpage', { pageIndex: 2 });
        }
        function onRowEditSave(event) {
            let { newData, index } = event;

            classes[index] = newData;
        }
        function tableData() {
            api.get('/tranches-impaye/?limit=100').then(response => {
                classes.value = response.data.results
                console.log(classes.value,'11111');
			// origineTranchesImpye.value=tranchesImpye.value
            })
            .catch(error => {
                    console.log(error.response.data)
            })
            // columns.value = [
            //     // {field: 'name', header: 'Name'},
            //     // { field: 'Dénomination', header: 'Dénomination' },
            //     { field: 'nomPrenom', header: 'Client' },
            //      { field: 'SecteurActivite', header: 'SecteurActivite' },
            //       { field: 'SituationFoncier', header: 'SituationFoncier' },
            //       { field: 'siègeSocial', header: 'siègeSocial' },
            //       { field: 'Wilaya', header: 'Wilaya' },
            //       { field: 'Commune', header: 'Commune' },
            //       { field: 'LieuImplantation', header: 'LieuImplantation' },
                  

            // ];
        }
        function onToggle(value) {
            selectedColumns = columns.filter(col => value.includes(col));
        }
        function onSelectAllChange(event) {
            selectedColumns = event.checked
                ? classes.map((item) => item.value)
                : [];

        }
        function reglerClient(data){
            let reglageTranche=data
            delete reglageTranche.reglageTranche
            reglageTranche.has_oppend=true
            reglageTranche.prix_realise=reglageTranche.prix_prevue
            reglageTranche.prochaine_rdv_realise=reglageTranche.prochaine_rdv_prevue
            reglageTranche.status='regler'
            api.put('/tranches-impaye/',{params:reglageTranche})
                .then(response=>{
                    console.log(response.data);
                    tableData()
				toast.add({severity:'success', summary: 'Successful', detail: 'La tranche à été bien régler', life: 3000});

                    // Object.assign(messageData,{subject:'',content: ''})
                    // files.value=[]
                    // compose.value = false
                }).catch(error=>console.log(error))
            console.log(data);
        }
        function deleteClient(data){
            let reglageTranche=data
            delete reglageTranche.reglageTranche
            reglageTranche.has_oppend=true
            reglageTranche.prix_realise=reglageTranche.prix_prevue
            reglageTranche.prochaine_rdv_realise=reglageTranche.prochaine_rdv_prevue
            reglageTranche.status='regler'
            api.put('/tranches-impaye/'+reglageTranche.id+'/delete-tranche/',{params:reglageTranche})
                .then(response=>{
                tableData()
				toast.add({severity:'success', summary: 'Successful', detail: 'La tranche à été bien régler et bien supprimer', life: 3000});

                    // Object.assign(messageData,{subject:'',content: ''})
                    // files.value=[]
                    // compose.value = false
                }).catch(error=>console.log(error))
        }
        function ReglerDialogue(data){
            confirm.require({
                message: 'Voullez-vous régler cette tranche?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'p-button-warning',
                acceptLabel:'Oui',
                rejectLabel:'Non',
                accept: () => {
                    reglerClient(data)
                },
                reject: () => {
                    toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
                }
            });
        }
        function DeleteDialogue(data){
            confirm.require({
                message: 'Voullez-vous régler et supprimer cette notification?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-circle',
                acceptClass: 'p-button-danger',
                acceptLabel:'Oui',
                rejectLabel:'Non',
                accept: () => {
                    deleteClient(data)                },
                reject: () => {
                    toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
                }
            });
        }
        tableData()
        return {
            editingRows,ReglerDialogue,DeleteDialogue,filters,
            tranchesImpye,
            classes,
            selectedColumns,
            columns,
            selectedSeat,
            nextPage1,
            prevPage1,
            onRowEditSave,
            onSelectAllChange,
            onToggle,
            openNew,newSite,addSite,DeleteG,
            productDialog3
        }
    }

}
</script>
<style lang="scss" scoped>


.template .p-button.vimeo {
    background: linear-gradient(to left, var(--green-200) 50%, var(--green-300) 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: background-position 0.5s ease-out;
    color: #000;
    border-color: var(--green-300);
}
.template .p-button i {
    line-height: 2.25rem;
}
.template .p-button.vimeo:hover {
    background-position: left bottom;
}
.template .p-button.vimeo i {
    background-color: var(--green-300);
}
.template .p-button.vimeo:focus {
    box-shadow: 0 0 0 1px var(--green-800);
}
.template .p-button.discord:hover {
    background-position: left bottom;
}
.template .p-button.discord i {
    background-color: var(--bluegray-1000);
}
.template .p-button.discord:focus {
    box-shadow: 0 0 0 1px var(--bluegray-500);
}
.template .p-button.youtube {
    background: linear-gradient(to left, var(--pink-600) 50%, var(--pink-700) 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: background-position 0.5s ease-out;
    color: #fff;
    border-color: var(--pink-700);
}
.template .p-button.youtube:hover {
    background-position: left bottom;
}
.template .p-button.youtube i {
    background-color: var(--pink-700);
}
.template .p-button.youtube:focus {
    box-shadow: 0 0 0 1px var(--pink-400);
}
</style>