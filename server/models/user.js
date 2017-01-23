var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        isAdministrator: DataTypes.BOOLEAN
    }, {
        classMethods: {
            associate: function (models) {                
                User.belongsTo(models.Currency, {
                    as: 'currency'
                });
            }
        },
        instanceMethods: {
            setPassword: function (password, done) {
                var that = this;
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        that.password = hash;
                        done(err);
                    });
                });
            },
            verifyPassword: function (password, done) {
                bcrypt.compare(password, this.password, function (err, res) {
                    done(null, res);
                });
            }
        }
    });

    return User;
};