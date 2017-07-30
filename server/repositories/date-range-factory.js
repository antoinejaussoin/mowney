const moment = require('moment');
const getToday = require('../utils/get-today');

function getCurrentMonth() {
  return {
    from: getToday().startOf('month'),
    to: getToday()
  };
}

function getLastMonth() {
  return getXLastMonths(1);
}

function getLast6Months() {
  return getXLastMonths(6);
}

function getLastYear() {
  return getXLastMonths(12);
}

function get3Years() {
  return getXLastMonths(36);
}

function getSinceInception() {
  return {
    from: moment('1900-01-01'),
    to: getToday()
  };
}

function getXLastMonths(months) {
  return {
    from: getToday().startOf('month').subtract(months, 'month'),
    to: getToday().subtract(1, 'month').endOf('month')
  };
}

module.exports = {
  getCurrentMonth,
  getLastMonth,
  getLast6Months,
  getLastYear,
  get3Years,
  getSinceInception
};
