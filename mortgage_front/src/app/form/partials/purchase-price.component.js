
(function (){
	"use strict";

	var _inputSettings = {
		max     : 10000,
		min     : 50,
		step    : 50,
		label   : '$',
		multiple: 1000,
		id      : 'purchase-price'
	};

	var purchasePrice = {
		templateUrl: 'app/form/partials/purchase-price.tmpl.html',
		controller : purchasePriceController
	};

	/** @ngInject*/
	function purchasePriceController ($rootScope,
	                                  dmService){

		this.$onInit = function (){
			this.dmData = angular.copy($rootScope.formData);
			this.inputSettings = _inputSettings;
			this.sliderPrice = angular.copy(this.dmData.purchasePrice) || 1000 ;
			this.displayPrice = angular.copy(this.dmData.purchasePrice) || this.sliderPrice* this.inputSettings.multiple;
		};
		this.updateSection = _updateSection;
		this.save = _save;

		function _save (){
			this.dmData.purchasePrice = this.sliderPrice * this.inputSettings.multiple;
			dmService.updateFormData(this.dmData);
		}

		function _updateSection (){
			this.dmData.purchasePrice = this.sliderPrice * this.inputSettings.multiple;
			this.displayPrice = this.sliderPrice * this.inputSettings.multiple;
		}

	}


	angular.module('drop')
		.component('purchasePrice', purchasePrice)
})();

