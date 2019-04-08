const Book = require('../models/book');
const User = require('../models/user');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Book: 
 *       properties:
 *         id: 
 *           type: string
 *         title:
 *           type: string
 *         owner: 
 *           $ref: '#/components/schemas/User'
 *     BookPartial:
 *       properties:
 *         title:
 *           type: string
 *         owner: 
 *           type: object
 *           properties: 
 *             id: 
 *               type: string
 *           required: 
 *             - id
 *       required:
 *         - title
 *         - owner
 */
let controller = {

    getById: async(id, ctx, next) => {
        try{
            ctx.book = await Book.findById(id).populate('owner');
            return next();
        } catch (err) {
            ctx.status = 404;
        }
    },

    /**
     * @swagger
     * 
     * /books/:
     *   post:
     *     summary: create a new book
     *     operationId: createBook
     *     tags: 
     *       - books
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema: 
     *             $ref: '#/components/schemas/BookPartial'
     *     responses:
     *       '201':
     *         description: Book created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Book'
     *       '400':
     *         description: Invalid request
     *       '401':
     *         description: Unauthorized
     * 
     */
    create: async (ctx) => {
        try{
            const user = await User.findById(ctx.request.body.owner.id);
            if(!user) return ctx.status = 400;
            let book = new Book({
                title: ctx.request.body.title,
                owner: user._id,
            });
            book = await book.save();
            await Book.populate(book, {path: 'owner'});
            ctx.body = book.toClient();
            ctx.status = 201;
        } catch (err) {
            ctx.status = 400;
        }
    }, 

    /**
     * @swagger
     * 
     * /books/{book_id}:
     *   get:
     *     summary: get a book by id
     *     operationId: readBook
     *     tags: 
     *       - books
     *     parameters:
     *       - name: book_id
     *         in: path
     *         required: true
     *         description: the id of the book to retrieve
     *         schema: 
     *           type: string
     *     responses:
     *       '200':
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Book'
     *       '404':
     *         description: Book not found
     * 
     */
    read: async (ctx) => {
        ctx.body = ctx.book.toClient();
    },
    
    /**
     * @swagger
     * 
     * /books/{book_id}:
     *   put:
     *     summary: update a book by id
     *     operationId: updateBook
     *     tags: 
     *       - books
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: book_id
     *         in: path
     *         required: true
     *         description: the id of the book to update
     *         schema: 
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema: 
     *             $ref: '#/components/schemas/BookPartial'
     *     responses:
     *       '200':
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Book'
     *       '400':
     *         description: Invalid request
     *       '401':
     *         description: Unauthorized
     * 
     */
    update: async (ctx) => {
        try{
            const user = await User.findById(ctx.request.body.owner.id);
            if(!user) return ctx.body = 400;
            const book = ctx.book;
            book.title = ctx.request.body.title;
            book.owner = user._id;
            await book.save();
            ctx.body = book.toClient();
        } catch (err) {
            ctx.status = 400;
        }
    },
    
    /**
     * @swagger
     * 
     * /books/{book_id}:
     *   delete:
     *     summary: delete a book by id
     *     operationId: deleteBook
     *     tags: 
     *       - books
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: book_id
     *         in: path
     *         required: true
     *         description: the id of the book to delete
     *         schema: 
     *           type: string
     *     responses:
     *       '204':
     *         description: no content
     *       '404':
     *         description: Book not found
     *       '401':
     *         description: Unauthorized
     * 
     */
    delete: async (ctx) => {
        await Book.findOneAndDelete({_id: ctx.book.id}).exec();
        ctx.status = 204;
    },

    /**
     * @swagger
     * 
     * /books/:
     *   get:
     *     summary: list all books
     *     operationId: listBooks
     *     tags: 
     *       - books
     *     parameters:
     *       - name: owner_id
     *         in: query
     *         description: the id of the owner
     *         schema: 
     *           type: string
     *     responses:
     *       '200':
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items: 
     *                 $ref: '#/components/schemas/Book' 
     * /users/{user_id}/books/:
     *   get:
     *     summary: list all books owned by a given user
     *     operationId: listUserBooks
     *     tags: 
     *       - books
     *     parameters:
     *       - name: user_id
     *         in: path
     *         required: true
     *         description: the id of the owner
     *         schema: 
     *           type: string
     *     responses:
     *       '200':
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items: 
     *                 $ref: '#/components/schemas/Book' 
     *       '404':
     *         description: User not found
     * 
     */
    list: async (ctx) => {
        const req = {};
        if (ctx.query.owner_id) {
            try{
                const user = await User.findById(ctx.query.owner_id).exec();
                req.owner = user._id;
            } catch (err) {
                req.owner = null;
            }
        }
        if (ctx.user) req.owner = ctx.user._id;
        const books = await Book.find(req).exec();
        for(let i = 0; i < books.length; i++) {
            books[i] = books[i].toClient();
        }
        ctx.body = books;
    },
    
    /**
     * @swagger
     * 
     * /books/:
     *   delete:
     *     summary: delete all books
     *     operationId: clearBooks
     *     tags: 
     *       - books
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       '204':
     *         description: no content
     *       '401':
     *         description: Unauthorized
     * 
     */
    clear: async (ctx) => {
        await Book.deleteMany().exec();
        ctx.status = 204;
    }
}

module.exports = controller;