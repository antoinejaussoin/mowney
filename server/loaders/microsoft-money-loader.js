var parse = require('xml2js').parseString;
var moment = require('moment');
var ImportedTransaction = require('./imported-transaction');
var q = require('q');
var lineSkip = require('../utils/line-skip');

function microsoftMoneyLoader(raw) {
    var defer = q.defer();

    raw = lineSkip(raw, 10);

    parse(raw, function (err, output) {
        if (err) {
            defer.reject(err);
        } else {
            if (!output || !output.OFX)
                return defer.resolve([]);

            var rawTransactions = output.OFX
                .BANKMSGSRSV1[0]
                .STMTTRNRS[0]
                .STMTRS[0]
                .BANKTRANLIST[0];
            
            if (!rawTransactions.STMTTRN)
                return defer.resolve([]);
            
            var transactions = rawTransactions.STMTTRN.map(function (raw) {
                return new ImportedTransaction(
                    moment(raw.DTPOSTED[0].substring(0, 8), 'YYYYMMDD').toDate(),
                    raw.NAME[0].trim(), +raw.TRNAMT[0]
                );
            });
           
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
}