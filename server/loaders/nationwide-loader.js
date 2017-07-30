const parse = require('csv-parse');
const moment = require('moment');
const ImportedTransaction = require('./imported-transaction');
const q = require('q');
const lineSkip = require('../utils/line-skip');

function nationwideLoader(raw) {
  const defer = q.defer();

  raw = lineSkip(raw, 4);

  parse(raw, {
    columns() {
      return ['date', 'type', 'description', 'debit', 'credit', 'balance'];
    },
    delimiter: ',',
    auto_parse: true
  }, (err, output) => {
    if (err) {
      defer.reject(err);
    } else {
      output = output.map((item) => new ImportedTransaction(
        moment(item.date, 'DD MMM YYYY').toDate(),
        item.description,
        item.credit ? fixNumber(item.credit) : -fixNumber(item.debit)
      ));
      defer.resolve(output);
    }
  });

  function fixNumber(input) {
    return +(input.substring(1).replace(',', ''));
  }

  return defer.promise;
}

module.exports = {
  name: 'Nationwide UK',
  type: 'NationWideCurrent',
  load: nationwideLoader
};
