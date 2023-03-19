<template>
    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                <Divider align="center" type="dotted">Etat de Facturation</Divider>
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
            <template v-slot:footer>
                <div class="grid grid-nogutter justify-content-between">
                    <Button label="Back" @click="prevPage1()" icon="pi pi-angle-left" />
                    <Button label="Next" @click="nextPage1()" icon="pi pi-angle-right" iconPos="right" />
                </div>
            </template>

        </Card>
        <Dialog v-model:visible="productDialog3" :style="{ width: '700px' }" header="Ajouter un nouveaux site" :modal="true"
            class="p-fluid">
            <br/>
            <div class="formgrid grid">
                <div class="field col">
                    <span class="p-float-label">
                        <InputText id="name" v-model="newFacture.nomPrenom" disabled="true"/>
                        <label for="name">{{nom_prenom}} </label>
                    </span>
                </div>
                
            </div>
            
            <div class="formgrid grid" >
                <div class="field col">
                    <span class="p-float-label">
                        <InputText id="prenom" v-model="newFacture.montantHt" />
                        <label for="prenom">Montant HT</label>
                    </span>
                </div>
                <div class="field col">
                    <span class="p-float-label">
                        <InputText id="prenom" v-model="newFacture.montantReel" />
                        <label for="prenom">Montant Réel</label>
                    </span>
                </div>
                 <div class="field col">
                    <span class="p-float-label">
                        
                        <Dropdown v-model="newFacture.tva" :options="classTva" optionLabel="name" :optionValue="value"/>
                        <label for="prenom">Tva</label>
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
        
        const selectedTva=ref();
        const classTva = ref([{name:"Tva 9%",label:"9 %",value:9},{name:"Tva 19%",label:"19 %",value:19}]);
        const productDialog3 = ref(false);
       
        const newFacture= ref({ montantHt: '', montantReel: '' ,tva :''})
        const classes = reactive([{  montantHt: '200.000000.00', montantReel: '200.000000.00' ,tva:'Non'},
        { montantHt: '200.000000.00', montantReel:'Non',tva:'Non'},
        { montantHt: '200.000000.00', montantReel:'Non',tva:'Non'}])
        const editingRows = ref(null)
        const columns = ref([
            // {field: 'name', header: 'Name'},
                // { field: 'Dénomination', header: 'Dénomination' },
                
                  { field: 'montantHt', header: 'Montant HT' },
                 { field: 'montantReel', header: 'Montant HT' },
                  { field:'tva.label' , header: 'TVA' },
                  
                  

            ])
        const selectedColumns = ref(columns.value);
        const selectedVagon = ref()
        const selectedSeat = ref('')
        
        function DeleteG(event){
            console.log("event mmm",event);
            const index = classes.findIndex(item =>  
             item.montantHt === event.montantHt
             &&item.SecteurActivite === event.SecteurActivite
             &&item.montantReel === event.montantReel
             &&item.tva === event.tva
             
              );
            console.log("index",index);
            classes.splice(index,1)


        }
        function openNew() {

            productDialog3.value = true;
        }
        function addSite(){
            classes.push(newFacture.value)
            newFacture.value={}
            productDialog3.value = false;

        }

        function nextPage1() {
            emit('nextpage', { formData: {facture:classes }, pageIndex: 2 });

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
            // columns.value = ;
        }
        function onToggle(value) {
            selectedColumns.value = columns.value.filter(col => value.includes(col));
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
            classTva,
            columns,
            selectedSeat,
            nextPage1,
            prevPage1,
            onRowEditSave,
            onSelectAllChange,
            onToggle,
            openNew,newFacture,addSite,DeleteG,
            productDialog3
        }
    }

}
</script>