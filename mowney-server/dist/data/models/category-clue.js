"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (sequelize, DataTypes) {
    var CategoryClue = sequelize.define('CategoryClue', {
        type: DataTypes.STRING,
        mustBeCredit: DataTypes.BOOLEAN,
        mustBeDebit: DataTypes.BOOLEAN,
        validFrom: DataTypes.DATE,
        validTo: DataTypes.DATE,
        exactString: DataTypes.STRING,
        regex: DataTypes.STRING
    });
    CategoryClue.associate = function (models) {
        CategoryClue.belongsTo(models.Category, { as: 'category' });
        CategoryClue.belongsTo(models.User, { as: 'user' });
        CategoryClue.belongsTo(models.Account, { as: 'restrictToAccount' });
    };
    return CategoryClue;
});
