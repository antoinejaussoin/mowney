module.exports = function (sequelize, DataTypes) {
    var Import = sequelize.define('Import', {
        date: DataTypes.DATE,
        fileName: DataTypes.STRING,
        isManual: DataTypes.BOOLEAN
    }, {
        classMethods: {
            associate: function(models){ 
                
            } 
        }
    });
    
    return Import;
};