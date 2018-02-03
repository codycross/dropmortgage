(function (){
	"use strict";
	
	var _inputSettings = {
		max     : 100,
		min     : 0,
		step    : 5,
		multiple: 0.01,
		label   : '% Down',
		id      : 'down-payment'
	};
	
	var downPayment = {
		templateUrl: 'app/form/partials/down-payment.tmpl.html',
		controller : downPaymentController
	};
	
	/** @ngInject*/
	function downPaymentController ($rootScope,
									dmService){
		
		this.$onInit = function (){
			this.dmData = angular.copy($rootScope.formData);
			this.inputSettings = _inputSettings;
			this.percentDown = angular.copy(this.dmData.percentDown) || 20;
			
		};
		this.updateSection = _updateSection;
		this.save = _save;
		
		function _save (){
			this.dmData.percentDown = this.percentDown;
			this.dmData.downTotal = this.percentDown * this.dmData.purchasePrice / 100;
			this.dmData.loanTotal = this.dmData.purchasePrice - this.dmData.downTotal;
			this.dmData.ltv = ((this.dmData.purchasePrice - this.dmData.downTotal) / this.dmData.purchasePrice * 100).round(
				3);
			dmService.updateFormData(this.dmData);
		}
		
		function _updateSection (){
			this.dmData.percentDown = this.percentDown;
		}
	}
	
	
	angular.module('drop')
		.component('downPayment', downPayment)
})();