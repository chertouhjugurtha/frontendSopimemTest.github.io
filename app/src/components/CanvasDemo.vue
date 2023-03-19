
<template>
    <div>
        <Toast />
        
        <div class="card" id="cardSteps">
            <Steps :model="items" :readonly="true"  />
        </div>

        <router-view v-slot="{Component}" :formData="formObject" @prevpage="prevPage($event)" @nextpage="nextPage($event)" @complete="complete">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>

<script>
import {ref} from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
export default {
    
    setup(){
        const store=useStore()
        const router = useRouter();
        const toast = useToast();
        const localeLang=ref(store.state.user.localeLang)

        const items=ref( [{
                label: (localeLang.value=="ar")?"الزبون":(localeLang.value=="fr")?"Client":"Customer",
                to: '/canvas'
            },
            {
                label:(localeLang.value=="ar")?"معلومات السكن":(localeLang.value=="fr")?"Renseignement Logement":"Housing Information" ,
                to: '/canvas/logement'
            },
            {
                label:(localeLang.value=="ar")?"الفواتير":(localeLang.value=="fr")?"Facturation":"Invoice",
                to: '/canvas/facture'
            },
            {
                label:(localeLang.value=="ar")?"التأكيد":(localeLang.value=="fr")?"Confirmation":"Confirmation",
                to: '/canvas/confirmation'
            }])
        const formObject=ref({})
        const nextPage = (event) => {
            for (let field in event.formData) {
                formObject.value[field] = event.formData[field];
            }
            router.push(items.value[event.pageIndex + 1].to);
        };
        const prevPage = (event) => {
            router.push(items.value[event.pageIndex - 1].to);
        };
        const complete = () => {
            toast.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + formObject.value.client.nom + ' ' + formObject.value.client.prenom+ ' your order completed.'});
            
        };
    
        return {
            localeLang,formObject,items,nextPage,prevPage,complete
        }
    },
    // methods: {
    //     nextPage(event) {
    //         for (let field in event.formData) {
    //             this.formObject[field] = event.formData[field];
    //         }

    //         this.$router.push(this.items[event.pageIndex + 1].to);
    //     },
    //     prevPage(event) {
    //         this.$router.push(this.items[event.pageIndex - 1].to);
    //     },
    //     complete() {
    //         this.$toast.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + this.formObject.firstname + ' ' + this.formObject.lastname + ' your order completed.'});
    //     }
    // }
}
</script>

<style scoped lang="scss">
::v-deep(b) {
    display: block;
}

::v-deep(.p-card-body) {
    padding: 2rem;

}
</style>
<style lang="css">
@media (max-width: 600px) {
  .p-steps-title{
    display: none;
  }
}
</style>
                    
 