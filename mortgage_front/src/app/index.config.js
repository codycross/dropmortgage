(function() {
    'use strict';

    angular
        .module('public')
        .config(config);

    /** @ngInject */
    function config($logProvider, toastrConfig, $mdThemingProvider,$locationProvider, $mdIconProvider) {
        // Enable log
        $logProvider.debugEnabled(true);
        // $mdIconProvider.fontSet('md', 'material-icons');
		$locationProvider.html5Mode({
										enabled: true,
										requireBase: false
									});

        $mdThemingProvider.theme('default')
            .primaryPalette('light-blue')
            .accentPalette('light-blue');
        // Set options third-party lib
        toastrConfig.allowHtml = true;
        toastrConfig.timeOut = 3000;
        toastrConfig.positionClass = 'toast-top-right';
        toastrConfig.preventDuplicates = true;
        toastrConfig.progressBar = true;
    }

})();
