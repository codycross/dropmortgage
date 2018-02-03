(function (){
	"use strict";
	angular.module('drop')
		.factory('dmService', dmService);
	
	
	
	
	var _history = [];
	//TODO: right now we are just defaulting to purchase loan types... to complicated to do all 4 rn
	var _formDataInit = {
		loanType       : 'PURCHASE',
		housing_history: '0x30',
		propType       : null,
		propUse        : null,
		propLoc        : null,
		newHome        : null,
		ltv			   : null,
		loanTotal      : null,
		foreign        :'No',
		realAgent      :'No',
		realOpt        : null,
		purchasePrice  : null,
		percentDown    : null,
		creditRange    : null,
		docType        : null,
		dob            : '1',
		military       : '1',
		bankruptcy     : null,
		bankruptcyInfo : null,
		foreclosureInfo: null,
		userAddress    : {
			// street: null,
			zip   : null,
			// city  : null
		},
		name           : null,
		contact        : {
			phone: null,
			email: null
		}
	};
	

	
	/** @ngInject */
	function dmService ($location, $rootScope, $q, $log, $state,$mdDialog){
		$rootScope.formData = {};
		
		var _formSections = [
			'loanType',
			'propType',
			'propUse',
			'propLoc',
			'newHome',
			'realAgent',
			'realOpt',
			'purchasePrice',
			'percentDown',
			'creditRange',
			// 'dob',
			// 'military',
			'bankruptcy',
			'bankruptcyInfo',
			'foreclosureInfo',
			'mortgageHistory',
			'product',
			'userAddress',
			'docType',
			'name',
			'contact'
		];
		
		var _specials = {
			newHome : function checkNewHome(){
				var appData = angular.copy($rootScope.formData);
				var resp = false;
				var isPurchase = angular.isDefined(appData.loanType) && appData.loanType == 'PURCHASE';

				if (isPurchase){
					resp = true;
				}
				return resp;
			},
			realAgent : function checkRealAgent(){
				var appData = angular.copy($rootScope.formData);
				var resp = false;
				var isPurchase = angular.isDefined(appData.loanType) && appData.loanType == 'PURCHASE';

				if (isPurchase){
					resp = true;
				}
				return resp;
			},
			realOpt	: function checkRealOpt(){
				var appData = angular.copy($rootScope.formData);
				var resp = false;
				var noAgent = angular.isDefined(appData.realAgent) && appData.realAgent == 0;
				var noHome = angular.isDefined(appData.newHome) && appData.newHome == 0;
				
				if (noAgent && noHome){
					resp = true;
				}
				return resp;
			},
			bankruptcyInfo : function checkBankruptcyInfo(){
				var appData = angular.copy($rootScope.formData);
				var resp = false;
				var hasBankruptcy = angular.isDefined(appData.bankruptcy) && ['BANKRUPTCY','BOTH'].some(appData.bankruptcy);
				if (hasBankruptcy){
					resp = true;
				}
				return resp;
			},
			foreclosureInfo : function checkForeclosureInfo(){
				var appData = angular.copy($rootScope.formData);
				var resp = false;
				var hasForeclosure = angular.isDefined(appData.bankruptcy) && ['FORECLOSURE','BOTH'].some(appData.bankruptcy);
				if (hasForeclosure){
					resp = true;
				}
				return resp;
			}
		};
		
		return {
			initialize    : initialize,
			processSteps  : processSteps,
			updateFormData: updateFormData,
			generateReport : generateReport
		};
		
		
		
		function initialize (){
			// var _search = $state.current.params.step;
			$rootScope.formData = angular.copy(_formDataInit);
			
		}
		
		function updateFormData (newFormData){
			
			$rootScope.formData = angular.merge($rootScope.formData, newFormData);
			$rootScope.$emit('dmFormData.updated', newFormData);
			nextStep();
			// processSteps()
			// 	.then(_gotToNextState);
			// function _gotToNextState(steps){
			//	
			// 	return $state.go('step.'+steps.section);
			// }
		}
		
		function generateReport(env){
			return $mdDialog.show(
				$mdDialog.alert()
					.parent(angular.element(document.querySelector('#popupContainer')))
					.clickOutsideToClose(true)
					.title('Generating Quick Quote Rates!')
					.textContent('Thank you '+$rootScope.formData.name+'! We\'re generating your quick quote report now. This may take a minute or two. Also remember all rates programs are subject to review. Have a nice day!')
					.ariaLabel('Alert Dialog Demo')
					.ok('Got it!')
					.targetEvent(env)
			).then(function (){
				$state.go('report');
			});
		}
		function _specialCheck(key){
			var keyCheck = key < _formSections.length+1;
			var targetState = _formSections[key];
			var specialCheck = _specials[targetState];
			
			
			if(!specialCheck){
				return key
			}else if(specialCheck()){
				
				return key
			}
			else if(keyCheck){
				return _specialCheck(key+1)
			}
			else{
				return _specialCheck(key-1)
			}
		}
		
		function nextStep (){
			var current = $state.current;
			var currentIndex = current.url?_formSections.indexOf(current.url):0;
			var targetIndex = (currentIndex<_formSections.length-1)?currentIndex+1:currentIndex;
			if(currentIndex==targetIndex){
				return false;
			}
			targetIndex = _specialCheck(targetIndex);
			var targetState = 'step.'+_formSections[targetIndex];
			
			$state.go(targetState);
		}
		
		function processSteps (){
			var currentFormData = angular.copy($rootScope.formData);
			var steps = {
				sections    : _formSections,
				currentIndex: 0,
				section     : _formSections[0]
			};
			// if($location.search().step 
			// 	&& _formSections.indexOf($location.search().step )>-1
			// 	&& currentFormData[$location.search().step]!== null
			// 	&& _history.some(function(hist){
			// 		return hist == $location.search().step
			// 	})
			// ){
			// 	steps.currentIndex = _formSections.indexOf($location.search().step);
			// 	steps.section = _formSections[steps.currentIndex];
			// 	return $q.resolve(steps);
			// }
			// else if(!$location.search().step
			// 	&& _history.length
			// && currentFormData['propType'] !== null){
			// 	steps.currentIndex = 1;
			// 	steps.section = _formSections[steps.currentIndex];
			// 	return $q.resolve(steps);
			// }
			
			for (var i = 0; i < _formSections.length - 1; ++i){
				var _key = _formSections[i];
				var specialCheck = currentFormData[_key] !== null
					&& _formSections[i+1] 
					&& _specials.some(function (special){
						return (special.section === _formSections[i+1])
							&& currentFormData[special.section] === null
					});
				if (
					angular.isDefined(currentFormData[_key]) 
					&& currentFormData[_key] !== null 
					// && !angular.isObject(currentFormData[_key])
					&& !specialCheck
				){
					steps.currentIndex = i + 1;
					steps.section = _formSections[steps.currentIndex];
				}
				else if(specialCheck
					// && !angular.isObject(currentFormData[i + 1])
				){
						if(!_processSpecial(_formSections[i+1],$rootScope.formData)){
							++i;
						}
					steps.currentIndex = i + 1;
					steps.section = _formSections[steps.currentIndex];
				}
				else{
					if(_history  
						&& !_history.some(function(hist){
						return hist == steps.section
						})
					&& steps.currentIndex > 1){
						_history.push(steps.section);
						// $location.search('step',steps.section);
					}
					
					break;
				}
			}
			// $log.debug($rootScope.$stateParams.step);
			return $q.resolve(steps);
		}
		
		function _processSpecial (_section,currentFormData){
			
			var _special = _specials.find(function (special){
				return special.section === _section
			});
			var match =  _special.requires.find(function(rec){
				var _keys = Sugar.Object.keys(rec);
				var _vals = Sugar.Object.values(rec);
				return _keys.every(function (_key, j){
					return currentFormData[_key] == _vals[j]
				})
			});
			
			
			return (match && match.length)?_section:false
		}
		
		
	}
	
	
})();