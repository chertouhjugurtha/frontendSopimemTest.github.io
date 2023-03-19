<template>
    <div>
        <div class="flex align-items-center justify-content-between mb-4">
            <h3 v-if="localeLang == 'ar'">{{ar.inbox}}</h3>
            <h3 v-else-if="localeLang == 'fr'">{{fr.inbox}}</h3>
            <h3 v-else>{{en.inbox}}</h3>
            <div>
                <span class="p-input-icon-left mb-1">
                    <i class="pi pi-search" />
                    <InputText v-model="searchMessage" @keyup="filterMessagesBySearch()"
                    @keydown="filterMessagesBySearch()" placeholder="Search" style="width: 100%" />
                </span>
            </div>
        </div>
        <div class="mb-2">
            
            <span v-if="localeLang == 'ar'">{{ar.all_messages}} <Badge class="mr-2">{{ searchMessage.length > 3 ? filtredMessages.length : count }}
                </Badge>
            </span>
            <span v-else-if="localeLang == 'fr'">{{fr.all_messages}}<Badge class="mr-2">{{ searchMessage.length > 3 ? filtredMessages.length : count }}
                </Badge>
            </span>
            <span v-else>{{en.all_messages}}<Badge class="mr-2">{{ searchMessage.length > 3 ? filtredMessages.length : count }}
                </Badge>
            </span>
        </div>
        <ul ref="inboxDiv"  id="listes"  class="p-0 mx-0 mt-0 mb-4 list-none"
            style="min-height:550px; height:550px; overflow: auto;">
            <template v-if="searchMessage.length > 3">
                <template v-if="filtredMessages.length > 0">
                    <router-link  v-for="message in filtredMessages" :key="message"
                        :to="{ name: 'details', 'params': { id: message.id } }">
                        <li class="flex align-items-center py-2 border-bottom-1 surface-border link-active">
                            <div
                                class="w-3rem h-3rem flex align-items-center justify-content-center bg-green-100 border-circle mr-3 flex-shrink-0">
                                <i class="pi pi-inbox text-xl text-green-500"></i>
                            </div>
                            <div class="flex flex-column ml-3" style="flex-grow: 1;">
                                <div class="flex align-items-center justify-content-between mb-1">
                                    <span class="font-bold bg-green-100"
                                        :class="!message.opened ? 'text-900' : 'text-500'">{{ message.subject }}&nbsp;
                                        <Tag class="mr-2" severity="warning" value="Unread" :rounded="true"
                                            v-if="!message.opened"></Tag>
                                    </span>
                                    <small>{{ getMomentDate(message.send_at) }}</small>
                                </div>
                                <span :class="!message.opened ? 'text-900' : 'text-500'">{{ message.content }}</span>
                            </div>
                        </li>
                    </router-link>
                </template>
                <template v-else>
                    <li class="flex align-items-center py-2 border-bottom-1 surface-border link-active">
                        <div
                            class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <i class="pi pi-inbox text-xl text-green-500"></i>
                        </div>
                        <div class="flex flex-column ml-3" style="flex-grow: 1;">
                            <div class="flex align-items-center justify-content-between mb-1">
                                <span class="text-700 font-bold">No message recieved found</span>
                            </div>
                            <span class="text-700">No data to present</span>
                        </div>
                    </li>
                </template>
            </template>
            <template v-else>
                <li  v-on:mouseover="hoverList()" v-for="message in listInboxMessages" :key="message"
                    class="flex align-items-center py-2 border-bottom-1 surface-border link-active">
                    <router-link  :to="{ name: 'details', 'params': { id: message.id } }" class="router-link">
                        <div
                            class="w-3rem h-3rem flex align-items-center justify-content-center bg-green-100 border-circle mr-3 flex-shrink-0">
                            
                            <i class="pi pi-inbox text-xl text-green-500"></i>
                        </div>
                        <div class="flex flex-column ml-3" style="flex-grow: 1;">
                            <div class="flex align-items-center justify-content-between mb-1">
                                <span class="font-bold" :class="!message.opened ? 'text-900' : 'text-500'">{{
                                        message.subject
                                }}&nbsp;
                                    <Tag class="mr-2" severity="warning" value="Unread" :rounded="true"
                                        v-if="!message.opened"></Tag>
                                </span>
                                <small>{{ getMomentDate(message.send_at) }}</small>
                            </div>
                            <span :class="!message.opened ? 'text-900' : 'text-500'">
                                {{ message.content }}
                            </span>
                        </div> 
                    </router-link>
                    <!-- à ne pas supprimer -->
                    <!-- <ul   style="display:none;position: absolute; margin-right: 0;" class="p-speeddial-list" role="menu">
                        <li style="transition-delay: 0ms; display: inline-flex;" role="none">
                            <a href="#" role="menuitem" class="p-speeddial-action"><span
                                    class="p-speeddial-action-icon pi pi-pencil">

                                </span><span class="p-ink" role="presentation">

                                </span></a>
                        </li>
                        <li style="transition-delay: 30ms;" role="none">
                            <a href="#" role="menuitem" class="p-speeddial-action">
                                <span class="p-speeddial-action-icon pi pi-refresh">
                                </span>
                                <span class="p-ink" role="presentation">
                                </span>
                            </a>
                        </li>
                         <li style="transition-delay: 60ms;" role="none">
                            <a href="#" role="menuitem" class="p-speeddial-action">
                                <span class="p-speeddial-action-icon pi pi-trash">

                                </span><span class="p-ink" role="presentation">

                                </span>
                            </a>
                        </li> 
                        <li style="transition-delay: 90ms;" role="none"><a href="#" role="menuitem"
                                class="p-speeddial-action"><span
                                    class="p-speeddial-action-icon pi pi-upload"></span><span class="p-ink"
                                    role="presentation"></span></a></li> 
                        <li style="transition-delay: 120ms;" role="none"><a href="#" role="menuitem"
                                class="p-speeddial-action"><span
                                    class="p-speeddial-action-icon pi pi-external-link"></span><span class="p-ink"
                                    role="presentation"></span></a></li>
                    </ul> -->
                </li>
                <li v-if="scrollToLoad" class="flex align-items-center py-2 border-bottom-1 surface-border link-active">
                    <div class="">
                        <Skeleton shape="circle" size="3rem" class="mr-2"></Skeleton>
                    </div>
                    <div class="flex flex-column ml-3" style="flex-grow: 1;">
                        <div class="flex align-items-center justify-content-between mb-1">
                            <Skeleton width="8rem" class="mb-2"></Skeleton>
                            <Skeleton width="4rem" class="mb-2"></Skeleton>
                        </div>
                        <Skeleton height=".5rem"></Skeleton>
                    </div>
                </li>
                  
            </template>
            <template v-if="!count">
                <li class="flex align-items-center py-2 border-bottom-1 surface-border link-active">
                    <div
                        class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                        <i class="pi pi-dollar text-xl text-blue-500"></i>
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
        <center><i v-show="scrollToLoad"  class="pi pi-spin pi-spinner" style="font-size: 2rem"></i></center>
    </div>

</template>
  
<script>
import { ref, reactive, toRefs,onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'
import api from '../../api'
import moment from 'moment'
export default {
    name: 'Inbox',
    setup() {
        
        const speeddial = ref(false)
        
        const items = ref([
            {
                label: 'Update',
                icon: 'pi pi-refresh',
                command: () => {
                    toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
            {
                label: 'Vue Website',
                icon: 'pi pi-external-link',
                command: () => {
                    window.location.href = 'https://vuejs.org/'
                }
            }
        ]);
        const store = useStore()
        const route = useRoute()
        const localeLang = ref(localStorage.getItem('localeLang'))


        const listInboxMessages = ref([])
        const count = ref(0)
        const content_clean = ref('')
        const nextMessages = ref('')
        const scrollToLoad = ref(true)
        const searchMessage = ref('')
        const inboxHeaders = reactive({
            ar: {
                inbox: ' الواردة',
                all_messages: 'مجموع الرسائل',
                


            },
            fr: {
                inbox: 'Boîte de réception',
                all_messages: 'Total des messages',
               


            },
            en: {
                inbox: 'Inbox',
                all_messages: 'Total of messages',
                

            }
        })
        function hoverList() {
            var list
            var y
            list = document.getElementById('listes');
            y = list.getElementsByTagName('LI');
            for (var i = 0; i < y.length; i++) {
                y[i].addEventListener('mouseover', function (e) {
                    let UL = this.childNodes[1]
                    this.firstChild.style = { 'z-index': -1 }
                    UL.style = { 'display': 'inline-flex', 'z-index': 1000, 'position': 'absolute', 'right': '50px' }
                    // speeddial.value=true
                });
                y[i].addEventListener('mouseleave', function (e) {
                    this.style = { 'z-index': -1 }
                    let UL = this.childNodes[1]
                    if (UL.style!=undefined) UL.style.display = 'none'
                });
            }
            // speeddial.value=true
            // list.style.color = "#FF0000";
        }
        function getListOfInboxMessages(){
            api.get('/messages/?reciever='+store.state.user.id+'&ordering=-send_at')
            .then(response=>{
                listInboxMessages.value = response.data.results.data
				count.value=response.data.results.count
                nextMessages.value=response.data.next
                scrollToLoad.value = false
            }).catch(error=>console.log(error))
        }
        // function getListOfInboxMessages() {
        //     api.get('/messages/?reciever=' + store.state.user.id + '&ordering=-send_at')
        //         .then(response => {
        //             listInboxMessages.value = response.data.results.data
        //             count.value = response.data.count
        //             //   content_clean.value=response.data.results.data.content_clean
        //             nextMessages.value = response.data.next

        //             scrollToLoad.value = false
        //             // console.log('***********',content_clean.value)
        //         }).catch(error => console.log(error))
        // }
        const inboxDiv=ref(null)
        function getMoreInboxMessages(){
            scrollToLoad.value = true
            inboxDiv.value.onscroll = () => {
                let bottomOfWindow =  inboxDiv._value.scrollHeight - inboxDiv._value.scrollTop === inboxDiv._value.offsetHeight;
                //alert(bottomOfWindow)
                if (bottomOfWindow) {
                    if(nextMessages.value !== null){
                        api.get(nextMessages.value)
                        .then(response=>{
                            
                            listInboxMessages.value.push(...response.data.results.data)
                            nextMessages.value=response.data.next
                            scrollToLoad.value = false
                        }).catch(error=>console.log(error))
                    }
                }
            }
        }
        function getMomentDate(date) {
            // moment.locale(localeLang.value == 'ar' ? 'ar-dz' : localeLang.value == 'fr' ? 'fr-fr' : 'en-us')
            // let momentDate = moment(date.slice(0, 10) + ' ' + date.slice(11, 16), 'YYYY-MM-DD hh:mm:ss').fromNow()
            // return momentDate
            const currentDate = new Date(date);
            // const utcOffset = 1; // Algeria is UTC+1
            moment.locale(localeLang.value=='ar'?'ar-dz':localeLang.value=='fr'?'fr-fr':'en-us')
            let momentDate = moment(currentDate).fromNow()
            return momentDate
        }
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
        // function setMessageOpened(messageID) {
        //     api.put('/messages/' + messageID + '/set_opened/')
        //         .then(response => {
        //             let index = listInboxMessages.value.findIndex((msg) => msg.id === messageID)
        //             listInboxMessages.value[index] = response.data
        //             count.value--
        //         }).catch(error => {
        //             console.log(error);
        //         })
        // }
        const filtredMessages = ref([])
        function filterMessagesBySearch() {
            if (searchMessage.value.length > 3) {
                filtredMessages.value = listInboxMessages.value.filter(message => (message.subject.toLowerCase().indexOf(searchMessage.value.toLowerCase()) != -1) || (message.content.toLowerCase().indexOf(searchMessage.value.toLowerCase()) != -1))
                if (filtredMessages.value.length == 0) {
                    api.get('/messages/?search=' + searchMessage.value + '&reciever=' + store.state.user.id + '&ordering=-send_at')
                        .then(response => {
                            filtredMessages.value = response.data.results
                        }).catch(error => console.log(error))
                }
            } else {
                filtredMessages.value = []
            }
        }
        onBeforeRouteUpdate((to, from, next) => {
            let message = listInboxMessages.value.find(msg => (msg.id == to.params.id) && !msg.opened)

            if (message != undefined) {
                setMessageOpened(to.params.id)
                next()
            }else next(false)
            
        })
        getListOfInboxMessages()
        onMounted(()=>getMoreInboxMessages())
        return {
            items, speeddial, hoverList,inboxDiv,...toRefs(inboxHeaders),localeLang,
            listInboxMessages, count, getMomentDate, searchMessage, filterMessagesBySearch, filtredMessages, scrollToLoad, content_clean
        }
    }

}
</script>
  
<style>
.router-link {
    width: 100%;
}

.link-active:hover {
    background-color: rgba(0, 0, 0, 0.1);

}

.link-active:active {
    background-color: rgba(0, 0, 0, 0.5);
}

.link-active:focus {
    background-color: rgba(0, 0, 0, 0.5);
}

:target {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>

<style lang="scss" scoped>
::v-deep(.speeddial-linear-demo) {
    .p-speeddial-direction-up {
        left: calc(50% - 2rem);
        bottom: 0;
    }

    .p-speeddial-direction-down {
        left: calc(50% - 2rem);
        top: 0;
    }

    .p-speeddial-direction-left {
        right: 0;
        top: calc(50% - 2rem);
    }

    .p-speeddial-direction-right {
        left: 0;
        top: calc(50% - 2rem);
    }
}

::v-deep(.speeddial-circle-demo) {
    .p-speeddial-circle {
        top: calc(50% - 2rem);
        left: calc(50% - 2rem);
    }

    .p-speeddial-semi-circle {
        &.p-speeddial-direction-up {
            left: calc(50% - 2rem);
            bottom: 0;
        }

        &.p-speeddial-direction-down {
            left: calc(50% - 2rem);
            top: 0;
        }

        &.p-speeddial-direction-left {
            right: 0;
            top: calc(50% - 2rem);
        }

        &.p-speeddial-direction-right {
            left: 0;
            top: calc(50% - 2rem);
        }
    }

    .p-speeddial-quarter-circle {
        &.p-speeddial-direction-up-left {
            right: 0;
            bottom: 0;
        }

        &.p-speeddial-direction-up-right {
            left: 0;
            bottom: 0;
        }

        &.p-speeddial-direction-down-left {
            right: 0;
            top: 0;
        }

        &.p-speeddial-direction-down-right {
            left: 0;
            top: 0;
        }
    }
}

::v-deep(.speeddial-tooltip-demo) {
    .p-speeddial-direction-up {
        &.speeddial-left {
            left: 0;
            bottom: 0;
        }

        &.speeddial-right {
            right: 0;
            // bottom: 0;
        }
    }
}

::v-deep(.speeddial-delay-demo) {
    .p-speeddial-direction-up {
        left: calc(50% - 2rem);
        bottom: 0;
    }
}

::v-deep(.speeddial-mask-demo) {
    .p-speeddial-direction-up {
        right: 0;
        bottom: 0;
    }
}
</style>


