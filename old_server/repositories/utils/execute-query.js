const loadQuery = require('../query-loader');
const q = require('q');
const models = require('../../models');
const sequelize = require('sequelize');


function executeQuery(name, parameters, queryModifier, resultModifier) {
  const defer = q.defer();

  let query = loadQuery(name);

  if (queryModifier) {
    query = queryModifier(query);
  }

  models.sequelize.query(query, {
    replacements: parameters,
    type: sequelize.QueryTypes.SELECT
  }).then((data, metadata) => {
    if (resultModifier) {
      data = resultModifier(data);
    }
    defer.resolve(data);
  }, (err) => {
    console.error(err);
    defer.reject(err);
  });

  return defer.promise;
}


module.exports = executeQuery;
