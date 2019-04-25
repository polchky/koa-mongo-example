const User = require('../models/user');
const Book = require('../models/book');
const Bcrypt = require('bcrypt');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     User: 
 *       type: object
 *       properties:
 *         id: 
 *           type: Number
 *         email:
 *           type: string
 *     UserPartial: 
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 *     UsersArray:
 *       type: array
 *       items: 
 *         $ref: '#/components/schemas/User' 
 */
let controller = {

    getById: async(id, ctx, next) => {
        try{
            ctx.user = await User.findById(id).exec();
            if(!ctx.user) return ctx.status = 404;
            return next();
        } catch (err) {
            ctx.status = 404;
        }
    },

    /**
     * @swagger
     * 
     * /users/{user_id}:
     *   get:
     *     summary: get a user by id
     *     operationId: readUser
     *     tags: 
     *       - users
     *     parameters:
     *       - name: user_id
     *         in: path
     *         required: true
     *         description: the id of the user to retrieve
     *         schema: 
     *           type: string
     *     responses:
     *       '200':
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       '404':
     *         description: User not found
     * 
     */
    read: async (ctx) => {
        ctx.body = ctx.user.toClient();
    },
    
    /**
     * @swagger
     * 
     * /users/{user_id}:
     *   put:
     *     summary: update a user by id
     *     operationId: updateUser
     *     tags: 
     *       - users
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: user_id
     *         in: path
     *         required: true
     *         description: the id of the user to update
     *         schema: 
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema: 
     *             $ref: '#/components/schemas/UserPartial'
     *     responses:
     *       '200':
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       '404':
     *         description: User not found
     *       '400':
     *         description: Invalid request body
     *       '401':
     *         description: Unauthorized
     * 
     */
    update: async (ctx) => {
        const user = ctx.user;
        user.email = ctx.request.body.email;
        user.password = await Bcrypt.hash(ctx.request.body.password, 10);
        await user.save();
        ctx.body = user.toClient();
    },
    
    /**
     * @swagger
     * 
     * /users/{user_id}:
     *   delete:
     *     summary: delete a user by id
     *     operationId: deleteUser
     *     tags: 
     *       - users
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: user_id
     *         in: path
     *         required: true
     *         description: the id of the user to delete
     *         schema: 
     *           type: string
     *     responses:
     *       '204':
     *         description: User deleted
     *       '404':
     *         description: User not found
     *       '401':
     *         description: Unauthorized
     *       '409':
     *         description: Conflict with dependent resources
     * 
     */
    delete: async (ctx) => {
        const n = await Book.countDocuments({owner: ctx.user._id}).exec();
        if(n > 0) return ctx.status = 409;
        await User.findByIdAndDelete(ctx.user._id).exec();
        ctx.status = 204;
    },
    
    /**
     * @swagger
     * 
     * /users/:
     *   get:
     *     summary: list all users
     *     operationId: listUsers
     *     tags: 
     *       - users
     *     responses:
     *       '200':
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/UsersArray'
     * 
     */
    list: async (ctx) => {
        const users = await User.find({}).exec();
        for(let i = 0; i < users.length; i++) {
            users[i] = users[i].toClient();
        }
        ctx.body = users;
    },
    
    /**
     * @swagger
     * 
     * /users/:
     *   delete:
     *     summary: delete all users
     *     operationId: clearUsers
     *     tags: 
     *       - users
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       '204':
     *         description: Users deleted
     *       '401':
     *         description: Unauthorized
     *       '409':
     *         description: Conflict with dependent resources
     * 
     */
    clear: async (ctx) => {
        const n = await Book.countDocuments().exec();
        if(n > 0) return ctx.status = 409;
        await User.deleteMany().exec();
        ctx.status = 204;
    }
}

module.exports = controller;