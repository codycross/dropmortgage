(function() {
    "use strict";
    var dropMortgage = {
        template: '<ui-view/>',
        controller: /** @ngInject */ function controller(
            $rootScope, $log,
            dmService
        ) {
            var vm = this;
            var watchFormData;
            dmService.initialize();
            vm.$onInit = init;

            function init() {
                vm.formData = $rootScope.formData;
               
                watchFormData = $rootScope.$on('dmFormData.updated', function(event, formData) {
                    // $log.debug('dmFormData',formData);
                    vm.formData = angular.copy(formData);
                    // return getSteps();
                });
            }
        }
    };
    angular.module('drop')
        .component('dropMortgage', dropMortgage);
})();
