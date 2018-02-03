(function (){
	"use strict";
	var _options = [
		{
			val  : 'NO',
			label: 'No',
			img  : '',
			id   : 'bankruptcy-or-foreclosure-no',
			icon : 'check_box'
			
		}, {
			val  : 'BANKRUPTCY',
			label: 'Yes, Bankruptcy',
			img  : '',
			id   : 'bankruptcy-or-foreclosure-bankruptcy',
			icon : 'assignment_late'
			
		}, {
			val  : 'FORECLOSURE',
			label: 'Yes, Foreclosure / ShortSale',
			img  : '',
			id   : 'bankruptcy-or-foreclosure-foreclosure',
			icon : 'report'
			
		}, {
			val  : 'BOTH',
			label: 'Yes, Both',
			img  : '',
			id   : 'bankruptcy-or-foreclosure-both',
			icon : 'flag'
			
		}
	];
	
	var bankruptcy = {
		templateUrl: 'app/form/partials/bankruptcy.tmpl.html',
		controller : bankruptcyController
	};
	
	/** @ngInject*/
	function bankruptcyController ($rootScope,
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
		.component('bankruptcy', bankruptcy)
})();
