update Transactions t
	
join Accounts a on a.id = t.accountId
join CategoryClues cc on 
	(cc.type = 'Exact' and cc.exactString = t.description) or
    (cc.type = 'Regex' and t.description REGEXP cc.regex)
join Categories c on c.id = cc.categoryId

set t.categoryId = c.id,
	t.categoryClueId = cc.id


where a.ownerId = :userId and t.categoryId is null
