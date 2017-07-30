var models = require('../models');
var findAll = require('./utils/find-all');
var findOne = require('./utils/find-one');
var associate = require('./utils/associate');
var executeQuery = require('./utils/execute-query');
var updateQuery = require('./utils/update-query');
var moment = require('moment');

function getAll() {
    return findAll(models.Category, null, null, ['name']);
}

function getAllClues(user) {
    return findAll(models.CategoryClue, [{
            model: models.Category,
            as: 'category'
        },
        {
            model: models.Account,
            as: 'restrictToAccount'
    }], 'userId = ' + user.id);
}

function createClue(user, categoryId, isRegex, str) {
    return models.CategoryClue.create({
        type: isRegex ? 'Regex' : 'Exact',
        exactString: isRegex ? null : str,
        regex: isRegex ? str : null,
        mustBeCredit: false,
        mustBeDebit: false
    }).then(function (cc) {
        return associate(cc, 'User', 'User', user.id);
    }).then(function (cc) {
        return associate(cc, 'Category', 'Category', categoryId);
    });

}

function deleteClue(user, clueId) {
    return models.CategoryClue.destroy({
        where: {
            id: clueId,
            userId: user.id
        }
    });
}

function categoriseAll(user) {
    return updateQuery('categorise', {
        userId: user.id
    });
}

function categoryPerMonth(user, currency, categoryId, fromDate, toDate) {

    var from = (fromDate || moment('1900-01-01')).format('YYYY-MM-DD');
    var to = (toDate || moment('2100-01-01')).format('YYYY-MM-DD');

    return executeQuery('category-per-month', {
        currency: currency,
        userId: user.id,
        from: from,
        to: to,
        categoryId: categoryId
    });
}

function unCategorise(user, transactionId) {
    return categorise(user, transactionId, null);
}

function categorise(user, transactionId, categoryId) {
    console.log('categorise: ' + transactionId + '/' + categoryId);
    return findOne(models.Transactions, null, {
            id: transactionId
        })
        .then(function (transaction) {
            return transaction.updateAttributes({
                categoryId: categoryId,
                categoryClueId: null
            });
        });
}


module.exports = {
    getAll: getAll,
    getAllClues: getAllClues,
    createClue: createClue,
    categoriseAll: categoriseAll,
    categoryPerMonth: categoryPerMonth,
    deleteClue: deleteClue,
    categorise: categorise,
    unCategorise: unCategorise
}