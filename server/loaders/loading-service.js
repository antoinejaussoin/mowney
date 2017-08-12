const fs = require('fs');
const accountRepository = require('../repositories/account-repository');
const transactionRepository = require('../repositories/transaction-repository');
const importRepository = require('../repositories/import-repository');
const loaders = require('./loader-factory');
const deduplicator = require('./deduplicator');
const persister = require('./persister');
const _ = require('lodash');
const m = require('moment');

// file: name, path, accountId

function loadNewTransactions(user, files) {
  return new Promise((resolve, reject) => {
    const count = files.length;
    let i = 0;

    function decorateNewTransactions(transactions) {
      const dates = _.map(transactions, 'date');
      const from = new Date(_.min(dates));
      const to = new Date(_.max(dates));

      from.setDate(from.getDate() - 2);
      to.setDate(to.getDate() + 2);

      return {
        transactions,
        from,
        to
      };
    }

    files.forEach((file) => {
      importRepository.create(file.name).then((imp) => {
        accountRepository.getById(user, file.accountId).then((account) => {
          fs.readFile(file.path, (err, rawData) => {
            const loader = loaders[account.loaderType];
            loader.load(rawData.toString()).then((newTransactions) => {
              newTransactions = decorateNewTransactions(newTransactions);
              transactionRepository.getRange(user,
              account.id,
              newTransactions.from,
              newTransactions.to).then((existingTransactions) => {
                console.log('existing: ', existingTransactions.length);
                const filtered = deduplicator(existingTransactions, newTransactions.transactions);
                persister(filtered, user, account.id, imp).then(() => {
                  console.log('Persisted: ', i, count);
                  i++;
                  if (i === count) {
                    resolve();
                  }
                });
              });
            });
          });
        });
      }, (err) => {
        reject(err);
      });
    });
  });
}


module.exports = loadNewTransactions;
