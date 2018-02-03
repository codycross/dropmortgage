(function (){
	"use strict";
	var dmAddress = {
		templateUrl: 'app/form/partials/address.tmpl.html',
		controller : dmAddressController
	};
	
	/** @ngInject*/
	function dmAddressController ($rootScope,
								  dmService){
		
		this.$onInit = function (){
			this.dmData = angular.copy($rootScope.formData);
			
			
		};
		this.save = _save;
		function _save (){
			this.dmData.userAddress = {
				street: this.street,
				zip   : this.zip,
				city  : this.city
			};
			dmService.updateFormData(this.dmData);
		}
		
	}
	
	angular.module('drop')
		.component('dmAddress', dmAddress);
})();