var request = require('superagent');
var Logger = require('../../logger');

var env = process.env.NODE_ENV || 'development';

var logger = new Logger({
	name: 'hairongyi',
	path: 'logs',
	mode: env
});

request
	.post('localhost:3000/users/1/balance')
	.send({ name: 'Manny', species: 'cat' })
	.set('Accept', 'application/json')
	.end(function(err, res){
	 if (err || !res.ok) {

	   logger.error(err);
	 } else {
	   logger.debug(res.body);
	   logger.trace(res.req, res, 'DEMO 1');
	 }
});

request
	.post('localhost:3000/users/2/balance')
	.send({ user: { property: {balance: 100} } })
	.set('Accept', 'application/json')
	.end(function(err, res){
	 if (err || !res.ok) {

	   logger.error(err);
	 } else {
	   logger.debug(res.body);
	   logger.trace(res.req, res, 'DEMO 2');
	 }
});

