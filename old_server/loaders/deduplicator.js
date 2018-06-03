const _ = require('underscore');
const moment = require('moment');

module.exports = function deduplicate(transactions, importedTransactions) {
  // Todo: improve algorithm

  const format = 'YYYY-MM-DD';

  const filtered = importedTransactions.filter((item) => !_.some(transactions, (t) => moment(t.date).format(format) === moment(item.date).format(format)
                && t.amount == item.amount));

  return filtered;
};
