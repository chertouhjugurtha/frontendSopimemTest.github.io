<template>
    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                <Divider align="center" type="dotted">Etat de la facture</Divider>
            </template>
            <template v-slot:content>
            <div class="p-fluid grid">
                    <div  class="field col-12 lg:col-6 md:col-6 sm:col-6">
                        <span class="p-float-label">
                            <InputMask  disabled  :class="{ 'p-invalid': vAdd$.num_facture.$invalid && submitted }"  id="nom" :mask="vAdd$.num_facture.$model" :value="vAdd$.num_facture.$model"  v-model="vAdd$.num_facture.$model" placeholder="N°Facture AP-99-999" />
                            
                            <label for="montant_reel" :class="{ 'p-error': vAdd$.num_facture.$invalid && submitted }"> Numéro de la facture (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                            </label>
                            <small v-if="(vAdd$.num_facture.$invalid && submitted) || vAdd$.num_facture.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                        </span>
                    </div>
                    <div  class="field col-12 lg:col-6 md:col-6 sm:col-6">
                        <span class="p-float-label">
                            <InputNumber  v-if="MotantUpdated" id="montant_reel"   showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"    
                            v-model="vAdd$.montant_reel.$model" mode="currency" currency="DZD" :class="{ 'p-invalid': vAdd$.montant_reel.$invalid && submitted }" />
                            <InputNumber  v-else id="montant_reel" @click="changeMontantReel(true)"   showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"    
                            v-model="motantReelupdated" mode="currency" currency="DZD" :class="{ 'p-invalid': vAdd$.montant_reel.$invalid && submitted }" />
                                
                            <label for="montant_reel" :class="{ 'p-error': vAdd$.montant_reel.$invalid && submitted }"> Montant Réel (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                            </label>
                            <small v-if="(vAdd$.montant_reel.$invalid && submitted) || vAdd$.montant_reel.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                            <!-- <InputText  id="montant_reel" v-model="montant_reel" /> -->
                            <!-- <label for="montant_reel">Montant Réel </label> -->
                        </span>
                    </div>
                    <!-- <div  class="field col-6">
                        <span class="p-float-label">
                            <InputNumber id="montant_reel"  showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"    
                            v-model="vAdd$.montant_vente.$model" mode="currency" currency="DZD" :class="{ 'p-invalid': vAdd$.montant_vente.$invalid && submitted }" /> 
                            <label for="montant_vente" :class="{ 'p-error': vAdd$.montant_vente.$invalid && submitted }"> Montant de vente (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                            </label>
                            <small v-if="(vAdd$.montant_vente.$invalid && submitted) || vAdd$.montant_vente.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                        </span>
                    </div> -->
                    <div  class="field col-12 lg:col-6 md:col-6 sm:col-6">
                        <span class="p-float-label">
                            <Dropdown   id="tva"   v-model="vAdd$.TVA.$model"  
                            :options="classTva" optionLabel="label" optionValue="value"/>
                            <label for="tva" :class="{ 'p-error': vAdd$.TVA.$invalid && submitted }"> T.V.A (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                            </label>
                            <small v-if="(vAdd$.TVA.$invalid && submitted) || vAdd$.TVA.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                        </span>
                    </div>
                    <div class="field col-12 lg:col-6 md:col-6 sm:col-6">
                        <span class="p-float-label">
                            <InputNumber id="prix_HT"  showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"    
                            v-model="vAdd$.prix_HT.$model" mode="currency" currency="DZD" :class="{ 'p-invalid': vAdd$.prix_HT.$invalid && submitted }" /> 
                            
                            <!-- <InputText  id="prix_HT" v-model="prix_HT" /> -->
                            <label for="prix_HT" :class="{ 'p-error': vAdd$.prix_HT.$invalid && submitted }">   Montant de HT (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                            </label>
                            <small v-if="(vAdd$.prix_HT.$invalid && submitted) || vAdd$.prix_HT.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                        </span>
                    </div>
                    <div class="field col-12 lg:col-6 md:col-6 sm:col-6">
                        <span class="p-float-label">
                            <InputNumber readonly disabled id="prix_TTC"   incrementButtonIcon="pi pi-plus" :min="0"  suffix=" DZD"
                            :model-value="vAdd$.prix_TTC.$model?parseFloat(vAdd$.prix_TTC.$model):0"   
                           :class="{ 'p-invalid': vAdd$.prix_TTC.$invalid && submitted }" /> 
                            
                            <!-- <InputText  id="prix_TTC" v-model="prix_TTC" /> -->
                            <label for="prix_TTC" :class="{ 'p-error': vAdd$.prix_TTC.$invalid && submitted }"> Montant de TTC (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                            </label>
                            <small v-if="(vAdd$.prix_TTC.$invalid && submitted) || vAdd$.prix_TTC.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                        </span>
                    </div>
                    
                    
                    <div class="field col-12 lg:col-6 md:col-6 sm:col-6">
                        <span class="p-float-label">
                            <Calendar v-model="vAdd$.contrat_du.$model" id="contrat_du" :showIcon="true" dateFormat="dd/mm/yy" 
                            :class="{ 'p-invalid': vAdd$.contrat_du.$invalid && submitted }"/>
                            <label for="contrat_du" :class="{ 'p-error': vAdd$.contrat_du.$invalid && submitted }"> Contrat Du (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                            </label>
                            <small v-if="(vAdd$.contrat_du.$invalid && submitted) || vAdd$.contrat_du.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                        </span>
                    </div>
                    <!-- <Divider align="center" type="dotted">Versement Boncaire</Divider> -->

                    <!-- <div class="field col-12 lg:col-6 md:col-6 sm:col-6">
                        <span class="p-float-label">
                            <InputNumber id="montant_verser" mode="currency" currency="DZD"  showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"    
                            v-model="vAdd$.montant_verser.$model" :class="{ 'p-invalid': vAdd$.montant_verser.$invalid && submitted }" /> 
                            
                            <label for="montant_verser" :class="{ 'p-error': vAdd$.montant_verser.$invalid && submitted }">Montant versement bancaire (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                            </label>
                            <small v-if="(vAdd$.montant_verser.$invalid && submitted) || vAdd$.montant_verser.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                            
                        </span>
                    </div> -->
                    <!-- <div class="field col-6 md:col-6 sm:col-6">
                        <span class="p-float-label">
                            <Calendar id="date_verser_banque" v-model="vAdd$.date_verser_banque.$model" :showIcon="true" dateFormat="dd/mm/yy" />
                            
                            <label for="date_verser_banque" :class="{ 'p-error': vAdd$.date_verser_banque.$invalid && submitted }">Montant versement bancaire (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                            </label>
                            <small v-if="(vAdd$.date_verser_banque.$invalid && submitted) || vAdd$.date_verser_banque.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                        </span>
                    </div> -->
                    <Divider align="center" type="dotted">Vendre Par Tranche</Divider>
                    <!-- <div class="field col-12 lg:col-6 md:col-6 sm:col-6">
                        <span  class="p-float-label ">
                                <Calendar :minDate="new Date()" today-click  id="fin_contrat" v-model="vAdd$.fin_contrat.$model" :showIcon="true" dateFormat="dd/mm/yy" />
                                
                                <label for="fin_contrat" :class="{ 'p-error': vAdd$.fin_contrat.$invalid && submitted }">Experation du contrat (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                                </label>
                                <small  v-if="(vAdd$.fin_contrat.$invalid && submitted) || vAdd$.fin_contrat.$pending.$response"
                                    class="p-error">ce champ est obligatoire</small>
                             
                        </span>
                    </div> -->
                    <div class="field col-12 lg:col-6 md:col-6 sm:col-6">

                        <span class="p-float-label ">
                            <Dropdown id="dropdown" v-model="vAdd$.type_choisie.$model" :options="type_class"
                                @change="functionShow($event)" optionValue="value" optionLabel='label' />
                            <label for="prix_TTC" :class="{ 'p-error': vAdd$.type_choisie.$invalid && submitted }"> Vendre par tranche ? (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                            </label>
                            <small v-if="(vAdd$.type_choisie.$invalid && submitted) || vAdd$.type_choisie.$pending.$response"
                                class="p-error">ce champ est obligatoire
                            </small>
                        </span>
                    </div>
                    <div class="field col-12 lg:col-6 md:col-6 sm:col-6">
                    
                        <span v-show="showTrache" :class='showTrache?"p-float-label":""'>
                            <InputNumber id="nbr_tranche" showButtons incrementButtonIcon="pi pi-plus" :min="1" :max="10" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"    
                            v-model="vAdd$.nbr_tranche.$model" :class="{ 'p-invalid': vAdd$.nbr_tranche.$invalid && submitted }" /> 
                            <label for="nbr_tranche" :class="{ 'p-error': vAdd$.nbr_tranche.$invalid && submitted }">Nbr Tranche (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                            </label>
                            <small v-if="(vAdd$.nbr_tranche.$invalid && submitted) || vAdd$.nbr_tranche.$pending.$response"
                                class="p-error">ce champ est obligatoire</small>
                        </span>
                        
                    </div>
                    
                        <!-- <div v-show="showTrache"  class="field col-6 ">
                            <span class="p-float-label">
                                <Calendar id="prochaine_rdv_realise" v-model="vAdd$.prochaine_rdv_realise.$model" :showIcon="true" dateFormat="dd/mm/yy" />
                                
                                <label for="prochaine_rdv_realise" :class="{ 'p-error': vAdd$.prochaine_rdv_realise.$invalid && submitted }">Rendez-vous Réaliser (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                                </label>
                                <small v-if="(vAdd$.prochaine_rdv_realise.$invalid && submitted) || vAdd$.prochaine_rdv_realise.$pending.$response"
                                    class="p-error">ce champ est obligatoire</small>
                            </span>
                        </div> -->
                        <!-- <div v-show="showTrache"  class="field col-6 ">
                            <span class="p-float-label">
                                <Calendar id="prochaine_rdv_prevue" v-model="vAdd$.prochaine_rdv_prevue.$model" :showIcon="true" dateFormat="dd/mm/yy" />
                                
                                <label for="prochaine_rdv_prevue" :class="{ 'p-error': vAdd$.prochaine_rdv_prevue.$invalid && submitted }">Prochaine Rendez-vous Prévue (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                                </label>
                                <small v-if="(vAdd$.prochaine_rdv_prevue.$invalid && submitted) || vAdd$.prochaine_rdv_prevue.$pending.$response"
                                    class="p-error">ce champ est obligatoire</small>
                            </span>
                        </div> -->
                    <div v-show="false">{{ tranchesList }}</div>
                    <div v-for="(tranche, index) in dynamicTrache" :key="index" class="grid col-12">
                        <Divider v-show="showTrache" align="center">
                            <span class="p-tag">Tranche {{tranche.num_tranche}}</span>
                        </Divider>
                        <div v-show="showTrache"  class="field col-12 lg:col-4 md:col-6 sm:col-6">
                            <span class="p-float-label">
                                <InputNumber id="taux_tranche" prefix="%" :min="0" :max="100"
                                @blur="updateTrancheValue(index, 'taux_tranche', $event)"
                                @click="updateTrancheValue(index, 'taux_tranche', $event)"
                                :value="tranche.taux_tranche"
                                v-model="tranche.taux_tranche"
                                  /> 
                                
                                <label for="taux_tranche" >Taux de la tranche(<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                                </label>

                            </span>
                        </div>
                        <!-- @blur="updateTrancheValue(index, 'prix_prevue', $event)"
                                @click="updateTrancheValue(index, 'prix_prevue', $event)" -->
                        <div v-show="showTrache"  class="field col-12 lg:col-4 md:col-6 sm:col-6">
                            <span class="p-float-label">
                                <InputNumber id="prix_prevue" mode="currency" currency="DZD" :min="0"    
                                
                                :value="tranche.prix_prevue"
                                v-model="tranche.prix_prevue"
                                  /> 
                                <label for="prix_prevue" >Montant prevus (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                                </label>
                                <!-- <small v-if="(vAdd$.prix_prevue.$invalid && submitted) || vAdd$.prix_prevue.$pending.$response"
                                    class="p-error">ce champ est obligatoire</small> -->
                            </span>
                        </div>
                        <div v-show="showTrache"  class="field col-12 lg:col-4 md:col-6 sm:col-6 ">
                            <span class="p-float-label">
                                <Calendar id="prochaine_rdv_prevue" v-model="tranche.prochaine_rdv_prevue" 
                                :value="tranche.prochaine_rdv_prevue"
                                @date-select="updateTrancheValue(index, 'prochaine_rdv_prevue', $event)"
                                :showIcon="true" dateFormat="dd/mm/yy" />
                                
                                <label for="prochaine_rdv_prevue">Prochaine Rendez-vous Prévue (<i class="text-red-400 font-large" style="font-size: 18px ;">* </i>) 
                                </label>
                                
                            </span>
                        </div>
                    </div>
                    
            </div>
            </template>
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
    import { reactive,computed, ref,watch,watchEffect } from 'vue'
    import api from '../../api';
    import { email, required,numeric,decimal, url, minLength, maxLength } from "@vuelidate/validators";
    import { useVuelidate } from "@vuelidate/core";
    export default {
        name:"EtatFacture",
        emits: ["nextpage", "prevpage"],
        props: {
            formData: Object
        },
        setup(props, { emit }) {
            const rulesFacture = {
                num_facture:{required},
                contrat_du:{required},
                type_choisie:{required},
                TVA:{required},
                prix_TTC:{required,decimal},
                prix_HT:{required,decimal},
                date_verser_banque:{},
                // prochaine_rdv_realise:{},
                
                fin_contrat:{},
                nbr_tranche:{numeric},
                tranches:({
                    num_tranche:{numeric},
                    prix_prevue:{decimal},
                    prochaine_rdv_prevue:{},
                }),
                montant_vente:{decimal},
                montant_reel:{required,decimal},
                montant_verser:{decimal},
                
            }
            const newFacture= ref({
                num_facture:'',
                contrat_du:'',
                type_choisie:'',
                TVA:0,
                prix_TTC:0,
                prix_HT:0,
                date_verser_banque:null,
                // prochaine_rdv_realise:'',
                // prochaine_rdv_prevue:'',
                fin_contrat:new Date(),
                nbr_tranche:0,
                // num_tranche:0,
                montant_vente:0,
                montant_reel:0,
                montant_verser:0,
                tranches:[{
                    num_tranche:1,
                    prix_prevue:0,
                    prochaine_rdv_prevue:'',
                }],
            })
            const vAdd$ = useVuelidate(rulesFacture, newFacture.value);

            const nbr_tranche=ref()
            const num_tranche=ref()
            const prix_realise=ref()
            const submitted=ref(false)
            const searching=ref(false)
            const TVA=ref();
            const contrat_du=ref(new Date().toISOString())
            const prochaine_rdv_realise=ref(new Date().toISOString())
            const prochaine_rdv_prevue=ref(new Date().toISOString())
            const date_verser_banque=ref(new Date().toISOString())
            const fin_contrat=ref(new Date().toISOString())
            // const montant_reel=ref()
            // const montant_verser=ref()
            // const montant_vente=ref()
            // const prix_prevue=ref()
            // const prix_HT=ref()
            // const prix_TTC=ref()
            const classTva = ref([{name:"Tva 9%",label:"9 %",value:9},{name:"Tva 19%",label:"19 %",value:19}]);
            const showFacture = ref(false);
           
            
            const classes = reactive([{  
                montantHt: '', montantReel: '' ,tva:''}
            ])
            const editingRows = ref(null)
            
            const type_choisie = ref()
            const type_class = ref([
                { label: 'Oui', value: 'OUI' },
                { label: 'Non', value: 'NON' },
            ])
            function DeleteG(event){
                const index = classes.findIndex(item =>
                    item.montantHt === event.montantHt
                    &&item.SecteurActivite === event.SecteurActivite
                    &&item.montantReel === event.montantReel
                    &&item.tva === event.tva
                );
                classes.splice(index,1)
            }
            const showTrache=ref(false)
            function functionShow(event){
                console.log(event);
                if (event.value=='OUI'){
                    showTrache.value=true
                }else{
                    showTrache.value=false
                }
            }
            function openNew() {
                productDialog3.value = true;
            }
            function addSite(){
                classes.push(newFacture.value)
                newFacture.value={}
                productDialog3.value = false;
            }
            const num_facture=ref()
            function nextPage1() {
                // console.log(type_choisie.value);
                if (!vAdd$.value.$invalid) {   
                    if(vAdd$.value.type_choisie.$model=="OUI"){
                        // newFacture.value.num_facture=vAdd$.value.num_facture.$model
                        // newFacture.value.contrat_du=contrat_du.value
                        // newFacture.value.type_choisie=type_choisie.value
                        // newFacture.value.TVA=TVA.value
                        // newFacture.value.prix_TTC=prix_TTC.value
                        // newFacture.value.prix_HT=prix_HT.value
                        // newFacture.value.date_verser_banque=date_verser_banque.value
                        // newFacture.value.prochaine_rdv_realise=prochaine_rdv_prevue.value
                        // newFacture.value.prochaine_rdv_prevue=prochaine_rdv_prevue.value
                        // newFacture.value.fin_contrat=vAdd$.value.fin_contrat.$model.toISOString()
                        // newFacture.value.prochaine_rdv_realise=vAdd$.value.prochaine_rdv_realise.toISOString()
                        // newFacture.value.prochaine_rdv_prevue=vAdd$.value.prochaine_rdv_prevue.toISOString()
                        newFacture.value.montant_vente=vAdd$.value.prix_HT.$model
                        newFacture.value.prix_TTC=vAdd$.value.prix_TTC.$model
                        newFacture.value.tranches=dynamicTrache.value
                        // newFacture.value.montant_reel=montant_reel.value
                        // newFacture.value.montant_verser=montant_verser.value
                        // newFacture.value.prix_prevue=prix_prevue.value
                        emit('nextpage', { formData: {'facture':newFacture.value }, pageIndex: 2});
                    }
                    else{
                        newFacture.value={}
                        newFacture.value.num_facture=vAdd$.value.num_facture.$model
                        newFacture.value.contrat_du=vAdd$.value.contrat_du.$model
                        newFacture.value.TVA=vAdd$.value.TVA.$model
                        newFacture.value.prix_TTC=vAdd$.value.prix_TTC.$model
                        newFacture.value.prix_HT=vAdd$.value.prix_HT.$model
                        newFacture.value.date_verser_banque=vAdd$.value.date_verser_banque.$model
                        newFacture.value.type_choisie=vAdd$.value.type_choisie.$model  
                        newFacture.value.montant_vente=vAdd$.value.montant_vente.$model
                        newFacture.value.montant_reel=vAdd$.value.montant_reel.$model
                        
                        emit('nextpage', { formData: {'facture':newFacture.value }, pageIndex: 2 });
                    }
                }else submitted.value=true

            }
    
            function prevPage1() {
                //console.log(emit('prevpage', {pageIndex: 1}));
                MotantUpdated.value=false
                emit('prevpage', { pageIndex: 2 });
            }
            function onRowEditSave(event) {
                let { newData, index } = event;
    
                classes[index] = newData;
            }
           
            function onToggle(value) {
                selectedColumns.value = columns.value.filter(col => value.includes(col));
            }
            function onSelectAllChange(event) {
                selectedColumns = event.checked
                    ? classes.map((item) => item.value)
                    : [];
            }
            function calculatePrixTTC(){
            //vAdd$.value.prix_TTC.$model = computed(() => {
            //return vAdd$.value.prix_TTC.$model=parseFloat(vAdd$.value.prix_HT.$model)+parseFloat(parseFloat(vAdd$.value.prix_HT.$model)*parseFloat(vAdd$.value.TVA.$model))                }
                // console.log("11111111111111");
                // console.log(vAdd$.value.prix_HT.$model);
                vAdd$.value.prix_TTC.$model=parseFloat(vAdd$.value.prix_HT.$model)+parseFloat(parseFloat(vAdd$.value.prix_HT.$model)*parseFloat(vAdd$.value.TVA.$model))
                // console.log(vAdd$.value.prix_TTC.$model);
            }
            function getFactureExist(){
            api.get('/facture-clients/?num_facture='+num_facture.value + '&limit=1').then(responseclient => {
                if (responseclient.data.length>0){
                    // newFacture.value.type_choisie=type_choisie.value.value
                    contrat_du.value=responseclient.data[0].contrat_du
                    // prenom.value=responseclient.data.prenom
                    TVA.value=responseclient.data[0].TVA
                    prix_TTC.value=responseclient.data[0].prix_TTC
                    prix_HT.value=responseclient.data[0].prix_HT
                    fin_contrat.value=responseclient.data[0].fin_contrat
                    // montant_verser.value=responseclient.data[0].montant_verser
                    montant_reel.value=responseclient.data[0].montant_reel
                    montant_vente.value=responseclient.data[0].montant_vente
                   
                    // console.log(responseclient.data);
                    api.get('/tranches/?fact_client='+responseclient.data[0].id).then(response => {
                        if(response.data!={}){
                            type_choisie.value="OUI"
                            functionShow(type_choisie)
                            nbr_tranche.value=response.data.nbr_tranche
                            num_tranche.value=response.data.num_tranche
                            prix_prevue.value=response.data.prix_prevue
                            prix_realise.value=response.data.prix_realise
                            montant_verser.value=response.data.fact_client.montant_verser
                            date_verser_banque.value=response.data.fact_client.date_verser_banque
                            prochaine_rdv_prevue.value=response.data.prochaine_rdv_prevue
                            prochaine_rdv_realise.value=response.data.prochaine_rdv_realise

                        }
                        else{
                            type_choisie.value="NON"
                            functionShow(type_choisie)
                            nbr_tranche.value=''
                            num_tranche.value=''
                            prix_prevue.value=''
                            prix_realise.value=''
                            montant_verser.value=''
                            date_verser_banque.value=''

                            prochaine_rdv_prevue.value=''
                            prochaine_rdv_realise.value=''
                        }
                        
                        // wilaya.value.code=response.data.results[0].wilaya_code
                        // {"code":response.data.results[0].wilaya_code,"name":response.data.results[0].wilaya_name_ascii}
                        // communesByWilaya.value=response.data.results[0].commune_name_ascii
                    }).catch(error => {
                    console.log(error.response.data)

                })  
                    
                }
                else{
                    contrat_du.value=""
                   
                    TVA.value=""
                    prix_TTC.value=""
                    prix_HT.value=""
                    fin_contrat.value=""
                    
                    montant_reel.value=""
                    montant_vente.value=""
                    type_choisie.value="NON"
                    functionShow( type_choisie)
                    nbr_tranche.value=''
                    num_tranche.value=''
                    prix_prevue.value=''
                    prix_realise.value=''
                    montant_verser.value=''
                    date_verser_banque.value=''

                    prochaine_rdv_prevue.value=''
                    prochaine_rdv_realise.value=''
                }
                // communesByWilaya.value = response.data.results
                // wilaya.value=communesByWilaya.value[0].wilaya_code
            })
                .catch(error => {
                    console.log(error)

            })
        }   
    
            vAdd$.value.prix_TTC.$model=computed(()=> {
                return parseFloat(vAdd$.value.prix_HT.$model)+parseFloat(parseFloat(vAdd$.value.prix_HT.$model)*(parseFloat(vAdd$.value.TVA.$model)/100))
            })
            vAdd$.value.num_facture.$model=computed(()=>{
                return props.formData.num_facture
            })
            newFacture.value.num_facture=computed(()=>{
                return vAdd$.value.num_facture.$model
            })
            const MotantUpdated=ref(false)
            const motantReelupdated=computed(()=>
            props.formData.type_choisie=='PS'?
            props.formData.box.num_place.prix_ht:props.formData.type_choisie=='AP'?
            props.formData.appartement.prix_ht:props.formData.locale.num_place.prix_ht
            )
            function changeMontantReel(bool){
                MotantUpdated.value=bool
                MotantUpdated.value?vAdd$.value.montant_reel.$model=motantReelupdated.value:motantReelupdated.value=vAdd$.value.montant_reel.$model
                
                // switch (props.formData.type_choisie) {
                //     case 'PS':
                //         MotantUpdated.value?vAdd$.value.montant_reel.$model=motantReelupdated.value:motantReelupdated.value=vAdd$.value.montant_reel.$model
                //         break;
                //     case 'AP':
                //         MotantUpdated.value?vAdd$.value.montant_reel.$model=motantReelupdated.value:motantReelupdated.value=vAdd$.value.montant_reel.$model
                //         break;
                //     case 'LC':
                //         MotantUpdated.value?vAdd$.value.montant_reel.$model=motantReelupdated.value:motantReelupdated.value=vAdd$.value.montant_reel.$model
                //         break;
                
                //     default:
                //         break;
                // }
                    
              
                
            }
            
            // vAdd$.value.montant_reel.$model=computed(()=>{
            //     if (props.formData.type_choisie=='LC')return parseFloat(props.formData.num_place.prix_ht).toFixed(2)
            //     if (props.formData.type_choisie=='PS')return parseFloat(props.formData.num_place.prix_ht).toFixed(2)
            //     if (props.formData.type_choisie=='AP')return parseFloat(props.formData.num_place.prix_ht)+parseFloat(props.formData.prix_ht).toFixed(2)
            // })
            // newFacture.value.montant_reel=computed(()=>{
            //     return vAdd$.value.montant_reel.$model
            // })

            const dynamicTrache= ref([])
            
            // computed(()=> {
            //     // Generate dynamic buttons based on some data or logic
            //     const tranche = []
                
            //     for (let i = 1; i <= vAdd$.value.nbr_tranche.$model; i++) {

            //         tranche.push({ 
            //             num_tranche: i,
            //             prix_prevue:0,
            //             prix_realise:0,
            //             prochaine_rdv_prevue:"",
            //             prochaine_rdv_realise:""
            //         })
            //     }
                
            //     return tranche
                
                
            // })
            watch(() => {
                const newTranches = [];
                for (let i = 1; i <= vAdd$.value.nbr_tranche.$model; i++) {
                    newTranches.push({
                    num_tranche: i,
                    taux_tranche:0,
                    prix_prevue: 0,
                    prix_realise: 0,
                    prochaine_rdv_prevue: "",
                    prochaine_rdv_realise: "",
                    });
                }
                dynamicTrache.value = newTranches;
                
                });
            var tranchesList =ref(dynamicTrache.value.map(tranche => ({...tranche})))
             
            function updateTrancheValue(index, field, value) {
                // const updatedTranche = { ...tranchesList.value[index] };
                if (field=='prochaine_rdv_prevue'){
                    tranchesList.value[index].prochaine_rdv_prevue = value.toISOString();
                }else{
                    if (value.value!=undefined){
                        tranchesList.value[index].prix_prevue = parseFloat(value.value.replace('%',''))*vAdd$.value.montant_reel.$model/100;
                    } 
                }
                // dynamicTrache.value[index]  = updatedTranche;
                // console.log(tranchesList.value[index],'eeeeeee');
            }
            // watchEffect(() => {
            //     tranchesList.value = dynamicTrache.value;
            //     });
            // watchEffect(dynamicTrache, (newVal, oldVal) => {
                // { immediate: false }
                watchEffect(() => {
                    // console.log(dynamicTrache,"eeeee");
                        // const oldTranche = oldVal.find(t => t.num_tranche === tranche.num_tranche)
                        tranchesList.value =dynamicTrache.value
                }

                )
            // calculatePrixTTC()
            // onMounted(() => {
            //     tranchesList.value=dynamicTrache.value.map(tranche => ({...tranche}))

            // }),

            return {dynamicTrache,tranchesList,updateTrancheValue,
                changeMontantReel,MotantUpdated,motantReelupdated,
                editingRows,num_facture,
                // ,montant_reel,montant_vente,montant_verser,prix_TTC,prix_HT,prix_prevue,prix_realise,
                vAdd$,
                classes,
                TVA,type_choisie,type_class,contrat_du,fin_contrat,
                classTva,showTrache,showFacture,date_verser_banque,
                nextPage1,
                prevPage1,
                onRowEditSave,
                onSelectAllChange,functionShow,
                onToggle,getFactureExist,vAdd$,submitted,
                openNew,newFacture,addSite,DeleteG,calculatePrixTTC,searching,
                nbr_tranche,num_tranche,prochaine_rdv_prevue,prochaine_rdv_realise,
            }
        }
    
    }
    </script>