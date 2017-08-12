const models = require('../models');
const q = require('q');
const loadQuery = require('./query-loader');
const executeQuery = require('./utils/execute-query');
const findAll = require('./utils/find-all');
const findOne = require('./utils/find-one');
const dateRangeFactory = require('./date-range-factory');
const moment = require('moment');
const associate = require('./utils/associate');

function getByAccountId(user, accountId, limit) {
  return executeQuery('transactions', {
    accountId,
    ownerId: user.id
  }, (query) => {
    const limitClause = limit > 0 ? ` LIMIT ${limit}` : '';
    return query + limitClause;
  });
}

function saveManualTransaction(accountId, date, description, amount) {
  return models.Transactions.create({
    date: moment(date),
    description,
    amount
  }).then((t) => associate(t, 'Account', 'Account', accountId));
}

function deleteTransactions(user, ids) {
  return models.Transactions.destroy({
    where: {
      id: { in: ids }
    }
  });
}

function getRange(user, accountId, from, to) {
  console.log('get range ', user.id);
  return findAll(models.Transactions, [{
    model: models.Account,
    as: 'account',
    where: {
      ownerId: user.id
    }
  }], models.sequelize.and({
    accountId,
    date: {
      $gte: from,
      $lte: to
    }
  }// TODO: Add owner check
    // ['accountid = ?', accountId], ['account.ownerid = ?', user.id], ['date >= ?', from], ['date <= ?', to]
  ), [['date', 'DESC']]);
}

// function getRange(user, accountId, from, to) {
//   return findAll(models.Transactions, [{
//     model: models.Account,
//     as: 'account'
//   }], models.sequelize.and(
//     ['accountid = ?', accountId], ['account.ownerid = ?', user.id], ['date >= ?', from], ['date <= ?', to]
//   ), [['date', 'DESC']]);
// }

function getTotal(user, accountId) {
  const includes = [];

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
    currency,
    ownerId: user.id
  });
}

function getSavingsPerYear(user, currency) {
  return executeQuery('savings-per-year', {
    currency,
    ownerId: user.id
  });
}

function getSaving(user, currency, rangeName) {
  let range = null;

  switch (rangeName) {
  case 'current-month':
    range = dateRangeFactory.getCurrentMonth();
    break;
  case 'last-month':
    range = dateRangeFactory.getLastMonth();
    break;
  case 'six-month':
    range = dateRangeFactory.getLast6Months();
    break;
  case 'one-year':
    range = dateRangeFactory.getLastYear();
    break;
  case 'three-years':
    range = dateRangeFactory.get3Years();
    break;
  case 'inception':
    range = dateRangeFactory.getSinceInception();
    break;
  default:
    throw Error(`This range "${rangeName}" doesn't exist`);
  }

  return executeQuery('savings', {
    currency,
    ownerId: user.id,
    fromDate: range.from.format('YYYY-MM-DD'),
    toDate: range.to.format('YYYY-MM-DD')
  }, null,
  (result) => {
    let from = moment(result[0].from);
    let to = moment(result[0].to);

    if (!from.isValid()) { from = range.from; }

    if (!to.isValid()) { to = range.to; }

    let months = to.diff(from, 'months', true);

    if (months < 1) { months = 1; }

    return {
      from,
      to,
      months,
      currency,
      saving: result[0].saving,
      savingPerMonth: result[0].saving / months
    };
  });
}

module.exports = {
  getByAccountId,
  getRange,
  getTotal,
  getTimeline,
  getSaving,
  getSavingsPerYear,
  saveManualTransaction,
  deleteTransactions
};
