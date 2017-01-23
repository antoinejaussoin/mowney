var models = require('../models');
var moment = require('moment');
var async = require('async');
var _ = require('lodash');

function importTransactions(importedTransactions, entities, account, cb) {
    var completed = 0;
    var results = [];

    if (!importedTransactions || importedTransactions.length == 0)
        return cb(null, results);

    importedTransactions.forEach(function (i) {
        var imp = models.Transactions.create({
                date: moment(i['date'][0]),
                description: i['description'][0],
                amount: +i['amount'][0]
            })
            .complete(function (err, transaction) {
                if (err) {
                    console.log('error: ' + err);
                    return cb(err, null);
                }


                transaction.setAccount(account)
                    .error(function (err) {
                        return cb(err, null)
                    })
                    .success(function () {

                        setImport(i, transaction, entities.imports, function (err) {

                            if (err) {
                                return cb(err);
                            }

                            setCategory(i, transaction, entities.categories, function (err) {

                                if (err) {
                                    return cb(err);
                                }

                                results.push(transaction);
                                completed++;
                                //console.log('imported ' + completed + ' transactions');
                                if (completed === importedTransactions.length)
                                    return cb(null, results);

                            });
                        });



                    });


            });



    })
};

function setImport(importedTransaction, transaction, imports, cb) {
    var importId = importedTransaction['import-id'][0].$ ? null : importedTransaction['import-id'][0];
    if (importId) {
        var importEntity = _.find(imports, function (e) {
            return e.id === importId;
        });
        transaction.setImport(importEntity)
            .error(function (err) {
                return cb(err);
            })
            .success(function () {
                return cb(null);
            });
    } else {
        return cb(null);
    }
};

function setCategory(importedTransaction, transaction, categories, cb) {
    var categoryId = importedTransaction['category-id'][0].$ ? null : importedTransaction['category-id'][0];
    if (categoryId) {
        var categoryEntity = _.find(categories, function (e) {
            return e.id === categoryId;
        });
        transaction.setCategory(categoryEntity)
            .error(function (err) {
                return cb(err);
            })
            .success(function () {
                return cb(null);
            });
    } else {
        return cb(null);
    }
};

module.exports = importTransactions;