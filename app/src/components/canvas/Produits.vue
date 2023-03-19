
<template>
<div class="card">
            <h5>Default</h5>
            <TabView ref="tabview1">
                <TabPanel header="Production">
                <Productions/>
                </TabPanel>
                <TabPanel header="Intrants">
                   <Intrants/>
                </TabPanel>
                <TabPanel header="Exportation">

                   <Exportation/>
                </TabPanel>
            </TabView>
            <div class="grid grid-nogutter justify-content-between">
                    <Button label="Back" @click="prevPage1()" icon="pi pi-angle-left" />
                    <Button label="Next" @click="nextPage1()" icon="pi pi-angle-right" iconPos="right" />
                </div>
        </div>
</template>

<script>
import { ref } from 'vue';
import Productions from '../canvas/Production.vue'
import Intrants from '../canvas/Intrants.vue'
import Exportation from '../canvas/Exportation.vue'


export default {
    components: {
    Productions,
    Intrants,
    Exportation,
    Exportation
},
 emits: ["nextpage", "prevpage"],
    setup(_, { emit }) {
        const active = ref(3);

        function nextPage1() {
            // console.log("object");
            emit('nextpage', { formData: { }, pageIndex: 4 });

        }

        function prevPage1() {
            //console.log(emit('prevpage', {pageIndex: 1}));
            emit('prevpage', { pageIndex: 4 });
        }
        
        return { nextPage1, prevPage1}
    }
}
</script>

<style scoped lang="scss">
::v-deep(.tabmenudemo-content) {
    padding: 2rem 1rem;
}
</style>