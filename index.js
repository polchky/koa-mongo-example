const Koa = require('koa');

// Create the Koa app
const app = new Koa();

app
    .use((ctx) => {
        console.log(`path: ${ctx.request.path}\n`);
        console.log(`query: ${ctx.request.querystring}\n`);
        console.log('headers:');
        const keys = Object.keys(ctx.request.headers);
        for (let i = 0; i < keys.length; i += 1) {
            console.log(`${keys[i]}: ${ctx.request.headers[keys[i]]}`);
        }
        console.log('');
        ctx.body = 'Hello world!';
    })
    .listen(3000);
