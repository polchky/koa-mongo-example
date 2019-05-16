const Koa = require('koa');

// Create the Koa app
const app = new Koa();

app
    .use((ctx) => {
        ctx.body = 'Hello world!';
    })
    .listen(3000);
