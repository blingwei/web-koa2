const request = require("superagent");

module.exports = function (app, router, opts) {

    const UserService = require("../../service/user")(app.fs.dc.models)

    router.post('/login', async (ctx, next) => {
        ctx.fs.logger.info("获取参数")
        let phone = ctx.query.phone;


        ctx.fs.logger.info("根据手机号查看是否有这个用户的信息")
        let user = await UserService.getUseByPhone(phone);
        if(user) {
            // ctx.session.user = user  记录登录信息
            ctx.body = {
                message: '登录成功'
            }
        }else{
            ctx.body = {
                message: '该用户不存在'
            }
        }

    })

    router.get('/user', async (ctx, next) => {
        ctx.fs.logger.info("获取参数")
        let id = ctx.query.id
        ctx.body = await UserService.getUseById(id);

    })








}
