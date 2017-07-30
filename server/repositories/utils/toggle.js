var q = require('q');
var findOne = require('./find-one');

function toggle(model, id, property) {
    var defer = q.defer();

    findOne(model, [], {
        id: id
    }).then(function (result) {
        result[property] = !result[property];
        result.save().then(function () {
            defer.resolve(result[property]);
        }, function (err) {
            console.error(err);
            defer.reject(err);
        });

    }, function (err) {
        console.error(err);
        defer.reject(err);
    });

    return defer.promise;
}

module.exports = toggle;