select 
		t.*,
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
    ) as 'amountInCurrency',
    a.name as 'accountName',
    c.name as 'currencyName',
    c.isoCode as 'currencyIso',
    cat.name as 'categoryName',
    cat.description as 'categoryDescription'

    from Transactions t

    join Accounts a on a.id = t.accountId
    join Currencies c on c.id = a.currencyId
    left join Categories cat on cat.id = t.categoryId
    left join ExchangeRates r on r.currencyId = c.id and 
      r.id = (select max(r2.id) from ExchangeRates r2 where r2.currencyId = c.id)

    where 
      a.ownerId = 200 and
      :search

    order by t.date desc