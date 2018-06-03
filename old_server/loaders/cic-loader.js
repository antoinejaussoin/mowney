const parse = require('csv-parse');
const moment = require('moment');
const ImportedTransaction = require('./imported-transaction');
const q = require('q');


function cicLoader(raw) {
  const defer = q.defer();

  parse(raw, {
    columns() {
      return ['date', 'dateVal', 'debit', 'credit', 'description', 'runningTotal'];
    },
    delimiter: ';',
    auto_parse: true
  }, (err, output) => {
    if (err) {
      defer.reject(err);
    } else {
      output = output.map((item) => new ImportedTransaction(
        moment(item.date, 'DD-MM-YYYY').toDate(),
        item.description,
        item.credit ? fixNumber(item.credit) : fixNumber(item.debit)
      ));
      defer.resolve(output);
    }
  });

  function fixNumber(input) {
    return +(input.replace('.', '').replace(',', '.'));
  }

  return defer.promise;
}

module.exports = {
  name: 'CIC Paris',
  type: 'CicParis',
  load: cicLoader
};
