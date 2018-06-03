const q = require('q');

function findAll(model, includes, where, order) {
  const defer = q.defer();

  const query = {};

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
    .then((result) => {
      defer.resolve(result);
    }, (err) => {
      console.error(err);
      defer.reject(err);
    });

  return defer.promise;
}

module.exports = findAll;
