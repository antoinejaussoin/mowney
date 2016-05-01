var models = require('../models');
var accountRepository = require('../repositories/account-repository');
var q = require('q');

module.exports = function persist(importedTransactions, user, accountId, importEntity) {
    var defer = q.defer();

    console.log('Persist: ' + accountId);

    function createDateAsUTC(date) {

        if (date.getHours() == 23)
            throw "Aie aie aie pepito " + date;
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
    }

    models.Account
        .find({
            where: {
                id: accountId
            }
        })
        .then(function (account) {
            importedTransactions.forEach(function (i) {
                models.Transactions.create({
                    date: createDateAsUTC(i.date),
                    description: i.description,
                    amount: i.amount
                })
                .then(function(tra){
                    return tra.setImport(importEntity)  
                })
                .then(function(tra){
                    return tra.setAccount(account)  
                })
                .then(function(tra){
                    return tra.save(tra)  
                })
                .then(function(){
                    return defer.resolve();   
                })
                .catch(function(err){
                    return defer.reject(err);
                });

            });
        });

    return defer.promise;
};