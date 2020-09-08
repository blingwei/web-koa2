
const ErrorBean = require('../app/lib/bean/ErrorBean')

module.exports = {
    entry(app, router, opts) {
        let ErrorFactory = {}
        ErrorFactory.parameterError = (msg) =>{
            return new ErrorBean('请求参数错误', 400, msg);
        }

        ErrorFactory.permissionError = (msg) =>{
            return new ErrorBean('权限错误', 401, msg);
        }

        ErrorFactory.logicalError = (msg) =>{
            return new ErrorBean('业务逻辑错误', 500, msg);
        }

        ErrorFactory.databaseError = (msg) =>{
            return new ErrorBean('数据库错误', 502, msg);
        }
        app.fs.errorFactory = ErrorFactory
        app.fs.logger.info('init ErrorFactory')
    }
}
