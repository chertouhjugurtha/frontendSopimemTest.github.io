<template>
  <div class="grid">
    <div class="col-12 xl:col-12">
		<div class="card">
            <div class="header"><h1>Users</h1></div>
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Add" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                </template>

            </Toolbar>
            <Dialog v-model:visible="userDialog" :style="{ width: '450px' }" header="Add new user" :modal="true" class="p-fluid">
                    <br/>
                    <div class="field col-12">
                        <span class="p-float-label">
                            <InputText id="name"/>
                            <label for="name">Usersname</label>
                        </span>
                    </div>
                    <div class="field col-12">
                        <span class="p-float-label">
                            <InputText id="prenom"  />
                            <label for="prenom">Fisrtname</label>
                        </span>
                    </div>

                    <div class="field col-12">
                        <span class="p-float-label">
                            <InputText id="func" />
                            <label for="func">Lastname</label>
                        </span>
                    </div>
                    <div class="field col-12 ">
                        <span class="p-float-label">
                            <InputText id="email" />
                            <label for="email">E-mail</label>
                        </span>
                    </div> 
                    <div class="field col-12 ">
                        <span class="p-float-label">
                            <InputMask  mask="(213) 9-99-99-99-99"  id="tele" />
                            <label for="tele">téléphone</label>
                        </span>
                    </div>
                    <!--<RadioButton name="experience.contrainte" value="Non levés" v-model="product2.contrainte" v-show="false"/>-->
                    <template #footer>
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="addGerant" />
                    </template>
            </Dialog>
			<h5>List of users</h5>
			<DataTable :value="users" :rows="5" :paginator="true" responsiveLayout="scroll">
                <Column field="username" header="Username" :sortable="true" style="width:10%"></Column>
				<Column field="firstName" header="Firstname" :sortable="true" style="width:10%"></Column>
				<Column field="lastName" header="Lastname" :sortable="true" style="width:10%"></Column>
                <Column style="width:20%" field="id">
					<template #header>
						Email
					</template>
					<template #body="slotProps">
                        <template v-if="slotProps.data">
                            {{slotProps.data.email}}
                        </template>
                        <template v-else>Null</template>
					</template>
				</Column>
				<Column style="width:20%">
					<template #header>
						Actions
					</template>
					<template #body="slotProps" v-if="users">
                        <span class="p-buttonset">
                            
                            <Button v-if="slotProps.data.enabled" label="Lock" class="p-button-warning" icon="pi pi-lock" @click="lockUser(slotProps.data.id)" />
                            <Button v-else label="Unlock" class="p-button-secondary" icon="pi pi-lock-open" @click="unLockUser(slotProps.data.id)" />
                            <Button label="Set password"  icon="pi pi-key" @click="changePasswordUser(slotProps.data.id)" />
                            <Button label="Delete" class="p-button-danger" icon="pi pi-trash" @click="deleteUser(slotProps.data.id)" />
                        </span>
					</template>
				</Column>
			</DataTable>
            <Dialog v-model:visible="userPasswordDialog" :style="{ width: '450px' }" header="Set user password" :modal="true" class="p-fluid">
                    <br/>
                    <div class="field col-12">
                        <span class="p-float-label">
                            <Password id="name" v-model="newPassword" toggleMask @keyup="checkPasswordOnKey(newPassword,8)" @keydown="checkPasswordOnKey(newPassword,8)"></Password>
                            <label for="name">New password</label>
                        </span>
                        <small v-show="!validLengthPasswordState && lengthError" class="p-error">{{lengthError}}</small>
                    </div>
                    <div class="field col-12">
                        <span class="p-float-label">
                            <Password id="prenom" v-model="confirmPassword" toggleMask @keyup="checkTowPasswordValid(newPassword,confirmPassword)" @keydown="checkTowPasswordValid(newPassword,confirmPassword)"></Password>
                            <label for="prenom">Confirm password</label>
                        </span>
                        <small v-show="!validPasswordState && matchError" class="p-error">{{matchError}}</small>
                    </div>
                    <div class="field col-12">
                        <div class="field-checkbox mb-0">
                            <Checkbox id="binary" v-model="temporaryPassword" :binary="true" />
                            <label for="binary">Temporary</label>
                        </div>
                    </div>
                    <template #footer v-if="validPasswordState">
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="updatePasswordUser()" />
                    </template>
            </Dialog>
            <Toast />
			<ConfirmDialog></ConfirmDialog>
		</div>
	</div>
  </div>
</template>

<script>
import { ref, reactive, toRefs} from 'vue';
import {useStore} from 'vuex';
import api from '../api';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useRouter } from 'vue-router';
export default {
    name: "users",
    setup(){
         const confirm = useConfirm();
		 const toast = useToast();
         const store = useStore()
         const userDialog = ref(false)
         const userPasswordDialog = ref(false)
         const userUpdatePassword = reactive({userID: null,newPassword:'',confirmPassword:'',temporaryPassword:false})
         const validPasswordState= ref(true)
         const validLengthPasswordState = ref(true)
         const errorMessage = reactive({lengthError:'',matchError:''})
         const router = useRouter()
         const users = ref([])
         function openNew() {

            userDialog.value = true;
        }
        //console.log(store.state.user.accessToken);
        function getAllUsers(){
            api.get(store.state.endpoints.login+'admin/realms/'+process.env.VUE_APP_SSO_REALM+'/users')
            .then((response)=>{
                users.value = response.data.filter( user => user.id !==  store.state.user.id);
                console.log(response.data);
            }).catch((error)=>{console.log(error);})
        }
        getAllUsers()
        function disableUser(id){
            //console.log('id from disable = '+id);
            api.put(store.state.endpoints.login+'admin/realms/'+process.env.VUE_APP_SSO_REALM+'/users/'+id,{"enabled": false})
            .then((response)=>{
                //users.value = response.data
                console.log(response.data);
			    toast.add({severity:'success', summary: 'Successful', detail: 'user profile locked', life: 1000});
                setTimeout(()=>{
                    router.go()
                },500)
            }).catch((error)=>{
                toast.add({severity:'error', summary: 'Error', detail: 'unable to lock user profile: '+error.message, life: 1000});
            })
		}
        function lockUser(id){
            confirm.require({
                message: 'Are you sure you want to lock this user?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'p-button-warning',
                accept: () => {
                    disableUser(id)
                },
                reject: () => {
                    toast.add({severity:'success', summary: 'Successful', detail: 'Lock user canceled', life: 1000});
                }
            })
        }
        function enableUser(id){
            api.put(store.state.endpoints.login+'admin/realms/'+process.env.VUE_APP_SSO_REALM+'/users/'+id,{"enabled": true})
            .then((response)=>{
                //users.value = response.data
			    toast.add({severity:'success', summary: 'Successful', detail: 'user profile unlocked', life: 1000});
                setTimeout(()=>{
                    router.go()
                },500)
            }).catch((error)=>{
                toast.add({severity:'error', summary: 'Error', detail: 'unable to unlock user profile: '+error.message, life: 1000});
            })
        }
        function unLockUser(id){
            confirm.require({
                message: 'Are you sure you want to unlock this user?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'p-button-warning',
                accept: () => {
                    enableUser(id)
                },
                reject: () => {
                toast.add({severity:'success', summary: 'Successful', detail: 'unlock user canceled', life: 1000});
                }
            })
        }
        function removeUser(id){
            api.delete(store.state.endpoints.login+'admin/realms/'+process.env.VUE_APP_SSO_REALM+'/users/'+id)
            .then((response)=>{
                //users.value = response.data
                console.log(response.data);
			    toast.add({severity:'success', summary: 'Successful', detail: 'user deleted', life: 1000});
                setTimeout(()=>{
                    router.go()
                },500)
            }).catch((error)=>{
                toast.add({severity:'error', summary: 'Error', detail: 'user undeleted: '+error.message, life: 1000});
            })
        }
        function deleteUser(id){
            confirm.require({
                message: 'Are you sure you want to delete this user?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    console.log('id from lockUser accept = '+id);
                    removeUser(id)
                },
                reject: () => {
                    toast.add({severity:'success', summary: 'Successful', detail: 'Delete user canceled', life: 1000});
                }
            })
        }
        function changePasswordUser(id){
            userPasswordDialog.value = true
            userUpdatePassword.userID=id
            console.log('id user= '+userUpdatePassword.userID);
        }
        function checkMatchedPasswords(newPassword,confirmPassword){
            return newPassword==confirmPassword?true:false
        }
        function  checkTowPasswordValid(newPassword,confirmPassword){
            if (checkMatchedPasswords(newPassword,confirmPassword)){
                validPasswordState.value=true
                errorMessage.matchError = ''
            }else{
                validPasswordState.value=false
                errorMessage.matchError = 'Unmatch passwords'
            }
        }
        function checkPasswordLength(password,len){
            return password.length>=len?true:false
        }
        function checkPasswordOnKey(password,len){
            if (checkPasswordLength(password,len)){
                 validLengthPasswordState.value=true
                errorMessage.lengthError = ''
            }else{
                validLengthPasswordState.value=false
                errorMessage.lengthError = 'Length passwrod must be more than 8 characters'
            }
        }
        function updatePasswordUser(){
            console.log('update password');
            if(checkMatchedPasswords(userUpdatePassword.newPassword,userUpdatePassword.confirmPassword)){
                if (checkPasswordLength(userUpdatePassword.newPassword,8)){

                    let userPasswordData = {type:"password",value:userUpdatePassword.newPassword, temporary: userUpdatePassword.temporaryPassword}
                    console.log(userPasswordData);
                    api.put(store.state.endpoints.login+'admin/realms/'+process.env.VUE_APP_SSO_REALM+'/users/'+userUpdatePassword.userID+'/reset-password',userPasswordData)
                    .then((response)=>{
                        //users.value = response.data
                        console.log(response.data);
                        toast.add({severity:'success', summary: 'Successful', detail: 'user password updated', life: 2000});
                        setTimeout(()=>{
                            router.go()
                        },500)
                    }).catch((error)=>{
                        console.log(error);
                        toast.add({severity:'error', summary: 'Error', detail: 'unable set new user password: '+error.message+' : \n'+error.response.data.error, life: 2000});
                    })
                   validLengthPasswordState.value=true
                   errorMessage.lengthError = ''
                }else{
                    validLengthPasswordState.value=false
                   errorMessage.lengthError = 'Length passwrod must be more than 8 characters'
                }
            }else{
                validPasswordState.value=false
                errorMessage.matchError = 'Unmatch passwords'
            }
        }
         return {
            userDialog,
            userPasswordDialog,
            openNew,
            users,
            lockUser,
            unLockUser,
            deleteUser,
            changePasswordUser,
            ...toRefs(userUpdatePassword),
            updatePasswordUser,
            checkTowPasswordValid,
            checkPasswordOnKey,
            validPasswordState,validLengthPasswordState,
            ...toRefs(errorMessage)

         }
    }
}
</script>

<style>

</style>