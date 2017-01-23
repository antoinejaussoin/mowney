var moment = require('moment');

module.exports = function ImportedTransaction(date, description, amount) {
    this.date = fixDate(date);
    this.description = description;
    this.amount = amount;
}

function fixDate(date) {
    var parsed = moment(date);

    if (parsed.hour() <= 23 && parsed.hour() > 12) {
        parsed.add(1, 'days');
    }

    parsed.hour(0);
    parsed.minute(0);
    
    return parsed.toDate();
}