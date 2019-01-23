import Sequelize, { SequelizeStatic } from "sequelize";

export interface ICategoryClue {
  type: string;
  mustBeCredit: boolean;
  mustBeDebit: boolean;
  validFrom: Date;
  validTo: Date;
  exactString: string;
  regex: string;
}

export default (sequelize: Sequelize.Sequelize, DataTypes: SequelizeStatic) => {
  const CategoryClue = sequelize.define<ICategoryClue, any>("CategoryClue", {
    type: DataTypes.STRING,
    mustBeCredit: DataTypes.BOOLEAN,
    mustBeDebit: DataTypes.BOOLEAN,
    validFrom: DataTypes.DATE,
    validTo: DataTypes.DATE,
    exactString: DataTypes.STRING,
    regex: DataTypes.STRING,
  });

  CategoryClue.associate = function(models) {
    CategoryClue.belongsTo(models.Category, { as: "category" });
    CategoryClue.belongsTo(models.User, { as: "user" });
    CategoryClue.belongsTo(models.Account, { as: "restrictToAccount" });
  };

  return CategoryClue;
};
