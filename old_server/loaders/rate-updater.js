const loader = require('./rate-loader');
const rateRepository = require('../repositories/rate-repository');
const currencyRepository = require('../repositories/currency-repository');
const q = require('q');
const _ = require('lodash');

module.exports = function () {
  const currencies = ['GBP', 'EUR', 'CHF', 'SEK'];

  return currencyRepository.getAll()
    .then((currencies) => {
      const promises = currencies
        .filter((currency) => !currency.isMain)
        .map((currency) => {
          const save = _.partial(rateRepository.save, currency.isoCode);
          return loader('USD', currency.isoCode).then(save);
        });

      return q.all(promises);
    });
};
