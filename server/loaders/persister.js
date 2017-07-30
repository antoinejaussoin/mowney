const models = require('../models');
const accountRepository = require('../repositories/account-repository');
const q = require('q');

module.exports = function persist(importedTransactions, user, accountId, importEntity) {
  const defer = q.defer();

  console.log(`Persist: ${accountId}`);

  function createDateAsUTC(date) {
    if (date.getHours() == 23) { throw `Aie aie aie pepito ${date}`; }
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
  }

  models.Account
    .find({
      where: {
        id: accountId
      }
    })
    .then((account) => {
      importedTransactions.forEach((i) => {
        models.Transactions.create({
          date: createDateAsUTC(i.date),
          description: i.description,
          amount: i.amount
        })
          .then((tra) => tra.setImport(importEntity))
          .then((tra) => tra.setAccount(account))
          .then((tra) => tra.save(tra))
          .then(() => defer.resolve())
          .catch((err) => defer.reject(err));
      });
    });

  return defer.promise;
};
