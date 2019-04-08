const books = require('../controllers/books');
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
        .param('book_id', books.getById)
        .post('/books/', jwt, books.create)
        .get('/books/:book_id', books.read)
        .put('/books/:book_id', jwt, books.update)
        .delete('/books/:book_id', jwt, books.delete)
        .get('/books/', books.list)
        .delete('/books/', jwt, books.clear);
}