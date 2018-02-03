(function (){
	"use strict";
	angular.module('drop')
		.factory('reportService', reportService);


	/** @ngInject */
	function reportService ($location, $timeout, $rootScope, $http, $q, $window, $log, $state, $mdDialog,
	                        API_URL){

		var _testingFormDataInit = {
			loanType       : null,
			housing_history: '0x30',
			propType       : null,
			propUse        : null,
			propLoc        : null,
			newHome        : null,
			ltv            : null,
			loanTotal      : null,
			foreign        : 'No',
			realAgent      : null,
			realOpt        : null,
			purchasePrice  : null,
			percentDown    : null,
			creditRange    : null,
			docType        : null,
			dob            : null,
			military       : null,
			bankruptcy     : null,
			bankruptcyInfo : null,
			foreclosureInfo: null,
			userAddress    : {
				street: null,
				zip   : null,
				city  : null
			},
			name           : null,
			contact        : {
				phone: null,
				email: null
			}
		};

		$window.setTestUser = function (obj){
			$rootScope.formData = _testingFormDataInit;
			if (obj){
				$rootScope.formData = angular.merge({}, _testingFormDataInit, obj)
			}
			console.log(JSON.stringify($rootScope.formData));
			$mdDialog.hide();
			initialize();
		};


		return {
			init: initialize
		};

		function initialize (){
			// var m, l, n;
			//
			// var htmlTable = f();
			// return $timeout(function(){
			// 	return $q.resolve([htmlTable,displayOptions]);
			// },700)
			return $http.post(API_URL + '/report', $rootScope.formData
				)
				.then(function (resp){
					if (resp){
						resp = angular.fromJson(resp.data);
					}
					$log.debug(resp);
					return [resp, resp.displayOptions]
				})
				.catch(function (err){
					$log.debug(err);
					if (err){
						err = angular.fromJson(err.data);
					}
					if (err.action === 'missingInfo'){
						return	missingInfo();
					}
				})
		}


		function missingInfo (){
			return $mdDialog.show(
				$mdDialog.alert()
					.clickOutsideToClose(false)
					.title('Uh Oh! Missing Info')
					.textContent(
						'It appears that you\'re missing some necessary details. Please make sure to complete all the required fields!')
					.ariaLabel('Uh Oh! Missing Info')
					.ok('Whoops, OK!')
			).then(function (){
				return $state.go('step.index')
			})
		}

	}


})();