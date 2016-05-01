module.exports = function (sequelize, DataTypes) {
    var AccountIdentifier = sequelize.define('AccountIdentifier', {
        type: DataTypes.STRING,
        value: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models){ 
                AccountIdentifier.belongsTo(models.Account, { as : 'account' });   
            } 
        }
    });
    
    return AccountIdentifier;
};