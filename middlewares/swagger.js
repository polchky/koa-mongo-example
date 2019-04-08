const swaggerJSDoc = require('swagger-jsdoc');

// Text content of the swagger.json document
let spec;

const swagger = function (options){

    // Create the documentation with the given options
    spec = swaggerJSDoc(options);

    // Return a Koa middleware
    return function swaggerDocEndpoint(ctx, next){
        /**
         * If the path is the one specified in the options for 
         * accessing the documentation, show it and interrupt the request. 
         * Otherwise, call the next middleware.
         */
        if(ctx.path !== options.path) return next();
        ctx.body = spec;
    };
};

module.exports = swagger;