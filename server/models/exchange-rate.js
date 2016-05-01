module.exports = function (sequelize, DataTypes) {
    var ExchangeRate = sequelize.define('ExchangeRate', {
        date: DataTypes.DATE,
        rate: DataTypes.DECIMAL(12, 6)
    }, {
        classMethods: {
            associate: function(models){ 
                ExchangeRate.belongsTo(models.Currency, { as : 'currency' });
            } 
        }
    });
    
    return ExchangeRate;
};