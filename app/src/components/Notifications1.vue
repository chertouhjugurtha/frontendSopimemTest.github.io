<template>
    <div class="grid">
        <div class="col-12 xl:col-4">
                <div class="card">
                    <div class="flex align-items-center justify-content-between mb-4">
                        <h5>Notifications</h5>
                        <div>
                        </div>
                    </div>
                    <ul v-on:scroll="handleScroll" class="p-0 mx-0 mt-0 mb-4 list-none" style="min-height:550px; height:700px; overflow: auto;">
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
    import {ref,onBeforeUnmount} from 'vue'
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
            const scrollToLoad=ref(true)

            const notifications=ref([])
            const page=ref(1)
            const hasMore=ref(true)
            const loading=ref(false)
            function getListOfNotifications(){
                api.get('/notifications/?send_to='+store.state.user.id+'&ordering=-created_at')
                .then(response=>{
                    scrollToLoad.value = true
                    listNofitications.value = response.data.results.data
                    nextMessages.value=response.data.next
                    scrollToLoad.value = false
                    console.log(listNofitications.value);
                }).catch(error=>console.log(error))
            }
            async function loadNotifications() {
                try {
                    loading.value = true;
                    const response = await api.get(nextMessages.value);
                    const newNotifications = response.data.results;
                    listNofitications.value= notifications.value.concat(newNotifications);
                    page.value++;
                    hasMore.value = response.data.next !== null;
                    loading.value = false;
                } catch (error) {
                    console.error(error);
                }
            }
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
                console.log('opend');
                let notif  = listNofitications.value.find(msg=>(msg.id==to.params.id) && !msg.opened)
                if (notif != undefined){
                    setNotificationOpened(to.params.id)
                }
                next()
            })
            function handleScroll(event) {
                const bottomOfWindow = event.scrollTop + event.innerHeight === event.offsetHeight;
                if (bottomOfWindow && hasMore.value && !loading.value) {
                    loadNotifications();
                }
                }
            const loadM=()=>{
                window.removeEventListener('scroll', handleScroll())}
            onBeforeUnmount (loadM
            )
            return {
                localeLang,listNofitications,nextMessages,scrollToLoad,getMomentDate,
                loading,hasMore,page,loadNotifications,loadM
            }
        }
    }
</script>

<style>

</style>