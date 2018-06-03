import Sequelize, { SequelizeStatic } from "sequelize";

export default (sequelize: Sequelize.Sequelize, DataTypes: SequelizeStatic) => {
  const Import = sequelize.define('Import', {
    date: DataTypes.DATE,
    fileName: DataTypes.STRING,
    isManual: DataTypes.BOOLEAN
  });

  Import.associate = function (models) {
    
  };

  return Import;
};
