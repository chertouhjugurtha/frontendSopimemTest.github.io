import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import store from './store'
import Inbox from './components/messages/Inbox.vue' 
import Sent from './components/messages/Sent.vue'
import Details from './components/messages/Details.vue'
import NotifDetails from './components/notifications/Details.vue'

const routes = [
    {
        path: '/',
        name: 'app',
        component: App,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('./components/Dashboard.vue')
            },
           
            {
                path: '/canvas',
                component: () => import('./components/CanvasDemo.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('./components/canvas/Clients.vue')
                    },
                    {
                        path: '/canvas/search',
                        component: () => import('./components/canvas/Clients.vue')
                    },
                    {
                        path: '/canvas/logement',
                        component: () => import('./components/canvas/Logements.vue')
                    },
                    {
                        path: '/canvas/facture',
                        component: () => import('./components/canvas/EtatFacture.vue')
                    },
                    {
                        path: '/canvas/emploi',
                        component: () => import('./components/canvas/Emploi.vue')
                    },
                    {
                        path: '/canvas/produits',
                        component: () => import('./components/canvas/Produits.vue'),
                    },
                    {
                        path: '/canvas/confirmation',
                        component: () => import('./components/canvas/Confirmation.vue')
                    },
                ],
            },
            {
                path: '/notifications',
                name: 'notifications',
                component: () => import('./components/Notifications.vue'),
                children: [
                    {
                        path: '',
                        name: 'notifications',
                        components: {
                            notifviewdetails: NotifDetails
                        }
                    },
                    {
                        path: ':id/details',
                        name: 'notif-details',
                        components: {
                            notifviewdetails: NotifDetails
                        }
                    },
                ]
            },
            {
                path: '/messages',
                name: 'messages',
                component: () => import('./components/Messages.vue'),
                children: [
                    {
                        path: '',
                        name: 'messages',
                        beforeEnter: (to,from,next)=>{
                            next('/messages/inbox')
                        }
                    },
                    {
                        path: 'inbox',
                        name: 'inbox',
                        components: {
                            inboxsent: Inbox
                        }
                    },
                    {
                        path: ':id/details',
                        name: 'details',
                        components: {
                            inboxsent: Details
                        }
                        
                    },
                    {
                        path: 'sent',
                        name: 'sent',
                        components: {
                            inboxsent: Sent,
                        },
                        
                    }
                ]
            }
            ,
          
            {
                path: '/canvavisual',
                name: 'canvavisual',
                component: () => import('./pages/CanvaVisual.vue')
            },
            {
                path: '/clientsvisual',
                name: 'clientsvisual',
                component: () => import('./pages/ClientsVisual.vue')
            },
            {
                path: '/users',
                name: 'users',
                props:{roles:["admin","users","commercial"]},
                component: ()=>import('./components/Users.vue')
            },
            {
                path: '/propriter',
                name: 'propriter',
                
                component: ()=>import('./components/Propriter.vue')
            },
            {
                path: '/tranchesImpaye',
                name: 'tranchesImpaye',
                
                component: ()=>import('./components/TranchesImpaye.vue')
            },
            {
                path: '/empty',
                name: 'empty',
                component: () => import('./components/EmptyPage.vue')
            },
         
        ]
    },{
        path: '/account',
        name: 'account',
        component: ()=>{window.location.href=window.Keycloak.createAccountUrl()}
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/Login.vue')
    },{
        path: '/logout',
        name: 'logout',
        component: () => {window.Keycloak.logout({ redirectUri :  store.state.endpoints.cns});}
    },
    {
        path: '/',
        name: 'landing',
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('./pages/Error.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('./pages/NotFound.vue')
    },
    {
        path: '/access',
        name: 'access',
        component: () => import('./pages/Access.vue')
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
