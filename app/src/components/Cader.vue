<template>
    <div>
   
<div class="grid">
                     <div class="col-12 lg:col-6 xl:col-6">
		
		            <div class="card">
                        <div class="p-fluid grid">
                        <h2>{{enterpriseData.title}} (Année écoulée {{dateEcole}} ):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h2>
                        <br/>
                           <div class="field col-12 md:col-6">
                    <span class="p-float-label">
                        <InputNumber id="inputnumber" v-model="enterpriseData.nbTotal" />
                        <label for="inputnumber"> Nombre total</label>
                    </span>
                </div>
                   <div class="field col-12 md:col-6">
                    <span class="p-float-label">
                        <InputNumber id="inputnumber" v-model="enterpriseData.nbFemme" />
                        <label for="inputnumber"> Dont femme</label>
                    </span>
                </div>
</div>
                        
                        </div>
                        </div>
                    <div class="col-12 lg:col-6 xl:col-6">
		<div class="card">
            
             <h2> {{enterpriseData.title}} (Rappel Année précédente {{dateRappel}} ): </h2>
              <div class="p-fluid grid">
                <div class="field col-12 md:col-6">
                    <span class="p-float-label">
                        <InputNumber id="inputnumber" v-model="enterpriseData.nbTotal2" />
                        <label for="inputnumber"> Nombre total</label>
                    </span>
                </div>
                   <div class="field col-12 md:col-6">
                    <span class="p-float-label">
                        <InputNumber id="inputnumber" v-model="enterpriseData.nbFemme2" />
                        <label for="inputnumber"> Dont femme</label>
                    </span>
                </div>
             </div>
             </div>
            </div></div>
    </div>
</template>

<script>
export default {
     props: {
         enterpriseData: {type:Object,default:{nbTotal:0,nbFemme:0,nbTotal2:0,nbFemme2:0,title:''}},
         checkData:{default:true}
    },
    setup (props) {      
        const date=new Date();
        const dateEcole=date.getFullYear()
        const dateRappel=date.getFullYear()-2
   
        return {
            dateEcole,dateRappel
        }
    }
}
</script>

<style lang="scss" scoped>

</style>