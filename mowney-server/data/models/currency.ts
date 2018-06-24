import Sequelize, { SequelizeStatic } from "sequelize";

export interface ICurrency {
  isoCode: string,
  name: string,
  isMain: boolean,
  symbol: string,
  format: string
}

export default (sequelize: Sequelize.Sequelize, DataTypes: SequelizeStatic) => {
  const Currency = sequelize.define<ICurrency, void>('Currency', {
    isoCode: DataTypes.STRING,
    name: DataTypes.STRING,
    isMain: DataTypes.BOOLEAN,
    symbol: DataTypes.STRING,
    format: DataTypes.STRING
  });

  return Currency;
};
