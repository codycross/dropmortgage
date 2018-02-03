(function (){
	"use strict";

	var _options = [
		{
			val  : 'OwnerOccupied',
			label: 'Primary Home',
			img  : '',
			icon : 'looks_one'
		}, {
			val  : 'SecondHome',
			label: 'Secondary Home',
			img  : '',
			icon : 'looks_two'
		}, {
			val  : 'Investment',
			label: 'Rental Property',
			img  : '',
			icon : 'attach_money'
		}
	];

	var propertyUse = {
		templateUrl: 'app/form/partials/property-use.tmpl.html',
		controller : propertyUseController
	};

	/** @ngInject*/
	function propertyUseController ($rootScope,
	                                dmService){

		this.$onInit = function (){
			this.dmData = angular.copy($rootScope.formData);
			this.options = _options;
		};

		this.updateSection = _updateSection;
		function _updateSection (val, key){
			this.dmData[key] = val;
			dmService.updateFormData(this.dmData);
		}
	}

	

	angular.module('drop')
		.component('propertyUse', propertyUse)
})();
