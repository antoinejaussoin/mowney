import Sequelize from "sequelize";
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
declare const _default: (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.SequelizeStatic) => Sequelize.Model<IUser, IUser>;
export default _default;
