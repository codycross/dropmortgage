/* global malarkey:false, moment:false */
(function() {
	'use strict';

	angular
		.module('public')
		.constant('malarkey', malarkey)
		.constant('moment', moment)
			
		// THIS IS FOR LOCAL 
		// .constant('API_URL','http://localhost:3030');
	
		// THIS IS FOR REMOTE
	.constant('API_URL','https://shielded-woodland-47660.herokuapp.com');
})();

