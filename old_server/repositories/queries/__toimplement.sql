
select * from transactions t where t.categoryid in (
	select id
	from (select * from Categories
			 order by parentId, id) Categories_sorted,
			(select @pv := (
				select id from Categories c where c.name like '%income%' limit 1
            )) initialisation
	where   find_in_set(parentId, @pv) > 0
	and     @pv := concat(@pv, ',', id)
)