import execute from "./execute";
import * as moment from "moment";
import { IUser } from "../models/user";
import {
  getCurrentMonth,
  getLastMonth,
  getLast6Months,
  getLastYear,
  get3Years,
  getSinceInception,
} from "../utils/date-range-factory";

const query = `
select sum(amountInCurrency) as 'amount', min(date) as 'from', max(date) as 'to' from (
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
	left join ExchangeRates r on r.currencyId = c.id and r.id = (select max(r2.id) from ExchangeRates r2 where r2.currencyId = c.id)

	where a.ownerId = :ownerId
	  and t.date >= :fromDate
    and t.date <= :toDate
    and a.isStatEnabled = true
    and :clause
          
	order by t.date asc

) as sum
`;

export interface SavingRange {
  from: string;
  to: string;
  range: Range;
  amount: number;
}

export enum Range {
  currentMonth = "currentMonth",
  lastMonth = "lastMonth",
  sixMonth = "sixMonth",
  oneYear = "oneYear",
  threeYears = "threeYears",
  inception = "inception",
}

export default async (
  user: IUser,
  currency: string,
  range: Range,
  primary: boolean,
) => {
  let dates;

  switch (range) {
    case Range.currentMonth:
      dates = getCurrentMonth();
      break;
    case Range.lastMonth:
      dates = getLastMonth();
      break;
    case Range.sixMonth:
      dates = getLast6Months();
      break;
    case Range.oneYear:
      dates = getLastYear();
      break;
    case Range.threeYears:
      dates = get3Years();
      break;
    case Range.inception:
      dates = getSinceInception();
      break;
    default:
      throw Error(`This range "${range}" doesn't exist`);
  }

  const clause = primary ? 't.description <> "Change"' : "1 = 1";

  const result = await execute<SavingRange[]>(
    query,
    {
      currency,
      ownerId: user.id,
      fromDate: dates.from.format("YYYY-MM-DD"),
      toDate: dates.to.format("YYYY-MM-DD"),
    },
    query => query.replace(":clause", clause),
  );

  let from = moment(result[0].from);
  let to = moment(result[0].to);

  if (!from.isValid()) {
    from = dates.from;
  }

  if (!to.isValid()) {
    to = dates.to;
  }

  let months = to.diff(from, "months", true);

  if (months < 1) {
    months = 1;
  }

  return {
    from: from.format("YYYY-MM-DD"),
    to: to.format("YYYY-MM-DD"),
    months,
    currency,
    range,
    amount: result[0].amount,
    amountPerMonth: result[0].amount / months,
  };
};
