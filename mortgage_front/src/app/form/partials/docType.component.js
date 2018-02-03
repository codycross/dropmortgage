(function (){
	"use strict";

	var _options = [
		{
			val  : 'FullDoc',
			label: 'Full Doc',
			img  : '',
			icon : 'clear'
		},{
			val  : '12MonthsBankStatements',
			label: '12 Months Bank Statements',
			img  : '',
			icon : 'check'
		}, {
			val  : '24MonthsBankStatements',
			label: '24 Months Bank Statements',
			img  : '',
			icon : 'check'
		}, {
			val  : 'NoIncomeCashFlow',
			label: 'No Income - Cash Flow',
			img  : '',
			icon : 'clear'
		}
	];

	
	var docType = {
		templateUrl: 'app/form/partials/docType.tmpl.html',
		controller : docTypeController
	};
	
	/** @ngInject*/
	function docTypeController ($rootScope,
								dmService){
		
		this.$onInit = function (){
			this.dmData = angular.copy($rootScope.formData);
			this.options = _options;
			this.incomeDoc = '';
		};
		this.updateSection = _updateSection;
		this.save = _save;
		
		function _save (){
			this.dmData.docType = this.incomeDoc;
			dmService.updateFormData(this.dmData);
		}
		
		function _updateSection (){
			this.dmData.docType = this.docType;
		}
	}
	
	
	angular.module('drop')
		.component('docType', docType)
})();