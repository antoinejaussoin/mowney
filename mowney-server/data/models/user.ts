import bcrypt from 'bcrypt';
import Sequelize, { SequelizeStatic } from "sequelize";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdministrator: boolean;
  setPassword: (password: string) => Promise<string>;
  verifyPassword: (password: string) => Promise<boolean>;
}

export default (sequelize: Sequelize.Sequelize, DataTypes: SequelizeStatic) => {
  const User = sequelize.define<IUser, IUser>('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdministrator: DataTypes.BOOLEAN
  }, {
    instanceMethods: {
      setPassword: async function(password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        // bcrypt.genSalt(10, (err, salt) => {
        //   bcrypt.hash(password, salt, (err, hash) => {
        //     that.password = hash;
        //     done(err);
        //   });
        // });
        return hash;
      },
      verifyPassword: async function(password) {
        const result = bcrypt.compare(password, this.password);
        return result;
        // bcrypt.compare(password, this.password, (err, res) => {
        //   done(null, res);
        // });
      },
    }
  });

  User.associate = function (models) {
    User.belongsTo(models.Currency, { as: 'currency' });
  };

  // User.

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
