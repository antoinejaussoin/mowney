import Sequelize from "sequelize";
export interface ICategory {
    name: string;
    description: string;
}
declare const _default: (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.SequelizeStatic) => Sequelize.Model<ICategory, void>;
export default _default;
