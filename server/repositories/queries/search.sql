select 
		transaction.*,
    transaction.amount / (
      select case currency.isoCode when 'USD' then 1 else r.rate end
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
    
    from Transactions transaction

    join Accounts account on account.id = transaction.accountId
    join Currencies currency on currency.id = account.currencyId
    left join ExchangeRates r on r.currencyId = currency.id and 
      r.id = (select max(r2.id) from ExchangeRates r2 where r2.currencyId = currency.id)
    left join Categories category on category.id = transaction.categoryId

    where 
      account.ownerId = 200 and
      :search

    order by transaction.date desc