<template>
    <div class="grid">
      <div class="col-12 xl:col-12">
          <div class="card">
              <div class="header"><h1>Utilisateurs</h1></div>
              <Toolbar class="mb-4">
                  <template #start>
                      <Button label="Ajouter" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                  </template>
  
              </Toolbar>
              <Dialog v-model:visible="userDialog" :style="{ width: '600px' }" header="Ajouter un nouveau utilisateur" :modal="true" class="p-fluid">
                      <br/>
                      <div class="formgrid grid">
                          <div class="field col">
                              <span class="p-float-label">
                                  <InputText id="firstname" v-model="firstName" />
                                  <label for="firstname">Fisrtname</label>
                              </span>
                          </div>
  
                          <div class="field col">
                              <span class="p-float-label">
                                  <InputText id="lastname" v-model="lastName" />
                                  <label for="lastname">Lastname</label>
                              </span>
                          </div>
                      </div><br/>
                      <div class="formgrid grid">
                          <div class="field col">
                              <span class="p-float-label">
                                  <InputText id="email" v-model="email" @keydown="validateEmailOnKey(email)" @keyup="validateEmailOnKey(email)" />
                                  <label for="email">E-mail</label>
                              </span>
                              <small v-show="emailError" class="p-error">{{emailError}}</small>
                          </div>
                          <div class="field col ">
                              <span class="p-float-label">
                                  <InputMask  mask="(213) 9-99-99-99-99"  id="mobile" v-model="attributes.mobile" />
                                  <label for="mobile">Téléphone</label>
                              </span>
                          </div>
                          
                      </div><br/>
                      <div class="formgrid grid">
                          <div class="field col">
                              <span class="p-float-label" >
                                  <Dropdown id="wilaya" :filter="true" v-model="wilaya" :options="Wilayas" :optionLabel="localeLang=='ar'?'ar_name':'name'" optionValue="code" @change="getCommuneByWilaya()" />
                                  <label for="wilaya">Wilaya</label>
                              </span>
                          </div>
                          <div class="field col">
                              <span class="p-float-label" >
                                  <Dropdown id="wilaya" :filter="true" v-model="commune" :options="communesByWilaya" :optionLabel="localeLang=='ar'?'commune_name':'commune_name_ascii'" optionValue="id"/>
                                  <label for="wilaya">Commune</label>
                              </span>
                          </div>
                      </div>
                      <div class="formgrid grid">
                          <div class="field col ">
                              <div class="field-checkbox mb-0">
                                  <Checkbox id="verifyEmail" v-model="emailVerified" :binary="true" />
                                  <label for="verifyEmail">Verify Email?</label>
                              </div>
                          </div>
                      </div>
                      <!--<RadioButton name="experience.contrainte" value="Non levés" v-model="product2.contrainte" v-show="false"/>-->
                      <template #footer v-if="validNewUserState">
                          <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="userDialog=false"/>
                          <Button label="Save" icon="pi pi-check" class="p-button-text" @click="addNewUser()"/>
                      </template>
              </Dialog>
              <h5>Liste des utilisateurs</h5>
              <DataTable :value="filterRole?usersFilteredByRole:users" :paginator="true" :rows="10" dataKey="id" :rowHover="true" 
                              v-model:filters="filters1" filterDisplay="menu" :loading="loading1" :filters="filters1" responsiveLayout="scroll"
                              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                              :rowsPerPageOptions="[10,25,50]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" :globalFilterFields="['username','firstName','lastName','email']" 
                              >
                  <template #header>
                      <div class="flex justify-content-between flex-column sm:flex-row">
                          <div>
                              <Button type="button" icon="pi pi-filter-slash" label="Vider" class="p-button-outlined mb-2" @click="clearFilter1()"/>&nbsp;
                              <Dropdown class="p-button-outlined mb-2" v-model="filterRole" :options="[...allRealmRoles,{name:'Withou Role'}]" optionLabel="name" optionValue="name" placeholder="Filtrer par rôle" @change="getUsersByRole()"/>
                          </div>
                          <span class="p-input-icon-left mb-2">
                              <i class="pi pi-search" />
                              <InputText v-model="filters1['global'].value" placeholder="Rechercher ..." style="width: 100%"/>
                          </span>
                      </div>
                   </template>
                  <Column field="username" header="Nom utilisateur" :sortable="true" style="width:8%">
                      <template #body="{data}">
                          {{data.username}}
                      </template>
                      <template #filter="{filterModel}">
                          <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                      </template>
                  </Column>
                  <Column field="firstName" header="nom" :sortable="true" style="width:8%">
                      <template #body="{data}">
                          {{data.firstName}}
                      </template>
                      <template #filter="{filterModel}">
                          <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                      </template>
                  </Column>
                  <Column field="lastName" header="prénom" :sortable="true" style="width:8%">
                      <template #body="{data}">
                          {{data.lastName}}
                      </template>
                      <template #filter="{filterModel}">
                          <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                      </template>
                  </Column>
                  <Column style="width:10%" field="email">
                      <template #header>
                          Email
                      </template>
                      <template #body="{data}">
                          <template v-if="data">
                              {{data.email}}
                          </template>
                          <template v-else>Null</template>
                      </template>
                      <template #filter="{filterModel}">
                          <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                      </template>
                  </Column>
                  <Column style="width:10%" field="createdTimestamp" :sortable="true">
                      <template #header>
                          Created At
                      </template>
                      <template #body="{data}">
                          <template v-if="data">
                              {{new Date(data.createdTimestamp).toLocaleDateString( localeLang=='ar'?'ar-DZ':localeLang=='fr'?'fr-FR':'en-US',{ weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })}}
                          </template>
                          <template v-else>Null</template>
                      </template>
                      <template #filter="{filterModel}">
                          <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Recherche par nom"/>
                      </template>
                  </Column>
                  <Column style="width:1.5%">
                      <template #header>
                          Actions
                      </template>
                      <template #body="slotProps" v-if="users">
                          <span class="">
                              <SplitButton style="direction:ltr" @click="openUserRole(slotProps.data.id)" label="Détails" icon="pi pi-user-edit" :model="[(slotProps.data.enabled)?{label: 'Bloquer',icon:'pi pi-lock',command: ()=>{lockUser(slotProps.data.id)}}:{label: 'débloquer',icon:'pi pi-lock-open',command: ()=>{unLockUser(slotProps.data.id)}},{label: 'attribuer mots de passe',icon:'pi pi-key',command: ()=>{changePasswordUser(slotProps.data.id)}},{label: 'Supprimer',icon:'pi pi-trash',command: ()=>{deleteUser(slotProps.data.id)}}]" class="p-button-outlined p-button-secondary mb-2"></SplitButton>
                              
                          </span>
                      </template>
                  </Column>
              </DataTable>
              <Dialog v-model:visible="userPasswordDialog" :style="{ width: '450px' }" header="Set user password" :modal="true" class="p-fluid">
                      <br/>
                      <div class="field col-12">
                          <span class="p-float-label">
                              <Password id="password" v-model="newPassword" toggleMask @keyup="checkPasswordOnKey(newPassword,8)" @keydown="checkPasswordOnKey(newPassword,8)"></Password>
                              <label for="password">Nouveau mots de passe</label>
                          </span>
                          <small v-show="!validLengthPasswordState && lengthError" class="p-error">{{lengthError}}</small>
                      </div>
                      <div class="field col-12">
                          <span class="p-float-label">
                              <Password id="passwordConfirm" v-model="confirmPassword" toggleMask @keyup="checkTowPasswordValid(newPassword,confirmPassword)" @keydown="checkTowPasswordValid(newPassword,confirmPassword)"></Password>
                              <label for="passwordConfirm">Confirmer le mots de passe</label>
                          </span>
                          <small v-show="!validPasswordState && matchError" class="p-error">{{matchError}}</small>
                      </div>
                      <div class="field col-12">
                          <div class="field-checkbox mb-0">
                              <Checkbox id="binary" v-model="temporaryPassword" :binary="true" />
                              <label for="binary">Temporare</label>
                          </div>
                      </div>
                      <template #footer v-if="validPasswordState">
                          <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="userPasswordDialog=false"/>
                          <Button label="Save" icon="pi pi-check" class="p-button-text" @click="updatePasswordUser()" />
                      </template>
              </Dialog>
              <Dialog v-model:visible="userRoleDialog" :style="{ width: '650px' }" header="détails sur l'utilisateur" :modal="true" class="p-fluid">
                  <br/>
                      <div class="formgrid grid">
                          <div class="field col">
                              <span class="p-label">
                                  <label for="firstnameDetail">Nom</label>
                                  <InputText style="border:none"  id="firstnameDetail" :value="userDetail.firstName" :disabled="true"/>
                              </span>
                          </div>
  
                          <div class="field col">
                              <span class="p-label">
                                  <label for="lastnameDetail">Prénom</label>
                                  <InputText style="border:none"  id="lastnameDetail" :value="userDetail.lastName"  :disabled="true"/>
                              </span>
                          </div>
                      </div>
                      <div class="formgrid grid">
                          <div class="field col">
                                  <span class="p-label">
                                      <label for="usernameDetail">Nom d'utilisateur</label>
                                      <InputText  style="border:none"  id="usernameDetail" :value="userDetail.username" :disabled="true"/>
                                  </span>
                          </div>
                          <div class="field col">
                                  <span class="p-label">
                                      <label for="emailDetail">Email</label>
                                      <InputText style="border:none"  id="emailDetail" :value="userDetail.email" :disabled="true"/>
                                  </span>
                          </div>
                      </div>
                      <div class="formgrid grid">
                          <div class="field col" v-if="userDetail.attributes.mobile">
                                  <span class="p-label">
                                      <label for="mobileDetail">Mobile</label>
                                      <InputText style="border:none"  id="mobileDetail" :value="userDetail.attributes.mobile" :disabled="true"/>
                                  </span>
                          </div>
                          <div class="field col" v-if="userDetail.attributes.address">
                                  <span class="p-label">
                                      <label for="addressDetail">Adresse</label>
                                      <InputText style="border:none"  v-if="localeLang=='ar'" id="addressDetail" :value="JSON.parse(userDetail.attributes.address).commune_name+' '+JSON.parse(userDetail.attributes.address).daira_name+' '+JSON.parse(userDetail.attributes.address).wilaya_name" :disabled="true"/>
                                      <InputText style="border:none" v-else id="addressDetail" :value="JSON.parse(userDetail.attributes.address).commune_name_ascii+' '+JSON.parse(userDetail.attributes.address).daira_name_ascii+' '+JSON.parse(userDetail.attributes.address).wilaya_name_ascii" :disabled="true"/>
                                  </span>
                          </div>
                      </div>
                      <div class="field col">
                              <span class="p-label" v-if="roleUser.length">
                                  <label for="role">Role</label>
                                  <h5 v-for="role in roleUser" :key="role.id">{{role.name}}</h5>
                              </span>
                              <span class="p-float-label"  v-else>
                                  <Dropdown id="roleDetail" v-model="role" :options="allRealmRoles" optionLabel="name" optionValue="name" />
                                  <label for="roleDetail">Rôle</label>
                              </span>
                              
                          </div>
                      <template #footer v-if="!roleUser.length">
                          <Button label="Annuler" icon="pi pi-times" class="p-button-text" @click="userRoleDialog=false"/>
                          <Button label="Enregester" icon="pi pi-check" class="p-button-text" @click="setUserRole()" />
                      </template>
              </Dialog>
              <Toast />
              <ConfirmDialog></ConfirmDialog>
          </div>
      </div>
    </div>
  </template>
  
  <script>
  import {FilterMatchMode,FilterOperator} from 'primevue/api';
  import { ref, reactive, toRefs} from 'vue';
  import {useStore} from 'vuex';
  import api from '../api';
  import { useToast } from "primevue/usetoast";
  import { useConfirm } from "primevue/useconfirm";
  import { useRouter } from 'vue-router';
  import Wilayas from '../../public/data/algeria/wilaya.json'
  import Algeria from '../../public/data/algeria/algeria_cities.json'
  export default {
      name: "users",
      props: {roles: {type: Array, default:[]}},
      setup(props){
           const address = reactive({wilaya:null,commune:null})
           const communesByWilaya = ref([])
           const windowSize = ref(window.innerWidth)
           const confirm = useConfirm();
           const toast = useToast();
           const store = useStore()
           const userDialog = ref(false)
           const userPasswordDialog = ref(false)
           const userRoleDialog = ref(false)
           const userUpdatePassword = reactive({userID: null,newPassword:'',confirmPassword:'',temporaryPassword:false})
           const validPasswordState= ref(true)
           const validLengthPasswordState = ref(true)
           const errorMessage = reactive({lengthError:'',matchError:''})
           const errorMessageNewUser = reactive({emailError:''})
           const router = useRouter()
           const users = ref([])
           const usersFilteredByRole = ref([])
           const usersByRole=ref({})
           const userDetail = ref({})
           const roleUser = ref([])
           const validNewUserState= ref(true)
           const allRealmRoles = ref([])
           const realmRole = reactive({role:'',userID:''})
           const filterRole=ref('')
           const newUserData=reactive({
                username:'',
                firstName:'',
                lastName:'',
                email:'',
                enabled:true,
                emailVerified:false,
                access: {
                    manageGroupMembership: true,
                    view: true,
                    mapRoles: true,
                    impersonate: true,
                    manage: true
                },
                attributes:{mobile:'',address:{}},
                realmRoles:[],
            })
           const localeLang = ref(localStorage.getItem('localeLang'))
           //Table Filter
           const filters1 = ref(null)
           const loading1 = ref(true)
           function getCookie(cname) {
                  let name = cname + "=";
                  let decodedCookie = decodeURIComponent(document.cookie);
                  let ca = decodedCookie.split(';');
                  for(let i = 0; i <ca.length; i++) {
                      let c = ca[i];
                      while (c.charAt(0) == ' ') {
                      c = c.substring(1);
                      }
                      if (c.indexOf(name) == 0) {
                      return c.substring(name.length, c.length);
                      }
                  }
                  return "";
              }
          function getCommuneByWilaya(){
              communesByWilaya.value = Algeria.filter(commune=>commune.wilaya_code==address.wilaya)
              communesByWilaya.value.sort((a,b)=>{return a.id>b.id})
              console.log(communesByWilaya);
          }
          function getAllUsersByRole(){
              let usersHasRole=[]
              props.roles.forEach((role)=>{
                console.log(role,"kkkkkkkkkkkkk",store.state.endpoints.login+'admin/realms/'+process.env.VUE_APP_SSO_REALM+'/roles/'+role+'/users');
                api.get(store.state.endpoints.login+'admin/realms/'+process.env.VUE_APP_SSO_REALM+'/roles/'+role+'/users')
              .then((response)=>{
                console.log(response.data,'""""""""""');
                  usersHasRole = response.data.filter( user => user.id !==  store.state.user.id);
                  usersByRole.value[role]= [...usersHasRole]
                //   console.log(usersByRole.value,"zzzzzzzzzzz");
                  usersByRole.value[role].sort((a,b)=>{return a.createdTimestamp<b.createdTimestamp})
                  loading1.value=false;
                  
              }).catch((error)=>{console.log(error);})
              })
  
          }
          getAllUsersByRole()
          function getAllUsers(){
              api.get(store.state.endpoints.login+'admin/realms/'+process.env.VUE_APP_SSO_REALM+'/users')
              .then((response)=>{
                  users.value = response.data.filter( user => user.id !==  store.state.user.id);
                  users.value.sort((a,b)=>{return a.createdTimestamp<b.createdTimestamp})
                  loading1.value=false;
              }).catch((error)=>{console.log(error);})
          }
          function initFilters1() {
                  filters1.value = {
                      'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                      'username': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
                      'firstName': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
                      'lastName': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
                      'email': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]}
                  }
          }
          function clearFilter1() {
              loading1.value=true;
              initFilters1();
              filterRole.value = ''
              loading1.value=false;
  
          }
           //const overlayMenuItems= ref()
           function openNew() {
  
              userDialog.value = true;
          }
          
          function getUserDetail(id){
              userDetail.value = users.value.find(user=>user.id==id)
          }
          function getUsersByRole(){
              loading1.value=true;
              usersFilteredByRole.value=[]
              if (filterRole.value==='Withou Role'){
                  let arr = Object.values(usersByRole.value)
                  let ar = []
                  for (const a in arr){
                      ar.push(...arr[a]);
                  }
                  users.value.forEach((user)=>{
                      if(!ar.find(a=>a.id==user.id)){
                          usersFilteredByRole.value.push(user)
                      }
                  })
  
              }else{
  
                  usersFilteredByRole.value = usersByRole.value[filterRole.value]
              }
              loading1.value=false;
  
          }
          getAllUsers()
          initFilters1()
          // Get All Realm Roles from SSO
          function getAllRealmRoles(){
              api.get(store.state.endpoints.login+'admin/realms/'+process.env.VUE_APP_SSO_REALM+'/roles')
              .then((response)=>{
                  allRealmRoles.value = response.data.filter( role => props.roles.includes(role.name));
                  //allRealmRoles.value.push({name:'Withou Role'})
              }).catch((error)=>{console.log(error);})
          }
          // Verify email format
          const validateEmail = (email) => {
              return String(email)
                  .toLowerCase()
                  .match(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
                  )?true:false
          };
          const validateEmailOnKey=(email)=>{
              if(validateEmail(email)){ errorMessageNewUser.emailError='';validNewUserState.value=true}else{ errorMessageNewUser.emailError='Invalid email';validNewUserState.value=false}
          }
          // Call Get All Realm Roles from SSO
          getAllRealmRoles()
          // Add new user
          function addNewUser(){
              newUserData.username=newUserData.firstName+'_'+Math.floor(Math.random()*10000)
              newUserData.attributes.address=JSON.stringify(Algeria.find(commune=>commune.id==address.commune))
              if (validateEmail(newUserData.email)){
                  errorMessageNewUser.emailError=''
                  validNewUserState.value=true
              api.post(store.state.endpoints.login+'admin/realms/'+process.env.VUE_APP_SSO_REALM+'/users',newUserData)
              .then(()=>{
                  toast.add({severity:'success', summary: 'Successful', detail: 'user created Successfully', life: 1000});
                  setTimeout(()=>{
                      filterRole.value=''
                      usersFilteredByRole.value=[]
                      usersByRole.value=[]
                      getAllUsers()
                      getAllUsersByRole()
                      userDialog.value=false
  
                  },500)
              }).catch((error)=>{
                  toast.add({severity:'error', summary: 'Error', detail: 'unable to create new user : '+error.message+' :\n'+error.response.data.errorMessage, life: 2000});
                  })
  
              }else{
                  errorMessageNewUser.emailError='Invalid email'
                  validNewUserState.value=false
              }
          }
          function getUserByRole(id){
              api.get(store.state.endpoints.login+'admin/realms/'+process.env.VUE_APP_SSO_REALM+'/users/'+id+'/role-mappings/realm/composite')
              .then((response)=>{
                  roleUser.value = response.data.filter( role => props.roles.includes(role.name))
              }).catch((error)=>{console.log(error);})
          }
          function openUserRole(id){
              userRoleDialog.value=true
              getUserDetail(id)
              getUserByRole(id)
              realmRole.userID = id
          }
          function setUserRole(){
              const idRole = allRealmRoles.value.find(role=>role.name==realmRole.role)
              api.post(store.state.endpoints.login+'admin/realms/'+process.env.VUE_APP_SSO_REALM+'/users/'+realmRole.userID+'/role-mappings/realm',
              [{id:idRole.id,name:realmRole.role,containerId:process.env.VUE_APP_SSO_REALM}])
              .then((response)=>{
                  //users.value = response.data
                  console.log(response.data);
                  toast.add({severity:'success', summary: 'Successful', detail: 'Set role to user Successfully ', life: 1000});
                  setTimeout(()=>{
                      filterRole.value=''
                      usersFilteredByRole.value=[]
                      usersByRole.value=[]
                      getAllUsers()
                      getAllUsersByRole()
                      userRoleDialog.value=false
                  },500)
              }).catch((error)=>{
                  toast.add({severity:'error', summary: 'Error', detail: 'unable to set role to user: '+error.message, life: 1000});
              })
          }
          // Disable user
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
                          toast.add({severity:'error', summary: 'Error', detail: 'unable set new user password: '+error.message+' : \n'+error.response.data.errorMessage, life: 2000});
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
              localeLang,
              windowSize,
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
              ...toRefs(errorMessage),
              filters1,
              loading1,
              clearFilter1,
              ...toRefs(newUserData),
              allRealmRoles,
              ...toRefs(realmRole),
              Wilayas,
              Algeria,
              ...toRefs(address),
              getCommuneByWilaya,
              communesByWilaya,
              addNewUser,
              ...toRefs(errorMessageNewUser),
              validateEmailOnKey,
              validNewUserState,
              userRoleDialog,
              openUserRole,
              setUserRole,
              roleUser,
              userDetail,
              getUsersByRole,
              usersFilteredByRole,
              filterRole,
  
           }
      }
  }
  </script>
  
  <style lang="scss" scoped>
  ::v-deep(.speeddial-linear-demo) {
      .p-speeddial-direction-up {
          left: calc(50% - 2rem);
          bottom: 0;
      }
  
      .p-speeddial-direction-left {
          right: 0;
          top: calc(50% - 2rem);
      }
  }
  
  </style>    
  