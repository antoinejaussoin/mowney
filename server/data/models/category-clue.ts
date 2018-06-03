import Sequelize, { SequelizeStatic } from "sequelize";

export default (sequelize: Sequelize.Sequelize, DataTypes: SequelizeStatic) => {
  const CategoryClue = sequelize.define('CategoryClue', {
    type: DataTypes.STRING,
    mustBeCredit: DataTypes.BOOLEAN,
    mustBeDebit: DataTypes.BOOLEAN,
    validFrom: DataTypes.DATE,
    validTo: DataTypes.DATE,
    exactString: DataTypes.STRING,
    regex: DataTypes.STRING
  });

  CategoryClue.associate = function (models) {
    CategoryClue.belongsTo(models.Category, { as: 'category' });
    CategoryClue.belongsTo(models.User, { as: 'user' });
    CategoryClue.belongsTo(models.Account, { as: 'restrictToAccount' });
  };

  return CategoryClue;
};
