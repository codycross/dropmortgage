(function (){
	"use strict";
	
	var _options = [
		{
			val  : 'PURCHASE',
			label: 'Purchase',
			icon  : 'attach_money'
		}, {
			val  : 'REFINANCE',
			label: 'Refinance',
			icon  : 'refresh'
		},
		{
			val  : 'CASHOUT',
			label: 'Cash Out',
			icon  : 'local_atm'
		}
	];
	
	var loanType = {
		templateUrl: 'app/form/partials/loan-type.tmpl.html',
		controller : loanTypeController
	};
	
	/** @ngInject*/
	function loanTypeController ($rootScope,
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
		.component('loanType', loanType)
})();