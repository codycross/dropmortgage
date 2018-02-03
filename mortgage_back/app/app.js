// var http = require('http');
var express = require('express'),
    cors = require('cors'),
    port = process.env.PORT || 3030,
    app = express();
var logger = require('morgan');
var routes = require('./routes/index');
var bodyParser = require('body-parser');
const Sugar = require('sugar');

Sugar.extend();

app.set('port', process.env.PORT || 3030);
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Tell express to fetch files from the /js directory
app.use(express.static(__dirname + '/js'));
//We're using the Jade templating language because it's fast and neat
app.set('view engine', 'jade')

app.use('/templates', express.static(__dirname + '/templates'));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status( err.code || 500 )
			.json({
				      status: 'error-dev',
				      message: err
			      });
	});
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500)
		.json({
			      status: 'error',
			      message: err.message
		      });
});
// 


// if(!module.parent){
// 	app.listen(port, function(){
// 		console.log('Express server listening on port ' + port + '.');
// 	});
// }


module.exports = app;