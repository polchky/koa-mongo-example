const controller = require('../controllers/books');
const jwt = require('../middlewares/jwt');
/**
 * @swagger
 * resourcePath: /api
 * description: All about API
 */
 
/**
 * @swagger
 * path: /login
 * operations:
 *   -  httpMethod: POST
 *      summary: Login with username and password
 *      notes: Returns a user based on username
 *      responseClass: User
 *      nickname: login
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: username
 *          description: Your username
 *          paramType: query
 *          required: true
 *          dataType: string
 *        - name: password
 *          description: Your password
 *          paramType: query
 *          required: true
 *          dataType: string
 */
module.exports = (router) => {
    router
        .param('id', controller.getById)
        .post('/books/', jwt, controller.create)
        .get('/books/:id', controller.read)
        .put('/books/:id', jwt, controller.update)
        .delete('/books/:id', jwt, controller.delete)
        .get('/books/', controller.list)
        .delete('/books/', jwt, controller.clear);
}