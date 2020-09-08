const ResultBean = require('../app/lib/bean/ResultBean')

module.exports = {
    entry(app, router, opts) {
        let ResultFactory = {}
        ResultFactory.buildSucceedResult = (data, msg) => {
            return new ResultBean(200, data, msg);
        }
        ResultFactory.buildFailResult = (code, msg) => {
            return new ResultBean(code,{}, msg);
        }
        app.fs.resultFactory = ResultFactory
        app.fs.logger.info('init ResultFactory')
    }
}
