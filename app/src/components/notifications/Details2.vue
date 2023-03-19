<template>
    <div class="col-12 xl:col-8">
        <div class="card">
            <div class="flex align-items-center justify-content-between mb-4">
                <h5>Details Notification</h5>
                <div>
                </div>
            </div>
            <template v-if="notification.id">
                <Chip   class="p-2 mr-2 mb-2">{{new Date(notification.created_at).toLocaleString()}}</Chip><br/>
                <h3>{{'Subject: '+notification.subject}}</h3>
                <p class="p-text">
                    {{notification.content}}
                </p>
            </template>
            <template v-else>
                <h1>Not notification selected</h1>
            </template>
        </div>      
    </div>
  </template>
  
  <script>
  import {useRoute,useRouter, onBeforeRouteUpdate, onBeforeRouteLeave} from 'vue-router'
  import {ref, onUpdated} from 'vue'
  import api from '../../api'
  export default {
      name: 'DetailsNotification',
      setup(){
          const route = useRoute()
          const notification =ref({})
          function getnotificationByID(notificationID){
            //   console.log('created = ',notificationID);
              if (notificationID !== undefined){
                  api.get('/notifications/'+notificationID+'/')
                  .then(response=>{
                      notification.value = response.data
                      console.log(response.data);
                  }).catch(error=>console.log(error))
              }
          }
          onBeforeRouteLeave((to,from)=>{
              getnotificationByID(to.params.id)
          })
          getnotificationByID(route.params.id)
          return {
              notification
          }
      }
  
  }
  </script>
  
  <style>
  
  </style>