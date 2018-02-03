(function (){
	"use strict";
	
	angular.module('drop')
		.config(routerConfig);
		
	
	/** @ngInject */
	function routerConfig ($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('step', {
				url     : '/',
				abstract: true,
				template: '<form class="dm-container" flex id="dmform" name="projectForm"  layout="column" layout-align="start stretch" layout-fill style="padding: 0 15px 30px;">' 
				+ '<ui-view/>' 
				+ '</form>'
			})
			.state('step.index',{
				url : '',
				template : '<loan-type class="dm-section"></loan-type>'
			})
			.state('step.propType',{
				url : 'propType',
				template : '<property-type class="dm-section"></property-type>'
			})
			.state('step.propUse',{
				url : 'propUse',
				template : '<property-use class="dm-section"></property-use>'
			})
			.state('step.propLoc',{
				url : 'propLoc',
				template : '<property-location class="dm-section"></property-location>'
			})
			.state('step.newHome',{
				url : 'newHome',
				template : '<new-home class="dm-section"></new-home>'
			})
			.state('step.realAgent',{
				url : 'realAgent',
				template : '<realestate-agent class="dm-section"></realestate-agent>'
			})
			.state('step.realOpt',{
				url : 'realOpt',
				template : '<realtor-optin class="dm-section"></realtor-optin>'
			})
			.state('step.purchasePrice',{
				url : 'purchasePrice',
				template : '<purchase-price class="dm-section"></purchase-price>'
			})
			.state('step.percentDown',{
				url : 'percentDown',
				template : '<down-payment class="dm-section"></down-payment>'
			})
			.state('step.reserves',{
				url : 'reserves',
				template : '<reserves class="dm-section"></reserves>'
			})
			.state('step.foreign',{
				url : 'foreignNational',
				template : '<foreign-national class="dm-section"></foreign-national>'
			})
			.state('step.creditRange',{
				url : 'creditRange',
				template : '<credit-score class="dm-section"></credit-score>'
			})
			.state('step.dob',{
				url : 'dob',
				template : '<dob class="dm-section"></dob>'
			})
			.state('step.military',{
				url : 'military',
				template : '<military class="dm-section"></military>'
			})
			.state('step.bankruptcy',{
				url : 'bankruptcy',
				template : '<bankruptcy class="dm-section"></bankruptcy>'
			})
			.state('step.bankruptcyInfo',{
				url : 'bankruptcyInfo',
				template : '<bankruptcy-info class="dm-section"></bankruptcy-info>'
			})
			.state('step.foreclosureInfo',{
				url : 'foreclosureInfo',
				template : '<foreclosure-info class="dm-section"></foreclosure-info>'
			})
			.state('step.mortgageHistory',{
				url : 'mortgageHistory',
				template : '<mortgage-history class="dm-section"></mortgage-history>'
			})
			.state('step.product',{
				url : 'product',
				template : '<product class="dm-section"></product>'
			})
			.state('step.userAddress',{
				url : 'userAddress',
				template : '<dm-address class="dm-section" ></dm-address>'
			})
			.state('step.docType',{
			url : 'docType',
			template : '<doc-type class="dm-section"></doc-type>'
		})
			.state('step.name',{
				url : 'name',
				template : '<name class="dm-section"></name>'
			})
			.state('step.contact',{
				url : 'contact',
				template : '<contact class="dm-section"></contact>'
			})
			.state('report',{
				url : '/report',
				template : '<dm-report></dm-report>'
			});
		$urlRouterProvider.when('/loanType','/');
		$urlRouterProvider.otherwise('/');
	}
})();

