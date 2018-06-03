const models = require('../models');
const accountRepository = require('../repositories/account-repository');

module.exports = function persist(importedTransactions, user, accountId, importEntity) {
  return new Promise((resolve, reject) => {
    if (!importedTransactions.length) {
      return resolve();
    }

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
            .then(resolve)
            .catch(reject);
        });
      })
      .catch(reject);
  });
};
