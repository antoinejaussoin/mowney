import Sequelize, { SequelizeStatic } from "sequelize";

export interface IImport {
  date: Date,
  fileName: string,
  isManual: boolean
}

export default (sequelize: Sequelize.Sequelize, DataTypes: SequelizeStatic) => {
  const Import = sequelize.define<IImport, void>('Import', {
    date: DataTypes.DATE,
    fileName: DataTypes.STRING,
    isManual: DataTypes.BOOLEAN
  });

  Import.associate = function (models) {
    
  };

  return Import;
};
