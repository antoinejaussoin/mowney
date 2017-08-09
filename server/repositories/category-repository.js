const models = require('../models');
const findAll = require('./utils/find-all');
const findOne = require('./utils/find-one');
const associate = require('./utils/associate');
const executeQuery = require('./utils/execute-query');
const updateQuery = require('./utils/update-query');
const moment = require('moment');

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
  }], { ownerId: user.id });
}

function createClue(user, categoryId, isRegex, str) {
  return models.CategoryClue.create({
    type: isRegex ? 'Regex' : 'Exact',
    exactString: isRegex ? null : str,
    regex: isRegex ? str : null,
    mustBeCredit: false,
    mustBeDebit: false
  }).then((cc) => associate(cc, 'User', 'User', user.id)).then((cc) => associate(cc, 'Category', 'Category', categoryId));
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
  const from = (fromDate || moment('1900-01-01')).format('YYYY-MM-DD');
  const to = (toDate || moment('2100-01-01')).format('YYYY-MM-DD');

  return executeQuery('category-per-month', {
    currency,
    userId: user.id,
    from,
    to,
    categoryId
  });
}

function unCategorise(user, transactionId) {
  return categorise(user, transactionId, null);
}

function categorise(user, transactionId, categoryId) {
  console.log(`categorise: ${transactionId}/${categoryId}`);
  return findOne(models.Transactions, null, {
    id: transactionId
  })
    .then((transaction) => transaction.updateAttributes({
      categoryId,
      categoryClueId: null
    }));
}


module.exports = {
  getAll,
  getAllClues,
  createClue,
  categoriseAll,
  categoryPerMonth,
  deleteClue,
  categorise,
  unCategorise
};
