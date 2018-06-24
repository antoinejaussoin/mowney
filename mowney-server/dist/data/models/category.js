"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (sequelize, DataTypes) {
    var Category = sequelize.define('Category', {
        name: DataTypes.STRING,
        description: DataTypes.STRING
    });
    Category.associate = function (models) {
        Category.belongsTo(Category, { as: 'parent' });
        Category.hasMany(Category, { foreignKey: 'parentId' });
    };
    return Category;
});
