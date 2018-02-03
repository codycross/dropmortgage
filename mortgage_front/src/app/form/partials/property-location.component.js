(function (){
	"use strict";
	var propertyLocation = {
		templateUrl: 'app/form/partials/property-location.tmpl.html',
		controller : propertyLocationController
	};
	
	/** @ngInject*/
	function propertyLocationController ($rootScope,
										 dmService){
		this.$onInit = function (){
			this.dmData = angular.copy($rootScope.formData);
		};
		this.save = _save;
		function _save (){
			dmService.updateFormData(this.dmData);
		}
		
	}
	
	
	angular.module('drop')
		.component('propertyLocation', propertyLocation)
})();