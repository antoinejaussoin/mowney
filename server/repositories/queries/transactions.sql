select
   t.*,
	cast(@runtot as decimal(12,2)) as balance,
   (@runtot := @runtot - t.amount) as rt
from  

(
	select t1.* from Transactions t1
	join Accounts a1 on a1.id = t1.accountId and a1.ownerId = :ownerId
) as t, /* Transactions filtered by user for security */

(
	select @runtot:= (select sum(amount) from Transactions where accountId = :accountId)
) as n /* Start of running total, starting at the sum and then decreasing */

where t.accountId = :accountId
order by t.date desc, t.id desc