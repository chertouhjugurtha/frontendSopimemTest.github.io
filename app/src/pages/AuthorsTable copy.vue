<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Etats de paiement clients</h6>
        <ClientsCard nom="juba"  prenom=" jugurtha" prix_ttc="255550000" num_lot="02 " nom_projet=" bella vesta"/>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <DataTable  editMode="row"  :value="client" @cell-edit-complete="onCellEditComplete" class="bg-gray-600 dark-version editable-cells-table"  v-model:editingRows="editingRows" @row-edit-save="onRowEditSave"  dataKey="id"
            :paginator="true" :rows="10" :filters="filters" :resizableColumns="true" columnResizeMode="expand" showGridlines
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
            <template #header> 
                <div class="">
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Search..." />
                    </span>
                </div>
            </template>
            
            <ColumnGroup type="header">
                <Row>
                    <Column header="Echancier de paiement"  :rowspan="2" />
                    <Column header="Date" :colspan="2" />
                    <Column header="Paiment" :colspan="2" />
                    <Column header="Ecart Paiment" :rowspan="2" />
                    <Column header="Versement Banque" :colspan="3" />
                    
                </Row>            
                <Row>
                    <Column header="Prévue" :sortable="true" field="datePrevue"/>
                    <Column header="Réaliser" :sortable="true" field="dateRealiser"/>
                    <Column header="Prévue" :sortable="true" field="paimentPrevue"/>
                    <Column header="Réaliser" :sortable="true" field="paimentRealiser"/>
                    <Column header="Date" :sortable="true" field="dateVersement"/>
                    <Column header="Montant" :sortable="true" field="montant"/>
                    <Column header="" :sortable="true" field="modification"/>
                </Row>
            </ColumnGroup>
            <Column  field="num_tranche" header="" style="width:15%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" autofocus />
                </template>
            </Column>
             <Column  field="prochaine_rdv_prevue" header="datePrevue" style="width:10%">
                <template #editor="{ data, field }">
                    <Calendar v-model="data[field]" autofocus />
                </template>
            </Column>
            <Column  field="prochaine_rdv_realise" header="dateRealiser" style="width:10%">
                <template #editor="{ data, field }">
                    <Calendar v-model="data[field]" autofocus />
                </template>
            </Column>
            <Column  field="prix_prevue" header="paimentPrevue" style="width:10%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" autofocus />
                </template>
            </Column>
            <Column field="prix_realise" header="paimentRealiser" style="width:10%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" />
                </template>
            </Column>
            <Column field="ecart_paiment" header="paimentRealiser" style="width:10%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" />
                </template>
            </Column>
            <!-- <Column field="dateVersement" header="prenom" style="width:20%">
                <template #editor="{ data, field }">
                    <Dropdown v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value" placeholder="Select a Status">
                        <template #option="slotProps">
                        
                            <span :class="'product-badge status-' + slotProps.option.value.toLowerCase()">{{slotProps.option.label}}
                            
                            </span>
                        </template>
                    </Dropdown>
                </template>
                <template #body="slotProps">
                    {{getStatusLabel(slotProps.data.inventoryStatus)}}
                </template>
            </Column> -->
            <Column field="date_versement_banque" header="Date"  style="width:10%">
                <template #editor="{ data, field }">
                    <Calendar v-model="data[field]" />
                </template>
            </Column>
            <Column field="montant_versement_banque" header="Montant" style="width:15%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" />
                </template>
            </Column>
            
            <ColumnGroup type="footer">
                <Row>
                    <Column footer="Total Paiement:" :colspan="3" footerStyle="text-align:right"/>
                    <Column :footer="totalPaiementPrevus" />
                    <Column :footer="totalPaiementRealiser" />
                    <Column :footer="totalPaiementRester" />
                
                    <Column footer="Total:" :colspan="1" footerStyle="text-align:right"/>
                    <Column :footer="totalVersement" :colspan="2" />
                    
                </Row>
            </ColumnGroup>
            <Column :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import ClientsCard from "./ClientsCard.vue";
import moment from "moment";
// import axios from "axios"
import {FilterMatchMode} from 'primevue/api';
// import { computed } from "vue";
// import { response } from "express";
export default {
    
    computed: {
        totalPaiementPrevus: function(){
        let sum= 0;
        // let sum_prix_realiser = 0;
        // let sum_prix_prevue = 0;
        // console.log(this.client)
        this.client.forEach(function(item) {
            sum += parseFloat(item.prix_prevue) ;
            // sum_prix_realiser += parseFloat(item.prix_realise) ;
        });

        return sum;
    },
    totalPaiementRealiser: function(){
            let sum = 0;
            // let sum_prix_realiser = 0;
            // let sum_prix_prevue = 0;
            // console.log(this.client)
            this.client.forEach(function(item) {
                sum += parseFloat(item.prix_realise) ;
                // sum_prix_realiser += parseFloat(item.prix_realise) ;
            });

            return sum;
    },
    totalPaiementRester: function(){
            let rest = 0;
            rest=this.totalPaiementPrevus-this.totalPaiementRealiser
            return rest;
    },
    totalVersement: function(){
            let sum = 0;
            this.client.forEach(function(item) {
                sum += parseFloat(item.montant_versement_banque) ;
                // sum_prix_realiser += parseFloat(item.prix_realise) ;
            });
            return sum;
    }
    },
    
        // setup() {
        //     let prixPrevue = this.prix_prevue;
        //     let sommePrixPrevue=0
        //     totalPaiementPrevus=computed(
        //         function() {
        //             return `${prixPrevue}+${sommePrixPrevue}`
        //         }
        //     )
                        
                
        // },
        components: {
            ClientsCard,
        },
        name: "authors-table",
        data() {
            
            return {
                editingRows: [],
                columns: null,
                client: [
            {"id": "1000","num_tranche": "f230fh0g3","prochaine_rdv_prevue": moment("2022-07-02").format('YYYY-MM-DD'),"prochaine_rdv_realise":  moment("2022-08-02").format('YYYY-MM-DD'),"prix_prevue": 160,"prix_realise": 65,"date_versement_banque":  moment("2022-09-02").format('YYYY-MM-DD'),"montant_versement_banque": 24,"inventoryStatus": "INSTOCK","rating": 5},
            {"id": "1001","num_tranche": "nvklal433","prochaine_rdv_prevue": moment("2022-07-01").format('YYYY-MM-DD'),"prochaine_rdv_realise":  moment("2022-08-02").format('YYYY-MM-DD'),"prix_prevue":200,"prix_realise": 72,"montant_versement_banque": 20,"date_versement_banque":  moment("2022-09-02").format('YYYY-MM-DD'),"inventoryStatus": "INSTOCK","rating": 4},
            {"id": "1002","num_tranche": "zz21cz3c1","prochaine_rdv_prevue": moment("2022-07-06").format('YYYY-MM-DD'),"prochaine_rdv_realise":  moment("2022-08-02").format('YYYY-MM-DD'),"prix_prevue": 300,"prix_realise": 79,"montant_versement_banque": 22,"date_versement_banque": moment("2022-09-02").format('YYYY-MM-DD'),"inventoryStatus": "LOWSTOCK","rating": 3},

        ],
                products2: null,
                products3: null,
                
                statuses: [
                    {label: 'In Stock', value: 'INSTOCK'},
                    {label: 'Low Stock', value: 'LOWSTOCK'},
                    {label: 'Out of Stock', value: 'OUTOFSTOCK'}
                ],
                filters: {
                    'ecahncierPaiment': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
                    'Nom': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
                    'Prénom': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
                    'Poids': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
                    'Taille': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
                }
            }
        },
        // productService: null,
        created() {
            // this.productService = new ProductService();

            this.initFilters();
            this.columns = [
                {field: 'ecahncierPaiment', header: 'ecahncierPaiment'},
            
            ];
            // this.selectedColumns = this.columns;
        },
        methods: {
            // onToggle(value) {
            //     this.selectedColumns = this.columns.filter(col => value.includes(col));
            // },
            getClient(){
                // axios.get("").then(
                //     this.client=response.data
                // ).catch()
            },
            onCellEditComplete(event) {
                let { data, newValue, field } = event;

                switch (field) {
                    case 'quantity':
                    case 'price':
                        if (this.isPositiveInteger(newValue))
                            data[field] = newValue;
                        else
                            event.preventDefault();
                    break;

                    default:
                        if (newValue.trim().length > 0)
                            data[field] = newValue;
                        else
                            event.preventDefault();
                    break;
                }
            },
            isPositiveInteger(val) {
                let str = String(val);
                str = str.trim();
                if (!str) {
                    return false;
                }
                str = str.replace(/^0+/, "") || "0";
                var n = Math.floor(Number(str));
                return n !== Infinity && String(n) === str && n >= 0;
            },
            onRowEditSave(event) {
                let { newData, index } = event;

                this.client[index] = newData;
            },
            getStatusLabel(status) {
                switch(status) {
                    case 'INSTOCK':
                        return 'In Stock';

                    case 'LOWSTOCK':
                        return 'Low Stock';

                    case 'OUTOFSTOCK':
                        return 'Out of Stock';

                    default:
                        return 'NA';
                }
            },
            nextPage() {

                    this.submitted = true;
                    if (this.validateForm() ) {

                        this.$store.commit('setPatient',"patient");
                        this.$emit('next-page', {formData: {num_doss: this.num_doss,nom: this.nom, prenom: this.prenom,adress: this.adress, sexe: this.sexe,date_naissance: this.date_naissance,date_dece: this.date_dece,age: this.age}, pageIndex: 0});
                        
                    }
                },
            initFilters() {
                this.filters = {
                    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                }
            }
        }
}
</script>
