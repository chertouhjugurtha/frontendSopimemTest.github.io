<template>
<ConfirmDialog></ConfirmDialog> 
  <div class="grid">
        <div v-show="!showDetails" class="col-12 xl:col-12">
                <div class="card" >
                    <div class="flex align-items-center justify-content-between mb-4">
                        <div>
                            <SplitButton v-if="nameroot!='details'" style="direction:ltr"  
                                label="Nouveau message" icon="pi pi-eye" 
                                :model="[{label: 'Clients',icon:'pi pi-plus',command: ()=>{openComposeDialog(compose,'clients')}}
								,{label: 'Direction Interne',icon:'pi pi-plus',command: ()=>{openComposeDialog(compose,'interne')}}
								]"
								 class="p-button-rounded p-button-outlined p-button-danger  ">
                            </SplitButton>

                            <!-- <Button v-if="nameroot!='details'"  icon="pi pi-plus" :label="localeLang=='ar'?'رسالة جديدة':localeLang=='fr'?'Nouveau message ':'New message'" class="p-button-rounded p-button-outlined p-button-danger  " @click="openComposeDialog(compose)" >
                            </Button>
                            <Button v-if="nameroot!='details'"  icon="pi pi-plus" :label="localeLang=='ar'?'رسالة جديدة':localeLang=='fr'?'Nouveau message ':'New message'" class="p-button-rounded p-button-outlined p-button-danger  " @click="openComposeDialog(compose)" >
                            </Button> -->
                        </div>
                        
                        
                        <div>
                        <span class="p-buttonset">

                           <router-link :to="{name:'inbox'}" ><Button icon="pi pi-inbox" label="Inbox" class="p-button-outlined mr-2 mb-2" /></router-link>
                           <router-link :to="{name:'sent'}"  ><Button icon="pi pi-send"  label="Sent" class="p-button-outlined mr-2 mb-2" /></router-link>
                        </span>
                           
                        </div>
                    </div>
                    <div class="field col" style="overflow: auto;">
                        <router-view name="inboxsent"/><br/>
                    </div>
                </div>
        </div>
        
        <Dialog v-model:visible="compose" :style="{ width: '750px' }" :header="localeLang=='ar'?'رسالة جديدة':localeLang=='fr'?'Nouveau message ':'New message'" :modal="true" class="p-fluid">
                    <br/>
                    <div v-if="typeEmail==='clients'" class="field col">
                        <span class="p-float-label">
                            <!-- @input="changeSelected($event)" -->
                            <AutoComplete v-model="v$.email.$model" optionLabel="emailClient" optionValue="emailClient"   :suggestions="filteredClients" @complete="search" :debounce="500" >
                            </AutoComplete>
        
                            <!-- <Dropdown v-if="localeLang=='ar'" id="email" v-model="v$.email.$model"  :filter="true"  optionLabel='destination_ar'  :options="emailsClasses" :class="{'p-invalid':(v$.email.$invalid && submitted)}"  />
                            <Dropdown v-else-if="localeLang=='en'" id="email" v-model="v$.email.$model" :filter="true" :showClear="true" optionLabel='destination_en'  :options="emailsClasses" :class="{'p-invalid':(v$.email.$invalid && submitted)}"  />
                            <Dropdown v-else id="email" v-model="v$.email.$model" :filter="true" :showClear="true" optionLabel='destination_fr' :options="emailsClasses" :class="{'p-invalid':(v$.email.$invalid && submitted)}"  /> -->
                            <label   for="email" :class="{'p-error':(v$.email.$invalid && submitted)}" >E-mail Clients</label>
                            <!-- <label v-else-if="localeLang=='en'" for="email" :class="{'p-error':(v$.email.$invalid && submitted)}" >email</label>
                            <label v-else   for="email" :class="{'p-error':(v$.email.$invalid && submitted)}" >Directorate</label> -->
                        </span>
                        <small v-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{v$.email.required.$message.replace('Value', 'email')}}</small>
                    </div>
                    <div v-else-if="typeEmail==='interne'" class="field col">
                        <span class="p-float-label">
                            <!-- @input="changeSelected($event)" -->
                            <!-- <AutoComplete v-model="v$.email.$model" optionLabel="emailClient" optionValue="emailClient"   :suggestions="filteredClients" @complete="search" :debounce="500" >
                            </AutoComplete> -->
        
                            <Dropdown v-if="localeLang=='ar'" id="email" v-model="v$.email.$model"  :filter="true"  optionLabel='destination_ar'  :options="directions" :class="{'p-invalid':(v$.email.$invalid && submitted)}"  />
                            <Dropdown v-else-if="localeLang=='en'" id="email" v-model="v$.email.$model" :filter="true" :showClear="true" optionLabel='destination_en'  :options="directions" :class="{'p-invalid':(v$.email.$invalid && submitted)}"  />
                            <Dropdown v-else id="email" v-model="v$.email.$model" :filter="true" :showClear="true" optionLabel='destination_fr' :options="directions" :class="{'p-invalid':(v$.email.$invalid && submitted)}"  />
                            <label  for="email" :class="{'p-error':(v$.email.$invalid && submitted)}" >E-mail interne</label>
                            <!-- <label v-else-if="localeLang=='en'" for="email" :class="{'p-error':(v$.email.$invalid && submitted)}" >email</label>
                            <label v-else   for="email" :class="{'p-error':(v$.email.$invalid && submitted)}" >Directorate</label> -->
                        </span>
                        <small v-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{v$.email.required.$message.replace('Value', 'email')}}</small>
                    </div>
                    <div class="field col">
                        <span class="p-float-label">
                            <InputText id="Subject" v-model="v$.subject.$model" :class="{'p-invalid':(v$.subject.$invalid && submitted)}"  />
                            <label v-if="localeLang=='ar'" for="Subject" :class="{'p-error':(v$.subject.$invalid && submitted)}" >الموضوع</label>
                            <label v-else-if="localeLang=='fr'" for="Subject" :class="{'p-error':(v$.subject.$invalid && submitted)}" >Objet</label>
                            <label v-else for="Subject" :class="{'p-error':(v$.subject.$invalid && submitted)}" >Subject</label>
                        </span>
                        <small v-if="(v$.subject.$invalid && submitted) || v$.subject.$pending.$response" class="p-error">{{v$.subject.required.$message.replace('Value', 'Subject')}}</small>
                    </div>
                    <div class="field col">

                        <span v-if="localeLang=='ar'" class="p-label" :class="{'p-error':(v$.content.$invalid && submitted)}">الرسالة</span>
                        <span v-else-if="localeLang=='fr'" class="p-label" :class="{'p-error':(v$.content.$invalid && submitted)}">Message</span>
                        <span v-else class="p-label" :class="{'p-error':(v$.content.$invalid && submitted)}">Message</span>
                        <Editor v-model="v$.content.$model" editorStyle="height: 320px" :class="{'p-invalid':(v$.content.$invalid && submitted)}">
                            <template v-slot:toolbar>
                                <span class="ql-formats">
                                    <button v-if="localeLang=='ar'" class="ql-header" v-tooltip.bottom="'Headers'">الرؤوس </button>
                                    <button  v-else-if="localeLang=='fr'" class="ql-header" v-tooltip.bottom="'Headers'">En-têtes </button>
                                    <button v-else class="ql-header" v-tooltip.bottom="'Headers'">Headers </button>
                                </span>&nbsp;
                                <span class="ql-formats">
                                    
                                    <button class="ql-bold" v-tooltip.bottom="'Bold'"></button>
                                    <button class="ql-italic" v-tooltip.bottom="'Italic'"></button>
                                    <button class="ql-underline" v-tooltip.bottom="'Underline'"></button>
                                    <button class="ql-list" value="ordered" v-tooltip.bottom="'Order List'"></button>
                                    <button class="ql-list" value="bullet" v-tooltip.bottom="'Unorder List'"></button>
                                    <button class="ql-align ql-picker ql-icon-picker" v-tooltip.bottom="'Adjust'"></button>
                                    <button class="ql-link" v-tooltip.bottom="'Link'"></button>
                                </span>
                            </template>
                        </Editor>
                        <small v-if="(v$.content.$invalid && submitted) || v$.content.$pending.$response" class="p-error">{{v$.content.required.$message.replace('Value', 'Content')}}</small>
                    </div>
                    <div class="field col-12 md:col-3">
                        <span class="p-label p-button p-component p-button-outlined p-button-secondary mr-2 " draggable="true">
                            <input class="fileupload"  :type="'file'" name="files[]" accept="image/*,.pdf,.doc,.docx,.xls" id="files" @change="UploadImage($event)" draggable="true" multiple/>
                            <label v-if="localeLang=='ar'"  for="files" style="display: block; cursor: pointer"><i class="pi pi-fw pi-paperclip"></i>المرفقات</label>
                            <label v-else-if="localeLang=='fr'" for="files" style="display: block; cursor: pointer"><i class="pi pi-fw pi-paperclip"></i>Pièces jointes</label>
                            <label v-else  for="files" style="display: block; cursor: pointer"><i class="pi pi-fw pi-paperclip"></i>Attachements</label>
                        </span>
                    </div>
                    <div class="field col">
                        <Message v-if="imageSizeError" for="logo" severity="error">{{imageSizeError}}</Message>
                        <Chip v-for="previewImage,index in files" :key="index"
                         class="mb-2 mr-1" style="cursor:pointer; padding:10px" v-tooltip:bottom="'Click to remove'">
                         <i :class="previewImage.type.split('/')[0]=='image'?'pi pi-image':previewImage.type.split('/')[1]=='vnd.ms-excel'?'pi pi-file-excel':previewImage.type.split('/')[1]=='pdf'?'pi pi-file-pdf':'pi pi-file'"></i>&nbsp;
                         {{previewImage.name.substring(0,3)+'...'+' '+niceBytes(previewImage.size)}} &nbsp;&nbsp;
                         <i class="pi pi-times-circle" @click="removeFileFromFiles(index)" ></i>
                         </Chip>
                        
                    </div>
                    <template #footer>
                        <Button :label="cancel_t" icon="pi pi-times" class="p-button-text" @click="cancelCompose(compose)"/>
                        <Button :label="save_t" icon="pi pi-check" class="p-button-text" @click="setNewMessage" />
                    </template>
            </Dialog>
        <Toast />

    </div>
</template>

<script>
import { email, required,minLength,maxLength, alpha} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import {ref, reactive, toRefs,onMounted,watch,onBeforeUpdate} from 'vue'
import {useStore} from 'vuex'
import api from '../api'
import {useRoute} from 'vue-router'
import { useConfirm } from "primevue/useconfirm";

import { useToast } from "primevue/usetoast";
import directions from "../../public/data/direction/directions.json"
export default {
    name: 'Messages',
    setup(){
        //provide('message',{})
        
        const store = useStore()
        const toast = useToast();
        const router = useRoute();
        const compose = ref(false)
        const showDetails = ref(false)
        const confirm = useConfirm()
        const messageContent = ref('')
        const translate = reactive({
            ar: {
                add_t: 'إضافة',
                username_t: 'إسم المستخدم',
                firstname_t: 'الإسم',
                lastname_t: 'اللقب',
                mobile_t: 'الهاتف',
                email_t: 'البريد الإلكتروني',
                create_at_t: 'سجل في',
                actions_t: 'العمليات',
                listOfUsers_t: 'قائمة المستخدمين',
                users_t: 'المستخدمين',
                wilaya_t: 'الولاية',
                commune_t: 'البلدية',
                verifyEmail_t: 'تأكيد البريد الإلكتروني؟',
                save_t: 'حفظ',
                cancel_t: 'إلغاء',
                details_t: 'التفاصيل',
                lock_t: 'قفل',
                unlock_t: 'الغاء القفل',
                setEntreprise_t: 'منح شركة',
                setPassword_t: 'وضع كلمة السر',
                delete_t: 'حذف',
                temporary_t: 'مؤقت',
                password_t: 'كلمة السر',
                confirmPassword_t: 'تأكيد كلمة السر',
                clear_t: 'مسح',
                select_role_to_filter: 'إختر دور للبحث',
                keyword_search_t: 'بحث بكلمة مفتاحية',
                address_t: 'العنوان',
                role_t: 'الدور',
                set_user_password: 'تعيين كلمة مرور المستخدم',
                user_details: 'تفاصيل المستخدم',
                set_entreprise_to_user: 'تعيين المؤسسة على المستخدم',
                add_new_user: 'إضافة مستخدم جديد',
                entreprises_t: 'الشركات'

            },
            en: {
                add_t: 'Add',
                username_t: 'Username',
                firstname_t: 'Firstname',
                lastname_t: 'Lastname',
                mobile_t: 'Mobile',
                email_t: 'Email',
                create_at_t: 'Created at',
                actions_t: 'Actions',
                listOfUsers_t: 'List of users',
                users_t: 'Users',
                wilaya_t: 'Wilaya',
                commune_t: 'Commune',
                verifyEmail_t: 'Verify email?',
                save_t: 'Save',
                cancel_t: 'Cancel',
                details_t: 'Details',
                lock_t: 'Lock',
                unlock_t: 'Unlock',
                setEntreprise_t: 'Set entreprise',
                setPassword_t: 'Set password',
                delete_t: 'Delete',
                temporary_t: 'Temporary',
                password_t: 'Password',
                confirmPassword_t: 'Confirm password',
                clear_t: 'Clear',
                select_role_to_filter: 'Select role to filter',
                keyword_search_t: 'Keyword search',
                address_t: 'Address',
                role_t: 'Role',
                set_user_password: 'Set user password',
                user_details: ' User details',
                set_entreprise_to_user: 'Set entreprise to user',
                add_new_user: 'Add new user',
                entreprises_t: 'Companies'
            },
            fr: {
                add_t: 'Ajouter',
                username_t: 'Nom d\'utilisateur',
                firstname_t: 'Prénom',
                lastname_t: 'Nom',
                mobile_t: 'Mobile',
                email_t: 'Email',
                create_at_t: 'Créé à',
                actions_t: 'Actions',
                listOfUsers_t: 'Liste des utilisateurs',
                users_t: 'Utilisateurs',
                wilaya_t: 'Wilaya',
                commune_t: 'Commune',
                verifyEmail_t: 'Vérifier l\'email?',
                save_t: 'Enregistrer',
                cancel_t: 'Annuler',
                details_t: 'Détails',
                lock_t: 'Verrouiller',
                unlock_t: 'Ouvrir',
                setEntreprise_t: 'Attribué entreprise',
                setPassword_t: 'Définir le mot de passe',
                delete_t: 'Supprimer',
                temporary_t: 'Temporaire',
                password_t: 'Mot de passe',
                confirmPassword_t: 'Confirmer le mot de passe',
                clear_t: 'Vider',
                select_role_to_filter: 'Sélectionnez le rôle à filtrer',
                keyword_search_t: 'Recherche par mot clé',
                address_t: 'Adresse',
                role_t: 'Role',
                set_user_password: 'Définir le mot de passe utilisateur',
                user_details: 'Détails de l\'utilisateur',
                set_entreprise_to_user: 'Définir l\'entreprise en utilisateur',
                add_new_user: 'Ajouter un nouvel utilisateur',
                entreprises_t: 'Entreprises'
            }
        })
        const localeLang = ref(localStorage.getItem('localeLang'))
        const translateLang = reactive((localeLang.value =='ar')?translate.ar:(localeLang.value =='fr')?translate.fr:translate.en)
        const messageData = reactive({email:'',subject:'',content: ''})
        const rules = {
            email:{required},
            subject: {required, minLength: minLength(4), maxLength: maxLength(100)},
            content: {required, minLength: minLength(4)},

        }
        
        const submitted = ref(false)
        const v$ = useVuelidate(rules, messageData)
        const typeEmail=ref('')
        function openComposeDialog(compos,type){
            compose.value = !compos
            typeEmail.value=type
        }
        const nameroot=ref('')
        const filesFiltred=ref([])
        const files=ref([])
        const imageSizeError=ref(0)
        //const images = ref('')
        function UploadImage(e){
            if(e.target.files[0].size > 1024000){
                imageSizeError.value = 'Image Size is too big, please provide a logo less thent 200 KB'
            }else{
                for (var i=0; i<e.target.files.length; i++){
                    files.value.push(e.target.files[i])
                }

            }
                    /*else{
                        //images.value = e.target.files[0];
                        //console.log(image);
                        //const reader = new FileReader();
                        for (var i=0; i<e.target.files.length; i++){
                            //console.log(e.target.files);
                            files.value[i]=e.target.files[i]
                           // reader.readAsDataURL(e.target.files[i]);
                           /* reader.onload = event =>{
                                imageSizeError.value=''
                                files.value[i]={data:event.target.result}
                                //console.log(previewImage.value);
                                //files.value.push(files.value)
                                
                            };
                        }
                        console.log(files.value);
                    }*/
            }
            const filteredClients = ref();
            const clients=ref([])
            var emailValue=ref('')
            
            const search = (event) => {
                console.log(event.query);
                setTimeout(() => {

                    if (!event.query.trim().length) {
                        filteredClients.value = [...clients.value];
                    } else  {
                        filteredClients.value = clients.value.filter((client) => {
                            console.log("999999", client);
                            // console.log("fromRaR",client.emailClient.toLowerCase().includes(event.query.toLowerCase()));
                            return client.emailClient.toLowerCase().includes(event.query.toLowerCase());
                        });
                        
                    }
                }, 500);
                
                
            }

            onMounted(() => {
                api.get('/clients/?canvas=true').then(response => {
                clients.value = response.data.results
                // originalClient.value=clients.value
                
                }).catch(error => {
                        console.log(error.response.data)
                })
                

            });
            // messageData = Object.assign({}, messageData, { a: 1, b: 2 })
            
           
           
            function niceBytes(x){
                const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                let l = 0, n = parseInt(x, 10) || 0;
                while(n >= 1024 && ++l){
                    n = n/1024;
                }
                return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
            }
            function removeFileFromFiles(index){
                files.value.splice(index,1)
                //for (vr i=0; iz)
            }
            function cancelCompose(compos){
                
                if (localeLang.value == "en") {
                    confirm.require({
                    message: 'Are you sure you want to delete this information?',
                    header: 'Confirmation',
                    icon: 'pi pi-exclamation-triangle',
                    acceptLabel: 'Yes',
                    rejectLabel: 'No',
                    acceptClass: 'p-button-danger',
                    accept: () => {
                        Object.assign(messageData,{email:'',subject:'',content: ''})

                        files.value=[]
                        compose.value=!compos 
                        toast.add({ severity: 'success', summary: 'Successful', detail: 'Operation canceled', life: 1000 });

                    },
                    reject: () => {
                    }
                }
                )
                } else if (localeLang.value == "fr") {
                        confirm.require({
                            message: 'Êtes-vous sûr de vouloir supprimer ces informations?',
                            header: 'Confirmation',
                            icon: 'pi pi-exclamation-triangle',
                            acceptLabel: 'Oui',
                            rejectLabel: 'No',
                            acceptClass: 'p-button-danger',
                            accept: () => {
                                Object.assign(messageData,{email:'',subject:'',content: ''})

                                files.value=[]

                                compose.value=!compos  
                                toast.add({ severity: 'success', summary: 'Succès', detail: 'Opération annulée', life: 1000 });
              
                            },
                            reject: () => {
                            }
                        }
                        )
                } else if (localeLang.value == "ar") {
                        confirm.require({
                            message: 'هل أنت متأكد أنك تريد حذف هذه المعلومات?',
                            header: 'التأكيد',
                            icon: 'pi pi-exclamation-triangle',
                            acceptLabel: 'نعم',
                            rejectLabel: 'لا',
                            acceptClass: 'p-button-danger',
                            accept: () => {
                                Object.assign(messageData,{email:'',subject:'',content: ''})

                                files.value=[]

                                compose.value=!compos  
                                toast.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تم إلغاء العملية', life: 1000 });
             
                            },
                            reject: () => {
                            }
                        }
                        )
                }
            }
            function setNewMessage(){
                // document.location="http://www.google.com"
                if (!v$.value.$invalid ){
                    const formData = new FormData();
                    // formData.append('email_email',messageData.email.email)
                    // console.log(messageData.email,'ffffffffffffff',typeof messageData.email.emailClient);
                    formData.append('email',typeEmail.value=='clients'?messageData.email.emailClient:messageData.email.email)
                    formData.append('subject',messageData.subject)
                    formData.append('content',messageData.content)
                    formData.append('sender',store.state.user.id)
                    formData.append('reciever',store.state.user.id)
                    if(files.value.length>0){
                        for (var i=0; i<files.value.length; i++){
                            formData.append('files',files.value[i])
                        }
                    }
                    //console.log(formData.values());
                    Object.assign(messageData,{email:'',subject:'',content: ''})
                    v$.value.$reset()
                    files.value=[]
                    compose.value = false
                    api.post('/messages/',formData,{headers: {"Content-Type": "multipart/form-data",}})
                    .then(response=>{
                        toast.add({ severity: 'success', summary: 'success', detail: 'Message envoyer avec succé', life: 1000 });
                        
                    }).catch(error=>{
                    console.log(error)
                    
                    toast.add({ severity: 'error', summary: 'error', detail: error.response.data.message, life: 1000 })})
                }else{
                    submitted.value=true
                }

        }
        function changeSelected(event){
            v$.value.email.$model=typeof event.value==='object'?event.value.emailClient:''
        }
        onBeforeUpdate(() => {
            nameroot.value=router.name
        })
        
        return {
            compose,openComposeDialog,messageContent,setNewMessage,localeLang,nameroot,
            ...toRefs(translateLang),...toRefs(messageData),submitted,v$,confirm,directions,
            filteredClients,search,clients,changeSelected,emailValue,typeEmail,
            UploadImage,niceBytes,imageSizeError,files,removeFileFromFiles,showDetails,cancelCompose
        }
    }

}
</script>

<style>
 .uploading-image{
      max-width: 80px;
      height: 80px;
      display:flex;
    }
    .fileupload {
	width: 100%;
	height: 10px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: 0;
    cursor: pointer;
}
.file-preview{
    float: left;
    width: 100px;
    height: 40px;
    border-radius: 10px;
    background-color: red;
}
</style>