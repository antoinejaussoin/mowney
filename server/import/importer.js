var fs = require('fs');
var xml2js = require('xml2js');
var models = require('../models');
var moment = require('moment');
var async = require('async');

var importImports = require('./imports');
var importCurrencies = require('./currencies');
var importOwner = require('./users');
var importAccounts = require('./accounts');

module.exports = function (file, user, done) {

    var parser = new xml2js.Parser();

    fs.readFile(file, function (err, data) {
        parser.parseString(data, function (err, data) {

            var destination = {}

            importImports(data.compta.imports[0].import, function (err, imports) {
                if (err) {
                    console.log('Error while importing imports: ' + JSON.stringify(err));
                    return done(err);
                }
                console.log('Imports finished');
                destination.imports = imports;

                importCurrencies(function (err, currencies) {
                    if (err) {
                        console.log('Error while importing currencies: ' + JSON.stringify(err));
                        return done(err);
                    }
                    destination.currencies = currencies;

                    importOwner(user, currencies[0], function (err, owner) {
                        if (err) {
                            console.log('Error while importing owner: ' + JSON.stringify(err));
                            return done(err);
                        }
                        destination.owner = owner;

                        importAccounts(data.compta.accounts[0].account, destination, function (err, accounts) {
                            if (err) {
                                console.log('Error while importing accounts: ' + JSON.stringify(err));
                                return done(err);
                            }
                            destination.accounts = accounts;

                            done(null, data);
                        });


                    });

                });

            });


        });
    });





}