(function() {
	"use strict";
	var dmReport = {
		templateUrl: 'app/report/report.tmpl.html',
		controller: reportController
	};

	/** @ngInject */
	function reportController(
		$rootScope, $log, $document, $timeout,
		reportService
	) {
		var vm = this;
		vm.loadingView = true;
		vm.$onInit = _init;

		function _init() {
			vm.formData = $rootScope.formData;
			reportService.init()
				.then(function (report){
					$log.debug(report);
					vm.report = report[0];
					vm.report = report[0];
					vm.displayOptions = report[1];
					if(report[1] && (report[1].quick_quote_requirements || report[1].finishLoading)){
						vm.loadingView = false;
					}
				});

		}

		vm.prettyPercent = prettyPercent;

		function prettyPercent(rate){
			return rate/1000+' %';
		}
	}

	angular.module('drop')
		.component('dmReport', dmReport);
})();
