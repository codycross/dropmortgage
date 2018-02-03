(function (){
	"use strict";
	var _inputSettings = {
		max     : 7,
		min     : 0,
		step    : 1,
		multiple: 1,
		label   : 'Years',
		id      : 'bankruptcy-info'
	};
	
	
	var bankruptcyInfo = {
		templateUrl: 'app/form/partials/bankruptcyInfo.tmpl.html',
		controller : bankruptcyInfoController
	};
	
	/** @ngInject*/
	function bankruptcyInfoController ($rootScope,
									   dmService){
		this.$onInit = function (){
			this.dmData = angular.copy($rootScope.formData);
			this.inputSettings = _inputSettings;
			this.years = angular.copy(this.dmData.bankruptcyInfo) || 2;
		};
		this.updateSection = _updateSection;
		this.save = _save;
		
		function _save (){
			this.dmData.bankruptcyInfo = this.years * this.inputSettings.multiple;
			dmService.updateFormData(this.dmData);
		}
		
		function _updateSection (){
			this.dmData.bankruptcyInfo = this.years * this.inputSettings.multiple;
		}
		
	}
	
	angular.module('drop')
		.component('bankruptcyInfo', bankruptcyInfo)
})();