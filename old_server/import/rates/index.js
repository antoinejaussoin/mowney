const models = require('./../../models');
const moment = require('moment');
const async = require('async');
const importer = require('./rates-importer');
const persister = require('./rates-persister');

function importAllRates(cb) {
  getCurrencies((err, currencies) => {
    getMaxDate((err, maxDate) => {
      const today = moment().startOf('day');

      if (today <= maxDate) { return cb(null, []); }

      const nextDate = moment(maxDate).add(1, 'day');

      const loadFn = loadRatesFactory(nextDate, today);

      async.map(currencies, loadFn, (err, results) => {
        if (err) { return cb(err); }

        cb(null, results);
      });
    });
  });
}

function getCurrencies(cb) {
  models.Currency.findAll()
    .error(cb)
    .success((currencies) => {
      cb(null, currencies.filter((i) => i.isoCode.toLowerCase() != 'usd'));
    });
}

function getMaxDate(cb) {
  models.ExchangeRate.max('date')
    .error(cb)
    .success((maxDate) => {
      if (Object.prototype.toString.call(maxDate) === '[object Date]') {
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
    importer(from, to, 'USD', currency.isoCode, (err, rates) => {
      persister(rates, currency, cb);
    });
  };
}

module.exports = importAllRates;
