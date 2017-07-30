const models = require('../models');
const findAll = require('./utils/find-all');

function getAll() {
  return findAll(models.Currency, null);
}

module.exports = {
  getAll
};
