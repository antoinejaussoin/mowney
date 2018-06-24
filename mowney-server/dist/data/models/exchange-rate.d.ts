import Sequelize from "sequelize";
export interface IExchangeRate {
    date: Date;
    rate: number;
}
declare const _default: (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.SequelizeStatic) => Sequelize.Model<IExchangeRate, void>;
export default _default;
