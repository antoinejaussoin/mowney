var parse = require('csv-parse');
var moment = require('moment');
var ImportedTransaction = require('./imported-transaction');
var q = require('q');


function cicLoader(raw) {
    var defer = q.defer();

    parse(raw, {
        columns: function () {
            return ['date', 'dateVal', 'debit', 'credit', 'description', 'runningTotal']
        },
        delimiter: ';',
        auto_parse: true
    }, function (err, output) {
        if (err) {
            defer.reject(err);
        } else {
            output = output.map(function (item) {
                return new ImportedTransaction(
                    moment(item.date, 'DD-MM-YYYY').toDate(),
                    item.description,
                    item.credit ? fixNumber(item.credit) : fixNumber(item.debit)
                );
            });
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
}