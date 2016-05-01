var models = require('../models');
var moment = require('moment');
var async = require('async');

function importAccountIdentifier(importedAccountIdentifiers, account, cb) {
    var completed = 0;
    var results = [];
    
    if (!importedAccountIdentifiers || importedAccountIdentifiers.length == 0)
        return cb(null, results);
    
    importedAccountIdentifiers.forEach(function (i) {
        var imp = models.AccountIdentifier.create({
                type: i['type'][0],
                value: i['value'][0]
            })
            .complete(function (err, accountIdentifier) {
                if (err) {
                    console.log('error: ' + err);
                    return cb(err, null);
                }

                accountIdentifier.setAccount(account)
                    .error(function (err) {
                        return cb(err, null)
                    })
                    .success(function () {

                        results.push(accountIdentifier);
                        completed++;
                        console.log('imported ' + completed + ' account identifier');
                        if (completed === importedAccountIdentifiers.length) {
                            return cb(null, results);
                        }
                    })
            });
    });
}

module.exports = importAccountIdentifier;