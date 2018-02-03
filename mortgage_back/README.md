# Drop Mortgage Server

## Running Server

### Local
1. install nodemon globaly `npm -g nodemon`  
2. Options  
     a. No Mail : `npm run local`  
     b. With Mail : `npm run local-mail`
3. Server should be running at `localhost:3030`
4. Templates are previewable at `localhost:3030/templates`

## Tools : Debugging and Testing  
### REST Client => [Insomnia](https://insomnia.rest/download/)
1. Download client
1. Import workspace configuration [config](./insomnia_workspace.json)
1. Use the environments to adjust variable values.
1. Create new requests in the workspace to test different scenarios. (**DO NOT continuously alter one request's values. Doing so make it hard to keep track of results from different scenarios**)

## Emails

### Lead Notification  
* To : email address set by `config.leads.email` in `app/config.js`
* From : ```config.mailgun.from_who``` **(This is a seperate config object because this value must also be a valid sender address in the mailgun web portal)**.
* Subject : This is set in the function  ```leadNotification | app/modules/email/model.js```. Adjust the value in the ```data``` object;
* Template : ```app/templates/new-lead.html```
* ~~Variables : any of the properties passed in from the form and the html report that is generated. The report is assigned to the property `"report"` .~~(**This is currently disabled since we aren't generating the html on the backend. Not hard to re-engage**)


### Applicant Email
* To : Email provided in the form submission
* From : ```config.mailgun.from_who``` **(This is a seperate config object because this value must also be a valid sender address in the mailgun web portal)**.
* Subject : This is set in the function  ```applicantEmail | app/modules/email/model.js```. Adjust the value in the ```data``` object;
* Template : ```app/templates/applicant.html```
* ~~Variables : any of the properties passed in from the form and the html report that is generated. The report is assigned to the property `"report"` .~~(**This is currently disabled since we aren't generating the html on the backend. Not hard to re-engage**)
* Other : the function for this email is also currently adding the email to a mailing list in mailgun. The mailing list is set in the config file but must also match up with an existing mailing list in the online portal.


## Templating 
* Template Engine : [Nunjucks](https://mozilla.github.io/nunjucks/templating.html)
* Template Files : Template files should all go in `app/templates/`. They should also all be `html` files(unless you change some configs to handle other file types)
* Template Variables : The variables that can be referenced in the templates are passed in using the options object in `nunjucks.render('fileName.html',options)` function in the module files. 

