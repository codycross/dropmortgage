(function (){
	'use strict';
	
	angular
		.module('public')
		.run(runBlock);
	
	/** @ngInject */
	function runBlock ($rootScope, $log){
		Sugar.extend();
		
	}
	
})();
