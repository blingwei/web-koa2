const MiddlewareBean = require('../bean/middlewareBean');

function factory(app, opts){
    async function  check(ctx, next) {
        if(ctx.path !== '/login' && !ctx.session.user){
            throw new Error('未登录')
        }
        await next()


    }
    return new MiddlewareBean(check, 2);
}

module.exports = factory
