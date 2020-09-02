/**
 * Created by PengLing on 2019/4/1.
 */
'use strict';

const routes = require('./routes');
const requireDirectory = require('require-directory')

module.exports.entry = function (app, router, opts) {

    app.fs.api = app.fs.api || {};

    // init middleware
    const directory = `${process.cwd()}\\app\\lib\\middlewares`;
    requireDirectory(module, directory, {
        visit: whenLoadModule
    })

    function whenLoadModule(obj) {
        app.use(obj(app, opts))
    }

    // init router
    router = routes(app, router, opts); //加载路由

    app.fs.logger.info('init router and middleware.');

};

module.exports.models = function (dc) { // dc = { orm: Sequelize对象, ORM: Sequelize, models: {} }
    // require('./models/test')(dc);
    //存放模型的目录
    const directory = `${process.cwd()}\\app\\lib\\models`;
    requireDirectory(module, directory, {
        visit: whenLoadModule
    })

    function whenLoadModule(obj) {
        obj(dc)
    }
};

