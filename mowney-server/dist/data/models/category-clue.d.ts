import Sequelize from "sequelize";
export interface ICategoryClue {
    type: string;
    mustBeCredit: boolean;
    mustBeDebit: boolean;
    validFrom: Date;
    validTo: Date;
    exactString: string;
    regex: string;
}
declare const _default: (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.SequelizeStatic) => Sequelize.Model<ICategoryClue, void>;
export default _default;
