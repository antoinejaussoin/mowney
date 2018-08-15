import execute from "./execute";
import { IUser } from "../models/user";
import { ITransactions } from "../models/transactions";

const query = `
select * from (
  select
    t.*,
    
    cast(@runtot as decimal(12,2)) as balance,
    (@runtot := @runtot - t.amount) as rt
  from  

  (
    select t1.id, t1.amount, t1.date, t1.description, t1.accountId as 'account', t1.importId as 'import', t1.categoryClueId as 'categoryClue', 
      c.id as 'category'
    from Transactions t1
      left join Categories c on t1.categoryId = c.id
    join Accounts a1 on a1.id = t1.accountId and a1.ownerId = :ownerId
  ) as t, /* Transactions filtered by user for security */

  (
    select @runtot:= (select sum(amount) from Transactions where accountId = :accountId)
  ) as n /* Start of running total, starting at the sum and then decreasing */



  where t.account = :accountId
  order by t.date desc, t.id desc
) as innerTable
`;

export interface TransactionWithBalance extends ITransactions {
  balance: number;
}

export default (
  user: IUser,
  accountId: number,
  offset: number = 0,
  limit: number = 0,
) => {
  return execute<TransactionWithBalance[]>(
    query,
    {
      accountId,
      ownerId: user.id,
    },
    query => {
      const limitClause = limit > 0 ? ` LIMIT ${limit}` : "";
      const offsetClause = offset > 0 ? ` OFFSET ${offset}` : "";
      return query + limitClause + offsetClause;
    },
  );
};
