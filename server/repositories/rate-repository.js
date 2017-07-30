var models = require('../models');
var q = require('q');
var moment = require('moment');
var associate = require('./utils/associate');

function save(currency, rate) {
    var defer = q.defer();

    try {

        models.ExchangeRate.create({
            date: moment(),
            rate: rate
        }).then(function (a) {
            return associate(a, 'Currency', 'Currency', currency, 'isoCode');
        }).then(function (a) {
            defer.resolve(a);
        }).catch(function (err) {
            console.error(err);
            defer.reject(err);
        });
    } catch (e) {
        console.error(e);
    }

    return defer.promise;
}

module.exports = {
    save: save
};