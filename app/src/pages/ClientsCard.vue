<template>
  <div class="card">
    
      <Divider align="center" type="dotted">
          <h5 class=" text-danger">Calendrier des paiements </h5>
        </Divider>
       
    <Card style="width: 25rem; margin-bottom: 2em">
    
      <template #title>
        Information sur le client
      </template>
      <template #content>
        <p class="mb-2 text-lg">
          Client:
          <span class="text-dark font-weight-bold ms-sm-2">{{ client.client.nom }} {{ client.client.prenom }}
          </span>
        </p>
        <p class="mb-2 text-lg">
          Prix en T.T.C:
          <span class="text-dark ms-sm-2 font-weight-bold">{{ client.prix_TTC }} DA</span>
        </p>
        <p  v-if="client.appartement!=null"  class="mb-2 text-lg">
          N° Los:
          <span class="text-dark ms-sm-2 font-weight-bold">{{ client.appartement.num_lot }} - {{ client.appartement.type }} </span>
           -- N° box:
          <span v-if="client.appartement.box!=null" class="text-dark ms-sm-2 font-weight-bold"> {{ client.appartement.box.num_place}} </span>
         
        </p>
        <p v-if="client.box!=null" class="mb-2 text-lg">
          N° du box:
          <span  class="text-dark ms-sm-2 font-weight-bold">{{ client.box.num_place }} </span>
        </p>
        <p v-if="client.locale!=null"  class="mb-2 text-lg">
          N° du Locale:
          <span  class="text-dark ms-sm-2 font-weight-bold">{{ client.locale.num_place }} </span>
        </p>
        
        <p v-if="client.appartement!=null" class="text-lg">
              Projet:
              <span class="text-dark ms-sm-2 font-weight-bold">{{ client.appartement.residance.designation }}</span>
            </p>
            <p v-else-if="client.locale!=null" class="text-lg">
              Projet:
              <span class="text-dark ms-sm-2 font-weight-bold">{{ client.locale.residance.designation }}</span>
            </p>
            <p v-else-if="client.box!=null" class="text-lg">
              Projet:
              <span class="text-dark ms-sm-2 font-weight-bold">{{ client.box.residance.designation }}</span>
            </p>

        <div class="ms-auto text-end">
          TVA:
          <span class="text-dark ms-sm-2 front-weight-bold">{{client.TVA}}  </span>
          <!-- <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;">
              <i class="far fa-trash-alt me-2" aria-hidden="true"></i>
            </a>
            <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
              <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit
            </a> -->
        </div><br>
        <div class=" mb-2 text-lg">
          Soldé à 
        <ProgressBar  :value="(client.tranches_data.length<=0) ?100:calculePocentage(client.tranches_data)"  >
       
            <!-- Soldé à {{(parseFloat(client.last_tranche.num_tranche)/parseFloat(client.last_tranche.nbr_tranche))*100}} % -->

      </ProgressBar>
      </div>

      </template>

    </Card>
    
  </div>
</template>

<script>
  import {ref} from 'vue'
export default {
  name: "client-card",
  props: {clientItems:Object},
  setup(props){
    const client=ref()
    client.value=props.clientItems
    function calculePocentage(data){
			let len= data.length
			let tb=[]
			data.forEach(element => {
				if (element.prix_realise>=element.prix_prevue){
					tb.push(element)
				}
			});
			return parseFloat(tb.length/len*100).toFixed(2)
		}
    // console.log("clients",props.clientItems);
    return {client,calculePocentage}
  }
};
</script>
