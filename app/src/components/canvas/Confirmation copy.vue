<template>
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-6">

            <div class="card">
                <h1> Information Client </h1>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Client :</strong> <span
                            style="font-size: 1.4rem;">{{formData.client.nom}} {{formData.client.prenom}}</span></div>

                </div>

                <!-- <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Age :</strong> <span
                            style="font-size: 1.4rem;">{{formData.client.age}}</span></div>

                </div> -->
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Numéro Piece ID :</strong> <span
                            style="font-size: 1.4rem;">{{formData.client.num_piece}} /
                            {{formData.client.type_piece}}</span></div>

                </div>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> N° Tél :</strong> <span
                            style="font-size: 1.4rem;">{{formData.client.phoneClient}}</span></div>

                </div>
                <div v-if="formData.client.faxClient!=''" class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> N° Fax :</strong> <span
                            style="font-size: 1.4rem;">{{formData.client.faxClient}}</span></div>

                </div>

                <div v-if="formData.client.faxClient!=''" class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Date de naissance :</strong> <span
                            style="font-size: 1.4rem;">{{formData.client.date_naissance}}</span></div>

                </div>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> E-mail :</strong> <span
                            style="font-size: 1.4rem;">{{formData.client.emailClient}}</span></div>

                </div>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Adresses :</strong> <span
                            style="font-size: 1.4rem;">{{formData.client.adresses.adresseClient}}
                            {{formData.client.adresses.communeClient}} {{formData.client.adresses.adresseClient}}</span>
                    </div>

                </div>
            </div>
        </div>
        <div  class="col-12 lg:col-6 xl:col-6">
            <div class="card">
                <h1>Rensignement du Bien</h1>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Nom :</strong> <span
                            style="font-size: 1.4rem;">{{formData.nom}}</span></div>

                </div>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Prénom :</strong> <span
                            style="font-size: 1.4rem;">{{formData.prenom}}</span></div>

                </div>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Date de naissance:</strong> <span
                            style="font-size: 1.4rem;">{{formData.date_naissance}}</span></div>

                </div>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Nationalité :</strong> <span
                            style="font-size: 1.4rem;">{{formData.nationalite}}</span></div>

                </div>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Wilaya :</strong> <span
                            style="font-size: 1.4rem;">{{formData.WilayaG}}</span></div>

                </div>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Commune :</strong> <span
                            style="font-size: 1.4rem;">{{formData.Commune.region}}</span></div>

                </div>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Address:</strong> <span
                            style="font-size: 1.4rem;">{{formData.address}}</span></div>

                </div>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Téléphoner :</strong> <span
                            style="font-size: 1.4rem;">{{formData.Phone}}</span></div>

                </div>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Email :</strong> <span
                            style="font-size: 1.4rem;">{{formData.email}}</span></div>

                </div>



                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Raison social :</strong> <span
                            style="font-size: 1.4rem;">{{formData.raison_social}}</span></div>

                </div>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Secteur :</strong> <span
                            style="font-size: 1.4rem;">{{Object.values(formData.secteur)[0]["id"]}}</span></div>

                </div>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Branche :</strong> <span
                            style="font-size: 1.4rem;">{{formData.branche}}</span></div>

                </div>
                <div class="field col-12">
                    <div for="Age"> <strong style="font-size: 1.4rem;"><i class="pi pi-check"
                                style="color: #22c55e;"></i> Type d'entreprise :</strong> <span
                            style="font-size: 1.4rem;">{{formData.type_entrp}}</span></div>

                </div>

            </div>
        </div>



    </div>
    <div class="grid grid-nogutter justify-content-between">
        <Button label="Retour" @click="prevPage()" icon="pi pi-angle-left" />
        <Button label="Complete" @click="complete()" icon="pi pi-check" iconPos="right" class="p-button-success" />


    </div>
</template>


<script>
import { ref } from 'vue'
import ComptabVue from './Comptab.vue';
export default {
    props: {
        formData: Object
    },

    emits: ["complete", "prevpage"],

    setup(props, { emit }) {
        console.log(props)


        function prevPage() {
            //console.log(emit('prevpage', {pageIndex: 1}));

            emit('prevpage', { pageIndex: 3 });
        }
        function complete() {
            emit('complete');
            console.log("object va ", va.value);
            console.log("object ca ", ca.value);
        }
        return {
            prevPage, complete
        }
    }


}
</script>