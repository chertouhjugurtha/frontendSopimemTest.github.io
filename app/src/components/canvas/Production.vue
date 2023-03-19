<template>
    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                Informations sur le produit de productions
            </template>

            <template v-slot:content>
                <DataTable :value="classes" editMode="row" dataKey="Dénomination" v-model:editingRows="editingRows"
                    @row-edit-save="onRowEditSave" responsiveLayout="scroll">
                    <template #header>
                        <div class="flex justify-content-between">
                            <MultiSelect v-model="selectedColumns" :options="columns" optionLabel="header"
                                @update:modelValue="onToggle" placeholder="Sélectionner les colonnes"
                                :virtualScrollerOptions="{ itemSize: 44 }" :maxSelectedLabels="3"
                                @selectall-change="onSelectAllChange($event)" />



                        </div>
                    </template>
                    <Toolbar class="mb-4">
                        <template #start>
                            <Button label="Ajouter" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                        </template>

                    </Toolbar>
                    
                    <Column field="nomPrenom" header="Client" style="width:20%">
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

                    <Column :rowEditor="true" style="min-width:8rem" bodyStyle="text-align:left" header="Edit votre Site">
                    
                    </Column>
                    <Column :exportable="false" style="min-width:8rem" header="Supprimer votre Site" >
                            <template #body="slotProps">
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="DeleteG(slotProps.data)" />
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
    </div>
</template>

<script>
import { reactive, ref } from 'vue'

export default {
    name:"Productions",
    emits: ["nextpage", "prevpage"],

    setup(_, { emit }) {
        console.log("object");
        const productDialog3 = ref(false)
        const selectedColumns = ref(null)
        const newSite= reactive({ Dénomination: '', Abréviation: '', SecteurActivite: '' ,SituationFoncier :'',siègeSocial:'',Wilaya:'',Commune:'',LieuImplantation:''})
        const classes = reactive([{ Dénomination: 'Cevital Group', Abréviation: 'civitale', SecteurActivite: 'chiemie' ,SituationFoncier:'Location',siègeSocial:'alger centre',Wilaya:'alger',Commune:'kouba',LieuImplantation:'ZA'},
        { Dénomination: 'Cevital Group1', Abréviation: 'civitale', SecteurActivite: 'chiemie' ,SituationFoncier:'Location',siègeSocial:'alger centre',Wilaya:'alger',Commune:'kouba',LieuImplantation:'ZA'},
        { Dénomination: 'Cevital Group2', Abréviation: 'civitale', SecteurActivite: 'chiemie' ,SituationFoncier:'Location',siègeSocial:'alger centre',Wilaya:'alger',Commune:'kouba',LieuImplantation:'ZA'}])
        const editingRows = ref(null)
        const columns = ref(null)
        const selectedSeat = ref('')

        function DeleteG(event){
            console.log("event mmm",event);
            const index = classes.findIndex(item => 
            item.Dénomination === event.Dénomination 
            && item.Abréviation === event.Abréviation
             &&item.SecteurActivite === event.SecteurActivite
             &&item.SituationFoncier === event.SituationFoncier
             &&item.siègeSocial === event.siègeSocial
             &&item.Wilaya === event.Wilaya
             &&item.Commune === event.Commune
             &&item.LieuImplantation === event.LieuImplantation
              );
            console.log("index",index);
            classes.splice(index,1)


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
            columns.value = [
                // {field: 'name', header: 'Name'},
                // { field: 'Dénomination', header: 'Dénomination' },
                { field: 'nomPrenom', header: 'Client' },
                 { field: 'SecteurActivite', header: 'SecteurActivite' },
                  { field: 'SituationFoncier', header: 'SituationFoncier' },
                  { field: 'siègeSocial', header: 'siègeSocial' },
                  { field: 'Wilaya', header: 'Wilaya' },
                  { field: 'Commune', header: 'Commune' },
                  { field: 'LieuImplantation', header: 'LieuImplantation' },
                  

            ];
        }
        function onToggle(value) {
            selectedColumns = columns.filter(col => value.includes(col));
        }
        function onSelectAllChange(event) {
            selectedColumns = event.checked
                ? classes.map((item) => item.value)
                : [];

        }
        tableData()
        return {
            editingRows,
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