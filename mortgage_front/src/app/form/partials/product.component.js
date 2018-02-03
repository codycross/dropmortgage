(function (){
	"use strict";

	var _options = [
		{
			val  : '5/1',
			label: '5/1 - Default',
			img  : '',
			icon : 'clear'
		},{
			val  : '7/1',
			label: '7/1 - Rate Adjustment May Apply',
			img  : '',
			icon : 'check'
		}, {
			val  : '30Fix',
			label: '30-year Fixed - Rate Adjustment May Apply',
			img  : '',
			icon : 'check'
		}
	];


	var product = {
		templateUrl: 'app/form/partials/product.tmpl.html',
		controller : productController
	};

	/** @ngInject*/
	function productController ($rootScope,
	                                    dmService){

		this.$onInit = function (){
			this.dmData = angular.copy($rootScope.formData);
			this.options = _options;
			this.product = '';
		};
		this.updateSection = _updateSection;
		this.save = _save;

		function _save (){
			this.dmData.product = this.product;
			dmService.updateFormData(this.dmData);
		}

		function _updateSection (){
			this.dmData.product = this.product;
		}
	}


	angular.module('drop')
		.component('product', product)
})();