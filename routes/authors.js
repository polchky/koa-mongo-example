const controller = require('../controllers/authors.js');

module.exports = (router) => {
    router
        .post('/authors/', controller.create)
        .get('author', '/authors/:id', controller.read)
        .put('/authors/:id', controller.update)
        .delete('/authors/:id', controller.delete)
        .get('/authors/', controller.list)
        .delete('/authors/', controller.clear);
}