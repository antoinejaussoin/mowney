"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var config_1 = require("../../config");
var account_1 = require("./account");
var category_clue_1 = require("./category-clue");
var category_1 = require("./category");
var currency_1 = require("./currency");
var exchange_rate_1 = require("./exchange-rate");
var import_1 = require("./import");
var transactions_1 = require("./transactions");
var user_1 = require("./user");
// const Sequelize = require('sequelize');
// interface Database {
//   init?: () => void;
//   sequelize: Sequelize.Sequelize;
//   Sequelize: SequelizeStatic;
//   accountIdentifier?: any;
// }
// const config = require(`${__dirname}/../../config`);
// console.log('Config: ', config);
var db = new sequelize_1.default(config_1.default.database, config_1.default.username, config_1.default.password, __assign({}, config_1.default, { logging: console.log }));
exports.db = db;
// const db: Database = {
//   sequelize,
//   Sequelize,
// };
// const initialised = false;
var Account = account_1.default(db, sequelize_1.default);
exports.Account = Account;
var CategoryClue = category_clue_1.default(db, sequelize_1.default);
exports.CategoryClue = CategoryClue;
var Category = category_1.default(db, sequelize_1.default);
exports.Category = Category;
var Currency = currency_1.default(db, sequelize_1.default);
exports.Currency = Currency;
var ExchangeRate = exchange_rate_1.default(db, sequelize_1.default);
var Import = import_1.default(db, sequelize_1.default);
exports.Import = Import;
var Transaction = transactions_1.default(db, sequelize_1.default);
exports.Transaction = Transaction;
var User = user_1.default(db, sequelize_1.default);
exports.User = User;
var models = {
    Account: Account,
    CategoryClue: CategoryClue,
    Category: Category,
    Currency: Currency,
    ExchangeRate: ExchangeRate,
    Import: Import,
    Transaction: Transaction,
    User: User,
};
// const Account: Sequelize.Model<IAccount, void> = AccountModel(db, Sequelize);
// models.forEach(modelFactory => {
//   const model = modelFactory(db, Sequelize);
//   db[model.name] = model;
// });
Object.keys(models).forEach(function (modelName) {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});
