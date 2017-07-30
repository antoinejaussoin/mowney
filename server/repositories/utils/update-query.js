const loadQuery = require('../query-loader');
const q = require('q');
const models = require('../../models');
const sequelize = require('sequelize');

function updateQuery(name, parameters, queryModifier) {
  const defer = q.defer();

  let query = loadQuery(name);

  if (queryModifier) {
    query = queryModifier(query);
  }

  models.sequelize.query(query, {
    replacements: parameters
  }).spread((data, metadata) => {
    defer.resolve(true);
  }).catch((err) => {
    console.error(err);
    defer.reject(err);
  });

  return defer.promise;
}

module.exports = updateQuery;
