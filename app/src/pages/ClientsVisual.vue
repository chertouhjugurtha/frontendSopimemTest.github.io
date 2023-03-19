<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<Toast/>
				<Toolbar class="mb-4">
					<!-- <template v-slot:start>
						<div class="my-2">
							<Button label="New" icon="pi pi-plus" class="p-button-success mr-2" />
							<Button label="Delete" icon="pi pi-trash" class="p-button-danger"  />
						</div>
					</template> -->
					<template v-slot:end>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" 
						label="Import" chooseLabel="Import" class="mr-2 inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="clients"  dataKey="id" :paginator="true" :rows="10" :filters="filters"
							paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
							currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Liste de Clients <Badge class="mr-2"><span >{{intToString( clients.length) }}</span></Badge></h5>
							<span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
						</div>
					</template>
					<!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
					<Column header="Nom" field="nom" :sortable="true"></Column>
					<Column header="Prenom" field="prenom" :sortable="true">
                		<!-- <template   #body="slotProps">
                    		<span>{{slotProps.data.client.nom}} {{slotProps.data.client.prenom}}</span>
                		</template> -->
            		</Column>
					<Column header="Email" field="emailClient" :sortable="true"></Column>
					<Column header="N°Tél" field="phoneClient" :sortable="true"></Column>
					<Column header="Adresse" field="adresse" :sortable="true"></Column>
				
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
					
					
					
					
					<Column headerStyle="min-width:10rem;" header="Opérations">
						<!-- ,{label: 'Edit',icon:'pi pi-pencil',command: ()=>{
                                editClientDialog(slotProps.data)}} -->
						<template #body="slotProps">
							<SplitButton style="direction:ltr" @click="detailsclient(slotProps.data)" 
                                label="Détails" icon="pi pi-eye" 
                                :model="[{label: 'Modifier',icon:'pi pi-plus',command: ()=>{editClientDialog(slotProps.data)}}
								,{label: 'Delete',icon:'pi pi-trash',command: ()=>{deleteCanvaConfirm(slotProps.data)}}
								]"
								 class="p-button-outlined p-button-secondary mb-2">
                            </SplitButton>
							
						</template>
					</Column>
				</DataTable>
			    <Toast />
				<ConfirmDialog></ConfirmDialog>
				<Dialog v-model:visible="clientDialog" :style="{width: '60%'}" header="" :modal="true" class="p-fluid">
					<br>
					<div class="formgrid grid">
						<div class="field col">
							<div class="field col">
								<label for="nom"> Nom
								</label>
								<p id="nom"   disabled style="border:none ; font-weight: bold;font-size: smaller;"
									>{{ client_edit.nom }} </p>
							</div>
						</div>
						<div class="field col">
							<div class="field col">
								<label for="type_prop" > Prénom</label>
								<p id="type_prop"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ client_edit.prenom }}</p>
							</div>
						</div>
						<div class="field col">
							<div class="field col">
								<label for="type_prop" >N° Piéce/Type Piéce</label>
								<p id="type_prop" disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ client_edit.num_piece }}/{{client_edit.type_piece}}</p>
							</div>
						</div>
					</div>
					<div class="formgrid grid">
						<div class="field col">
							<div class="field col">
								<label for="nom"> Date de Naissance
								</label>
								<p id="nom"   disabled style="border:none ; font-weight: bold;font-size: smaller;"
									>{{ client_edit.date_naissance.toString().slice(0,10) }} </p>
							</div>
						</div>
						<div class="field col">
							<div class="field col">
								<label for="type_prop" >N° Tél</label>
								<p id="type_prop" disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ client_edit.phoneClient }}</p>
							</div>
						</div>
						<div class="field col">
							<div class="field col">
								<label for="type_prop" >N° Fax</label>
								<p id="type_prop" disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ client_edit.faxClient }}</p>
							</div>
						</div>
						
						
					</div>
					<div class="formgrid grid">
						<div class="field col">
							<div class="field col">
								<label for="nom"> E-mail
								</label>
								<p id="nom"   disabled style="border:none ; font-weight: bold;font-size: smaller;"
									>{{ client_edit.emailClient }} </p>
							</div>
						</div>
						<div class="field col">
							<div class="field col">
								<label for="type_prop" > Adresse</label>
								<p id="type_prop"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ client_edit.adresse }}/{{ client_edit.algeriaCities_m.wilaya }}--{{ client_edit.algeriaCities_m.commune }}</p>
							</div>
						</div>
						<div class="field col">
							<div class="field col">
								<label for="type_prop" >Wilaya -- Commune</label>
								<p id="type_prop"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ client_edit.algeriaCities_m.wilaya }}--{{ client_edit.algeriaCities_m.commune }}</p>
							</div>
						</div>
					</div>
				</Dialog>
				<Dialog  v-model:visible="editDatashow" :style="{ width: '750px' }" header="Renseignements Logement" :modal="true"
            class="p-fluid"><br>
			<p style="font-size: 12px;">(<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>): Des champs obligatoires à saisire, &nbsp; &nbsp;&nbsp;
            (<i class="text-green-400 font-large" style="font-size: 18px ;">? </i>): Des champs optionnels à saisire
            </p> 
			<div class="p-fluid grid">
				<div  class="field col-6">
					<label   for="num_piece" :class="{ 'p-error': vEdit$.num_piece.$invalid && submitted }"> Num piéce (<i   > <span class="text-red-400 font-large" style="font-size: 18px ;">* </span ></i>)
					</label>
					<InputText showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" id="num_piece" v-model="vEdit$.num_piece.$model" 
						:class="{ 'p-invalid': vEdit$.num_piece.$invalid && submitted }" />
					<small v-if="(vEdit$.num_piece.$invalid && submitted) || vEdit$.num_piece.$pending.$response"
						class="p-error">Ce champ est obligatoire</small>	
				</div>
				<div  class="field col-6">
					<label   for="type_piece" :class="{ 'p-error': vEdit$.type_piece.$invalid && submitted }"> Type piéce (<i   > <span class="text-red-400 font-large" style="font-size: 18px ;">* </span ></i>)
					</label>
					<Dropdown  :editable="true"  showButtons  optionLabel="label" optionValue="value" :options="typePieceClass"  decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" id="type_piece" v-model="vEdit$.type_piece.$model" 
						:class="{ 'p-invalid': vEdit$.type_piece.$invalid && submitted }" />
					<small v-if="(vEdit$.type_piece.$invalid && submitted) || vEdit$.type_piece.$pending.$response"
						class="p-error">Ce champ est obligatoire</small>
				</div>				
			</div>
            <div class="p-fluid grid">
				<div  class="field col-6">
					<label   for="nom" :class="{ 'p-error': vEdit$.nom.$invalid && submitted }"> Nom (<i   > <span class="text-red-400 font-large" style="font-size: 18px ;">* </span ></i>)
					</label>
					<InputText showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" id="nom" v-model="vEdit$.nom.$model" 
						:class="{ 'p-invalid': vEdit$.nom.$invalid && submitted }" />
					<small v-if="(vEdit$.nom.$invalid && submitted) || vEdit$.nom.$pending.$response"
						class="p-error">Ce champ est obligatoire</small>
				</div>
				<div  class="field col-6">
					<label   for="prenom" :class="{ 'p-error': vEdit$.prenom.$invalid && submitted }"> Prénom (<i   > <span class="text-red-400 font-large" style="font-size: 18px ;">* </span ></i>)
					</label>
					<InputText showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" id="nom" v-model="vEdit$.prenom.$model" 
						:class="{ 'p-invalid': vEdit$.prenom.$invalid && submitted }" />
					<small v-if="(vEdit$.prenom.$invalid && submitted) || vEdit$.prenom.$pending.$response"
						class="p-error">Ce champ est obligatoire</small>
				</div>    
            </div>
			<div class="p-fluid grid">
				<div  class="field col-6">
					<label   for="adresse" :class="{ 'p-error': vEdit$.adresse.$invalid && submitted }"> Adresse (<i   > <span class="text-red-400 font-large" style="font-size: 18px ;">* </span ></i>)
					</label>
					<InputText showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" id="adresse" v-model="vEdit$.adresse.$model" 
						:class="{ 'p-invalid': vEdit$.adresse.$invalid && submitted }" />
					<small v-if="(vEdit$.adresse.$invalid && submitted) || vEdit$.adresse.$pending.$response"
						class="p-error">Ce champ est obligatoire</small>
				</div>
				<div  class="field col-6">
					<label   for="phoneClient" :class="{ 'p-error': vEdit$.phoneClient.$invalid && submitted }"> N°Tél (<i   > <span class="text-red-400 font-large" style="font-size: 18px ;">* </span ></i>)
					</label>
					<InputText showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" id="phoneClient" v-model="vEdit$.phoneClient.$model" 
						:class="{ 'p-invalid': vEdit$.phoneClient.$invalid && submitted }" />
					<small v-if="(vEdit$.phoneClient.$invalid && submitted) || vEdit$.phoneClient.$pending.$response"
						class="p-error">Ce champ est obligatoire</small>
					
				</div>    
            </div>
			<div class="p-fluid grid">
				<div  class="field col-6">
					<label   for="nom" :class="{ 'p-error': vEdit$.wilaya.$invalid && submitted }"> Wilaya (<i   > <span class="text-red-400 font-large" style="font-size: 18px ;">* </span ></i>)
					</label>
					<Dropdown :editable="true"  id="dropdown" v-model="vEdit$.wilaya.$model" :options="Wilayas" :filter="true" :showClear="true" 
                        :optionLabel="localeLang == 'ar' ? 'ar_name' : 'name'" optionValue="code"  @change="getCommuneByWilaya()"
                        />
					<small v-if="(vEdit$.wilaya.$invalid && submitted) || vEdit$.wilaya.$pending.$response"
						class="p-error">Ce champ est obligatoire</small>
					
				</div>
				<div  class="field col-6">
					<label   for="commune" :class="{ 'p-error': vEdit$.commune.$invalid && submitted }"> Commune (<i   > <span class="text-red-400 font-large" style="font-size: 18px ;">* </span ></i>)
					</label>
					<Dropdown  :editable="true" id="dropdown" v-model="vEdit$.commune.$model" :filter="true" :showClear="true"
                        :class="{ 'p-invalid': vEdit$.commune.$invalid && submitted }" :options="communesByWilaya"
                        :optionLabel="localeLang == 'ar' ? 'commune_name' : 'commune_name_ascii'" 
                        optionValue="id" />
					<small v-if="(vEdit$.commune.$invalid && submitted) || vEdit$.commune.$pending.$response"
						class="p-error">Ce champ est obligatoire</small>
					
				</div>    
            </div>
			<div class="p-fluid grid">
				<div  class="field col-6">
					<label   for="emailClient" :class="{ 'p-error': vEdit$.emailClient.$invalid && submitted }"> E-mail (<i   > <span class="text-red-400 font-large" style="font-size: 18px ;">* </span ></i>)
					</label>
					<InputText showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" id="wilaya" v-model="vEdit$.emailClient.$model" 
						:class="{ 'p-invalid': vEdit$.emailClient.$invalid && submitted }" />
					<small v-if="(vEdit$.emailClient.$invalid && submitted) || vEdit$.emailClient.$pending.$response"
						class="p-error">Ce champ est obligatoire</small>
					
				</div>
				<div  class="field col-6">
					<label   for="faxClient" :class="{ 'p-error': vEdit$.faxClient.$invalid && submitted }"> Fax (<i   > <span class="text-red-400 font-large" style="font-size: 18px ;">* </span ></i>)
					</label>
					<InputText showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" id="faxClient" v-model="vEdit$.faxClient.$model" 
						:class="{ 'p-invalid': vEdit$.faxClient.$invalid && submitted }" />
					<small v-if="(vEdit$.faxClient.$invalid && submitted) || vEdit$.faxClient.$pending.$response"
						class="p-error">Ce champ est obligatoire</small>
					
				</div>    
            </div>
			
			<template #footer>
                <Button  label="Cancel" icon="pi pi-check" class="p-button-text" @click="editDatashow = false; submitted = false" />
                <Button  label="Save" icon="pi pi-check" class="p-button-text" @click="editingDialogue()" />
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
import { required,numeric } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Wilayas from '../../public/data/algeria/wilaya.json'

export default {
	components: {
    	AuthorsTable
  	},
	setup(){
		const rulesEdit = {
			nom:{required},
			prenom:{required},
			num_piece:{required},
			date_naissance:{required},
			type_piece:{required},
			adresse:{required},
			wilaya: {required},
			commune: {required},
			phoneClient:{required},
			emailClient:{required},
			faxClient:{required}
        };
		const clients=ref([])
		const modeSearch=ref("appartement")

		const options = ref(['appartement','box', 'locale']);
		const prochaine_rdv_realise=ref(new Date())
		const prochaine_rdv_prevue=ref(new Date())
		const showTrancheInput=ref(false) 
        const confirm = useConfirm();
		const toast = useToast();
		const clientDialog=ref(false)
        const submitted = ref(false)

		
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
			client_edit.value=client
			clientDialog.value = true;
		};
		const originalClient=ref(clients.value)
		const edit_clients=ref({
			nom:"",
			prenom:"",
			num_piece:"",
			date_naissance:"",
			type_piece:"",
			adresse:"",
			wilaya:"",
			commune:"",
			phoneClient:"",
			emailClient:"",
			faxClient:"",
		})
		const clientsSet=ref({
			nom:"",
			prenom:"",
			num_piece:"",
			date_naissance:"",
			type_piece:"",
			adresse:"",
			algeria_cities:"",
			phoneClient:"",
			emailClient:"",
			faxClient:"",
		})
        const communesByWilaya = ref([])
		const vEdit$=useVuelidate(rulesEdit, edit_clients.value);
		function listeFactureClient(){
			api.get('/clients/?canvas=true&limit=100').then(response => {
			clients.value = response.data.results
			// originalClient.value=clients.value
			originalClient.value=clients.value.filter(
						function(el){
							if (el.appartement!=null){
								return el
							}
						}
					)
			console.log(clients.value);
            })
                .catch(error => {
                    console.log(error.response.data)
            })
		}
		const algeriaCities=ref(null)
        function getAlgerieCitiesId(id){
            api.get('/algeria-cities/?id='+id)
                .then((response) => {
                    algeriaCities.value = response.data.results[0]
					// console.log(algeriaCities.value,'dddddddd');
                }).catch((error) => {
                    console.log(error);
                })
        }
		const wilaya_code=ref('')
		function getCommuneByWilaya() {
            api.get('/algeria-cities/?wilaya_code='+vEdit$.value.wilaya.$model)
                .then((response) => {
                    communesByWilaya.value = response.data.results
                    communesByWilaya.value.sort((a, b) => { return a.id > b.id })
                }).catch((error) => {   
            })
        }
		const editDatashow=ref(false)
		function detailsclient(obj){
			client_edit.value=obj
			clientDialog.value=true
		}
		const idClients=ref('')
		function editClientDialog(obj){
			editDatashow.value=true
			idClients.value=obj.id
			console.log(obj,'888888888888');
            // getAlgerieCitiesId(obj.algeria_cities)
			setTimeout(() => {
				vEdit$.value.prenom.$model=obj.prenom
				vEdit$.value.nom.$model=obj.nom
				vEdit$.value.num_piece.$model=obj.num_piece
				vEdit$.value.date_naissance.$model=obj.date_naissance
				vEdit$.value.type_piece.$model=obj.type_piece
				vEdit$.value.adresse.$model=obj.adresse
				vEdit$.value.wilaya.$model=obj.algeriaCities_m.wilaya.toString()
				vEdit$.value.commune.$model=obj.algeriaCities_m.commune.toString()
				vEdit$.value.phoneClient.$model=obj.phoneClient
				vEdit$.value.emailClient.$model=obj.emailClient
				vEdit$.value.faxClient.$model=obj.faxClient
			// router.push('/canvas')
		},200)
		}
		function editingDialogue(){
			if (!vEdit$.value.$invalid) {
				//vEdit$.value.commune.$model=algeriaCities.value.id
				console.log(vEdit$.value.commune.$model,'oooooooooo');
				if (vEdit$.value.commune.$model.length>=35){
					edit_clients.value.algeria_cities = vEdit$.value.commune.$model
				}
				// console.log(vEdit$.value.commune.$model);
					// vEdit$.value.commune.$model=algeriaCities.value.id

					// clientsSet.value.prenom=vEdit$.value.prenom.$model
					// clientsSet.value.nom=vEdit$.value.nom.$model
					// clientsSet.value.num_piece=vEdit$.value.num_piece.$model
					// clientsSet.value.date_naissance=vEdit$.value.date_naissance.$model
					// clientsSet.value.type_piece=vEdit$.value.type_piece.$model
					// clientsSet.value.adresse=vEdit$.value.adresse.$model
					// clientsSet.value.algeria_cities=vEdit$.value.commune.$model
					// clientsSet.value.phoneClient=vEdit$.value.phoneClient.$model
					// clientsSet.value.emailClient=vEdit$.value.emailClient.$model
					// clientsSet.value.faxClient=vEdit$.value.faxClient.$model
                // getAlgerieCities()
                setTimeout(() => {
			api.put('/clients/'+idClients.value+'/',edit_clients.value)
                .then(response=>{
					setTimeout(() => {
						listeFactureClient()
						editDatashow.value = false;
						submitted.value = false
						Object.keys(edit_clients.value).forEach(key => {
							
							edit_clients.value[key] = '';
						});

					}, 500)
                    console.log(response.data);
				
					toast.add({severity:'success', summary: 'Successful', detail: 'Clients à été modifier avec succées', life: 3000});
				
                    // Object.assign(messageData,{subject:'',content: ''})
                    // files.value=[]
                    // compose.value = false
                }).catch(error=>console.log(error))
			}, 200)
                
            } else {
                submitted.value = true
            }
		}
		function deleteCanva(product){
			console.log("pppp",product);
			api.delete('/clients/'+product.id+'/')
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
		function intToString(num) {
			num = num.toString().replace(/[^0-9.]/g, '');
			if (num < 1000) {
				return num;
			}
			let si = [
			{v: 1E3, s: "K"},
			{v: 1E6, s: "M"},
			{v: 1E9, s: "B"},
			{v: 1E12, s: "T"},
			{v: 1E15, s: "P"},
			{v: 1E18, s: "E"}
			];
			let index;
			for (index = si.length - 1; index > 0; index--) {
				if (num >= si[index].v) {
					break;
				}
			}
			return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
		}
		const typePieceClass=ref([
                    {label: 'Permis de conduire', value: 'CP'},
                    {label: 'Passport', value: 'PASSPORT'},
                    {label: 'Carte national', value: 'CN'}
                ]);
		const new_tranche=ref({nbr_tranche:'',num_tranche:0,fact_client:'',prix_prevue:0,prochaine_rdv_prevue:new Date(),prix_realise:0,prochaine_rdv_realise:new Date()})
		function showDialogueTranche(product){
			dataTranche.value=product
			var nbr_tranche=0
			var num_tranche=0

			if (dataTranche.value.last_tranche.length!==0) {
				 nbr_tranche=dataTranche.value.last_tranche.nbr_tranche
				 num_tranche=dataTranche.value.last_tranche.num_tranche
			}
			var fact_client=dataTranche.value.last_tranche.fact_client
			
			dataTranche.value['new_tranche']=new_tranche
			dataTranche.value.new_tranche.prochaine_rdv_prevue=dataTranche.value.last_tranche.prochaine_rdv_prevue
			dataTranche.value.new_tranche.prix_prevue=dataTranche.value.last_tranche.prix_prevue
			dataTranche.value.new_tranche.nbr_tranche=nbr_tranche
			dataTranche.value.new_tranche.num_tranche=parseInt(num_tranche)+1
			dataTranche.value.new_tranche.fact_client=fact_client

			showTrancheInput.value=true
			// router.push('/canvas')
			console.log("DataTranche canva>Visuel",dataTranche);
		}
		function filterCollumn(){
			originalClient.value=clients.value
			switch (modeSearch.value) {
				case "appartement":
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
		function openDetail(data){
        
			detailcati.value=data
			// myArr.value=detailcati.value.organisme.phone;
			detailBool.value=true

		}
		onMounted(() => {
			listeFactureClient()
        });
		return{intToString,rulesEdit,vEdit$,edit_clients,detailsclient,editDatashow,getAlgerieCitiesId,algeriaCities,
			typePieceClass,communesByWilaya,wilaya_code,getCommuneByWilaya,Wilayas,submitted,idClients,clients,showapprtement,showlocale,showbox,filterCollumn,options,listeFactureClient,editingDialogue,
			modeSearch,client_edit,editClientDialog,editclient,showTrancheInput,dataTranche,prochaine_rdv_realise,prochaine_rdv_prevue,
			deleteCanvaConfirm,filters,value,clientDialog,openDetail,originalClient,addTranche,formatDate,showDialogueTranche,cancelTranche
		}

	}
	
}
</script>

<style scoped lang="scss">
@import '../assets/demo/badges.scss';
</style>
