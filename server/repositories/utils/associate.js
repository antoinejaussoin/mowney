const q = require('q');
const models = require('../../models');

function associate(entity, type, propertyName, id, idProperty) {
  const defer = q.defer();

  let whereClause;

  if (idProperty === undefined) {
    whereClause = { id };
  } else {
    whereClause = {};
    whereClause[idProperty] = id;
  }

  if (!entity[`set${propertyName}`]) {
    defer.reject(`There are no function set${propertyName}`);
  } else {
    models[type].find({
      where: whereClause
    }).then((item) => {
      entity[`set${propertyName}`](item).then(() => {
        defer.resolve(entity);
      }, (err) => {
        console.error(err);
        defer.reject(err);
      });
    }, (err) => {
      console.error(err);
      defer.reject(err);
    });
  }

  return defer.promise;
}

module.exports = associate;
