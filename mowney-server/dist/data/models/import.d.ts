import Sequelize from "sequelize";
export interface IImport {
    date: Date;
    fileName: string;
    isManual: boolean;
}
declare const _default: (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.SequelizeStatic) => Sequelize.Model<IImport, void>;
export default _default;
