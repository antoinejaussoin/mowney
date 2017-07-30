const fs = require('fs');
const xml2js = require('xml2js');
const models = require('../models');
const moment = require('moment');
const async = require('async');

const importImports = require('./imports');
const importCurrencies = require('./currencies');
const importOwner = require('./users');
const importAccounts = require('./accounts');

module.exports = function (file, user, done) {
  const parser = new xml2js.Parser();

  fs.readFile(file, (err, data) => {
    parser.parseString(data, (err, data) => {
      const destination = {};

      importImports(data.compta.imports[0].import, (err, imports) => {
        if (err) {
          console.log(`Error while importing imports: ${JSON.stringify(err)}`);
          return done(err);
        }
        console.log('Imports finished');
        destination.imports = imports;

        importCurrencies((err, currencies) => {
          if (err) {
            console.log(`Error while importing currencies: ${JSON.stringify(err)}`);
            return done(err);
          }
          destination.currencies = currencies;

          importOwner(user, currencies[0], (err, owner) => {
            if (err) {
              console.log(`Error while importing owner: ${JSON.stringify(err)}`);
              return done(err);
            }
            destination.owner = owner;

            importAccounts(data.compta.accounts[0].account, destination, (err, accounts) => {
              if (err) {
                console.log(`Error while importing accounts: ${JSON.stringify(err)}`);
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
};
