/**
 * This file is a Koa middleware. All it does is call 
 * another middleware that handles the JWT authentication
 * using the given secret.
 */

const KoaJwt = require('koa-jwt');

module.exports = KoaJwt({
    secret: process.env.JWT_SECRET,
});
