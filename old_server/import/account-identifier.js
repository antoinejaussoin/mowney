const models = require('../models');
const moment = require('moment');
const async = require('async');

function importAccountIdentifier(importedAccountIdentifiers, account, cb) {
  let completed = 0;
  const results = [];

  if (!importedAccountIdentifiers || importedAccountIdentifiers.length == 0) { return cb(null, results); }

  importedAccountIdentifiers.forEach((i) => {
    const imp = models.AccountIdentifier.create({
      type: i.type[0],
      value: i.value[0]
    })
      .complete((err, accountIdentifier) => {
        if (err) {
          console.log(`error: ${err}`);
          return cb(err, null);
        }

        accountIdentifier.setAccount(account)
          .error((err) => cb(err, null))
          .success(() => {
            results.push(accountIdentifier);
            completed++;
            console.log(`imported ${completed} account identifier`);
            if (completed === importedAccountIdentifiers.length) {
              return cb(null, results);
            }
          });
      });
  });
}

module.exports = importAccountIdentifier;
