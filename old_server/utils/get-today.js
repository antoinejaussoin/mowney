const moment = require('moment');

module.exports = function getToday() {
  return moment().startOf('day');
};
