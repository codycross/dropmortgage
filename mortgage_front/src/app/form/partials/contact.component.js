(function (){
	"use strict";
	var contact = {
		templateUrl: 'app/form/partials/contact.tmpl.html',
		controller : contactController
	};
	
	/** @ngInject*/
	function contactController ($rootScope,
								dmService){
		
		
		this.$onInit = function (){
			this.dmData = angular.copy($rootScope.formData);
			
		};
		this.save = _save;
		function _save (env){
			this.dmData.contact = {
				phone: this.phone,
				email: this.email
			};
			dmService.updateFormData(this.dmData);
			dmService.generateReport(env);
		}
		
	}
	
	angular.module('drop')
		.component('contact', contact)
})();