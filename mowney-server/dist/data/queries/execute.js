"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
function execute(query, parameters, queryModifier, resultModifier) {
    if (queryModifier) {
        query = queryModifier(query);
    }
    return new Promise(function (resolve, reject) {
        models_1.db.query(query, {
            replacements: parameters,
            type: models_1.db.QueryTypes.SELECT
        }).then(function (data) {
            // console.log('result data: ', data);
            if (resultModifier) {
                data = resultModifier(data);
            }
            resolve(data);
        }, function (err) {
            console.error(err);
            reject(err);
        });
    });
}
exports.default = execute;
