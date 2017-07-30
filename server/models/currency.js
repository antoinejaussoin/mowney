module.exports = function (sequelize, DataTypes) {
  const Currency = sequelize.define('Currency', {
    isoCode: DataTypes.STRING,
    name: DataTypes.STRING,
    isMain: DataTypes.BOOLEAN,
    symbol: DataTypes.STRING,
    format: DataTypes.STRING
  }, {

  });

  return Currency;
};
