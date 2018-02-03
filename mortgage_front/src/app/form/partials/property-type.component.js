(function() {
    "use strict";

    var _options = [{
        val: 'SINGLEFAMDET',
        label: 'Single Family Home',
        img: '',
        icon: 'home'
    }, {
        val: 'SINGLEFAMATT',
        label: 'Townhome',
        img: '',
        icon: 'domain'
    }, {
        val: 'LOWRISECONDO',
        label: 'Condominium',
        img: '',
        icon: 'location_city'
    }, {
        val: '2TO4UNITFAM',
        label: 'Multi-Family Home',
        img: '',
        icon: 'people'
    }, {
        val: 'MOBILEPERMANENT',
        label: 'Manufactured or Mobile Home',
        img: '',
        icon: 'build'
    }];



    var propertyType = {
        templateUrl: 'app/form/partials/property-type.tmpl.html',
        controller: propertyTypeController
    };
    /** @ngInject*/
    function propertyTypeController($rootScope,
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


    angular.module('utils.autofocus', [])

    .directive('autofocus', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            link: function($scope, $element) {
                $timeout(function() {
                    $element[0].focus();
                });
            }
        }
    }]);

    angular.module('drop')
        .component('propertyType', propertyType)
})();
