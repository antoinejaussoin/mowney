"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (sequelize, DataTypes) {
    var Currency = sequelize.define('Currency', {
        isoCode: DataTypes.STRING,
        name: DataTypes.STRING,
        isMain: DataTypes.BOOLEAN,
        symbol: DataTypes.STRING,
        format: DataTypes.STRING
    });
    return Currency;
});
