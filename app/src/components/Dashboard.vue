<template>
	<div class="grid">
		
		<div class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0">
				<div class="flex justify-content-between mb-3">
					<div>
						<span class="block text-500 font-medium mb-3">Résidences
						</span>
						<div class="text-900 font-medium text-xl">{{statistiques.residences}}</div>
					</div>
					<div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem">
						<i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
					</div>
				</div>
				<span class="text-green-500 font-medium">24 nouveautés </span>
				<span class="text-500">since last visit</span>
			</div>
		</div>
		<div class="col-12 lg:col-6 xl:col-6">
			<div class="card mb-0">
				<div class="flex justify-content-between mb-3">
					<div>
						<span class="block text-500 font-medium mb-3">Appartements
							<span class="text-green-500 font-medium">{{statistiques.appartements}}</span><p></p>
							<div class="text-900 font-medium text-xl">Vendus 
								<span class="text-red-500 font-medium">{{statistiques.appartements_vendus}}</span>
							</div>
							<div class="text-900 font-medium text-xl">Rester 
								<span class="text-green-500 font-medium">{{statistiques.appartements - statistiques.appartements_vendus}}</span>
							</div>
						</span>
					</div>
					<div>
						<span class="block text-500 font-medium mb-3">Boxs
							<span class="text-green-500 font-medium">{{statistiques.boxs}}</span><p></p>
							<div class="text-900 font-medium text-xl">Vendus 
								<span class="text-red-500 font-medium">{{statistiques.boxs_vendus}}</span>
							</div>
							<div class="text-900 font-medium text-xl">Rester 
								<span class="text-green-500 font-medium">{{statistiques.boxs - statistiques.boxs_vendus}}</span>
							</div>
						</span>
					</div>
					<div>
						<span class="block text-500 font-medium mb-3">Locaux
							<span class="text-green-500 font-medium">{{statistiques.locales}}</span><p></p>
							<div class="text-900 font-medium text-xl ">Vendus 
							<span class="text-red-500 font-medium">{{statistiques.locale_vendus}}</span>
							
							</div>
							<div class="text-900 font-medium text-xl">Rester 
								<span class="text-green-500 font-medium">{{statistiques.locales-statistiques.locale_vendus}}</span>
								
							</div>
						</span>
					</div>
					<div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width:2.5rem;height:2.5rem">
						<i class="pi pi-comment text-purple-500 text-xl"></i>
					</div>
				</div>
				
			</div>
		</div>
		<div class="col-12 lg:col-6 xl:col-3 sm:col-3 md:col-3">
			<div class="card mb-0">
				<div class="flex justify-content-between mb-3">
					<div>
						<span class="block text-500 font-medium mb-3">Clients 
							<span class="text-green-500 font-medium">{{statistiques.clients}}</span>
						</span>
						<div class="text-900 font-medium text-xl ">
							<span class="text-red-500 font-medium">{{statistiques.montant_vente}}</span> DA
						</div>
						<div class="text-900 font-medium text-xl">Rester 
							<span class="text-green-500 font-medium">10</span>	
						</div>		
					</div>
					<div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width:2.5rem;height:2.5rem">
						<i class="pi pi-map-marker text-orange-500 text-xl"></i>
					</div>
				</div>
				
			</div>
		</div>
		<div class="col-12 lg:col-4 md:col-3 sm:col-3" data-bs-spy="scroll" data-bs-target="#navbar-example">
		<div class="card" id="navbar-example">
			<div class="flex justify-content-between align-items-center mb-5">
				<h5>Etat des résidences</h5>
				<div>
					<Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu2.toggle($event)"></Button>
					<Menu ref="menu2" :popup="true" :model="items" ></Menu>
				</div>
			</div>
			<ul id="nav" v-show="localeshow"   class="list-none p-0 m-0 dropdown" role="tablist">
				
			    <li v-for="(value, key,index) in statistiques.etat_residences.locaux"  class="flex flex-column md:flex-row md:align-items md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">{{value.name_residence}}</span>
						<div class="mt-1 text-600">Locaux</div>
					</div>
					<div class="mt-2 md:mt-0 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div v-if="value.porcentage<=0" class="bg-green-500 h-full" style="width:0%"></div>
							<div v-else-if="value.porcentage<=10" class="bg-green-500 h-full" style="width:10%"></div>
							<div v-else-if="value.porcentage<=20" class="bg-green-500 h-full" style="width:20%"></div>
							<div v-else-if="value.porcentage<=30" class="bg-green-500 h-full" style="width:30%"></div>
							<div v-else-if="value.porcentage<=40" class="bg-green-500 h-full" style="width:40%"></div>
							<div v-else-if="value.porcentage<=50" class="bg-orange-500 h-full" style="width:50%"></div>
							<div v-else-if="value.porcentage<=60" class="bg-orange-500 h-full" style="width:60%"></div>
							<div v-else-if="value.porcentage<=70" class="bg-orange-500 h-full" style="width:70%"></div>
							<div v-else-if="value.porcentage<=80" class="bg-orange-500 h-full" style="width:80%"></div>
							<div v-else-if="value.porcentage<=90" class="bg-red-500 h-full" style="width:90%"></div>
							<div v-else-if="value.porcentage>=100" class="bg-red-500 h-full" style="width:100%"></div>
						</div>
						<span v-if="value.porcentage<=0" class="text-green-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=10" class="text-green-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=20" class="text-green-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=30" class="text-green-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=40" class="text-green-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=50" class="text-orange-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=60" class="text-orange-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=70" class="text-orange-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=80" class="text-orange-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=90" class="text-red-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage>=100" class="text-red-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
					</div>
				</li>
				<!--  <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Foresta</span>
						<div class="mt-1 text-600">Appartement</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-cyan-500 h-full" style="width:16%"></div>
						</div>
						<span class="text-cyan-500 ml-3 font-medium">%16</span>
					</div>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Supernova Sticker</span>
						<div class="mt-1 text-600">Accessories</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-pink-500 h-full" style="width:67%"></div>
						</div>
						<span class="text-pink-500 ml-3 font-medium">%67</span>
					</div>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Wonders Notebook</span>
						<div class="mt-1 text-600">Office</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-green-500 h-full" style="width:35%"></div>
						</div>
						<span class="text-green-500 ml-3 font-medium">%35</span>
					</div>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Mat Black Case</span>
						<div class="mt-1 text-600">Accessories</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-purple-500 h-full" style="width:75%"></div>
						</div>
						<span class="text-purple-500 ml-3 font-medium">%75</span>
					</div>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Robots T-Shirt</span>
						<div class="mt-1 text-600">Clothing</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-teal-500 h-full" style="width:40%"></div>
						</div>
						<span class="text-teal-500 ml-3 font-medium">%40</span>
					</div>
				</li>  -->
			</ul>
			<ul id="nav" v-show="boxshow"  class="list-none p-0 m-0 dropdown" role="tablist">
			    <li v-for="(value, key,index) in statistiques.etat_residences.boxs"  class="flex flex-column md:flex-row md:align-items md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">{{value.name_residence}}</span>
						<div class="mt-1 text-600">Box</div>
					</div>
					<div class="mt-2 md:mt-0 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div v-if="value.porcentage<=0" class="bg-green-500 h-full" style="width:0%"></div>
							<div v-else-if="value.porcentage<=10" class="bg-green-500 h-full" style="width:10%"></div>
							<div v-else-if="value.porcentage<=20" class="bg-green-500 h-full" style="width:20%"></div>
							<div v-else-if="value.porcentage<=30" class="bg-green-500 h-full" style="width:30%"></div>
							<div v-else-if="value.porcentage<=40" class="bg-green-500 h-full" style="width:40%"></div>
							<div v-else-if="value.porcentage<=50" class="bg-orange-500 h-full" style="width:50%"></div>
							<div v-else-if="value.porcentage<=60" class="bg-orange-500 h-full" style="width:60%"></div>
							<div v-else-if="value.porcentage<=70" class="bg-orange-500 h-full" style="width:70%"></div>
							<div v-else-if="value.porcentage<=80" class="bg-orange-500 h-full" style="width:80%"></div>
							<div v-else-if="value.porcentage<=90" class="bg-red-500 h-full" style="width:90%"></div>
							<div v-else-if="value.porcentage>=100" class="bg-red-500 h-full" style="width:100%"></div>
						</div>
						<span v-if="value.porcentage<=0" class="text-green-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=10" class="text-green-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=20" class="text-green-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=30" class="text-green-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=40" class="text-green-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=50" class="text-orange-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=60" class="text-orange-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=70" class="text-orange-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=80" class="text-orange-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=90" class="text-red-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage>=100" class="text-red-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
					</div>
				</li>
				<!--  <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Foresta</span>
						<div class="mt-1 text-600">Appartement</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-cyan-500 h-full" style="width:16%"></div>
						</div>
						<span class="text-cyan-500 ml-3 font-medium">%16</span>
					</div>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Supernova Sticker</span>
						<div class="mt-1 text-600">Accessories</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-pink-500 h-full" style="width:67%"></div>
						</div>
						<span class="text-pink-500 ml-3 font-medium">%67</span>
					</div>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Wonders Notebook</span>
						<div class="mt-1 text-600">Office</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-green-500 h-full" style="width:35%"></div>
						</div>
						<span class="text-green-500 ml-3 font-medium">%35</span>
					</div>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Mat Black Case</span>
						<div class="mt-1 text-600">Accessories</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-purple-500 h-full" style="width:75%"></div>
						</div>
						<span class="text-purple-500 ml-3 font-medium">%75</span>
					</div>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Robots T-Shirt</span>
						<div class="mt-1 text-600">Clothing</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-teal-500 h-full" style="width:40%"></div>
						</div>
						<span class="text-teal-500 ml-3 font-medium">%40</span>
					</div>
				</li>  -->
			</ul>
			<ul id="nav" v-show="!localeshow&&!boxshow" class="list-none p-0 m-0 dropdown" role="tablist">
				
			    <li v-for="(value, key,index) in statistiques.etat_residences.appartements"  class="flex flex-column md:flex-row md:align-items md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">{{value.name_residence}}</span>
						<div class="mt-1 text-600">Appartement</div>
					</div>
					<div class="mt-2 md:mt-0 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							
							<div v-if="value.porcentage<=0" class="bg-green-500 h-full" style="width:0%"></div>
							<div v-else-if="value.porcentage<=10" class="bg-green-500 h-full" style="width:10%"></div>
							<div v-else-if="value.porcentage<=20" class="bg-green-500 h-full" style="width:20%"></div>
							<div v-else-if="value.porcentage<=30" class="bg-green-500 h-full" style="width:30%"></div>
							<div v-else-if="value.porcentage<=40" class="bg-green-500 h-full" style="width:40%"></div>
							<div v-else-if="value.porcentage<=50" class="bg-orange-500 h-full" style="width:50%"></div>
							<div v-else-if="value.porcentage<=60" class="bg-orange-500 h-full" style="width:60%"></div>
							<div v-else-if="value.porcentage<=70" class="bg-orange-500 h-full" style="width:70%"></div>
							<div v-else-if="value.porcentage<=80" class="bg-orange-500 h-full" style="width:80%"></div>
							<div v-else-if="value.porcentage<=90" class="bg-red-500 h-full" style="width:90%"></div>
							<div v-else-if="value.porcentage>=100" class="bg-red-500 h-full" style="width:100%"></div>
						</div>
						
						<span v-if="value.porcentage<=0" class="text-green-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=10" class="text-green-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=20" class="text-green-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=30" class="text-green-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=40" class="text-green-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=50" class="text-orange-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=60" class="text-orange-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=70" class="text-orange-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=80" class="text-orange-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage<=90" class="text-red-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
						<span v-else-if="value.porcentage>=100" class="text-red-500 ml-3 font-medium">{{parseFloat(value.porcentage).toFixed(2)}}%</span>
					</div>
				</li>
				<!--  <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Foresta</span>
						<div class="mt-1 text-600">Appartement</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-cyan-500 h-full" style="width:16%"></div>
						</div>
						<span class="text-cyan-500 ml-3 font-medium">%16</span>
					</div>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Supernova Sticker</span>
						<div class="mt-1 text-600">Accessories</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-pink-500 h-full" style="width:67%"></div>
						</div>
						<span class="text-pink-500 ml-3 font-medium">%67</span>
					</div>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Wonders Notebook</span>
						<div class="mt-1 text-600">Office</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-green-500 h-full" style="width:35%"></div>
						</div>
						<span class="text-green-500 ml-3 font-medium">%35</span>
					</div>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Mat Black Case</span>
						<div class="mt-1 text-600">Accessories</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-purple-500 h-full" style="width:75%"></div>
						</div>
						<span class="text-purple-500 ml-3 font-medium">%75</span>
					</div>
				</li>
				<li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
					<div>
						<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Robots T-Shirt</span>
						<div class="mt-1 text-600">Clothing</div>
					</div>
					<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
						<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
							<div class="bg-teal-500 h-full" style="width:40%"></div>
						</div>
						<span class="text-teal-500 ml-3 font-medium">%40</span>
					</div>
				</li>  -->
			</ul>
		</div>
	</div>
	<div class="col-12 xl:col-8 lg:col-8 sm:col-6 md:col-6">
		<div class="card">
		
			<Dropdown class="w-7rem" v-model="graphType" :options="[{type:'line'},{type:'bar'}]" optionLabel="type" optionValue="type" placeholder="Select a type" />
			<Calendar showIcon class="ml-2 w-18rem" inputId="dropdown" @date-select="getDateYear(selectedYear.annee.getFullYear())" v-model="selectedYear.annee" autocomplete="off" dateFormat="yy" view="year"/>

			<Chart  :type="graphType" :data="lineData" :options="{plugins: {
					title: {
					display: true,
					
					}
				}}"/>
            
	     <!-- </div> -->
			<!--<Chart type="line" :data="lineData" :options="lineOptions" />-->
		</div> 
		
	</div>
	
	
</div>
</template>

<script>


import EventBus from '@/AppEventBus';
import {ref,onMounted,reactive, toRefs} from 'vue'
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

import ProductService from '../service/ProductService';
import api from '../api';
export default {
	data() {

		return {
			
			lineOptions: null,
		}
	},
	setup(){
		const confirm = useConfirm();
		const toast = useToast();
		const graphType = ref('line')
		const statistiques=ref({"residences": 0,
  "appartements": 0,
  "locales": 0,
  "boxs": 0,
  "clients": 0,
  "factures": 0,
  "montant_vente": 0.0,
  "appartements_vendus": 0,
  "locale_vendus": 0,
  "boxs_vendus": 0,
  "etat_residences":{
	"appartements":"","locaux":"","boxs":""
  }})
  			const localeshow=ref(false)
		    const boxshow=ref(false)
			function showEtat(event){
			if (event=="boxs"){
				
			}
			else if (event=="boxs"){
				
			}
			else{
				
			}
		}
			const items=ref( [
                {label: 'Appartements', icon: 'pi pi-fw pi-minus',command: () => {
					boxshow.value=false
				localeshow.value=false
					
                        toast.add({severity:'success', summary:'Updated', detail:'Data Updated', life: 3000});
                    }},
                {label: 'Locaux', icon: 'pi pi-fw pi-minus',command: () => {
					boxshow.value=false

				localeshow.value=true
					
					
                        toast.add({severity:'success', summary:'Updated', detail:'Data Updated', life: 3000});
                    }},
                {label: 'Box', icon: 'pi pi-fw pi-minus',command: () => {
					showEtat('Box')
					boxshow.value=true
				localeshow.value=false
					
                        toast.add({severity:'success', summary:'Updated', detail:'Data Updated', life: 3000});
                    }}
            ])
		    const lineData=ref({labels: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'],
				 datasets: [
					{
						label: 'Appartements',
						data: [0,0,0,0,0,0,0,0,0,0,0,0],
						fill: false,
						backgroundColor: '#2f4860',
						borderColor: '#2f4860',
						tension: 0.4
					},
					{
						label: 'Locaux',
						data: [0,0,0,0,0,0,0,0,0,0,0,0],
						fill: false,
						backgroundColor: '#00bb7e',
						borderColor: '#00bb7e',
						tension: 0.4
					},
					{
						label: 'Boxs',
						data: [0,0,0,0,0,0,0,0,0,0,0,0],
						fill: false,
						backgroundColor: '#D61C4E',
						borderColor: '#D61C4E',
						tension: 0.4
					}
				]
			})
			
			const productService= ref(null)
			const themeChangeListener= ref(null)
			let year=(new Date().getFullYear()-1).toString()
			const months=ref(['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout'
			,'Septembre','Octobre','Novembre','Décembre'])
			const selectedYear=ref({'annee':year})
			function listeStatisques(){
				api.get('statistiques?annee='+year).then(response => {
				// console.log(response.data);
				statistiques.value = response.data
				lineData.value.datasets[0].data=response.data.dataset.appartements
				lineData.value.datasets[1].data=response.data.dataset.locaux
				lineData.value.datasets[2].data=response.data.dataset.boxs
				// originalClient.value=clients.value
				
				})
				.catch(error => {
						console.log(error.response.data)
            })
		}
			function getDateYear(annee){
				year=annee
				listeStatisques()
				// console.log('year>>>>>>>',year);
			}
			return{graphType,months,year,selectedYear,getDateYear,
				productService,showEtat,localeshow,boxshow,items,themeChangeListener,lineData,listeStatisques,statistiques
			}
			

	},

		
		// api.get(statisitique)	
 
	productService: null,
	themeChangeListener: null,
	mounted() {
		this.listeStatisques()
		// if (window.innerWidth<=520){
		// 	nav=document.getElementById('navbar-example')
		// 	nav.style.width="30.4em" 
		// }

		this.themeChangeListener = (event) => {
            if (event.dark)
                this.applyDarkTheme();
            else
                this.applyLightTheme();
        };
        EventBus.on('change-theme', this.themeChangeListener);

		if (this.isDarkTheme()) {
            this.applyDarkTheme();
        }
        else {
            this.applyLightTheme();
        }
	},
	beforeUnmount() {
		this.showEtat()

        EventBus.off('change-theme', this.themeChangeListener );
    },
	
	methods: {
		
		
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		isDarkTheme() {
            return this.$appState.darkTheme === true;
        },
		applyLightTheme() {
			this.lineOptions = {
				plugins: {
					legend: {
						labels: {
							color: '#495057'
						}
					}
				},
				scales: {
					x: {
						ticks: {
							color: '#495057'
						},
						grid: {
							color:  '#ebedef',
						}
					},
					y: {
						ticks: {
							color: '#495057'
						},
						grid: {
							color:  '#ebedef',
						}
					},
				}
			};
		},
		applyDarkTheme() {
			this.lineOptions = {
				plugins: {
					legend: {
						labels: {
							color: '#ebedef'
						}
					}
				},
				scales: {
					x: {
						ticks: {
							color: '#ebedef'
						},
						grid: {
							color:  'rgba(160, 167, 181, .3)',
						}
					},
					y: {
						ticks: {
							color: '#ebedef'
						},
						grid: {
							color:  'rgba(160, 167, 181, .3)',
						}
					},
				}
			};
		}
	}
		}
</script>
<style>
#nav {
    height: 19.3em;
    line-height: 2em;
    margin: 0;
    overflow: scroll;
    overflow-x: hidden;
}

#nav>li {
    border-top: 1px solid #ccc;
}

#nav>ul ul {
    text-indent: 1em;
}

#nav>ul ul ul {
    text-indent: 2em;
}
</style>