
<template>
    <div class="stepsdemo-content">
        <Card>
            <template  v-slot:title>
                <Divider align="center" type="dotted">
                    
                    <label v-if="localeLang=='ar'" for="raison_social"  >{{ar.headerstep}}</label>
                    <label v-else-if="localeLang == 'fr'" for="raison_social">{{fr.headerstep}}</label>
                    <label v-else for="raison_social">{{en.headerstep}}</label>
                </Divider>
                <span>
                    <p style="font-size: 12px;">(<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>): Des champs obligatoires à saisire <br>
                    (<i class="text-green-400 font-large" style="font-size: 18px ;">? </i>): Des champs optionnels à saisire</p>
                    <br />
                </span>
                
                 
            </template>
         
            <template v-slot:content>
                <!-- <h5 id="single">Rechercher un client</h5>
                <SelectButton v-model="modeSearch" :options="options" aria-labelledby="single" />
                <br> -->

                <div class="p-fluid grid">
                    <div v-if="$route.path=='/canvas/search'" class="field col-12 lg:col-4 md:col-6 sm:col-6">
                        <span class="p-float-label">  
                            <!-- <InputText  showButtons incrementButtonIcon="pi pi-plus" id="nation" v-model="vAdd$.type_piece.$model" 
                                :class="{ 'p-invalid': vAdd$.type_piece.$invalid && submitted }" /> -->
                            <!-- :mask-rules="maskRules" -->
                            <InputMask  mask="aa-99-9999" id="numFacture" v-model="numFacture"  @change="getFactureExist()"/>
                            
                            <label for="numFacture" > Rechercher La facture (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                            </label>
                            <!-- <small v-if="(vAdd$.type_piece.$invalid && submitted) || vAdd$.type_piece.$pending.$response"
                                class="p-error">ce champ est obligatoire</small> -->
                            <!-- <Dropdown id="dropdown" v-model="type_piece" :options="typePieceClass" optionLabel="label" />
                            <label v-if="localeLang=='ar'" for="dropdown">{{ar.typePiece}}</label>
                            <label v-else-if="localeLang=='fr'" for="dropdown">{{fr.typePiece}}</label>
                            <label v-else for="dropdown">{{en.typePiece}}</label> -->
                        </span>
                    </div>
                    <div class="field col-12 lg:col-4 md:col-6 sm:col-6">
                        <span class="p-float-label">  
                            <!-- <InputText  showButtons incrementButtonIcon="pi pi-plus" id="nation" v-model="vAdd$.type_piece.$model" 
                                :class="{ 'p-invalid': vAdd$.type_piece.$invalid && submitted }" /> -->
                            <Dropdown id="dropdown" v-model="vAdd$.type_piece.$model" :options="typePieceClass" optionLabel="label" optionValue="value"/>
                            <label for="dropdown" :class="{ 'p-error': vAdd$.type_piece.$invalid && submitted }"> Type Piece I.N (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                            </label>
                            <small v-if="(vAdd$.type_piece.$invalid && submitted) || vAdd$.type_piece.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                            <!-- <Dropdown id="dropdown" v-model="type_piece" :options="typePieceClass" optionLabel="label" />
                            <label v-if="localeLang=='ar'" for="dropdown">{{ar.typePiece}}</label>
                            <label v-else-if="localeLang=='fr'" for="dropdown">{{fr.typePiece}}</label>
                            <label v-else for="dropdown">{{en.typePiece}}</label> -->
                        </span>
                    </div>
                    <div class="field col-12 lg:col-4 md:col-6 sm:col-6">
                         <span class="p-float-label">
                            
                            <!-- <InputText  showButtons incrementButtonIcon="pi pi-plus" id="nation" v-model="vAdd$.type_piece.$model" 
                                :class="{ 'p-invalid': vAdd$.type_piece.$invalid && submitted }" /> -->
                            <!-- <Dropdown id="dropdown" v-model="vAdd$.type_piece.$model" :options="typePieceClass" optionLabel="label" /> -->
                            <InputMask mask="99-999999999-999999999999999999" id="numPiece" v-model="vAdd$.num_piece.$model"  @change="getClientExist()"/>
                            <label for="nation" :class="{ 'p-error': vAdd$.num_piece.$invalid && submitted }"> Nome De La Piece (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                            </label>
                            <small v-if="(vAdd$.num_piece.$invalid && submitted) || vAdd$.num_piece.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                        
                        </span>
                    </div> 

                    <div class="field col-12 lg:col-4 md:col-6 sm:col-6">
                        <span class="p-float-label">
                            <InputText id="nom" v-model="vAdd$.nom.$model" />
                            <label for="nation" :class="{ 'p-error': vAdd$.nom.$invalid && submitted }"> Nom (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                            </label>
                            <small v-if="(vAdd$.nom.$invalid && submitted) || vAdd$.nom.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                            <!-- <InputText id="nom" v-model="nom" />
                            <label v-if="localeLang=='ar'" for="nom"  >{{ar.firstname}}</label>
                            <label v-else-if="localeLang == 'fr'" for="nom">{{fr.firstname}}</label>
                            <label v-else for="nom">{{en.firstname}}</label> -->
                        </span>
                    </div>
                    <div class="field col-12 lg:col-4 md:col-6 sm:col-6">
                        <span class="p-float-label">
                            <InputText id="prenom" v-model="vAdd$.prenom.$model" />
                            <label for="prenom" :class="{ 'p-error': vAdd$.prenom.$invalid && submitted }"> Prénom (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                            </label>
                            <small v-if="(vAdd$.prenom.$invalid && submitted) || vAdd$.prenom.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                            <!-- <InputMask mask="99-999999999-999999999999999999" id="numPiece" v-model="vAdd$.prenom.$model"  @change="getClientExist()"/>
                            <label for="nation" :class="{ 'p-error': vAdd$.prenom.$invalid && submitted }"> Prenom (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                            </label>
                            <small v-if="(vAdd$.prenom.$invalid && submitted) || vAdd$.prenom.$pending.$response"
                                class="p-error">ce champ est obligatoire</small> -->
                            <!-- <InputText id="prenom" v-model="prenom"  />
                            <label v-if="localeLang=='ar'" for="prenom">{{ar.lastname}} </label>
                            <label v-else-if="localeLang=='fr'" for="prenom">{{fr.lastname}} </label>
                            <label v-else for="prenom">{{en.lastname}} </label> -->
                        </span>
                    </div>
                    <div class="field col-12 lg:col-4 md:col-6 sm:col-6">
                        <span class="p-float-label">
                            <InputMask id="phoneClient"  mask="(213) 9-99-99-99-99"  v-model="vAdd$.phoneClient.$model"  />
                            <label for="phoneClient" :class="{ 'p-error': vAdd$.phoneClient.$invalid && submitted }"> N:Tél(<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                            </label>
                            <small v-if="(vAdd$.phoneClient.$invalid && submitted) || vAdd$.phoneClient.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                            <!-- <InputMask  mask="(213) 9-99-99-99-99"  v-model="phoneClient"  /> -->
                            <!-- <label v-if="localeLang=='ar'" for="firstname">{{ar.telephone}}</label>
                            <label v-else-if="localeLang=='fr'" for="firstname">{{fr.telephone}}</label>
                            <label v-else for="firstname">{{en.telephone}}</label> -->
                        </span>
                    </div>
                    <div class="field col-12 lg:col-4 md:col-6 sm:col-6">
                        <span class="p-float-label">
                            <Calendar id="date_naissance" v-model="vAdd$.date_naissance.$model"  :showIcon="true" dateFormat="dd-mm-yy" />
                            <label for="date_naissance" :class="{ 'p-error': vAdd$.date_naissance.$invalid && submitted }"> Date de naissance (<i class="text-green-400 font-large" style="font-size: 18px ;">? </i>) 
                            </label>
                            <small v-if="(vAdd$.date_naissance.$invalid && submitted) || vAdd$.date_naissance.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                            <!-- <label v-if="localeLang=='ar'" for="dropdown">{{ar.dateNaissance}}</label>
                            <label v-else-if="localeLang=='fr'" for="dropdown">{{fr.dateNaissance}}</label>
                            <label v-else for="dropdown">{{en.dateNaissance}}</label> -->
                        </span>
                    </div>
                    <!-- <div class="field col-12 md:col-3">
                        <span class="p-float-label">
                            <InputText id="age" v-model="age"  />
                            <label v-if="localeLang=='ar'" for="age">{{ar.age}}</label>
                            <label v-else-if="localeLang=='fr'" for="age">{{fr.age}}</label>
                            <label v-else for="age">{{en.age}}</label>
                        </span>
                    </div> -->   
                    <div class="field col-12 lg:col-4 md:col-6 sm:col-6">
                        <span class="p-float-label">
                            <InputText id="nom" v-model="vAdd$.adresseClient.$model" />
                            <label for="nom" :class="{ 'p-error': vAdd$.adresseClient.$invalid && submitted }"> Adresse (<i class="text-green-400 font-large" style="font-size: 18px ;">? </i>) 
                            </label>
                            <small v-if="(vAdd$.adresseClient.$invalid && submitted) || vAdd$.adresseClient.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                        <!-- <InputText id="adresse" v-model="adresseClient"  />
                        <label v-if="localeLang=='ar'" for="adresse">{{ar.adresse}}</label>
                        <label v-else-if="localeLang=='fr'" for="adresse">{{fr.adresse}}</label>
                        <label v-else for="adresse">{{en.adresse}}</label> -->
                        </span>
                    </div>
                    <div class="field col-12 lg:col-4 md:col-6 sm:col-6">
                        <span class="p-float-label">
                            <!-- <Dropdown id="dropdown" :filter="true" v-model="vAdd$.algeria_cities.$model" :options="communesByWilaya" :optionLabel="localeLang=='ar'?'commune_name':'commune_name_ascii'"  optionValue="id"  /> -->
                        <!-- <Dropdown id="dropdown" v-model="vAdd$.type_piece.$model" :options="typePieceClass" optionLabel="label" /> -->
                            <Dropdown id="wilaya" :filter="true" v-model="vAdd$.wilaya.$model" :options="Wilayas" :optionLabel="localeLang=='ar'?'ar_name':'name'" optionValue="code"  @change="getCommuneByWilaya()" />
                            <label for="wilaya" :class="{ 'p-error': vAdd$.wilaya.$invalid && submitted }"> Wilaya(<i class="text-green-400 font-large" style="font-size: 18px ;">? </i>) 
                            </label>
                            <small v-if="(vAdd$.wilaya.$invalid && submitted) || vAdd$.wilaya.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                            <!-- <label v-if="localeLang=='ar'" for="dropdown">{{ar.wilaya}} 23-000000000-000000000000000001</label>
                            <label v-else-if="localeLang=='fr'" for="dropdown">{{fr.wilaya}} </label>
                            <label v-else for="dropdown">{{en.wilaya}} </label> -->
                        </span>
                    </div>
                      <div class="field col-12 lg:col-4 md:col-6 sm:col-6">
                    <span class="p-float-label">
                        <!-- <Dropdown id="dropdown" v-model="vAdd$.type_piece.$model" :options="typePieceClass" optionLabel="label" /> -->
                        <Dropdown :editable="true" id="dropdown" :filter="true" v-model="vAdd$.commune.$model" :options="communesByWilaya" :optionLabel="localeLang=='ar'?'commune_name':'commune_name_ascii'"  optionValue="id"  />

                        <label for="dropdown" :class="{ 'p-error': vAdd$.commune.$invalid && submitted }"> Commune(<i class="text-green-400 font-large" style="font-size: 18px ;">? </i>) 
                        </label>
                        <small v-if="(vAdd$.commune.$invalid && submitted) || vAdd$.commune.$pending.$response"
                            class="p-error">ce champ est obligatoire</small>
                        <!-- <label v-if="localeLang=='ar'" for="dropdown">{{ar.commune}} </label>
                        <label v-else-if="localeLang=='fr'" for="dropdown">{{fr.commune}} </label>
                        <label v-else for="dropdown">{{en.commune}} </label> -->
                    </span>
                </div>
                <div class="field col-12 lg:col-4 md:col-6 sm:col-6">
                        <span class="p-float-label">

                        <InputMask  mask="(213) 9-99-99-99-99"  v-model="vAdd$.faxClient.$model"  />
                        <label for="commune" :class="{ 'p-error': vAdd$.faxClient.$invalid && submitted }"> N:°Fax(<i class="text-green-400 font-large" style="font-size: 18px ;">? </i>) 
                            </label>
                            <small v-if="(vAdd$.faxClient.$invalid && submitted) || vAdd$.faxClient.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                    <!-- <label v-if="localeLang=='ar'" for="firstname">{{ar.fax}}</label>
                    <label v-else-if="localeLang=='fr'" for="firstname">{{fr.fax}}</label>
                    <label v-else for="firstname">{{en.fax}}</label> -->
                    </span>
                </div>
                
                <div class="field col-12 lg:col-4 md:col-6 sm:col-6">
                        <span class="p-float-label">
                        <InputText id="emailClient"    v-model="vAdd$.emailClient.$model"  />
                        <label for="emailClient" :class="{ 'p-error': vAdd$.emailClient.$invalid && submitted }"> E-mail(<i class="text-green-400 font-large" style="font-size: 18px ;">? </i>) 
                        </label>
                        <small v-if="(vAdd$.emailClient.$invalid && submitted) || vAdd$.emailClient.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                    <!-- <InputText id="firstname" v-model="emailClient" />
                    <label v-if="localeLang=='ar'" for="firstname">{{ar.email}}</label>
                    <label v-else-if="localeLang=='fr'" for="firstname">{{fr.email}} </label>
                    <label v-else for="firstname">{{en.email}}</label> -->
                    </span>
                </div> 
                                      
                </div>
            </template>
            <template v-slot:footer>
                <div class="grid grid-nogutter justify-content-between">
                    <i></i>
                    <Button :label="$route.path=='/canvas/search'?'Ajouter':'Suivant'" @click="($route.path=='/canvas/search')?showDialogueTranche(numFacture):nextPage1()" :icon='(localeLang=="ar")?"pi pi-angle-left":"pi pi-angle-right"' iconPos="right" />
                </div>
            </template>
            <Toast />
        </Card>
        <Dialog  v-model:visible="showTrancheInput" :style="{ width: '750px' }" header="Renseignements sur la facture" :modal="true"
            class="p-fluid">
            <div  class="field col-12">
                <Divider align="center">
                    <span >
                        <Button @click="modifierLock=!modifierLock" :icon="modifierLock?'pi pi-lock':'pi pi-lock-open'"   class="p-button-rounded p-button-warning" />
                    </span>

                </Divider>
            </div><br>
            <div class="p-fluid grid">
				<div  class="field col-6">
					<span class="p-float-label">
						<InputText :disabled="true" id="name" v-model="dataTranche.num_facture" />
						<label for="name">Numéro de la facture </label>
					</span>
				</div>
				<div  class="field col-6">
					<span class="p-float-label">
						
						<InputText :disabled="true" inputId="mile" id="name" v-model="dataTranche.tranches_data.length" />
						<!-- <InputText inputId="mile"  v-else   :disabled="true"  id="name" v-model="dataTranche.last_tranche.nbr_tranche" /> -->
						<label for="name">Nombre de tranche </label>
					</span>
				</div>
				
				
				<div  class="field col-6 ">
					<span class="p-float-label">
						<Calendar v-if="dataTranche.last_tranche.length === 0"  v-model="dataTranche.fin_contrat"  :showIcon="true" dateFormat="dd-mm-yy" />
						<InputText v-else :disabled="true" v-model="dataTranche.fin_contrat"  :showIcon="true" dateFormat="dd-mm-yy" />
						<label>Experation du contrat</label>
					</span>
				</div>
                
				<!-- <div  class="field col-6">
					<span class="p-float-label">
						<InputText :disabled="modifierLock"  inputId="horizontal" :min="0" :max="dataTranche.last_tranche.nbr_tranche"  v-model="dataTranche.last_tranche.num_tranche"  />
						<label for="name">Nombre de tranche en cours </label>
					</span>
				</div> -->
				<!-- <div v-show="showTrache"  class="field col-6 ">
					<span class="p-float-label">
						<Calendar v-model="prochaine_rdv_realise" :showIcon="true" dateFormat="dd/mm/yy" />
						<label>Rendez-vous Réaliser</label>
					</span>
				</div> -->
                    <!-- <span class="px-3">Slack</span> -->
                <div v-for="(tranche,numTranche) in dataTranche.tranches_data" :key="numTranche" class="grid col-12">
                    <Divider align="center">
                        <span class="p-tag">Tranche {{ tranche.num_tranche }} </span>

                    </Divider>
                    <div   class="field col-6 ">
                        <span  class="p-float-label">
                            <!-- <InputText  v-model="dataTranche.last_tranche.prochaine_rdv_prevue"  /> -->
                            <Calendar :readonly="modifierLock" :disabled="modifierLock"   v-model="tranche.prochaine_rdv_prevue" :showIcon="true" dateFormat="yy-mm-dd" />

                            <label>Prochaine Rendez-vous Prévue</label>
                        </span>
                    </div>
                   
                    <div   class="field col-6">
                        <span class="p-float-label">
                            
                            <InputNumber :readonly="modifierLock" :disabled="modifierLock"   aria-labelledby="prix_prevue" showButtons v-model="tranche.prix_prevue" mode="currency" currency="DZD"   />
                            <label for="prix_prevue">Montant Prévu </label>

                        </span>
                    </div>
                    <div   class="field col-6 ">
                        <span class="p-float-label">
                            <Calendar v-model="tranche.prochaine_rdv_realise" :readonly="tranche.opend_status" :disabled="tranche.opend_status" :showIcon="true" dateFormat="yy-mm-dd" />
                            <label>Prochaine Rendez-vous Réaliser</label>
                        </span>
                    </div>
                    <div   class="field col-6">
                        <span class="p-float-label">
                            <InputNumber inputId="mile" :min="0"   id="name" :readonly="tranche.opend_status" :disabled="tranche.opend_status" showButtons v-model="tranche.prix_realise" mode="currency" currency="DZD"  />
                            <label for="name">Montant Réaliser </label>
                        </span>
                    </div>
                        
                        
                </div>
            </div>
			<template #footer>
                <Button  label="Annuler" icon="pi pi-check" class="p-button-text" @click="cancelTranche()" />
                <Button  label="Enregestrer" icon="pi pi-check" class="p-button-text" @click="addTranche(dataTranche)" />
            </template>
            </Dialog>
    </div>
</template>

<script>
import { useToast } from "primevue/usetoast";

import {ref,reactive,computed,toRefs} from 'vue'
import { useStore } from 'vuex';
import Wilayas from '../../../public/data/algeria/wilaya.json'
import api from '../../api';
import { email, required,numeric, url, minLength, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Algeria from '../../../public/data/algeria/algeria_cities.json'
export default {
        emits:["nextpage"],
       
        setup(_,{emit}){
            const rulesClient = {
                nom: { required },
                prenom: {required},
                type_piece: { required },
                num_piece: { required },
                phoneClient:{ required },
                adresseClient:{},
                wilaya:{},
                commune:{},
                faxClient:{},
                date_naissance:{},
                emailClient:{},
                adresse:{}
            }
            const disabled=ref(true)
            const Client = ref({
                nom: '',
                prenom :'',
                type_piece: '',
                num_piece: '',
                phoneClient :'',
                adresseClient:'',
                wilaya:'',
                commune:'',
                faxClient:'',
                date_naissance: '',
                emailClient: '',
                adresse: ''
            })
            const vAdd$ = useVuelidate(rulesClient, Client.value);
            const numFacture=ref('')
            const store=useStore()
            const showTrancheInput=ref(false)
            // const confirm = useConfirm();
		    const toast = useToast();
            const modeSearch=ref("Non")
            const options = ref(['Non', 'Oui']);
            const entrepriseHeaders= reactive({ar:{
                headerstep:"Information du Client",
                numfacture:'N° Facture',
                firstname:"Nom",
                lastname:"Prénom",
                // age:"Age",
                dateNaissance:"Date de naissance",
                adresse:"Adresse précise du client",
                wilaya:"Wilaya",
                commune:"Commune",
                numPiece:"Numéro de la piece d'identité",
                typePiece:"Type de la piece d'identité",
                
            
                telephone:"Téléphone",
                fax:"Fax",
                
                email:"E-mail",
                // headerstep:"المعلومات الخاصة بالموكل",
                // numfacture:"رقم",
                // firstname:"الاسم",
                // lastname:"اختصار",
                // // age:"السن",
                // dateNaissance:"تاريخ الولادة",
                // // form_juridique:"الشكل القانوني",
                // adresse:"العنوان المكتب الرئيسي",
                // wilaya:"الولاية",
                // commune:"البلدية",
                // numPiece:"رقم الهوية",
                // typePiece:"نوع الهوية",

                // // secteur_naa:"قطاع النشاط حسب naa",
                // // secteur_nae:"قطاع النشاط حسب nae",
                // telephone:"الهاتف",
                // fax:"الفاكس",
                // email:"البريد الإلكتروني",
                },
            fr:{ headerstep:"Information du Client",
                numfacture:'N° Facture',
                firstname:"Nom",
                lastname:"Prénom",
                // age:"Age",
                dateNaissance:"Date de naissance",
                adresse:"Adresse précise du client",
                wilaya:"Wilaya",
                commune:"Commune",
                numPiece:"Numéro de la piece d'identité",
                typePiece:"Type de la piece d'identité",
                
            
                telephone:"Téléphone",
                fax:"Fax",
                
                email:"E-mail",
                
               },
            en:{ headerstep:"Company Information",
                numfacture:'N° Facture',

                firstname:"FisrtName",
                lastname:"LastName",
                // age:"Age",
                dateNaissance:"date of birth",
                adresse:"Precise address",
                wilaya:"Wilaya",
                commune:"Commune",
                numPiece:"Identite Number",
                typePiece:"Identite Type",

                telephone:"Phone",
                fax:"Fax",
                email:"E-mail"}})
           
            const typePieceClass=ref([
                    {label: 'Permis de conduire', value: 'CP'},
                    {label: 'Passport', value: 'PASSPORT'},
                    {label: 'Carte national', value: 'CN'}
                ]);
            const date_naissance=ref()
            const nom=ref('')
            // const num_facture=ref('')
            const prenom=ref('')
            // const age=ref('')
            const num_piece=ref('')
            const type_piece=ref('')
            const adresseClient=ref('')
            const emailClient=ref('')
		    
            
            const algeria_cities=ref('')
            // reactive({wilayaClient:null,communeClient:null})
            const phoneClient=ref('')
            const faxClient=ref('')
            const submitted=ref(false)
            const localeLang=ref(store.state.user.localeLang)
            const communesByWilaya = ref([])
            const wilaya = ref(null)
            const clientdata = reactive({})
            var dataTranche=ref([])
            const new_tranche=ref({nbr_tranche:'',num_tranche:0,fact_client:'',prix_prevue:0,prochaine_rdv_prevue:new Date(),prix_realise:0,prochaine_rdv_realise:new Date()})
		    async function showDialogueTranche(num_facture){
                await api.get('/facture-client/?canvas=true&num_facture='+num_facture+'&limit=100').then(response => {
                     dataTranche.value=  response.data[0]
                    })
                    .catch(error => {
                            console.log(error.response.data)
                    })
                var nbr_tranche=0
                var num_tranche=0
                if (dataTranche.value.tranches_data.length!=0) {
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
                console.log(dataTranche.value);
                showTrancheInput.value=true
		    }

        function getCommuneByWilaya() {
            // vEdit$.value.commune.$model=''
            vAdd$.value.commune.$model=''
            let idWilaya=''
            if (vAdd$.value.wilaya.$model!=''){
                idWilaya=vAdd$.value.wilaya.$model
            }
            // else if(vEdit$.value.wilaya.$model!=''){
            //     idWilaya=vEdit$.value.wilaya.$model
            // }
            api.get('/algeria-cities/?wilaya_code='+idWilaya)
                .then((response) => {
                    console.log(response.data.results);
                    communesByWilaya.value = response.data.results
                    communesByWilaya.value.sort((a, b) => { return a.id > b.id })
                }).catch((error) => {
                   
                })
        }
        
        function getClientExist(){
            api.get('/client/?num_piece='+vAdd$.value.num_piece.$model + '&limit=1').then(responseclient => {
                // console.log(response.data.results);
                // console.log( responseclient.data,',,,,,,,,,,,,,,,,,,');
                if (!("message" in responseclient.data)){
                    vAdd$.value.type_piece.$model=responseclient.data.type_piece
                    vAdd$.value.nom.$model=responseclient.data.nom
                    vAdd$.value.prenom.$model=responseclient.data.prenom
                    vAdd$.value.phoneClient.$model=responseclient.data.phoneClient
                    vAdd$.value.faxClient.$model=responseclient.data.faxClient
                    vAdd$.value.date_naissance.$model=responseclient.data.date_naissance
                    vAdd$.value.emailClient.$model=responseclient.data.emailClient
                    vAdd$.value.adresseClient.$model=responseclient.data.adresse
                    // nom.value=responseclient.data.nom
                    // prenom.value=responseclient.data.prenom
                    // phoneClient.value=responseclient.data.phoneClient
                    // faxClient.value=responseclient.data.faxClient
                    // date_naissance.value=responseclient.data.date_naissance
                    // emailClient.value=responseclient.data.emailClient
                    // adresseClient.value=responseclient.data.adresse
                    // console.log(responseclient.data);
                    api.get('/algeria-cities/?id='+responseclient.data.algeria_cities+ '&limit=1').then(response => {
                        vAdd$.value.wilaya.$model=response.data.wilaya_code
                        vAdd$.value.commune.$model=response.data.id
                        getCommuneByWilaya()
                        // wilaya.value.code=response.data.results[0].wilaya_code
                        // {"code":response.data.results[0].wilaya_code,"name":response.data.results[0].wilaya_name_ascii}
                        // communesByWilaya.value=response.data.results[0].commune_name_ascii
                    }).catch(error => {
                    console.log(error.response.data)

                })  
                    
                }
                else{
                    vAdd$.value.type_piece.$model=""
                    vAdd$.value.nom.$model=""
                    vAdd$.value.prenom.$model=""
                    vAdd$.value.phoneClient.$model=""
                    vAdd$.value.faxClient.$model=""
                    vAdd$.value.date_naissance.$model=""
                    vAdd$.value.emailClient.$model=""
                    vAdd$.value.adresseClient.$model=""
                    vAdd$.value.wilaya.$model=""
                    vAdd$.value.commune.$model=""
                    // nom.value=""
                    // prenom.value=""
                    // phoneClient.value=""
                    // faxClient.value=""
                    // date_naissance.value=""
                    // emailClient.value=""
                    // adresseClient.value=""
                    // wilaya.value=""
                    // algeria_cities.value=""
                }
                // communesByWilaya.value = response.data.results
                // wilaya.value=communesByWilaya.value[0].wilaya_code
            })
                .catch(error => {
                    console.log(error.response.data)
                })
        }
        function addTranche(){
            if (!vAdd$.value.$invalid) {  
                console.log(dataTranche.value.tranches_data,'5555555555');
                api.put('/tranches/',dataTranche.value.tranches_data)
                .then(responce=>{
                    setTimeout(()=>{

                        showTrancheInput.value=false


                        // raffrichir la page
                    },500)
                toast.add({severity:'success', summary: 'Successful', detail: 'les Tranche on à étés modifier avec succée', life: 1000});
                
                })
                .catch(error=>{
                    errormessage.value=error.response.data
                    toast.add({severity:'error', summary: 'Error', detail: 'Echec de modification de la tranches : '+error.message+' :\n'+errormessage.value, life: 4000});
                }) 
                showTrancheInput.value=true 
                // showDialogueTranche(product)
            }else{
                submitted.value = true;
            }
        }
        function getFactureExist(){
            if (numFacture.value[0]+numFacture.value[1]==='AP' ||numFacture.value[0]+numFacture.value[1]==='LC'|| numFacture.value[0]+numFacture.value[1]==='PS'){
                api.get('/facture-clients/?num_facture='+numFacture.value).then(response=>{
                console.log(response);
                if (response.data.results[0]!=[]){
                    vAdd$.value.type_piece.$model=response.data.results[0].client.type_piece
                    vAdd$.value.num_piece.$model=response.data.results[0].client.num_piece
                    vAdd$.value.nom.$model=response.data.results[0].client.nom
                    vAdd$.value.prenom.$model=response.data.results[0].client.prenom
                    vAdd$.value.phoneClient.$model=response.data.results[0].client.phoneClient
                    vAdd$.value.faxClient.$model=response.data.results[0].client.faxClient
                    vAdd$.value.date_naissance.$model=response.data.results[0].client.date_naissance
                    vAdd$.value.emailClient.$model=response.data.results[0].client.emailClient
                    vAdd$.value.adresseClient.$model=response.data.results[0].client.adresseClient
                    vAdd$.value.wilaya.$model=response.data.results[0].client.algeriaCities_m.wilaya_code
                    vAdd$.value.commune.$model=response.data.results[0].client.algeriaCities_m.commune.toString()
				    toast.add({severity:'success', summary: 'Successful', detail: 'Le N° de facture '+numFacture.value+' à été bien retrouver', life: 3000});
                
                }else{
                    vAdd$.value.type_piece.$model=""
                    vAdd$.value.num_piece.$model=""
                    vAdd$.value.nom.$model=""
                    vAdd$.value.prenom.$model=""
                    vAdd$.value.phoneClient.$model=""
                    vAdd$.value.faxClient.$model=""
                    vAdd$.value.date_naissance.$model=""
                    vAdd$.value.emailClient.$model=""
                    vAdd$.value.adresseClient.$model=""
                    vAdd$.value.wilaya.$model=""
                    vAdd$.value.commune.$model=""
                    toast.add({severity:'error', summary: 'Error', detail: 'veuillez-vous saisire le bon N° de Facture ! ', life: 4000});

                }
            }).catch(error => {
                vAdd$.value.nom.$model=""
                vAdd$.value.type_piece.$model=""
                vAdd$.value.num_piece.$model=""
                vAdd$.value.nom.$model=""
                vAdd$.value.prenom.$model=""
                vAdd$.value.phoneClient.$model=""
                vAdd$.value.faxClient.$model=""
                vAdd$.value.date_naissance.$model=""
                vAdd$.value.emailClient.$model=""
                vAdd$.value.adresseClient.$model=""
                vAdd$.value.wilaya.$model=""
                vAdd$.value.commune.$model=""
                toast.add({severity:'error', summary: 'Error', detail: 'veuillez-vous saisire le bon N° de Facture ! '+error, life: 4000});
                        
                }) 
            }
            else if (numFacture[0]+numFacture[1]=='PS'){
                api.get('/facture-client/').then(response=>{
                    }).catch(error => {
                    console.log(error.response.data)
                }) 
            }
            else if (numFacture[0]+numFacture[1]=='LC'){
                api.get('/facture-client/').then(response=>{
                    }).catch(error => {
                    console.log(error.response.data)
                }) 
            }
            
            
        }
        function nextPage1() {
            // adresses.value=communeClient.value
            console.log('eeeeeeeeeeeeeee');
            if (date_naissance.value!=undefined){

                var index = date_naissance.value.toString().indexOf("00Z");    
            }
            // console.log(index,date_naissance.value);
            if (index===-1){
                date_naissance.value=date_naissance.value.toISOString()
            }
            // console.log(date_naissance.value);
            clientdata.value={
                // num_facture:num_facture,
               
                nom:  vAdd$.value.nom.$model,
                prenom:vAdd$.value.prenom.$model,
                type_piece:vAdd$.value.type_piece.$model,
                num_piece:vAdd$.value.num_piece.$model,
                phoneClient:vAdd$.value.phoneClient.$model,
                faxClient:vAdd$.value.faxClient.$model,
                date_naissance:vAdd$.value.date_naissance.$model,
                emailClient:vAdd$.value.emailClient.$model,
                adresse:vAdd$.value.adresseClient.$model,
                algeria_cities:vAdd$.value.commune.$model,
            }
            // submitted.value = true;
        if (!vAdd$.value.$invalid) {   
            
            emit('nextpage', {formData: {client:clientdata.value}, pageIndex: 0});
        }else{
            submitted.value = true;
        }
        }
        const maskRules = computed(() => ({
            a: {
                validator: (ch) => /^[A-Z]$/.test(ch),
                casing: 'upper',
            },
            }));
        const modifierLock=ref(true)    
        function cancelTranche(){
            numFacture.value=""
            vAdd$.value.nom.$model=""
            vAdd$.value.type_piece.$model=""
            vAdd$.value.num_piece.$model=""
            vAdd$.value.nom.$model=""
            vAdd$.value.prenom.$model=""
            vAdd$.value.phoneClient.$model=""
            vAdd$.value.faxClient.$model=""
            vAdd$.value.date_naissance.$model=""
            vAdd$.value.emailClient.$model=""
            vAdd$.value.adresseClient.$model=""
            vAdd$.value.wilaya.$model=""
            vAdd$.value.commune.$model=""
            dataTranche.value=[]
            showTrancheInput.value=false

        }    
            
        return{cancelTranche,
            nom,prenom,type_piece,num_piece,options,modeSearch,maskRules,modifierLock,
            // age,
            date_naissance,algeria_cities,Client,vAdd$,rulesClient,
            phoneClient,addTranche,showTrancheInput,
            emailClient,showDialogueTranche,new_tranche,dataTranche,
            faxClient,disabled,
            adresseClient,
            submitted,
            nextPage1,
            getCommuneByWilaya,getClientExist,
            Wilayas,wilaya,
            communesByWilaya,
            ...toRefs(entrepriseHeaders),
            localeLang,getFactureExist,numFacture,
            typePieceClass
            
        }
    }

}
</script>
<style>
.custom-button-class {
    float: left;
  }
  </style>