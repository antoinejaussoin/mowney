var _ = require('underscore');
var moment = require('moment');

module.exports = function deduplicate(transactions, importedTransactions) {
    // Todo: improve algorithm
    
    var format = 'YYYY-MM-DD';

    var filtered = importedTransactions.filter(function (item) {
        return !_.some(transactions, function (t) {
            return moment(t.date).format(format) === moment(item.date).format(format) 
                && t.amount == item.amount;
        });
    });

    return filtered;
}