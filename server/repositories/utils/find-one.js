var q = require('q');

function findOne(model, includes, where) {
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

module.exports = findOne;