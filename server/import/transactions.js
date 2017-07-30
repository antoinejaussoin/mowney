const models = require('../models');
const moment = require('moment');
const async = require('async');
const _ = require('lodash');

function importTransactions(importedTransactions, entities, account, cb) {
  let completed = 0;
  const results = [];

  if (!importedTransactions || importedTransactions.length == 0) { return cb(null, results); }

  importedTransactions.forEach((i) => {
    const imp = models.Transactions.create({
      date: moment(i.date[0]),
      description: i.description[0],
      amount: +i.amount[0]
    })
      .complete((err, transaction) => {
        if (err) {
          console.log(`error: ${err}`);
          return cb(err, null);
        }


        transaction.setAccount(account)
          .error((err) => cb(err, null))
          .success(() => {
            setImport(i, transaction, entities.imports, (err) => {
              if (err) {
                return cb(err);
              }

              setCategory(i, transaction, entities.categories, (err) => {
                if (err) {
                  return cb(err);
                }

                results.push(transaction);
                completed++;
                // console.log('imported ' + completed + ' transactions');
                if (completed === importedTransactions.length) { return cb(null, results); }
              });
            });
          });
      });
  });
}

function setImport(importedTransaction, transaction, imports, cb) {
  const importId = importedTransaction['import-id'][0].$ ? null : importedTransaction['import-id'][0];
  if (importId) {
    const importEntity = _.find(imports, (e) => e.id === importId);
    transaction.setImport(importEntity)
      .error((err) => cb(err))
      .success(() => cb(null));
  } else {
    return cb(null);
  }
}

function setCategory(importedTransaction, transaction, categories, cb) {
  const categoryId = importedTransaction['category-id'][0].$ ? null : importedTransaction['category-id'][0];
  if (categoryId) {
    const categoryEntity = _.find(categories, (e) => e.id === categoryId);
    transaction.setCategory(categoryEntity)
      .error((err) => cb(err))
      .success(() => cb(null));
  } else {
    return cb(null);
  }
}

module.exports = importTransactions;
