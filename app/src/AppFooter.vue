<template>
	<div class="layout-footer">
		<img alt="Logo" :src="footerImage()" height="20" class="mr-2" />
		<span class="font-medium ml-2">{{copyright}} &copy; {{currentYear}} <a :href="urlMinisry" target="_blank">{{ministryOfIndustry}}</a> {{allRightsReserved}}</span>
	</div>
</template>

<script>

	export default {
		name: "AppFooter",
		
		data(){
			return {
				urlMinisry: '',
				currentYear: new Date().getFullYear(),
				copyright:'',
				ministryOfIndustry:'',
				allRightsReserved:''

			}
		},
		created(){
			if (this.$store.state.user.localeLang == 'ar'){
				this.urlMinisry = "http://sopimem.dz"
				this.copyright='حقوق النشر'
				this.ministryOfIndustry="SOPIMEM PROMOTION IMMOBILIERE"
				this.allRightsReserved="كل الحقوق محفوظة."
			}else if (this.$store.state.user.localeLang=='fr'){
				this.urlMinisry = "http://sopimem.dz"+this.$store.state.user.localeLang+"/"
				this.copyright="Droits d'auteur"
				this.ministryOfIndustry="SOPIMEM PROMOTION IMMOBILIERE"
				this.allRightsReserved="Tous les droits sont réservés."
			}else{
				this.urlMinisry = "http://sopimem.dz"+this.$store.state.user.localeLang+"/"
				this.copyright='Copyright'
				this.ministryOfIndustry="SOPIMEM PROMOTION IMMOBILIERE"
				this.allRightsReserved="All rights reserved."
			}
		},
		methods: {
			footerImage() {
				return this.$appState.darkTheme ? '/images/logo.png' : '/images/logo.png';
			}
		},
		computed: {
			darkTheme() {
				return this.$appState.darkTheme;
			}
		}
	}
</script>