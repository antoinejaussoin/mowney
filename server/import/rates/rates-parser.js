var parse = require('csv-parse');
var _ = require('lodash');
var moment = require('moment');

function parseRates(rawCsv, cb) {
    parse(rawCsv, {
        delimiter: ' '
    }, function (err, output) {
        if (err)
            return cb(err);

        var transform = output.map(function (i) {
            return {
                date: moment(moment(i[0]).format('YYYY-MM-DD')).toString(),
                value: +i[1]
            }
        });
        
        cb(null, transform);
    });
}

module.exports = parseRates;