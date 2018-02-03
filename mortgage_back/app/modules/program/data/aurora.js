let program = {
	    program      : "Aurora",
	    name         : "Aurora",
	    docTypes     : ["FullDoc", "24MonthsBankStatements"],
	    maxLoanAmount: 2500000,
	    minFico      : 600,
	    products     : ['5/1', '7/1', '30Fix'],
	    ltvBuckets   : [60, 65, 70, 75, 80, 85],
	    creditBuckets: [700, 680, 660, 640, 620, 600],
	    data         : [
		    [5375, 5500, 5750, 5990, 6375, 6990],
		    [5500, 5750, 5990, 6250, 6625, 7375],
		    [5875, 6125, 6375, 6625, 6875, 7750],
		    [6125, 6375, 6625, 6875, 7250, "N/A"],
		    [6375, 6625, 6990, 7250, 7625, "N/A"],
		    [6750, 6990, 7250, 7625, 7990, "N/A"]
	    ],
	    conditions   : {
		    docType  : {
			    "24MonthsBankStatements": {
				    "A" : [0, 0, 0, 0, 0, 0],
				    "A-": [0, 0, 0, 0, 0, 0],
				    "B+": [375, 375, 500, 500, 500, "N/A"],
				    "B" : [875, 1000, 1125, 1250, 1250, "N/A"],
				    "C" : [375, 500, 625, 750, 750, "N/A"]
			    }
		    },
		    grade    : {
			    "A" : [0, 0, 0, 0, 0, 0],
			    "A-": [500, 500, 500, 500, 500, "N/A"],
			    "B+": [500, 500, 625, 625, 625, "N/A"],
			    "B" : [625, 625, 625, 625, 625, "N/A"],
			    "C" : [500, 500, 500, 500, 500, "N/A"]
		    },
		    product  : {
			    "7/1"  : [125, 125, 125, 125, 125, 125],
			    "30Fix": [375, 375, 375, 250, 250, 250]
		    },
		    loanTotal: {
			    "600000" : [250, 250, 250, 250, 250, 250],
			    "1000000": [-125, -125, -125, 0, 0, 0],
			    "2500000": [0, 0, 125, 125, 125, "N/A"]
		    },
		    loanType : {
			    "CASHOUT": [500, 500, 500, 500, 500, "N/A"]
		    }
		    ,
		    propType : {
			    "LOWRISECONDO": [0, 0, 0, 0, 125, 250]
		    },
		    propUse  : {
			    "SecondHome": [500, 500, 500, 500, 500, "N/A"]
		    }
	    },
	    applicant : {},
	    adjectmentCount : 0,
	    creditGrader : creditGrader,
	    qualify      : qualify,
	    adjust       : adjust
    }
;

module.exports = program;

function creditGrader (i){
	if (i.housing_history === '0x30'){
		i.grade = 'A';
	}
	else if (i.housing_history === '1x30' && i.fico >= 700){
		i.grade = 'A-';
	}
	else if (i.housing_history === '0x60'){
		i.grade = 'B+';
	}
	else if (i.housing_history === '0x130'){
		i.grade = 'B';
	}
	else if (i.housing_history === '1x30' && i.fico < 700){
		i.grade = 'C';
	}
	else{
		i.grade = false;
	}

}

function qualify (i){
	program.creditGrader(i);
	let part1 = (i.loanTotal > program.maxLoanAmount)
		|| program.docTypes.none(i.docType)
		|| program.products.none(i.product)
		|| program.minFico > i.creditRange
		|| !i.grade;


	let part2 = i.ltv > 80 && (
			i.grade !== 'A'
			|| ( i.creditRange < 660 && i.product === '5/1')
			|| i.loanTotal > 1000000
			|| i.docType !== 'FullDoc'
			|| i.propType !== 'LOWRISECONDO'
		);
	// program.applicant = Object.clone(i);
	return !(part1||part2)

}



function adjust (appData,promise){
	let app = Object.clone(appData);

	// console.log('program.applicant ', program.applicant.rate);
	program.creditGrader(app);
	let ltvIndex = this.ltvBuckets.findIndex(function (n){
		return n >= app.ltv;
	});

	let creditIndex = this.creditBuckets.findIndex(function (n){
		return n <= app.fico;
	});

	app.adjustments = {};
	app.baseRates = this.data[creditIndex].clone();
	app.rates = this.data[creditIndex].clone();
	Object.forEach(this.conditions, function (val, key){

		let _adjustments = val[app[key]] || false;
		let _rates;
		let depth = 0;

		if (!_adjustments && !(key === 'loanTotal' || key === 'grade')){
			return
		}
		else if (key === 'loanTotal'){
			_adjustments = val
		}
		depth = Array.isArray(_adjustments) ? ++depth : depth;

		if (depth){

			depth = Array.isArray(_adjustments[0]) ? ++depth : depth;

		}
		else if (Object.isObject(_adjustments) && key === 'docType'){

			_rates = _adjustments[app.grade]
		}
		else if (Object.isObject(_adjustments) && key === 'loanTotal'){

			let loanIndex = Object.keys(_adjustments).find(function (val){
				
				return parseInt(val) > app.loanTotal
			});
			console.log('loanIndex :  ',loanIndex);
			_rates = _adjustments[loanIndex]
		}

		if (depth === 2){
			depth = Array.isArray(_adjustments[0]) ? ++depth : depth;
		}

		if (depth === 2){
			_rates = _adjustments[creditIndex]
		}
		else if (depth === 1){
			_rates = _adjustments;
		}
		let _before = app.rates.clone();
		
		_rates.map(function (val2, key2){
			app.rates[key2] = [app.rates[key2], val2].none("N/A") ? val2 + app.rates[key2] : "N/A"

		});
		let _after = app.rates.clone();
		if(!_before.isEqual(_after)&&_before[ltvIndex]!==_after[ltvIndex]){
			app.adjustments[key] = {'before':_before[ltvIndex],"after":_after[ltvIndex]};
		}
	
		// app.adjustments.push(key, app.rates);

	});


	app.rate = app.rates[ltvIndex];
	app.maxLtvIndex = (app.rates.some("N/A") ? app.rates.findIndex(function (a){
			return a === "N/A"
		}) : app.rates.length) - 1;
	app.maxLtv = this.ltvBuckets[app.maxLtvIndex];
	// console.log(app);
	// program.applicant = app;
	if(app.rate!='N/A'){
		return promise.resolve(app);
	}
	return promise.resolve('');
}