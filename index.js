const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const Mongoose = require('mongoose');
const Swagger = require('./middlewares/swagger.js');
const SwaggerUi = require('koa2-swagger-ui');
const Routes = require('./routes');


Mongoose.connect('mongodb://localhost:27017/koa-mongo-example', { useNewUrlParser: true });

const app = new Koa();
const router = new Router();
Routes(router);

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Koa-MongoDB example',
            version: '1.0.0',
            description: 'A sample API',
        },
    },
    // Paths to the API docs
    apis: [
        './controllers/auth.js',
        './controllers/books.js',
        './controllers/users.js',
    ],
    path: '/swagger.json',
}

const swagger = Swagger(swaggerOptions);


const swaggerUi = SwaggerUi({
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
    .listen(process.env.PORT);

