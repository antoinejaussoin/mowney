var models = require('../models');
var moment = require('moment');
var async = require('async');
var _ = require('lodash');
var importTransactions = require('./transactions');
var importAccountIdentifiers = require('./account-identifier');

function importAccounts(importedAccounts, entities, cb) {
    var completed = 0;
    var results = [];
    importedAccounts.forEach(function (i) {
        var imp = models.Account.create({
                name: i['name'][0],
                loaderType: i['loaderType'][0],
                isActive: i['active'][0] === 'true',
                isStatEnabled: i['statEnabled'][0] === 'true'
            })
            .complete(function (err, account) {
                if (err) {
                    console.log('error: ' + err);
                    return cb(err, null);
                }

                // Currency
                var currency = _.find(entities.currencies, function (c) {
                    return c.isoCode === i['currency'][0]
                });

                account.setCurrency(currency)
                    .error(function (err) {
                        return cb(err, null)
                    })
                    .success(function () {

                        // Owner
                        account.setOwner(entities.owner)
                            .error(function (err) {
                                return cb(err, null)
                            })
                            .success(function (err, a) {


                                importTransactions(i.transactions[0].transaction, entities, account, function (err, transactions) {

                                    if (err) {
                                        return cb(err, null)
                                    }

                                    importAccountIdentifiers(i.identifiers[0].identifier, account, function (err, identifiers) {

                                        if (err) {
                                            return cb(err, null)
                                        }
                                        //i.imported = account;
                                        //i.importedTransactions = transactions;
                                        results.push(account);
                                        completed++;
                                        console.log('imported ' + completed + '/' + importedAccounts.length + ' accounts');
                                        if (completed === importedAccounts.length)
                                            return cb(null, results);
                                    });


                                });


                            });


                    });


            });
    });
}

module.exports = importAccounts;