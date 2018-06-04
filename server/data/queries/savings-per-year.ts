import execute from './execute';
//import query from './savings-per-year.sql'; todo

const query = `
select year(date) as date, sum(amountInCurrency) as amount from (

  select 
      t.date, 

       t.amount / (
          select case c.isoCode when 'USD' then 1 else r.rate end
      ) * (
          select case :currency when 'USD' then 1 else (
              select r4.rate from ExchangeRates r4 where r4.id = (
                  select max(r3.id)
                  from ExchangeRates r3 
                  join Currencies c3 on c3.id = r3.currencyId
                  where c3.isoCode = :currency
              ) 
          ) end
      ) as 'amountInCurrency'

  from Transactions t

  join Accounts a on a.id = t.accountId
  join Currencies c on c.id = a.currencyId
  left join ExchangeRates r on r.currencyId = c.id and 
      r.id = (select max(r2.id) from ExchangeRates r2 where r2.currencyId = c.id)

  where 
      a.isStatEnabled = true and 
      a.ownerId = :ownerId

  order by t.date asc
) as subQuery
group by year(date)
`;

export interface SavingPerYear {
  date: string;
  amount: number;
}

export default (user: { id: number }, currency: string) => {
  return execute<SavingPerYear>(query, {
    currency,
    ownerId: user.id
  })
}