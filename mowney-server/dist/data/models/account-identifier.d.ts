import Sequelize from "sequelize";
export interface IAccountIdentifier {
    type: string;
    value: string;
    account?: Account;
}
declare const _default: (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.SequelizeStatic) => Sequelize.Model<IAccountIdentifier, void>;
export default _default;
