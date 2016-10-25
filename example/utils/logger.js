var Logger = require('../../logger');

var env = process.env.NODE_ENV || 'development';

var logger = new Logger({
	name: 'hairongyi',
	path: 'logs',
	mode: env
});

module.exports = logger;