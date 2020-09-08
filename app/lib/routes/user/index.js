
module.exports = function (app, router, opts) {

    const user = require('../../controllers/user/index')(app.fs.dc);
    const covert = require('../../covert/user/index');

    router.post('/login', covert.login, user.login);

    router.get('/user', user.findUserById);

}
