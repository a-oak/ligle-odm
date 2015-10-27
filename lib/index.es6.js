'use strict'
var ligle={};
ligle.util = require('ligle-util')();
var configure = ligle.util.configure;

const Mongorito = require('mongorito');

var defaultCfg = {
  server:'localhost/ligle-odm',
  loggerName:'ligle-odm',
  loggerLevel:'TRACE',
};
var exportObj;

module.exports = function(config){
  if(exportObj){
    return exportObj;
  }
  exportObj={};

  var cfg = configure(config,defaultCfg);
  var logger = ligle.util.logger(cfg.loggerName,cfg.loggerLevel);
  module.exports.logger = logger;
  module.exports.cfg = cfg;
  logger.trace(cfg);

  exportObj.connect = Mongorito.connect.bind(Mongorito,cfg.server);
  exportObj.disconnect = Mongorito.disconnect.bind(Mongorito);
  exportObj.Model = Mongorito.Model;
  exportObj.odm = Mongorito;


  return exportObj;
};


