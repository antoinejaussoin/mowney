import Sequelize from "sequelize";
export interface ITransactions {
    amount: number;
    date: Date;
    description: string;
    categorisedDate: Date;
}
declare const _default: (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.SequelizeStatic) => Sequelize.Model<ITransactions, void>;
export default _default;
