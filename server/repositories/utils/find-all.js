var q = require('q');

function findAll(model, includes, where, order) {
    var defer = q.defer();

    var query = {};

    if (where) {
        query.where = [where, []];
    }

    if (order) {
        query.order = order;
    }

    if (includes) {
        query.include = includes;
    }

    model.findAll(query)
        .then(function (result) {
            defer.resolve(result);
        }, function (err) {
            console.error(err);
            defer.reject(err);
        });

    return defer.promise;
}

module.exports = findAll;
