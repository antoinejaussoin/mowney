module.exports = function (sequelize, DataTypes) {
  const AccountIdentifier = sequelize.define('AccountIdentifier', {
    type: DataTypes.STRING,
    value: DataTypes.STRING
  });

  AccountIdentifier.associate = function (models) {
    AccountIdentifier.belongsTo(models.Account, { as: 'account' });
  };

  return AccountIdentifier;
};
