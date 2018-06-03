const q = require('q');

function findOne(model, includes, where) {
  const defer = q.defer();

  model.find({
    where,
    include: includes || []
  })
    .then((result) => {
      defer.resolve(result);
    }, (err) => {
      console.error(err);
      defer.reject(err);
    });

  return defer.promise;
}

module.exports = findOne;
