var q = require('q');

function findAll(model, includes, where) {
    var defer = q.defer();

    model.find({
        where: where,
        include: includes || []
    })
        .then(function (result) {
            defer.resolve(result);
        }, function (err) {
            console.error(err);
            defer.reject(err);
        });

    return defer.promise;
}

module.exports = findAll;