(function() {
    "use strict";
   

	var _inputSettings = {
		max     : 850,
		min     : 500,
		step    : 10,
		label   : '$',
		multiple: 1,
		id      : 'credit-range'
	};

    var creditScore = {
        templateUrl: 'app/form/partials/credit-score.tmpl.html',
        controller: creditScoreController
    };
    /** @ngInject*/
    function creditScoreController($rootScope,
								   dmService){
		
		this.$onInit = function (){
			this.dmData = angular.copy($rootScope.formData);
			this.inputSettings = _inputSettings;
			this.sliderCount = angular.copy(this.dmData.creditRange) || 730;
		};

	    this.updateSection = _updateSection;
	    this.save = _save;

	    function _save (){
		    this.dmData.creditRange = this.sliderCount * this.inputSettings.multiple;
		    dmService.updateFormData(this.dmData);
	    }

	    function _updateSection (){
		    this.dmData.creditRange = this.sliderCount * this.inputSettings.multiple;
	    }

    }

    angular.module('drop')
        .component('creditScore', creditScore)
})();
