<template>
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-6">

            <div class="card">
                <h1> Information Client </h1>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Client :</strong> <span
                            style="font-size: 1.4rem;">{{formData?.client.nom}} {{formData?.client.prenom}}</span></div>

                </div>
                <!-- <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Age :</strong> <span
                            style="font-size: 1.4rem;">{{formData?.client.age}}</span></div>
                </div> -->
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Numéro Piece ID :</strong> <span
                            style="font-size: 1.4rem;">{{formData?.client.num_piece}} /
                            {{formData?.client.type_piece.value}}</span></div>

                </div>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> N° Tél :</strong> <span
                            style="font-size: 1.4rem;">{{formData?.client.phoneClient}}</span></div>

                </div>
                <div v-if="formData?.client.faxClient!=''" class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> N° Fax :</strong> <span
                            style="font-size: 1.4rem;">{{formData?.client.faxClient}}</span></div>

                </div>

                <div v-if="formData?.client.date_naissance!=''" class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Date de naissance :</strong> <span
                            style="font-size: 1.4rem;">{{new Date(formData?.client.date_naissance).toLocaleString()}}</span></div>

                </div>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> E-mail :</strong> <span
                            style="font-size: 1.4rem;">{{formData?.client.emailClient}}</span></div>

                </div>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Adresses :</strong> <span
                            style="font-size: 1.4rem;">{{formData?.client.adresse}}</span>
                    </div>

                </div>
                
            </div>
        </div>
        <div  class="col-12 lg:col-6 xl:col-6">
            <div class="card">

                
                <!-- Box -->
                <div v-if="formData?.box!=undefined">
                    <h1>Rensignement du place de Stationnement</h1>
                    <div  class="field col-12">
                        <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                    style="color: #22c55e;"></i> Résidance :</strong> <span
                                style="font-size: 1.4rem;">
                                {{formData?.box.residance.designation}}</span>
                        </div>

                    </div>
                    <div  class="field col-12">
                        <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                    style="color: #22c55e;"></i> Num Place :</strong> <span
                                style="font-size: 1.4rem;">
                                {{formData?.box.num_place.num_place}} Etage: {{formData?.box.num_place.etage_place}}</span>
                        </div>

                    </div>
                </div>
                <!-- Appartement -->
                <div v-if="formData?.appartement!=undefined">
                    <h1>Rensignement sur l'appartement</h1>

                    <div  class="field col-12">
                        <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                    style="color: #22c55e;"></i> Résidence :</strong> <span
                                style="font-size: 1.4rem;">
                                {{formData?.appartement.residance.designation}}</span>
                        </div>

                    </div>
                    <div  class="field col-12">
                        <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                    style="color: #22c55e;"></i> Information sur l'appartement :</strong> 
                                    <span style="font-size: 1.4rem;">
                                N:° {{formData?.appartement.num_lot}} Type: {{formData?.appartement.type}}</span>
                        </div>

                    </div>
                    <div  class="field col-12">
                        <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                    style="color: #22c55e;"></i> Place De Stationnement :</strong> <span
                                style="font-size: 1.4rem;">
                                {{formData?.appartement.num_place.num_place}} </span>
                        </div>

                    </div>
                </div>
                <!-- locale -->
                <div v-if="formData?.locale!=undefined">
                    <h1>Rensignement sur le locale</h1>

                    <div  class="field col-12">
                        <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                    style="color: #22c55e;"></i> Adresses :</strong> <span
                                style="font-size: 1.4rem;">
                                {{formData?.locale.residance.designation}}</span>
                        </div>

                    </div>
                    <div  class="field col-12">
                        <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                    style="color: #22c55e;"></i> Num Place :</strong> <span
                                style="font-size: 1.4rem;">
                                {{formData?.locale.num_place.num_place}}</span>
                        </div>

                    </div>
                
                </div>
                <h1>Rensignement sur la Facture</h1>
                    <div class="field col-12" v-if="formData?.facture.montant_reel!=''" for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                            style="color: #22c55e;"></i> Montant Réel:</strong> <span
                        style="font-size: 1.4rem;">
                        {{parseFloat(formData?.facture.montant_reel).toLocaleString('fr-FR')}}DZD
                        </span>
                    </div>
                    <div class="field col-12" v-if="formData?.facture.montant_vente!=''" for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Montant du Vente:</strong> <span
                            style="font-size: 1.4rem;">
                            {{parseFloat(formData?.facture.montant_vente).toLocaleString('fr-FR')}}DZD</span>
                    </div>
                    <div class="field col-12" v-if="formData?.facture.prix_HT!=''" for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Prix Hors Taxe:</strong> <span
                            style="font-size: 1.4rem;">
                            {{parseFloat(formData?.facture.prix_HT).toLocaleString('fr-FR')}}DZD
                            </span>
                    </div>
                    <div class="field col-12" v-if="formData?.facture.prix_TTC!=''" for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Prix TTC:</strong> <span
                            style="font-size: 1.4rem;">
                            {{parseFloat(formData?.facture.prix_TTC).toLocaleString('fr-FR')}}DZD
                            </span>
                    </div>
                    <div class="field col-12" v-if="formData?.facture.TVA!=''" for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> TVA :</strong> <span
                            style="font-size: 1.4rem;">
                            {{formData?.facture.TVA}} %</span>
                    </div>

                   
                    <!-- <div  class="field col-12"> -->
                    
                    <!-- </div> -->
                    
                    <div class="field col-12" v-if="formData?.facture.contrat_du!=''" for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Contrat Du :</strong> <span
                            style="font-size: 1.4rem;">
                            {{new Date(formData?.facture.contrat_du ).toLocaleString()}}</span>
                    </div>
                    <div class="field col-12" v-if="formData?.facture.nbr_tranche!=undefined" for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Nombre de Tranche :</strong> <span
                            style="font-size: 1.4rem;">
                            {{formData?.facture.nbr_tranche}}</span>
                    </div>
                    <div class="field col-12" v-if="formData?.facture.prochaine_rdv_prevue!=undefined" for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Prochaine rendez-vous:</strong> <span
                            style="font-size: 1.4rem;">
                            {{new Date(formData?.facture.prochaine_rdv_prevue).toLocaleString()}}</span>
                    </div>
                <!-- </div> -->
            </div>
        </div>



    </div>
    <div class="grid grid-nogutter justify-content-between">
        <Button label="Retour" @click="prevPage()" icon="pi pi-angle-left" />
        <Button label="Complete" @click="complete()" icon="pi pi-check" iconPos="right" class="p-button-success" />


    </div>
</template>


<script>
import api from '../../api'

import { ref } from 'vue'
import ComptabVue from './Comptab.vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";


export default {
    props: {
        formData: Object
    },

    emits: ["complete", "prevpage"],

    setup(props, { emit }) {
        const router = useRouter()
        const toast = useToast();
        const confirm = useConfirm();


        const store = useStore()
        // console.log(props.formData?)
        // const date_naissance=props.formData?.client.date_naissance
        function prevPage() {
            //console.log(emit('prevpage', {pageIndex: 1}));
            emit('prevpage', { pageIndex: 3 });
        }
        function notify(store,subject,content){  
            let jsonNotify={}
            if(!store.state.keycloak.hasRealmRole('admin')){
                jsonNotify={
                    "subject" :subject,
                    "content" :content,
                    "opened"  :false 
                }   
            }else{
                jsonNotify={
                    "subject" :subject,
                    "content" :content,
                    "opened"  :false 
                }  

            }
            api.post('/notifications/',jsonNotify)
                .then(responce=>{
                    // toast.add({severity:'success', summary: 'Successful', detail: 'gerant created Successfully', life: 1000});
                    setTimeout(()=>{
                        // raffrichir la page
                    },500)
                })
                .catch(error=>{
                    errormessage.value=error.response.data
                    // toast.add({severity:'error', summary: 'Error', detail: 'unable to create new gerant : '+error.message+' :\n'+errormessage.value, life: 4000});
                }) 
        }
        function complete() {
            if (!props.formData || !props.formData.client) {
                // handle the case when the formData or the client property is undefined
                return;
            }
            let content='Ci jointe une nouvelle facture du client '+props.formData.client.nom+" "+props.formData.client.prenom+" realisé(e) par "+store.state.user.name
            notify(store,'Nouvelle facture '+props.formData.facture.num_facture,content)
            api.post('/facture-client/',props.formData)
                .then(responce=>{
                    toast.add({severity:'success', summary: 'Successful', detail: 'Facture à été crier avec succée', life: 500});
                    setTimeout(()=>{
                        // raffrichir la page
                        props.formData={}
                        router.push({ path: '/canvas' });
                    },500)
                })
                .catch(error=>{
                    //errormessage.value=error.response.data
                    toast.add({severity:'error', summary: 'Error', detail: 'Echec de création de la facture !', life: 500});
                })  
            // emit('complete');
            
        }
        return {
            prevPage, complete,
            // date_naissance
        }
    }


}
</script>