const Koa = require('koa');
const Router = require('koa-router');
const Mongoose = require('mongoose');
const Swagger = require('swagger-koa');

let port = 3000;

let app = new Koa();
let router = new Router();
require('./routes')(router);

Mongoose.connect('mongodb://localhost:27017/koa-mongo-example');
let swagger = Swagger.init({
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    swaggerURL: '/doc',
    swaggerJSON: '/swagger.json',
    swaggerUI: './public/swagger/',
    basePath: 'http://localhost:3000',
    info: {
      title: 'swagger-koa sample app',
      description: 'Swagger + Koa = {swagger-koa}'
    },
    apis: ['./routes/books.js']
  });
app
    .use(swagger)
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(port);

