(function (){
	"use strict";

	var _options = [
		{
			val  : '0x30',
			label: '0x30 - No 30 Day Late Payments',
			img  : '',
			icon : 'clear'
		},{
			val  : '1x30',
			label: '1x30 - One 30 Day Late Payment',
			img  : '',
			icon : 'check'
		}, {
			val  : '0x60',
			label: '0x60 - No 60 Day Late Payments',
			img  : '',
			icon : 'check'
		}, {
			val  : '1x60',
			label: '1x60 - One 60 Day Late Payment',
			img  : '',
			icon : 'clear'
		}
	];


	var mortgageHistory = {
		templateUrl: 'app/form/partials/mortgage-history.tmpl.html',
		controller : mortgageHistoryController
	};

	/** @ngInject*/
	function mortgageHistoryController ($rootScope,
	                            dmService){

		this.$onInit = function (){
			this.dmData = angular.copy($rootScope.formData);
			this.options = _options;
			this.housing_history = '';
		};
		this.updateSection = _updateSection;
		this.save = _save;

		function _save (){
			this.dmData.housing_history = this.housing_history;
			dmService.updateFormData(this.dmData);
		}

		function _updateSection (){
			this.dmData.housing_history = this.housing_history;
		}
	}


	angular.module('drop')
		.component('mortgageHistory', mortgageHistory)
})();