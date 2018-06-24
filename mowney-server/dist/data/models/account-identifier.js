"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (sequelize, DataTypes) {
    var AccountIdentifier = sequelize.define('AccountIdentifier', {
        type: DataTypes.STRING,
        value: DataTypes.STRING
    });
    AccountIdentifier.associate = function (models) {
        AccountIdentifier.belongsTo(models.Account, { as: 'account' });
    };
    return AccountIdentifier;
});
