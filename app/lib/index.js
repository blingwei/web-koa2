/**
 * Created by PengLing on 2019/4/1.
 */
'use strict';

const routes = require('./routes');
const requireDirectory = require('require-directory')
const MiddlewareBean = require('./bean/middlewareBean');

module.exports.entry = function (app, router, opts) {

    app.fs.api = app.fs.api || {};
    // init middleware
    const directory = './middlewares';
    let middlewares = []
    requireDirectory(module, directory, {
        visit: (obj) => {
            let middleware = obj(app, opts)
            if (middleware instanceof MiddlewareBean) {
                middlewares.push(middleware)
            }
        }
    })
    app.fs.logger.info('init middleware.');
    middlewares.sort((a, b) => a.index - b.index).forEach(obj => {
        app.use(obj.fn)
    })

    app.fs.logger.info('init router .');
    // init router
    router = routes(app, router, opts); //加载路由



};

module.exports.models = function (dc) { // dc = { orm: Sequelize对象, ORM: Sequelize, models: {} }
    // require('./models/test')(dc);
    //存放模型的目录
    const directory = './models';
    requireDirectory(module, directory, {
        visit: (obj) =>{
            obj(dc)
        }
    })

};

