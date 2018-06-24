"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var execute_1 = require("./execute");
//import query from './savings-per-year.sql'; todo
var query = "\nselect year(date) as date, sum(amountInCurrency) as amount from (\n\n  select \n      t.date, \n\n       t.amount / (\n          select case c.isoCode when 'USD' then 1 else r.rate end\n      ) * (\n          select case :currency when 'USD' then 1 else (\n              select r4.rate from ExchangeRates r4 where r4.id = (\n                  select max(r3.id)\n                  from ExchangeRates r3 \n                  join Currencies c3 on c3.id = r3.currencyId\n                  where c3.isoCode = :currency\n              ) \n          ) end\n      ) as 'amountInCurrency'\n\n  from Transactions t\n\n  join Accounts a on a.id = t.accountId\n  join Currencies c on c.id = a.currencyId\n  left join ExchangeRates r on r.currencyId = c.id and \n      r.id = (select max(r2.id) from ExchangeRates r2 where r2.currencyId = c.id)\n\n  where \n      a.isStatEnabled = true and \n      a.ownerId = :ownerId\n\n  order by t.date asc\n) as subQuery\ngroup by year(date)\n";
exports.default = (function (user, currency) {
    return execute_1.default(query, {
        currency: currency,
        ownerId: user.id
    });
});
