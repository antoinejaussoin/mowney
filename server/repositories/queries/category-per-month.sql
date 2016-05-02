select DATE_ADD(MAKEDATE(year(date), 1), INTERVAL (month(date))-1 MONTH) as 'date', sum(amountInCurrency) as amount from (

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

	join Categories cat1 on cat1.id = t.categoryId
	left join Categories cat2 on cat2.id = cat1.parentId
	left join Categories cat3 on cat3.id = cat2.parentId
	left join Categories cat4 on cat4.id = cat3.parentId
    join Accounts a on a.id = t.accountId
    join Currencies c on c.id = a.currencyId
    left join ExchangeRates r on r.currencyId = c.id and 
        r.id = (select max(r2.id) from ExchangeRates r2 where r2.currencyId = c.id)

    where 
        a.isStatEnabled = true and 
        a.ownerId = :userId and
        (cat1.id = :categoryId or cat2.id = :categoryId or cat3.id = :categoryId or cat4.id = :categoryId) and
        t.date >= :from and t.date <= :to

    order by t.date asc
) as subQuery
group by year(date), month(date)