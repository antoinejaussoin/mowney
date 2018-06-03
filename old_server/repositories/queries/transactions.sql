select
   t.*,
   
	cast(@runtot as decimal(12,2)) as balance,
   (@runtot := @runtot - t.amount) as rt
from  

(
	select t1.id, t1.amount, t1.date, t1.description, t1.accountId, t1.importId, t1.categoryClueId, 
		c.id as 'categoryId', c.name as 'categoryName'
	from Transactions t1
    left join Categories c on t1.categoryId = c.id
	join Accounts a1 on a1.id = t1.accountId and a1.ownerId = :ownerId
) as t, /* Transactions filtered by user for security */

(
	select @runtot:= (select sum(amount) from Transactions where accountId = :accountId)
) as n /* Start of running total, starting at the sum and then decreasing */



where t.accountId = :accountId
order by t.date desc, t.id desc