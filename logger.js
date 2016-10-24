var bunyan = require('bunyan');

function Logger(config) {
  var config = config || {};
  
  this.name = config.name || 'logger';
  this.path = config.path || '';
  this.mode = config.mode || 'production';

  var defaultLoggerStreams = [
    { level: 'info', path: this.path + 'default.log' }
  ];
  var traceLoggerStreams = [
    { level: 'info', path: this.path + 'trace.log' }
  ];
  
  var debugStream = { level: 'debug', stream: process.stdout };
  if (config.mode === 'development') {
    defaultLoggerStreams.push(debugStream);
    traceLoggerStreams.push(debugStream);
  }

  var defaultLogger = bunyan.createLogger({
    name: this.name,
    serializers: bunyan.stdSerializers,
    streams: defaultLoggerStreams
  });

  var traceLogger = bunyan.createLogger({
    name: this.name,
    serializers: bunyan.stdSerializers,
    streams: traceLoggerStreams
  });

  this.fatal = function(fatal) {
    return defaultLogger.fatal(fatal);
  };

  this.error = function(err) {
    return defaultLogger.error(err);
  };

  this.warn = function(warn) {
    return defaultLogger.warn(warn);
  };

  this.info = function(info) {
    return defaultLogger.info(info);
  };

  this.debug = function(info) {
    return defaultLogger.debug(info);
  };

  this.trace = function(req, res, msg) {
    return traceLogger.info({req:req, res:res}, msg);
  };

}

exports = Logger;
