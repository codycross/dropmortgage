(function (){
	
	// var _inputSettings = {
	// 	max     : 7,
	// 	min     : 0,
	// 	step    : 1,
	// 	multiple: 1,
	// 	label   : 'Years',
	// 	id      : 'foreclosure-info'
	// };
	var _options = [
		{
			val  : 'lt12',
			label: '&lt; 12 <br/>months',
			img  : '',
			id   : 'bankruptcy-or-foreclosure-no',
			icon : 'check_box'
		}, {
			val  : '12to24',
			label: '12 to 24 <br/>months',
			img  : '',
			id   : 'bankruptcy-or-foreclosure-bankruptcy',
			icon : 'assignment_late'
		}, {
			val  : 'gt24',
			label: '&gt; 24 <br/>months',
			img  : '',
			id   : 'bankruptcy-or-foreclosure-foreclosure',
			icon : 'report'
		}
	];
	
	var foreclosureInfo = {
		templateUrl: 'app/form/partials/foreclosureInfo.tmpl.html',
		controller : foreclosureInfoController
	};
	
	/** @ngInject*/
	function foreclosureInfoController ($rootScope,
										dmService){
		
		this.$onInit = function (){
			this.dmData = angular.copy($rootScope.formData);
			// this.inputSettings = _inputSettings;
			this.options = _options;
			// this.years = angular.copy(this.dmData.foreclosureInfo) || 2;
		};
		this.updateSection = _updateSection;
		this.save = _save;
		
		function _save (){
			this.dmData.foreclosureInfo = this.years * this.inputSettings.multiple;
			dmService.updateFormData(this.dmData);
		}
		
		function _updateSection (val, key){
			this.dmData[key] = val;
			dmService.updateFormData(this.dmData);
		}
		
	}
	
	angular.module('drop')
		.component('foreclosureInfo', foreclosureInfo)
})();