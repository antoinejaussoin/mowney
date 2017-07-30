var models = require('../models');
var moment = require('moment');
var async = require('async');

function importOwner(user, currency, cb) {

    user.setCurrency(currency).success(function (err, u) {
        cb(err, user);
    });

};

module.exports = importOwner;