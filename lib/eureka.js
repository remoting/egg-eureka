'use strict';

const Eureka = require('eureka-js-client').Eureka;
const assert = require('assert');
const rds = require('ali-rds');

let count = 0;

module.exports = app => {
    app.addSingleton('eureka', createOneClient);
};


function createOneClient(config, app) {
    assert(config.ssl && config.host && config.port,
        `[egg-eureka] 'ssl: ${config.ssl}', 'host: ${config.host}', 'port: ${config.port}' are required on config`);
    app.coreLogger.info('[egg-eureka] connecting %s-%s:%s',
        config.ssl, config.host, config.port);
    const client = new Eureka({
        eureka: {
            servicePath: config.servicePath,
            ssl: config.ssl,
            host: config.host,
            port: config.port,
            registerWithEureka: config.registerWithEureka
        },
    });
    return client;
}