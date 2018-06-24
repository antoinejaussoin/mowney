import Sequelize, { SequelizeStatic } from "sequelize";

export interface IAccount {
  name: string;
  loaderType: string;
  isActive: boolean;
  isStatEnabled: boolean;
}

export default (sequelize: Sequelize.Sequelize, DataTypes: SequelizeStatic) => {
  const Account = sequelize.define<IAccount, void>('Account', {
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
