module.exports = (router) => {
    require('./authors.js')(router);
    require('./books.js')(router);
}