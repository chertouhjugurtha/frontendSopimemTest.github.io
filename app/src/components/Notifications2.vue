<template>
    <div class="grid">
        <div class="col-12 xl:col-4">
                <div class="card">
                    <div class="flex align-items-center justify-content-between mb-4">
                        <h5>Notifications</h5>
                        
                    </div>
                    <ul v-on:scroll="handleScroll" class="p-0 mx-0 mt-0 mb-4 list-none" style="min-height:540px; height:700px; overflow-y: scroll;">
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
                        
                        <template v-if="listNofitications.length<10">
                            <div>
                                <router-link :to="{name:'notifications'}"  aria-label="Previous" id="prev-link" >
                                    <Button label="Danger" severity="danger"  @click="previos()">
                                        <span aria-hidden="true" ><i class="pi pi-angle-double-left" aria-hidden="true"> Previous</i></span>
                                    </Button>
                                </router-link>
                            </div>
                        </template>
                        <template v-if="!listNofitications.length">
                            <li class="flex align-items-center py-2 border-bottom-1 surface-border link-active">
                                <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                                    <i class="pi pi-bell text-xl text-blue-500"></i>
                                </div>
                                <div class="flex flex-column ml-3" style="flex-grow: 1;">
                                    <div class="flex align-items-center justify-content-between mb-1">
                                        <span class="text-700 font-bold">No message recieved found</span>
                                    </div>
                                    <span class="text-700">No data to present</span>			
                                </div>
                            </li>
                        </template>
                    </ul>
                </div>
        </div>
        <router-view name="notifviewdetails"/>
    </div>
</template>
<script>
    import {ref, reactive, toRefs,onUpdated,provide,nextTick,computed} from 'vue'
    import {useStore} from 'vuex'
    import api from '../api'
    import {useRoute,onBeforeRouteUpdate} from 'vue-router'
    import { useToast } from "primevue/usetoast";
    import moment from 'moment'
    export default {
        name: 'Notifications',
        setup(){
            const store = useStore()
            const route = useRoute()
            const localeLang = ref(localStorage.getItem('localeLang'))
            const listNofitications = ref([])
            const nextMessages = ref('')
            const prevMessages = ref('')
            const scrollToLoad=ref(false)
            const page=ref(1)
            const pageCount=ref(0)
            function getListOfNotifications(){
                if (page.value>=1)api.get('/notifications/', {
                    params: {
                        send_to: store.state.user.id,
                        ordering: '-created_at',
                        page: page.value
                    }
                    })
                    .then(response => {
                        listNofitications.value = response.data.results.data
                        pageCount.value = response.data.count
                    })
                    .catch(error => {
                    console.log(error)
                    })
                else api.get('/notifications/', {
                    params: {
                        send_to: store.state.user.id,
                        ordering: '-created_at',
                        page: 1
                    }
                    })
                    .then(response => {
                        listNofitications.value = response.data.results.data
                        pageCount.value = response.data.count
                    })
                    .catch(error => {
                    console.log(error)
                    })

                }

                // let nbr_page=0
                //  api.get('/notifications/?send_to='+store.state.user.id+'&ordering=-created_at')
                //  .then(response=>{
                //     console.log('notifications',response.data.results);
                //     listNofitications.value = response.data.results.data
                //     nextMessages.value=response.data.next
                //     // nbr_page=parseInt(response.data.results.count/10)+1
                //     // prevMessages.value=response.data.previous
                //     scrollToLoad.value = true
                    
                // }).catch(error=>console.log(error))
            // }
            
            // function getListOfNotificationsLoad(bool){
                
            //     // console.log(listNofitications.value, scrollToLoad.value,"next");
            //     // console.log(fetch(prevMessages.value), scrollToLoad.value,"prev");
                
            //     if (nextMessages.value==null &&prevMessages.value==null)getListOfNotifications()
            //     else{
            //         if (nextMessages.value!=null && scrollToLoad.value&&bool) {
            //             fetch(nextMessages.value,{method:"GET",
            //             body: JSON.stringify(data)} ).then(response=>listNofitications.value = response).catch(error=>console.log(error))
            //         }
            //         if (prevMessages.value!=null && scrollToLoad.value&&!bool) {
            //             api.get(prevMessages.value  )
            //             .then(response=>{
            //                 listNofitications.value = response.data.results.data
            //                 if (nextMessages.value!=null)nextMessages.value=response.data.next
            //                 prevMessages.value=response.data.previous
            //                 scrollToLoad.value = !bool
            //             }).catch(error=>console.log(error))
            //         }
            //     }
                
            // }
            getListOfNotifications()
            function getMomentDate(date){
                moment.locale(localeLang.value=='ar'?'ar-dz':localeLang.value=='fr'?'fr-fr':'en-us')
                let momentDate = moment(date.slice(0,10)+' '+date.slice(11,16),'YYYY-MM-DD hh:mm:ss').fromNow()
                return momentDate
            }
            function setNotificationOpened(NotificationID){
                api.put('/notifications/'+NotificationID+'/set_opened/')
                .then(response=>{
                    let index = listNofitications.value.findIndex((notify) => notify.id === NotificationID)
                    listNofitications.value[index] = response.data
                }).catch(error=>{
                    console.log(error);
                })
            }
          
            onBeforeRouteUpdate((to,from,next)=>{
                let notif  = listNofitications.value.find(msg=>(msg.id==to.params.id) && !msg.opened)
                if (notif != undefined){
                    setNotificationOpened(to.params.id)
                }
                
               

                next()
            })
            const observerLast=ref(false)
           function handleScroll(event) {
                const element = event.target;
                // console.log(element);
                if (element.scrollHeight <= element.scrollTop+ element.clientHeight){
                    if (pageCount.value>=page.value*10)page.value++
                    else page.value--
                    getListOfNotifications()
                } 
                if (element.scrollTop==0){
                    if (page.value>=-1)page.value--
                    else page.value++
                    getListOfNotifications()
                }
                if(page.value*10>pageCount.value)getListOfNotifications()
                // if(page.value>=pageCount.value)page.value=1
                // if (nextMessages.value==null)getListOfNotificationsLoad(false)
                const lastPage = Math.ceil(pageCount.value/10);
                if (lastPage==page.value ){
                    observerLast.value=true
                }
                
            }
            
            function previos(){
                var prev=document.getElementById('prev-link')
                if (observerLast.value==true&& prev!=null){
                    prev.addEventListener('click', () => {
                        page.value--
                        getListOfNotifications()
                         // Naviguer vers la page précédente
                        });
                    }
            }

            

            return {
                // getListOfNotificationsLoad,
                observerLast,previos,
                localeLang,listNofitications,nextMessages,scrollToLoad,getMomentDate,handleScroll
            }
        }
    }
</script>

<style>

</style>