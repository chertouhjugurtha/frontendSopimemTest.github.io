<template>
  <div class="card">
    <div class="card-header pb-0">
      <!-- <h6>Etats de paiement clients</h6> -->
        <ClientsCard :clientItems="clientItems" />
        <Toolbar class="mb-4">
            <!-- <template v-slot:start>
                <div class="my-2">
                    <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" />
                    <Button label="Delete" icon="pi pi-trash" class="p-button-danger"  />
                </div>
            </template> -->
            <template v-slot:end>
                <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV(clientItems,clientHistory)"  />
            </template>
        </Toolbar>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        
        <DataTable  editMode="row"  :value="clientHistory" ref="dt"
        rowGroupMode="rowspan" groupRowsBy="montant_verser" sortMode="single" sortField="montant_verser" 
        @cell-edit-complete="onCellEditComplete" class="bg-gray-600 dark-version editable-cells-table"  v-model:editingRows="editingRows"  dataKey="id"
            :paginator="true" :rows="10" :filters="filters" :resizableColumns="true" columnResizeMode="expand" showGridlines
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
            
            <!-- <template #header> 
                <div class="row">
                    <div class="col-6 col-md-4">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
                    </div>
                </div>
            </template> -->
            
            <ColumnGroup type="header">
                <Row>
                    <Column header="Echancier"   :rowspan="2" />
                    <Column header="Date" :colspan="2" />
                    <Column header="Paiment" :colspan="2" />
                    <Column header="Ecart Paiment" :rowspan="2" />
                    <Column header="Versement Banque" :colspan="3"  />
                    
                </Row>            
                <Row>
                    <Column header="Prévue" :sortable="true" field="datePrevue"/>
                    <Column header="Réaliser" :sortable="true" field="dateRealiser"/>
                    <Column header="Prévue" :sortable="true" field="paimentPrevue"/>
                    <Column header="Réaliser" :sortable="true" field="paimentRealiser"/>
                    <Column header="Date" :sortable="true" field="dateVersement"/>
                    <Column header="Montant" :sortable="true" field="montant"/>
                    <Column header="" :sortable="true" field="modification"/>
                </Row>
            </ColumnGroup>
            <Column  field="num_tranche" header="" style="width:10%">
                <template #body="{ data, field }">

                    <span v-if="data[field]==1" style="font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"> {{data[field]}} er Tranche</span>
                    <span v-else style="font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"> {{data[field]}} eme Tranche</span>
                    <!-- <InputText v-model="data[field]" autofocus /> -->
                </template>
            </Column>
             <Column  field="prochaine_rdv_prevue" header="datePrevue" style="width:10%">
                <template #body="{data}">
                    {{formatDate(new Date(data.prochaine_rdv_prevue))}}
                </template>
            </Column>
            <Column  field="prochaine_rdv_realise" header="dateRealiser" style="width:10%">
                <template #body="{data}">
                    <!-- <InputText v-model="data.prix_prevue" autofocus /> -->

                    {{formatDate(new Date(data.prochaine_rdv_realise))}}
                </template>
            </Column>
            <Column  field="prix_prevue" header="paimentPrevue" style="width:10%">
                <template #body="{ data}">
                    <span>{{data.prix_prevue}}</span>
                </template>
            </Column>
            <Column field="prix_realise" header="paimentRealiser" style="width:10%">
                <template #body="{ data }">
                    {{data.prix_realise}}
                </template>
            </Column>
            <Column field="ecart_paiment" header="paimentRealiser" style="width:10%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" />
                </template>
            </Column>
            <!-- <Column field="dateVersement" header="prenom" style="width:20%">
                <template #editor="{ data, field }">
                    <Dropdown v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value" placeholder="Select a Status">
                        <template #option="slotProps">
                        
                            <span :class="'product-badge status-' + slotProps.option.value.toLowerCase()">{{slotProps.option.label}}
                            
                            </span>
                        </template>
                    </Dropdown>
                </template>
                <template #body="slotProps">
                    {{getStatusLabel(slotProps.data.inventoryStatus)}}
                </template>
            </Column> -->
            
            <Column field="montant_verser"  header="Date" style="width:10%">
                <template #body="data">
                    <div class="car-details">
                    <span>{{formatDate(new Date(date_verser_banque))}}</span>
                        
                    </div>
                </template>
            </Column>
            <Column field="montant_verser"  header="Montant" :footer="montant_verser"  style="width:15%">
                <template  #body="data">

                    <span>{{montant_verser}}</span>
                    <!-- <InputText v-model="clientItems.montant_verse" /> -->
                </template>
            </Column>
            
            <ColumnGroup type="footer">
                <Row>
                    <Column footer="Total Paiement:" :colspan="3" footerStyle="text-align:right"/>
                    <Column :footer="totalPaiementPrevus" />
                    <Column :footer="totalPaiementRealiser" />
                    <Column :footer="totalPaiementRester" />
                
                    <Column footer="Total:" :colspan="1" footerStyle="text-align:right"/>
                    <Column :footer="montant_verser" :colspan="2" />
                    <!-- <Column  :colspan="2" >
                    {{montant_verser}}
                    </Column> -->
                    
                </Row>
            </ColumnGroup>
            <!-- @click="editCanva(slotProps.data)" -->
            <!-- {label: 'Edit',icon:'pi pi-pencil',command: ()=>{
                        editCanva(slotProps.data)}} 
                    :model="[
                        //     {label: 'Tranche',icon:'pi pi-plus',command: ()=>{
                        // showDialogueTranche(slotProps.data,clientItems)}},
                        {label: 'Delete',icon:'pi pi-trash',command: ()=>{
                        deleteCanvaConfirm(slotProps.data)}}]" 
                    -->
            <Column headerStyle="min-width:10rem;" header="Opérations">
                <template #body="slotProps">
                    <Button style="direction:ltr" 
                    @click="deleteCanvaConfirm(slotProps.data)"
                        icon="pi pi-trash" 
                        label= 'Supprimer'
                        class="p-button-outlined p-button-danger mb-2">
                    </Button>
                    
                </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="editDatashow" :style="{ width: '750px' }" header="Renseignements Logement" :modal="true"
            class="p-fluid"><br><br>
            <div class="p-fluid grid">
				
					
                    <div  class="field col-6">
                        <span class="p-float-label">
                            <InputText inputId="mile"  :disabled="true" id="name" v-model="rowEdit.nbr_tranche" />
                            <label for="name">Nombre de  tranche </label>
                        </span>
                    </div>
					
                    
                    
					<div  class="field col-6">
                        <span class="p-float-label">
                			<InputNumber inputId="horizontal" :min="0" :max="rowEdit.nbr_tranche"  v-model="rowEdit.num_tranche" showButtons buttonLayout="horizontal" :step="1"
                    		decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"  />
                            <!-- <InputText inputId="mile"  :disabled="true" id="name" v-model="dataTranche.last_tranche.num_tranche" /> -->
                            <label for="name">N° Tranche </label>
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
                            <!-- <InputText  v-model="dataTranche.last_tranche.prochaine_rdv_prevue"  /> -->
                            <Calendar v-model="rowEdit.prochaine_rdv_prevue" :showIcon="true" dateFormat="dd-mm-yy" />

                            <label>Prochaine Rendez-vous Prévue</label>
                        </span>
                    </div>
                    <div   class="field col-6">
                        <span class="p-float-label">
							<InputNumber inputId="horizontal" :min="0"  v-model="rowEdit.prix_prevue" mode="currency" currency="DZD"   />
                            <label for="name">Montant Prevus </label>
                        </span>
                    </div>
					<div   class="field col-6 ">
                        <span class="p-float-label">
                            <Calendar v-model="rowEdit.prochaine_rdv_realise" :showIcon="true" dateFormat="dd-mm-yy" />
                            <label>Prochaine Rendez-vous Réaliser</label>
                        </span>
                    </div>
					<div   class="field col-6">
                        <span class="p-float-label">
                            <InputNumber inputId="mile" :min="0"   id="name" v-model="rowEdit.prix_realise" mode="currency" currency="DZD"  />
                            <label for="name">Montant Réaliser </label>
                        </span>
                    </div>
					
                    
            </div>
			<template #footer>
                <Button  label="Save" icon="pi pi-check" class="p-button-text" @click="editTranche(rowEdit)" />
            </template>
            </Dialog>
            <Dialog v-model:visible="showTrancheInput" :style="{ width: '750px' }" header="Renseignements Logement" :modal="true"
            class="p-fluid"><br><br>
            <div class="p-fluid grid">
				
					<div  class="field col-6">
                        <span class="p-float-label">
                            <InputText :disabled="true" id="name" v-model="dataTranche.num_facture" />
                            <label for="name">Numéro de la facture </label>
                        </span>
                    </div>
                    <div  class="field col-6">
                        <span class="p-float-label">
                            <InputText inputId="mile"  :disabled="true" id="name" v-model="dataTranche.new_tranche.nbr_tranche" />
                            <label for="name">Nombre de  tranche </label>
                        </span>
                    </div>
					
                    
                    <div  class="field col-6 ">
                        <span class="p-float-label">
                            <InputText :disabled="true" v-model="dataTranche.fin_contrat"  :showIcon="true" dateFormat="dd-mm-yy" />
                            <label>Experation du contrat</label>
                        </span>
                    </div>
					<div  class="field col-6">
                        <span class="p-float-label">
                			<InputNumber inputId="horizontal" :min="0" :max="dataTranche.new_tranche.nbr_tranche"  v-model="dataTranche.new_tranche.num_tranche" showButtons buttonLayout="horizontal" :step="1"
                    		decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"  />
                            <!-- <InputText inputId="mile"  :disabled="true" id="name" v-model="dataTranche.last_tranche.num_tranche" /> -->
                            <label for="name">N° Tranche </label>
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
                            <!-- <InputText  v-model="dataTranche.last_tranche.prochaine_rdv_prevue"  /> -->
                            <Calendar v-model="dataTranche.new_tranche.prochaine_rdv_prevue" :showIcon="true" dateFormat="dd-mm-yy" />

                            <label>Prochaine Rendez-vous Prévue</label>
                        </span>
                    </div>
                    <div   class="field col-6">
                        <span class="p-float-label">
							<InputNumber inputId="horizontal" :min="0"  v-model="dataTranche.new_tranche.prix_prevue" mode="currency" currency="DZD"   />
                            <label for="name">Montant Prevus </label>
                        </span>
                    </div>
					<div   class="field col-6 ">
                        <span class="p-float-label">
                            <Calendar v-model="dataTranche.new_tranche.prochaine_rdv_realise" :showIcon="true" dateFormat="dd-mm-yy" />
                            <label>Prochaine Rendez-vous Réaliser</label>
                        </span>
                    </div>
					<div   class="field col-6">
                        <span class="p-float-label">
                            <InputNumber inputId="mile" :min="0"   id="name" v-model="dataTranche.new_tranche.prix_realise" mode="currency" currency="DZD"  />
                            <label for="name">Montant Réaliser </label>
                        </span>
                    </div>
					
                    
            </div>
			<template #footer>
                <Button  label="Annuler" icon="pi pi-check" class="p-button-text" @click="cancelTranche()" />
                <Button  label="Enregestrer" icon="pi pi-check" class="p-button-text" @click="addTranche(dataTranche)" />
            </template>
            </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import ClientsCard from "./ClientsCard.vue";
import moment from "moment";
// import axios from "axios"
import {FilterMatchMode} from 'primevue/api';
// import { response } from "express";
import { ref, computed,reactive ,toRefs} from 'vue'
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import api from '../api';
export default {
    props:{client:Object,listeFactureClient:Function,editclient:Function,clientDialog:Boolean},


    setup(props){
        // console.log("props",props.client);
        const sum= ref(0)
        const clientItems=ref()
        const totalPaiementPrevus=ref('')
        const clientHistory=ref (props.client.tranches_data)
        const montant_verser=ref (props.client.montant_verser)
        const date_verser_banque=ref (props.client.date_verser_banque)
        const dt = ref();
        const confirm = useConfirm();
		const toast = useToast();
        // const exportCSV = () => {
        //     dt.value.exportCSV();
        // };
        const formatDate = (value) => {
            return value.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        };
        
        const totalVersement= function(){
            let sum = 0;
            
            props.client.tranches_data.forEach(function(item) {
                sum += parseFloat(item.montant_verser) ;
                // sum_prix_realiser += parseFloat(item.prix_realise) ;
            });
            return sum;
        }
        clientHistory.value.montant_verser=montant_verser.value
        clientHistory.value.date_verser_banque=date_verser_banque.value
        clientItems.value=props.client
        function addTranche(dataTranche){
			// console.log(typeof prochaine_rdv_prevue.value,prochaine_rdv_realise.value);
			// dataTranche.last_tranche.prochaine_rdv_prevue=prochaine_rdv_prevue.value
			// dataTranche.last_tranche.prochaine_rdv_realise=prochaine_rdv_realise.value
			
			api.post('/tranches/',dataTranche.new_tranche)
                .then(response=>{
                    console.log( props.clientDialog);
                    props.listeFactureClient()
                    props.editclient(props.client)
                    props.clientDialog=false
                    
                    // props.editclient(clientItems.value)
					toast.add({severity:'success', summary: 'Successful', detail: 'Tranche ajouter avec succés', life: 3000});

                    showTrancheInput.value = false
                }).catch(error=>console.log(error)
                
				)
			// newTranche.value=dataTranche.value
		}
        function editTranche(dataTranche){
            console.log("dataTrancheED",dataTranche)
            api.put('/tranches/',dataTranche)
                .then(response=>{
                    props.listeFactureClient()
                    // props.editclient(props.client)
					toast.add({severity:'success', summary: 'Successful', detail: 'Canva Deleted', life: 3000});
                    editDatashow.value=false

                }).catch(error=>console.log(error)
				
				)
        }
        function exportCSV(infoClient,valueTable){
            // let date_debut=new Date(new Date(vExport$.value.interval.$model[0]).getTime()).getFullYear()+'-'+(new Date(new Date(vExport$.value.interval.$model[0]).getTime()).getMonth()+1)+'-01'
            // let date_fin=new Date(new Date(vExport$.value.interval.$model[1]).getTime()).getFullYear()+'-'+(new Date(new Date(vExport$.value.interval.$model[1]).getTime()).getMonth()+1)+'-01'
            // api.get('facture-clients/export/',
            //     {
            //         params:{
            //         'infoClient':infoClient,
            //         'valueTable':valueTable}
            //     }
            // )
            // .then((response) => {
                
                api.get(process.env.VUE_APP_API_URL+'facture-clients/export/?num_facture='+infoClient.num_facture, {
                            params: {
                                num_facture:infoClient.num_facture
                                // infoClient: infoClient,
                                // valueTable: valueTable
                            },responseType: 'blob'})
                    .then(response => {
                        if (response.status!=204){
                            const url = window.URL.createObjectURL(new Blob([response.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', 'Facture_Client.xlsx');
                            document.body.appendChild(link);
                            link.click();
   
                            toast.add({ severity: 'success', summary: 'Successful', detail: 'Operation completed successfully', life: 1000 });
                        }else{
                            toast.add({ severity: 'error', summary: 'Erreur', detail: 'il n\'est à pas des données à exporter', life: 1500 });
                        } 
                }).catch((error) => {
                toast.add({ severity: 'error', summary: 'Erreur', detail: 'L\'opération n\'est pas terminée avec succès', life: 1000 });

            })
                
            
            // dt.value.exportCSV();
            console.log('object')
        }
        function deleteCanva(product){
			// console.log("pppp",product);
			api.delete('/tranches/',{params:{id:product.id}})
                .then(response=>{
                props.listeFactureClient()
                // props.editclient(props.client)
				toast.add({severity:'success', summary: 'Successful', detail: 'Tranche supprimer avec succés', life: 3000});

                    // Object.assign(messageData,{subject:'',content: ''})
                    // files.value=[]
                    // compose.value = false
                }).catch(error=>console.log(error))
		}
		function deleteCanvaConfirm(product){
			confirm.require({
				message: 'Etes-vous sûr de vouloir supprimer cette tranche',
				header: 'Confirmation',
				icon: 'pi pi-exclamation-triangle',
				accept: () => {
					deleteCanva(product)

					//callback to execute when user confirms the action
				},
				reject: () => {
				toast.add({severity:'success', summary: 'Successful', detail: 'Opération annuler', life: 3000});

					//callback to execute when user rejects the action
            }
        });}
        const dataTranche=ref()
		const new_tranche=ref({nbr_tranche:'',num_tranche:0,fact_client:'',prix_prevue:0,prochaine_rdv_prevue:new Date(),prix_realise:0,prochaine_rdv_realise:new Date()})
		const showTrancheInput=ref(false)
        function showDialogueTranche(product,clientItems){
            console.log('product',product);
            // console.log('clientItems',clientItems.fin_contrat);
			dataTranche.value=product
			let nbr_tranche=dataTranche.value.nbr_tranche
			let num_tranche=dataTranche.value.num_tranche
			let fact_client=dataTranche.value.fact_client
			dataTranche.value['new_tranche']=new_tranche
			dataTranche.value.new_tranche.prochaine_rdv_prevue=dataTranche.value.prochaine_rdv_prevue
			dataTranche.value.new_tranche.prix_prevue=dataTranche.value.prix_prevue
			dataTranche.value.new_tranche.nbr_tranche=nbr_tranche
			dataTranche.value.new_tranche.num_tranche=parseInt(num_tranche)+1
			dataTranche.value.new_tranche.fact_client=fact_client
			dataTranche.value.fin_contrat=clientItems.fin_contrat
			dataTranche.value.num_facture=clientItems.num_facture

			showTrancheInput.value=true
		}
        const editDatashow=ref(false)
        const rowEdit=ref({nbr_tranche:'',num_tranche:0,fact_client:'',prix_prevue:0,prochaine_rdv_prevue:new Date(),prix_realise:0,prochaine_rdv_realise:new Date()})
		function editCanva(product){
            rowEdit.value=product
			editDatashow.value=true
        }

        return {addTranche,deleteCanvaConfirm,showDialogueTranche,editDatashow,rowEdit,editCanva,editTranche,showTrancheInput,dataTranche,
            clientItems,clientHistory,date_verser_banque,montant_verser,formatDate,totalVersement,exportCSV,dt}
    },
   computed: {
        totalPaiementPrevus: function(){
            let sum= 0;
            // let sum_prix_realiser = 0;
            // let sum_prix_prevue = 0;
            // console.log(this.client)
            this.client.tranches_data.forEach(function(item) {
                sum += parseFloat(item.prix_prevue) ;
                // sum_prix_realiser += parseFloat(item.prix_realise) ;
            });

            return sum;
        },
        totalPaiementRealiser: function(){
            let sum = 0;
            // let sum_prix_realiser = 0;
            // let sum_prix_prevue = 0;
            // console.log(this.client)
            this.client.tranches_data.forEach(function(item) {
                // alert(item.prix_realise)
                if (item.prix_realise==null){
                    item.prix_realise=0
                }
                    
                sum += parseFloat(item.prix_realise) ;
                // sum_prix_realiser += parseFloat(item.prix_realise) ;
            });

            return sum;
    },
        // totalPaiementRealiser: function(){
        //     let sum = 0;
        //     // let sum_prix_realiser = 0;
        //     // let sum_prix_prevue = 0;
        //     // console.log(this.client)
        //     this.client.tranches_data.forEach(function(item) {
        //         sum += parseFloat(item.prix_realise) ;
        //         // sum_prix_realiser += parseFloat(item.prix_realise) ;
        //     });

        //     return sum;
        // },
        totalPaiementRester: function(){
            let rest = 0;
            rest=this.totalPaiementPrevus-this.totalPaiementRealiser
            return rest;
        },
        // totalVersement: function(){
        //     let sum = 0;
            
        //     this.client.tranches_data.forEach(function(item) {
        //         sum += parseFloat(item.montant_verser) ;
        //         // sum_prix_realiser += parseFloat(item.prix_realise) ;
        //     });
        //     return sum;
        // }
        // totalVersement: function(){
        //     let sum = 0;
            
        //     this.client.tranches_data.forEach(function(item) {
        //         sum += parseFloat(item.montant_verser) ;
        //         // sum_prix_realiser += parseFloat(item.prix_realise) ;
        //     });
        //     return montant_verser;
        // }
    },
    
        // setup() {
        //     let prixPrevue = this.prix_prevue;
        //     let sommePrixPrevue=0
        //     totalPaiementPrevus=computed(
        //         function() {
        //             return `${prixPrevue}+${sommePrixPrevue}`
        //         }
        //     )
                        
                
        // },
        components: {
            ClientsCard,
        },
        name: "authors-table",
        data(props) {
            
            return {
                editingRows: [],
                columns: null,
                client: props.client.tranches_data,
                products2: null,
                products3: null,
                
                statuses: [
                    {label: 'In Stock', value: 'INSTOCK'},
                    {label: 'Low Stock', value: 'LOWSTOCK'},
                    {label: 'Out of Stock', value: 'OUTOFSTOCK'}
                ],
                filters: {
                    'ecahncierPaiment': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
                    'Nom': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
                    'Prénom': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
                    'Poids': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
                    'Taille': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
                }
            }
        },
        // productService: null,
        created() {
            // this.productService = new ProductService();

            this.initFilters();
            this.columns = [
                {field: 'ecahncierPaiment', header: 'ecahncierPaiment'},
            
            ];
            // this.selectedColumns = this.columns;
        },
        methods: {
            // onToggle(value) {
            //     this.selectedColumns = this.columns.filter(col => value.includes(col));
            // },
            getClient(){
                // axios.get("").then(
                //     this.client=response.data
                // ).catch()
            },
            onCellEditComplete(event) {
                let { data, newValue, field } = event;

                switch (field) {
                    case 'quantity':
                    case 'price':
                        if (this.isPositiveInteger(newValue))
                            data[field] = newValue;
                        else
                            event.preventDefault();
                    break;

                    default:
                        if (newValue.trim().length > 0)
                            data[field] = newValue;
                        else
                            event.preventDefault();
                    break;
                }
            },
            isPositiveInteger(val) {
                let str = String(val);
                str = str.trim();
                if (!str) {
                    return false;
                }
                str = str.replace(/^0+/, "") || "0";
                var n = Math.floor(Number(str));
                return n !== Infinity && String(n) === str && n >= 0;
            },
            onRowEditSave(event) {
                let { newData, index } = event;

                this.client[index] = newData;
            },
            getStatusLabel(status) {
                switch(status) {
                    case 'INSTOCK':
                        return 'In Stock';

                    case 'LOWSTOCK':
                        return 'Low Stock';

                    case 'OUTOFSTOCK':
                        return 'Out of Stock';

                    default:
                        return 'NA';
                }
            },
            nextPage() {

                this.submitted = true;
                if (this.validateForm() ) {

                    this.$store.commit('setPatient',"patient");
                    this.$emit('next-page', {formData: {num_doss: this.num_doss,nom: this.nom, prenom: this.prenom,adress: this.adress, sexe: this.sexe,date_naissance: this.date_naissance,date_dece: this.date_dece,age: this.age}, pageIndex: 0});
                    
                }
            },
            initFilters() {
                this.filters = {
                    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                }
            }
        }
}
</script>
