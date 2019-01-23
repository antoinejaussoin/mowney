import Sequelize, { SequelizeStatic } from "sequelize";

export interface IExchangeRate {
  date: Date;
  rate: number;
}

export default (sequelize: Sequelize.Sequelize, DataTypes: SequelizeStatic) => {
  const ExchangeRate = sequelize.define<IExchangeRate, any>("ExchangeRate", {
    date: DataTypes.DATE,
    rate: DataTypes.DECIMAL(12, 6),
  });

  ExchangeRate.associate = function(models) {
    ExchangeRate.belongsTo(models.Currency, { as: "currency" });
  };

  return ExchangeRate;
};
