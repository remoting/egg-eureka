exports.eureka = {
    default: {
        ssl: true,
        host: "user:password@localhost",
        port: 443,
        servicePath: "/eureka/apps",
        registerWithEureka: false
    },
    app: true,
    agent: false
}