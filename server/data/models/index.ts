import Sequelize, { DataTypes, SequelizeStatic } from 'sequelize';
import config from '../../config';

import AccountIdentifierModel, { IAccountIdentifier } from './account-identifier';
import AccountModel, { IAccount } from './account';
import CategoryClueModel, { ICategoryClue } from './category-clue';
import CategoryModel, { ICategory } from './category';
import CurrencyModel, { ICurrency } from './currency';
import ExchangeRateModel, { IExchangeRate } from './exchange-rate';
import ImportModel, { IImport } from './import';
import TransactionModel, { ITransactions } from './transactions';
import UserModel, { IUser } from './user';

// const Sequelize = require('sequelize');

// interface Database {
//   init?: () => void;
//   sequelize: Sequelize.Sequelize;
//   Sequelize: SequelizeStatic;
//   accountIdentifier?: any;
// }

// const config = require(`${__dirname}/../../config`);
// console.log('Config: ', config);
const db = new Sequelize(config.database, config.username, config.password, config);

// const db: Database = {
//   sequelize,
//   Sequelize,
// };
// const initialised = false;

const Account = AccountModel(db, Sequelize);
const CategoryClue = CategoryClueModel(db, Sequelize);
const Category = CategoryModel(db, Sequelize);
const Currency = CurrencyModel(db, Sequelize);
const ExchangeRate = ExchangeRateModel(db, Sequelize);
const Import = ImportModel(db, Sequelize);
const Transaction = TransactionModel(db, Sequelize);
const User = UserModel(db, Sequelize);

const models = {
  Account,
  CategoryClue,
  Category,
  Currency,
  ExchangeRate,
  Import,
  Transaction,
  User,
};


// const Account: Sequelize.Model<IAccount, void> = AccountModel(db, Sequelize);


// models.forEach(modelFactory => {
//   const model = modelFactory(db, Sequelize);
//   db[model.name] = model;
// });

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

//db.init = function () {
  
  // fs
  //   .readdirSync(__dirname)
  //   .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  //   .forEach((file) => {
  //     const model = sequelize.import(path.join(__dirname, file));
  //     db[model.name] = model;
  //   });

  // Object.keys(db).forEach((modelName) => {
  //   if ('associate' in db[modelName]) {
  //     db[modelName].associate(db);
  //   }
  // });

  // sequelize.query('SET sql_mode=""').then(res => {
  //     console.log('Setting sql_mode done ', res);
  // });
// };

// const Account = db.models.Account;
// const Currency = db.models.Currency;


// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

export { db,
  Account,
  Currency,
  Transaction,
  Category,
  CategoryClue,
  User,
  Import };
