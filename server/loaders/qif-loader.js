const qif2json = require('qif2json');
const moment = require('moment');
const ImportedTransaction = require('./imported-transaction');
const q = require('q');

// {
//   "date": "2018-05-29",
//   "amount": -1000,
//   "payee": "Monzo Top Up",
//   "category": "cash",
//   "address": [
//     "Room 424, 7 Gra"
//   ]
// },

function qifLoader(raw) {
  const defer = q.defer();

  const result = qif2json.parse(raw);
  console.log('Result: ', JSON.stringify(result));

  const transactions = result.transactions.map(t => new ImportedTransaction(
    moment(t.date, 'YYYY-MM-DD'),
    description(t.payee, t.category),
    t.amount
  ));

  defer.resolve(transactions);

  return defer.promise;
}

function description(payee, category) {
  if (category) {
    return '[' + category + '] ' + payee;
  }

  return payee;
}

module.exports = {
  name: 'QIF Format',
  type: 'QIF',
  load: qifLoader
};
