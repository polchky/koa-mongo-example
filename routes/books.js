const controller = require('../controllers/books.js');
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
        .post('/books/', controller.create)
        .get('book', '/books/:id', controller.read)
        .put('/books/:id', controller.update)
        .delete('/books/:id', controller.delete)
        .get('/books/', controller.list)
        .delete('/books/', controller.clear);
}