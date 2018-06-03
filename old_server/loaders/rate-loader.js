const q = require('q');
const request = require('request');

module.exports = function (fromCurrency, toCurrency) {
  const defer = q.defer();

  const currencyPair = fromCurrency.toUpperCase() + toCurrency.toUpperCase();
  const url = `https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in ("${currencyPair}")&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`;

  request({
    url,
    json: true
  }, (error, response, body) => {
    if (error) {
      defer.reject(error);
    } else if (body &&
                body.query &&
                body.query.results &&
                body.query.results.rate &&
                body.query.results.rate.Rate) {
      defer.resolve(+body.query.results.rate.Rate);
    } else {
      defer.reject('Error while trying to get the rate');
    }
  });

  return defer.promise;
};
