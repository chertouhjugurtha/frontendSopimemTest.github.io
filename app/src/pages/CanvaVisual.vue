<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<Toast/>
				<!--<Toolbar class="mb-4">
					 <template v-slot:start>
						<div class="my-2">
							<Button label="New" icon="pi pi-plus" class="p-button-success mr-2" />
							<Button label="Delete" icon="pi pi-trash" class="p-button-danger"  />
						</div>
					</template> 
					 <template v-slot:end>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" 
						label="Import" chooseLabel="Import" class="mr-2 inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template> 
				</Toolbar>-->

				<DataTable ref="dt" :value="originalClient"  dataKey="id" :paginator="true" :rows="10" :filters="filters"
					paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
					currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
					<SelectButton v-model="modeSearch" @change="filterCollumn()" :options="options" aria-labelledby="single" />
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Clients</h5>
							<span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
						</div>
					</template>
					<!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
					<Column header="N°Facture" field="num_facture" :sortable="true"></Column>
					<Column header="Nom" field="client.nom" :sortable="true"></Column>
					<Column header="Prenom" field="client.prenom" :sortable="true">
                		<!-- <template   #body="slotProps">
                    		<span>{{slotProps.data.client.nom}} {{slotProps.data.client.prenom}}</span>
                		</template> -->
            		</Column>
					
					<Column :style="showapprtement?'':'display: none'" field="appartement.type" header="Type app" :sortable="true" headerStyle="width:14%; min-width:10rem;">
					</Column>	
					<Column :style="showapprtement?'':'display: none'" field="appartement.num_lot" header="N° Lot" :sortable="true" headerStyle="width:14%; min-width:8rem;">						
					</Column>
					<Column :style="showapprtement?'':'display: none'" field="appartement.box.num_place" header="Box" :sortable="true" headerStyle="width:14%; min-width:8rem;">						
					</Column>
					<Column :style="showbox?'':'display: none'"  field="box.num_place" header="Box" :sortable="true" headerStyle="width:14%; min-width:10rem;">
					</Column>
					<Column :style="showlocale?'':'display: none'"  field="locale.num_place" header="locale" :sortable="true" headerStyle="width:14%; min-width:10rem;">
					</Column>
					
					<!-- <Column  header="Prix Prevue">
                		<template  #body="slotProps">
							
                    		<span >{{slotProps.data.last_tranche.prix_prevue}}DA</span>
                		</template>
            		</Column>
					<Column header="Rdv Prevue">
                		<template #body="slotProps">
                    		<span >{{formatDate(new Date(slotProps.data.last_tranche.prochaine_rdv_prevue ))}}</span>
                		</template>
            		</Column> -->
					<Column   header="Avancement" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<div>
								<ProgressBar  :value="(slotProps.data.tranches_data.length<=0) ?100:calculePocentage(slotProps.data.tranches_data)"  />
							</div>
							 
						</template>
						
					</Column>
					<Column headerStyle="min-width:10rem;" header="Opérations">
						<!-- ,{label: 'Edit',icon:'pi pi-pencil',command: ()=>{
                                editCanva(slotProps.data)}} -->
						<template #body="slotProps">
							<SplitButton style="direction:ltr" @click="editclient(slotProps.data)" 
                                label="Détails" icon="pi pi-eye" 
                                :model="[
									{label: 'Tranche',icon:'pi pi-plus',command: ()=>{
                                (slotProps.data.last_tranche.length<=0) ?'':showDialogueTranche(slotProps.data)}},
								{label: 'Delete',icon:'pi pi-trash',command: ()=>{
								deleteCanvaConfirm(slotProps.data)}}]" class="p-button-outlined p-button-secondary mb-2">
                            </SplitButton>
							
						</template>
					</Column>
				</DataTable>
			    <Toast />
				<ConfirmDialog></ConfirmDialog>
				<Dialog v-model:visible="clientDialog" :style="{width: '90%'}" header="" :modal="true" class="p-fluid">
					<div class=" row">
						<div class="col-12">
							<AuthorsTable :client="client_edit" :editclient="editclient" :listeFactureClient="listeFactureClient" :clientDialog="clientDialog" />
						</div>
					</div>
				</Dialog>
				<Dialog  v-model:visible="showTrancheInput" :style="{ width: '750px' }" header="Renseignements Logement" :modal="true"
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
						
						<!-- <InputText inputId="mile"  v-if="dataTranche.last_tranche.length === 0"  id="name" v-model="dataTranche.last_tranche.nbr_tranche" /> -->
						<InputText inputId="mile"   :disabled="true"  id="name" v-model="dataTranche.new_tranche.nbr_tranche" />
						<label for="name">Nombre de  tranche </label>
					</span>
				</div>
				
				
				<div  class="field col-6 ">
					<span class="p-float-label">
						<Calendar v-if="dataTranche.last_tranche.length === 0"  v-model="dataTranche.fin_contrat"  :showIcon="true" dateFormat="dd-mm-yy" />
						<InputText v-else :disabled="true" v-model="dataTranche.fin_contrat"  :showIcon="true" dateFormat="dd-mm-yy" />
						<label>Experation du contrat</label>
					</span>
				</div>
				<div  class="field col-6">
					<span class="p-float-label">
						<InputNumber inputId="horizontal" :min="dataTranche.new_tranche.nbr_tranche" :max="dataTranche.new_tranche.nbr_tranche"  v-model="dataTranche.new_tranche.num_tranche" showButtons buttonLayout="horizontal" :step="1"
						decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"  />
						<!-- <InputText inputId="mile"  :disabled="true" id="name" v-model="dataTranche.last_tranche.num_tranche" /> -->
						<label for="name">N° Tranche Précédente </label>
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
import {ref,onMounted,reactive, toRefs} from 'vue'
import router from '../router';
import AuthorsTable from "./AuthorsTable.vue";
//import { defineComponent } from "vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import api from '../api';
import { FilterMatchMode } from 'primevue/api';


export default {
	components: {
    	AuthorsTable
  	},
	setup(){
		
		const clients=ref([])
		const modeSearch=ref("appartement")

		const options = ref(['appartement','box', 'locale']);
		const prochaine_rdv_realise=ref(new Date())
		const prochaine_rdv_prevue=ref(new Date())
		const showTrancheInput=ref(false) 
        const confirm = useConfirm();
		const toast = useToast();
		const clientDialog=ref(false)
		
		// const client=computed(() =>{
		// 	return `${firstname} ${lastname}`
		// })
		const value=ref(50);
		const client_edit=ref()
		// const clients=ref([
		// { client: 'chertouh jugurtha',residence:"Bella Vista",num_lot:"100/76",prix_ttc:"20000000000", type: 'F3', numLot: '12' ,prixPrevue:'10000000000',prochaineRdvPrevue:'2020-04-01',avancement:value},
       	// { client: 'Bouhbaka Kadour',residence:"Bella Vista",num_lot:"100/76",prix_ttc:"20000000000", type: 'F5', numLot: '20' ,prixPrevue:'200000000000',prochaineRdvPrevue:'1970-01-01',avancement:value},
        // { client: 'benabderahman anis',residence:"Bella Vista",num_lot:"100/76",prix_ttc:"20000000000", type: 'F3', numLot: '18' ,prixPrevue:'1000000000',prochaineRdvPrevue:'2019-11-04',avancement:value}


		// ]);

		const filters = ref({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        });
		function editclient(client) {
			client = {...client};
			
			if 	(client.tranches_data.length==0)client.tranches_data.push({
				fact_client: client.id,
				num_tranche: 1,
				prix_prevue: client.prix_HT,
				prix_realise: client.prix_HT,
				prochaine_rdv_prevue: client.contrat_du,
				prochaine_rdv_realise: client.contrat_du
			})
			client_edit.value=client
			clientDialog.value = true;
		};
		const originalClient=ref(clients.value)
		function listeFactureClient(){
			api.get('/facture-client/?canvas=true&limit=100').then(response => {
			clients.value = response.data
			if (localStorage.getItem("tablesRowsFacture")!=null){
				modeSearch.value= localStorage.getItem("tablesRowsFacture");	
				switch (modeSearch.value) {
				case "appartement":
					
            		
					originalClient.value=clients.value.filter(
						function(el){
							if (el.appartement!=null){
								return el
							}
						}
					)
					break;
				case "locale":
					
            		// storagePromise;
					originalClient.value=clients.value.filter(
						function(el){
							if (el.locale!=null){
								return el
							}
						}
					)
					break;
				case "box":
					
					
					originalClient.value=clients.value.filter(
						function(el){
							if (el.box!=null){
								return el
							}
						}
					)
					break;
				default:
					
					
					originalClient.value=clients.value.filter(
						function(el){
							if (el.appartement!=null){
								return el
							}
						}
					)
					// clients.value=originalClient.value
					break;
			}
				}
			else{	
				originalClient.value=clients.value.filter(
						function(el){
							if (el.appartement!=null){
								return el
							}
						}
					)
				}
        	})
			.catch(error => {
				console.log(error.response.data)
			})
		}
		
		
		const editDatashow=ref(false)
		function editCanva(product){
			console.log("editable",product);
			editDatashow.value=true
			// router.push('/canvas')
		}
		function editingDialogue(){
			api.put('/facture-client/',{params:{id:product.id}})
                .then(response=>{
                    console.log(response.data);
				listeFactureClient()
				toast.add({severity:'success', summary: 'Successful', detail: 'Canva Deleted', life: 3000});
                    // Object.assign(messageData,{subject:'',content: ''})
                    // files.value=[]
                    // compose.value = false
                }).catch(error=>console.log(error))
		}
		function deleteCanva(product){
			console.log("pppp",product);
			api.delete('/facture-client/',{params:{id:product.id}})
                .then(response=>{
                    console.log(response.data);
				listeFactureClient()
				toast.add({severity:'success', summary: 'Successful', detail: 'Canva Deleted', life: 3000});

                    // Object.assign(messageData,{subject:'',content: ''})
                    // files.value=[]
                    // compose.value = false
                }).catch(error=>console.log(error))
		}
		function deleteCanvaConfirm(product){
			confirm.require({
				message: 'Are you sure you want to proceed?',
				header: 'Confirmation',
				icon: 'pi pi-exclamation-triangle',
				accept: () => {
					deleteCanva(product)
					//callback to execute when user confirms the action
				},
				reject: () => {
				toast.add({severity:'success', summary: 'Successful', detail: 'cancel operation', life: 3000});

					//callback to execute when user rejects the action
            }
        });}
					
		const showapprtement=ref(true)
		const showlocale=ref(false)
		const showbox=ref(false)
		function formatDate(value) {
            return value.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        }
		const dataTranche=ref()

		const new_tranche=ref({nbr_tranche:'',num_tranche:0,fact_client:'',prix_prevue:0,prochaine_rdv_prevue:new Date(),prix_realise:0,prochaine_rdv_realise:new Date()})
		function showDialogueTranche(product){
			dataTranche.value=product
			var nbr_tranche=product.tranches_data.length+1
			var num_tranche=product.tranches_data.length+1

			// if (dataTranche.value.last_tranche.length!==0) {
			// 	 nbr_tranche=dataTranche.value.last_tranche.nbr_tranche
			// 	 num_tranche=dataTranche.value.last_tranche.num_tranche
			// }
			var fact_client=dataTranche.value.last_tranche.fact_client
			
			dataTranche.value['new_tranche']=new_tranche
			dataTranche.value.new_tranche.prochaine_rdv_prevue=dataTranche.value.last_tranche.prochaine_rdv_prevue
			dataTranche.value.new_tranche.prix_prevue=dataTranche.value.last_tranche.prix_prevue
			dataTranche.value.new_tranche.nbr_tranche=parseInt(nbr_tranche)
			dataTranche.value.new_tranche.num_tranche=parseInt(num_tranche)
			dataTranche.value.new_tranche.fact_client=fact_client

			showTrancheInput.value=true
			// router.push('/canvas')
		}
		function filterCollumn(){
			originalClient.value=clients.value
			switch (modeSearch.value) {
				case "appartement":
					localStorage.setItem("tablesRowsFacture", 'appartement');
            		// storagePromise;
					showapprtement.value=true
					showlocale.value=false
					showbox.value=false
					originalClient.value=clients.value.filter(
						function(el){
							if (el.appartement!=null){
								return el
							}
						}
					)
					break;
				case "locale":
					localStorage.setItem("tablesRowsFacture", 'locale');
            		// storagePromise;
					showlocale.value=true
					showapprtement.value=false
					showbox.value=false
					originalClient.value=clients.value.filter(
						function(el){
							if (el.locale!=null){
								return el
							}
						}
					)
					break;
				case "box":
					localStorage.setItem("tablesRowsFacture", 'box');
					showapprtement.value=false
					showlocale.value=false
					showbox.value=true
					originalClient.value=clients.value.filter(
						function(el){
							if (el.box!=null){
								return el
							}
						}
					)
					break;
				default:
					modeSearch.value="appartement"
					showapprtement.value=true
					showlocale.value=false
					showbox.value=false
					originalClient.value=clients.value.filter(
						function(el){
							if (el.appartement!=null){
								return el
							}
						}
					)
					// clients.value=originalClient.value
					break;
			}
			

		}
		
		function cancelTranche(){
			
			dataTranche.value.new_tranche={}
		}
		function addTranche(dataTranche){
			// console.log(typeof prochaine_rdv_prevue.value,prochaine_rdv_realise.value);
			// dataTranche.last_tranche.prochaine_rdv_prevue=prochaine_rdv_prevue.value
			// dataTranche.last_tranche.prochaine_rdv_realise=prochaine_rdv_realise.value
			console.log("dataTranche------W",dataTranche);
			api.post('/tranches/',dataTranche.new_tranche)
                .then(response=>{
					listeFactureClient()
					toast.add({severity:'success', summary: 'Successful', detail: 'Canva Deleted', life: 3000});

                    showTrancheInput.value = false
                }).catch(error=>console.log(error)
				
				)
			// newTranche.value=dataTranche.value
		}
		
		function calculePocentage(data){
			let len= data.length
			let tb=[]
			data.forEach(element => {
				if (element.prix_realise>=element.prix_prevue){
					tb.push(element)
				}
			});
			return parseFloat(tb.length/len*100).toFixed(2)
		}
		onMounted(() => {
			let i=1
			console.log(i+=1,"eeeeeeeee");
			listeFactureClient()
        });
		return{calculePocentage,
			clients,showapprtement,showlocale,showbox,filterCollumn,options,listeFactureClient,editingDialogue,
			modeSearch,client_edit,editCanva,editclient,showTrancheInput,dataTranche,prochaine_rdv_realise,prochaine_rdv_prevue,
			deleteCanvaConfirm,filters,value,clientDialog,originalClient,addTranche,formatDate,showDialogueTranche,cancelTranche
		}

	}
	
}
</script>

<style scoped lang="scss">
@import '../assets/demo/badges.scss';
</style>
