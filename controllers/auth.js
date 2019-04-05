const JsonWebToken = require('jsonwebtoken');
const Bcrypt = require('bcrypt');
const User = require('../models/user');

/**
 * @swagger
 * 
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 */

let controller = {

    /**
     * @swagger
     * 
     * /login:
     *   post:
     *     summary: login and retrieve a JWT
     *     operationId: login
     *     tags: 
     *       - auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema: 
     *             $ref: '#/components/schemas/UserPartial'
     *     responses:
     *       '200':
     *         description: success
     * 
     */
    login: async (ctx) => {
        const user = await User.findOne({
            email: ctx.request.body.email
        }).exec();
        if(!user) {
            ctx.status = 400;
            ctx.body = 'User not found';
            return;
        }

        const match = await Bcrypt.compare(ctx.request.body.password, user.password);
        if(!match) {
            ctx.status = 400;
            ctx.body = 'Password mismatch';
            return;
        }
        
        return new Promise((resolve, reject) => {
            JsonWebToken.sign({
                user: user.email, 
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
            }, process.env.JWT_SECRET, (err, token) => {
                if(err){
                    ctx.status = 400;
                    reject();
                } else {
                    ctx.body = {
                        token
                    };
                    ctx.status = 200;
                    resolve();
                }
            })
        });
    },

/**
 * @swagger
 * 
 * /register:
 *   post:
 *     summary: register a new user to the app
 *     operationId: register
 *     tags: 
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/UserPartial'
 *     responses:
 *       '200':
 *         description: success
 * 
 */
    register: async (ctx) => {
        const duplicate = await User.findOne({email: ctx.request.body.email}).exec();
        if(duplicate) {
            ctx.status = 400;
            return;
        }
        const password = await Bcrypt.hash(ctx.request.body.password, 10);
        const user = new User({
            email: ctx.request.body.email,
            password
        });
        const ret = await user.save();
        ctx.body = ret.toClient();
        ctx.status = 201;
    }, 
}

module.exports = controller;