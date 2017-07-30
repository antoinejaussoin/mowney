var models = require('../models');
var findAll = require('./utils/find-all');

function getAll() {
    return findAll(models.Currency, null);
}

module.exports = {
    getAll: getAll
}