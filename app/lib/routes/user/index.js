
module.exports = function (app, router, opts) {

    const user = require('../../controllers/user/index')(app.fs.dc)

    router.post('/login', user.login)

    router.get('/user', user.findUserById)

}
