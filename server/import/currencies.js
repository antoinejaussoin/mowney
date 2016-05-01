var models = require('../models');
var moment = require('moment');
var async = require('async');

function importCurrencies(cb) {

    async.series([
            importCurrency('EUR', 'Euro', false, '€', ''),
            importCurrency('GBP', 'Pound', true, '£', ''),
            importCurrency('USD', 'US Dollar', false, '$', '')
        ], function (err, results) {
        console.log('import result: ' + JSON.stringify(results));
        if (err)
            return cb(err, null)
        else
            return cb(null, results);
    });

    function importCurrency(iso, name, isMain, symbol, format) {
        return function (cb) {
            models.Currency.create({
                isoCode: iso,
                name: name,
                isMain: isMain,
                symbol: symbol,
                format: format
            }).complete(function (err, currency) {
                if (err) {
                    console.log('error while creating a currency: ' + err);
                    return cb(err, null);
                }

                return cb(null, currency);
            });
        }
    }
}

module.exports = importCurrencies;