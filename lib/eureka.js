'use strict';

const request = require("request")
const _url = require("url")
const Eureka = require('eureka-js-client').Eureka;

let count = 0;

function createEurekaClient(config, app) {
    app.coreLogger.info('[egg-eureka] connecting %s %s:%s %s %s',
        config.ssl, config.host, config.port, config.servicePath, config.registerWithEureka);

    Eureka.prototype.loadbalancer = function (appId) {
        const nodes = this.getInstancesByAppId(appId)
        if (nodes == null) {
            throw new Error("No service." + src);
        }
        if (nodes.length) {
            return nodes[(Math.floor(Math.random() * nodes.length))];
        } else {
            return nodes[0];
        }
    }
    Eureka.prototype.formatUrl = function (urlStr) {
        const url = _url.parse(urlStr);
        const node = this.loadbalancer(url.host);
        url.host = node.ipAddr + ":" + node.port["$"];
        return _url.format(url);
    }
    Eureka.prototype.http = function (options) {
        options.url = this.formatUrl(options.url);
        return new Promise((resolve, reject) => {
            request(options, function (error, response) {
                if (!error) {
                    resolve(response)
                } else {
                    reject(error)
                }
            });
        });
    }
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
