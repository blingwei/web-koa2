'use strict';
const validator = require('validator');

module.exports =  {

    login: (ctx, next) => {
        let data = ctx.request.body;
        let username = data['username'];
        let password = data['password'];
        if(!username || !password){
            throw ctx.fs.errorFactory.parameterError('缺少参数')
        }
        if(!validator.isEmpty(username) && !validator.isEmpty(password)){
            ctx.v = {
                username: username,
                password: password
            }
            return next();
        }else{
            throw ctx.fs.errorFactory.parameterError('用户名或密码输入错误')
        }
    }

}






