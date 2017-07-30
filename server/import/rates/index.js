var models = require('./../../models');
var moment = require('moment');
var async = require('async');
var importer = require('./rates-importer');
var persister = require('./rates-persister');

function importAllRates(cb) {
    getCurrencies(function (err, currencies) {
        getMaxDate(function (err, maxDate) {
            var today = moment().startOf('day');

            if (today <= maxDate)
                return cb(null, []);

            var nextDate = moment(maxDate).add(1, 'day');

            var loadFn = loadRatesFactory(nextDate, today);

            async.map(currencies, loadFn, function (err, results) {
                if (err)
                    return cb(err);

                cb(null, results);
            });
        });
    });
}

function getCurrencies(cb) {
    models.Currency.findAll()
        .error(cb)
        .success(function (currencies) {
            cb(null, currencies.filter(function (i) {
                return i.isoCode.toLowerCase() != 'usd'
            }));
        });
}

function getMaxDate(cb) {
    models.ExchangeRate.max('date')
        .error(cb)
        .success(function (maxDate) {
            if (Object.prototype.toString.call(maxDate) === "[object Date]") {
                // it is a date
                if (isNaN(maxDate.getTime())) { // d.valueOf() could also work
                    cb(null, moment().add(-5, 'Year'));
                } else {
                    cb(null, maxDate);
                }
            } else {
                cb(null, moment().add(-5, 'Year'));
            }

        });
}

function loadRatesFactory(from, to) {
    return function (currency, cb) {
        importer(from, to, 'USD', currency.isoCode, function (err, rates) {
            persister(rates, currency, cb);
        });
    }
}

module.exports = importAllRates;