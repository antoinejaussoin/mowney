var parse = require('csv-parse');
var moment = require('moment');
var ImportedTransaction = require('./imported-transaction');
var q = require('q');
var os = require('os');


function citibankLoader(raw) {
    var defer = q.defer();

    raw = "date,description,amount,currency,balance,accountNumber,x,anotherDate" + os.EOL + raw;

    parse(raw, {
        columns: true,
        delimiter: ',',
        auto_parse: true
    }, function (err, output) {
        if (err) {
            defer.reject(err);
        } else {
            output = output.map(function (item) {
                return new ImportedTransaction(
                    moment(item.date, 'DD-MM-YYYY').toDate(),
                    item.description,
                    fixNumber(item.amount)
                );
            });
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
}