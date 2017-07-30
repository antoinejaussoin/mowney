var models = require('../models');
var q = require('q');
var loadQuery = require('./query-loader');
var executeQuery = require('./utils/execute-query');
var findAll = require('./utils/find-all');
var findOne = require('./utils/find-one');
var dateRangeFactory = require('./date-range-factory');
var moment = require('moment');
var associate = require('./utils/associate');

function getByAccountId(user, accountId, limit) {
    return executeQuery('transactions', {
        accountId: accountId,
        ownerId: user.id
    }, function (query) {
        var limitClause = limit > 0 ? ' LIMIT ' + limit : '';
        return query + limitClause;
    });
}

function saveManualTransaction(accountId, date, description, amount) {
    return models.Transactions.create({
        date: moment(date),
        description: description,
        amount: amount
    }).then(function (t) {
        return associate(t, 'Account', 'Account', accountId);
    });
}

function deleteTransactions(user, ids) {
    return models.Transactions.destroy({
        where: {
            id: { in : ids
            }
        }
    });
}

function getRange(user, accountId, from, to) {

    return findAll(models.Transactions, [{
        model: models.Account,
        as: 'account'
    }], models.sequelize.and(
        ['accountid = ?', accountId], ['account.ownerid = ?', user.id], ['date >= ?', from], ['date <= ?', to]
    ), [['date', 'DESC']]);

}

function getTotal(user, accountId) {
    var includes = [];

    includes.push({
        model: models.Account,
        as: 'account'
    });

    return models.Transactions
        .sum('amount', {
            where: models.sequelize.and(
                ['accountid = ?', accountId]
            )
        });
}

function getTimeline(user, currency) {
    return executeQuery('timeline', {
        currency: currency,
        ownerId: user.id
    });
}

function getSavingsPerYear(user, currency) {
    return executeQuery('savings-per-year', {
        currency: currency,
        ownerId: user.id
    });
}

function getSaving(user, currency, rangeName) {

    var range = null;

    switch (rangeName) {
    case "current-month":
        range = dateRangeFactory.getCurrentMonth();
        break;
    case "last-month":
        range = dateRangeFactory.getLastMonth();
        break;
    case "six-month":
        range = dateRangeFactory.getLast6Months();
        break;
    case "one-year":
        range = dateRangeFactory.getLastYear();
        break;
    case "three-years":
        range = dateRangeFactory.get3Years();
        break;
    case "inception":
        range = dateRangeFactory.getSinceInception();
        break;
    default:
        throw Error('This range "' + rangeName + '" doesn\'t exist');
    }

    return executeQuery('savings', {
            currency: currency,
            ownerId: user.id,
            fromDate: range.from.format('YYYY-MM-DD'),
            toDate: range.to.format('YYYY-MM-DD')
        }, null,
        function (result) {
            var from = moment(result[0].from);
            var to = moment(result[0].to);

            if (!from.isValid())
                from = range.from;

            if (!to.isValid())
                to = range.to;

            var months = to.diff(from, 'months', true);

            if (months < 1)
                months = 1;

            return {
                from: from,
                to: to,
                months: months,
                currency: currency,
                saving: result[0].saving,
                savingPerMonth: result[0].saving / months
            }
        });
}

module.exports = {
    getByAccountId: getByAccountId,
    getRange: getRange,
    getTotal: getTotal,
    getTimeline: getTimeline,
    getSaving: getSaving,
    getSavingsPerYear: getSavingsPerYear,
    saveManualTransaction: saveManualTransaction,
    deleteTransactions: deleteTransactions
}