<template>
	<div class="layout-topbar">
		<router-link to="/" class="layout-topbar-logo">
			<img alt="Logo" :src="topbarImage()" />
			<!-- <span style="margin-right:10px;" v-if="localeLang =='ar'">{{ar.industrie}} </span>
			<span  style="margin-right:10px;" v-else-if="localeLang =='fr'">{{fr.industrie}}</span>
			<span  style="margin-right:10px;" v-else>{{en.industrie}}</span> -->
			
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
			<li>
				<Menu ref="language" :model="overlayLanguageMenuItems" :popup="true" />
				<button class="p-link layout-topbar-button" @click="toggleLanguageMenu"  v-tooltip.bottom="(localeLang=='ar')?ar.language:(localeLang=='fr')?fr.language:en.language">
					<i class="pi pi-globe"></i>
					<span v-if="localeLang =='ar'">{{ar.language}} </span>
					<span v-else-if="localeLang =='fr'">{{fr.language}}</span>
					<span v-else>{{en.language}}</span>
				</button>
			</li>
			<li>
				<button class="p-link layout-topbar-button" v-tooltip.bottom="(localeLang=='ar')?ar.notification:(localeLang=='fr')?fr.notification:en.notification">
					<i class="pi pi-calendar"></i>
					<span v-if="localeLang =='ar'">{{ar.notification}} </span>
					<span v-else-if="localeLang =='fr'">{{fr.notification}}</span>
					<span v-else>{{en.notification}}</span>
				</button>
			</li>
			<li>
				<button @click="toggleTheme($event)" class="p-link layout-topbar-button" v-tooltip.bottom="(localeLang=='ar')?ar.darkMode:(localeLang=='fr')?fr.darkMode:en.darkMode">
					<i ref="iconDark" class="pi" :class="dark?'pi-moon':'pi-sun'"></i>
					<span v-if="localeLang =='ar'">{{ar.darkMode}} </span>
					<span v-else-if="localeLang =='fr'">{{fr.darkMode}}</span>
					<span v-else>{{en.darkMode}}</span>
				</button>
			</li>
			<li>
				<Menu ref="menu" :model="overlayMenuItems" :popup="true" />
				<button class="p-link layout-topbar-button" @click="toggleMenu" v-tooltip.bottom="(localeLang=='ar')?ar.profile:(localeLang=='fr')?fr.profile:en.profile">
					<i class="pi pi-user"></i>
					
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
import {ref, toRefs,reactive} from 'vue'
import { useStore } from 'vuex';
export default {
	setup(){
        const store=useStore()
		const tolbarHeaders= reactive({ar:{
                profile:"الملف",
				darkMode:"الوضع المظلم",
			   	notification:"الإشعارات",
                logout:"تسجيل خروج",
				language:"اللغة",
				industrie:"SOPIMEM",
                },
            fr:{ profile:"Profil",
               	darkMode:"Mode sombre",
			   	notification:"Notifications",
                logout:"Se déconnecter",
				language:"Langue",
				industrie:"SOPIMEM",
             
               },
            en:{ profile:"Profile",
               	darkMode:"Dark Mode",
			   	notification:"Notifications",
                logout:"Lougout",
				language:"Language",
				industrie:"SOPIMEM",
               }})
        const localeLang=ref(store.state.user.localeLang)
        return {localeLang,
		...toRefs(tolbarHeaders),
		}
    },
	props: {
		darkMode: {default: true}
	},
	data(){
		return {
			overlayMenuItems: [
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
						label: 'Update',
						icon: 'pi pi-refresh'
					},
					{
						label: 'Delete',
						icon: 'pi pi-trash'
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
				dark: this.darkMode
		}
	},
    methods: {
		toggleMenu(event) {
			this.$refs.menu.toggle(event);
		},
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
			this.$router.go()
		}
    },
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		}
	}
}
</script>