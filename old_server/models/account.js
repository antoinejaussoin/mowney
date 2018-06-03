module.exports = function (sequelize, DataTypes) {
  var Account = sequelize.define('Account', {
    name: DataTypes.STRING,
    loaderType: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    isStatEnabled: DataTypes.BOOLEAN
  });

  Account.associate = function (models) {
    Account.belongsTo(models.Currency, { as: 'currency' });
    Account.belongsTo(models.User, { as: 'owner' });
    // Account.hasMany(models.Transactions, { as: 'transactions' });
  };

  return Account;
};
