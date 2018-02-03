const config = require('../../config');
const mailgun = require('mailgun-js')({apiKey: config.mailgun.api_key, domain: config.mailgun.domain});
var list = mailgun.lists(config.leads.mailingList);
const Promise = require('bluebird');
const premailer = require('premailer-api');
const prepareEmail = Promise.promisify(premailer.prepare);


const argv = require('yargs').argv;

const nunjucks = require('nunjucks').configure('app/templates');



module.exports = {
	sendResults : sendResults,
	applicantEmail : applicantEmail,
	leadNotification : leadNotification
};

function _prepEmail (data, _html){
	return prepareEmail({ html: _html })
		.then(function _mappingEmail(email){
			
			if(email && email.html){
				data.html = email.html;
			}
			if(email && email.text){
				data.text = email.text;
			}
			return data;
		})
}



function _sendEmail(options){
	
	if(argv.nomail){
		return Promise.resolve('simulated send '+ options.subject);
	}
	return mailgun.messages().send(options)
	
}

function _mailgunSuccess(body) {
	console.info('_mailgunSuccess : ',body);
}

function _mailgunErr(err){
	console.error("got an error: ", err);
}

function applicantEmail (options,results){
	if(results){
		// options.report = report;
		options.programs = results;
	}
	console.log('applicantEmail Keys : ',Object.keys(options.programs))
	let _html =  nunjucks.render('applicant.html',options);

	let data = {
		//Specify email data
		from: config.mailgun.from_who,
		to : options.contact.email,
		//Subject and text data  
		subject: 'DropMortgage Results'
	};
	
	addLead(options);


	return _prepEmail(data, _html)
		.then(_sendEmail)
		.then(_mailgunSuccess)
		.catch(_mailgunErr);
}

function leadNotification (options,results){
	if(results){
		// options.report = report;
		options.programs = results;
	}
	let _html =  nunjucks.render('new-lead.html',options);

	let data = {
		//Specify email data
		from: config.mailgun.from_who,
		to : config.leads.email,
		//Subject and text data  
		subject: 'New Lead!'
	};



	return _prepEmail(data, _html)
		.then(_sendEmail)
		.then(_mailgunSuccess)
		.catch(_mailgunErr);
}

function sendResults (options,html){
	let _html =  nunjucks.render('order.html',{
		name:options.name,
		contact : options.contact,
		report : html
	});
	
	let data = {
		//Specify email data
		from: config.mailgun.from_who,
		to : options.contact.email,
		//Subject and text data  
		subject: 'DropMortgage Quick Quote Results'
	};
	
	
	
	return _prepEmail( _html,data)
		.then(_sendEmail)
		.then(_mailgunSuccess)
		.catch(_mailgunErr);
}

/**
 * START
 * LEADS SECTION
 */

function _addNewLead(user){
	list.members().create(user, function (err, body) {
		console.log('_addNew   : ',err);
		
	});
	
}
function _updateLead(user){
	list.members(user.address).update(user, function (err, body) {
		console.log('_updateUser   : ',body);

	});

}

function addLead (data){
	let newMember = { 
		name: data.name, 
		address: data.contact.email, 
		vars : {
			phone : data.contact.phone
		}, 
		subscribed: true
	};
	list.members(newMember.address).info(function (err, body) {
		if(err){
			return _addNewLead(newMember);
		}
		return _updateLead(newMember);
		// return Promise.resolve(body);
	});
	
}

/**
 * END LEADS
 */

