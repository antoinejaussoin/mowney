var q = require('q');
var request = require('request');

module.exports = function (fromCurrency, toCurrency) {
    'use strict';

    var defer = q.defer();

    var currencyPair = fromCurrency.toUpperCase() + toCurrency.toUpperCase();
    var url = 'https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in ("' + currencyPair + '")&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';

    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (error) {
            defer.reject(error);
        } else {
            if (body &&
                body.query &&
                body.query.results &&
                body.query.results.rate &&
                body.query.results.rate.Rate) {
                defer.resolve(+body.query.results.rate.Rate);
            } else {
                defer.reject('Error while trying to get the rate');
            }
        }
    });

    return defer.promise;
};