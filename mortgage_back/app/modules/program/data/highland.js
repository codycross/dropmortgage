let program = {
	program      : "Highland",
	name         : "Highland",
	docTypes     : ["FullDoc", "24MonthsBankStatements", "12MonthsBankStatements"],
	maxLoanAmount: 3000000,
	minFico      : 620,
	products     : ['5/1', '7/1', '30Fix'],
	ltvBuckets   : [60, 65, 70, 75, 80, 85],
	creditBuckets: [720, 700, 680, 660, 640, 620],
	data         : [
		[4625, 4750, 4875, 4990, 5375, 5875],
		[4750, 4875, 4990, 5250, 5625, 6125],
		[4875, 4990, 5250, 5375, 5750, 6375],
		[4990, 5250, 5500, 5750, 6125, 6875],
		[5375, 5625, 5750, 6125, 6625, "N/A"],
		[5625, 5875, 6250, 6750, 7125, "N/A"]
	],
	conditions : {
		docType : {
			"24MonthsBankStatements" : [
				[625 , 750, 1000, 1125, 1500, 2250],
				[625 , 875, 1125, 1375, 1625, 2500],
				[625 , 875, 1250, 1500, 1750, 2750],
				[750 , 1000, 1375, 1625, 2125, "N/A"],
				[750 , 1000, 1375, 1750, 2125, "N/A"],
				[750 , 1125, 1500, 1875, 2375, "N/A"]
			],
			"12MonthsBankStatements" : [
				[ 875 , 1000, 1375, 1500, 2000, "N/A"],
				[1000 , 1250, 1625, "N/A", "N/A", "N/A"],
				[1250 , 1500, 1875, "N/A", "N/A", "N/A"]
			]
		},
		grade : {
			"A" : [250, 250, 250, 250, 250, 250]
		},
		loanType : {
			"CASHOUT" : [250, 250, 250, 250, 250, 250]
		},
		propType : {
			"2TO4UNITFAM" : [250, 250, 250, 250, 250, "N/A"],
			"LOWRISECONDO" : [0, 0, 0, 0, 125, 250]
		},
		product : {
			"7/1" : [250, 250, 250, 250, 250, 250],
			"30Fix" : [625, 625, 625, 500, 500, 500]
		},
		loanTotal : {
			"600000":[375,375,375,250,250,250],
			"1000000":[0,0,0,0,0,0],
			"1500000":[0,0,0,0,125,"N/A"],
			"3000000":[125,125,125,250,375,"N/A"]
		}
	},
	applicant : {},
	adjectmentCount : 0,
	creditGrader : creditGrader,
	qualify      : qualify,
	adjust       : adjust
};

module.exports = program;

function creditGrader (i){
	var grade;
	if (i.creditRange >= 660 && i.housing_history === '0x30'){
		grade = 'A+';
	}
	else if (i.creditRange >= 620 && (i.housing_history === '0x30' || i.housing_history === '1x30')){
		grade = 'A';
	}
	else{
		grade = false;
	}
	return grade;
}

function qualify (i){
	i.grade = program.creditGrader(i);
	let part1 = (i.loanTotal > program.maxLoanAmount)
		|| program.docTypes.none(i.docType)
		|| program.products.none(i.product)
		|| program.minFico > i.creditRange
		|| !i.grade;
	
	let part2 = (i.docType==="12MonthsBankStatements" && i.fico<680);
	// program.applicant = Object.clone(i);
	return !(part1||part2)

}



function adjust (appData,promise){
	let app = Object.clone(appData);

	// console.log('program.applicant ', program.applicant.rate);
	app.grade = program.creditGrader(app);
	let ltvIndex = program.ltvBuckets.findIndex(function(n) {
		return n>= app.ltv;
	});
	let creditIndex = this.creditBuckets.findIndex(function(n) {
		return n<= app.fico;
	});
	app.adjustments = {};
	app.baseRates = this.data[creditIndex].clone();
	app.rates = this.data[creditIndex].clone();
	Object.forEach(this.conditions,function (val, key){
	
		let _adjustments = val[app[key]]||[];
		let _rates;
		let depth = 0;
		if (!_adjustments && !(key === 'loanTotal' || key === 'grade')){
			return
		}
		else if (key === 'loanTotal'){
			_adjustments = val
		}
		depth = Array.isArray(_adjustments)?++depth:depth;
		
		if(depth){
			depth = Array.isArray(_adjustments[0])?++depth:depth;
		}
		else if (Object.isObject(_adjustments) && key === 'docType'){

			_rates = _adjustments[creditIndex]
		}
		else if (Object.isObject(_adjustments) && key === 'loanTotal'){

			let loanIndex = Object.keys(_adjustments).find(function (val){
				
				return parseInt(val) > app.loanTotal
			});
			console.log('loanIndex :  ',loanIndex);
			_rates = _adjustments[loanIndex]
		}
		if(depth === 2){
			_rates = _adjustments[creditIndex]
		}
		else if(depth===1){
			_rates = _adjustments;
		}

		let _before = app.rates.clone();
		_rates.map(function (val2, key2){
		
			app.rates[key2] = [app.rates[key2],val2].none("N/A") ? val2 + app.rates[key2] : "N/A"

		});
		let _after = app.rates.clone();
		if(!_before.isEqual(_after)&&_before[ltvIndex]!==_after[ltvIndex]){
			app.adjustments[key] = {'before':_before[ltvIndex],"after":_after[ltvIndex]};
		}
	});
	app.rate = app.rates[ltvIndex];
	app.maxLtvIndex = (app.rates.some("N/A")?app.rates.findIndex(function (a){
		return a === "N/A"
	}):program.ltvBuckets.length)-1;
	app.maxLtv = program.ltvBuckets[app.maxLtvIndex];
	// console.log(app);
	if(app.rate!='N/A'){
		return promise.resolve(app);
	}
	return promise.resolve('');
}