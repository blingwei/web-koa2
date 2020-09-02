const request = require("superagent");

module.exports = function (models) {
    const User = models.User;
    let services = {};


    services.getCurrentUser = (ctx) => {
        let userId = ctx.session.user ? ctx.session.user.userId : -1;
        return  User.findOne({
            where: {
                id: userId
            }
        })
    }

    services.getUseById = (id) => {
        return  User.findOne({
            where: {
                id: id
            }
        })
    }

    services.create = (data, transaction) => {
        User.create(data, transaction)
    }

    services.updateById = async (data, id, transaction) => {
        await User.update(data, {
            where: {
                id: id
            },
            transaction
        })
    }



    return services;
}
