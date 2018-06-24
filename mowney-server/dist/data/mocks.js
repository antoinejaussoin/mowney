"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var casual = require("casual");
var mocks = {
    String: function () { return 'It works!'; },
    Query: function () { return ({
        accountById: function (root, args) {
            return { id: args.id };
        },
    }); },
    Account: function () { return ({
        name: function () { return casual.name; },
        loaderType: function () { return casual.random_element(['QIF', 'CicLoader']); },
        isActive: function () { return casual.boolean; },
        isStatEnabled: function () { return casual.boolean; },
    }); },
    Transaction: function () { return ({
        amount: function () { return casual.random; },
        date: function () { return casual.date; },
        description: function () { return casual.catch_phrase; },
        categorisedDate: function () { return casual.date; },
    }); },
    User: function () { return ({
        firstName: function () { return casual.first_name; },
        lastName: function () { return casual.last_name; },
        email: function () { return casual.email; },
        password: function () { return casual.password; },
        isAdministrator: function () { return casual.boolean; },
    }); },
    Currency: function () { return ({
        isoCode: function () { return casual.country_code; },
    }); },
};
exports.default = mocks;
