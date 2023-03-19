<template>
    <div class="stepsdemo-content ">
        <Card>
            <template v-slot:title>
                Payment Information
            </template>
            <template v-slot:subtitle>
                Enter your card details
            </template>
            <template v-slot:footer>
                <Accordion :activeIndex="0">
                    <AccordionTab header="Caderes">
                        <Cader :enterpriseData="caders"/>
                    </AccordionTab>
                    <br />
                    <AccordionTab header="Maitrise">
                        <Cader :enterpriseData="maitrise" />
                    </AccordionTab>
                    <br />
                    <AccordionTab header="Execution">
                        <Cader :enterpriseData="execution" />
                    </AccordionTab>
                    <br />
                    <AccordionTab header="Total">
                        <Cader :enterpriseData="total" />
                    </AccordionTab>
                    <br />
                </Accordion>
                <div class="grid grid-nogutter justify-content-between">
                    <Button label="Back" @click="prevPage1()" icon="pi pi-angle-left" />
                    <Button label="Next" @click="nextPage1()" icon="pi pi-angle-right" iconPos="right" />
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import Cader from '../Cader.vue';
export default {
    components: {
        Cader
    },
    emits: ["nextpage", "prevpage"],

    setup(_, { emit }) {
        console.log("object");
        const classes = reactive([{ name: 'First Class', code: 'A', factor: 1 },
        { name: 'Second Class', code: 'B', factor: 2 },
        { name: 'Third Class', code: 'C', factor: 3 }])
        const caders = ref({
            nbTotal: 0,
            nbFemme: 0,
            nbTotal2: 0,
            nbFemme2: 0,
            

        })
        const maitrise = ref({
            nbTotal: 0,
            nbFemme: 0,
            nbTotal2: 0,
            nbFemme2: 0,
            
        })
        const execution = ref({
            nbTotal: 0,
            nbFemme: 0,
            nbTotal2: 0,
            nbFemme2: 0,
        })
        const total = ref({
            nbTotal: 0,
            nbFemme: 0,
            nbTotal2: 0,
            nbFemme2: 0,

        })
        const selectedVagon = ref('')
        const selectedSeat = ref('')


        function nextPage1() {
            console.log("object", caders);
            emit('nextpage', { formData: {}, pageIndex: 3 });

        }

        function prevPage1() {
            //console.log(emit('prevpage', {pageIndex: 1}));
            emit('prevpage', { pageIndex: 3 });
        }
        watch([total, caders, maitrise, execution], (newValues, oldValues) => {
            //  total.nbTotal.value=caders.nbTotal.value+maitrise.nbTotal.value+execution.nbTotal.value
            //  total.nbTotal2.value=caders.nbTotal2.value+maitrise.nbTotal2.value+execution.nbTotal2.value
            newValues[0].nbTotal = newValues[1].nbTotal + newValues[2].nbTotal + newValues[3].nbTotal
            newValues[0].nbTotal2 = newValues[1].nbTotal2 + newValues[2].nbTotal2 + newValues[3].nbTotal2
            newValues[0].nbFemme = newValues[1].nbFemme + newValues[2].nbFemme + newValues[3].nbFemme
            newValues[0].nbFemme2 = newValues[1].nbFemme2 + newValues[2].nbFemme2 + newValues[3].nbFemme2
        },
            {
                immediate: true,
                deep: true
            })
        return {
            caders,
            classes,
            maitrise,
            execution,
            total,
            nextPage1,
            prevPage1
        }
    }

}
</script>
