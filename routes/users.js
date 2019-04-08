const books = require('../controllers/books');
const users = require('../controllers/users');
const jwt = require('../middlewares/jwt');

module.exports = (router) => {
    router
        .param('id', users.getById)
        .get('/users/:id', users.read)
        .get('/users/:id/books/', books.list)
        .put('/users/:id', jwt, users.update)
        .delete('/users/:id', jwt, users.delete)
        .get('/users/', users.list)
        .delete('/users/', jwt, users.clear);
}