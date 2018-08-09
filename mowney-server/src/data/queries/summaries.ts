import execute from "./execute";
import { IUser } from "../models/user";

const query = `
select a.id as 'id', a.name as 'name', c.isocode as 'currency', sum(amount) as 'balance', r.rate as 'rateToUsd', (
	select r4.rate from ExchangeRates r4 where r4.id = (
		select max(r3.id)
		from ExchangeRates r3 
		join Currencies c3 on c3.id = r3.currencyId
		where c3.isoCode = :currency
    )
) as rateToCurrency
from Transactions t
join Accounts a on a.id = t.accountId
join Currencies c on c.id = a.currencyId
left join ExchangeRates r on r.currencyId = c.id and r.id = (select max(r2.id) from ExchangeRates r2 where r2.currencyId = c.id)
where a.isActive = true and a.ownerId = :ownerId
group by t.accountId
order by a.name
`;

// export interface SavingPerYear {
//   date: string;
//   amount: number;
// }

export default async (user: IUser, currency: string) => {
  const results = await execute<GQL.IAccountSummary[]>(query, {
    currency,
    ownerId: user.id,
  });

  const summaries = results.map(result => {
    let balanceInCurrency: number;
    if (result.currency === currency) {
      balanceInCurrency = result.balance;
    } else if (result.currency === "USD") {
      balanceInCurrency = result.balance * result.rateToCurrency;
    } else if (currency === "USD") {
      balanceInCurrency = result.balance / result.rateToUsd;
    } else {
      balanceInCurrency =
        (result.balance * result.rateToCurrency) / result.rateToUsd;
    }

    return {
      ...result,
      balanceInCurrency,
    };
  });

  const total = summaries.reduce(
    (sum, summary) => sum + +summary.balanceInCurrency,
    0,
  );

  return {
    summaries,
    total,
  };
};
