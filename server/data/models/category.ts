import Sequelize, { SequelizeStatic } from "sequelize";

export default (sequelize: Sequelize.Sequelize, DataTypes: SequelizeStatic) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  });

  Category.associate = function (models) {
    Category.belongsTo(Category, { as: 'parent' });
    Category.hasMany(Category, { foreignKey: 'parentId' });
  };

  return Category;
};
