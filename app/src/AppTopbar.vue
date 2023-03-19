<template>
	<div class="layout-topbar">
		<router-link to="/" class="layout-topbar-logo">
			<img alt="Logo" :src="topbarImage()" />
			
		</router-link>
		<button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
			<i class="pi pi-bars"></i>
		</button>

		<button class="p-link layout-topbar-menu-button layout-topbar-button"
			v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', 
			leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
			<i class="pi pi-ellipsis-v"></i>
		</button>
		<ul class="layout-topbar-menu hidden lg:flex origin-top">
			<li  >
				<i class="pi pi-bell mr-4 mt-2 notify" :class="localeLang=='ar'?'ml-4':''" style="font-size: 1.8rem"  v-badge.danger="countNotif" @click="toggleNotificationMenu"  
				v-tooltip.bottom="(localeLang=='ar')?ar.notifications:(localeLang=='fr')?fr.notifications:en.notifications"></i>
				<button class="p-link layout-topbar-button btn-notify" @click="toggleNotificationMenu"  
				v-tooltip.bottom="(localeLang=='ar')?ar.notification:(localeLang=='fr')?fr.notifications:en.notifications">
					<i class="pi pi-bell p-link " style="font-size: 1.8rem"  v-badge.danger="2"></i>&nbsp;
					<span v-if="localeLang =='ar'">{{ar.notifications}} </span>
					<span v-else-if="localeLang =='fr'">{{fr.notifications}}</span>
					<span v-else>{{en.notifications}}</span>
				</button>
				<Transition name="slide-fade">
					<ul :class="[!dark?'layout-topbar-action-panel-dark shadow-dark-6':'layout-topbar-action-panel shadow-6',
					localeLang=='ar'? 'layout-topbar-action-panel-left':'layout-topbar-action-panel-right']"  v-show="showNotif">
						<li class="mb-3">
							<span v-if="countNotif>0" class="px-3 mt-2 fs-small">You have <b>{{countNotif}}</b> new notifications</span><br/><br/>
							<Button class="p-button-link mr-2 " icon="pi pi-check" label="Mark All" @click="markAll('mark_all_notifs')" />
							<router-link to="/notifications" @click="showNotif=false"><Button class="p-button-link mr-2 " icon="pi pi-list" label="Show All" /></router-link>
						</li>
						<router-link  v-for="notif in listNofitications" :key="notif.id" :to="{name:'notif-details','params':{id:notif.id}}" >
                            <li class="flex align-items-center py-2 border-bottom-1 surface-border link-active">
                                <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-green-100 border-circle mr-3 flex-shrink-0">
                                    <i class="pi pi-bell text-xl text-green-500"></i>
                                </div>
                                <div class="flex flex-column ml-3" style="flex-grow: 1;">
                                    <div class="flex align-items-center justify-content-between mb-1">
                                        <span class="font-bold" :class="!notif.opened?'text-900':'text-500'">{{notif.subject}}&nbsp;
                                            <Tag class="mr-2" severity="warning" value="Unread" :rounded="true" v-if="!notif.opened"></Tag>
                                        </span>
                                        <small>{{getMomentDate(notif.created_at)}}</small>
                                    </div>
                                    <span :class="!notif.opened?'text-900':'text-500'">{{notif.content.substring(0,50)+'...'}}</span>			
                                </div>
                            </li>
                        </router-link>
						
					</ul>
				</Transition>
			</li>
			<li class="">
				<button class="p-link layout-topbar-button btn-notify" @click="toggleMessagesMenu"  
				v-tooltip.bottom="(localeLang=='ar')?ar.messages:(localeLang=='fr')?fr.messages:en.messages">
				
					<i v-if="count>0"  class="pi pi-envelope " style="font-size: 1.8rem" v-badge="count" v-badge.danger="count>100?'99+':count"></i>&nbsp;
					<i v-else class="pi pi-envelope " style="font-size: 1.8rem" v-badge="count" v-badge.green="count"></i>&nbsp;
					<span v-if="localeLang =='ar'">{{ar.messages}} </span>
					<span v-else-if="localeLang =='fr'">{{fr.messages}}</span>
					<span v-else>{{en.messages}}</span>
				</button>
				<i v-if="count>0"  class="pi pi-envelope  mt-2 notify" :class="localeLang=='ar'?'ml-4':''" style="font-size: 1.8rem" v-badge.danger="count" @click="toggleMessagesMenu"  
				v-tooltip.bottom="(localeLang=='ar')?ar.messages:(localeLang=='fr')?fr.messages:en.messages"></i>
				<i v-else class="pi pi-envelope  mt-2 notify" :class="localeLang=='ar'?'ml-4':''" style="font-size: 1.8rem" v-badge.green="count" @click="toggleMessagesMenu"  
				v-tooltip.bottom="(localeLang=='ar')?ar.messages:(localeLang=='fr')?fr.messages:en.messages"></i>
				<Transition name="slide-fade">
					<ul :class="[!dark?'layout-topbar-action-panel-dark shadow-dark-6':'layout-topbar-action-panel shadow-6',
					localeLang=='ar'? 'layout-topbar-action-panel-left':'layout-topbar-action-panel-right']"  
					v-show="showMessages">
						<li class="mb-3">
							<span class="px-3 mt-2 fs-small">Vous avez  <b>{{ count }}</b> nouveaux messages</span><br/><br/>
							<Button class="p-button-link mr-2 " icon="pi pi-check" label="Mark All" @click="markAll('mark_all_msgs')" />
							<router-link to="/messages/inbox" @click="showMessages=false"><Button class="p-button-link mr-2 " icon="pi pi-list" label="Show All" /></router-link>
						</li>
						<router-link  v-for="message in filtredMessages" :key="message" :to="{name:'details','params':{id:message.id}}" >
                    <li class="flex align-items-center py-2 border-bottom-1 surface-border link-active">
                        <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-green-100 border-circle mr-3 flex-shrink-0">
                            <i class="pi pi-inbox text-xl text-green-500"></i>
                        </div>
                        <div  class="flex flex-column ml-3" style="flex-grow: 1;">
                            <div class="flex align-items-center justify-content-between mb-1">
                                <span class="font-bold bg-green-100" :class="!message.opened?'text-900':'text-500'">{{message.subject}}&nbsp;
                                    <Tag class="mr-2" severity="warning" value="Unread" :rounded="true" v-if="!message.opened"></Tag>
                                </span>
                                <small>{{getMomentDate(message.send_at)}}</small>
                            </div>
                            <span :class="!message.opened?'text-900':'text-500'"></span>			
                        </div>
                    </li>
                </router-link>
				

					<router-link  v-for="message in listInboxMessages" :key="message" :to="{name:'details','params':{id:message.id}}" >
						<li @click="showMessages=false"  class="layout-topbar-action-item">
							<div class="flex flex-row align-items-center">
								<div class="w-3rem h-3rem flex align-items-center justify-content-center bg-green-100 border-circle mr-3 flex-shrink-0">
									<i class="pi pi-inbox text-xl text-green-500"></i>
								</div>
								<div class="flex flex-column ml-3" style="flex-grow: 1;">
									<div class="flex align-items-center justify-content-between mb-1"><span
										:class="!message.opened?'fs-small font-bold text-900':'fs-small font-bold text-500'" >{{message.subject}}&nbsp;</span>
                                    <Tag class="mr-2" severity="warning" value="Unread" :rounded="true" v-if="!message.opened"></Tag>
										<small>{{getMomentDate(message.send_at)}}</small></div>
										<span :class="!message.opened?'text-900':'text-500'">{{message.content}}</span>
								</div>

							</div>
						</li>
					</router-link>
				
					</ul>
				</Transition>
			</li>
			<!-- <li>
				<Menu ref="language" :model="overlayLanguageMenuItems" :popup="true" />
				<button class="p-link layout-topbar-button" @click="toggleLanguageMenu"  v-tooltip.bottom="(localeLang=='ar')?ar.language:(localeLang=='fr')?fr.language:en.language">
					<i class="pi pi-globe" style="font-size: 1.8rem"></i>&nbsp;
					<span v-if="localeLang =='ar'">{{ar.language}} </span>
					<span v-else-if="localeLang =='fr'">{{fr.language}}</span>
					<span v-else>{{en.language}}</span>
				</button>
			</li> -->
			<li>
				<!-- <button class="p-link layout-topbar-button" v-tooltip.bottom="(localeLang=='ar')?ar.notification:(localeLang=='fr')?fr.notification:en.notification">
					<i class="pi pi-calendar"></i>
					<span v-if="localeLang =='ar'">{{ar.notification}} </span>
					<span v-else-if="localeLang =='fr'">{{fr.notification}}</span>
					<span v-else>{{en.notification}}</span>
				</button> -->
			</li>
			<li>
				<button @click="toggleTheme($event)" class="p-link layout-topbar-button" v-tooltip.bottom="(localeLang=='ar')?ar.darkMode:(localeLang=='fr')?fr.darkMode:en.darkMode">
					<i ref="iconDark" class="pi" :class="dark?'pi-moon':'pi-sun'" style="font-size: 1.8rem"></i>&nbsp;
					<span v-if="localeLang =='ar'">{{ar.darkMode}} </span>
					<span v-else-if="localeLang =='fr'">{{fr.darkMode}}</span>
					<span v-else>{{en.darkMode}}</span>
				</button>
			</li>
			<li>
				<Menu ref="menu" :model="overlayMenuItems" :popup="true" />
				<button class="p-link layout-topbar-button" @click="toggleMenu" v-tooltip.bottom="(localeLang=='ar')?ar.profile:(localeLang=='fr')?fr.profile:en.profile">
					<i class="pi pi-user" style="font-size: 1.8rem"></i>&nbsp;
					
					<span v-if="localeLang =='ar'">{{ar.profile}} </span>
					<span v-else-if="localeLang =='fr'">{{fr.profile}}</span>
					<span v-else>{{en.profile}}</span>

				</button>
			</li>
		</ul>
	</div>
</template>

<script>
import EventBus from './AppEventBus';
import {ref, toRefs,reactive,watch} from 'vue'
import { useStore } from 'vuex';
import api from './api'
import moment from 'moment'
import {useRoute,useRouter, onBeforeRouteUpdate} from 'vue-router'
export default {
	setup(){
		const route = useRoute()
		const router = useRouter()
        const store=useStore()
		const windowWidth= ref(window.innerWidth)
		const tolbarHeaders= reactive({ar:{
                profile:"الملف",
				darkMode:"الوضع المظلم",
			   	notification:"الإشعارات",
                logout:"تسجيل خروج",
				language:"اللغة",
				industrieFullText:"فضاء المؤسسات",
				notifications: 'الإشعارات',
				messages:'الرسائل'
                },
            fr:{ profile:"Profil",
               	darkMode:"Mode sombre",
			   	notification:"Notifications",
                logout:"Se déconnecter",
				language:"Langue",
				notifications: 'Notifications',
				messages:'Messages'
             
               },
            en:{ profile:"Profile",
               	darkMode:"Dark Mode",
			   	notification:"Notifications",
                logout:"Lougout",
				language:"Language",
				notifications: 'Notifications',
				messages:'Messages'
               }})
        // const localeLang=ref(store.state.user.localeLang)
		const localeLang = ref(localStorage.getItem('localeLang'))

		const nextMessages = ref('')
		const listInboxMessages = ref([])
        const scrollToLoad = ref(true)
		const count=ref(0)

        function getListOfInboxMessages(){
            api.get('/messages/?reciever='+store.state.user.id+'&ordering=-send_at')
            .then(response=>{
                listInboxMessages.value = response.data.results.data
				count.value=response.data.results.count
                nextMessages.value=response.data.next
                scrollToLoad.value = false
            }).catch(error=>console.log(error))
        }
		const showNotif=ref(false)
		const showMessages=ref(false)
		
		getListOfInboxMessages()
		function setMessageOpened(messageID){
			
            api.put('/messages/'+messageID+'/set_opened/')
            .then(response=>{
                let index = listInboxMessages.value.findIndex((msg) => msg.id === messageID)
                listInboxMessages.value[index] = response.data
				count.value--
            }).catch(error=>{
                console.log(error)
            })
        }
		function markAll(type){
			if (type=='mark_all_notifs')api.get('mark_all_notifs/').then(response=>{
				
			}).catch(error=>
			console.log(error)
			)
			if (type==='mark_all_msgs') api.get('mark_all_msgs/').then(response=>{
				
			}).catch(error=>
			console.log(error)
			)
			
		}
		onBeforeRouteUpdate((to,from,next)=>{
			// && route.matched[2].name=='inbox'
			if(route.matched.length>2 ){
				let message  = listInboxMessages.value!= undefined?listInboxMessages.value.find(msg=>(msg.id==to.params.id) && !msg.opened):undefined
				if (message != undefined){
					setMessageOpened(to.params.id)
					
				}
				next()
			}
				
			showNotif.value=false
			showMessages.value=false
			next()
        })
		
		const listNofitications = ref([])
		const countNotif=ref(0)
        function getListOfNotifications(){
            api.get('/notifications/?send_to='+store.state.user.id+'&ordering=-created_at')
            .then(response=>{
                listNofitications.value = response.data.results.data
				countNotif.value =  response.data.results.count
                nextMessages.value=response.data.next
                scrollToLoad.value = false
            }).catch(error=>console.log(error))
        }
        getListOfNotifications()
		function getMomentDate(date){
            // moment.locale(localeLang.value=='ar'?'ar-dz':localeLang.value=='fr'?'fr-fr':'en-us')
            // let momentDate = moment(date.slice(0,10)+' '+date.slice(11,16),'YYYY-MM-DD hh:mm:ss').fromNow()
            // return momentDate
			const currentDate = new Date(date);
            // const utcOffset = 1; // Algeria is UTC+1
            moment.locale(localeLang.value=='ar'?'ar-dz':localeLang.value=='fr'?'fr-fr':'en-us')
            let momentDate = moment(currentDate).fromNow()
            return momentDate
        }
		function toggleNotificationMenu(event) {
			if(window.innerWidth<615){
				router.push('/notifications')
			}else{
				showMessages.value=false
				showNotif.value=!showNotif.value
			}
		}
		
		
		function toggleMessagesMenu(event){
			if(window.innerWidth<615){
				router.push('/messages/inbox')
			}else{
			showNotif.value=false
			showMessages.value=!showMessages.value
			}
		}
        return {localeLang,showNotif,showMessages,nextMessages,scrollToLoad,getMomentDate,
			getListOfInboxMessages,listInboxMessages,toggleNotificationMenu,toggleMessagesMenu,
		...toRefs(tolbarHeaders),count,countNotif,listNofitications,markAll
		}
    },
	props: {
		darkMode: {default: true}
	},
	data(){
		return {
			// showNotif: false,
			// showMessages: false,
			overlayMessagesItems: [
					{
						label: this.$store.state.user.name
					},
					{
						separator: true
					},
					{
						label:(this.$store.state.user.localeLang=='ar')?"الحساب":(this.$store.state.user.localeLang=='fr')? 'Compte':"Account",
						icon: 'pi pi-user',
						to: '/account'
					},
					{
						separator: true
					},
					{
						label:(this.$store.state.user.localeLang=='ar')?"تسجيل خروج":(this.$store.state.user.localeLang=='fr')? 'Se déconnecter':"Logout" ,
						icon: 'pi pi-fw pi-sign-out',
						to: '/logout'
					},
				],
			overlayNotificationsItems: [
					{
						label: this.$store.state.user.name
					},
					{
						separator: true
					},
					{
						label:(this.$store.state.user.localeLang=='ar')?"الحساب":(this.$store.state.user.localeLang=='fr')? 'Compte':"Account",
						icon: 'pi pi-user',
						to: '/account'
					},
					{
						separator: true
					},
					{
						label:(this.$store.state.user.localeLang=='ar')?"تسجيل خروج":(this.$store.state.user.localeLang=='fr')? 'Se déconnecter':"Logout" ,
						icon: 'pi pi-fw pi-sign-out',
						to: '/logout'
					},
				],
			overlayMenuItems: [
					{
						label: this.$store.state.user.name
					},
					{
						label:(this.$store.state.user.localeLang=='ar')?"الحساب":(this.$store.state.user.localeLang=='fr')? 'Compte':"Account",
						icon: 'pi pi-user',
						command: ()=>{window.open(this.$store.state.keycloak.createAccountUrl(),'_blank')}
					},
					{
						label:(this.$store.state.user.localeLang=='ar')?"تسجيل خروج":(this.$store.state.user.localeLang=='fr')? 'Se déconnecter':"Logout" ,
						icon: 'pi pi-fw pi-sign-out',
						command: () => {this.$store.state.keycloak.logout({ redirectUri :  this.$store.state.endpoints.cns});}
					},
				],
				overlayLanguageMenuItems:[
					{
						label: 'العربية',
						command: ()=>{this.changeLanguage('ar')}
					},
					{
						label: 'English',
						command: ()=>{this.changeLanguage('en')}
					},
					{
						label: 'Français',
						command: ()=>{this.changeLanguage('fr')}
					}
				],
				dark: this.darkMode,
		}
	},
    methods: {
		toggleMenu(event) {
			this.$refs.menu.toggle(event);
			
		},
		// toggleNotificationMenu(event) {
		// 	this.showMessages=false
		// 	this.showNotif=!this.showNotif
		// },
		// toggleMessagesMenu(event){
		// 	this.showNotif=false
		// 	this.showMessages=!this.showMessages
		// },
		toggleLanguageMenu(event) {
			this.$refs.language.toggle(event);
		},
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        },
		onTopbarMenuToggle(event) {
            this.$emit('topbar-menu-toggle', event);
        },
		topbarImage() {
			return this.$appState.darkTheme ? '/images/logo.png' : '/images/logo.png';
		},
		changeTheme(event, theme, dark) {
				EventBus.emit('theme-change', { theme: theme, dark: dark });
				event.preventDefault();
		},
		toggleTheme(event){
			if (this.dark){
				this.changeTheme(event, 'lara-dark-indigo', this.dark)
				localStorage.setItem('darkMode',this.dark)
				this.dark=!this.dark
			}else{
				this.changeTheme(event, 'lara-light-indigo', this.dark)
				localStorage.setItem('darkMode',this.dark)
				this.dark=!this.dark
			}
			
		},
		changeLanguage(language){
			localStorage.setItem('localeLang',language)
			//this.$router.push('/')
			window.location.reload()
		}
    },
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		}
	}
}
</script>
<style lang="css">
.header-abriv{
	margin-right:10px;
}
.btn-notify{
	display: none !important;
	cursor: pointer;
}
.notify{
	cursor: pointer;
}
.layout-topbar-action-panel{

top: 90px;
position: absolute;
z-index: 1000;
background: #fff;
padding: 10px;
list-style: none;
min-width: 370px;
max-width: 370px;
max-height: 300px;
overflow: auto;
width: 100%;
transition: all 0.5s ease;
}

.layout-topbar-action-panel-right {
	right: 25px;
}
.layout-topbar-action-panel-left {
	left: 25px;
}
.layout-topbar-action-panel-dark{
top: 90px;
position: absolute;
z-index: 1000;
background: #071426;
padding: 10px;
list-style: none;
min-width: 370px;
max-width: 370px;
max-height: 300px;
overflow: auto;
width: 100%;
transition: all 0.5s ease;
}

.layout-topbar-action-item{
	padding: 1rem;
	cursor: pointer;
	
	border-bottom: 1px solid var(--divider-color);
}
.layout-topbar-action-item:hover{
	background-color: rgba(0, 0, 0, 0.1);
}
.shadow-6{
	box-shadow: 0 3px 5px rgba(0,0,0,.06),0 7px 9px rgba(0,0,0,.12),0 20px 25px -8px rgba(0,0,0,.18) !important;
}
.shadow-dark-6{
	box-shadow: 0 3px 5px rgba(255,255,255,.06),0 7px 9px rgba(255,255,255,.12),0 20px 25px -8px rgba(255,255,255,.18) !important;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
@media screen and (max-width: 990px ){
	.notify{
		display: none;
	}
	.btn-notify{
		display: inline-flex !important;
		
	}
.layout-topbar-action-panel{
	top: 20px;
	position: absolute;
	z-index: 1000;
	background: #fff;
	padding: 10px;
	list-style: none;
	min-width: 370px;
	max-width: 370px;
	max-height: 300px;
	overflow: auto;
	width: 100%;
	transition: all 0.5s ease;
}
.layout-topbar-action-panel-dark{
	top: 20px;
	position: absolute;
	z-index: 1000;
	background: #071426;
	padding: 10px;
	list-style: none;
	min-width: 370px;
	max-width: 370px;
	max-height: 300px;
	overflow: auto;
	width: 100%;
	transition: all 0.5s ease;
}
.layout-topbar-action-panel-right {
	right: 215px;
}
.layout-topbar-action-panel-left {
	left: 215px;
}
}
</style>