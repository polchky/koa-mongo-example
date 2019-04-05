module.exports = (router) => {
    require('./books.js')(router);
    require('./users.js')(router);
    require('./auth.js')(router);
}