const MiddlewareBean = require('../bean/middlewareBean');

function factory(app, opts){
    async function  info(ctx, next) {
        ctx.fs.logger.info(`${ctx.method}: ${ctx.url}`)
        let startTime = new Date();
        await next()
        let endTime = new Date();
        ctx.fs.logger.info("总共花费了" + (endTime-startTime)+ "ms");
    }
    return new MiddlewareBean(info, 1);
}

module.exports = factory
