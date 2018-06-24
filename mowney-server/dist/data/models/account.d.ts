import Sequelize from "sequelize";
export interface IAccount {
    name: string;
    loaderType: string;
    isActive: boolean;
    isStatEnabled: boolean;
}
declare const _default: (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.SequelizeStatic) => Sequelize.Model<IAccount, void>;
export default _default;
