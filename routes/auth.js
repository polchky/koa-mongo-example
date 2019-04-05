const controller = require('../controllers/auth.js');

module.exports = (router) => {
    router
        .post('/login', controller.login)
        .post('/register', controller.register);
}
