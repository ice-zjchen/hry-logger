var bunyan = require('bunyan');
var path = require('path');

function Logger(config) {
  var config = config || {};
  
  this.name = config.name || 'logger';
  this.path = config.path || '';
  this.mode = config.mode || 'production';

  this.defaultLogFileName = 'default.log';
  this.traceLogFileName = 'trace.log';

  var debugStream = { level: 'debug', stream: process.stdout };
  
  var defaultLoggerStreams = [
    { level: 'info', path: path.join(this.path, this.defaultLogFileName) }
  ];
  var traceLoggerStreams = [
    { level: 'info', path: path.join(this.path, this.traceLogFileName) }
  ];
  
  if (config.mode === 'development') {
    defaultLoggerStreams = [debugStream];
    traceLoggerStreams = [debugStream];
  }

  var defaultLogger = bunyan.createLogger({
    name: this.name,
    src: true,
    serializers: bunyan.stdSerializers,
    streams: defaultLoggerStreams
  });

  var traceLogger = bunyan.createLogger({
    name: this.name,
    src: true,
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

module.exports = Logger;
