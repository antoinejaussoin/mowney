var loadQuery = require('../query-loader');
var q = require('q');
var models = require('../../models');
var sequelize = require('sequelize');

function updateQuery(name, parameters, queryModifier) {
    var defer = q.defer();

    var query = loadQuery(name);

    if (queryModifier) {
        query = queryModifier(query);
    }

    models.sequelize.query(query, {
        replacements: parameters
    }).spread(function (data, metadata) {
        defer.resolve(true);
    }).catch(function (err) {
        console.error(err);
        defer.reject(err);
    });

    return defer.promise;
}

module.exports = updateQuery;
