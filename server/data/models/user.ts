import bcrypt from 'bcrypt';
import Sequelize, { SequelizeStatic } from "sequelize";

export default (sequelize: Sequelize.Sequelize, DataTypes: SequelizeStatic) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdministrator: DataTypes.BOOLEAN
  });

  User.associate = function (models) {
    User.belongsTo(models.Currency, { as: 'currency' });
  };

  // User.prototype.setPassword = function(password, done) {
  //   const that = this;
  //   bcrypt.genSalt(10, (err, salt) => {
  //     bcrypt.hash(password, salt, (err, hash) => {
  //       that.password = hash;
  //       done(err);
  //     });
  //   });
  // };

  // User.prototype.verifyPassword = function(password, done) {
  //   bcrypt.compare(password, this.password, (err, res) => {
  //     done(null, res);
  //   });
  // };

  return User;
};
