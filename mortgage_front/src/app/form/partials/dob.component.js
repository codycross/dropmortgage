(function (){
	"use strict";
	
	var dob = {
		templateUrl: 'app/form/partials/dob.tmpl.html',
		controller : dobController
	};
	/** @ngInject*/
	function dobController ($rootScope,$log,dmService){
		
		this.updateSection = _updateSection;
		this.$onInit = _init;
		function _updateSection(){
			// this.dmData.loanType = this.loanType;
			// this.dmSection = 'military';
			this.dmData.dob = moment(this.dob).format();
			$log.debug('dob',this.dmData.dob);
			dmService.updateFormData(this.dmData);
		}
		
		function _init(){
			this.dob = new Date(1985, 9, 16);
			this.dmData = angular.copy($rootScope.formData);
		}
	}
	
	
	
	angular.module('drop')
		.component('dob',dob)
})();