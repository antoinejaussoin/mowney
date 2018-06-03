import Sequelize, { SequelizeStatic } from "sequelize";

export default (sequelize: Sequelize.Sequelize, DataTypes: SequelizeStatic) => {
  const Currency = sequelize.define('Currency', {
    isoCode: DataTypes.STRING,
    name: DataTypes.STRING,
    isMain: DataTypes.BOOLEAN,
    symbol: DataTypes.STRING,
    format: DataTypes.STRING
  });

  return Currency;
};
