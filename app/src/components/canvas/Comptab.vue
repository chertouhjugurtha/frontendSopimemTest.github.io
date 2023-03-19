<template>
    <div>
   

		
		            <div class="card">
                        <div class="p-fluid grid">
                        <h2> {{enterpriseData.title}}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h2>
                        <br/>
                           <div class="field col-12 md:col-6">
                    <span class="p-float-label">
                        <InputNumber id="inputnumber" v-model="enterpriseData.caP" />
                        <label for="inputnumber"> {{enterpriseData.type}} ({{dateRappel}}):</label>
                    </span>
                </div>
                   <div class="field col-12 md:col-6">
                    <span class="p-float-label">
                        <InputNumber id="inputnumber" v-model="enterpriseData.caN" />
                        <label for="inputnumber"> {{enterpriseData.type}} ({{dateEcole}}):</label>
                    </span>
                </div>
</div>
                        
                       
                   
		
            </div>
    </div>
</template>

<script>
export default {
    props: {
         enterpriseData: {type:Object,default:{caP:0,caN:0,title:'',type:''}},
         checkData:{default:true}
    },
    setup () {      
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