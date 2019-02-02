import * as bcrypt from "bcrypt";
import Sequelize, { SequelizeStatic } from "sequelize";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdministrator: boolean;
}

export async function setPassword(user: IUser, password: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  user.password = hash;
  return hash;
}

export async function verifyPassword(user: IUser, password: string) {
  const result = bcrypt.compare(password, user.password);
  return result;
}

export default (sequelize: Sequelize.Sequelize, DataTypes: SequelizeStatic) => {
  const User = sequelize.define<IUser, any>("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdministrator: DataTypes.BOOLEAN,
  });

  User.associate = function(models) {
    User.belongsTo(models.Currency, { as: "currency" });
  };

  return User;
};
