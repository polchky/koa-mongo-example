const User = require('../models/user');
const Bcrypt = require('bcrypt');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     User: 
 *       properties:
 *         id: 
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
  *     UserPartial: 
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 */
let controller = {

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
     * 
     */
    read: async (ctx) => {
        const users = await User.findById(ctx.params.id);
        ctx.body = users.toClient();
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
     * 
     */
    update: async (ctx) => {
        let user = await User.findById(ctx.params.id);
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
     *         description: no content
     * 
     */
    delete: async (ctx) => {
        await User.findByIdAndDelete(ctx.params.id).exec();
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
     *         description: no content
     * 
     */
    clear: async (ctx) => {
        await User.deleteMany().exec();
        ctx.status = 204;
    }
}

module.exports = controller;