const KoaJwt = require('koa-jwt');

module.exports = KoaJwt({
    secret: process.env.JWT_SECRET,
});
