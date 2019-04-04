const Book = require('../models/book');

/**
 * @swagger
 *
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
let controller = {
    create: async (ctx) => {
        const book = new Book(ctx.request.body);
        ctx.body = await book.save();
        ctx.status = 201;
    }, 

    read: async (ctx) => {
        const books = await Book.findById(ctx.params.id);
        ctx.body = books.toClient();
    },
    
    update: async (ctx) => {
        const book = await Book.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true}).exec();
        ctx.body = book.toClient();
    },
    
    delete: async (ctx) => {
        await Book.findByIdAndDelete(ctx.params.id).exec();
    },
    
    list: async (ctx) => {
        const books = await Book.find({}).exec();
        for(let i = 0; i < books.length; i++) {
            books[i] = books[i].toClient();
        }
        ctx.body = books;
    },
    
    clear: async (ctx) => {
        await Book.deleteMany().exec();
        ctx.status = 204;
    }
}

module.exports = controller;