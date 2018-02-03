(function (){
	"use strict";
	var name = {
		templateUrl: 'app/form/partials/name.tmpl.html',
		controller : nameController
	};
	/** @ngInject*/
	function nameController ($rootScope,
							 dmService){
		
		this.$onInit = function (){
			this.dmData = angular.copy($rootScope.formData);
			
		};
		this.save = _save;
		function _save (){
			this.dmData.name = (this.firstName + ' '+ this.lastName).titleize();
			dmService.updateFormData(this.dmData);
		}
	}
	
	angular.module('drop')
		.component('name',name)
})();