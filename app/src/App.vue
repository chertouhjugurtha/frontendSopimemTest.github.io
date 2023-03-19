<template>
	<div :class="containerClass" @click="onWrapperClick">
        <AppTopBar @menu-toggle="onMenuToggle" :darkMode="darkModeApp" />
        <div class="layout-sidebar" @click="onSidebarClick">
            <!-- <AppMenu v-if="localeLang=='ar'" :model="menuArabe" @menuitem-click="onMenuItemClick"  /> v-else-if="localeLang=='fr'" -->
            <AppMenu  :model="menuFrancais" @menuitem-click="onMenuItemClick"  />
            <!-- <AppMenu v-else :model="menuAnglais" @menuitem-click="onMenuItemClick"  /> -->
        </div>

        <div class="layout-main-container">
            <div class="layout-main">
                <router-view />
            </div>
            <AppFooter />
        </div>

        <transition name="layout-mask">
            <div class="layout-mask p-component-overlay" v-if="mobileMenuActive"></div>
        </transition>
	</div>
</template>

<script>
import AppTopBar from './AppTopbar.vue';
import AppMenu from './AppMenu.vue';
import AppFooter from './AppFooter.vue';
import EventBus from './AppEventBus';
import api from '../../app/src/api';
import {ref} from 'vue'
import { useStore } from 'vuex';

export default {
    emits: ['change-theme'],
    setup(){
        const store=useStore()
        const localeLang='fr'
        // ref(store.state.user.localeLang)
        return {localeLang}
    },
    data() {
        return {
            darkModeApp: null,
            layoutMode: 'static',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            itemsSideBar:'',
            classes:[],
            nbr_tranche_impaye:0,
            
            
            // menuArabe:[
            //     {
            //         label: 'الصفحة الرئيسية',
            //         items: [{
            //             label: 'لوحة القيادة', icon: 'pi pi-fw pi-home', to: '/'
            //         }]
            //     },
			// 	{
			// 		label: '', icon: 'pi pi-fw pi-sitemap',
			// 		items: [
						
			// 			{label: 'المخطط العام', icon: 'pi pi-fw pi-bars', to: '/canvas'},
            //             {label: 'الجدول الزمني', icon: 'pi pi-fw pi-calendar', to: '/users'},
            //             {label: 'إضافة خاصية', icon: 'pi pi-fw pi-calendar', to: '/propriter'},
					
			// 		]
			// 	},
			// 	{
			// 		label: 'الصفحات', icon: 'pi pi-fw pi-clone',
			// 		items: [
			// 			{label: ' التغييرات', icon: 'pi pi-fw pi-user-edit', to: '/canvavisual'},
						
            //             {label: 'الصفحة المقصودة', icon: 'pi pi-fw pi-globe', to: '/landing'},
            //             {label: 'تسجيل الدخول', icon: 'pi pi-fw pi-sign-in', to: '/login'},
            //             {label: 'خطأ', icon: 'pi pi-fw pi-times-circle', to: '/error'},
            //             {label: 'لم يتم العثور على', icon: 'pi pi-fw pi-exclamation-circle', to: '/notfound'},
            //             {label: 'تم الرفض', icon: 'pi pi-fw pi-lock', to: '/access'},
			// 			{label: 'فارغة', icon: 'pi pi-fw pi-circle-off', to: '/empty'},
			// 		]
			// 	},
            // ],
            menuFrancais:[
                {
                    items: [{
                        label: 'Tableau de bord', icon: 'pi pi-fw pi-home', to: '/'
                    }]
                },
				{
					label: '', icon: 'pi pi-fw pi-sitemap',
					items: [
						
						{label: 'Ajouter un client', icon: 'pi pi-fw pi-users', to: '/canvas'},
						{label: 'Ajouter une Tranche', icon: 'pi pi-fw pi-server', to: '/canvas/search'},
                        {label: 'Ajouter des utilisateurs', icon: 'pi pi-fw pi-user-plus', to: '/users'},
                        {label: 'Ajouter une propriété', icon: 'pi pi-fw pi-plus', to: '/propriter'},
                        // {label: 'Ajouter une tranche', icon: 'pi pi-fw pi-calendar', to: '/tranches'},
					
					]
				},
				{
					// label: 'Etat de sortie', 
                    icon: 'pi pi-fw pi-clone',
					items: [
						{label: 'Visualiser Factures', icon: 'pi pi-fw pi-money-bill', to: '/canvavisual'},
						{label: 'Visualiser Clients', icon: 'pi pi-fw pi-user', to: '/clientsvisual'},
						{label: 'Tranches non réglés', icon: 'pi pi-fw pi-dollar',badge:this.nbr_tranche_impaye, to: '/tranchesImpaye'},
						
                        // {label: 'Landing', icon: 'pi pi-fw pi-globe', to: '/landing'},
                        // {label: 'Connexion', icon: 'pi pi-fw pi-sign-in', to: '/login'},
                        // {label: 'Erreur', icon: 'pi pi-fw pi-times-circle', to: '/error'},
                        // {label: 'Introuvable', icon: 'pi pi-fw pi-exclamation-circle', to: '/notfound'},
                        // {label: 'Accès refusé', icon: 'pi pi-fw pi-lock', to: '/access'},
						// {label: 'Vide', icon: 'pi pi-fw pi-circle-off', to: '/empty'},
					]
				},
            ],
            // menuAnglais : [
            //     {
            //         label: 'Home',
            //         items: [{
            //             label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'
            //         }]
            //     },
			// 	{
			// 		label: 'UI Components', icon: 'pi pi-fw pi-sitemap',
			// 		items: [
						
			// 			{label: 'Add Customer', icon: 'pi pi-fw pi-bars', to: '/canvas'},
            //             {label: 'Add User', icon: 'pi pi-fw pi-calendar', to: '/users'},
            //             {label: 'Add Property', icon: 'pi pi-fw pi-calendar', to: '/propriter'},
					
			// 		]
			// 	},
         
             
			// 	{
			// 		label: 'Pages', icon: 'pi pi-fw pi-clone',
			// 		items: [
			// 			{label: 'Constuer Visual', icon: 'pi pi-fw pi-user-edit', to: '/canvavisual'},
						
            //             {label: 'Landing', icon: 'pi pi-fw pi-globe', to: '/landing'},
            //             {label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/login'},
            //             {label: 'Error', icon: 'pi pi-fw pi-times-circle', to: '/error'},
            //             {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', to: '/notfound'},
            //             {label: 'Access Denied', icon: 'pi pi-fw pi-lock', to: '/access'},
			// 			{label: 'Empty', icon: 'pi pi-fw pi-circle-off', to: '/empty'},
			// 		]
			// 	},
                
             
            // ]
        }
    },
    created(){
      /*  api.get('/api/banks')
        .then((response)=>{
            console.log('Banks = ',response.data.results);
        }).catch((error)=>{
            console.log('errors ',error);
        })*/
        if (localStorage.getItem('darkMode')=='true'){
            EventBus.emit('theme-change', { theme: 'lara-dark-indigo', dark: true });
            this.darkModeApp=false
        }else{
            EventBus.emit('theme-change', { theme: 'lara-light-indigo', dark: false });
            this.darkModeApp=true
        }
       
        
    },
    watch: {
        
        $route() {
            this.menuActive = false;
            this.$toast.removeAllGroups();
        },
        
       
    },
    methods: {
        
    tableData() {
            api.get('/tranches-impaye/getlength/').then(response => {
                
                this.nbr_tranche_impaye=response.data.length.toString()
                this.menuFrancais[2].items[2].badge=this.nbr_tranche_impaye
                // console.log(this.nbr_tranche_impaye,"len");
               
            // origineTranchesImpye.value=tranchesImpye.value
            })
            .catch(error => {
                    console.log(error)
            })
        },
        onWrapperClick() {
            this.tableData()
            if (!this.menuClick) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }

            this.menuClick = false;
        },
        onMenuToggle() {
            this.menuClick = true;

            if (this.isDesktop()) {
                if (this.layoutMode === 'overlay') {
					if(this.mobileMenuActive === true) {
						this.overlayMenuActive = true;
					}

                    this.overlayMenuActive = !this.overlayMenuActive;
					this.mobileMenuActive = false;
                }
                else if (this.layoutMode === 'static') {
                    this.staticMenuInactive = !this.staticMenuInactive;
                }
            }
            else {
                this.mobileMenuActive = !this.mobileMenuActive;
            }

            event.preventDefault();
        },
        onSidebarClick() {
            this.menuClick = true;
        },
        onMenuItemClick(event) {
            // console.log(event.item.to,"fffffff");
            
            if (event.item && !event.item.items) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }
        },
		onLayoutChange(layoutMode) {
			this.layoutMode = layoutMode;
		},
        addClass(element, className) {
            if (element.classList)
                element.classList.add(className);
            else
                element.className += ' ' + className;
        },
        removeClass(element, className) {
            if (element.classList)
                element.classList.remove(className);
            else
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        },
        isDesktop() {
            return window.innerWidth >= 992;
        },
        isSidebarVisible() {
            if (this.isDesktop()) {
                if (this.layoutMode === 'static')
                    return !this.staticMenuInactive;
                else if (this.layoutMode === 'overlay')
                    return this.overlayMenuActive;
            }

            return true;
        }
        
    },
    
    computed: {
        
        containerClass() {
            return ['layout-wrapper', {
                'layout-overlay': this.layoutMode === 'overlay',
                'layout-static': this.layoutMode === 'static',
                'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
                'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
                'layout-mobile-sidebar-active': this.mobileMenuActive,
				'p-input-filled': this.$primevue.config.inputStyle === 'filled',
				'p-ripple-disabled': this.$primevue.config.ripple === false
            }];
        },
        logo() {
            return (this.$appState.darkTheme) ? "images/logo-white.svg" : "images/logo.svg";
        }
    },
    beforeUpdate() {
        
        if (this.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    },
    tableData() {
            api.get('/tranches-impaye/?limit=100').then(response => {
                
                return this.classes = response.data.results
               
            // origineTranchesImpye.value=tranchesImpye.value
            })
            .catch(error => {
                    console.log(error.response.data)
            })
        },
    components: {
        'AppTopBar': AppTopBar,
        'AppMenu': AppMenu,
        'AppFooter': AppFooter,
    }
}
</script>

<style lang="scss">
@import './App.scss';
</style>
