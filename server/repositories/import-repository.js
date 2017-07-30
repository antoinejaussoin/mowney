var models = require('../models');
var q = require('q');
var moment = require('moment');


function getById(user, id) {
    return models.Import
        .find({
            where: {
                id: id
            }
        });
}

function create(fileName) {
    return models.Import.create({
        date: moment(),
        fileName: fileName,
        isManual: false
    });
}

module.exports = {
    create: create,
    getById: getById
};