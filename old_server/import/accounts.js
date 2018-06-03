const models = require('../models');
const moment = require('moment');
const async = require('async');
const _ = require('lodash');
const importTransactions = require('./transactions');
const importAccountIdentifiers = require('./account-identifier');

function importAccounts(importedAccounts, entities, cb) {
  let completed = 0;
  const results = [];
  importedAccounts.forEach((i) => {
    const imp = models.Account.create({
      name: i.name[0],
      loaderType: i.loaderType[0],
      isActive: i.active[0] === 'true',
      isStatEnabled: i.statEnabled[0] === 'true'
    })
      .complete((err, account) => {
        if (err) {
          console.log(`error: ${err}`);
          return cb(err, null);
        }

        // Currency
        const currency = _.find(entities.currencies, (c) => c.isoCode === i.currency[0]);

        account.setCurrency(currency)
          .error((err) => cb(err, null))
          .success(() => {
            // Owner
            account.setOwner(entities.owner)
              .error((err) => cb(err, null))
              .success((err, a) => {
                importTransactions(i.transactions[0].transaction, entities, account, (err, transactions) => {
                  if (err) {
                    return cb(err, null);
                  }

                  importAccountIdentifiers(i.identifiers[0].identifier, account, (err, identifiers) => {
                    if (err) {
                      return cb(err, null);
                    }
                    // i.imported = account;
                    // i.importedTransactions = transactions;
                    results.push(account);
                    completed++;
                    console.log(`imported ${completed}/${importedAccounts.length} accounts`);
                    if (completed === importedAccounts.length) { return cb(null, results); }
                  });
                });
              });
          });
      });
  });
}

module.exports = importAccounts;
