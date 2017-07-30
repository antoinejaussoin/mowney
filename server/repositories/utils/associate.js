var q = require('q');
var models = require('../../models');

function associate(entity, type, propertyName, id, idProperty) {
    var defer = q.defer();
    
    var whereClause;
    
    if (idProperty === undefined){
        whereClause = {id: id};
    } else {
        whereClause = {};
        whereClause[idProperty] = id;
    }

    if (!entity['set' + propertyName]) {
        defer.reject('There are no function set' + propertyName);
    } else {

        models[type].find({
            where: whereClause
        }).then(function (item) {
            entity['set' + propertyName](item).then(function () {
                defer.resolve(entity);
            }, function(err){
                console.error(err);
                defer.reject(err);   
            });
        }, function (err) {
            console.error(err);
            defer.reject(err);
        });
    }

    return defer.promise;
}

module.exports = associate;