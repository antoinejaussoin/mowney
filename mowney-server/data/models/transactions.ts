import Sequelize, { SequelizeStatic } from "sequelize";

export interface ITransactions {
  amount: number,
  date: Date,
  description: string,
  categorisedDate: Date
}

export default (sequelize: Sequelize.Sequelize, DataTypes: SequelizeStatic) => {
  const Transactions = sequelize.define<ITransactions, void>('Transactions', {
    amount: DataTypes.DECIMAL(12, 6),
    date: DataTypes.DATE,
    description: DataTypes.STRING,
    categorisedDate: DataTypes.DATE
  });

  Transactions.associate = function (models) {
    Transactions.belongsTo(models.Account, { as: 'account' });
    Transactions.belongsTo(models.Category, { as: 'category' });
    Transactions.belongsTo(models.Import, { as: 'import' });
    Transactions.belongsTo(models.CategoryClue, { as: 'categoryClue' });
  };

  return Transactions;
};
