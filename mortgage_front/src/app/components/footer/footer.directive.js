(function (){
	'use strict';

	angular
		.module('drop')
		.directive('dmFooter', dmFooter);

	/** @ngInject */
	function dmFooter (){
		var directive = {
			restrict        : 'E',
			templateUrl     : 'app/components/footer/footer.html',
			scope           : {
				creationDate: '='
			},
			controller      : FooterController,
			controllerAs    : 'vm',
			bindToController: true
		};

		return directive;

		/** @ngInject */
		function FooterController (){
			var vm = this;
			vm.currentYear = Date.create().format('{year}');
			// "vm.creationDate" is available by directive option "bindToController: true"

		}
	}


})();
