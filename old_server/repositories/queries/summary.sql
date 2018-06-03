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