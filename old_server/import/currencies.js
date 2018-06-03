const models = require('../models');
const moment = require('moment');
const async = require('async');

function importCurrencies(cb) {
  async.series([
    importCurrency('EUR', 'Euro', false, '€', ''),
    importCurrency('GBP', 'Pound', true, '£', ''),
    importCurrency('USD', 'US Dollar', false, '$', '')
  ], (err, results) => {
    console.log(`import result: ${JSON.stringify(results)}`);
    if (err) { return cb(err, null); }
    return cb(null, results);
  });

  function importCurrency(iso, name, isMain, symbol, format) {
    return function (cb) {
      models.Currency.create({
        isoCode: iso,
        name,
        isMain,
        symbol,
        format
      }).complete((err, currency) => {
        if (err) {
          console.log(`error while creating a currency: ${err}`);
          return cb(err, null);
        }

        return cb(null, currency);
      });
    };
  }
}

module.exports = importCurrencies;
