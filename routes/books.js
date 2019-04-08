const books = require('../controllers/books');
const jwt = require('../middlewares/jwt');

module.exports = (router) => {
    router
        .param('book_id', books.getById)
        .post('/books/', jwt, books.create)
        .get('/books/:book_id', books.read)
        .put('/books/:book_id', jwt, books.update)
        .delete('/books/:book_id', jwt, books.delete)
        .get('/books/', books.list)
        .delete('/books/', jwt, books.clear);
}