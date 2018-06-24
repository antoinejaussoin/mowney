import Sequelize from "sequelize";
export interface ICurrency {
    isoCode: string;
    name: string;
    isMain: boolean;
    symbol: string;
    format: string;
}
declare const _default: (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.SequelizeStatic) => Sequelize.Model<ICurrency, void>;
export default _default;
