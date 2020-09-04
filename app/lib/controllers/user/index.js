'use strict';
const request = require("superagent");
module.exports = function (dc) {
    const userService = require('../../service/user')(dc.models)

    let res = {};
    res.login = async (ctx, next) => {
        ctx.fs.logger.info("获取参数")
        let data = ctx.request.body;
        ctx.fs.logger.info("查看是否有用户信息")
        let user = await userService.getUser(data.username, data.password);
        if(user) {
            ctx.session.user = user  //记录登录信息
            ctx.body = {
                message: '登录成功'
            }
        }else{
            ctx.body = {
                message: '该用户不存在'
            }
        }

    }

    res.findUserById = async (ctx, next) => {
        ctx.fs.logger.info("获取参数")
        let id = ctx.query.id
        ctx.body = await dc.queryDao.findUserById.query({
            id : id
        });

    }

    return res;
}






