var app = require('./app/app.js');

var server = app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'))
})