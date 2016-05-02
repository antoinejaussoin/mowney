var models = require('../models');
var executeQuery = require('./utils/execute-query');
var findAll = require('./utils/find-all');
var findOne = require('./utils/find-one');
var toggle = require('./utils/toggle');
var associate = require('./utils/associate');
var q = require('q');
var transactionRepository = require('./transaction-repository');

function getAll(user, includeDisabled) {
    var disabledClause = includeDisabled ? '' : ' and isActive = true';
    return findAll(models.Account, null, 'ownerid = ' + user.id + disabledClause, ['name']);
}

function getById(user, id) {

    return findOne(models.Account, [
        {
            model: models.User,
            as: 'owner',
            where: {
                id: user.id
            }
        },
        {
            model: models.Currency,
            as: 'currency'
        }
    ], {
        id: id
    });
}

function getSummary(user, currency) {
    return executeQuery('summary', {
        currency: currency,
        ownerId: user.id
    });
}

function create(user, newAccount) {
    var defer = q.defer();

    models.Account.create({
        name: newAccount.name,
        loaderType: newAccount.loader,
        isActive: true,
        isStatEnabled: true
    }).then(function (a) {
        return associate(a, 'User', 'Owner', user.id);
    }).then(function (a) {
        return associate(a, 'Currency', 'Currency', newAccount.currency);
    }).then(function (a) {
        defer.resolve(a);
    }).catch(function (err) {
        console.error(err);
        defer.reject(err);
    });

    return defer.promise;
}

function deleteAccount(user, accountId) {
    var defer = q.defer();

    getById(user, accountId).then(function (account) {
        if (!account) {
            return defer.reject('This account doesn\'t exist for this user');
        }

        transactionRepository.getByAccountId(user, accountId, 1).then(function (transactions) {
            if (transactions && transactions.length > 0) {
                return defer.reject('This account contains existing transactions and can\'t be deleted');
            }

            account.destroy().then(function () {
                defer.resolve();
            }, function (err) {
                defer.reject(err);
            });
        }, function (err) {
            defer.reject(err);
        });

    }, function (err) {
        defer.reject(err);
    });

    return defer.promise;
}

function toggleActive(user, accountId) {
    return toggle(models.Account, accountId, 'isActive');
}

function toggleStatEnabled(user, accountId) {
    return toggle(models.Account, accountId, 'isStatEnabled');
}

module.exports = {
    getAll: getAll,
    getById: getById,
    getSummary: getSummary,
    create: create,
    deleteAccount: deleteAccount,
    toggleActive: toggleActive,
    toggleStatEnabled: toggleStatEnabled
}
