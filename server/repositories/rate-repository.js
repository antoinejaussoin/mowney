const models = require('../models');
const q = require('q');
const moment = require('moment');
const associate = require('./utils/associate');

function save(currency, rate) {
  const defer = q.defer();

  try {
    models.ExchangeRate.create({
      date: moment(),
      rate
    }).then((a) => associate(a, 'Currency', 'Currency', currency, 'isoCode')).then((a) => {
      defer.resolve(a);
    }).catch((err) => {
      console.error(err);
      defer.reject(err);
    });
  } catch (e) {
    console.error(e);
  }

  return defer.promise;
}

module.exports = {
  save
};
