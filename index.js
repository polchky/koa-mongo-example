const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// Create the Koa app
const app = new Koa();
const router = new Router();

const users = [
    { name: 'Pascal', email: 'pascal.gremaud@unifr.ch' },
    { name: 'Arnaud', email: 'arnaud.durand@unifr.ch' },
    { name: 'Jacques', email: 'jacques.pasquier@unifr.ch' },
];

const guard = (ctx, next) => {
    if (ctx.request.headers.authorization === 'letmein') {
        return next();
    } else{
        ctx.body = 'nope';
    }
};

router.get('/', (ctx) => {
    ctx.body = 'Hello world!';
});

router.get('/users/', (ctx) => {
    ctx.body = users;
});

router.post('/users/', (ctx) => {
    users.push(ctx.request.body);
    ctx.response.status = 201;
});

router.get('/users/:userId', (ctx) => {
    ctx.body = users[ctx.params.userId];
});

app
    .use(bodyParser())
    .use(guard)
    .use(router.routes())
    .listen(3000);
