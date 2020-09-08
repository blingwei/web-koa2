const MiddlewareBean = require('../bean/middlewareBean');


function factory(app, opts){
    async function init(ctx, next) {
        ctx.fs.errorFactory = app.fs.errorFactory
        ctx.fs.resultFactory = app.fs.resultFactory
        await next();
    }
    return new MiddlewareBean(init, 0);
}

module.exports = factory
