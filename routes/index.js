module.exports = (router) => {
    require('./books')(router);
    require('./users')(router);
    require('./auth')(router);
}