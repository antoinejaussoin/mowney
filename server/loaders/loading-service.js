var fs = require('fs');
var q = require('q');
var accountRepository = require('../repositories/account-repository');
var transactionRepository = require('../repositories/transaction-repository');
var importRepository = require('../repositories/import-repository');
var loaders = require('./loader-factory');
var deduplicator = require('./deduplicator');
var persister = require('./persister');
var _ = require('lodash');
var m = require('moment');

// file: name, path, accountId

function loadNewTransactions(user, files) {
    var defer = q.defer();

    var count = files.length;
    var i = 0;


    function decorateNewTransactions(transactions) {
        var dates = _.pluck(transactions, 'date');
        var from = new Date(_.min(dates));
        var to = new Date(_.max(dates));

        from.setDate(from.getDate() - 2);
        to.setDate(to.getDate() + 2);

        return {
            transactions: transactions,
            from: from,
            to: to
        }
    }

    files.forEach(function (file) {

        importRepository.create(file.name).then(function (imp) {
            accountRepository.getById(user, file.accountId).then(function (account) {
                fs.readFile(file.path, function read(err, rawData) {
                    var loader = loaders[account.loaderType];
                    loader.load(rawData.toString()).then(function (newTransactions) {
                        newTransactions = decorateNewTransactions(newTransactions);
                        transactionRepository.getRange(user,
                            account.id,
                            newTransactions.from,
                            newTransactions.to).then(function (existingTransactions) {
                            var filtered = deduplicator(existingTransactions, newTransactions.transactions);
                            persister(filtered, user, account.id, imp).then(function () {
                                i++;
                                if (i === count) {
                                    defer.resolve();
                                }
                            });
                        });
                    });
                });
            });
        }, function (err) {
            defer.reject(err);
        });



    });


    return defer.promise;
}


module.exports = loadNewTransactions;