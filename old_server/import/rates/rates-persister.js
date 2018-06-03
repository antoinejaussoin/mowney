const models = require('./../../models');
const async = require('async');

function persistRates(rates, currency, cb) {
  const ratesAsModel = rates.map((r) => ({
    date: r.date,
    rate: r.value
  }));

  const persistFunction = persistExchangeRateWithCurrency(currency);

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
      .success((created) => {
        created.setCurrency(currency)
          .error(cb)
          .complete(() => {
            cb(null, created);
          });
      });
  };
}

module.exports = persistRates;
