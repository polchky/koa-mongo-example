const Book = require('../models/book');

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
  *     BookPartial: 
 *       properties:
 *         title:
 *           type: string
 *       required:
 *         - title
 */
let controller = {

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
     *       '200':
     *         description: success
     * 
     */
    create: async (ctx) => {
        let book = new Book(ctx.request.body);
        book = await book.save();
        ctx.body = book.toClient();
        ctx.status = 201;
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
     * 
     */
    read: async (ctx) => {
        const book = await Book.findById(ctx.params.id);
        ctx.body = book.toClient();
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
     * 
     */
    update: async (ctx) => {
        const book = await Book.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true}).exec();
        ctx.body = book.toClient();
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
     * 
     */
    delete: async (ctx) => {
        await Book.findByIdAndDelete(ctx.params.id).exec();
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
     *     responses:
     *       '200':
     *         description: success
     * 
     */
    list: async (ctx) => {
        const books = await Book.find({}).exec();
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
     * 
     */
    clear: async (ctx) => {
        await Book.deleteMany().exec();
        ctx.status = 204;
    }
}

module.exports = controller;