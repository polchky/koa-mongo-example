const swaggerJSDoc = require('swagger-jsdoc');

let spec;

const swagger = function swagger(options){

    spec = swaggerJSDoc(options);

    return function swaggerDocEndpoint(ctx, next){
        if(ctx.path !== options.path) return next();
        ctx.body = spec;
    };
};

module.exports = swagger;