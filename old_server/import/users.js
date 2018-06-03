const models = require('../models');
const moment = require('moment');
const async = require('async');

function importOwner(user, currency, cb) {
  user.setCurrency(currency).success((err, u) => {
    cb(err, user);
  });
}

module.exports = importOwner;
