module.exports = function (dc) {
    const User = dc.orm.define('user',
        {
            id: {
                field: 'id',
                type: dc.ORM.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                field: 'username',
                type: dc.ORM.STRING,

            },
            phone: {
                field: 'password',
                type: dc.ORM.STRING,
            },
        }, {
            tableName: 'login_user'
        });

    dc.models.User = User;
    return User;
};
