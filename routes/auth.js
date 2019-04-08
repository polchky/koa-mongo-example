const controller = require('../controllers/auth');

module.exports = (router) => {
    router
        .post('/login', controller.login)
        .post('/register', controller.register);
}
