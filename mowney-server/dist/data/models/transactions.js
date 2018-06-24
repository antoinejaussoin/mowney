"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (sequelize, DataTypes) {
    var Transactions = sequelize.define('Transactions', {
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
});
