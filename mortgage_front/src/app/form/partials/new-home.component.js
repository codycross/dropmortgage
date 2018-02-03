(function (){
	"use strict";
	var _options = [
		{
			val  : '1',
			label: 'Yes',
			img  : '',
			icon : 'check'
		}, {
			val  : '0',
			label: 'No',
			img  : '',
			icon : 'clear'
		}
	];
	
	var newHome = {
		templateUrl: 'app/form/partials/new-home.tmpl.html',
		controller : newHomeController
	};
	
	/** @ngInject*/
	function newHomeController ($rootScope,
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
		.component('newHome', newHome)
})();
