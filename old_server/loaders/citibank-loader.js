const parse = require('csv-parse');
const moment = require('moment');
const ImportedTransaction = require('./imported-transaction');
const q = require('q');
const os = require('os');


function citibankLoader(raw) {
  const defer = q.defer();

  raw = `date,description,amount,currency,balance,accountNumber,x,anotherDate${os.EOL}${raw}`;

  parse(raw, {
    columns: true,
    delimiter: ',',
    auto_parse: true
  }, (err, output) => {
    if (err) {
      defer.reject(err);
    } else {
      output = output.map((item) => new ImportedTransaction(
        moment(item.date, 'DD-MM-YYYY').toDate(),
        item.description,
        fixNumber(item.amount)
      ));
      defer.resolve(output);
    }
  });

  function fixNumber(input) {
    return +input;
  }

  return defer.promise;
}

module.exports = {
  name: 'Citibank UK',
  type: 'CitibankUk',
  load: citibankLoader
};
