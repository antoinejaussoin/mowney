module.exports = function (sequelize, DataTypes) {
  var ExchangeRate = sequelize.define('ExchangeRate', {
    date: DataTypes.DATE,
    rate: DataTypes.DECIMAL(12, 6)
  });

  ExchangeRate.associate = function (models) {
    ExchangeRate.belongsTo(models.Currency, { as: 'currency' });
  };

  return ExchangeRate;
};
