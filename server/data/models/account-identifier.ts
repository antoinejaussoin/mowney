import Sequelize, { SequelizeStatic } from "sequelize";

export default (sequelize: Sequelize.Sequelize, DataTypes: SequelizeStatic) => {
  const AccountIdentifier = sequelize.define('AccountIdentifier', {
    type: DataTypes.STRING,
    value: DataTypes.STRING
  });

  AccountIdentifier.associate = function (models) {
    AccountIdentifier.belongsTo(models.Account, { as: 'account' });
  };

  return AccountIdentifier;
};
