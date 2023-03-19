<template>
    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                <Divider align="center" type="dotted">Ajouter des biens</Divider>
            </template>
            
            <template v-slot:content>
                
                <DataTable :value="rowsClasses" :rows="10" :paginator="true"  :rowsPerPageOptions="[10, 25, 50]"
                :filters="filters" dataKey="name" columnResizeMode="fit" showGridlines paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                responsiveLayout="scroll"
                >
                    <template #header>
                        <div class="grid  ">
                            
                            <div class="field col-12 lg:col-2 md:col-6 sm:col-6 ">
                                <span class="p-input-icon-left ">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filters['global'].value" placeholder="Recherche ... " />
                                </span>
                            </div>
                            <div class="field col-12 lg:col-2 md:col-6  sm:col-6 ">
                            </div>
                            <div class="field col-12 lg:col-2 md:col-6  sm:col-6 ">
                                <Dropdown class="p-button-outlined w-17rem" v-model="selectedTypeColumns" :options="typeClass" 
                                optionLabel="label" optionValue="value" placeholder="Appartements" @change="rowsListes($event)"/>
                            </div>
                            
                            <div class="field col-12 lg:col-2 md:col-6  sm:col-6 ">
                            </div>
                        </div>
                        
                    </template>
                    <Toolbar class="mb-4">
                        <template #start>
                            <SplitButton label="Résidences" icon="pi pi-plus" class="p-button-danger mr-2" @click="showDialogue('residence')" :model="[{label: 'Modifier',icon:'pi pi-pencil',command: ()=>{
                                openDialogueEditDrop()}}]"></SplitButton>
                            <!-- <Button label="Résidences" icon="pi pi-plus" class="p-button-danger mr-2" @click="showDialogue('residence')" /> -->
                            <Button label="Box" icon="pi pi-plus" class="p-button-danger mr-2" @click="showDialogue('box')" />
                            <Button label="Appartements" icon="pi pi-plus" class="p-button-danger mr-2" @click="showDialogue('appartement')" />
                            <Button label="Locaux" icon="pi pi-plus" class="p-button-danger mr-2" @click="showDialogue('locale')" />
                        </template>
                    </Toolbar>
                    <!-- <Column field="residance.designation" header="Nom Residence" style="width:20%">
                        <template #editor="{ data, field }">
                            <InputText v-model="data[field]" />
                        </template>
                    </Column> -->
                    
                    <Column v-for="(col, index) of selectedColumns" :field="col.field" :header="col.header"
                        :key="col.field + '_' + index" :sortable="true" style="white-space: normal !important;">
                        <template #editor="{ data, field }">
                            <InputText v-model="data[field]" />
                        </template>
                    </Column>
                    <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <SplitButton style="direction:ltr" @click="openDialogueDetail(slotProps.data.id,typeRows,'showRows')" 
                                label="Détails" icon="pi pi-eye" 
                                :model="[{label: 'Edit',icon:'pi pi-pencil',command: ()=>{
                                openDialogueDetail(slotProps.data.id,typeRows,'editRows')}},{label: 'Delete',icon:'pi pi-trash',command: ()=>{
                                confirmDrop(slotProps.data.id,typeRows)}}]" class="p-button-outlined p-button-secondary mb-2">
                            </SplitButton>
                            <!-- <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="DeleteC(slotProps.data)" /> -->
                        </template>
                    </Column>
                </DataTable>
            </template>
            
        </Card>
        <Dialog v-model:visible="showResidenceInput" :style="{ width: '450px' }" header="Renseignements sur la Résidence" :modal="true"
            class="p-fluid"><br>
            <div class="field col-12">
                <span v-show="showResidenceInput" class="p-float-label">
                    <InputText  id="designation" v-model="vAddResidance$.designation.$model" :showClear="true"
                    :class="{ 'p-invalid': vAddResidance$.designation.$invalid && submitted }" />
                    <label for="designation" :class="{ 'p-error': vAddResidance$.designation.$invalid && submitted }">Nom résidance </label>
                    <small v-if="(vAddResidance$.designation.$invalid && submitted) || vAddResidance$.designation.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>          
                </span>
               
            </div>
            <div class="field col-12">
                <span v-show="showResidenceInput"  class="p-float-label">
                   <InputText   id="address" v-model="vAddResidance$.address.$model"  :showClear="true"
                   :class="{ 'p-invalid': vAddResidance$.address.$invalid && submitted }"/>
                   <label for="address" :class="{ 'p-error': vAddResidance$.address.$invalid && submitted }">Adresse</label>
                   <small v-if="(vAddResidance$.address.$invalid && submitted) || vAddResidance$.address.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>  
                </span>
            </div>
            <div  class="field col-12">
                <span v-show="showResidenceInput"  class="p-float-label">
                    <InputNumber  showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" id="totale_app" v-model="vAddResidance$.totale_app.$model"  :showClear="true"
                   :class="{ 'p-invalid': vAddResidance$.totale_app.$invalid && submitted }"/>
                   <label for="totale_app" :class="{ 'p-error': vAddResidance$.totale_app.$invalid && submitted }">Nombres Totale d'Appartements</label>
                   <small v-if="(vAddResidance$.totale_app.$invalid && submitted) || vAddResidance$.totale_app.$pending.$response"
                        class="p-error">ce champ est obligatoire</small> 
                   
                </span>
            </div>
            
            <div  class="field col-12">
                <span v-show="showResidenceInput"  class="p-float-label">
                    <InputNumber showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="totale_box" v-model="vAddResidance$.totale_box.$model"  :showClear="true"
                   :class="{ 'p-invalid': vAddResidance$.totale_box.$invalid && submitted }"/>
                   <label for="totale_box" :class="{ 'p-error': vAddResidance$.totale_box.$invalid && submitted }">Nombres Totale des Box</label>
                   <small v-if="(vAddResidance$.totale_box.$invalid && submitted) || vAddResidance$.totale_box.$pending.$response"
                        class="p-error">ce champ est obligatoire</small> 
                    
                    
                </span>
            </div>
            <div class="field col-12">
                <span   v-show="showResidenceInput" class="p-float-label">
                    <InputNumber showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="totale_locaux" v-model="vAddResidance$.totale_locaux.$model"  :showClear="true"
                   :class="{ 'p-invalid': vAddResidance$.totale_locaux.$invalid && submitted }"/>
                   <label for="totale_locaux" :class="{ 'p-error': vAddResidance$.totale_locaux.$invalid && submitted }">Nombres Totale des locaux</label>
                   <small v-if="(vAddResidance$.totale_locaux.$invalid && submitted) || vAddResidance$.totale_locaux.$pending.$response"
                        class="p-error">ce champ est obligatoire</small> 
                   
                </span>
               
            </div>
            <div  class="field col-12">
                <span v-show="showResidenceInput"   class="p-float-label">
                    <InputNumber showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="nbr_etage" v-model="vAddResidance$.nbr_etage.$model"  :showClear="true"
                   :class="{ 'p-invalid': vAddResidance$.nbr_etage.$invalid && submitted }"/>
                   <label for="nbr_etage" :class="{ 'p-error': vAddResidance$.nbr_etage.$invalid && submitted }">Nombres Des Etages</label>
                   <small v-if="(vAddResidance$.nbr_etage.$invalid && submitted) || vAddResidance$.nbr_etage.$pending.$response"
                        class="p-error">ce champ est obligatoire</small> 
                    
                </span>
            </div>
            
            <template #footer>
                <Button v-show="showResidenceInput" label="Enregistrer" icon="pi pi-check" class="p-button-text" @click="addPropriter('residence')" />
             </template>
        </Dialog>
        <Dialog v-model:visible="showDialogueEdit" :style="{ width: '450px' }" header="Renseignements sur la Résidence" :modal="true"
            class="p-fluid"><br>
            <Divider align="center">
                <span class="p-tag">Selectioner une résidence à modifier</span>
            </Divider>
            <div class="field col-12">
                <span v-show="showDialogueEdit" class="p-float-label">
                    <Dropdown :editable="true" id="residance" v-model="Selectedresidence" :options="residanceClass"   optionLabel="designation" 
                     :showClear="true" @change="getRésidence($event)"  />
                    <!-- <InputText  id="designation" v-model="vEditResidance$.designation.$model" :showClear="true"
                    :class="{ 'p-invalid': vEditResidance$.designation.$invalid && submitted }" /> -->
                             
                </span>
               
            </div>
            <Divider align="center">
                <span class="p-tag">Modification</span>
            </Divider>
            <div class="field col-12">
                <span v-show="showDialogueEdit"  class="p-float-label">
                   <InputText   id="address" v-model="vEditResidance$.designation.$model"  :showClear="true"
                   :class="{ 'p-invalid': vEditResidance$.designation.$invalid && submitted }"/>
                   <label for="designation" :class="{ 'p-error': vEditResidance$.designation.$invalid && submitted }">Nom résidance </label>
                    <small v-if="(vEditResidance$.designation.$invalid && submitted) || vEditResidance$.designation.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>   
                </span>
            </div>
            <div class="field col-12">
                <span v-show="showDialogueEdit"  class="p-float-label">
                   <InputText   id="address" v-model="vEditResidance$.address.$model"  :showClear="true"
                   :class="{ 'p-invalid': vEditResidance$.address.$invalid && submitted }"/>
                   <label for="address" :class="{ 'p-error': vEditResidance$.address.$invalid && submitted }">Adresse</label>
                   <small v-if="(vEditResidance$.address.$invalid && submitted) || vEditResidance$.address.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>  
                </span>
            </div>
            <div  class="field col-12">
                <span v-show="showDialogueEdit"  class="p-float-label">
                    <InputNumber :editable="true" showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" id="totale_app" v-model="vEditResidance$.totale_app.$model"  :showClear="true"
                   :class="{ 'p-invalid': vEditResidance$.totale_app.$invalid && submitted }"/>
                   <label for="totale_app" :class="{ 'p-error': vEditResidance$.totale_app.$invalid && submitted }">Nombres Totale d'Appartements</label>
                   <small v-if="(vEditResidance$.totale_app.$invalid && submitted) || vEditResidance$.totale_app.$pending.$response"
                        class="p-error">ce champ est obligatoire</small> 
                </span>
            </div>
            
            <div  class="field col-12">
                <span v-show="showDialogueEdit"  class="p-float-label">
                    <InputNumber showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="totale_box" v-model="vEditResidance$.totale_box.$model"  :showClear="true"
                   :class="{ 'p-invalid': vEditResidance$.totale_box.$invalid && submitted }"/>
                   <label for="totale_box" :class="{ 'p-error': vEditResidance$.totale_box.$invalid && submitted }">Nombres Totale des Box</label>
                   <small v-if="(vEditResidance$.totale_box.$invalid && submitted) || vEditResidance$.totale_box.$pending.$response"
                        class="p-error">ce champ est obligatoire</small> 
                    
                    
                </span>
            </div>
            <div class="field col-12">
                <span   v-show="showDialogueEdit" class="p-float-label">
                    <InputNumber showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="totale_locaux" v-model="vEditResidance$.totale_locaux.$model"  :showClear="true"
                   :class="{ 'p-invalid': vEditResidance$.totale_locaux.$invalid && submitted }"/>
                   <label for="totale_locaux" :class="{ 'p-error': vEditResidance$.totale_locaux.$invalid && submitted }">Nombres Totale des locaux</label>
                   <small v-if="(vEditResidance$.totale_locaux.$invalid && submitted) || vEditResidance$.totale_locaux.$pending.$response"
                        class="p-error">ce champ est obligatoire</small> 
                   
                </span>
               
            </div>
            <div  class="field col-12">
                <span v-show="showDialogueEdit"   class="p-float-label">
                    <InputNumber showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="nbr_etage" v-model="vEditResidance$.nbr_etage.$model"  :showClear="true"
                   :class="{ 'p-invalid': vEditResidance$.nbr_etage.$invalid && submitted }"/>
                   <label for="nbr_etage" :class="{ 'p-error': vEditResidance$.nbr_etage.$invalid && submitted }">Nombres Des Etages</label>
                   <small v-if="(vEditResidance$.nbr_etage.$invalid && submitted) || vEditResidance$.nbr_etage.$pending.$response"
                        class="p-error">ce champ est obligatoire</small> 
                    
                </span>
            </div>
            
            <template #footer>
                <Button v-show="showDialogueEdit" label="Enregistrer" icon="pi pi-check" class="p-button-text" @click="editPropriter()" />
             </template>
        </Dialog>
       
        <Dialog v-model:visible="showAppartementInput" :style="{ width: '450px' }" header="Renseignements sur L'appartement " :modal="true"
            class="p-fluid">
            
            <div class="field col-12">
               <!-- {{newAppartement.residance.designation}} -->
               <!-- {{residenceSelected}} -->
                <span v-show="showAppartementInput" class="p-float-label">
                    <!-- {{newAppartement.residance.designation}} -->
                    <!-- <Dropdown  :editable="true"  id="nomResidence" v-model="newAppartement.residance.designation"  :options="residanceClass"   optionLabel="label" @change="residance($event)"/> -->
                    <Dropdown  :editable="true"   id="nomResidence" v-model="vAddAppartement$.residance.$model"  :options="residanceClass"   optionLabel="designation" @change="residance_change($event,'appartement')" />
                    <label for="nomResidence" :class="{ 'p-error': vAddAppartement$.residance.$invalid && submitted }">Nom résidance </label>
                    
                    <small v-if="(vAddAppartement$.residance.$invalid && submitted) || vAddAppartement$.residance.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                </span>
               
               
            </div>
            <Divider align="center">
                Nombre d'appartement disponible <span class="p-tag " style="font-size: 18px; border-radius: 50%;">{{nbr_app_calculer}}</span>
            </Divider>
            <div class="field col-12">
               
                <span v-show="showAppartementInput" class="p-float-label">
                    <InputText   id="type" v-model="vAddAppartement$.type.$model" />
                    <label for="type" :class="{ 'p-error': vAddAppartement$.type.$invalid && submitted }">Type </label>
                    
                    <small v-if="(vAddAppartement$.type.$invalid && submitted) || vAddAppartement$.type.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                </span>
               
            </div>
            <div  class="field col-12">
               
                <span v-show="showAppartementInput"   class="p-float-label">
                    <InputNumber id="lot"  showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"    
                            v-model="vAddAppartement$.num_lot.$model"  /> 
                           
                    <!-- <InputText  id="lot" v-model="vAddAppartement$.num_lot.$model" /> -->
                    <label for="lot" :class="{ 'p-error': vAddAppartement$.num_lot.$invalid && submitted }">N° Lot  </label>
                    
                    <small v-if="(vAddAppartement$.num_lot.$invalid && submitted) || vAddAppartement$.num_lot.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                </span>
                
            </div>
            <div class="field col-12">
                <span v-show="showAppartementInput" class="p-float-label">
                    <Dropdown :editable="true"  id="box"  v-model="vAddAppartement$.box.$model" :options="appartementsClass"  optionLabel="num_place"   />
                    
                    <label for="box" :class="{ 'p-error': vAddAppartement$.box.$invalid && submitted }">N° Box  </label>
                    
                    <small v-if="(vAddAppartement$.box.$invalid && submitted) || vAddAppartement$.box.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                </span>
            </div>
            <div  class="field col-12">
                <span v-show="showAppartementInput"   class="p-float-label">
                   <InputNumber id="nbr_etage"  showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"    
                            v-model="vAddAppartement$.etage.$model"  /> 
                           
                   <label for="nbr_etage" :class="{ 'p-error': vAddAppartement$.etage.$invalid && submitted }">N° Etage </label>
                    
                    <small v-if="(vAddAppartement$.etage.$invalid && submitted) || vAddAppartement$.etage.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                </span>
            </div>
            <div  class="field col-12">
                <span v-show="showAppartementInput"   class="p-float-label">
                    <InputNumber id="superficier"  showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"    
                    mode="decimal" suffix=" m²" v-model="vAddAppartement$.superficier.$model"  />
                    <label for="superficier" :class="{ 'p-error': vAddAppartement$.superficier.$invalid && submitted }">Superficie </label>
                    
                    <small v-if="(vAddAppartement$.superficier.$invalid && submitted) || vAddAppartement$.superficier.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                </span>
            </div>
            <div  class="field col-12">
              <span v-show="showAppartementInput"   class="p-float-label">
                  <InputNumber  id="TVA"  showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"    
                  suffix=" %" v-model="vAddAppartement$.TVA.$model"  />
                  <label for="TVA" :class="{ 'p-error': vAddAppartement$.TVA.$invalid && submitted }">TVA </label>
                  
                  <small v-if="(vAddAppartement$.TVA.$invalid && submitted) || vAddAppartement$.TVA.$pending.$response"
                      class="p-error">ce champ est obligatoire</small>
              </span>
          </div>
            <div class="field col-12">
                <!-- :style="(type_choisie.value=='AP'  || type_choisie.value=='LC' )?'display:block':'display:none'" -->
                <span v-show="showAppartementInput" class="p-float-label">
                    <InputNumber id="prix_ht"  showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"    
                    mode="currency" currency="DZD" v-model="vAddAppartement$.prix_ht.$model"  />
                    <label for="prix_ht" :class="{ 'p-error': vAddAppartement$.prix_ht.$invalid && submitted }">Prix en HT (DA) </label>
                    
                    <small v-if="(vAddAppartement$.prix_ht.$invalid && submitted) || vAddAppartement$.prix_ht.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                        
                </span>
            </div>

            <div  class="field col-12">
                <span v-show="showAppartementInput" class="p-float-label">
                    
                    <InputNumber disabled readonly  suffix=" DZD" id="prix_ttcAP" :min="0"  
                    :model-value="vAddAppartement$.prix_ttc.$model?parseFloat(vAddAppartement$.prix_ttc.$model):0" 
                   :class="{ 'p-invalid': vAddAppartement$.prix_ttc.$invalid && submitted }"/>
                   <label for="prix_ttcAP" :class="{ 'p-error': vAddAppartement$.prix_ttc.$invalid && submitted }">Prix en TTC (DA) </label>
                   
                   <small v-if="(vAddAppartement$.prix_ttc.$invalid && submitted) || vAddAppartement$.prix_ttc.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                        
                </span>
                
            </div>
            
           
            <template #footer>
                <Button :disabled="disabled_max"  label="Enregistrer" icon="pi pi-check" class="p-button-text" @click="addPropriter('appartement')" />
                <!-- <Button v-show="editRows" label="Enregistrer" icon="pi pi-check" class="p-button-text" @click="editDetail(newAppartement.id,'appartement')" /> -->
            </template>
        </Dialog>
        
        <Dialog v-model:visible="showDetailAppartementInput" :style="{width: '60%'}" header="" :modal="true" class="p-fluid">
            <br>
            <Divider align="center">
                <span class="p-tag">Residance {{ newAppartement.residance.designation }}</span>
            </Divider>
            <div class="formgrid grid">
                <!-- <div class="field col">
                    <div class="field col">
                        <label for="residance"> Totals des Biens
                        </label>
                        <p id="residance"   disabled style="border:none ; font-weight: bold;font-size: smaller;"
                        >{{ newAppartement.residance.totale_app }}--{{ newAppartement.residance.totale_box }}--{{ newAppartement.residance.totale_locaux }} </p>
                    </div>
                   
                </div> -->
                <div class="field col">
                    <div class="field col">
                        <label for="residance"> Adresse
                        </label>
                        <p id="residance"   disabled style="border:none ; font-weight: bold;font-size: smaller;"
                        >{{ newAppartement.residance.address }} -- {{ newAppartement.residance.designation }} </p>
                    </div>
                </div>
                
                
            </div>
            <Divider align="center">
                <span class="p-tag">Appartement</span>
            </Divider>
            <div class="formgrid grid">
                <div class="field col">
                    <div class="field col">
                        <label for="type_prop" > N°Lot -- Type</label>
                        <p id="type_prop"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newAppartement.num_lot }}--{{ newAppartement.type }}</p>
                    </div>
                </div>
                <div class="field col">
                    <div class="field col">
                        <label for="type_prop" >  Etage-- Surface</label>
                        <p id="type_prop"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newAppartement.etage }}--{{ newAppartement.superficier}}m²</p>
                    </div>
                </div>
                
                <div class="field col">
                    <div class="field col">
                        <label for="type_prop" > Prix Achat</label>
                        <p id="type_prop"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newAppartement.prix_achat }} DZD</p>
                    </div>
                </div>
                <div class="field col">
                    <div class="field col">
                        <label for="type_prop" > Prix HT--TVA</label>
                        <p id="type_prop"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newAppartement.prix_ht }} DZD -- {{ newAppartement.TVA }} %</p>
                    </div>

                </div>
                <div class="field col">
                    <div class="field col">
                        <label for="type_prop" > Prix TTC</label>
                        <p id="type_prop"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newAppartement.prix_ttc }} DZD</p>
                    </div>
                </div>
                
            </div>
            <Divider v-if="newAppartement.box!=null" align="center">
                <span class="p-tag">Box</span>
            </Divider>
            <div v-if="newAppartement.box!=null" class="formgrid grid">
                <div class="field col">
                    <div class="field col">
                        <label for="type_prop" >N°Box</label>
                        <p v-if="newAppartement.box!=null" id="type_prop" disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newAppartement.box.num_place }}</p>
                    </div>
                </div>
                <div class="field col">
                    <div class="field col">
                        <label for="type_prop" >  Etage-- Surface</label>
                        <p id="type_prop" v-if="newAppartement.box!=null"    disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newAppartement.box.etage }}--{{ newAppartement.box.superficier}}m²</p>
                    </div>
                </div>
                <!-- <div class="field col">
                    <div class="field col">
                        <label for="type_prop" > Prix Achat</label>
                        <p id="type_prop" v-if="newAppartement.box!=null"  disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newAppartement.box.prix_achat }} DZD</p>
                    </div>
                </div> -->
                <div class="field col">
                    <div class="field col">
                        <label for="type_prop" > Prix HT--TVA</label>
                        <p id="type_prop" v-if="newAppartement.box!=null"  disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newAppartement.box.prix_ht }} DZD -- {{ newAppartement.box.TVA }} %</p>
                    </div>

                </div>
                <div class="field col">
                    <div class="field col">
                        <label for="type_prop" > Prix TTC</label>
                        <p id="type_prop" v-if="newAppartement.box!=null"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newAppartement.box.prix_ttc }} DZD</p>
                    </div>
                </div>
                
            </div>

        </Dialog>
        <Dialog v-model:visible="showEditAppartementInput" :style="{ width: '450px' }" header="Renseignements Appartement" :modal="true"
            class="p-fluid">
            <div class="field col-12">
                
                <span  class="p-float-label">
                    <Dropdown  :editable="true"   id="nomResidence" v-model="vEditAppartement$.residance.$model"  :options="residanceClass"   optionLabel="designation"  @change="residance_change($event,'appartement')" />
                    <label for="nomResidence" :class="{ 'p-error': vEditAppartement$.residance.$invalid && submitted }">Nom résidance </label>
                    
                    <small v-if="(vEditAppartement$.residance.$invalid && submitted) || vEditAppartement$.residance.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                </span>
            </div>
            <Divider align="center">
                Nombre d'appartement disponible <span class="p-tag " style="font-size: 18px; border-radius: 50%;">{{nbr_app_edit_calculer}}</span>
            </Divider>
            <div class="field col-12">
                <span  class="p-float-label">
                    <InputText   id="type" v-model="vEditAppartement$.type.$model" />
                    <label for="type" :class="{ 'p-error': vEditAppartement$.type.$invalid && submitted }">Type </label>
                    
                    <small v-if="(vEditAppartement$.type.$invalid && submitted) || vEditAppartement$.type.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                </span>
            </div>
            <div  class="field col-12">
               
               <span   class="p-float-label">
                   <InputNumber id="lot"  showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"    
                           v-model="vEditAppartement$.num_lot.$model"  /> 
                          
                   <!-- <InputText  id="lot" v-model="vEditAppartement$.num_lot.$model" /> -->
                   <label for="lot" :class="{ 'p-error': vEditAppartement$.num_lot.$invalid && submitted }">N° Lot  </label>
                   
                   <small v-if="(vEditAppartement$.num_lot.$invalid && submitted) || vEditAppartement$.num_lot.$pending.$response"
                       class="p-error">ce champ est obligatoire</small>
               </span>
               
           </div>
           <div class="field col-12">
               <span  class="p-float-label">
                <!-- {{ appartementsClass }} -->
                   <Dropdown :editable="true"  id="box"  v-model="vEditAppartement$.box.$model.num_place" :options="appartementsClass"  optionLabel="num_place" showClear/>
                   <label for="box" :class="{ 'p-error': vEditAppartement$.box.$invalid && submitted }">N° Box  </label>
                   
                   <small v-if="(vEditAppartement$.box.$invalid && submitted) || vEditAppartement$.box.$pending.$response"
                       class="p-error">ce champ est obligatoire</small>
               </span>
           </div>
           <div  class="field col-12">
               <span   class="p-float-label">
                  <InputNumber id="nbr_etage"  showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"    
                           v-model="vEditAppartement$.etage.$model"  /> 
                          
                  <label for="nbr_etage" :class="{ 'p-error': vEditAppartement$.etage.$invalid && submitted }">N° Etage </label>
                   
                   <small v-if="(vEditAppartement$.etage.$invalid && submitted) || vEditAppartement$.etage.$pending.$response"
                       class="p-error">ce champ est obligatoire</small>
               </span>
           </div>
           <div  class="field col-12">
             
               <span    class="p-float-label">
                   <InputNumber id="superficier"  showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"    
                   mode="decimal" suffix=" m²" v-model="vEditAppartement$.superficier.$model"  />
                   <label for="superficier" :class="{ 'p-error': vEditAppartement$.superficier.$invalid && submitted }">Superficie </label>
                   
                   <small v-if="(vEditAppartement$.superficier.$invalid && submitted) || vEditAppartement$.superficier.$pending.$response"
                       class="p-error">ce champ est obligatoire</small>
               </span>
        
           </div>
           <div  class="field col-12">
             
             <span    class="p-float-label">
                 <InputNumber  id="TVA"  showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"    
                 suffix=" %" v-model="vEditAppartement$.TVA.$model"  />
                 <label for="TVA" :class="{ 'p-error': vEditAppartement$.TVA.$invalid && submitted }">TVA </label>
                 
                 <small v-if="(vEditAppartement$.TVA.$invalid && submitted) || vEditAppartement$.TVA.$pending.$response"
                     class="p-error">ce champ est obligatoire</small>
             </span>
      
         </div>
           <div class="field col-12">
               <!-- :style="(type_choisie.value=='AP'  || type_choisie.value=='LC' )?'display:block':'display:none'" -->
               <span class="p-float-label">
                   <InputNumber id="prix_ht"  showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"    
                   mode="currency" currency="DZD" v-model="vEditAppartement$.prix_ht.$model"  />
                   <label for="prix_ht" :class="{ 'p-error': vEditAppartement$.prix_ht.$invalid && submitted }">Prix en HT (DA) </label>
                   
                   <small v-if="(vEditAppartement$.prix_ht.$invalid && submitted) || vEditAppartement$.prix_ht.$pending.$response"
                       class="p-error">ce champ est obligatoire</small>
                       
               </span>
           </div>

           <div  class="field col-12">
               <span class="p-float-label">
                <!-- v-model="vEditAppartement$.prix_ttc.$model"   -->
                   <InputNumber   suffix="DA" id="prix_ttcAP" :min="0" 
                   :model-value="vEditAppartement$.prix_ttc.$model?parseFloat(vEditAppartement$.prix_ttc.$model):0" 

                   
                  :class="{ 'p-invalid': vEditAppartement$.prix_ttc.$invalid && submitted }"/>
                  <label for="prix_ttcAP" :class="{ 'p-error': vEditAppartement$.prix_ttc.$invalid && submitted }">Prix en TTC (DA) </label>
                  
                  <small v-if="(vEditAppartement$.prix_ttc.$invalid && submitted) || vEditAppartement$.prix_ttc.$pending.$response"
                       class="p-error">ce champ est obligatoire</small>
                       
               </span>
               
           </div>
            <!-- <div class="field col-12">

                <span class="p-float-label">
                    <Dropdown  :editable="true"   id="nomResidence" v-model="residenceSelected.designation"  :options="residanceClass"   optionLabel="designation" @change="residance_change($event,'appartement')" />
                    <label for="name">Nom résidance </label>
                </span>
               
               
            </div> -->
            <!-- <div class="field col-12">
               
                <span class="p-float-label">
                    <InputText   id="name" v-model="editingAppartementRows.type" />
                    <label  for="name">Type </label>
                </span>
               
            </div>
            <div  class="field col-12">
               
                <span  class="p-float-label">
                    <InputText  id="prenom" v-model="editingAppartementRows.num_lot" />
                    <label for="prenom">Lot N°</label>
                </span>
                
            </div>
            <div  class="field col-12">
                <span  class="p-float-label">
                    <Dropdown  :editable="true" :disabled="!desabledBox" id="box"  :v-model="boxSelected!=null?boxSelected.num_place:''" :options="appartementsClass"  optionLabel="num_place" @change="box_change($event)"   />
                    <label for="func">Place de Stationnement</label>
                </span>
            </div>
            <div  class="field col-12">
                <span class="p-float-label">
                   <InputText   id="nbr_etage" v-model="editingAppartementRows.etage" />
                   <label  for="nbr_etage">Etage </label>
                </span>
            </div>
            <div  class="field col-12">
              
                <span class="p-float-label">
                    <InputText  id="prenom" v-model="editingAppartementRows.superficier" />
                    <label for="prenom">Superficier </label>
                </span>
         
            </div>
            <div class="field col-12">
                :style="(type_choisie.value=='AP'  || type_choisie.value=='LC' )?'display:block':'display:none'"
                <span class="p-float-label">
                    <InputText id="func" v-model="editingAppartementRows.prix_ht" />
                    <label for="func">Prix en HT (DA)</label>
                </span>
            </div>

            <div  class="field col-12">
                <span class="p-float-label">
                    <InputText id="func" v-model="editingAppartementRows.prix_ttc" />
                    <label for="func">Prix en TTC (DA)</label>
                </span>
                
            </div> -->
            
           
            <template #footer>
                <!-- <Button v-show="!editRows" label="Save" icon="pi pi-check" class="p-button-text" @click="addPropriter('appartement')" /> -->
                <Button :disabled="disabled_max" label="Enregistrer" icon="pi pi-check" class="p-button-text" @click="editDetail(editingAppartementRows.id,'appartement')" />
            </template>
        </Dialog>
        <Dialog v-model:visible="showDetailBoxInput" :style="{width: '60%'}" header="" :modal="true" class="p-fluid">
            <br>
            <Divider align="center">
                <span class="p-tag">Residance {{ newBox.residance.designation }}</span>
            </Divider>
            <div class="formgrid grid">
                <!-- <div class="field col">
                    <div class="field col">
                        <label for="residance"> Totals des Biens
                        </label>
                        <p id="residance"   disabled style="border:none ; font-weight: bold;font-size: smaller;"
                        >{{ newAppartement.residance.totale_app }}--{{ newAppartement.residance.totale_box }}--{{ newAppartement.residance.totale_locaux }} </p>
                    </div>
                   
                </div> -->
                <div class="field col">
                    <div class="field col">
                        <label for="residance"> Adresse
                        </label>
                        <p id="residance"   disabled style="border:none ; font-weight: bold;font-size: smaller;"
                        >{{ newBox.residance.address }} -- {{ newBox.residance.designation }} </p>
                    </div>
                </div>
                
                
            </div>
            <Divider align="center">
                <span class="p-tag">Box</span>
            </Divider>
            <div class="formgrid grid">
                <div class="field col">
                    <div class="field col">

                        <label for="type_prop" > N°Lot -- Type</label>
                        <p id="type_prop"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newBox.num_place }}</p>
                    </div>
                </div>
                <div class="field col">
                    <div class="field col">
                        <label for="type_prop" >  Etage-- Surface</label>
                        <p id="type_prop"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newBox.etage }}--{{ newBox.superficier}}m²</p>
                    </div>
                </div>
                
                <!-- <div class="field col">
                    <div class="field col">
                        <label for="type_prop" > Prix Achat</label>
                        <p id="type_prop"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newBox.prix_achat }} DZD</p>
                    </div>
                </div> -->
                <div class="field col">
                    <div class="field col">
                        <label for="type_prop" > Prix HT--TVA</label>
                        <p id="type_prop"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newBox.prix_ht }} DZD -- {{ newBox.TVA }} %</p>
                    </div>

                </div>
                <div class="field col">
                    <div class="field col">
                        <label for="type_prop" > Prix TTC</label>
                        <p id="type_prop"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newBox.prix_ttc }} DZD</p>
                    </div>
                </div>
                
            </div>
            
        </Dialog>
        <Dialog v-model:visible="showBoxInput" :style="{ width: '450px' }" header="Renseignements sur Le box" :modal="true"
            class="p-fluid">
            <div class="field col-12">
                <span v-show="showBoxInput" class="p-float-label">
                    <!-- newBox.residance -->
                    <Dropdown :editable="true" id="residance" v-model="vAddBox$.residance.$model" :options="residanceClass"   optionLabel="designation"   />
                    <label for="residance" :class="{ 'p-error': vAddBox$.residance.$invalid && submitted }">Nom résidance </label>
                    <small v-if="(vAddBox$.residance.$invalid && submitted) || vAddBox$.residance.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                </span>
            </div>
            <Divider v-model:visible="showBoxInput" align="center">
                Nombre de box disponible <span class="p-tag " style="font-size: 18px; border-radius: 50%;">{{nbr_box_calculer}}</span>
            </Divider>
            <div class="field col-12">
                <span v-show="showBoxInput" class="p-float-label">
                    <InputNumber showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="num_place" v-model="vAddBox$.num_place.$model"  :showClear="true"
                   :class="{ 'p-invalid': vAddBox$.num_place.$invalid && submitted }"/>
                   <label for="nbr_etage" :class="{ 'p-error': vAddBox$.num_place.$invalid && submitted }">Numéro de Place</label>
                   <small v-if="(vAddBox$.num_place.$invalid && submitted) || vAddBox$.num_place.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                   
                </span>
            </div>
            <div  class="field col-12">
                <span v-show="showBoxInput" class="p-float-label">
                    <InputNumber suffix="m²" showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="superficier" v-model="vAddBox$.superficier.$model"  :showClear="true"
                   :class="{ 'p-invalid': vAddBox$.superficier.$invalid && submitted }"/>
                   <label for="superficier" :class="{ 'p-error': vAddBox$.superficier.$invalid && submitted }">Superficie</label>
                   <small v-if="(vAddBox$.superficier.$invalid && submitted) || vAddBox$.superficier.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>        
               </span>
            </div>
            <div class="field col-12">
                <span v-show="showBoxInput"   class="p-float-label">
                    <InputNumber  showButtons incrementButtonIcon="pi pi-plus"  decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="etage" v-model="vAddBox$.etage.$model"  :showClear="true"
                   :class="{ 'p-invalid': vAddBox$.etage.$invalid && submitted }"/>
                   <label for="etage" :class="{ 'p-error': vAddBox$.etage.$invalid && submitted }">Etage </label>
                   <small v-if="(vAddBox$.etage.$invalid && submitted) || vAddBox$.etage.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>    
                </span>
            </div>
            <div  class="field col-12">
                <span v-show="showBoxInput"  class="p-float-label">
                    <InputNumber suffix="%"  showButtons incrementButtonIcon="pi pi-plus"  decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="TVA" v-model="vAddBox$.TVA.$model"  :showClear="true"
                   :class="{ 'p-invalid': vAddBox$.TVA.$invalid && submitted }"/>
                   <label for="TVA" :class="{ 'p-error': vAddBox$.TVA.$invalid && submitted }">TVA </label>
                   <small v-if="(vAddBox$.TVA.$invalid && submitted) || vAddBox$.TVA.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                    
                </span>
            </div>
            <div  class="field col-12">
                <span v-show="showBoxInput"  class="p-float-label">
                    <InputNumber suffix="DA"  showButtons incrementButtonIcon="pi pi-plus"  decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="prix_ht" v-model="vAddBox$.prix_ht.$model"  :showClear="true"
                   :class="{ 'p-invalid': vAddBox$.prix_ht.$invalid && submitted }"/>
                   <label for="prix_ht" :class="{ 'p-error': vAddBox$.prix_ht.$invalid && submitted }">Prix en HT (DA) </label>
                   <small v-if="(vAddBox$.prix_ht.$invalid && submitted) || vAddBox$.prix_ht.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                    
                </span>
            </div>
            
            <div  class="field col-12">
                
                <span v-show="showBoxInput"  class="p-float-label">
                    <InputNumber :disabled="true" suffix="DA"  showButtons incrementButtonIcon="pi pi-plus"  decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="prix_ttc" v-model="vAddBox$.prix_ttc.$model"  :showClear="true"
                   :class="{ 'p-invalid': vAddBox$.prix_ttc.$invalid && submitted }"/>
                   <label for="prix_ttc" :class="{ 'p-error': vAddBox$.prix_ttc.$invalid && submitted }">Prix en TTC (DA) </label>
                   <small v-if="(vAddBox$.prix_ttc.$invalid && submitted) || vAddBox$.prix_ttc.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                    
                </span>
            </div>
            <template #footer>
                <Button :disabled="disabled_max" label="Enregistrer" icon="pi pi-check" class="p-button-text" @click="addPropriter('box')" />
                <!-- <Button v-show="editRows" label="Save" icon="pi pi-check" class="p-button-text" @click="editDetail(newBox.id,'box')" /> -->
            </template>
        </Dialog>
        <Dialog v-model:visible="showEditBoxInput" :style="{ width: '450px' }" header="Renseignements les boxs" :modal="true"
            class="p-fluid">
            <div class="field col-12">
                <span  class="p-float-label">
                    <!-- newBox.residance -->
                    <Dropdown :editable="true" id="residance" v-model="vEditBox$.residance.$model" :options="residanceClass"   optionLabel="designation"   />
                    <label for="residance" :class="{ 'p-error': vEditBox$.residance.$invalid && submitted }">Nom résidance </label>
                    <small v-if="(vEditBox$.residance.$invalid && submitted) || vEditBox$.residance.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                </span>
            </div>
            <Divider v-model:visible="showEditBoxInput" align="center">
                Nombre de box disponible <span class="p-tag " style="font-size: 18px; border-radius: 50%;">{{nbr_box_edit_calculer}}</span>
            </Divider>
            <div class="field col-12">
                <span class="p-float-label">
                    <InputNumber showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="num_place" v-model="vEditBox$.num_place.$model"  :showClear="true"
                   :class="{ 'p-invalid': vEditBox$.num_place.$invalid && submitted }"/>
                   <label for="nbr_etage" :class="{ 'p-error': vEditBox$.num_place.$invalid && submitted }">Numéro de Place</label>
                   <small v-if="(vEditBox$.num_place.$invalid && submitted) || vEditBox$.num_place.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                   
                </span>
            </div>
            <div  class="field col-12">
                <span class="p-float-label">
                    <InputNumber suffix="m²" showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="superficier" v-model="vEditBox$.superficier.$model"  :showClear="true"
                   :class="{ 'p-invalid': vEditBox$.superficier.$invalid && submitted }"/>
                   <label for="superficier" :class="{ 'p-error': vEditBox$.superficier.$invalid && submitted }">Superficie</label>
                   <small v-if="(vEditBox$.superficier.$invalid && submitted) || vEditBox$.superficier.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>        
               </span>
            </div>
            <div class="field col-12">
                <span class="p-float-label">
                    <InputNumber  showButtons incrementButtonIcon="pi pi-plus"  decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="etage" v-model="vEditBox$.etage.$model"  :showClear="true"
                   :class="{ 'p-invalid': vEditBox$.etage.$invalid && submitted }"/>
                   <label for="etage" :class="{ 'p-error': vEditBox$.etage.$invalid && submitted }">Etage </label>
                   <small v-if="(vEditBox$.etage.$invalid && submitted) || vEditBox$.etage.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>    
                </span>
            </div>
            <div  class="field col-12">
                <span class="p-float-label">
                    <InputNumber suffix="%"  showButtons incrementButtonIcon="pi pi-plus"  decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="TVA" v-model="vEditBox$.TVA.$model"  :showClear="true"
                   :class="{ 'p-invalid': vEditBox$.TVA.$invalid && submitted }"/>
                   <label for="TVA" :class="{ 'p-error': vEditBox$.TVA.$invalid && submitted }">TVA </label>
                   <small v-if="(vEditBox$.TVA.$invalid && submitted) || vEditBox$.TVA.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                    
                </span>
            </div>
            <div  class="field col-12">
                <span class="p-float-label">
                    <InputNumber suffix="DA"  showButtons incrementButtonIcon="pi pi-plus"  decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="prix_ht" v-model="vEditBox$.prix_ht.$model"  :showClear="true"
                   :class="{ 'p-invalid': vEditBox$.prix_ht.$invalid && submitted }"/>
                   <label for="prix_ht" :class="{ 'p-error': vEditBox$.prix_ht.$invalid && submitted }">Prix en HT (DA) </label>
                   <small v-if="(vEditBox$.prix_ht.$invalid && submitted) || vEditBox$.prix_ht.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                    
                </span>
            </div>
            
            <div  class="field col-12">
                
                <span class="p-float-label">
                    <InputNumber :disabled="true" suffix="DA"  showButtons incrementButtonIcon="pi pi-plus"  decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="prix_ttc" v-model="vEditBox$.prix_ttc.$model"  :showClear="true"
                   :class="{ 'p-invalid': vEditBox$.prix_ttc.$invalid && submitted }"/>
                   <label for="prix_ttc" :class="{ 'p-error': vEditBox$.prix_ttc.$invalid && submitted }">Prix en TTC (DA) </label>
                   <small v-if="(vEditBox$.prix_ttc.$invalid && submitted) || vEditBox$.prix_ttc.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                    
                </span>
            </div>
            <template #footer>
                <!-- <Button v-show="!editRows" label="Save" icon="pi pi-check" class="p-button-text" @click="addPropriter('box')" /> -->
                <Button v-show="editRows" label="Enregistrer" icon="pi pi-check" class="p-button-text" @click="editDetail(editingBoxRows.id,'box')" />
            </template>
        </Dialog>
        <Dialog v-model:visible="showDetailLocauxInput" :style="{width: '60%'}" header="" :modal="true" class="p-fluid">
            <br>
            <Divider align="center">
                <span class="p-tag">Residance {{ newLocaux.residance.designation }}</span>
            </Divider>
            <div class="formgrid grid">
                <!-- <div class="field col">
                    <div class="field col">
                        <label for="residance"> Totals des Biens
                        </label>
                        <p id="residance"   disabled style="border:none ; font-weight: bold;font-size: smaller;"
                        >{{ newAppartement.residance.totale_app }}--{{ newAppartement.residance.totale_box }}--{{ newAppartement.residance.totale_locaux }} </p>
                    </div>
                   
                </div> -->
                <div class="field col">
                    <div class="field col">
                        <label for="residance"> Adresse
                        </label>
                        <p id="residance"   disabled style="border:none ; font-weight: bold;font-size: smaller;"
                        >{{ newLocaux.residance.address }} -- {{ newLocaux.residance.designation }} </p>
                    </div>
                </div>
                
                
            </div>
            <Divider align="center">
                <span class="p-tag">Locale</span>
            </Divider>
            <div class="formgrid grid">
                <div class="field col">
                    <div class="field col">
                        <label for="type_prop" > N°Lot -- Type</label>
                        <p id="type_prop"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newLocaux.num_place }}</p>
                    </div>
                </div>
                <div class="field col">
                    <div class="field col">
                        <label for="type_prop" >  Etage-- Surface</label>
                        <p id="type_prop"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newLocaux.etage }}--{{ newLocaux.superficier}}m²</p>
                    </div>
                </div>
                
                <!-- <div class="field col">
                    <div class="field col">
                        <label for="type_prop" > Prix Achat</label>
                        <p id="type_prop"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newLocaux.prix_achat }} DZD</p>
                    </div>
                </div> -->
                <div class="field col">
                    <div class="field col">
                        <label for="type_prop" > Prix HT--TVA</label>
                        <p id="type_prop"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newLocaux.prix_ht }} DZD -- {{ newLocaux.TVA }} %</p>
                    </div>

                </div>
                <div class="field col">
                    <div class="field col">
                        <label for="type_prop" > Prix TTC</label>
                        <p id="type_prop"   disabled style="border:none ; font-weight: bold;font-size: smaller;" >{{ newLocaux.prix_ttc }} DZD</p>
                    </div>
                </div>
                
            </div>
            
        </Dialog>
        <Dialog v-model:visible="showLocauxInput" :style="{ width: '450px' }" header="Renseignements sur les locaux" :modal="true"
            class="p-fluid">
            <div class="field col-12">
                <span v-show="showLocauxInput" class="p-float-label">
                    <!-- newBox.residance -->
                    <Dropdown :editable="true" id="residance" v-model="vAddLocaux$.residance.$model" :options="residanceClass"   optionLabel="designation"   />
                    <label for="residance" :class="{ 'p-error': vAddLocaux$.residance.$invalid && submitted }">Nom résidance </label>
                    <small v-if="(vAddLocaux$.residance.$invalid && submitted) || vAddLocaux$.residance.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                </span>
            </div>
            <Divider align="center">
                Nombre de locaux disponible <span class="p-tag " style="font-size: 18px; border-radius: 50%;">{{nbr_locaux_calculer}}</span>
            </Divider>
            <div class="field col-12">
                <span v-show="showLocauxInput" class="p-float-label">
                    <InputNumber showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="num_place" v-model="vAddLocaux$.num_place.$model"  :showClear="true"
                   :class="{ 'p-invalid': vAddLocaux$.num_place.$invalid && submitted }"/>
                   <label for="nbr_etage" :class="{ 'p-error': vAddLocaux$.num_place.$invalid && submitted }">Numéro de Place</label>
                   <small v-if="(vAddLocaux$.num_place.$invalid && submitted) || vAddLocaux$.num_place.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                   
                </span>
            </div>
            <div  class="field col-12">
                <span v-show="showLocauxInput" class="p-float-label">
                    <InputNumber suffix="m²" showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="superficier" v-model="vAddLocaux$.superficier.$model"  :showClear="true"
                   :class="{ 'p-invalid': vAddLocaux$.superficier.$invalid && submitted }"/>
                   <label for="superficier" :class="{ 'p-error': vAddLocaux$.superficier.$invalid && submitted }">Superficie</label>
                   <small v-if="(vAddLocaux$.superficier.$invalid && submitted) || vAddLocaux$.superficier.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                   
               </span>
            </div>
            <div class="field col-12">
                <span v-show="showLocauxInput"   class="p-float-label">
                    <InputNumber  showButtons incrementButtonIcon="pi pi-plus"  decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="etage" v-model="vAddLocaux$.etage.$model"  :showClear="true"
                   :class="{ 'p-invalid': vAddLocaux$.etage.$invalid && submitted }"/>
                   <label for="etage" :class="{ 'p-error': vAddLocaux$.etage.$invalid && submitted }">Etage </label>
                   <small v-if="(vAddLocaux$.etage.$invalid && submitted) || vAddLocaux$.etage.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                   
                </span>
            </div>
            
            <div  class="field col-12">
                <span v-show="showLocauxInput"  class="p-float-label">
                    <InputNumber suffix="%"  showButtons incrementButtonIcon="pi pi-plus"  decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="TVA" v-model="vAddLocaux$.TVA.$model"  :showClear="true"
                   :class="{ 'p-invalid': vAddLocaux$.TVA.$invalid && submitted }"/>
                   <label for="TVA" :class="{ 'p-error': vAddLocaux$.TVA.$invalid && submitted }">TVA </label>
                   <small v-if="(vAddLocaux$.TVA.$invalid && submitted) || vAddLocaux$.TVA.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                    
                </span>
            </div>
            <div  class="field col-12">
                <span v-show="showLocauxInput"  class="p-float-label">
                    <InputNumber suffix="DA"  showButtons incrementButtonIcon="pi pi-plus"  decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="prix_ht" v-model="vAddLocaux$.prix_ht.$model"  :showClear="true"
                   :class="{ 'p-invalid': vAddLocaux$.prix_ht.$invalid && submitted }"/>
                   <label for="prix_ht" :class="{ 'p-error': vAddLocaux$.prix_ht.$invalid && submitted }">Prix en HT (DA) </label>
                   <small v-if="(vAddLocaux$.prix_ht.$invalid && submitted) || vAddLocaux$.prix_ht.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                    
                </span>
            </div>
            
            <div  class="field col-12">
                <span v-show="showLocauxInput"  class="p-float-label">
                    <InputNumber :disabled="true" suffix="DA"  showButtons incrementButtonIcon="pi pi-plus"  decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="prix_ttc" v-model="vAddLocaux$.prix_ttc.$model" 
                   :class="{ 'p-invalid': vAddLocaux$.prix_ttc.$invalid && submitted }"/>
                   <label for="prix_ttc" :class="{ 'p-error': vAddLocaux$.prix_ttc.$invalid && submitted }">Prix en TTC (DA) </label>
                   <small v-if="(vAddLocaux$.prix_ttc.$invalid && submitted) || vAddLocaux$.prix_ttc.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                    
                </span>
            </div>
            <template #footer>
                <!-- {{locaux.id}} -->
                 <Button :disabled="disabled_max" label="Enregistrer" icon="pi pi-check" class="p-button-text" @click="addPropriter('locaux')" />
                <!-- <Button v-show="editRows" label="Save" icon="pi pi-check" class="p-button-text" @click="editDetail(newLocaux.id,'locaux')" /> -->

            </template>
        </Dialog>
        <Dialog v-model:visible="showEditLocauxInput" :style="{ width: '450px' }" header="Renseignements Logement" :modal="true"
            class="p-fluid">
            <div class="field col-12">
                <span  class="p-float-label">
                    <!-- newBox.residance -->
                    <Dropdown :editable="true" id="residance" v-model="vEditLocaux$.residance.$model" :options="residanceClass"   optionLabel="designation"   />
                    <label for="residance" :class="{ 'p-error': vEditLocaux$.residance.$invalid && submitted }">Nom résidance </label>
                    <small v-if="(vEditLocaux$.residance.$invalid && submitted) || vEditLocaux$.residance.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                </span>
            </div>
            <Divider align="center">
                Nombre de locaux disponible <span class="p-tag " style="font-size: 18px; border-radius: 50%;">{{nbr_locaux_edit_calculer}}</span>
            </Divider>
            <div class="field col-12">
                <span  class="p-float-label">
                    <InputNumber showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="num_place" v-model="vEditLocaux$.num_place.$model"  :showClear="true"
                   :class="{ 'p-invalid': vEditLocaux$.num_place.$invalid && submitted }"/>
                   <label for="nbr_etage" :class="{ 'p-error': vEditLocaux$.num_place.$invalid && submitted }">Numéro de Place</label>
                   <small v-if="(vEditLocaux$.num_place.$invalid && submitted) || vEditLocaux$.num_place.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                   
                </span>
            </div>
            <div  class="field col-12">
                <span  class="p-float-label">
                    <InputNumber suffix="m²" showButtons incrementButtonIcon="pi pi-plus" :min="0" decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="superficier" v-model="vEditLocaux$.superficier.$model"  :showClear="true"
                   :class="{ 'p-invalid': vEditLocaux$.superficier.$invalid && submitted }"/>
                   <label for="superficier" :class="{ 'p-error': vEditLocaux$.superficier.$invalid && submitted }">Superficie</label>
                   <small v-if="(vEditLocaux$.superficier.$invalid && submitted) || vEditLocaux$.superficier.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                   
               </span>
            </div>
            <div class="field col-12">
                <span   class="p-float-label">
                    <InputNumber  showButtons incrementButtonIcon="pi pi-plus"  decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="etage" v-model="vEditLocaux$.etage.$model"  :showClear="true"
                   :class="{ 'p-invalid': vEditLocaux$.etage.$invalid && submitted }"/>
                   <label for="etage" :class="{ 'p-error': vEditLocaux$.etage.$invalid && submitted }">Etage </label>
                   <small v-if="(vEditLocaux$.etage.$invalid && submitted) || vEditLocaux$.etage.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                   
                </span>
            </div>
            <div  class="field col-12">
                <span  class="p-float-label">
                    <InputNumber suffix="%"  showButtons incrementButtonIcon="pi pi-plus"  decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="TVA" v-model="vEditLocaux$.TVA.$model"  :showClear="true"
                   :class="{ 'p-invalid': vEditLocaux$.TVA.$invalid && submitted }"/>
                   <label for="TVA" :class="{ 'p-error': vEditLocaux$.TVA.$invalid && submitted }">TVA </label>
                   <small v-if="(vEditLocaux$.TVA.$invalid && submitted) || vEditLocaux$.TVA.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                    
                </span>
            </div>
            <div  class="field col-12">
                <span   class="p-float-label">
                    <InputNumber suffix="DA"  showButtons incrementButtonIcon="pi pi-plus"  decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="prix_ht" v-model="vEditLocaux$.prix_ht.$model"  :showClear="true"
                   :class="{ 'p-invalid': vEditLocaux$.prix_ht.$invalid && submitted }"/>
                   <label for="prix_ht" :class="{ 'p-error': vEditLocaux$.prix_ht.$invalid && submitted }">Prix en HT (DA) </label>
                   <small v-if="(vEditLocaux$.prix_ht.$invalid && submitted) || vEditLocaux$.prix_ht.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                    
                </span>
            </div>
            
            <div  class="field col-12">
                <span  class="p-float-label">
                    <InputNumber :disabled="true" suffix="DA"  showButtons incrementButtonIcon="pi pi-plus"  decrementButtonIcon="pi pi-minus" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"   id="prix_ttc" v-model="vEditLocaux$.prix_ttc.$model" 
                   :class="{ 'p-invalid': vEditLocaux$.prix_ttc.$invalid && submitted }"/>
                   <label for="prix_ttc" :class="{ 'p-error': vEditLocaux$.prix_ttc.$invalid && submitted }">Prix en TTC (DA) </label>
                   <small v-if="(vEditLocaux$.prix_ttc.$invalid && submitted) || vEditLocaux$.prix_ttc.$pending.$response"
                        class="p-error">ce champ est obligatoire</small>
                    
                </span>
            </div>
            <template #footer>
                <!-- {{locaux.id}} -->
                 <!-- <Button v-show="!editRows" label="Save" icon="pi pi-check" class="p-button-text" @click="addPropriter('locaux')" /> -->
                <Button :disabled="disabled_max"  label="Enregistrer" icon="pi pi-check" class="p-button-text" @click="editDetail(editingLocauxRows.id,'locale')" />

            </template>
        </Dialog>
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <!-- iiiiiiiiiiiiiiiii -->
        <!-- <Dialog  v-model:visible="dialogDetail" :style="{ width: '700px' }" header='mmmm ' :modal="true"
            class="p-fluid">
            <div>
                jjjjjjjjjjjj
            </div>
        </Dialog> -->
        <!-- iiiiiiiiiiiiiii -->
      
    </div>
</template>

<script>
import { Vue,eactive,computed, ref,toRefs,watchEffect,watch } from 'vue'
import api from '../api'
import { FilterMatchMode } from "primevue/api";

// import { useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'
// import moment from "moment";
import { useStore } from 'vuex';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { email, required,numeric, url, minLength, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
// import { FilterMatchMode } from 'primevue/api';
export default {
    emits: ["nextpage", "prevpage"],

    setup(_, { emit }) {
    //    variables
        const filters = ref({
                    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
                  })
        const rulesAppartement = {
            TVA: { required,numeric },
            box: { },
            etage: { required,numeric },
            num_lot: { required },
            prix_achat: { required },
            prix_ht: { required,numeric },
            prix_ttc: { numeric },
            residance: { required },
            superficier: { required },
            type: { required },
        }
        const addTypeCatiShow=ref(false)
        const rulesResidance= {
            address: { required},
            designation: { required},
            nbr_etage: { numeric },
            totale_box: { required,numeric },
            totale_app: { required,numeric },
            totale_locaux: { required,numeric },
           
        }
        const rulesBox = {
            TVA: { required,numeric },
            etage: { numeric: { allowNegative: true }},
            num_place: { required,numeric },
            prix_achat: { numeric },
            prix_ht: { required,numeric },
            prix_ttc: { numeric },
            residance: { required },
            superficier: { required,numeric },
           
        }
        const rulesLocaux = {
            TVA: { required,numeric },
            etage: { numeric: { allowNegative: true }},
            num_place: { required,numeric },
            prix_achat: { numeric },
            prix_ht: { required,numeric },
            prix_ttc: { numeric },
            residance: { required },
            superficier: { required,numeric },
           
        }
        const store=useStore()
        const confirm = useConfirm();
        const toast = useToast();
        const localeLang=ref(store.state.user.localeLang)

        
        const showDialogueRows = ref(false)
        const showResidenceInput = ref(false)
        const showAppartementInput = ref(false)
        const showBoxInput = ref(false)
        const showLocauxInput = ref(false)

        const showEditAppartementInput = ref(false)

        const showEditBoxInput = ref(false)
        const showEditLocauxInput = ref(false)
        const showDetailAppartementInput = ref(false)

        const showDetailBoxInput = ref(false)
        const showDetailLocauxInput = ref(false)
        
        
        const editingResidenceRows = ref(null) 
        const disabled_max=ref(false)
        
        const desabledInputs=ref(false)
        const nbr_app_calculer=ref(0)
        const nbr_app_edit_calculer=ref(0)
        const nbr_box_calculer=ref(0)
        const nbr_box_edit_calculer=ref(0)
        const nbr_locaux_calculer=ref(0)
        const nbr_locaux_edit_calculer=ref(0)

        // const newResidence= ref({})
        // const residance=ref()
        const newAppartement= ref({
            TVA: 0,
            box: '',
            etage: 0,
            num_lot: 0,
            prix_achat: 0,
            prix_ht: 0,
            prix_ttc: 0,
            residance: '',
            superficier:0,
            type: '',
        })
        const editAppartement= ref({
            TVA: 0,
            box: '',
            etage: 0,
            num_lot: 0,
            prix_achat: 0,
            prix_ht: 0,
            prix_ttc: 0,
            residance: '',
            superficier:0,
            type: '',
        })
        const newBox= ref({
            TVA: 0,
            etage: -1,
            num_place: 0,
            prix_achat: 0,
            prix_ht: 0,
            prix_ttc: 0,
            residance: '',
            superficier: 0,
        
        })
        const editBox= ref({
            TVA: 0,
            etage: -1,
            num_place: 0,
            prix_achat: 0,
            prix_ht: 0,
            prix_ttc: 0,
            residance: '',
            superficier: 0,
        
        })
        const newLocaux= ref({
            TVA: 0,
            etage: 0,
            num_place: 0,
            prix_achat: 0,
            prix_ht: 0,
            prix_ttc: 0,
            residance: '',
            superficier: 0,
        })
        const editLocaux= ref({
            TVA: 0,
            etage: 0,
            num_place: 0,
            prix_achat: 0,
            prix_ht: 0,
            prix_ttc: 0,
            residance: '',
            superficier: 0,
        })
        const newResidence=ref({
            address: "",
            designation: "",
            nbr_etage: 0,
            totale_box: 0,
            totale_app: 0,
            totale_locaux: 0,
        })
        const editResidence=ref({
            address: "",
            designation: "",
            nbr_etage: 0,
            totale_box: 0,
            totale_app: 0,
            totale_locaux: 0,
        })
        // const newBox=ref({residance:{designation:""}})
        // const newLocaux=ref({residance:{designation:""}})
        
        const vAddResidance$ = useVuelidate(rulesResidance, newResidence);
        const vEditResidance$ = useVuelidate(rulesResidance, editResidence);
        const vAddAppartement$ = useVuelidate(rulesAppartement, newAppartement);
        const vEditAppartement$ = useVuelidate(rulesAppartement, editAppartement);
        const vAddBox$ = useVuelidate(rulesBox, newBox);
        const vEditBox$ = useVuelidate(rulesBox, editBox);
        const vAddLocaux$ = useVuelidate(rulesLocaux, newLocaux);
        const vEditLocaux$ = useVuelidate(rulesLocaux, editLocaux);
        const residenceEdit=ref()

        const editingAppartementRows = ref({residance:{designation:""},box:{num_place:""}})
        const editingBoxRows = ref({residance:{designation:""}})
        const editingLocauxRows=ref({residance:{designation:""}})

        const rowsClasses = ref([])
        const residanceClass=ref([])
        const appartementsClass=ref([])
        const contrat_date=ref(new Date().toLocaleDateString())
        const type_choisie=ref('')
        const typeClass=ref([
                    {label: 'Appartements', value: 'appartements'},
                    {label: 'Box', value: 'box'},
                    {label: 'Locale', value: 'locaux'}
                ])
        const boxClass=ref([])
        const residenceSelected=ref({designation:"",id:""})
        const boxSelected=ref({num_place:"",id:""})
       
        // contrat_date.appContext.config.globalProperties.$moment(res.data.contratDate).format('DD-MM-YYYY')
        
        // newClient.contratDate=contrat_date.appContext.config.globalProperties.$moment(classes[0].contratDate).format('DD-MM-YYYY')
        
        const columns = ref([
            // {field: 'name', header: 'Name'},
                // { field: 'biens', header: 'Type du Biens' },
                // { field: 'type', header: 'Type' },
                // { field: 'num_lot_app', header: 'N°Lot APP' },
                // { field: 'place_stationnement_app', header: 'Box appartement' },
                { field: 'num_lot_loc', header: 'N°Lot Locale' },
                { field: 'place_stationnement_box', header: 'Box à vendre' },

            ])
        const selectedColumns = ref(null)
        const selectedTypeColumns=ref('appartements')
        const dialogDetail=ref(false)

        // Functions
        function get_residances(){
            api.get('/residence/').then(response=>{
                    residanceClass.value=response.data.results
                    // response.data.results.forEach((element) => {
                    //     residanceClass.value.push({designation: element.designation,id:element.id})
                        
                    // })
                })
                .catch(error=>{
                    errormessage.value=error.response.data
                    console.log(errormessage.value.nom);
                    toast.add({severity:'error', summary: 'Error', detail: 'unable to create new gerant : '+error.message+' :\n'+errormessage.value, life: 4000});
            })
        }
        function get_boxs(residance){
            
            // console.log(residance.value.id);
            if (residance.value.id!="") api.get('/box/',{params:{residance:residance.value.id,edit:'edit'}}).then(response=>{
                appartementsClass.value=[]
                appartementsClass.value= response.data
                // .forEach((element) => {
                //     appartementsClass.value.push({num_place: element.num_place,id:element.id})
                    
                // })
            })
            .catch(error=>{
                errormessage.value=error.response.data
                toast.add({severity:'error', summary: 'Error', detail: 'unable to create new gerant : '+error.message+' :\n'+errormessage.value, life: 4000});
            })
           
            else {
                api.get('/box/').then(response=>{
                    // console.log(response);
                    appartementsClass.value=[]
                    response.data.forEach((element) => {
                        appartementsClass.value.push({num_place: element.num_place,id:element.id})
                    })
                })
                .catch(error=>{
                    errormessage.value=error.response.data
                    console.log(errormessage.value.nom);
                    toast.add({severity:'error', summary: 'Error', detail: 'unable to create new gerant : '+error.message+' :\n'+errormessage.value, life: 4000});
                })
            }
               
        }
    

        const typeRows=ref("")
        
        function rowsListes(event){
            // typeof
            if (typeof(event)=="object"){
                localStorage.setItem("tablesRows",event.value)

            }
            else{
                localStorage.setItem("tablesRows",event)
            }
            if (event!=undefined ||event!=null ){
                if (event.value=="appartements" || event=="appartements"){
                    // editAppartement.value={}
                    
                    typeRows.value=event.value=="appartements"?event.value:event
                    api.get('/appartements/').then(response=>{
                        // console.log("appartements data",response.data);
                        selectedColumns.value=null
                        columns.value=[
                            {field:"residance.designation",header:"Residance"},
                            { field: 'num_lot', header: 'N°Lot APP' },
                            { field: 'type', header: 'Type' },
                            { field: 'box.num_place', header: 'Box' },
                            // { field: 'prix_achat', header: 'Prix de vente' },
                            { field: 'prix_ht', header: 'Prix HT' },
                            { field: 'prix_ttc', header: 'Prix TTC' },
                            { field: 'TVA', header: 'TVA' },
                            { field: 'superficier', header: 'Superficier' },
                        ]
                        rowsClasses.value=response.data
                        selectedColumns.value=columns.value
                    }).catch(error=>{
                    
                    toast.add({severity:'error', summary: 'Error', detail: 'Pas d\'appartement à afficher a cause que le serveur de repond pas!!\n'+error.message, life: 4000});
                     })
                }
                if (event.value=="box" || event=="box"){
                    typeRows.value=event.value=="box"?event.value:event
                    api.get('/box/').then(response=>{
                        selectedColumns.value=null
                        columns.value=[ 
                            {field:"residance.designation",header:"Residance"},
                            { field: 'num_place', header: 'Box à vendre' },
                            // { field: 'prix_achat', header: 'Prix' },
                            { field: 'prix_ht', header: 'Prix HT' },
                            { field: 'prix_ttc', header: 'Prix TTC' },
                            { field: 'TVA', header: 'TVA' },
                            { field: 'superficier', header: 'Superficier' },
                        ]
                        rowsClasses.value=response.data
                        selectedColumns.value=columns.value
                    }).catch(error=>{               
                        toast.add({severity:'error', summary: 'Error', detail: 'Pas de box à afficher a cause que le serveur de repond pas!!\n'+error.message, life: 4000})
                     })
                }
                if (event.value=="locaux" || event=="locaux"){
                    typeRows.value=event.value=="locaux"?event.value:event
                    api.get('/locaux/').then(response=>{
                        // console.log("box data",response.data);
                        selectedColumns.value=null
                        columns.value=[
                        {field:"residance.designation",header:"Residance"},

                            {field: 'num_place', header: 'N°Lot Locale'},
                            // { field: 'prix_achat', header: 'Prix' },
                            { field: 'prix_ht', header: 'Prix HT' },
                            { field: 'prix_ttc', header: 'Prix TTC' },
                            { field: 'TVA', header: 'TVA' },
                            { field: 'superficier', header: 'Superficier' }

                        ]
                        rowsClasses.value=response.data
                        selectedColumns.value=columns.value
                    }).catch(error=>{
                    errormessage.value=error.response.data
                    toast.add({severity:'error', summary: 'Error', detail: 'unable to create new gerant : '+error.message+' :\n'+errormessage.value, life: 4000});
                     })
                }
            }else{
                typeRows.value='appartements'
                api.get('/appartements/').then(response=>{// console.log("appartements data",response.data);
                    selectedColumns.value=null
                    columns.value=[
                        {field:"residance.designation",header:"Residance"},

                        { field: 'type', header: 'Type' },
                        { field: 'num_lot', header: 'N°Lot APP' },
                        { field: 'box.num_place', header: 'Box' },
                        { field: 'prix_achat', header: 'Prix de vente' },
                        { field: 'prix_ht', header: 'Prix HT' },
                        { field: 'prix_ttc', header: 'Prix TTC' },
                        { field: 'TVA', header: 'TVA' },
                        { field: 'superficier', header: 'Superficier' },
                    ]
                    rowsClasses.value=response.data
                    selectedColumns.value=columns.value
                    }).catch(error=>{
                   
                    toast.add({severity:'error', summary: 'Error', detail: 'Pas de locaux à afficher a cause que le serveur de repond pas!!\n '+error.message, life: 4000});
                })
            }
            // api.get('/add-rows-listes/').then(response=>{
            //     // console.log(response.data)
            //     rowsClasses.value=response.data
            //         // response.data.results.forEach((element) => {
            //         //     residanceClass.value==
            //         // })
            //     })
            //     .catch(error=>{
            //         errormessage.value=error.response.data
            //         console.log(errormessage.value.nom);
            //         toast.add({severity:'error', summary: 'Error', detail: 'unable to create new gerant : '+error.message+' :\n'+errormessage.value, life: 4000});
            // })
        }
        const desabledBox=ref(false)
        function residance_change(event,typeRows){
            get_residances()
            if (typeRows=="appartement"){
                residenceSelected.value=event.value
                rowsListes("appartements")
                desabledBox.value=true
                api.get('/box/',{params:{residance:event.value.id}}).then(response=>{
                        appartementsClass.value=[]
                        response.data.forEach((element) => {
                            appartementsClass.value.push({num_place: element.num_place,id:element.id})
                        })
                    }).catch(error=>{
                        toast.add({severity:'error', summary: 'Error', detail: 'erreur : '+error.message, life: 4000});
                })
            }
            if(typeRows=="box" ){
                rowsListes("box")
            }
            if(typeRows=="locale"){
                rowsListes("locaux")
            }
        }
        function box_change(event){
            boxSelected.value=event.value
        }
        if (localStorage.getItem("tablesRows")!=null){

            selectedTypeColumns.value=localStorage.getItem("tablesRows")
            rowsListes(selectedTypeColumns.value)
        }else{
            rowsListes(selectedTypeColumns.value)
        }
        
        const submitted = ref(false);
        function editDetail(id,typeRows){
            // residenceSelected.value=""
            // boxSelected.value=""
            if (typeRows=="appartement"){
                // editingAppartementRows.value.residance=residenceSelected
                // editingAppartementRows.value.box=boxSelected
                // editAppartement.value
                // console.log(editingAppartementRows.value);
                if (!vEditAppartement$.value.$invalid) api.put('/appartements/', editAppartement.value)
                 .then(response => {
                    rowsListes("appartements")
                    showEditAppartementInput.value = false;
                    toast.add({severity:'success', summary: 'Successful',
                    detail: response.data.designation+'Modify Successfully', life: 1000});
                })
                .catch(function (error) {
                    console.log(error.response)
                })
                else submitted.value=true
                
            }if (typeRows=="box" ){
                // newBox.value={}
                //showEditBoxInput.value=true
                //get_residances()
                // rowEditDetail.value={}
                // newBox.value = rowsClasses.value.find(row=>row.id==id)
                // console.log("------> avant:----",newBox.value);
                // newAppartement.value.residance.designation=residenceSelected

                editingBoxRows.value.residance=residenceSelected
                if (!vEditBox$.value.$invalid) api.put('/box/', editBox.value)
                 .then(response => {
                    rowsListes("box")
                    showEditBoxInput.value=false
                    // residenceSelected.value=""
                 toast.add({severity:'success', summary: 'Successful', detail: response.data.designation+'Modify Successfully', life: 1000});
                })
                .catch(function (error) {
                 toast.add({severity:'error', summary: 'Error', detail:'Vous ne pouvais pas modifier ce box'+error.message, life: 4000});

                    console.log(error.response)
                })
                else submitted.value=true
            }if (typeRows=="locale"){
                // newLocaux.value={}
               // showEditLocauxInput.value=true
                //get_residances()
                // rowEditDetail.value={}
                // editingLocauxRows.value = rowsClasses.value.find(row=>row.id==id) 
                // editingLocauxRows.value.residance=newLocaux.value.residance
                api.put('/locaux/'+id+'/', editLocaux.value)
                 .then(response => {
                    rowsListes("locaux")
                    showEditLocauxInput.value=false
                    // residenceSelected.value=""
                 toast.add({severity:'success', summary: 'Successful', detail: response.data.designation+'Modify Successfully', life: 1000});
                })
                .catch(function (error) {
                    console.log(error.response)
                })
            }
        }
        const editRows=ref(false)
        function openDialogueDetail(id,typeRows,operation){
            // residenceSelected.value=""
            // boxSelected.value=""
            // get_residances()
            if (operation=="editRows"){
                editRows.value=true
            }
            else{
                editRows.value=false 
            } 
            if (typeRows=="appartements" ||selectedTypeColumns.value=="appartements"){
                desabledBox.value=false
                // get_boxs()
                if(operation=="editRows"){
                    editingAppartementRows.value={}
                    showEditAppartementInput.value=true
                    get_residances()
                   
                    // editingAppartementRows.value=rowsClasses.value.find(row=>row.id==id)
                    editAppartement.value=rowsClasses.value.find(row=>row.id==id)
                    
                    residenceSelected.value=editAppartement.value.residance
                    boxSelected.value=editAppartement.value.residance
                   if (rowsClasses.value.find(row=>row.id==id).box==null) 
                   editAppartement.value.box={ id: "", residance: { }, num_place: "", vendus: null, created_at: "", prix_ht: 0, prix_ttc: 0, prix_achat: 0, TVA: 0, superficier: 0, etage: "" } 
                    // boxSelected.value=
                  
                   
                //    else boxSelected.value=editAppartement.value.box.residance
                   get_boxs(boxSelected)
                    
                }else if(operation=="showRows"){
                    newAppartement.value={}
                    showDetailBoxInput.value=false
                    showDetailLocauxInput.value=false
                    showDetailAppartementInput.value=true
                    newAppartement.value=rowsClasses.value.find(row=>row.id==id)
                    
                    residenceSelected.value=newAppartement.value.residance
                    boxSelected.value=newAppartement.value.box
                }
                else{
                    newAppartement.value={}
                    showAppartementInput.value=true
                    // rowEditDetail.value={}
                    // rowEditDetail.value = rowsClasses.value.find(row=>row.id==id)
                    newAppartement.value=rowsClasses.value.find(row=>row.id==id)
                    
                    residenceSelected.value=newAppartement.value.residance
                    boxSelected.value=newAppartement.value.box
                }
                // console.log("------------>",residenceSelected.value);
                // console.log("new APP",newAppartement.value);
            }if (typeRows=="box" ||selectedTypeColumns.value=="box"){
                if(operation=="editRows"){
                    editingBoxRows.value={}
                    showEditBoxInput.value=true
                    get_residances()
                    editBox.value=rowsClasses.value.find(row=>row.id==id) 
                    residenceSelected.value=editBox.value.residance
                }else if(operation=="showRows"){
                    newBox.value={}
                    showDetailBoxInput.value=false
                    showDetailAppartementInput.value=false
                    showDetailBoxInput.value=true
                    newBox.value = rowsClasses.value.find(row=>row.id==id) 
                    residenceSelected.value=newBox.value.residance
                }
                else{
                    newBox.value={}
                    showBoxInput.value=true
                    newBox.value = rowsClasses.value.find(row=>row.id==id) 
                    residenceSelected.value=newBox.value.residance
                }
                // rowEditDetail.value={}
            }if (typeRows=="locaux" ||selectedTypeColumns.value=="locaux"){
                if(operation=="editRows"){
                    editingLocauxRows.value={}
                    showEditLocauxInput.value=true
                    get_residances()
                    console.log(rowsClasses.value,"jjjjjjjjjjjj");
                    editLocaux.value = rowsClasses.value.find(row=>row.id==id) 
                    residenceSelected.value=editLocaux.value.residance
                }else if(operation=="showRows"){
                    newLocaux.value={}
                    showDetailBoxInput.value=false
                    showDetailAppartementInput.value=false
                    showDetailLocauxInput.value=true
                    newLocaux.value = rowsClasses.value.find(row=>row.id==id) 
                    residenceSelected.value=newLocaux.value.residance
                }
                else{
                    newLocaux.value={}
                    showLocauxInput.value=true
                    newLocaux.value = rowsClasses.value.find(row=>row.id==id) 
                    residenceSelected.value=newLocaux.value.residance
                }
                // rowEditDetail.value={}
            }

            // dialogDetail.value=true
            // desabledInputs.value=true
            // rowsListes()
        }
        function resetFormResidance (){
            vAddResidance$.value.address.$model="";
            vAddResidance$.value.designation.$model="";
            vAddResidance$.value.nbr_etage.$model=0;
            vAddResidance$.value.totale_box.$model=0;
            vAddResidance$.value.totale_app.$model=0;
            vAddResidance$.value.totale_locaux.$model=0;
        };
        function resetFormAppartement (){
            
            vAddAppartement$.value.TVA.$model= 0
            vAddAppartement$.value.box.$model= ""
            vAddAppartement$.value.etage.$model= 0
            vAddAppartement$.value.num_lot.$model= 0
            vAddAppartement$.value.prix_achat.$model= 0
            vAddAppartement$.value.prix_ht.$model= 0
            // vAddAppartement$.value.prix_ttc.$model= 0
            vAddAppartement$.value.residance.$model= ""
            vAddAppartement$.value.superficier.$model=0
            vAddAppartement$.value.type.$model= ""
            
        };
        function resetFormBox (){
            vAddBox$.value.TVA.$model= 0
            vAddBox$.value.etage.$model= 0
            vAddBox$.value.num_place.$model= 0
            vAddBox$.value.prix_achat.$model= 0
            vAddBox$.value.prix_ht.$model= 0
            // vAddBox$.value.prix_ttc.$model= 0
            vAddBox$.value.residance.$model= ''
            vAddBox$.value.superficier.$model= 0
            
        };
        function resetFormLocaux (){
            vAddLocaux$.value.TVA.$model= 0
            vAddLocaux$.value.etage.$model= 0
            vAddLocaux$.value.num_place.$model= 0
            vAddLocaux$.value.prix_achat.$model= 0
            vAddLocaux$.value.prix_ht.$model= 0
            // vAddLocaux$.value.prix_ttc.$model= 0
            vAddLocaux$.value.residance.$model= ''
            vAddLocaux$.value.superficier.$model= 0
        };

        function showDialogue(type) {
            // console.log("type",type);
            // showDialogueRows.value = true;
            // residenceSelected.value=""
            // boxSelected.value=""
            // editRows.value=false

            if (type=='residence') {
                // vAddResidance$.value.$model = '';
                resetFormResidance()
                // vAddResidance$.value.$resetValidation()
                showResidenceInput.value=true
                showAppartementInput.value=false
                showBoxInput.value=false
                showLocauxInput.value=false
            }
            else{  
                get_residances()
            }
            if(type=='appartement'){
                // a=residance
                // console.log("newAppartement.residance",newAppartement.residance)
                
                // resetFormAppartement()
                localStorage.setItem("tablesRows", 'appartements');
                rowsListes('appartements');
                newAppartement.value={}
                showAppartementInput.value=true
                showResidenceInput.value=false
                showBoxInput.value=false
                showLocauxInput.value=false
            }
            if(type=='box'){
                localStorage.setItem("tablesRows", 'box');
                rowsListes('box');
                resetFormBox()
                newBox.value={}
                showBoxInput.value=true
                showResidenceInput.value=false
                showAppartementInput.value=false
                showLocauxInput.value=false
            }
            if(type=='locale'){
                localStorage.setItem("tablesRows", 'locaux');
                rowsListes('locaux');
                resetFormLocaux()
                newLocaux.value={}
                showLocauxInput.value=true
                showBoxInput.value=false
                showResidenceInput.value=false
                showAppartementInput.value=false
            }
        }
        
        function addPropriter(type){
            if (type=='residence') {
                if (!vAddResidance$.value.$invalid){ 

                newResidence.value.address=vAddResidance$.value.address.$model
                newResidence.value.designation=vAddResidance$.value.designation.$model
                newResidence.value.nbr_etage=vAddResidance$.value.nbr_etage.$model
                newResidence.value.totale_box=vAddResidance$.value.totale_box.$model
                newResidence.value.totale_app=vAddResidance$.value.totale_app.$model
                newResidence.value.totale_locaux=vAddResidance$.value.totale_locaux.$model

                // console.log(newResidence.value,"hhhhhhhh");
                api.post('/residence/',newResidence.value)
                .then(response=>{
                    toast.add({severity:'success', summary: 'Successful', detail: 'gerant created Successfully', life: 1000});
                    setTimeout(()=>{
                        rowsListes(selectedTypeColumns.value),
                        showResidenceInput.value = false;
                    },500)
                })
                .catch(error=>{
                    errormessage.value=error.response.data
                    toast.add({severity:'error', summary: 'Error', detail: 'unable to create new gerant : '+error.message+' :\n'+errormessage.value, life: 4000});
                })  
                }else {submitted.value = true;}
            }
            if (type=='appartement') {
                vAddAppartement$.value.prix_achat.$model= 0
                if (!vAddAppartement$.value.$invalid){ 
                    // newAppartement.value.prix_achat=newAppartement.value.prix_ttc
                    // newAppartement.value.TVA=0
                    // vAddAppartement$.value.prix_achat.$model= 0

                    newAppartement.value.TVA=vAddAppartement$.value.TVA.$model
                    if (vAddAppartement$.value.box.$model==undefined){
                        newAppartement.value.box=""
                    }else{
                        newAppartement.value.box=vAddAppartement$.value.box.$model.id

                    }
                    newAppartement.value.etage=vAddAppartement$.value.etage.$model
                    newAppartement.value.num_lot=vAddAppartement$.value.num_lot.$model
                    newAppartement.value.prix_achat=vAddAppartement$.value.prix_achat.$model
                    newAppartement.value.prix_ht=vAddAppartement$.value.prix_ht.$model
                    newAppartement.value.prix_ttc=vAddAppartement$.value.prix_ttc.$model
                    newAppartement.value.residance=vAddAppartement$.value.residance.$model.id
                    newAppartement.value.superficier=vAddAppartement$.value.superficier.$model
                    newAppartement.value.type=vAddAppartement$.value.type.$model
                // residenceSelected.value=newAppartement.value.residance.designation
                // boxSelected.value=newAppartement.value.box.num_place
                console.log(newAppartement.value,'newAppartement');
                api.post('/appartements/',newAppartement.value)
                .then(response=>{
                    toast.add({severity:'success', summary: 'Successful', detail: 'gerant created Successfully', life: 1000});
                    setTimeout(()=>{
                        rowsListes("appartements"),
                        showAppartementInput.value = false;
                        Object.keys(newAppartement.value).forEach(key => {
                            newAppartement.value[key] = '';
                    })
                },500)
                    
                })
                .catch(error=>{
                    errormessage.value=error.response.data
                    // console.log(errormessage.value.nom);
                    toast.add({severity:'error', summary: 'Error', detail: 'unable to create new gerant : '+error.message+' :\n'+errormessage.value, life: 4000});
            })
                }else {submitted.value = true;}
            }
            if (type=='box') {

                vAddBox$.value.prix_achat.$model= 0

                if (!vAddBox$.value.$invalid){ 
                    newBox.value.TVA=vAddBox$.value.TVA.$model
                    newBox.value.num_place=vAddBox$.value.num_place.$model
                    newBox.value.etage=vAddBox$.value.etage.$model
                    newBox.value.prix_achat=vAddBox$.value.prix_achat.$model
                    newBox.value.prix_ht=vAddBox$.value.prix_ht.$model
                    newBox.value.prix_ttc=vAddBox$.value.prix_ttc.$model
                    newBox.value.residance=vAddBox$.value.residance.$model.id
                    newBox.value.superficier=vAddBox$.value.superficier.$model
                    console.log(newBox.value);
                    api.post('/box/',newBox.value)
                        .then(response=>{
                            toast.add({severity:'success', summary: 'Successful', detail: 'gerant created Successfully', life: 1000});                
                            setTimeout(()=>{
                                rowsListes("box"),
                                showBoxInput.value = false;
                            },500)
                            
                        })
                        .catch(error=>{
                            errormessage.value=error.response.data
                            toast.add({severity:'error', summary: 'Error', detail: 'unable to create new gerant : '+error.message+' :\n'+errormessage.value, life: 4000});
                        }
                    )  
                    }else {submitted.value = true;}
            }
            if (type=='locaux') {
                // residenceSelected.value=""
                // newLocaux.value.residance=newLocaux.value.residance.id
                // newLocaux.value.prix_achat=newLocaux.value.prix_ttc
                // newLocaux.value.TVA=0
                // console.log(newLocaux.value,"jjjjjj");
                vAddLocaux$.value.prix_achat.$model= 0

                if (!vAddLocaux$.value.$invalid){ 

                    newLocaux.value.TVA=vAddLocaux$.value.TVA.$model
                    newLocaux.value.num_place=vAddLocaux$.value.num_place.$model
                    newLocaux.value.etage=vAddLocaux$.value.etage.$model
                    newLocaux.value.prix_achat=vAddLocaux$.value.prix_achat.$model
                    newLocaux.value.prix_ht=vAddLocaux$.value.prix_ht.$model
                    newLocaux.value.prix_ttc=vAddLocaux$.value.prix_ttc.$model
                    newLocaux.value.residance=vAddLocaux$.value.residance.$model.id
                    newLocaux.value.superficier=vAddLocaux$.value.superficier.$model

                    api.post('/locaux/',newLocaux.value).then(response=>{
                        toast.add({severity:'success', summary: 'Successful', detail: 'gerant created Successfully', life: 1000});
                        setTimeout(()=>{
                            rowsListes("locaux"),

                            showLocauxInput.value = false;
                        },500) 
                        
                    })
                    .catch(error=>{
                        errormessage.value=error.response.data
                        toast.add({severity:'error', summary: 'Error', detail: 'unable to create new gerant : '+error.message+' :\n'+errormessage.value, life: 4000});
                    })
                }else{submitted.value = true;}
            }
            // newAppartement.value.biens=type_choisie.value.label
            
            // newAppartement.value.contratDate=contrat_date.value
            // logements.push(newAppartement.value)
            // newAppartement.value={}
            // showResidenceAppartement.value = false;

        }
        
        function DeleteResidence(event){
            
            const index = logements.findIndex(item => item.nomResidence === event.nomResidence && item.type === event.type &&item.numLot === event.numLot );
            
            logements.splice(index)
        }
        function DeleteAppartement(event){
            const index = logements.findIndex(item => item.nomResidence === event.nomResidence && item.type === event.type &&item.numLot === event.numLot );
            logements.splice(index)
        }
        
        function dropRows(id,typeRows){
            if (typeRows=="appartements"||selectedTypeColumns.value=="appartements" ){
                api.delete(`/appartements/`,{params:{id:id}})
                .then((response)=>{
                    // getAllProductionEntreprise("getAllProductionEntreprise")
                    toast.add({severity:'success', summary: 'Successful', detail:response.data.designation+ 'Deleted', life: 1000});
                    setTimeout(()=>{
                        rowsListes("appartements")
                    },500)
                }).catch((error)=>{
                    toast.add({severity:'error', summary: 'Error', detail: 'user undeleted: '+error.message, life: 1000});
                })
                dialogDetail.value=false
            }
            if (typeRows=="box" ||selectedTypeColumns.value=="box" ){
                api.delete(`/box/`,{params:{id:id}})
                .then((response)=>{
                    // rowsListes("getAllProductionEntreprise")
                    toast.add({severity:'success', summary: 'Successful', detail:response.data.designation+ 'Deleted', life: 1000});
                    setTimeout(()=>{
                        rowsListes("box")
                    },500)
                }).catch((error)=>{
                    toast.add({severity:'error', summary: 'Error', detail: 'user undeleted: '+error.message, life: 1000});
                })
                dialogDetail.value=false
            }
            if (typeRows=="locaux" ||selectedTypeColumns.value=="locaux" ){
                api.delete(`/locaux/`,{params:{id:id}})
                .then((response)=>{
                    // getAllProductionEntreprise("getAllProductionEntreprise")
                    toast.add({severity:'success', summary: 'Successful', detail:response.data.designation+ 'Deleted', life: 1000});
                    setTimeout(()=>{
                        rowsListes("locaux")    
                    },500)

                }).catch((error)=>{
                    toast.add({severity:'error', summary: 'Error', detail: 'user undeleted: '+error.message, life: 1000});
                })
                dialogDetail.value=false
            }
        }
        function confirmDrop(id,typeRows){
            confirm.require({
                message: "Etes vous sur de vouloir supprimer cette ligne?",
                header: 'Confirmation ',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    // console.log('id from lockUser accept = '+id);
                    dropRows(id,typeRows)
                },
            reject: () => {
                toast.add({severity:'success', summary: 'Successful', detail: 'Delete user canceled', life: 1000});
            }
        })
        }
        function nextPage1() {
            
            emit('nextpage', { formData: {logements:logements }, pageIndex: 1 })

        }
        function prevPage1() {
            //console.log(emit('prevpage', {pageIndex: 1}));
            emit('prevpage', { pageIndex: 1 });
        }
        function onRowEditSave(event) {
            let { newData, index } = event;

            logements[index] = newData;
        }
        function tableData() {
            // columns.value = ;
            
        }
        function onToggle(value) {
            // console.log("columns: ",columns.filter(col => value.includes(col)));
            selectedColumns.value = columns.value.filter(col => value.includes(col));
            // selectedTypeColumns.value = columns.value.filter(col => value.includes(col));
        }
        function onSelectAllChange(event) {
            selectedColumns = event.checked
                ? logements.map((item) => item.value)
                : [];
        }
        tableData()

        const showDialogueEdit=ref(false)
        const idResidence=ref('')
        const Selectedresidence=ref('')
        function getRésidence(event){
            Selectedresidence.value=event.value.designation
            vEditResidance$.value.address.$model=event.value.address
            vEditResidance$.value.designation.$model=event.value.designation
            vEditResidance$.value.totale_app.$model=event.value.totale_app
            vEditResidance$.value.totale_box.$model=event.value.totale_box
            vEditResidance$.value.totale_locaux.$model=event.value.totale_locaux
            vEditResidance$.value.nbr_etage.$model=event.value.nbr_etage
            idResidence.value=event.value.id
            
            
        }
        function openDialogueEditDrop(){
            showDialogueEdit.value=true
            get_residances()

        }
        
        function editPropriter(){
            api.put('/residence/'+idResidence.value+'/', editResidence.value)
                 .then(response => {
                    get_residances()
                    showDialogueEdit.value=false
                    Selectedresidence.value=""
                    editResidence.value={}
                    // residenceSelected.value=""
                 toast.add({severity:'success', summary: 'Successful', detail: response.data.designation+'Modify Successfully', life: 1000});
                })
                .catch(function (error) {
                    console.log(error.response)
                })
        }
        vAddAppartement$.value.prix_ttc.$model= computed(() => {
            if (!isNaN(vAddAppartement$.value.prix_ht.$model)&& !isNaN(vAddAppartement$.value.TVA.$model)){
                const prix_ttc=parseFloat(parseFloat(vAddAppartement$.value.prix_ht.$model)*(1+parseFloat(vAddAppartement$.value.TVA.$model)/100)).toFixed(2)
            return prix_ttc
                }
            
            }
            )
        vEditAppartement$.value.prix_ttc.$model= computed(() => {
            if (!isNaN(vEditAppartement$.value.prix_ht.$model)&& !isNaN(vEditAppartement$.value.TVA.$model)){
                const prix_ttc=parseFloat(parseFloat(vEditAppartement$.value.prix_ht.$model)*(1+parseFloat(vEditAppartement$.value.TVA.$model)/100)).toFixed(2)
            return prix_ttc
                }
            
            }
            )
        vAddBox$.value.prix_ttc.$model= computed(() => {
            if (!isNaN(vAddBox$.value.prix_ht.$model) && !isNaN(vAddBox$.value.TVA.$model)){
                const prix_ttc=parseFloat(parseFloat(vAddBox$.value.prix_ht.$model)*(1+parseFloat(vAddBox$.value.TVA.$model)/100)).toFixed(2)
                return prix_ttc
            }
        })
        vEditBox$.value.prix_ttc.$model= computed(() => {
            if (!isNaN(vEditBox$.value.prix_ht.$model) && !isNaN(vEditBox$.value.TVA.$model)){
                const prix_ttc=parseFloat(parseFloat(vEditBox$.value.prix_ht.$model)*(1+parseFloat(vEditBox$.value.TVA.$model)/100)).toFixed(2)
                return prix_ttc
            }
        })
        vAddLocaux$.value.prix_ttc.$model= computed(() => {
            if (!isNaN(vAddLocaux$.value.prix_ht.$model) && !isNaN(vAddLocaux$.value.TVA.$model)){
                const prix_ttc=parseFloat(parseFloat(vAddLocaux$.value.prix_ht.$model)*(1+parseFloat(vAddLocaux$.value.TVA.$model)/100)).toFixed(2)
                return prix_ttc
            }
        })
        vEditLocaux$.value.prix_ttc.$model= computed(() => {
            if (!isNaN(vEditLocaux$.value.prix_ht.$model) && !isNaN(vEditLocaux$.value.TVA.$model)){
             const prix_ttc=parseFloat(parseFloat(vEditLocaux$.value.prix_ht.$model)*(1+parseFloat(vEditLocaux$.value.TVA.$model)/100)).toFixed(2)
            return  prix_ttc
            }
        })
        // const nbr_app=ref(0)
        function calculer_nbr(Tab,show,type){
            let totale=0
            let lengthRows=0
            console.log('-----',Tab.residance.$model!=undefined && show);
            if (Tab.residance.$model!=undefined && show){
                // console.log(Tab.residance.$model);
                // if (Tab.residance.$model!= &&show){
                    lengthRows=rowsClasses.value.filter(rowss=>
                        rowss.residance.id===Tab.residance.$model.id
                    ).length
                    if (type=='locale')totale=Tab.residance.$model.totale_locaux-lengthRows
                    if (type=='appartement')totale=Tab.residance.$model.totale_app-lengthRows
                    if (type=='box')totale=Tab.residance.$model.totale_box-lengthRows
                    if (totale<=0 ||isNaN(totale)){
                        disabled_max.value=true
                        return 0
                    }
                    disabled_max.value=false
                    return totale
                // }
            }

            return 0
        }
        
        const iscallin=ref(false)
        watch(async() => {
            const vAddAppartement = vAddAppartement$.value;
            const vEditAppartement = vEditAppartement$.value;
            const vAddBox = vAddBox$.value;
            const vEditBox = vEditBox$.value;
            const vAddLocaux = vAddLocaux$.value;
            const vEditLocaux = vEditLocaux$.value;
            // const storagePromise = new Promise(resolve => {
            //     localStorage.setItem("tablesRows", selectedTypeColumns.value);
            //     resolve();
            // });
            // await storagePromise;
            const selectedTypeColumn= localStorage.getItem("tablesRows");
            await selectedTypeColumn
            
            
            switch (selectedTypeColumn) {
                case 'appartements':
                if (iscallin.value)return
                localStorage.setItem("tablesRows",'appartements')
                rowsListes('appartements')
                selectedTypeColumns.value=localStorage.getItem("tablesRows")
                
                if(showAppartementInput.value==true){
                    nbr_app_calculer.value = calculer_nbr(vAddAppartement, showAppartementInput.value, 'appartement');
                    
                }
                if(showEditAppartementInput.value)nbr_app_edit_calculer.value = calculer_nbr(vEditAppartement, showEditAppartementInput.value, 'appartement');
                
                break;
                case 'box':
                localStorage.setItem("tablesRows",'box')
                rowsListes('box')
                selectedTypeColumns.value=localStorage.getItem("tablesRows")
                if (showBoxInput.value==true)nbr_box_calculer.value = calculer_nbr(vAddBox, showBoxInput.value, 'box');
                if(showEditBoxInput.value==true)nbr_box_edit_calculer.value = calculer_nbr(vEditBox, showEditBoxInput.value, 'box');
                break;
                case 'locaux':
                localStorage.setItem("tablesRows",'locaux')
                rowsListes('locaux')
                selectedTypeColumns.value=localStorage.getItem("tablesRows")
                if(showLocauxInput.value===true)nbr_locaux_calculer.value = calculer_nbr(vAddLocaux, showLocauxInput.value, 'locale');
                if(showEditLocauxInput.value==true)nbr_locaux_edit_calculer.value = calculer_nbr(vEditLocaux, showEditLocauxInput.value, 'locale');
                break;
            }
        });


        
        return {iscallin,
            selectedColumns,selectedTypeColumns,
            disabled_max,nbr_app_calculer,nbr_box_calculer,nbr_locaux_calculer,
            nbr_app_edit_calculer,nbr_box_edit_calculer,nbr_locaux_edit_calculer,
            calculer_nbr,
            columns,filters,editPropriter,
            type_choisie,getRésidence,
            contrat_date,residenceEdit,openDialogueEditDrop,editResidence,showDialogueEdit,
            typeClass,vEditResidance$,Selectedresidence,
            nextPage1,
            prevPage1,
            onRowEditSave,
            onSelectAllChange,
            resetFormResidance,resetFormAppartement,resetFormBox,resetFormLocaux,
            onToggle,rowsClasses,typeRows,desabledBox,
            newResidence,editingResidenceRows,submitted,
            rulesAppartement,addTypeCatiShow,
            vAddAppartement$,vAddBox$,vAddLocaux$,
            vEditAppartement$,vEditBox$,vEditLocaux$,
            vAddResidance$,
            newAppartement,newBox,newLocaux,
            editAppartement,editBox,editLocaux,
            editingAppartementRows,editingBoxRows,editingLocauxRows,showResidenceInput,
            showDialogueRows,showLocauxInput,showAppartementInput,showBoxInput,
            showDetailAppartementInput,showDetailBoxInput,showDetailLocauxInput,
            showEditAppartementInput,showEditBoxInput,showEditLocauxInput,desabledInputs,
            boxClass,residanceClass,appartementsClass,editRows,residenceSelected,boxSelected,
            addPropriter,showDialogue,DeleteResidence,DeleteAppartement,rowsListes,residance_change,box_change,openDialogueDetail,editDetail,
            get_boxs,get_residances,confirmDrop,dropRows,
        }
    }

}
</script> 
<style>
.edit-btn{
    cursor:not-allowed ;
     z-index: 1000; 
     background-color: #609966;
     color:#FCFFE7; 
     border-radius: 50%;
     text-align: center;
}
.edit-btn:hover{
    cursor:progress ;
     z-index: 1000; 
     background-color: #9DC08B;
     color:#400E32; 
     border-radius: 50%;
     text-align: center;
}
.delete-btn{
     z-index: 1000; 
     background-color: #EB5353;
     color:#FCFFE7; 
     border-radius: 50%;
     text-align: center;
}
.delete-btn:hover{
    cursor:progress ;
     z-index: 1000; 
     background-color: #FF8C8C;
     color:#400E32; 
     border-radius: 50%;
     text-align: center;
}
</style>