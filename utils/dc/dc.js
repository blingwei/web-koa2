const Sequelize = require('sequelize');
const QueryDao = require('./queryDao')
const fs = require('fs')

module.exports = function (app, config) {
    //load orm when start.
    //so insert model when start.
    let orm = new Sequelize(config.url, config.opts);
    let dc = {};
    dc.orm = orm;
    dc.ORM = Sequelize;
    dc.models = {};
    //export dc to app global;
    app.fs = app.fs || {};
    app.fs.dc = dc;
    if (Array.isArray(config.models)) {
        config.models.forEach(function (e) {
            //is function?
            e(dc);
        });
    }
    app.fs.logger.info('init dc')

    return async function (ctx, next) {
        //wrap orm and ORM
        ctx.fs = ctx.fs || {};
        const queryDao = new QueryDao(orm, config.mapper);
        await queryDao.init()
        dc.queryDao = queryDao.get();
        ctx.fs.dc = dc;
        await next();
    };
};
