const Promise = require('bluebird');
const util = require('util');
const email = require('../email/model');
const Joi = require('joi');

const nunjucks = require('nunjucks').configure('app/templates');

Promise.config({
    // Enable warnings
    warnings: true,
    // Enable long stack traces
    longStackTraces: true,
    // Enable cancellation
    cancellation: true,
    // Enable monitoring
    monitoring: true
});
/**
 * Consolidates all mortgage products into an array.
 */



module.exports = {
    build: build,
};
let programs = require('../program');



function _prequals(data) {
	
    return Promise.filter(programs, function(program) {
	    // console.log(program.name+' adjusted count  : ',program.adjectmentCount);
        return program.qualify(data);
    })
        .map(function(result) {
        // result.applicant = Object.clone(data);
        // result.creditGrader(result.applicant);
        return [result,Object.clone(data)]
    })

}

function _processProgram(resp) {

    var temp = Object.clone(resp[0]);
	// console.log('processProgram applicat rate    :    ',temp.applicant.rate);
	
	// ++temp.adjuctmentCount;
	// console.log('processProgram applicat rate    :    ',temp.applicant.rate);
	return temp.adjust(resp[1],Promise)
        .then(function (applicant){
            if(applicant){
                temp.applicant = Object.filter(applicant,function(val,key){
                return ['ltv','maxLtv','rate','adjustments','grade'].some(key);
            });
            return temp
            }
            return ;
        })
   
}

function _populateReport(results) {
    console.log(results.length);
    var resp = {
        programs: [],
        qualified : false,
        emailReport: false,
        displayOptions: {
            quick_quote_requirements: 0,
            finishLoading: false
        },
        html: ""
    };
    var params = {};
    if (!results|| results.length<1) {
        resp.html = "<div class =\'quick_quote_no_results\' >" + " There are no qualifying programs for the above selection criteria at this time. " + "</div>";
        resp.displayOptions.finishLoading = true;
        return Promise.reject('No qualifying rates');

    } else {
        results = results.map(function(result){
            let _temp = false;
            try{
                result.applicant.program = result.program;
                _temp = result.applicant;
            }catch(e){}
            
        return _temp;
    })
    results = results[0]? results : false;

    
        // resp.reportData = params;
        // resp.html = nunjucks.render('report.html', params);
    }
    if(results){
        params = {
        programs: results
    };
        resp.qualified = true;
        resp.emailReport = true;
        resp.programs = results;
       
        resp.displayOptions.quick_quote_requirement = true;
    }
     resp.displayOptions.finishLoading = true;
    console.log('results   ',results);

    return Promise.resolve(resp)
}


function build(appData) {

    var formData = appData;
   
    formData.fico = formData.creditRange;
    return _prequals(formData)
        .mapSeries(_processProgram)
        .then(_populateReport)
        .then(function(results) {
            console.log('Results   :   ',!!results);
            if (results && results.emailReport) {
	            results.programs.forEach(function(program){
	                console.log('Program Name  : ',program.program);
                });
                email.applicantEmail(formData, results.programs);
                email.leadNotification(formData, results.programs)
            }
            return results
        })
        .catch(function(err) {
            console.log(err);
            let _err = {
                msg: err,
                action: 'missingInfo'
            };
            return Promise.reject(_err);
        })
}










