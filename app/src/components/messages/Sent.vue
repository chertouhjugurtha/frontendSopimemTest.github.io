<template>
<div>
    <div class="flex align-items-center justify-content-between mb-4">
        <h3 v-if="localeLang == 'ar'">{{ar.sent}}</h3>
            <h3 v-else-if="localeLang == 'fr'">{{fr.sent}}</h3>
            <h3 v-else>{{en.sent}}</h3>
      <div>
        <span class="p-input-icon-left mb-1">
            <i class="pi pi-search" />
            <InputText v-model="searchMessage" @keyup="filterMessagesBySearch()" @keydown="filterMessagesBySearch()" placeholder="Search" style="width: 100%"/>
        </span>
      </div>
      
    </div>
    <div class="mb-2">
        <!-- <span v-if="localeLang == 'ar'">{{ar.all_messages}} <Badge class="mr-2">{{searchMessage?filtredMessages.length:count}}</Badge></span> -->
        <span >{{fr.all_messages}} <Badge class="mr-2">{{searchMessage?filtredMessages.length:count}}</Badge></span>
        <!-- <span v-else>{{en.all_messages}} <Badge class="mr-2">{{searchMessage?filtredMessages.length:count}}</Badge></span> -->
    </div>

    <ul ref="sentDiv" class="p-0 mx-0 mt-0 mb-4 list-none" style="min-height:550px; height:550px; overflow: auto;">
        <template v-if="searchMessage.length>0">
            <template v-if="filtredMessages.length>0">
                <router-link v-for="message in filtredMessages" :key="message.id" :to="{name:'details','params':{id:message.id}}" >
                    <li class="flex align-items-center py-2 border-bottom-1 surface-border link-active">
                        <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <i class="pi pi-send text-xl text-blue-500"></i>
                        </div>
                        <div class="flex flex-column ml-3" style="flex-grow: 1;">
                            <div class="flex align-items-center justify-content-between mb-1">
                                

                                <span class="text-700 font-bold bg-green-100">{{message.subject}}</span>
                                <small>{{getMomentDate(message.send_at)}}</small>
                            </div>
                            <span class="text-700"></span>			
                        </div>
                    </li>
                </router-link>
            </template>
            <template v-else>
                <li class="flex align-items-center py-2 border-bottom-1 surface-border link-active">
                    <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                        <i class="pi pi-send text-xl text-blue-500"></i>
                    </div>
                    <div class="flex flex-column ml-3" style="flex-grow: 1;">
                        <div class="flex align-items-center justify-content-between mb-1">
                            <span class="text-700 font-bold">No message sent found</span>
                        </div>
                        <span class="text-700">No data to present</span>			
                    </div>
                </li>
            </template>
        </template>
        <template v-else>

            <router-link  v-for="message in listSentMessages" :key="message.id" :to="{name:'details','params':{id:message.id}}" >
                <li class="flex align-items-center py-2 border-bottom-1 surface-border link-active">
                    <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                        <i class="pi pi-send text-xl text-blue-500"></i>
                    </div>
                    <div class="flex flex-column ml-3" style="flex-grow: 1;">
                        <div class="flex align-items-center justify-content-between mb-1">
                            <span class="text-700 font-bold">{{message.subject}}</span>
                            <small>{{getMomentDate(message.send_at)}}</small>
                        </div>
                        <span :class="!message.opened?'text-900':'text-500'">{{message.content}}
                            <i v-if="message.opened" style="font-size:6px" > ✔️✔️</i>
                        </span>			
                    </div>
                </li>
            </router-link>
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
        <template v-if="!count>0">
            <li class="flex align-items-center py-2 border-bottom-1 surface-border link-active">
                <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                    <i class="pi pi-send text-xl text-blue-500"></i>
                </div>
                <div class="flex flex-column ml-3" style="flex-grow: 1;">
					<div class="flex align-items-center justify-content-between mb-1">
						<span class="text-700 font-bold">No message sent found</span>
					</div>
					<span class="text-700">No data to present</span>			
				</div>
            </li>
        </template>
    </ul>
  </div>
  
</template>

<script>
import {ref, reactive, toRefs, onMounted} from 'vue'
import {useStore} from 'vuex'
import api from '../../api'
import moment from 'moment'
export default {
    name: 'Sent',
    setup(){
        const store = useStore()
        const listSentMessages = ref([])
        const localeLang = ref(localStorage.getItem('localeLang'))
        const nextMessages=ref('')
        const scrollToLoad = ref(true)
        const count=ref(0)
        const content_clean=ref('')
        const searchMessage = ref('')
        const sendHeaders = reactive({
            ar: {
                sent: ' الصادرة',
                all_messages: 'مجموع الرسائل',
                


            },
            fr: {
                sent: 'Boîte de réception',
                all_messages: 'Total des messages',
               


            },
            en: {
                sent: 'Envoyé',
                all_messages: 'Total of messages',
                

            }
        })
        function getListOfSentMessages(){
            api.get('/messages/?sender='+store.state.user.id+'&ordering=-send_at')
            .then(response=>{
                listSentMessages.value = response.data.results.data
                count.value=response.data.count
                nextMessages.value=response.data.next
                scrollToLoad.value = false
            }).catch(error=>console.log(error))
        }
        getListOfSentMessages()
        function getMomentDate(date){
            const currentDate = new Date(date);
            const utcOffset = 1; // Algeria is UTC+1
            moment.locale(localeLang.value=='ar'?'ar-dz':localeLang.value=='fr'?'fr-fr':'en-us')
            let momentDate = moment(currentDate).fromNow()
            return momentDate
        }
        const sentDiv = ref(null)
        
        function getMoreSentMessages(){
            scrollToLoad.value = true
            sentDiv.value.onscroll = () => {
                let bottomOfWindow =  sentDiv._value.scrollHeight - sentDiv._value.scrollTop === sentDiv._value.offsetHeight;
                //alert(bottomOfWindow)
                if (bottomOfWindow) {
                    if(nextMessages.value !== null){
                        api.get(nextMessages.value)
                        .then(response=>{
                            scrollToLoad.value = false
                            listSentMessages.value.push(...response.data.results.data)
                            nextMessages.value=response.data.next
                        }).catch(error=>console.log(error))
                    }
                }
            }
        }
        const filtredMessages = ref([])
        
        function filterMessagesBySearch(){
            if(searchMessage.value.length>3){
                filtredMessages.value=listSentMessages.value.filter(message=>(message.subject.toLowerCase().indexOf(searchMessage.value.toLowerCase())!=-1) || (message.content.toLowerCase().indexOf(searchMessage.value.toLowerCase())!=-1))
                if(filtredMessages.value.length==0){
                    api.get('/messages/?search='+searchMessage.value+'&sender='+store.state.user.id+'&ordering=-send_at')
                    .then(response=>{
                        filtredMessages.value=response.data.results
                    }).catch(error=>console.log(error))
                }
            }else{
                filtredMessages.value=[]
            }
        }
        onMounted(()=>getMoreSentMessages())
        return {
            ...toRefs(sendHeaders),localeLang,listSentMessages,getMomentDate,sentDiv,scrollToLoad,searchMessage,filtredMessages,filterMessagesBySearch,count,content_clean
        }
    }

}
</script>

<style>
.link-active:hover{
    background-color: rgba(0, 0, 0, 0.1);
}
.link-active:active{
    background-color: rgba(0, 0, 0, 0.5);
}
.link-active:focus{
    background-color: rgba(0, 0, 0, 0.5);
}
:target {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>