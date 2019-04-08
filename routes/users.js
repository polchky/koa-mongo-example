const books = require('../controllers/books');
const users = require('../controllers/users');
const jwt = require('../middlewares/jwt');

module.exports = (router) => {
    router
        .param('user_id', users.getById)
        .get('/users/:user_id', users.read)
        .get('/users/:user_id/books/', books.list)
        .put('/users/:user_id', jwt, users.update)
        .delete('/users/:user_id', jwt, users.delete)
        .get('/users/', users.list)
        .delete('/users/', jwt, users.clear);
}