"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (sequelize, DataTypes) {
    var Import = sequelize.define('Import', {
        date: DataTypes.DATE,
        fileName: DataTypes.STRING,
        isManual: DataTypes.BOOLEAN
    });
    Import.associate = function (models) {
    };
    return Import;
});
