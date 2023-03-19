<template>
    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                <Divider align="center" type="dotted">Vendre Par Tranche</Divider>
            </template>
            <template v-slot:content>
                
                <DataTable :value="rowsClasses"  dataKey="name" columnResizeMode="fit" showGridlines responsiveLayout="scroll">
                    <template #header>
                        <div class="flex justify-content-between">
                            <Dropdown class="p-button-outlined mb-2" v-model="selectedTypeColumns" :options="typeClass" 
                            optionLabel="label" optionValue="value" placeholder="Appartements" @change="rowsListes($event)"/>

                            <!-- <SelectButton v-model="selectedColumns" :options="columns" optionLabel="header"
                                @update:modelValue="onToggle" placeholder="Sélectionner les colonnes"
                                :virtualScrollerOptions="{ itemSize: 44 }" :maxSelectedLabels="3"
                                @selectall-change="onSelectAllChange($event)"  /> -->
                        </div>
                    </template>
                    <Toolbar class="mb-4">
                        <template #start>
                            <Button label="Ajouter une Tranche" icon="pi pi-plus" class="p-button-danger mr-2" @click="showDialogue()" />
                        </template>
                        

                    </Toolbar>
                    <!-- <Column field="residance.designation" header="Nom Residence" style="width:20%">
                        <template #editor="{ data, field }">
                            <InputText v-model="data[field]" />
                        </template>
                    </Column> -->
                    
                    <Column v-for="(col, index) of selectedColumns" :field="col.field" :header="col.header"
                        :key="col.field + '_' + index" :sortable="true" style="white-space: normal !important;">
                        <template #editor="{ data, field }">
                            <InputText v-model="data[field]" />
                        </template>
                    </Column>
                    
                    
                      <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <SplitButton style="direction:ltr" @click="openDialogueDetail(slotProps.data.id,typeRows,'showRows')" 
                                label="Détails" icon="pi pi-eye" 
                                :model="[{label: 'Edit',icon:'pi pi-pencil',command: ()=>{
                                openDialogueDetail(slotProps.data.id,typeRows,'editRows')}},{label: 'Delete',icon:'pi pi-trash',command: ()=>{
                                confirmDrop(slotProps.data.id,typeRows)}}]" class="p-button-outlined p-button-secondary mb-2">
                            </SplitButton>
                            <!-- <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="DeleteC(slotProps.data)" /> -->
                        </template>
                    </Column>
                </DataTable>
            </template>
            <Dialog v-model:visible="showTrancheInput" :style="{ width: '450px' }" header="Renseignements Logement" :modal="true"
            class="p-fluid">
            <div class="p-fluid grid">
                
                    <div  class="field col-6">
                        <span class="p-float-label">
                            <InputText  id="name" v-model="nbr_tranche" />
                            <label for="name">Nombre de tranche </label>
                        </span>
                    </div>
                    <div   class="field col-6">
                        <span class="p-float-label">
                            <InputText  id="name" v-model="montant_verser" />
                            <label for="name">Montant versement bancaire </label>
                        </span>
                    </div>
                    <div  class="field col-6 ">
                        <span class="p-float-label">
                            <Calendar v-model="date_verser_banque" :showIcon="true" dateFormat="dd/mm/yy" />
                            <label>Date Versement Bancaire </label>
                        </span>
                    </div>
                    
                    <!-- <div v-show="showTrache"  class="field col-6 ">
                        <span class="p-float-label">
                            <Calendar v-model="prochaine_rdv_realise" :showIcon="true" dateFormat="dd/mm/yy" />
                            <label>Rendez-vous Réaliser</label>
                        </span>
                    </div> -->
                    <div   class="field col-6 ">
                        <span class="p-float-label">
                            <Calendar v-model="prochaine_rdv_prevue" :showIcon="true" dateFormat="dd/mm/yy" />
                            <label>Prochaine Rendez-vous Prévue</label>
                        </span>
                    </div>
                    <div   class="field col-6">
                        <span class="p-float-label">
                            <InputText  id="name" v-model="prix_prevue" />
                            <label for="name">Montant prevus </label>
                        </span>
                    </div>

                    <div class="field col-6 ">
                        <span class="p-float-label">
                            <Calendar v-model="fin_contrat" :showIcon="true" dateFormat="dd/mm/yy" />
                            <label>Experation du contrat</label>
                        </span>
                    </div>
            </div>
            </Dialog>
            <template v-slot:footer>
                <div class="grid grid-nogutter justify-content-between">
                    <Button label="Back" @click="prevPage1()" icon="pi pi-angle-left" />
                    <Button label="Next" @click="nextPage1()" icon="pi pi-angle-right" iconPos="right" />
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
import { reactive, ref,toRefs, onMounted } from 'vue'

export default {
    
    setup(_, { emit }) {
        const showTrancheInput=ref(false)
        const columns=ref([])
        const rowsClasses = ref([])
        columns.value=[
                        {field:"residance.designation",header:"Residance"},

                        { field: 'type', header: 'Type' },
                        { field: 'num_lot', header: 'N°Lot APP' },
                        { field: 'box.num_place', header: 'Box' },
                        { field: 'prix_achat', header: 'Prix de vente' },
                        { field: 'prix_ht', header: 'Prix HT' },
                        { field: 'prix_ttc', header: 'Prix TTC' },
                        { field: 'TVA', header: 'TVA' },
                        { field: 'superficier', header: 'Superficier' },
                    ]
        rowsClasses.value=responce.data
        function showDialogue(){
            showTrancheInput.value=true
        }
        return {showTrancheInput,rowsClasses,columns}
    }
}
</script>