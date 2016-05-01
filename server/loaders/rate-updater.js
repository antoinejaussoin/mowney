var loader = require('./rate-loader');
var rateRepository = require('../repositories/rate-repository');
var currencyRepository = require('../repositories/currency-repository');
var q = require('q');
var _ = require('lodash');

module.exports = function () {
    var currencies = ['GBP', 'EUR', 'CHF', 'SEK'];

    return currencyRepository.getAll()
        .then(function (currencies) {
            var promises = currencies
                .filter(function (currency) {
                    return !currency.isMain;
                })
                .map(function (currency) {
                    var save = _.partial(rateRepository.save, currency.isoCode);
                    return loader('USD', currency.isoCode).then(save);
                });

            return q.all(promises);
        });
};