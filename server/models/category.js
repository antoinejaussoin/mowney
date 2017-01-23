module.exports = function (sequelize, DataTypes) {
    var Category = sequelize.define('Category', {
        name: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models){ 
                Category.belongsTo(Category, { as : 'parent' });   
                Category.hasMany(Category, { foreignKey: 'parentId' });   
            } 
        }
    });
    
    return Category;
};