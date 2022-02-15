'use strict';

const Eureka = require('eureka-js-client').Eureka;

let count = 0;

function createEurekaClient(config, app) {
    app.coreLogger.info('[egg-eureka] connecting %s %s:%s %s %s',
        config.ssl, config.host, config.port, config.servicePath, config.registerWithEureka);
    const client = new Eureka({
        eureka: {
            servicePath: config.servicePath,
            ssl: config.ssl,
            host: config.host,
            port: config.port,
            registerWithEureka: config.registerWithEureka
        },
    });
    client.start()

    app.beforeStart(() => {
        const index = count++;
        app.coreLogger.info(`[egg-eureka] instance[${index}] status OK`);
    });

    return client;
}

module.exports = app => {
    app.addSingleton('eureka', createEurekaClient);
}
