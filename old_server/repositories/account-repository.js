const models = require('../models');
const executeQuery = require('./utils/execute-query');
const findAll = require('./utils/find-all');
const findOne = require('./utils/find-one');
const toggle = require('./utils/toggle');
const associate = require('./utils/associate');
const q = require('q');
const transactionRepository = require('./transaction-repository');

function getAll(user, includeDisabled) {
  const whereClause = includeDisabled ? { ownerId: user.id } : { ownerId: user.id, isActive: true };
  return findAll(models.Account, null, whereClause, ['name']);
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
    id
  });
}

function getSummary(user, currency) {
  return executeQuery('summary', {
    currency,
    ownerId: user.id
  });
}

function create(user, newAccount) {
  const defer = q.defer();

  models.Account.create({
    name: newAccount.name,
    loaderType: newAccount.loader,
    isActive: true,
    isStatEnabled: true
  }).then((a) => associate(a, 'User', 'Owner', user.id)).then((a) => associate(a, 'Currency', 'Currency', newAccount.currency)).then((a) => {
    defer.resolve(a);
  }).catch((err) => {
    console.error(err);
    defer.reject(err);
  });

  return defer.promise;
}

function deleteAccount(user, accountId) {
  const defer = q.defer();

  getById(user, accountId).then((account) => {
    if (!account) {
      return defer.reject('This account doesn\'t exist for this user');
    }

    transactionRepository.getByAccountId(user, accountId, 1).then((transactions) => {
      if (transactions && transactions.length > 0) {
        return defer.reject('This account contains existing transactions and can\'t be deleted');
      }

      account.destroy().then(() => {
        defer.resolve();
      }, (err) => {
        defer.reject(err);
      });
    }, (err) => {
      defer.reject(err);
    });
  }, (err) => {
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
  getAll,
  getById,
  getSummary,
  create,
  deleteAccount,
  toggleActive,
  toggleStatEnabled
};
