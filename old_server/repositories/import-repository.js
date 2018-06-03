const models = require('../models');
const q = require('q');
const moment = require('moment');


function getById(user, id) {
  return models.Import
    .find({
      where: {
        id
      }
    });
}

function create(fileName) {
  return models.Import.create({
    date: moment(),
    fileName,
    isManual: false
  });
}

module.exports = {
  create,
  getById
};
