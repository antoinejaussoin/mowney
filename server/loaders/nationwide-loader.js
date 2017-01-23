var parse = require('csv-parse');
var moment = require('moment');
var ImportedTransaction = require('./imported-transaction');
var q = require('q');
var lineSkip = require('../utils/line-skip');

function nationwideLoader(raw) {
    var defer = q.defer();
    
    raw = lineSkip(raw, 4);

    parse(raw, {
        columns: function () {
            return ['date', 'type', 'description', 'debit', 'credit', 'balance'];
        },
        delimiter: ',',
        auto_parse: true
    }, function (err, output) {
        if (err) {
            defer.reject(err);
        } else {
            output = output.map(function (item) {
                return new ImportedTransaction(
                    moment(item.date, 'DD MMM YYYY').toDate(),
                    item.description,
                    item.credit ? fixNumber(item.credit) : -fixNumber(item.debit)
                );
            });
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
}