var bunyan = require('bunyan');
var path = require('path');

function reqSerializer(req) {
  var result = {}

  try {
    result = {
      method: req.method,
      headers: req.headers,
      path: req.path,
      originalUrl: req.originalUrl,
      query: req.query,
      body: req.body,
      cookies: req.cookies,
      remoteAddress: req.connection.remoteAddress,
      remotePort: req.connection.remotePort
    };
  }
  catch (ex) {
    console.error(ex.stack);
  }
  finally {
    return result;
  }

}

function resSerializer(res) {
  var result = {
    statusCode: res.statusCode,
    header: res.header,
    body: res.body
  };

  return result;
}

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
    streams: defaultLoggerStreams,
    serializers: { req: reqSerializer, res: bunyan.stdSerializers.res, err: bunyan.stdSerializers.err }
  });

  var traceLogger = bunyan.createLogger({
    name: this.name,
    streams: traceLoggerStreams,
    serializers: { req: reqSerializer, res: resSerializer, err: bunyan.stdSerializers.err }
  });

  this.fatal = function(fatal) {
    fatal = (typeof fatal === 'object')? JSON.stringify(fatal): fatal;
    return defaultLogger.fatal(fatal);
  };

  this.error = function(err) {
    return defaultLogger.error(err);
  };

  this.warn = function(warn) {
    warn = (typeof warn === 'object')? JSON.stringify(warn): warn;
    return defaultLogger.warn(warn);
  };

  this.info = function(info) {
    info = (typeof info === 'object')? JSON.stringify(info): info;
    return defaultLogger.info(info);
  };

  this.debug = function(info) {
    info = (typeof info === 'object')? JSON.stringify(info): info;
    return defaultLogger.debug(info);
  };

  this.trace = function(req, res, msg) {
    arguments.length
    return traceLogger.info({req:req, res:res}, msg);
  };

}

module.exports = Logger;
