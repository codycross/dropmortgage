(function (){
	"use strict";
	angular.module('drop')
		.service('dmFormService', dmFormService);
	
	var formSections = [
		{
			label    : "Great! What type of property are you purchasing?",
			inputType: 'radio',
			options  : [
				{
					label: "Single Family Home",
					image: "",
					value: ""
				}, {
					label: "Townhouse",
					image: "",
					value: ""
				}, {
					label: "Condominium",
					image: "",
					value: ""
				}, {
					label: "Multifamily Home",
					image: "",
					value: ""
				}, {
					label: "Manufactured or Mobile Home",
					image: "",
					value: ""
				}
			]
		}, {
			label    : "How will this property be used?",
			inputType: 'radio',
			options  : [
				{
					label: "Primary Home",
					image: "",
					value: ""
				}, {
					label: "Secondary Home",
					image: "",
					value: ""
				}, {
					label: "Rental Property",
					image: "",
					value: ""
				}
			]
		}, {
			label    : "In what city will the property be located?",
			inputType: 'cityState',
			mask     : "City, State"
		},{
			label : "Have you already found your new home?",
			inputType : "radio",
			options : [{
				label : "yes",
				image : "",
				value : 1
			},{
				label : "no",
				image : "",
				value : -1
			}]
		},{
			label : "Are you currently working with a real estate agent?",
			inputType : "radio",
			options : [{
				label : "yes",
				image : "",
				value : 1
			},{
				label : "no",
				image : "",
				value : -1
			}]
		},{
			label : "Would you like a no obligation consultation from a local real estate agent?",
			inputType : "radio",
			options : [{
				label : "yes",
				image : "",
				value : 1
			},{
				label : "no",
				image : "",
				value : -1
			}]
		},{
			label : "What is the estimated purchase price?",
			inputType : "slider",
			
			options : {
				range : {
					low : {
						label : "$0",
						val : 0
					},
					high: {
						label : "$2M+",
						val : 2000000
					},
					increment : 10000
				}
			}
		},{
			label : "How much are you putting down as a down payment?",
			inputType : "slider",
			
			options : {
				range : {
					low : {
						label : "0%",
						val : 0
					},
					high: {
						label : "90%",
						val : 90
					},
					increment : 5
				}
			}
		},{
			label    : "Estimate your credit score",
			inputType: 'radio',
			options  : [
				{
					label: "Excelent",
					image: "",
					value: ""
				}, {
					label: "Good",
					image: "",
					value: ""
				}, {
					label: "Fair",
					image: "",
					value: ""
				},{
					label: "Poor",
					image: "",
					value: ""
				}
			]
		}
	];
	
	function dmFormService (){
		return {
			formSections : formSections
		}
	}
})();