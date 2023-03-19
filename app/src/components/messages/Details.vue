<template>
    
        <div class="card">
            <div class="flex align-items-center justify-content-between mb-4">
                <h5 class="card-title">Message Details</h5>
                <div>
                </div>
            </div>
            <!-- <router-view name="msgdetails"/> -->
            
            <template v-if="message.id">

                <div class="field col">
                    <Chip class="p-2 mr-2 mb-2">{{ new Date(message.send_at).toLocaleString() }}</Chip><br />
                </div>
                <div class="field col">
                    <h3>Subject: {{ message.subject }}</h3>
                </div>

                <div class="field col" style="overflow: auto;">
                    <h4>Message</h4>
                    <span class="text-800 text-2xl line-height-3 mr-0 md:mr-2" v-html="message.content"></span>
                </div>

                <div class="field col">
                    <Chip v-for="file in files" :key="file.id" class="mb-2 mr-1"
                        style="cursor:pointer; padding:10px">
                        <i
                            :class="file.type == '.xls' ? 'pi pi-file-excel' : file.type == '.pdf' ? 'pi pi-file-pdf' : 'pi pi-file'"></i>&nbsp;
                        <p class="mt-3 mr-1">{{ file.name + ' ' + niceBytes(file.size) }}&nbsp;&nbsp;</p>
                        <i class="pi pi-download" @click="downloadFile(file.path)"
                            v-tooltip.right="'Click to download'"></i>
                    </Chip>
                </div>
                <div class="field col">
                    <Button v-if="message.reciever == $store.state.user.id" icon="pi pi-replay" label="Reply"
                        class="p-button-outlined mr-2 mb-2" @click="openComposeDialog(compose)" />
                </div>
                <div v-show="compose">
                    <div class="field col">
                        <Editor v-model="v$.content.$model" editorStyle="height: 320px"
                            :class="{ 'p-invalid': (v$.content.$invalid && submitted) }">
                            <template v-slot:toolbar>
                                <span class="ql-formats">
                                    <button class="ql-header" v-tooltip.bottom="'Headers'">Headers </button>
                                </span>&nbsp;
                                <span class="ql-formats">
                                    <button class="ql-bold" v-tooltip.bottom="'Bold'"></button>
                                    <button class="ql-italic" v-tooltip.bottom="'Italic'"></button>
                                    <button class="ql-underline" v-tooltip.bottom="'Underline'"></button>
                                    <button class="ql-list" value="ordered"
                                        v-tooltip.bottom="'Order List'"></button>
                                    <button class="ql-list" value="bullet"
                                        v-tooltip.bottom="'Unorder List'"></button>
                                    <button class="ql-align ql-picker ql-icon-picker"
                                        v-tooltip.bottom="'Adjust'"></button>
                                    <button class="ql-link" v-tooltip.bottom="'Link'"></button>
                                </span>
                            </template>
                        </Editor>
                        <small v-if="(v$.content.$invalid && submitted) || v$.content.$pending.$response"
                            class="p-error">{{ v$.content.required.$message.replace('Value', 'Content') }}</small>
                    </div>
                    <div class="field col-12 md:col-3">
                        <span class="p-label p-button p-component p-button-outlined p-button-secondary mr-2 "
                            draggable="true">
                            <input class="fileupload" :type="'file'" name="filesreplay[]"
                                accept="image/*,.pdf,.doc,.docx,.xls" id="filesreplay" @change="UploadImage($event)"
                                draggable="true" multiple />
                            <label for="filesreplay" style="display: block; cursor: pointer"><i
                                    class="pi pi-fw pi-paperclip"></i>Attachements</label>
                        </span>
                    </div>
                    <div class="field col">
                        <Message v-if="imageSizeError" for="logo" severity="error">{{ imageSizeError }}</Message>
                        <Chip v-for="previewImage, index in filesreplay" :key="index" class="mb-2 mr-1"
                            style="cursor:pointer; padding:10px" v-tooltip:bottom="'Click to remove'">
                            <i
                                :class="previewImage.type.split('/')[0] == 'image' ? 'pi pi-image' : previewImage.type.split('/')[1] == 'vnd.ms-excel' ? 'pi pi-file-excel' : previewImage.type.split('/')[1] == 'pdf' ? 'pi pi-file-pdf' : 'pi pi-file'"></i>&nbsp;
                            {{ previewImage.name.substring(0, 3) + '...' + ' ' + niceBytes(previewImage.size) }}
                            &nbsp;&nbsp;
                            <i class="pi pi-times-circle" @click="removeFileFromFiles(index)"></i>
                        </Chip>
                    </div>
                    <Button icon="pi pi-send" label="Sent"
                        class="w-75 p-3 p-label p-button p-component p-button-outlined mr-2"
                        @click="setNewMessage()" />
                </div>

            </template>

            <template v-else>
                <h1>Not message selected</h1>
            </template>
            

        </div>
    

</template>

<script>
import { email, required, minLength, maxLength, alpha } from "@vuelidate/validators";

import { useRoute, onBeforeRouteUpdate, onBeforeRouteLeave,beforeRouteEnter } from 'vue-router'
import { ref, reactive, toRefs, onMounted, inject,onBeforeMount} from 'vue'
import { useVuelidate } from "@vuelidate/core";
import { useStore } from 'vuex'
import api from '../../api'
export default {
    name: 'DetailsMessage',

    setup() {
        const store = useStore()
        const route = useRoute()
        const message = ref({})
        const files = ref([])
        const filesreplay = ref([])
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
        const translateLang = reactive((localeLang.value == 'ar') ? translate.ar : (localeLang.value == 'fr') ? translate.fr : translate.en)
        //console.log(route.matched[2].name=='inbox'?'inbox api':'sent api');
        // const id = ref(route.params.id)
        //console.log(route.params);

        function getMessageByID(messageID) {
            if (messageID !== undefined) {
                api.get('/messages/' + messageID + '/')
                    .then(response => {
                        message.value = response.data
                    }).catch(error => console.log(error))
            }
        }
        const listInboxMessages=ref()
        function setMessageReplay(messageID) {
            api.put('/messages/' + messageID + '/set_replay/')
                .then(response => {
                    let index = listInboxMessages.value.findIndex((msg) => msg.id === messageID)
                    listInboxMessages.value[index] = response.data
                }).catch(error => {
                    console.log(error);
                })
        }
        const rules = {
            // subject: { required, minLength: minLength(4), maxLength: maxLength(100) },
            content: { required, minLength: minLength(4), },

        }
        const messageData = reactive({
            // subject: '', 
            content: ''
        })
        const submitted = ref(false)

        const v$ = useVuelidate(rules, messageData)

        const compose = ref(false)
        function openComposeDialog(compos) {
            compose.value = !compos
        }

        function getFilesByMessageID(messageID) {
            if (messageID !== undefined) {
                api.get('/files/?message=' + messageID)
                    .then(response => {
                        files.value = response.data.results
                    }).catch(error => console.log(error))
            }
        }
        onBeforeRouteUpdate((to, from) => {
            //console.log(to);
            
            getMessageByID(to.params.id)
            getFilesByMessageID(to.params.id)
            

        })
        onBeforeRouteLeave((to, from) => {
            message.value = {}
            
            
        })
      
        getMessageByID(route.params.id)
        getFilesByMessageID(route.params.id)
        function niceBytes(x) {
            const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            let l = 0, n = parseInt(x, 10) || 0;
            while (n >= 1024 && ++l) {
                n = n / 1024;
            }
            return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
        }
        const previewFile = ref(false)
        function downloadFile(path) {
            window.open(path, '_blank')
        }
        function UploadImage(e){
            if(e.target.files[0].size > 1024000){
                imageSizeError.value = 'Image Size is too big, please provide a logo less thent 200 KB'
            }else{
                for (var i=0; i<e.target.files.length; i++){
                    filesreplay.value.push(e.target.files[i])
                }

            }}
        function removeFileFromFiles(index){
            filesreplay.value.splice(index,1)
                //for (vr i=0; iz)
            }
        function setNewMessage() {
            if (!v$.value.$invalid) {
                const formData = new FormData();

                formData.append('subject', "Re:" + message.value.subject)
                formData.append('content', messageData.content)
                formData.append('sender', store.state.user.id)
                formData.append('reciever', '0fdfa59a-623c-4d8c-94a9-f459312255b2')
                if (files.value.length > 0) {
                    for (var i = 0; i < files.value.length; i++) {
                        formData.append('files', files.value[i])
                    }
                    formData.append('has_Attchement', true)
                }
                if (filesreplay.value.length > 0) {
                    for (var i = 0; i < filesreplay.value.length; i++) {
                        formData.append('files', filesreplay.value[i])
                    }
                    formData.append('has_Attchement', true)
                }
                // setMessageReplay(message.value.id)
                //console.log(formData.values());
                api.post('/messages/', formData, { headers: { "Content-Type": "multipart/form-data", } })
                    .then(response => {
                        Object.assign(messageData, { subject: '', content: '' })
                        files.value = []
                        filesreplay.value=[]
                        compose.value = false
                    }).catch(error => console.log(error))
            } else {
                submitted.value = true
            }
        }
        

        //console.log(moment('2022-10-19T13:48:20.744479Z'.slice(0,10)+' '+'2022-10-19T13:48:20.744479Z'.slice(11,16),'YYYY-MM-DD hh:mm:ss').fromNow());
        return {
            message,UploadImage,removeFileFromFiles,listInboxMessages, files,filesreplay, niceBytes, downloadFile, setNewMessage, openComposeDialog, v$, ...toRefs(messageData), ...toRefs(translateLang), compose, submitted
        }
    }

}
</script>

<style>

</style>