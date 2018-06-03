const q = require('q');
const findOne = require('./find-one');

function toggle(model, id, property) {
  const defer = q.defer();

  findOne(model, [], {
    id
  }).then((result) => {
    result[property] = !result[property];
    result.save().then(() => {
      defer.resolve(result[property]);
    }, (err) => {
      console.error(err);
      defer.reject(err);
    });
  }, (err) => {
    console.error(err);
    defer.reject(err);
  });

  return defer.promise;
}

module.exports = toggle;
