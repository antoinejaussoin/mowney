"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var execute_1 = require("./execute");
var query = "\nselect\n   t.*,\n   \n\tcast(@runtot as decimal(12,2)) as balance,\n   (@runtot := @runtot - t.amount) as rt\nfrom  \n\n(\n\tselect t1.id, t1.amount, t1.date, t1.description, t1.accountId, t1.importId, t1.categoryClueId, \n\t\tc.id as 'categoryId', c.name as 'categoryName'\n\tfrom Transactions t1\n    left join Categories c on t1.categoryId = c.id\n\tjoin Accounts a1 on a1.id = t1.accountId and a1.ownerId = :ownerId\n) as t, /* Transactions filtered by user for security */\n\n(\n\tselect @runtot:= (select sum(amount) from Transactions where accountId = :accountId)\n) as n /* Start of running total, starting at the sum and then decreasing */\n\n\n\nwhere t.accountId = :accountId\norder by t.date desc, t.id desc\n";
exports.default = (function (user, accountId, limit) {
    if (limit === void 0) { limit = 0; }
    return execute_1.default(query, {
        accountId: accountId,
        ownerId: user.id
    }, function (query) {
        var limitClause = limit > 0 ? " LIMIT " + limit : '';
        return query + limitClause;
    });
});
