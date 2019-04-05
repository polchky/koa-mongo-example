const controller = require('../controllers/users.js');
const jwt = require('../middlewares/jwt.js');

module.exports = (router) => {
    router
        .get('/users/:id', controller.read)
        .put('/users/:id', jwt, controller.update)
        .delete('/users/:id', jwt, controller.delete)
        .get('/users/', controller.list)
        .delete('/users/', jwt, controller.clear);
}