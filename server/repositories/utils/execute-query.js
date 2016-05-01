var loadQuery = require('../query-loader');
var q = require('q');
var models = require('../../models');
var sequelize = require('sequelize');


function executeQuery(name, parameters, queryModifier, resultModifier) {
    var defer = q.defer();

    var query = loadQuery(name);

    if (queryModifier) {
        query = queryModifier(query);
    }

    models.sequelize.query(query, {
        replacements: parameters,
        type: sequelize.QueryTypes.SELECT
    }).then(function (data, metadata) {
        if (resultModifier) {
            data = resultModifier(data);
        }
        defer.resolve(data);
    }, function (err) {
        console.error(err);
        defer.reject(err);
    });

    return defer.promise;
}



module.exports = executeQuery;