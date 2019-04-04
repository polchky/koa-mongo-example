const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const Mongoose = require('mongoose');
const Swagger = require('./middlewares/swagger.js');
const SwaggerUi = require('koa2-swagger-ui');


Mongoose.connect('mongodb://localhost:27017/koa-mongo-example');

const port = 3000;

const app = new Koa();
const router = new Router();
require('./routes')(router);

const swaggerOptions = {
    definition: {
        info: {
            title: 'Koa-MongoDB example',
            version: '1.0.0',
        },
    },
    // Paths to the API docs
    apis: ['./controllers/books.js'],
    path: '/swagger.json',
}

const swagger = Swagger(swaggerOptions);


let swaggerUi = SwaggerUi({
    routePrefix: '/doc',
    swaggerOptions: {
        url: swaggerOptions.path,
    }
});
app
    .use(swagger)
    .use(swaggerUi)
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(port);

