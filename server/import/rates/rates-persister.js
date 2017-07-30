var models = require('./../../models');
var async = require('async');

function persistRates(rates, currency, cb) {
    var ratesAsModel = rates.map(function (r) {
        return {
            date: r.date,
            rate: r.value
        }
    });
    
    var persistFunction = persistExchangeRateWithCurrency(currency);

    async.map(ratesAsModel, persistFunction, cb);

//    models.ExchangeRate.bulkCreate(ratesAsModel)
//        .error(cb)
//        .success(function (created) {
//            cb(null, created);
//        });
}

function persistExchangeRateWithCurrency(currency) {
    return function persistExchangeRate(rate, cb) {
        models.ExchangeRate.create(rate)
            .error(cb)
            .success(function (created) {
                created.setCurrency(currency)
                    .error(cb)
                    .complete(function () {
                        cb(null, created);
                    })
            });
    }
}

module.exports = persistRates;