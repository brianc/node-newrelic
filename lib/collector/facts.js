'use strict';

var os = require('os');

module.exports = function facts(agent) {
  var bm = agent.config.browser_monitoring;
  var tt = agent.config.transaction_tracer;
  return {
    pid           : process.pid,
    host          : os.hostname(),
    language      : 'nodejs',
    app_name      : agent.config.applications(),
    agent_version : agent.version,
    environment   : agent.environment,
    settings      : {
      // this means RUM on/off
      "browser_monitoring.auto_instrument" : bm.enable,

      // these are fixed parameters for now
      "browser_monitoring.loader"          : bm.loader,
      "browser_monitoring.loader_version"  : bm.loader_version,

      // un-minify RUM loader
      "browser_monitoring.debug"           : bm.debug
    },

    // required by high-security mode
    security_settings : {
      capture_params     : agent.config.capture_params,
      transaction_tracer : {
        record_sql : tt.record_sql
      }
    }
  };
};
