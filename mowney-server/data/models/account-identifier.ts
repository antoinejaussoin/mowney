import Sequelize, { SequelizeStatic } from "sequelize";

export interface IAccountIdentifier {
  type: string;
  value: string;
  account?: Account;
}

export default (sequelize: Sequelize.Sequelize, DataTypes: SequelizeStatic) => {
  const AccountIdentifier = sequelize.define<IAccountIdentifier, void>('AccountIdentifier', {
    type: DataTypes.STRING,
    value: DataTypes.STRING
  });

  AccountIdentifier.associate = function (models) {
    AccountIdentifier.belongsTo(models.Account, { as: 'account' });
  };

  return AccountIdentifier;
};
