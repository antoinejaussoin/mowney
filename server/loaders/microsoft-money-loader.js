const parse = require('xml2js').parseString;
const moment = require('moment');
const ImportedTransaction = require('./imported-transaction');
const q = require('q');
const lineSkip = require('../utils/line-skip');

function microsoftMoneyLoader(raw) {
  const defer = q.defer();

  raw = lineSkip(raw, 10);

  parse(raw, (err, output) => {
    if (err) {
      defer.reject(err);
    } else {
      if (!output || !output.OFX) { return defer.resolve([]); }

      const rawTransactions = output.OFX
        .BANKMSGSRSV1[0]
        .STMTTRNRS[0]
        .STMTRS[0]
        .BANKTRANLIST[0];

      if (!rawTransactions.STMTTRN) { return defer.resolve([]); }

      const transactions = rawTransactions.STMTTRN.map((raw) => new ImportedTransaction(
        moment(raw.DTPOSTED[0].substring(0, 8), 'YYYYMMDD').toDate(),
        raw.NAME[0].trim(), +raw.TRNAMT[0]
      ));

      defer.resolve(transactions);
    }
  });

  function fixNumber(input) {
    return +(input.substring(1).replace(',', ''));
  }

  return defer.promise;
}

module.exports = {
  name: 'Microsoft Money (OFX)',
  type: 'MicrosoftMoney',
  load: microsoftMoneyLoader
};
