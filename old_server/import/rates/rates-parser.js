const parse = require('csv-parse');
const _ = require('lodash');
const moment = require('moment');

function parseRates(rawCsv, cb) {
  parse(rawCsv, {
    delimiter: ' '
  }, (err, output) => {
    if (err) { return cb(err); }

    const transform = output.map((i) => ({
      date: moment(moment(i[0]).format('YYYY-MM-DD')).toString(),
      value: +i[1]
    }));

    cb(null, transform);
  });
}

module.exports = parseRates;
